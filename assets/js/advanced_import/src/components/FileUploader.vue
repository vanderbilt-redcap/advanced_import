<template>
    <div>
        <div v-if="processing">
            <b-progress  :max="max" show-progress animated variant="success" height="2rem">
                <b-progress-bar :value="progress" :label="`${(progress*100).toFixed(2)}%`"></b-progress-bar>
            </b-progress>
            <!-- <button class="btn btn-danger" @click="onPause">Pause</button> -->
            <div class="text-muted small">
                <span v-if="uploaded_bytes && uploaded_bytes>0">uploaded {{formatBytes(uploaded_bytes)}} of {{formatBytes(file_size)}}</span>
                <non-blank-space />
            </div>
        </div>
        <section class="debug" v-if="false">
            {{progress}}
            {{uploaded_bytes}}
            {{remote_file_name}}
            {{file_size}}
            {{processed}}
        </section>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
import FileReaderAsync from '@/libs/FileReaderAsync'
import {formatBytes} from '@/libs/Utility'

const MIN_CHUNK_SIZE = 1000 * 1024
const MAX_CHUNK_SIZE = 1000 * 1024 * 5
const TOTAL_CHUNKS = 20

export default {
    data() {
        return {
            cancel: null, // placeholder for canceling the promsie
            content: '',
            start: 0,
            end: 0,
            max:1,
            processing: false,
            paused: false,
            abort: false,
            remote_file_name: null, // unique file name used to save the file on the server
            progress: 0,
            uploaded_bytes:0,
            file_size: 0,
            formatBytes,
        }
    },
    props: {
        files: {
            type: [File,Array],
            default: () => []
        }
    },
    computed: {
        /* ...mapState({
            file: state => state.import_settings.files,
        }), */
        file() {
            let files = this.files
            let file
            if(typeof files==='object') file = files
            else if(Array.isArray(files) && files.length>0) file = files[0]
            if(file) return new File([file], file.name)
            else return null
        },
        chunk_size() {
            return this.calcChunkSize(this.file)
        },
        processed() {
            let uploaded_bytes = this.uploaded_bytes || 0
            let file_size = this.file_size || 0
            let formatted_uploaded_bytes =  formatBytes(uploaded_bytes)
            let formatted_file_size =  formatBytes(file_size)
            console.log(formatted_uploaded_bytes,formatted_file_size)
            return `${formatted_uploaded_bytes}/${formatted_file_size}`
        }
    },
    destroyed() {
        this.stop()
    },
    methods: {
        async processChunk(file, chunk) {
            try {
                if(this.abort) return
                const response = await this.sendChunk(file, chunk)
                const {data} = response
                const {uploaded_bytes,file_size} = data
                if(!data) throw new Error('no response') //exit if no response data
                const progress = this.updateProgress(uploaded_bytes, file_size)
                this.$emit('progress', {file, progress, response}) // notify advancement
                // advance the start
                this.start = this.end
                
                const {unique_name} = data
                if(unique_name) this.updateUniqueFileName(unique_name)

                if(!this.paused && (this.end < file.size)) {
                    return this.upload()
                }
                else {
                    // exit if we are done
                    this.reset()
                    let result = {component:this,file_name:this.remote_file_name }
                    this.$emit('completed', result) // notify completed
                    return result
                }
            } catch (error) {
                const {response={}} = error
                const {data={}} = response
                const {message=''} = data
                // console.log(message, file, error)
                this.$emit('error', {message, file, error}) // notify error
                this.reset()
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
            const promise = this.$API.dispatch('upload/upload',file, chunk)
            this.cancel = promise.cancel
            return promise
        },
        calcChunkSize(file) {
            if(!file) return MIN_CHUNK_SIZE
            const {size=0} = file
            let chunk_size = size/TOTAL_CHUNKS
            if(chunk_size<MIN_CHUNK_SIZE) return MIN_CHUNK_SIZE
            if(chunk_size>MAX_CHUNK_SIZE) return MAX_CHUNK_SIZE
            return chunk_size
        },
        updateProgress(uploaded_bytes, file_size) {
            this.uploaded_bytes = uploaded_bytes
            this.file_size = file_size
            if(isNaN(uploaded_bytes) || isNaN(file_size)) return
            if(file_size<=0) return
            let percentage = uploaded_bytes/file_size
            this.progress = percentage
            return percentage
        },
        async upload() {
            if(!this.file) return
            const file = this.file
            this.processing = true
            this.paused = false
            this.end = this.start + this.chunk_size + 1
            const blob = file.slice( this.start, this.end )
            const file_reader = new FileReaderAsync()
            const chunk = await file_reader.readAsDataURLAsync(blob)
            return this.processChunk(file, chunk)
        },
        stop() {
            if(typeof this.cancel==='function') this.cancel()
            this.abort = true
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
                this.cancel = null
                this.start = 0
                this.end = 0
                this.processing = false
                this.paused = false
                this.abort = false
            },1000)
        }
    }
}
</script>

<style>

</style>