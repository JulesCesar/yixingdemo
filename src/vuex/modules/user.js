import * as types from '../mutation-types'
const state = {
  main: {
    name: '',
    username: '', // 这个是user的id
    avatar: 'https://www.yixinglab.com/img/01_tao_03_logo.png',
    token: '',
    roles: [
      {
        'id': 5,
        'name': 'ROLE_CASHIER',
        'remark': '出纳'
      }
    ],
    companyinfo: {
      num_account: 22, // 帐户数量
      num_arap_data: 10, // 应收应付数量
      num_araper: 3, // 应收应付款人
      num_boss: 1, // 老板数量
      num_cashier: 1, // 出纳数量
      num_moneyflow_data: 27, // 流水数量
      num_receiver: 8, // 收付款人数量
      num_users: 7, // 登录人数
      is_order: false, // 订单信息----是否订购-----------
      num_order_days: 0, // 订购的天数
      num_remain_days: 0 // 可用时间
    }
  }
}

const mutations = {
  [types.SET_USER] (state, info) {
    Object.keys(info).forEach(key => {
      state.main[key] = info[key]
    })
  }
}

export default {
  state,
  mutations
}
