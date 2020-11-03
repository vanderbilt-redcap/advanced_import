<template>
    <div class="form-group">
        <label for="text_qualifier">Text qualifier</label>
        <select class="form-control" id="text_qualifier" :value="value" @input="onInput">
            <option value="" disabled>Select...</option>
            <option v-for="(text_qualifier, key) in text_qualifiers" :key="key" :value="text_qualifier.value">{{text_qualifier.label}}</option>
        </select>
      </div>
</template>

<script>
export const TEXT_QUALIFIERS = Object.freeze({
//   NONE: {label: '-- none --', value: ''},
  DOUBLE_QUOTE: {label: '" (double quote)', value: '"'},
  QUOTE: {label: '\' (quote)', value: '\''},
  BACKTICK: {label: '` (backtick)', value: '`'},
  TILDE: {label: '~ (tilde)', value: '~'},
})

export default {
    data() {
        return {
            text_qualifiers: TEXT_QUALIFIERS,
        }
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        onInput(event) {
            const target = event.target
            this.$emit('input', target.value)
        },
    }
}
</script>

<style>

</style>