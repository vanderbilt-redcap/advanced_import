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
                    <td>{{value}}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left" ></slot>
            <slot>
                <section>
                    <!-- <button class="btn btn-primary" @click="importCSVBackground" :disabled="processing">
                        <font-awesome-icon v-if="processing" icon="spinner" spin/>
                        <font-awesome-icon v-else icon="file-import" />
                        <span> background import</span>
                    </button> -->
                    <button class="btn btn-primary ml-2" @click="importCSV" :disabled="processing">
                        <font-awesome-icon v-if="processing" icon="spinner" spin/>
                        <font-awesome-icon v-else icon="file-import" />
                        <span> import</span>
                    </button>
                </section>
            </slot>
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
            all_settings: state => state.import_settings,
        }),
        settings() {
            const {name:file_name=''} = this.files || {}
            const all_settings = {...this.all_settings}
            const settings = {
                'file name': file_name,
                'event ID': all_settings.event_id,
                'form name': all_settings.form_name,
                'field delimiter': all_settings.field_delimiter,
                'text qualifier': all_settings.text_qualifier,
                'dates format': all_settings.dates_format,
                'import mode': all_settings.import_mode,
                'primary key': all_settings.primary_key,
                'dynamic keys': all_settings.dynamic_keys,
                'mapping': all_settings.mapping,
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
                alert(123)
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
        importCSVBackground() {
            //set the background flag to true. will be reset after importCSV is complete
            this.background_process = true
            this.importCSV()
        },
        /**
         * process the reomte file
         */
        async process_csv(file_name) {
            let processer
            try {
                await this.showModal('modal-process')
                processer = this.$refs.processer
                processer.$on('progress', this.updateLogs)
                processer.$on('completed', this.showCompleted)
                await processer.process(file_name)
            } catch (error) {
                console.log(error)
            }finally {
                processer.$off('progress', this.updateLogs)
                processer.$off('completed', this.showCompleted)
                this.closeModal('modal-process')
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
                await this.process_csv(file_name)
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
    validations: {}
}
</script>

<style scoped>

</style>