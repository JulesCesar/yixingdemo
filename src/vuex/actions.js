import * as types from './mutation-types'
import { services } from './api'

export const fetchProduct = ({ commit }) => {
  // API request
  return services.products.getAll()
  .then((response) => {
    commit(types.FETCH_PRODUCT, response.data)
  })
  .catch((error) => {
    console.error(error)
  })
}
// 设置用户信息
export const setUser = ({ commit, state }, info) => {
  commit(types.SET_USER, info)
}

// export const setToken = ({ commit, state }, info) => {
//   commit(types.SET_TOKEN, info)
// }
// 设置当前页面信息
export const setPage = ({ commit, state }, item) => {
  commit(types.SET_PAGE, {
    name: item.name,
    desc: item.desc || ''
  })
}

// 设置当前页面信息
export const setEditId = ({ commit, state }, id) => {
    commit(types.EDIT_ID, id)
}

// 设置当前页面信息
export const setDate = ({ commit, state }, item) => {
  commit(types.SET_DATE, {
    start: item.start,
    end: item.end
  })
}

// 设置公司列表
export const setCorp = ({ commit, state }, item) => {
    commit(types.SET_CORP, {item})
}

