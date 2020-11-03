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
        
        <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left" ></slot>
            <slot>
                <button class="btn btn-primary" @click="importCSV" :disabled="processing">
                   <font-awesome-icon v-if="processing" icon="spinner" spin/>
                   <font-awesome-icon v-else icon="file-import" />
                   <span> import</span>
                </button>
            </slot>
            <slot name="right" :validation="$v" ></slot>
        </div>

        <b-modal ref="modal" id="modal-process-complete" title="Process completed" ok-only @hidden="onCloseModal">
            <p class="my-4">The import proces is completed. Please check the <router-link :to="{name:'logs'}">logs</router-link> for details.</p>
        </b-modal>

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
        showModal() {
            this.$refs['modal'].show()
        },
        async importCSV() {
            try {
                this.processing = true
                const settings = {...this.$store.state.import_settings}
                const file = settings.files
                const response = await this.$API.dispatch('importData/sendCSV',file, settings)
                this.showModal()
                return response
            } catch (error) {
                console.log(error)
            }finally {
                this.processing = false
            }
        },
        onCloseModal() {
            this.$router.push({name: 'home'})
        },
    },
    validations: {}
}
</script>

<style>

</style>