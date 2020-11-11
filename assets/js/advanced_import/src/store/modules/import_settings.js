import Vue from 'vue'

const initialState = {
    // import options
    // file_format: {},
    files: null,
    field_delimiter: '\t',
    // record_delimiter: 'CRLF',
    text_qualifier: '"',
    field_name_row: 0,
    data_row_start: 1,
    data_row_end: null, // null or negative = all rows
    dates_format: 'Y-m-d H:i',
    // date_format: 'YMD',
    // date_format: 'YMD',
    // four_digits_year: true,
    // date_delimiter: '/',
    // zero_padding_date: true,
    // time_delimiter: ':',
    // decimal_symbol: '.',
    // binary_data_encoding: 'base64', //base64 or null
    // REDCap options
    import_mode: 'append-update',
    event_id: null,
    form_name: null,
    primary_key: '',
    dynamic_keys: [], // keys skipped when determining uniqueness of a row
    mapping: {},
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
        SET_STATE_PROPERTY: (state, {key, value}) => {
            if(key in initialState) state[key] = value
        },
        SET_MAPPING_PROPERTY: (state, {target, source}) => {
            if(source==='' && target in state.mapping) Vue.delete(state.mapping, target)
            else Vue.set(state.mapping, target, source)
        },
    },
    actions: {
        reset(context) { context.commit('SET_STATE', initialState) },
        setState(context, params) { context.commit('SET_STATE', params) },
        setStateProperty(context, {key, value}) { context.commit('SET_STATE_PROPERTY', {key, value}) },
        setMapping(context, {target, source}) { context.commit('SET_MAPPING_PROPERTY', {target, source}) },
        async guessMapping(context) {
            const {state, dispatch, rootGetters, rootState} = context
            const {form_name} = state
            const {fields:csv_fields} = rootState.csv_data
            const fields = rootGetters['settings/form_fields'](form_name)
            fields.forEach(async field => {
                let target = field.field_name
                if(!target) return
                let index = csv_fields.findIndex(csv_field => {
                    let found = csv_field.toUpperCase() === target.toUpperCase()
                    return found
                })
                if(index>=0) {
                    // let source = columns[index]
                    await dispatch('setMapping', {target, source:index})
                }
            })
            return state.mapping
        },
        async setPrimaryKey(context, primary_key) {
            context.commit('SET_STATE_PROPERTY', {key:'primary_key', value:primary_key})
        },
        async guessPrimaryKeysMapping(context) {
            const {dispatch, rootState} = context
            const {columns} = rootState.csv_data
            const {primary_keys=[]} = rootState.settings
            primary_keys.forEach( async target => {
                let index = columns.indexOf(target)
                if(index>=0) {
                    await dispatch('setMapping', {target, source:index})
                }
            })
        },
    },
}

export default module;