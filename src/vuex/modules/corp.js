import * as types from '../mutation-types'

const state = {
    main: {
        corpList: []
    }
}

const mutations = {
    [types.SET_USER] (state, info) {
        Object.keys(info).forEach(key => {
            state.main[key] = info[key]
        });
    }
}

export default {
    state,
    mutations
}