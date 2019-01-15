import * as types from '../mutation-types'
const state = {
  main: {
    start: '',
    end: new Date(),
    money: [],
    arap: []
  }
}

const mutations = {
  [types.SET_DATE] (state, info) {
    state.main.start = info.start
    state.main.end = info.end
    state.main.money = info.money
    state.main.arap = info.arap
  }
}

export default {
  state,
  mutations
}
