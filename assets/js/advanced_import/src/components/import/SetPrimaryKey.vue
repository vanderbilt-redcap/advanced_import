<template>
      <div>
        <p>Please select the record identifier field and map it to a column in the CSV file</p>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Record Identifier (REDCap)</th>
                    <th>Source Field (CSV file)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <select class="form-control" v-model="primary_key">
                            <option value="" disabled>Select...</option>
                            <option class="form-control" v-for="(primary_key, index) in primary_keys" :key="index">{{primary_key}}</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-control" @change="onInput(primary_key)($event)" :value="mapping[primary_key]" :disabled="!primary_key">
                            <option value="" disabled>Select...</option>
                            <option v-for="(column, index) in csv_columns" :key="index" :value="index">{{column}}</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left" ></slot>
            <slot></slot>
            <slot name="right" :validation="$v"></slot>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            primary_keys: state => state.settings.primary_keys,
            csv_columns: state => state.csv_data.columns,
            mapping: state => state.import_settings.mapping,
        }),
        primary_key: {
            get() { return this.$store.state.import_settings.primary_key },
            set(value) {
                this.$store.dispatch('import_settings/setStateProperty', {key: 'primary_key', value})
            },
        }
    },
    methods: {
        onInput(field_name) {
            return (event) => {
                const value = Number(event.target.value)
                if(!field_name || isNaN(value)) {
                    console.log('error mapping the primary key')
                    return
                }
                this.$store.dispatch('import_settings/setMapping', {target:field_name, source: value})
            }
        }
    },
    validations() {
        return {
            primary_key : {required},
            mapping: {
                [this.primary_key]: { required }
            }
        }
    }
}
</script>

<style>

</style>