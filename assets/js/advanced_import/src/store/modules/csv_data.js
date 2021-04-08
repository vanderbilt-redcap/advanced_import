import {default as papaparse, config as parse_config} from '@/libs/CsvParser'
import {setTimeoutAsync} from '@/libs/Utility'
import FileParser from '@/libs/FileParser'
let stopCountingLines

const initialState = {
    total_preview_lines: 5, // number of lines to save for displaying the preview
    fields: [], // name of columns
    lines: [], // lines of text
    data: [], // list of translated data
    text: '', // text to be parsed and used as preview
    total_lines: 0,
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
                let message = 'Error parsing the csv file.'
                message = errors.reduce((accumulator, error)=> {
                    let error_message = error.message
                    return `${accumulator}\n${error_message}`
                }, message)
                throw new Error(message)
            }
            await context.dispatch('setStateProperty', {key:'data', value:data})
            await context.dispatch('setStateProperty', {key:'fields', value:fields})
            if(delimiter) {
                await context.dispatch('import_settings/setStateProperty', {key: 'field_delimiter', value: delimiter}, { root: true })
            }
        },
        stopCounting() {
            if(typeof stopCountingLines==='function') stopCountingLines()
        },
        async countFileLines(context, file) {
            if(typeof stopCountingLines==='function') stopCountingLines()
            if(!file) {
                return context.dispatch('setStateProperty', {key:'total_lines', value:0})
            }
            
            let timer_label = 'count lines (timeout)'+Math.random()
            console.time(timer_label)

            let total = 0
            file = new File([file], file.name) // duplicate the file
            let parser = new FileParser
            let generator = parser.countLinesGenerator(file)

            const next = async() => {
                let result = await generator.next()
                let {value={}} = result
                let {partial=false, cancel} = value
                if(partial) {
                    stopCountingLines = cancel // set reference to the stopping function
                    if(partial) total += partial
                    await context.dispatch('setStateProperty', {key:'total_lines', value:total})
                    return await setTimeoutAsync(next, 100) //recursive call
                }
            }
            await next()
            console.timeEnd(timer_label)
        },
        async countFileLinesFast(context, file) {
            if(typeof stopCountingLines==='function') stopCountingLines()
            if(!file) {
                return context.dispatch('setStateProperty', {key:'total_lines', value:0})
            }

            let timer_label = 'count lines (fast)'+Math.random()
            console.time(timer_label)

            file = new File([file], file.name) // duplicate the file
            let total = 0
            let parser = new FileParser
            let generator = parser.countLinesGenerator(file)

            const loop = async() => {
                for await (let {partial, cancel} of generator) {
                    stopCountingLines = cancel
                    if(partial) {
                        total += partial
                        await context.dispatch('setStateProperty', {key:'total_lines', value:total})
                    }
                }
            }
            let loop_promise = loop()
            console.timeEnd(timer_label)
            return await loop_promise
        }
    },
}

export default module;