const initialState = {
    columns: [],
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
        setState(context, params) { context.commit('SET_STATE', params) },
        setStateProperty(context, {key, value}) { context.commit('SET_STATE_PROPERTY', {key, value}) },
    },
}

export default module;