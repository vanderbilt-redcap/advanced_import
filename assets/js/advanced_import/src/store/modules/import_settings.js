// import Mapping from '@/libs/Mapping'

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
    dynamic_fields: [],
    mapping: {}, // csv_index to REDCap field
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
        SET_MAPPING: (state, mapping) => state.mapping = mapping,
        // SET_MAPPING_LIST: (state, list) => state.mappingList = list,
    },
    actions: {
        reset(context) { context.commit('SET_STATE', initialState) },
        setState(context, params) { context.commit('SET_STATE', params) },
        setStateProperty(context, {key, value}) { context.commit('SET_STATE_PROPERTY', {key, value}) },
        /* setMappingList(context) {
            const { form_name } = context.state
            const fields = context.rootGetters['settings/form_fields'](form_name)
            const list = fields.map(properties => {
                const {field_name: field, form_name: form, element_type:type, element_label: label} = properties
                return new Mapping({field, form, type, label })
            })
            context.commit('SET_MAPPING_LIST', list)
        }, */
        /**
         * attach/detach a CSV field to a REDCap field.
         * 
         * @param {object} context 
         * @param {*} params 
         * @returns 
         */
         toggleCsvField({state, commit}, {fieldName, csvIndex, checked=true}) {
            const mapping = {...state.mapping}
            if(!(fieldName in mapping)) mapping[fieldName] = [] // make sure it is an array
            const fieldMapping = mapping[fieldName] // list of CSV columns in the mapping of a specific
            const mappingindex = fieldMapping.indexOf(csvIndex) // index of te CSV column in the REDCap field mapping list
            if(checked && mappingindex<0) {
                mapping[fieldName].push(csvIndex)
            }
            else if(!checked && mappingindex>=0) {
                mapping[fieldName].splice(mappingindex, 1)
            }
            // remove redcap fields if no CSV field is assigned
            if(mapping[fieldName].length<1) delete mapping[fieldName]
            return commit('SET_MAPPING', mapping)
        },
        toggleDynamicField(context, {field, checked}) {
            const dynamicFields = [...context.state.dynamic_fields]
            const index = dynamicFields.indexOf(field)
            if(checked && index<0) dynamicFields.push(field)
            if(!checked && index>=0) dynamicFields.splice(index, 1)
            context.commit('SET_STATE_PROPERTY', {key: 'dynamic_fields', value: dynamicFields})
        },
        /**
         * guess the mapping matching the names of the CSV
         * fields and the REDCap fields
         * 
         * @param {object} context 
         * @returns 
         */
        guessMapping(context) {
            const {rootState, rootGetters } = context
            const {fields:csv_fields} = rootState.csv_data

            const { form_name } = context.state
            const fields = rootGetters['settings/form_fields'](form_name)
            fields.forEach( field => {
                const {field_name:fieldName} = field
                let csvIndex = csv_fields.findIndex(csv_field => {
                    let found = csv_field.toUpperCase() === field.field_name.toUpperCase()
                    return found
                })
                if(csvIndex>=0) context.dispatch('toggleCsvField', {csvIndex, fieldName})
            })
            return fields
        },
        async setPrimaryKey(context, primary_key) {
            context.commit('SET_STATE_PROPERTY', {key:'primary_key', value:primary_key})
        },
    },
    getters: {
        mappedCsvFields: state => redcap_field => {
            const mapping = {...state.mapping}
            let csvIndexes = mapping[redcap_field]
            if(!Array.isArray(csvIndexes)) csvIndexes = []
            return csvIndexes
        },
        /**
         * keys skipped when determining uniqueness of a row
         */
         mappedDynamicFields: state => {
            const mapping = {...state.mapping}
            const dynamicFields = [...state.dynamic_fields].filter(fieldName => {
                let csvIndexes = mapping[fieldName] ?? []
                return (Array.isArray(csvIndexes) && csvIndexes.length>0)
            })
            return dynamicFields
        },
        mappedFieldsWithCsvNames: (state, getters, rootState) => {
            console.log(state, getters, rootState)
            const {fields} = rootState.csv_data
            const {mapping} = state
            const mappingWithNames = {}
            for( let [redcapField, csvIndexes] of Object.entries(mapping)) {
                mappingWithNames[redcapField] = csvIndexes.map(index => `${index} - ${fields[index]}`)
            }
            return mappingWithNames
        }
    }
}

export default module;