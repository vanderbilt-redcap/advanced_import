<template>
    <div>
        <h6>Review your settings</h6>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>key</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, key) in settings" :key="key">
                    <td>{{key}}</td>
                    <td><pre>{{value}}</pre></td>
                </tr>
            </tbody>
        </table>
        
        <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left" ></slot>
            <!-- <slot>
                <NOTE>CANNOT USE THIS BECAUSE IN CHROME RETURNS 'udnefined'</NOTE>
            </slot> -->
            <section>
                <button class="btn btn-primary ml-2" @click="importCSV" :disabled="processing">
                    <font-awesome-icon v-if="processing" icon="spinner" spin fixed-width/>
                    <font-awesome-icon v-else icon="file-import"  fixed-width/>
                    <span> import</span>
                </button>
            </section>
            <slot name="right" :validation="$v" ></slot>
        </div>

        <b-modal ref="modal-success" title="Process completed" ok-only @hidden="onCloseModal" size="xl">
            <p class="my-4">The import proces is completed. Please check the <router-link :to="{name:'logs'}">logs</router-link> for details.</p>
            <LogsTable ref="logs"/>
        </b-modal>

        <b-modal ref="modal-upload" title="Uploading CSV file"
            ok-only
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
            ok-title='cancel'
            @ok="onProcessStopped"
        >
            <FileUploader ref="uploader" :files="files"/>
        </b-modal>

        <b-modal ref="modal-process" id="modal-process" title="Processing CSV file"
            ok-only
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
            ok-title='cancel'
            @ok="onProcessStopped"
            size="xl"
        >
            <FileProcesser ref="processer" :background_process="background_process" />
            <LogsTable ref="logs"/>
        </b-modal>

        <b-modal ref="modal-abort" id="modal-abort" title="Process stopped"
            ok-only
            @ok="onProcessStopped"
        >
            <p class="my-4">The process has been stopped by the user</p>
        </b-modal>
        
        <!-- <b-button v-b-modal.modal-process>Launch demo modal</b-button> -->


  </div>
</template>

<script>
import { mapState } from 'vuex'
import FileUploader from '@/components/FileUploader'
import FileProcesser from '@/components/FileProcesser'
import LogsTable from '@/components/LogsTable'

export default {
    components: {FileUploader,FileProcesser, LogsTable},
    data() {
        return {
            processing: false,
            background_process: false,
        }
    },
    computed: {
        ...mapState({
            files: state => state.import_settings.files,
            event_id: state => state.import_settings.event_id,
            form_name: state => state.import_settings.form_name,
            import_settings: state => state.import_settings,
        }),
        dynamic_fields() { return this.$store.getters['import_settings/mappedDynamicFields'] },
        settings() {
            const {name:file_name=''} = this.files || {}
            const import_settings = {...this.import_settings}
            const settings = {
                'file name': file_name,
                'event ID': import_settings.event_id,
                'form name': import_settings.form_name,
                'field delimiter': import_settings.field_delimiter,
                'text qualifier': import_settings.text_qualifier,
                'dates format': import_settings.dates_format,
                'import mode': import_settings.import_mode,
                'primary key': import_settings.primary_key,
                'dynamic fields': this.dynamic_fields,
                'mapping': import_settings.mapping,
            }
            return settings
        }
    },
    methods: {
        showModal(ref_name) {
            const promise = new Promise((resolve, reject) => {
                const modal_element = this.$refs[ref_name]
                if(!modal_element) return reject()
                const onShown = () => {
                    modal_element.$off('shown', onShown)
                    resolve()
                }
                modal_element.$on('shown', onShown)
                modal_element.show()
            })
            return promise
        },
        closeModal(ref_name) {
            const promise = new Promise((resolve, reject) => {
                const modal_element = this.$refs[ref_name]
                if(!modal_element) return reject()
                const onShown = () => {
                    modal_element.$off('hidden', onShown)
                    resolve()
                }
                modal_element.$on('hidden', onShown)
                modal_element.hide()
            })
            return promise
        },
        /**
         * upload a file for later processing
         */
        async upload() {
            await this.showModal('modal-upload')
            const uploader = this.$refs.uploader
            uploader.$on('completed', () => {
                this.closeModal('modal-upload')
            })
            uploader.$on('error', ({message, file, error})=> {
                console.log({message, file, error})
            })
            return uploader.upload()
        },
        updateLogs() {
            const {getLogs} = this.$refs.logs
            if(typeof getLogs !=='function') return
            getLogs()
        },
        async showCompleted() {
            await this.showModal('modal-success')
        },

        /**
         * process the reomte file
         */
        async enqueProcess(file_name) {

            try {
                const settings = {...this.import_settings}
                settings.dynamic_fields = this.dynamic_fields // only gey dynamic fields that are actually mapped
                const response = await this.$API.dispatch('importData/enqueue',file_name, settings)
                const {data} = response
                const message = `Import process created (ID ${data['job_id']}). Please check your logs.`
                await this.$bvModal.msgBoxOk(message, {
                    title: 'Success',
                    buttonSize: 'sm',
                })
                this.$router.push({name: 'home'})
            } catch (error) {
                let error_message = error
                if(typeof error === 'object') {
                    const { response: {data} } = error
                    const {message='error'} = data
                    error_message = `${message}`
                }
                this.$bvModal.msgBoxOk(error_message, {
                    title: 'Error',
                    buttonSize: 'sm',
                })
            }            
        },
        async onProcessStopped() {
            await this.showModal('modal-abort')
        },
        /**
         * start the process:
         * - upload the file
         * - process the remote file
         */
        async importCSV() {
            try {
                const {file_name} = await this.upload()
                if(!file_name) return
                // let file_name = 'Data8277.csv'
                await this.enqueProcess(file_name)
            } catch (error) {
                console.log(error)
            }finally {
                this.processing = false
                this.background_process = false
            }
        },
        onCloseModal() {
            // this.$router.push({name: 'home'})
            console.log('done')
        },
    },
    validations() {
        return {}
    }
}
</script>

<style scoped>

</style>