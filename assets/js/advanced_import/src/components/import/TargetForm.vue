<template>
    <div>
        <p>Select a destination form.</p>

        <EventFormSelect v-model="form" />

        <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left" ></slot>
            <slot></slot>
            <slot name="right" :validation="$v" :processFunction="processSettings"></slot>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import EventFormSelect from '@/components/EventFormSelect'

export default {
    components: {EventFormSelect},
    computed: {
        form: {
            get() {
                const event_id = this.$store.state.import_settings.event_id
                const form_name = this.$store.state.import_settings.form_name
                return {event_id,form_name}
            },
            set({event_id,form_name}) {
                this.$store.dispatch('import_settings/setStateProperty',{key: 'mapping', value: {}}) //reset the mapping
                this.$store.dispatch('import_settings/setStateProperty',{key: 'event_id', value: event_id})
                this.$store.dispatch('import_settings/setStateProperty',{key: 'form_name', value: form_name})
            },
        },
    },
    methods: {
        // this function is processed befo switching to the next tab in the import wizard
        async processSettings() {
            // await this.$store.dispatch('import_settings/setStateProperty', {key: 'dynamic_keys', value:[]}) // reset the dynamic keys
            // await this.$store.dispatch('import_settings/setStateProperty',{key:'mapping', value: {}}) // reset the mappimg before guessing
            return this.$store.dispatch('import_settings/guessMapping')
        },
    },
    validations: {
        form: {
            isValidObject: ({event_id,form_name}) => {
                return (required(event_id) && required(form_name))
            }
        }
    },
}
</script>

<style>

</style>