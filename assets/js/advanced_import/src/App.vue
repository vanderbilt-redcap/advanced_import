<template>
  <div id="app" v-if="status==status_list.READY">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '@/store' // store
import router from '@/router' //router
// API
import {plugin as API_Plugin} from '@/API'
Vue.use(API_Plugin)

/* Bootstrap */
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import  {fas} from '@fortawesome/free-solid-svg-icons' //import the whole library
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers) // for stacking icons

/* Vuelidate */
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import NonBlankSpace from '@/components/NonBlankSpace'
Vue.component('non-blank-space', NonBlankSpace)

const status_list = Object.freeze({
  READY: 'ready',
  LOADING: 'loading',
  ERROR: 'error',
})

export default {
  name: 'App',
  store,
  router,
  data() {
    return {
      status: null,
      status_list,
    }
  },
  components: {},
  async created() {
    this.status = status_list.LOADING
    const response =  await this.$API.dispatch('settings/get')
    const {data: settings={}} = response
    await this.$store.dispatch('settings/setState', settings)
    this.status = status_list.READY
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 20px;
}
</style>
