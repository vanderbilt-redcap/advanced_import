<template>
    <div>
        <FileUploader ref="uploader" :files="files"/>
              <b-form-file
            id="file"
            v-model="files"
            ref="file"
            DISABLED-state="Boolean(files)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            :accept="accept"
            ></b-form-file>
            <b-button @click="upload">upload</b-button>
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
import FileUploader from '@/components/FileUploader'

export default {
    components: {FileUploader},
    data() {
        return {
            cat,
            files: null,
            progress: 0,
            max: 100,
            uploading: false,
            completed: false,
        }
    },
    computed: {},
    methods: {
        onUploadCompleted() {
            console.log(arguments)
        },
        upload() {
           const uploader = this.$refs.uploader
            uploader.$on('completed', () => {
                console.log(arguments)
            })
            uploader.$on('error', ({message, file, error})=> {
                console.log({message, file, error})
            })
            return uploader.upload()
        }
    },
}
</script>

<style scope>

</style>