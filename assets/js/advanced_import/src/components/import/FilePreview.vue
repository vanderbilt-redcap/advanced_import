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
                            <b-badge variant="info" v-if="Boolean(getMappingIndex(data.column))" >
                                <span>{{getMappingIndex(data.column)}}</span>
                                <font-awesome-icon icon="star" v-if="isPrimaryKey(data.column)" class="ml-1 text-warning" title="primary key"/>
                                <font-awesome-icon icon="level-down-alt" v-if="isDynamic(data.column)" class="ml-1 text-danger" title="dynamic"/>
                            </b-badge>
                            <!-- <b-badge variant="success" class="ml-1" v-if="isDynamic(data.column)">D</b-badge> -->
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

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            items: state => state.csv_data.data,
            total_lines: state => state.csv_data.total_lines,
            counting: state => state.csv_data.counting,
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
        this.$store.dispatch('csv_data/stopCounting')
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
        
    },
    watch: {
    files: {
      immediate: true,
      handler(file) {
          this.$store.dispatch('csv_data/countFileLinesFast', file)
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