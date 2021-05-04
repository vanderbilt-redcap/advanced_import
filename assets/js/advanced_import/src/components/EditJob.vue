<template>
  <div>
    <b-form-group v-for="(value, key) in form" :key="key"
     :label="key" :label-for="`input-${key}`">
        <b-form-checkbox :id="`input-${key}`" v-model="form[key]" v-if="(typeof value =='boolean')" />
        <b-form-input v-else
          :id="`input-${key}`"
          v-model="form[key]"
        ></b-form-input>
      </b-form-group>

    <footer>
      <slot name="footer" :form="form" :object_keys="object_keys"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      object_keys: [], // store keys of the JSON that need to be converted back to object
    }
  },
  props: {
    job: {
      type: Object,
      default: null
    }
  },
  methods: {
    editObject(key, value) {
      console.log(key, value)
      if(typeof value!='object') return
    }
  },
  watch: {
    job: {
      immediate: true,
      handler(job) {
        for(let [key, value] of Object.entries(job)) {
          if(value==null) value = undefined
          /**
           * stringify objects for editing, but keep track of the key
           * to convert it back to object before sending to server
           */
          else if(typeof value =='object') {
            if(this.object_keys.indexOf(key)<0) this.object_keys.push(key)
            value = JSON.stringify(value)
          }
          this.$set(this.form, key, value)
        }
      }
    }
  }
}
</script>

<style>

</style>