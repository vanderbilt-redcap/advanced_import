<template>
  <div id="app" v-if="status==status_list.READY">
    <div class="d-block">
      <b-badge v-if="debugMode" variant="warning">Debug mode on</b-badge>
    </div>
    <!-- <button @click="toggleDebug">Toggle debug</button> -->
    <router-view/>
  </div>
</template>

<script>
import '@/init'
import store from '@/store' // store
import router from '@/router' //router


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
  computed: {
    debugMode() {
      return this.$store.state.app.debugMode
    }
  },
  async created() {
    const exposeCsrfToken = (settings) => {
      const {redcap_csrf_token=''} = settings
      if(!window.redcap_csrf_token) window.redcap_csrf_token = redcap_csrf_token
    }
    this.status = status_list.LOADING
    const response =  await this.$API.dispatch('settings/get')
    const {data: settings={}} = response
    exposeCsrfToken(settings)
    await this.$store.dispatch('settings/setState', settings)
    this.status = status_list.READY
  },
  methods: {
    toggleDebug() {
      this.$store.dispatch('app/setState', {debugMode: !this.debugMode})
    }
  }
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
