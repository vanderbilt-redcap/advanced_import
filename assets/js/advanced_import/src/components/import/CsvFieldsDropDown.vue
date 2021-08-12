<template>
  <b-dropdown  variant="outline-secondary" class="checkbox-dropdown bg-white" >
    <template #button-content>
        <div>
            <span>{{buttonText}}</span>
        </div>
    </template>
    <b-dropdown-text >
        <span v-if="multiSelectEnabled" class="small font-italic text-info" >multiple selection</span>
        <span v-else class="small font-italic text-muted" >single selection</span>
    </b-dropdown-text>
    <b-dropdown-text v-for="(csv_field, csvIndex) in csv_fields" :key="csvIndex" >
        <div class="d-flex">
            <b-form-checkbox
                :disabled="isDisabled(csvIndex)" 
                :checked="isMapped(csvIndex)" @input.native.prevent="onSelected(csvIndex, $event.target.checked)"
                switch>
                <span>{{csv_field}}</span>
            </b-form-checkbox>
        </div>
    </b-dropdown-text>

</b-dropdown>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            csv_fields: state => state.csv_data.fields,
            mapping: state => state.import_settings.mapping,
        }),
        buttonText() {
            const total = this.selected.length
            if(total==0) return '--- skip ---'
            const firstCsvIndex = this.selected[0]
            const firstCsvColumn = this.csv_fields[firstCsvIndex]
            if(total==1) return firstCsvColumn
            else return `${firstCsvColumn} and ${total-1} more`
        },
        selected() {
            return this.$store.getters['import_settings/mappedCsvFields'](this.redcapFieldName)
        },
        multiSelectEnabled() {
            return this.redcapFieldType=='checkbox'
        },
    },
    props: {
        redcapFieldName: {
            type: String,
            default: ''
        },
        redcapFieldType: {
            type: String,
            default: ''
        },
    },
    methods: {
        isDisabled(csvIndex) {
            if(this.isMappedElsewhere(csvIndex)) return true
            const otherindexes = this.selected.filter(index => index!=csvIndex) // list of other mapped indexes excluded the current one
            if(otherindexes.length>0 && !this.multiSelectEnabled) return true
            return false
        },
        /**
         * check if a CSV index is assigned to any REDCap field but the one specified
         */
        isMappedElsewhere(csvIndex) {
            const mapping = {...this.mapping}
            for(let [redcapField, csvIndexes] of Object.entries(mapping)) {
                if(redcapField==this.redcapFieldName) continue
                if(csvIndexes.indexOf(csvIndex)>=0) return true
            }
            return false
        },
        /**
         * check if a REDCap field has a specific CSV column assigned
         */
        isMapped(csvIndex) {
            return this.selected.indexOf(csvIndex) >= 0
        },
        onSelected(csvIndex, checked) {
            const fieldName = this.redcapFieldName
            this.$store.dispatch('import_settings/toggleCsvField', {fieldName, csvIndex, checked})
        },
    }
}
</script>

<style>

</style>