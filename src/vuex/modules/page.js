import * as types from '../mutation-types'
const state = {
  main: {
    name: '',
    desc: ''
  },
  edit: {
    id: ''
  }
}

const mutations = {
  [types.SET_PAGE] (state, page) {
    state.main = page
  },
  [types.EDIT_ID] (state, editId) {
    state.edit.id = editId || ''
  }
}
export default {
  state,
  mutations
}

