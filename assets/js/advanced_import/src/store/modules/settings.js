const initialState = {
    language: {}, // translations
    project: {}, // project ID
    project_data: {}, // project data
    record_identifiers: {},
}

const module = {
    namespaced: true,
    state: {...initialState},
    mutations: {
        SET_STATE: (state, payload) => {
            for(let [key, value] of Object.entries(payload)) state[key] = value
        },
    },
    actions: {
        setState(context, params) { context.commit('SET_STATE', params) },
    },
    getters: {
        form_fields: state => form_name => {
            let { metadata } = state.project_data

            let fields = []
            for(let field of Object.values(metadata)) {
                if(field.form_name==form_name) fields.push(field)
            }
            fields.sort((a,b)=>{
                const a_value = Number(a.field_order)
                const b_value = Number(b.field_order)
                if(a_value==b_value) return 0
                return a_value<b_value ? -1 : 1
            })
            return fields
        },
        event_info: state => event_id => {
            try {
                let { project: {eventInfo={}} } = state.project_data
                const event_data = eventInfo[event_id]
                return event_data
            } catch (error) {
                console.log(`error getting arm name for event ID ${event_id}` )
                return
            }
        }
    },
}

export default module;