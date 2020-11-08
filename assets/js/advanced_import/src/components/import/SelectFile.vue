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
import {default as papaparse, config as parse_config} from '@/libs/CsvParser'
import FileParser from '@/libs/FileParser'
const parser = new FileParser

// check the minimum number of parsed CSV lines
const minNumberLines = (min) => (value, vm) =>  {
    return vm.csv_data.length >= min;
};

export default {

  data() {
    return {
      accept: ['.txt','.csv','.json'].join(','),
    }
  },
  mounted() {
    this.files = null
    this.$refs.file.reset()
  },
  computed: {
    ...mapState({
      csv_fields: state => state.csv_data.fields,
      csv_lines: state => state.csv_data.lines,
      csv_data: state => state.csv_data.data,
    }),
    files: {
      get() { return this.$store.state.import_settings.files },
      set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'files', value})},
    },

  },
  methods: {
    async parse(file) {
      if(!file) return
      const lines = await parser.getLines(file, 6) //read a maximum of 6 lines
      const text = lines.join("\n")
      const {data=[], errors=[], meta={}} = papaparse.parse(text, parse_config)
      const {fields=[], delimiter} = meta
      const payload = {data, lines, fields}
      if(errors.length>0) {
        console.log(errors)
        alert('error parsing the csv file')
      }else {
        if(delimiter) await this.$store.dispatch('import_settings/setStateProperty', {key: 'field_delimiter', value: delimiter})
        await this.$store.dispatch('csv_data/setState', payload)
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
      csv_data: {minLength: minNumberLines(1)}, //at least 1 line to import plus the columns
    }
  }
}
</script>

<style>

</style>