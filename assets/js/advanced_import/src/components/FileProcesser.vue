<template>
    <div>
        <div v-if="processing">
            <b-progress  :max="max" show-progress animated variant="success" height="2rem">
                <b-progress-bar :value="progress" :label="`${(progress*100).toFixed(2)}%`"></b-progress-bar>
            </b-progress>
            <!-- <button class="btn btn-danger" @click="onPause">Pause</button> -->
            <div v-if="lines && lines>0">Processed {{current_line}}/{{lines}}</div>
        </div>
        <section class="debug" v-if="false">
            {{progress}}
            {{processing}}
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            cancel: null,
            max:1,
            current_line: 0,
            lines: 0,
            processing: false,
            abort: false,
            progress: 0,
        }
    },
    props: {

    },
    computed: {
        ...mapState({
            settings: state => ({...state.import_settings}),
        })

    },
    destroyed() {
        this.reset()
    },
    methods: {
        /**
         * process a remote file.
         * start from line 1 by default
         * since on line 0 we usually have field names
         */
        async process(file_name, line=1) {
            if(this.abort) return
            this.processing = true
            try {
                const settings = {...this.settings}
                settings.data_row_start = line
                const promise = this.$API.dispatch('importData/processCSV',file_name, settings)
                this.cancel = promise.cancel
                const response = await promise
                const {data} = response
                console.log(data)
                if(data) {
                    const {line=1, total_lines} = data
                    this.updateProgress({line, total_lines})
                    return this.process(file_name, line)
                }
            } catch (error) {
                console.log(error)
            }finally {
                this.processing = false
            }

        },
        updateProgress({line, total_lines}) {
            if(line) this.current_line = line
            if(total_lines) this.lines = total_lines
            if(isNaN(line) || isNaN(total_lines)) return
            this.progress = line/total_lines
        },
        reset() {
            if(typeof this.cancel==='function') this.cancel()
            this.abort = true
        }
    }
}
</script>

<style>

</style>