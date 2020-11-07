<template>
    <div>
        <input type="file" ref="fileinput" @change="onFileChanged">
        <button class="btn btn-info d-block my-2" @click="upload(0)" :disabled="!file||processing">upload</button>
        <div v-if="processing">
            <b-progress  :max="max" show-progress animated variant="success">
                <b-progress-bar :value="progress" :label="`${(progress*100).toFixed(2)}%`"></b-progress-bar>
            </b-progress>
            <button class="btn btn-danger" @click="onPause">Pause</button>
            <div>Processing {{current_part}}/{{parts}}</div>
        </div>
        {{progress}}
        {{remote_file_name}}
        {{chunk_size}}
    </div>
</template>

<script>
// import { mapState } from 'vuex'
import FileReaderAsync from '@/libs/FileReaderAsync'

const MIN_CHUNK_SIZE = 1000 * 1024
const MAX_CHUNK_SIZE = 1000 * 1024 * 10
const TOTAL_CHUNKS = 20

export default {
    data() {
        return {
            content: '',
            start: 0,
            end: 0,
            files: [],
            max:1,
            processing: false,
            paused: false,
            remote_file_name: null, // unique file name used to save the file on the server
        }
    },
    computed: {
        /* ...mapState({
            file: state => state.import_settings.files,
        }), */
        file() {
            if(this.files.length<1) return null
            return this.files[0]
        },
        current_part() {
            if(this.start==0) return 0
            return Math.floor(this.start/this.chunk_size)
        },
        parts() {
            if(!this.file) return 0
            return Math.ceil(this.file.size/this.chunk_size)
        },
        progress() {
            return this.calculateProgress(this.file, this.start)
        },
        chunk_size() {
            return this.calcChunkSize(this.file)
        }
    },
    methods: {
        async processChunk(file, chunk) {
            try {
                const response = await this.sendChunk(file, chunk)
                const {data} = response
                if(!data) throw new Error('no response') //exit if no response data
                const progress = this.calculateProgress(file, this.end)
                this.$emit('progress', {file, progress, response}) // notify advancement
                // advance the start
                this.start = this.end

                if(!this.paused && (this.end < file.size)) {
                    const {unique_name} = data
                    this.updateUniqueFileName(unique_name)
                    this.upload()
                }
                else {
                    // exit if we are done
                    this.reset()
                    return this.$emit('completed', {component:this,file_name:this.remote_file_name }) // notify completed
                }
            } catch (error) {
                const {response={}} = error
                const {data={}} = response
                const {message=''} = data
                console.log(message)
                for (const key in error) {
                    if (key in error) {
                        const element = error[key]
                        console.log(element, key)
                    }
                }
                this.reset()
                return this.$emit('error', {file, error}) // notify error
            }

        },
        calculateProgress(file, position) {
            try {
                const value = position / file.size
                if(position<0) return 0
                if(position>file.size) return 1
                return value
            } catch (error) {
                return 0
            }
        },
        sendChunk(file, chunk) {
            return this.$API.dispatch('upload/upload',file, chunk)
        },
        calcChunkSize(file) {
            if(!file) return MIN_CHUNK_SIZE
            const {size=0} = file
            let chunk_size = size/TOTAL_CHUNKS
            console.log("projected chunk size:", chunk_size)
            if(chunk_size<MIN_CHUNK_SIZE) return MIN_CHUNK_SIZE
            if(chunk_size>MAX_CHUNK_SIZE) return MAX_CHUNK_SIZE
            return chunk_size
        },
        async upload() {
            if(!this.file) return
            this.processing = true
            this.paused = false
            const file = this.file
            this.end = this.start + this.chunk_size + 1
            const blob = file.slice( this.start, this.end )
            const file_reader = new FileReaderAsync()
            const chunk = await file_reader.readAsDataURLAsync(blob)
            this.processChunk(file, chunk)

        },
        onFileChanged() {
            console.log(this.$refs.fileinput.files)
            this.files = this.$refs.fileinput.files
        },
        onPause() {
            this.processing = false
            this.paused = true
        },
        updateUniqueFileName(unique_name=false) {
            if(!this.file.unique_name) {
                this.file.unique_name = unique_name
                this.remote_file_name = unique_name
            }
        },
        reset() {
            setTimeout(()=>{
                this.$refs.fileinput.value = null
                this.start = 0
                this.end = 0
                this.processing = false
                this.paused = false
            },1000)
        }
    }
}
</script>

<style>

</style>