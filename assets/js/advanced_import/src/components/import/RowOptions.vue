<template>
    <div>
        <div class="d-flex flex-row align-items-center">
            <div class="form-group col p-0">
                <label for="field_name_row">Field name row</label>
                <input class="form-control" type="number" id="field_name_row" v-model="field_name_row">
            </div>
            <div class="form-group col p-0 ml-2">
                <label for="data_row_from">Data row</label>
                <div class="d-flex flex-row align-items-center">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">from</span>
                        </div>
                        <input class="form-control" type="number" v-model="$v.data_row_start.$model">
                    </div>
                    <div class="input-group ml-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">to</span>
                        </div>
                        <input class="form-control" type="number" v-model="$v.data_row_end.$model">
                    </div>
                </div>
            </div>
        </div>
        
        <slot :validation="$v"></slot>
    </div>
</template>

<script>
import { required,numeric,minValue } from 'vuelidate/lib/validators'

export default {
    computed: {
        field_name_row: {
            get() { return this.$store.state.import_settings.field_name_row },
            set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'field_name_row', value})},
        },
        data_row_start: {
            get() { return this.$store.state.import_settings.data_row_start },
            set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'data_row_start', value})},
        },
        data_row_end: {
            get() { return this.$store.state.import_settings.data_row_end },
            set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'data_row_end', value})},
        },
    },
    validations() {
        // to use dynamic values in validation, the `validations` property needs to be a function
        return {
            field_name_row: {required, numeric, minValue: minValue(1)},
            data_row_start: {required, numeric, minValue: minValue(1)},
            data_row_end: {numeric, minValue: minValue(this.data_row_start+1)},
        }
    },
}
</script>

<style>

</style>