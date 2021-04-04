<template>
  <div>
    <b-dropdown id="dropdown-text" text="Auto detect" variant="info">
      <template #button-content>
        <font-awesome-icon class="mr-2" :icon="['fas', 'cogs']" fixed-width/><span>Auto detect</span>
      </template>
      <b-dropdown-text style="width: 240px;">
        Select a field that contains dates to start the auto-detection process
      </b-dropdown-text>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button v-for="(field, index) in csv_fields" :key="index"
        @click="detectDate(field)" :active="field==selected">{{field}}</b-dropdown-item-button>
    </b-dropdown>
    <b-modal ref="modal-date-detected" title="Date detected" hide-footer centered>
      <span class="d-block">The format '<b>{{detectedFormat}}</b>' has been detected.</span>
      <span class="d-block">Click "ok" if you want to use this format.</span>
      <span class="d-block font-italic mt-2">Please double check the "dates format" reference for any doubt.</span>
      <div class="d-flex justify-content-end mt-2">
        <b-button @click="$refs['modal-date-detected'].hide()">Cancel</b-button>
        <b-button class="ml-2" @click="useDetectedFormat" variant="primary">Ok</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

const commonDateFormats = Object.freeze({
  ATOM: {
    js_format: 'YYYY-MM-DDTHH:mm',
    php_format: 'Y-m-d\\TH:i:sP', // 2005-08-15T15:52:01+00:00
  },
  COOKIE: {
    js_format: 'dddd, DD-MMM-YYYY HH:mm:ss T',
    php_format: 'l, d-M-y H:i:s T', // Monday, 15-Aug-2005 15:52:01 UTC
   },
  ISO8601: {
    js_format: 'YYYY-MM-DDTHH:mm:ssZ',
    php_format: 'Y-m-d\\TH:i:sO', // 2005-08-15T15:52:01+0000
   },
  RFC822: {
    js_format: 'ddd, DD MMM YY HH:mm:ss Z',
    php_format: 'D, d M y H:i:s O', // Mon, 15 Aug 05 15:52:01 +0000
   },
  RFC850: {
    js_format: 'dddd, DD-MMM-YY HH:mm:ss T',
    php_format: 'l, d-M-y H:i:s T', // Monday, 15-Aug-05 15:52:01 UTC
   },
  RFC1036: {
    js_format: 'ddd, DD MMM YY HH:mm:ss Z',
    php_format: 'D, d M y H:i:s O', // Mon, 15 Aug 05 15:52:01 +0000
   },
  RFC1123: {
    js_format: 'ddd, DD MMM YYYY HH:mm:ss Z',
    php_format: 'D, d M Y H:i:s O', // Mon, 15 Aug 2005 15:52:01 +0000
   },
  RFC2822: {
    js_format: 'ddd, DD MMM YYYY HH:mm:ss Z',
    php_format: 'D, d M Y H:i:s O', // Mon, 15 Aug 2005 15:52:01 +0000
   },
  RSS: {
    js_format: 'ddd, DD MMM YYYY HH:mm:ss ZZ',
    php_format: 'D, d M Y H:i:s O', // Mon, 15 Aug 2005 15:52:01 +0000
   },
  W3C: {
    js_format: 'YYYY-MM-DDTHH:mm:ssZZ',
    php_format: 'Y-m-d\\TH:i:sP', // 2005-08-15T15:52:01+00:00
   },
  // non standard
  NO_TZ_MYSQL: {
    js_format: 'YYYY-MM-DD HH:mm:ss',
    php_format: 'Y-m-d H:i:s', // 2005-08-15 15:52:01
   },
  NO_TZ_NO_SECS: {
    js_format: 'YYYY-MM-DD HH:mm',
    php_format: 'Y-m-d H:i', // 2005-08-15 15:52
   },
  NO_TIME: {
    js_format: 'YYYY-MM-DD',
    php_format: 'Y-m-d', // 2005-08-15
   },
  US_DATE_SHORT: {
    js_format: 'MM-DD-YY HH:mm',
    php_format: 'm-d-y H:i', // 08-15-20
   },
  NO_TIME_US_DATE_SHORT: {
    js_format: 'MM-DD-YY',
    php_format: 'm-d-y', // 08-15-20
   },
  US_DATE_SHORT_SLASH: {
    js_format: 'MM/DD/YY HH:mm',
    php_format: 'm/d/y H:i', // 08/15/20
   },
  NO_TIME_US_DATE_SHORT_SLASH: {
    js_format: 'MM/DD/YY',
    php_format: 'm/d/y', // 08/15/20
   },
   SAMMC: {
     js_format: 'M/D/YYYY H:mm', 
     php_format: 'n/j/Y G:i', // 8/1/2020 7:02
   }
})

const detectFormat = date => {
  for(let[name, {js_format, php_format}] of Object.entries(commonDateFormats)) {
    const momentDate = moment(date, js_format, true)
    if(momentDate.isValid()) {
      return {name, format: php_format}
    }
  }
  return false
}

export default {
  data() {
    return {
      selected: null,
      detectedFormat: null,
    }
  },
  computed: {
    ...mapState({
      csv_fields: state => state.csv_data.fields,
      csv_lines: state => state.csv_data.lines,
      csv_data: state => state.csv_data.data,
    }),
    options() {
      return [{ value: null, text: 'Please select an option' }, ...this.csv_fields]
    }
  },
  methods: {
    useDetectedFormat() {
      this.$emit('dateDetected', this.detectedFormat)
      const modal = this.$refs['modal-date-detected']
      if(modal) modal.hide()
    },
    detectDate(field) {
      this.selected = field
      this.detectedFormat = null
      let detectedFormat = null
      const counter = {}
      const minSamples = 20
      const totalSamples = Math.min(minSamples, this.csv_data.length)
      for(let i=0; i<totalSamples; i++) {
        let lastDetectedCount = counter[detectedFormat] || 0
        let date = this.csv_data[i][field]
        let {format} = detectFormat(date)
        if(!format) continue
        let formatCount = counter[format] || 0
        counter[format] = ++formatCount
        if(format!=detectedFormat && lastDetectedCount<formatCount) {
          lastDetectedCount = formatCount
          detectedFormat = format
        }
      }
      this.detectedFormat = detectedFormat || false
      if(this.detectedFormat==false) {
        this.$bvModal.msgBoxOk('Please select another field or use the "dates format" reference.', {
          title: 'No valid date detected',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'secondary',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      }else {
        const modal = this.$refs['modal-date-detected']
        if(modal) modal.show()
      }
    }
  },
}
</script>

<style>

</style>