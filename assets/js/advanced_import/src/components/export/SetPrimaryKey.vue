<template>
      <div>
        <p>Please select the record identifier field</p>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Record Identifier (REDCap)</th>
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
        }),
        primary_key: {
            get() { return this.$store.state.export_settings.primary_key },
            set(value) {
                this.$store.dispatch('export_settings/setStateProperty', {key: 'primary_key', value})
            },
        }
    },
    methods: {
    },
    validations() {
        return {
            primary_key : {required},
        }
    }
}
</script>

<style>

</style>