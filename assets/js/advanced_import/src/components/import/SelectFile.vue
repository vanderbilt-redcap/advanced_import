<template>
  <div>
    <div class="form-group">
      <p>Select a file.</p>
      <p>The wizard will parse it and:</p>
      <ul>
        <li>check if the content is valid</li>
        <li>guess the field delimiter</li>
        <li>extract the column names from the first row of the file</li>
      </ul>
      <b-alert :show="files && csv_data.length<minCsvLength" variant="warning">
        <span>The CSV file must contain at least 2 lines: 1 line of lables and 1 line of values</span> 
      </b-alert>

      <b-form-file
        id="file"
        v-model="files"
        ref="file"
        DISABLED-state="Boolean(files)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        :accept="accept"
      ></b-form-file>
      
    </div>
    <div class="buttons d-flex flex-row justify-content-between" >
      <slot name="left" ></slot>
      <slot></slot>
      <slot name="right" :validation="$v" ></slot>
      <!-- <slot name="right" :validation="$v" :processFunction="parseFile"></slot> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FileParser from '@/libs/FileParser'

// check the minimum number of parsed CSV lines
const minNumberLines = (min) => (value, vm) =>  {
    return [...vm.csv_data].length >= min;
};

export default {

  data() {
    return {
      minCsvLength: 1,
      accept: ['.txt','.csv','.json'].join(','),
    }
  },
  /* mounted() {
    this.files = null
    const fileinput = this.$refs.file // reference to the b-form-file element
    fileinput.reset()
  }, */
  computed: {
    ...mapState({
      csv_fields: state => state.csv_data.fields,
      csv_lines: state => state.csv_data.lines,
      csv_data: state => state.csv_data.data,
      total_preview_lines: state => state.csv_data.total_preview_lines,
    }),
    files: {
      get() { return this.$store.state.import_settings.files },
      set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'files', value})},
    },

  },
  methods: {
    async parse(file) {
      if(!file) return
      try {
        let total_lines = this.total_preview_lines+1
        if(isNaN(total_lines)) throw new Error(`total preview lines must be a number '(${this.total_preview_lines} provided)'`)
        const parser = new FileParser
        const lines = await parser.getLines(file, total_lines) //read a maximum of 6 lines
        const text = lines.join("\n")
        await this.$store.dispatch('csv_data/setStateProperty', {key:'text', value:text})
        await this.$store.dispatch('csv_data/parse', {text})
      } catch (error) {
        console.log(error)
      }
      // this.$v.$touch()
    },

  },
  watch: {
    files: {
      immediate: true,
      handler(file) {
        this.parse(file)
      }
    }
  },
  validations() {
    return {
      files: {required},
      csv_lines: {minLength: minNumberLines(this.minCsvLength)}, //at least 1 line to import plus the columns
    }
  }
}
</script>

<style>

</style>