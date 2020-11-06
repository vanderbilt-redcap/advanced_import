<template>
    <div>
        <FileUploader @completed="onUploadCompleted"/>
        <div class="d-flex flex-row justify-content-center align-items-center">
            <b-card 
                title="This is a test"
                :img-src="cat">
            <template #header>
                <h6 class="mb-0">Header Slot</h6>
            </template>
                <b-card-text>
                This is a test
                </b-card-text>
                <template #footer>
                    <h6 class="mb-0">Footer Slot</h6>
                </template>
            </b-card>
        </div>
        <!-- <div>
            <input type="file" ref="file" @change="onFileChange">
            <button @click="upload">upload</button>
        </div>
        <b-progress :value="progress" :max="max" show-progress animated v-if="uploading"></b-progress>
        <span v-else-if="completed">Completed!</span> -->
    </div>
</template>

<script>
import cat from "@/assets/crying-cat.jpg"
import Uploader from '@/libs/Uploader/Uploader'
import FileUploader from '@/components/import/FileUploader'

export default {
    components: {FileUploader},
    data() {
        return {
            cat,
            file: null,
            progress: 0,
            max: 100,
            uploading: false,
            completed: false,
        }
    },
    computed: {},
    methods: {
        upload() {
            try {
                this.uploading = true
                this.completed = false
                this.progress = 0
                const upload_callback = (form_data) => this.$API.dispatch('upload/upload', form_data)
                const uploader = new Uploader({upload_callback, chunk_size:1000*1024*1})
                uploader.on('progress', (event) => {
                    const {type, details} = event
                    const {progress} = details
                    this.progress = progress
                    console.log(details, type, progress)
                })
                uploader.on('completed', (event) => {
                    console.log(event)
                    this.uploading = false
                    this.completed = true
                })
                uploader.on('error', (event) => {
                    console.log(event)
                    this.uploading = false
                    this.completed = false
                })

                uploader.upload(this.file)
            } catch (error) {
                console.log(error)
            }
        },
        onFileChange(event) {
            console.log(event)
            const file_element = this.$refs.file
            const file_list = file_element.files
            const file = file_list[0] || false
            this.file = file

        },
        update(subject, event, data) {
            console.log(subject, event, data)
        },
        onUploadCompleted({component,file_name}) {
            console.log(component,file_name)
        }
    },
}
</script>

<style scope>

</style>