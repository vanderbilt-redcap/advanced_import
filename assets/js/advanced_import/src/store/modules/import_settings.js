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
        /**
         * set the mapping for a specific REDCap field
         * @param {object} context 
         * @param {fieldName, csvIndex, fieldIndex} params fieldIndex will be 0 for single type fields, >0 for checkbox type fields
         * @returns 
         */
        setFieldMapping({state, commit}, {fieldName, csvIndex, fieldIndex=0}) {
            const mapping = {...state.mapping}
            if(typeof(mapping[fieldName])=='undefined') mapping[fieldName] = {}
            mapping[fieldName][fieldIndex] = csvIndex
            // if there is not at least one valid value (an integer) in the mapping for this fields, then delete the mapping
            if(!Object.values(mapping[fieldName]).some((value => value != null))) delete mapping[fieldName]

            return commit('SET_MAPPING', mapping)
        },
        toggleDynamicField(context, {field, checked}) {
            const dynamicFields = [...context.state.dynamic_fields]
            const index = dynamicFields.indexOf(field)
            if(checked && index<0) dynamicFields.push(field)
            if(!checked && index>=0) dynamicFields.splice(index, 1)
            console.log(field, checked, dynamicFields)
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
            const {checkbox_fields} = rootState.settings
            const checkboxFieldsNames = Object.keys(checkbox_fields)
            fields.forEach( field => {
                const {field_name:fieldName} = field
                if(checkboxFieldsNames.indexOf(fieldName)>=0) return // do not guess checkbox fields
                let csvIndex = csv_fields.findIndex(csv_field => {
                    let found = csv_field.toUpperCase() === field.field_name.toUpperCase()
                    return found
                })
                if(csvIndex>=0) context.dispatch('setFieldMapping', {fieldName, csvIndex})
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
            if(typeof(csvIndexes)=='undefined') csvIndexes = {}
            return csvIndexes
        },
        /**
         * keys skipped when determining uniqueness of a row
         */
        mappedDynamicFields: state => {
            const mapping = {...state.mapping}
            const dynamicFields = [...state.dynamic_fields].filter(fieldName => {
                let csvIndexes = mapping[fieldName] ?? {}
                return Object.values(csvIndexes).length>0
            })
            return dynamicFields
        },
        mappedFieldsWithCsvNames: (state, getters, rootState) => {            
            const {fields} = rootState.csv_data
            const {checkbox_fields} = rootState.settings
            const checkboxNames = Object.keys(checkbox_fields)
            const {mapping} = state

            const getFieldMapping = (csvIndexes) => {
                const list = []
                for (const csvIndex of Object.values(csvIndexes)) {
                    if(!Number.isInteger(csvIndex)) continue
                    let fieldName = fields[csvIndex]
                    let name = `${csvIndex} - ${fieldName}`
                    list.push(name)
                }
                return list
            }
            const getCheckboxMapping = (csvIndexes, checkboxOptions) => {
                const list = {}
                for (const index in csvIndexes) {
                    const csvIndex = csvIndexes[index]
                    if(!Number.isInteger(csvIndex)) continue
                    let checkboxOption = checkboxOptions[index]
                    let fieldName = fields[csvIndex]
                    list[checkboxOption] = `${csvIndex} - ${fieldName}`
                }
                return list
            }

            const mappingWithNames = {}
            for( let [redcapField, csvIndexes] of Object.entries(mapping)) {
                if(checkboxNames.indexOf(redcapField)<0) mappingWithNames[redcapField] = getFieldMapping(csvIndexes)
                else {
                    let checkboxOptions = checkbox_fields[redcapField]
                    mappingWithNames[redcapField] = getCheckboxMapping(csvIndexes, checkboxOptions)
                }
            }
            return mappingWithNames
        },
    }
}

export default module;