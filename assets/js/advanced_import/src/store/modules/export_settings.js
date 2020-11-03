const initialState = {
    // export options
    field_delimiter: '\t',
    text_qualifier: '"',
    // record_delimiter: 'CRLF',
    // date_format: 'YMD',
    // four_digits_year: true,
    // date_delimiter: '/',
    // zero_padding_date: true,
    // time_delimiter: ':',
    // decimal_symbol: '.',
    // binary_data_encoding: 'base64', //base64 or null
    // REDCap options
    event_id: null,
    form_name: null,
    primary_key: '',
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
        SET_STATE_PROPERTY: (state, {key, value}) => { if(key in initialState) state[key] = value} ,
    },
    actions: {
        setState(context, params) { context.commit('SET_STATE', params) },
        setStateProperty(context, {key, value}) { context.commit('SET_STATE_PROPERTY', {key, value}) },
    },
}

export default module;