<template>
<b-container>
    <b-row v-for="(option, index) in checkboxOptions" :key="index" class="d-flex flex-column option">
        <b-col class="small">
            <span>[{{index}}]:</span>
            <!-- <font-awesome-icon :icon="['fas', 'arrow-right']" fixed-width class="small"/> -->
            <span class="ml-1">{{option}}</span>
        </b-col>
        <b-col class="">
            <CsvFieldsSingleSelect :redcapFieldName="redcapFieldName" :fieldIndex="index" />
        </b-col>
    </b-row>
</b-container>
</template>

<script>

import CsvFieldsSingleSelect from '@/components/import/CsvFieldsSingleSelect'

export default {
    components: { CsvFieldsSingleSelect },
    computed: {
        checkboxOptions() {
            const options =  this.$store.getters['settings/checkboxFieldOptions'](this.redcapFieldName);
            return options
        },

    },
    props: {
        redcapFieldName: {
            type: String,
            default: ''
        },
        redcapFieldType: {
            type: String,
            default: ''
        },
    },
    methods: {

    }
}
</script>

<style scoped>
.option + .option {
    margin-top: 5px;
}
.option {
    border: solid 1px rgba(200,200,200,1);
    padding: 5px 0;
    background-color: rgba(230,230,230, 1);
}
</style>