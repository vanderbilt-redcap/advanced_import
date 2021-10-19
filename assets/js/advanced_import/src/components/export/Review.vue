<template>
  <div>
      <p>Export to CSV</p>
      <table class="table table-bordered table-striped ">
          <thead>
              <tr>
                  <th>key</th>
                  <th>value</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(value,key) in settings" :key="key">
                  <td>{{key}}</td>
                  <td>{{value}}</td>
              </tr>
          </tbody>
      </table>

      <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left"></slot>
            <slot></slot>
            <button class="btn btn-primary" @click="exportCSV">
                <font-awesome-icon icon="file-export" />
                <span> Download</span>
            </button>

            <!-- <slot name="right" :validation="$v"></slot> -->
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            settings: state => state.export_settings,
            field_delimiter: state => state.export_settings.field_delimiter,
            text_qualifier: state => state.export_settings.text_qualifier,
            event_id: state => state.export_settings.event_id,
            form_name: state => state.export_settings.form_name,
        }),
        download_url() {
            console.log(this.settings)

            return this.$API.dispatch('exportData/getExportUrl', this.settings)
        }
    },
    methods: {
        async exportCSV() {
            const settings = {...this.settings}
            await this.$API.dispatch('exportData/download', settings)
            this.$router.push({name: 'home'})
        },
    },
    validations: {},
}
</script>

<style>

</style>