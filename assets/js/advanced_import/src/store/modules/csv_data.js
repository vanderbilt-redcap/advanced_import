import {default as papaparse, config as parse_config} from '@/libs/CsvParser'

const initialState = {
    total_preview_lines: 5, // number of lines to save for displaying the preview
    fields: [], // name of columns
    lines: [], // lines of text
    data: [], // list of translated data
    text: '', // text to be parsed and used as preview
}

const module = {
    namespaced: true,
    state: {...initialState},
    mutations: {
        SET_STATE: (state, payload) => {
            for(let [key, value] of Object.entries(payload)) {
                if(key in initialState) state[key] = value
            }
        },
        SET_STATE_PROPERTY: (state, {key, value}) => { if(key in initialState) state[key] = value },
    },
    actions: {
        reset(context) { context.commit('SET_STATE', initialState) },
        setState(context, params) { context.commit('SET_STATE', params) },
        setStateProperty(context, {key, value}) { context.commit('SET_STATE_PROPERTY', {key, value}) },
        async parse(context, {text, config={}}) {
            if(!text) return
            config = {...parse_config, ...config}
            const {data=[], errors=[], meta={}} = papaparse.parse(text, config)
            const {fields=[], delimiter} = meta
            if(errors.length>0) {
                let message = 'error parsing the csv file'
                message = errors.reduce((accumulator, error)=> {
                    let error_message = error.message
                    return `${accumulator}\n${error_message}`
                }, message)
                console.log(errors, message, text)
                return new Error(message)
            }
            await context.dispatch('setStateProperty', {key:'data', value:data})
            await context.dispatch('setStateProperty', {key:'fields', value:fields})
            if(delimiter) {
                await context.dispatch('import_settings/setStateProperty', {key: 'field_delimiter', value: delimiter}, { root: true })
            }
        }
    },
}

export default module;