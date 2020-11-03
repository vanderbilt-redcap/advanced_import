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
      <slot name="right" :validation="$v" :processFunction="parseFile"></slot>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      accept: ['.txt','.csv','.json'].join(',')
    }
  },
  mounted() {
    this.files = null
    this.$refs.file.reset()
  },
  computed: {
    files: {
      get() { return this.$store.state.import_settings.files },
      set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'files', value})},
    }
  },
  watch: {
    /* files: {
      immediate: true,
      handler(value) {
        console.log(this)
        if(typeof this.$refs.fileinput!=='undefined') this.$refs.fileinput.files = value
      }
    } */
  },
  methods: {
    // this function is processed befo switching to the next tab in the import wizard
    async parseFile() {
      const settings = {...this.$store.state.import_settings}
      const file = settings.files
      const response = await this.$API.dispatch('importData/parse',file, settings)
      const {data} = response
      if(data.delimiter) await this.$store.dispatch('import_settings/setStateProperty', {key: 'field_delimiter', value: data.delimiter})
      await this.$store.dispatch('csv_data/setState', data)
      return data
    },
  },
   validations: {
    files: {required},
   }
}
</script>

<style>

</style>