const initialState = {
    list: [], // translations
    metadata: {},
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
        total: state => {
            const {total=0} = state.metadata
            return total
        }
    }
}

export default module;