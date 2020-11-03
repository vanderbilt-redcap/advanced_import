<template>
    <div class="form-group">
        <label for="events">REDCap forms</label>
        <select class="form-control" id="events" v-model="form" @change="onInput" >
            <optgroup v-for="(forms, event_id) in events" :key="`evt-group${event_id}`" :label="getEventName(event_id)+` (Event # ${event_id})`">
                <option v-for="(form_name) in forms" :value="{event_id,form_name}" :key="`form-${event_id}-${form_name}`" :data-event-id="event_id" :data-form-name="form_name">{{form_name}}</option>
            </optgroup>
        </select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {}
        }
    },
    props: {
        value: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        events() {
            try {
                return this.$store.state.settings.project_data.events_forms
            } catch (error) {
                return []
            }
        },
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.form = value
            }
        }
    },
    methods: {
        getEventName(event_id) {
            const event_info = this.$store.getters['settings/event_info'](event_id)
            return event_info.name_ext || ''
        },
        onInput() {
            let value = {...this.form}
            this.$emit('input', value)
        }
    },
}
</script>

<style>

</style>