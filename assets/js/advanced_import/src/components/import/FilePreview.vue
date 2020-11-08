<template>
  <div>
     <b-card id="table-container"
     v-if="items && items.length>0" class="mt-2" 
        title="Data preview">

        <b-table
            id="my-table"
            :items="items"
            small
            bordered
            striped
            hover
            thClass="th-head"
            >
                <template #head()="data">
                    <section>
                        <span class="d-block small" title="REDCap field">
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
                <span v-if="counting">Counting <font-awesome-icon v-if="counting" icon="spinner" spin/></span>
                <span v-else>Total lines: {{total_lines}}</span>
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
    },
    methods: {
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
            try {
                this.counting = true
                this.total_lines = 0
                if(!file) {
                    this.total_lines = 0
                }else {
                    if(typeof this.countCancel=== 'function') this.countCancel()
                    let parser = new FileParser
                    let promise = parser.countLines(file)
                    this.countCancel = promise.cancel
                    this.total_lines = await promise
                }
            } finally {
                this.counting = false
            }
        },
    },
    watch: {
    files: {
      immediate: true,
      handler(file) {
        //   if(this.count_promise)
        this.count(file)
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