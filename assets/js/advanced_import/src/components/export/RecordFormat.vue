<template>
  <div>
    <p>Select the field delimiter and the text qualifier.</p>
    <div class="d-flex flex-row align-items-center">
      
      <FieldDelimiter v-model="field_delimiter" class="col pl-0"/>
      
      <TextQualifier v-model="text_qualifier" class="col px-0"/>

    </div>

    <div class="buttons d-flex flex-row justify-content-between" >
        <slot name="left" ></slot>
        <slot></slot>
        <slot name="right" :validation="$v"></slot>
    </div>

  </div>
</template>

<script>
import { required, requiredIf } from 'vuelidate/lib/validators'

import {default as FieldDelimiter, isStandardDelimiter} from '@/components/FieldDelimiter'
import TextQualifier from '@/components/TextQualifier'

export default {
  components: {FieldDelimiter, TextQualifier},
  data() {
    return {}
  },
  computed: {
    field_delimiter: {
      get() { return this.$store.state.export_settings.field_delimiter },
      set(value) {
        this.$store.dispatch('export_settings/setStateProperty', {key: 'field_delimiter', value})
      },
    },
    text_qualifier: {
      get() { return this.$store.state.export_settings.text_qualifier },
      set(value) { this.$store.dispatch('export_settings/setStateProperty', {key: 'text_qualifier', value})},
    },
  },
  validations() {
    return {
      field_delimiter: {
        required: requiredIf((value) => !isStandardDelimiter(value)),
      },
      text_qualifier: {required},
    }
  },
}
</script>

<style>

</style>