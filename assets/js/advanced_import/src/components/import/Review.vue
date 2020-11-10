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
                <button class="btn btn-primary" @click="importCSV" :disabled="processing">
                   <font-awesome-icon v-if="processing" icon="spinner" spin/>
                   <font-awesome-icon v-else icon="file-import" />
                   <span> import</span>
                </button>
            </slot>
            <slot name="right" :validation="$v" ></slot>
        </div>

        <b-modal ref="modal-complete" title="Process completed" ok-only @hidden="onCloseModal">
            <p class="my-4">The import proces is completed. Please check the <router-link :to="{name:'logs'}">logs</router-link> for details.</p>
        </b-modal>

        <b-modal ref="modal-upload" title="Uploading CSV file"
            ok-only
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
            ok-title='cancel'
        >
            <p class="my-4">The import process will start after the file upload</p>
            <FileUploader ref="uploader" :files="files"/>
        </b-modal>

        <b-modal ref="modal-process" title="Processing CSV file"
            ok-only
            no-close-on-esc
            no-close-on-backdrop
            hide-header-close
            ok-title='cancel'
        >
            <p class="my-4">Processing the file</p>
            <FileProcesser ref="processer" />
        </b-modal>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import FileUploader from '@/components/FileUploader'
import FileProcesser from '@/components/FileProcesser'

export default {
    components: {FileUploader,FileProcesser},
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
                return resolve()
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
                return resolve()
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
            return uploader.upload()
        },
        /**
         * process the reomte file
         */
        async process_csv(file_name) {
            await this.showModal('modal-process')
            const processer = this.$refs.processer
            await processer.process(file_name)
            this.closeModal('modal-process')
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
                // let file_name = '5de30e1025f1c5830df97051af2dc37c.csv'
                await this.process_csv(file_name)
            } catch (error) {
                console.log(error)
            }finally {
                this.processing = false
            }
        },
        onCloseModal() {
            this.$router.push({name: 'logs'})
        },
    },
    validations: {}
}
</script>

<style>

</style>