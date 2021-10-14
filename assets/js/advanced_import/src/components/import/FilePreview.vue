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
                            <b-badge variant="info" v-if="Boolean(getRedcapField(data.column))" >
                                <span>{{getRedcapField(data.column)}}</span>
                                <font-awesome-icon icon="star" v-if="isPrimaryKey(data.column)" class="ml-1 text-warning" title="primary key" fixed-width/>
                                <font-awesome-icon icon="level-down-alt" v-else-if="isDynamic(data.column)" class="ml-1 text-danger" title="dynamic" fixed-width/>
                                <font-awesome-icon icon="check-circle" v-else class="ml-1 text-secondary" title="standard" fixed-width/>
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
            csvFields: state => state.csv_data.fields,
            total_lines: state => state.csv_data.total_lines,
            counting: state => state.csv_data.counting,
            files: state => state.import_settings.files,
            mapping: state => state.import_settings.mapping,
            dynamic_fields: state => state.import_settings.dynamic_fields,
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
                const dummy_items = [...Array(5).keys()].map(() => ({'no data':""}))
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
        getRedcapField(column_name) {
            const mapping = {...this.mapping}
            const index = this.csvFields.indexOf(column_name)
            for(let[fieldName, csvIndexes] of Object.entries(mapping)) {
                if(Object.values(csvIndexes).indexOf(index)>=0) return fieldName
            }
            return
        },
        isDynamic(column_name) {
            const redcapField = this.getRedcapField(column_name)
            if(!redcapField) return false
            return this.dynamic_fields.indexOf(redcapField)>=0
        },
        isPrimaryKey(column_name) {
            const redcapField = this.getRedcapField(column_name)
            if(!redcapField) return false
            const {primary_key} = {...this.$store.state.import_settings}
            return redcapField==primary_key
        },
        
    },
    watch: {
        files: {
            immediate: true,
            handler(file) {
                this.$store.dispatch('csv_data/countFileLinesFast', file)
            }
        },
  },
}
</script>

<style scoped>
#table-container {
    overflow-x: scroll;
}

#my-table >>> tbody td::before {
    content: '';
    display: block;
    min-height: 10px;
    float: left;
}
#my-table >>> tbody td {
    vertical-align: middle;;
}

</style>