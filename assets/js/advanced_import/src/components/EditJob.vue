<template>
  <div>
    <b-form-group v-for="(input, key) in form" :key="key"
     :label="key" :label-for="`input-${key}`">
        <b-form-input
          :id="`input-${key}`"
          v-model="form[key]"
        ></b-form-input>
      </b-form-group>

    <footer>
      <slot name="footer" :form="form"></slot>
    </footer>
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
    job: {
      type: Object,
      default: null
    }
  },
  method: {
    update() {

    }
  },
  watch: {
    job: {
      immediate: true,
      handler(job) {
        for(let [key, value] of Object.entries(job)) {
          this.$set(this.form, key, value)
        }
      }
    }
  }
}
</script>

<style>

</style>