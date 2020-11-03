<template>
    <div class="">
        <!-- <input type="text" :value="value" disabled> -->
        <div class="form-group">
            <label for="field_delimiter">Field delimiter</label>
            <div class="input-group">
                <select class="form-control" id="field_delimiter" v-model="selected" @input="onInput" v-bind="$attrs">
                    <option value="" disabled>Select...</option>
                    <option v-for="(field_delimiter, key) in FIELD_DELIMITERS" :key="key" :value="field_delimiter.value">{{field_delimiter.label}}</option>
                </select>
                <div class="input-group-prepend">
                    <input id="custom-delimiter" class="form-control" :disabled="isStandardDelimiter(value)" type="text" placeholder="custom delimiter" v-model="custom" @input="onInput">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export const FIELD_DELIMITERS = Object.freeze({
    TAB: {label: 'tab', value: '\t'},
    SPACE: {label: 'space', value: ' '},
    SEMICOLON: {label: '; (semicolon)', value: ';'},
    COMMA: {label: ', (comma)', value: ','},
    PIPE: {label: '| (pipe)', value: '|'},
    CARET: {label: '^ (caret)', value: '^'},
    OTHER: {label: '-- other --', value: 'other'},
})

export const isStandardDelimiter = (value) => {
    const delimiters = []
    for (let [key, delimiter] of Object.entries(FIELD_DELIMITERS)) {
        if(key!=='OTHER') delimiters.push(delimiter.value)
    }
    
    return delimiters.indexOf(value) >= 0
}

export default {
    data() {
        return {
            FIELD_DELIMITERS,
            selected: '',
            custom: '',
        }
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(value) {
                // select the 'other' option when a non standard value is set
                if(this.isStandardDelimiter(value)) {
                    this.selected = value
                    this.custom = ''
                }
                else this.selected = 'other'
            }
        }
    },
    methods: {
        onInput(event) {
            const target = event.target
            let value = target.value
            if(this.isStandardDelimiter(value)) this.$emit('input', value)
            else this.$emit('input', this.custom)
        },
        isStandardDelimiter,
    }
}
</script>

<style>

</style>