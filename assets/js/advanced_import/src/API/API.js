import axios from 'axios'

const CancelToken = axios.CancelToken;
// let cancel // placeholder for the cancel function

// import {API_BASE_URL} from '@/config'

export default class API {
    route = '' // route name for the CDP Mapping API
    actions = {} // api actions
    module_prefix = 'advanced_import'
    cancel = null

    constructor({modules}) {        
        /* const redcap_params = this.getRedCapQueryParams()
        
        this.api_client = axios.create({
            baseUR: this.baseURL,
            timeout: 60*1000,
            headers: {common: {'X-Requested-With': 'XMLHttpRequest'}}, // set header for REDCap ajax
            paramsSerializer: (params) => {
                params = Object.assign({}, redcap_params, params)
                const search_params =  new URLSearchParams(params)
                return search_params.toString()
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                this.cancel = c
            })
        }) */
        
        this.loadModules(modules)
    }

    get baseURL() {
        const app_path_webroot = window.app_path_webroot || '/'
        let baseURL = `${app_path_webroot}/api/`
        baseURL = baseURL.replace(/\/\//i, '/')
        return baseURL
    } 

    createClient(cancelToken) {
        const redcap_params = this.getRedCapQueryParams()
        
        return axios.create({
            baseURL: this.baseURL,
            timeout: 60*1000,
            headers: {common: {'X-Requested-With': 'XMLHttpRequest'}}, // set header for REDCap ajax
            paramsSerializer: (params) => {
                params = Object.assign({}, redcap_params, params)
                const search_params =  new URLSearchParams(params)
                return search_params.toString()
            },
            cancelToken,
        })
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

    /**
     * duplicate the instance of the current object
     * and assign it a new api_client
     * this way all requests can be canceled individually
     * @param {*} command 
     */
    dispatch(command)
    {
        const [name, action] = command.split('/')
        const params = [...arguments].slice(1)
        
        // create a cancel function and a cancelToken function
        const {token: cancelToken, cancel} = CancelToken.source()
        
        // set the context
        const context = {
            $api: this,
            api_client: this.createClient(cancelToken),
        }

        let result = this.actions[name][action](context, ...params)
        if(typeof result === 'object') {
            // check if the result if an object (a promise)
            result.cancel = cancel // pass the cancel along with the promise
        }
        return result
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