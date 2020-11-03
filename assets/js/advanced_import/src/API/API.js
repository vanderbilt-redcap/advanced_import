import axios from 'axios'

// import {API_BASE_URL} from '@/config'

export default class API {
    route = '' // route name for the CDP Mapping API
    actions = {} // api actions
    module_prefix = 'advanced_import'

    constructor({modules}) {
        let baseURL = `/api/`
        this.baseURL = baseURL
        const redcap_params = this.getRedCapQueryParams()
        
        this.api_client = axios.create({
            baseURL,
            timeout: 60*1000,
            headers: {common: {'X-Requested-With': 'XMLHttpRequest'}}, // set header for REDCap ajax
            paramsSerializer: (params) => {
                params = Object.assign({}, redcap_params, params)
                const search_params =  new URLSearchParams(params)
                return search_params.toString()
            },
        })
        
        this.loadModules(modules)
    }
    
    /**
     * set project_id, page, module prefix
     * also set redcap_csrf_token if available
     */
    getRedCapQueryParams() {
        let params = new URLSearchParams(location.search)
        // get PID from current location
        let pid = params.get('pid')
        let query_params = {
            pid,
            page: 'api',
            type: 'module',
            prefix: this.module_prefix,
        }
        if(window.redcap_csrf_token) query_params.redcap_csrf_token = window.redcap_csrf_token // csrf token for post requests
        return query_params
    }

    dispatch(command)
    {
        const [name, action] = command.split('/')
        const params = [...arguments].slice(1)
        return this.actions[name][action].call(this, ...params)
    }

    /**
     * load action in the provided modules
     */
    loadModules(modules={}) {
        for(let [name, module={}] of Object.entries(modules)) {
            const {actions={}} = module
            this.actions[name] = {...actions}
        }
    }

    test(number=123) {
        return this.http_client.get(`test/${number}`)
    }
}