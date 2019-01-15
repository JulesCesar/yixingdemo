import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'

Vue.use(Vuex)

// const state = {
//   token: null
// }

// const mutations = {
//   SET_TOKEN (state, token) {
//     state.token = token
//   },
//   REMOVE_TOKEN (state) {
//     state.token = null
//   }
// }

export default new Vuex.Store({
  actions,
  getters,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
