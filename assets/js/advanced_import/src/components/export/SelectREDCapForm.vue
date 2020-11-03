<template>
    <div>
        <p>Select the you want to export.</p>
        <EventFormSelect v-model="form" />
        
        <div class="buttons d-flex flex-row justify-content-between" >
            <slot name="left" ></slot>
            <slot></slot>
            <slot name="right" :validation="$v"></slot>
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
                const event_id = this.$store.state.export_settings.event_id
                const form_name = this.$store.state.export_settings.form_name
                return {event_id,form_name}
            },
            set({event_id,form_name}) {
                this.$store.dispatch('export_settings/setStateProperty',{key: 'event_id', value: event_id})
                this.$store.dispatch('export_settings/setStateProperty',{key: 'form_name', value: form_name})
            },
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