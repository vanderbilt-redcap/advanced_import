const initialState = {
    debugMode: false,
}

const module = {
    namespaced: true,
    state: {...initialState},
    mutations: {
        SET_STATE: (state, payload) => {
            for(let [key, value] of Object.entries(payload)) {
                if(Object.keys(initialState).indexOf(key)<0) continue
                state[key] = value
            }
        },
    },
    actions: {
        setState(context, params) { context.commit('SET_STATE', params) },
    },
    getters: {}
}

export default module;