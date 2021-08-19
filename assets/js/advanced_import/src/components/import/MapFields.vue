<template>
    <div>
        <p>The wizard guessed the mapping for you but you can adjust the mapping as needed and select the dynamic fields.</p>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th class="text-nowrap">Dynamic <b-button class="" v-b-modal.modal-dynamic-fields size="sm" variant="outline-info"><font-awesome-icon class="icon" :icon="['fas', 'question-circle']" /></b-button></th>
                    <th>Destination Field (REDCap)</th>
                    <th>Source Field (CSV file)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(form_field, index) in form_fields" :key="index" >
                    <td class="min text-right">
                        <b-form-checkbox v-if="form_field.field_name!==primary_key"
                            :disabled="!hasMapping(form_field.field_name)"
                            :checked="isDynamic(form_field.field_name)" @input="onDynamicToggle(form_field.field_name, $event)"
                            switch>
                        </b-form-checkbox>
                    </td>
                    <td>
                        <span class="d-flex flex-row align-items-center">
                            <span class="font-weight-bold">{{form_field.field_name}}</span>
                            <font-awesome-icon v-if="form_field.field_name===primary_key"
                            title="primary key"
                            class="icon text-warning ml-1"
                            :icon="['fas', 'star']" />
                        </span>
                        <span class="small" v-html="form_field.element_label"></span>
                    </td>
                    <td>
                        <template v-if="form_field.element_type=='checkbox'">
                            <CsvFieldsDropDown :redcapFieldName="form_field.field_name" :redcapFieldType="form_field.element_type" />
                        </template>
                        <template v-else>
                            <CsvFieldsSingleSelect :redcapFieldName="form_field.field_name" />
                        </template>
                    </td>
                    
                </tr>
            </tbody>
        </table>
        <b-modal id="modal-dynamic-fields" title="Dynamic fields" ok-only>
            <div class="my-4">
                <p>Mark as "dynamic" the fields that are not relevant in determining the uniqueness of an entry (i.e. can be different compared to existing data).</p>
                <p>If you are importing "medications" in a repeated form, for example, you may want to mark the "status" field as dynamic since it could have changed since the previous import.</p>
                <p>Dynamic fields will be ignored when the wizard will try to determine the uniqueness of a row.</p>
            </div>

        </b-modal>

        <p>Remember to map the primary key to proceed.</p>

        <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left" ></slot>
            <slot></slot>
            <slot name="right" :validation="$v"></slot>
        </div>
    </div>
</template>

<script>
import CsvFieldsDropDown from './CsvFieldsDropDown'
import CsvFieldsSingleSelect from './CsvFieldsSingleSelect'
import { mapState } from 'vuex'

export default {
    components: { CsvFieldsDropDown, CsvFieldsSingleSelect },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            csv_fields: state => state.csv_data.fields,
            // mappingList: state => state.import_settings.mappingList,
            primary_key: state => state.import_settings.primary_key,
            mapping: state => state.import_settings.mapping,
            dynamic_fields: state => state.import_settings.dynamic_fields,
        }),
        form_fields() {
            const { form_name } = this.$store.state.import_settings
            const primaryKey = this.primary_key
            const fields = this.$store.getters['settings/mappable_fields'](form_name, primaryKey)
            return fields
        },
    },
    methods: {
        onDynamicToggle(field, checked) {
           this.$store.dispatch('import_settings/toggleDynamicField', {field, checked})
        },
        /**
         * check if a REDCap field has at least a CSV column associated
         */
        hasMapping(redcapField) {
            const csvFields = this.$store.getters['import_settings/mappedCsvFields'](redcapField)
            return csvFields.length>0
        },
        isDynamic(redcapField) {
            return this.dynamic_fields.indexOf(redcapField)>=0
        }
    },
    validations() {
        const getMappedFields = (list) => {
            const mappedFields = []
            for(let [fieldName, indexes] of Object.entries(list) ) {
                if(indexes.length>0) mappedFields.push(fieldName)
            }
            return mappedFields
        }
        return {
            mapping: {
                required(list) {
                    const mappedFields = getMappedFields(list)
                    return mappedFields.length>0
                },
                primaryKeyIsMapped(list) {
                    const mappedFields = getMappedFields(list)
                    const primary_key = this.primary_key
                    return mappedFields.includes(primary_key)
                }
            }
        }
    },
}
</script>

<style scoped>
td.min {
    width: 1%;
    white-space: nowrap;
}
</style>