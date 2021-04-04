<template>
    <div>
        <div class="form-group">
            <label for="field_name_row">Dates Format <b-button class="" v-b-modal.modal-datetime-formats size="sm" variant="outline-info"><font-awesome-icon class="icon" :icon="['fas', 'question-circle']" /></b-button></label>
            <b-input-group v-if="true">
                <b-form-input id="dates_format" v-model="dates_format"></b-form-input>
                <template #append>
                    <DateHelper class="date-helper" @dateDetected="($event)=> dates_format=$event"/>
                </template>

            </b-input-group>
        </div>
        <!-- <ul v-if="false">
            <li>date order (DMY,DYM, MDY, MYD, YDM, YMD)</li>
            <li>four digits years (true, false)</li>
            <li>date delimiter (/)</li>
            <li>zero padding date (yes, no)</li>
            <li>time delimiter (:)</li>
            <li>decimal symbol (.)</li>
            <li>bynary data encoding (base64, none)</li>
        </ul> -->
        <b-modal size="xl" id="modal-datetime-formats" title="Date/time formats" ok-only>
            <div class="my-4">
                <p>The following characters are recognized by the date parser.</p>
                <DateFormatsTable />
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
import DateFormatsTable from '@/components/DateFormatsTable'
import DateHelper from '@/components/import/DateHelper'

export default {
    components: {DateFormatsTable, DateHelper},
    computed: {
        dates_format: {
            get() { return this.$store.state.import_settings.dates_format },
            set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'dates_format', value})},
        },
    },
    methods: {
        showDateHelper() {

        },
    },
    validations: {},

}
</script>

<style scoped>
.date-helper >>> .btn.dropdown-toggle {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>