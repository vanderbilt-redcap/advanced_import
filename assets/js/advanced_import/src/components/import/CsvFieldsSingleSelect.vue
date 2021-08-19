<template>
<b-dropdown class="w-100" text="Dropdown Button" :variant="hasMapping ? 'success': 'outline-primary'" lazy>
    <template #button-content>
        <span>{{selectedText}}</span>
    </template>
    <b-dropdown-item @click="onChange(null)" :active="skip">-- skip --</b-dropdown-item>
    <b-dropdown-item v-for="(field, index) in csv_fields" :key="index" @click="onChange(index)"
        :disabled="!isMapped(index) && isMappedElsewhere(index)" :active="isMapped(index)">
        <span>{{field}}</span>
    </b-dropdown-item>
</b-dropdown>

</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState({
            csv_fields: state => state.csv_data.fields,
            mapping: state => state.import_settings.mapping,
        }),
        options() {
            const fields = this.csv_fields
            const options = []
            const skipOption = {value: null, text: '-- skip --'}
            options.push(skipOption)
            for(let index in fields) {
                const option = {value: index, text: fields[index]}
                options.push(option)
            }
            return options
        },
        csvIndexes() {
            return this.$store.getters['import_settings/mappedCsvFields'](this.redcapFieldName)
        },
        selectedText() {
            const skipText = '--- skip ---'
            const csvIndexes = this.csvIndexes
            if(csvIndexes.length<1) return skipText
            const csvIndex = csvIndexes[this.fieldIndex]
            if(!Number.isInteger(csvIndex)) return skipText
            return this.csv_fields[csvIndex]
        },
        skip() {
            if(!Array.isArray(this.csvIndexes)) return true
            return !Number.isInteger(this.csvIndexes[this.fieldIndex])
        },
        hasMapping() {
            return Number.isInteger(this.csvIndexes[this.fieldIndex])
        }
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
        fieldIndex: {
            type: [Number, String],
            default: 0
        },
    },
    methods: {
        /**
         * check if a CSV index is assigned to any REDCap field but the one specified
         */
        isMappedElsewhere(csvIndex) {
            const mapping = {...this.mapping}
            for(let [redcapField, csvIndexes] of Object.entries(mapping)) {
                if(!Array.isArray(csvIndexes)) csvIndexes = []
                if(redcapField==this.redcapFieldName) {
                    let otherIndexes = csvIndexes.filter((value, index) =>index!=csvIndex)
                    if(otherIndexes.indexOf(csvIndex)>=0) return true
                }
                else if(csvIndexes.indexOf(csvIndex)>=0) return true
            }
            return false
        },
        /**
         * check if a REDCap field has a specific CSV column assigned
         */
        isMapped(csvIndex) {
            return this.csvIndexes[this.fieldIndex]==csvIndex
        },
        onChange(value) {
            const fieldName = this.redcapFieldName
            const csvIndex = value
            const fieldIndex = this.fieldIndex
            this.$store.dispatch('import_settings/setFieldMapping', {fieldName, csvIndex, fieldIndex})
        },
    }
}
</script>

<style scoped>

</style>