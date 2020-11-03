/**
 * set a global $API reference
 */
import api from '@/API'

export default {
    install(Vue) {
        // set a global $API reference with params
        Vue.$API = api
        // Add Vue instance methods by attaching them to Vue.prototype.
        Vue.prototype.$API = api
    },
}