<template>
  <div>
     <b-card id="table-container"
     v-if="items_proxy && items_proxy.length>0" class="mt-2" 
        :title="title">

        <b-table
            id="my-table"
            :items="items_proxy"
            small
            bordered
            striped
            hover
            thClass="th-head"
            >
                <template #head()="data">
                    <section>
                        <span class="d-block small" title="REDCap field">
                            <non-blank-space />
                            <b-badge variant="danger">{{getMappingIndex(data.column)}}</b-badge>
                            <!-- <b-badge variant="success" class="ml-1" v-if="isDynamic(data.column)">D</b-badge> -->
                            <font-awesome-icon icon="level-down-alt" v-if="isDynamic(data.column)" class="ml-1 text-success" title="dynamic"/>
                            <font-awesome-icon icon="star" v-if="isPrimaryKey(data.column)" class="ml-1 text-warning" title="primary key"/>
                        </span>
                        <!-- <span class="">{{ data.label }}</span> -->
                        <span class="d-block small" title="CSV column">{{ data.column }}</span>
                    </section>
                </template>
                <!-- <template #foot()="data">
                </template> -->
            </b-table>
            <section>
                <span v-if="counting">Counting lines:</span>
                <span v-else>Total lines:</span>
                <span> {{formatNumber(total_lines)}}</span>
            </section>
        </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FileParser from '@/libs/FileParser'

export default {
    data() {
        return {
            counting: false,
            total_lines: 0,
        }
    },
    computed: {
        ...mapState({
            items: state => state.csv_data.data,
            files: state => state.import_settings.files,
        }),
        title() {
            let title = 'Preview'
            if(this.files && this.files.name) {
                let {name=false} = this.files
                if(name) title = `${name} (preview)`
            }
            return title
        },
        /**
         * proxy for items.
         * return dummy data if no file is selected
         */
        items_proxy() {
            let files = this.files
            if(!files) {
                const dummy_items = [...Array(5).keys()].map(() => ({'no data':"\u001E"}))
                return dummy_items
            }
            return this.items
        },
    },
    destroyed() {
        this.stopCount()
    },
    methods: {
        formatNumber(number) {
            return new Intl.NumberFormat('en-US', {}).format(number)
        },
        getMappingIndex(column_name) {
            const {mapping} = {...this.$store.state.import_settings}
            const first_item = this.items[0] || {}
            const items_keys = Object.keys(first_item)
            const index = items_keys.indexOf(column_name)
            const redcap_field = Object.keys(mapping).find(key => mapping[key] === index)
            return redcap_field
        },
        isDynamic(column_name) {
            let redcap_field = this.getMappingIndex(column_name)
            const {dynamic_keys} = {...this.$store.state.import_settings}
            return dynamic_keys.indexOf(redcap_field)>=0
        },
        isPrimaryKey(column_name) {
            let redcap_field = this.getMappingIndex(column_name)
            const {primary_key} = {...this.$store.state.import_settings}
            return redcap_field && redcap_field==primary_key
        },
        async count(file) {
            if(!file) return

            let timer_label = 'count lines'
            try {
                console.time(timer_label)
                this.counting = true
                this.total_lines = 0
                if(!file) {
                    this.total_lines = 0
                }else {
                    this.stopCount() // stop previous counting if any
                    let parser = new FileParser
                    let promise = parser.countLines(file)
                    this.countCancel = promise.cancel
                    this.total_lines = await promise
                }
            } finally {
                console.timeEnd(timer_label)
                this.counting = false 
            }
        },
        stopCount() {
            if(typeof this.countCancel==='function') {
                this.countCancel()
                this.countCancel = null // remove reference
            }
        },
        async countGenerator(file) {
            this.stopCount() // stop previous counting if any
            if(!file) return
            let timer_label = 'count lines'
            // try {
                console.time(timer_label)
                this.counting = true
                this.total_lines = 0
                
                if(!file) {
                    this.total_lines = 0
                }else {
                    let parser = new FileParser
                    let generator = parser.countLinesGenerator(file)

                    /**
                     * better memory performance
                     */
                    const timeout = () => {
                        const next = async() => {
                            let result = await generator.next()
                            let {value={}} = result
                            let {partial=false, cancel} = value
                            if(partial) {
                                this.countCancel = cancel // set reference to the stopping function
                                if(partial) this.total_lines += partial
                                setTimeout(next, 100) //recursive call
                            }
                            else {
                                console.timeEnd(timer_label)
                                this.counting = false
                            }
                        }
                        next()
                    }
                    this.timeout = timeout
                    timeout()
                    

                    /**
                     * faster
                     */
                    const asyncGeneratorLoop = async() => {
                        const loop = async() => {
                            for await (let {partial, cancel} of generator) {
                                this.cancel = cancel
                                if(partial) this.total_lines += partial
                            }
                        }
                        await loop()
                        console.timeEnd(timer_label)
                        this.counting = false
                    }
                    this.asyncGeneratorLoop = asyncGeneratorLoop
                    
                }
            /*} finally {
                console.timeEnd(timer_label)
                this.counting = false
            } */
        },
    },
    watch: {
    files: {
      immediate: true,
      handler(file) {
        //   this.test1()
        //   if(this.count_promise)
        this.countGenerator(file)
      }
    }
  },
}
</script>

<style scoped>
#table-container {
    overflow-x: scroll;
}
</style>