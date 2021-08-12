<template>
      <div>
        <p>Please select the record identifier in REDCap</p>

        <b-form-group label="" >
            <b-form-radio v-for="(_primary_key, index) in primary_keys" :key="index" v-model="primary_key" :value="_primary_key">{{_primary_key}}</b-form-radio>
        </b-form-group>
                    

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
            csv_fields: state => state.csv_data.fields,
            mapping: state => state.import_settings.mapping,
        }),
        primary_key: {
            get() { return this.$store.state.import_settings.primary_key },
            async set(value) {
                this.$store.dispatch('import_settings/setPrimaryKey', value)
            },
        }
    },
    created() {
        if(Array.isArray(this.primary_keys) && this.primary_keys.length==1) this.primary_key = this.primary_keys[0]
    },
    methods: {},
    validations() {
        return {
            primary_key : {required},
        }
    }
}
</script>

<style>

</style>