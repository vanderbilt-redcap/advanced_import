<template>
  <div>
      <h6>Import settings</h6>
      <table class="table table-bordered table-striped">
          <thead>
              <tr>
                  <th>key</th>
                  <th>value</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(value, key) in all_settings" :key="key">
                  <td>{{key}}</td>
                  <td>{{value}}</td>
              </tr>
          </tbody>
      </table>
      <slot :validation="$v" :processFunction="importCSV"></slot>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            processing: false,
        }
    },
    computed: {
        ...mapState({
            files: state => state.import_settings.files,
            event_id: state => state.import_settings.event_id,
            form_name: state => state.import_settings.form_name,
            all_settings: state => state.import_settings,

        }),
        settings() {
            const {name:file_name=''} = this.files || {}
            const settings = {
                'File name': file_name,
                'Event ID': this.event_id,
                'Form name': this.form_name,
            }
            return settings
        }
    },
    methods: {
        async importCSV() {
            const settings = {...this.$store.state.import_settings}
            const file = settings.files
            const response = await this.$API.dispatch('importData/sendCSV',file, settings)
            return response
        }
    },
    validations: {}
}
</script>

<style>

</style>