<template>
    <div>
        <p>The wizard guessed the mapping for you but you can adjust the mapping as needed and select the dynamic fields.</p>
        
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Destination Field (REDCap)</th>
                    <th>Source Field (CSV file)</th>
                    <th>Dynamic <b-button class="" v-b-modal.modal-dynamic-fields size="sm" variant="outline-info"><font-awesome-icon class="icon" :icon="['fas', 'question-circle']" /></b-button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(field, index) in form_fields" :key="index">
                    <td>
                        <span class="d-flex flex-row align-items-center">
                            <span>{{field.element_label}}</span>
                            <font-awesome-icon v-if="field.field_name===primary_key"
                            title="primary key"
                            class="icon text-warning ml-1"
                            :icon="['fas', 'star']" />
                        </span>
                        <span class="small">({{field.field_name}})</span>
                    </td>
                    <td>
                        <select class="form-control" @change="onInput(field.field_name)($event)" :value="mapping[field.field_name]">
                            <option value="">--- skip ---</option>
                            <option v-for="(csv_field, index) in csv_fields" :key="index" :value="index" :disabled="Object.values(mapping).includes(index)">{{csv_field}}</option>
                        </select>
                        <div>
                            <!-- <b-button-group class="mt-2">
                                <select class="form-control" @change="onInput(field.field_name)($event)" :value="mapping[field.field_name]">
                                    <option value="">--- skip ---</option>
                                    <option v-for="(csv_field, index) in csv_fields" :key="index" :value="index" :disabled="Object.values(mapping).includes(index)">{{csv_field}}</option>
                                </select>
                                <b-button>

                                <b-form-checkbox v-model="dynamic_keys" :disabled="!field.field_name || isNaN(mapping[field.field_name])" :value="field.field_name">
                                </b-form-checkbox>
                                </b-button>
                            </b-button-group> -->
                        </div>
                    </td>
                    <td>
                        <b-form-checkbox v-if="field.field_name!==primary_key"
                            v-model="dynamic_keys"
                            :disabled="!field.field_name || isNaN(mapping[field.field_name])"
                            :value="field.field_name" switch>
                        </b-form-checkbox>
                        <!-- <input type="checkbox" name="" id="" v-model="dynamic_keys" :disabled="!field.field_name || !mapping[field.field_name]" :value="field.field_name"> -->
                    </td>
                </tr>
            </tbody>
        </table>
        <b-modal id="modal-dynamic-fields" title="Dynamic fields" ok-only>
            <div class="my-4">
                <p>Mark as "dynamic" the fields that could change in an entry.</p>
                <p>If you are importing "medications" in a repeated form, for example, you may want to mark the "status" field as dynamic since it could change in time.</p>
                <p>Dynamic fields will be ignored when the wizard will try to determine the uniqueness of a row.</p>
            </div>

        </b-modal>

        <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left" ></slot>
            <slot></slot>
            <slot name="right" :validation="$v"></slot>
        </div>
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
            csv_fields: state => state.csv_data.fields,
            mapping: state => state.import_settings.mapping,
            primary_key: state => state.import_settings.primary_key,
        }),
        dynamic_keys: {
            get() { return this.$store.state.import_settings.dynamic_keys},
            set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'dynamic_keys', value})},
        },
        form_fields() {
            const { form_name } = this.$store.state.import_settings
            const fields = this.$store.getters['settings/form_fields'](form_name)
            return fields
        },
    },
    methods: {
        onInput(field_name) {
            return (event) => {
                const value = Number(event.target.value)
                if(!field_name || isNaN(value)) {
                    console.log(`error mapping the field ${field_name}`)
                    return
                }
                this.$store.dispatch('import_settings/setMapping', {target:field_name, source: value})
            }
        }
    },
    validations() {
        const form_field_names = [...this.form_fields].map(field => field.field_name)
        return {
            mapping: {
                required(mapping) {
                    const mapping_keys = Object.keys(mapping)
                    const mapped_form_fields = form_field_names.filter(value => mapping_keys.includes(value))
                    return mapped_form_fields.length>=1
                },
                primaryKeyIsMapped(mapping) {
                    const mapping_keys = Object.keys(mapping)
                    const primary_key = this.primary_key
                    return mapping_keys.includes(primary_key)
                }
            }
        }
    }
}
</script>

<style>

</style>