<template>
    <div>
        <div v-if="processing">
            <b-progress  :max="max" show-progress animated variant="success" height="2rem">
                <b-progress-bar :value="progress" :label="`${(progress*100).toFixed(2)}%`"></b-progress-bar>
            </b-progress>
            <!-- <button class="btn btn-danger" @click="onPause">Pause</button> -->
            <div class="text-muted small">
                <span v-if="total_lines && total_lines>0">Processed {{current_line}}/{{total_lines}}</span>
                <non-blank-space />
            </div>
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
            processing: false,
            abort: false,
            progress: 0,
        }
    },
    computed: {
        ...mapState({
            settings: state => state.import_settings,
            total_lines: state => state.csv_data.total_lines,
        }),
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

                const next = async (line) => {
                    const settings = {...this.settings}
                    settings.data_row_start = line
                    const promise = this.$API.dispatch('importData/processCSV',file_name, settings)
                    this.cancel = promise.cancel
                    const response = await promise
                    const {data} = response
                    if(data) {
                        const {line=1} = data
                        let progress = this.updateProgress({line})
                        this.$emit('progress', {progress})
                        return next(line)
                    }
                }
                await next(line)
                this.$emit('completed')
            } catch (error) {
                this.$emit('error', error)
            }finally {
                this.processing = false
            }

        },
        updateProgress({line}) {
            if(this.total_lines<=0) return
            if(line) this.current_line = line
            if(isNaN(this.current_line) || isNaN(this.total_lines)) return
            if(this.current_line>this.total_lines) this.current_line = this.total_lines
            let progress = this.current_line/this.total_lines
            this.progress = progress
            return progress
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