<template>
  <div>
    <p>Select the field delimiter and the text qualifier.</p>
    <div class="d-flex flex-row align-items-center">
      
      <FieldDelimiter v-model="field_delimiter" class="col pl-0" @input="onChange"/>
      
      <TextQualifier v-model="text_qualifier" class="col px-0" @input="onChange"/>

      <!-- <div class="form-group ml-2">
        <label for="record_delimiter">Record delimiter</label>
        <select class="form-control" id="record_delimiter" v-model="record_delimiter">
            <option value='crlf'>CRLF</option>
            <option value='cr'>CR</option>
            <option value='lf'>LF</option>
        </select>
      </div> -->

    </div>

    <div class="buttons d-flex flex-row justify-content-between" >
        <slot name="left" ></slot>
        <slot></slot>
        <slot name="right" :validation="$v"></slot>
    </div>

  </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'

import {default as FieldDelimiter, isStandardDelimiter} from '@/components/FieldDelimiter'
import TextQualifier from '@/components/TextQualifier'

export default {
  components: {FieldDelimiter, TextQualifier},
  data() {
    return {}
  },
  computed: {
    field_delimiter: {
      get() { return this.$store.state.import_settings.field_delimiter },
      set(value) {
        this.$store.dispatch('import_settings/setStateProperty', {key: 'field_delimiter', value})
      },
    },
    text_qualifier: {
      get() { return this.$store.state.import_settings.text_qualifier },
      set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'text_qualifier', value})},
    },
    record_delimiter: {
      get() { return this.$store.state.import_settings.record_delimiter },
      set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'record_delimiter', value})},
    },
  },
  validations() {
    return {
      field_delimiter: {
        required: requiredIf((value) => !isStandardDelimiter(value)),
        /* allowedDelimiter: (value) => {
          const allowed_delimiters = Object.values(FIELD_DELIMITERS).map(delimiter => delimiter.value)
          return allowed_delimiters.indexOf(value) >= 0
        } */
      },
      text_qualifier: {required},
      // custom_field_delimiter: {
      //   alphaNum,
      //   required: requiredIf(() => this.field_delimiter=='other'),
      //   /* also_check_field_delimiter: async (value, vm) => {
      //     if(vm.field_delimiter!=='other') return true
      //       else return await String(value).match(/[^\s]/)
      //   } */
      // }
    }
  },
  methods: {
    // parse the text whenever the delimiter or text qualifier are changed
    onChange() {
        let config = {
          delimiter: this.field_delimiter,
          quoteChar: this.text_qualifier,
        }
        // exit if FieldDelimiter element is set to 'other' (value is empty string)
        if(config.delimiter=='') return
        const text = this.$store.state.csv_data.text
        this.$store.dispatch('csv_data/parse', {text, config})
    }
  },
}
</script>

<style>

</style>