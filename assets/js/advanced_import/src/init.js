import Vue from 'vue'
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