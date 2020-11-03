<template>
    <div>
        <div class="my-2">
            <p>Choose an import mode.</p>
            <!-- <label for="">Import Mode</label> -->
            <div class="form-check">
                <input class="form-check-input" type="radio" name="import_mode" id="append" value="append" v-model="import_mode">
                <label class="form-check-label" for="append"><strong>Append:</strong> add new records</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="import_mode" id="update" value="update" v-model="import_mode">
                <label class="form-check-label" for="update"><strong>Update:</strong> update existing records</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="import_mode" id="append-update" value="append-update" v-model="import_mode">
                <label class="form-check-label" for="append-update"><strong>Append/Update</strong>: add new records or update existing ones</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="import_mode" id="delete" value="delete" v-model="import_mode">
                <label class="form-check-label" for="delete"><strong>Delete:</strong> delete matching records</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="import_mode" id="copy" value="copy" v-model="import_mode">
                <label class="form-check-label" for="copy"><strong>Copy:</strong> delete all records and repopulate from the source</label>
            </div>
        </div>

        <slot :validation="$v"></slot>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    computed: {
        import_mode: {
            get() { return this.$store.state.import_settings.import_mode},
            set(value) { this.$store.dispatch('import_settings/setStateProperty', {key: 'import_mode', value})},
        },
    },
    validations: {
        import_mode: {required}
    }
}
</script>

<style>

</style>