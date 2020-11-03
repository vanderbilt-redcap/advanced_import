<template>
    <div>
        <div>
            <label for="txt">txt</label>
            <input type="radio" v-model="$v.file_format.$model" id="txt" value="txt" >
        </div>
        <div>
            <label for="csv">csv</label>
            <input type="radio" v-model="$v.file_format.$model" id="csv" value="csv" >
        </div>
        <div>
            <label for="json">json</label>
            <input type="radio" v-model="$v.file_format.$model" id="json" value="json" >
        </div>
        {{file_format}}
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            file_format: null,
        }
    },
}
</script>

<style>

</style>