
let _token = '257288fa-8c90-4f75-a536-0ab300771a1d'
let _corpToken = '3b312f59b2e6314ab2e79e6e45362fc2'
let _agentId = '165393950' // 小包2
let _logo = 'https://www.yixinglab.com/img/01_tao_03_logo.png'
let _name = 'YXTest'
let _username = 'ddDemo'

let _user = {
  'name': _name,
  'username': _username, // 这个是user的id
  'activated': '0',
  'authority': 'ROLE_USER',
  'token': _token,
  'corp_token': _corpToken,
  'agent_id': _agentId,
  'logo': _logo,
  'classname': '-1', // ( -1 没有分类，1，2 分类)
  'monthrange': 0, // 根据需求计算的月份
  'companyid': 23, // 公司id
  'hasfinancial': 0, // 有几个财务 0 代表没有财务
  'hasaccount': 0, // 公司帐户个数
  'hasdata': 0, // 流水账
  'errcode': 60011,  // 钉钉权限 60011: "管理员权限不足，（user/department/agent）无权限"
  'remaindays': 30, // 可用时间
  'stopdate': '2017-10-08',
  'ispayfee': 0
}

let mergeObj = (obj) => {
  let _str = JSON.stringify(_user)
  // debugger
  return Object.assign(JSON.parse(_str), obj)
}

/** ***** 说明 ******
 *
 *  activated (0 普通未授权 8 老板,10 财务）
 *  authority('ROLE_USER' 普通员工  'ROLE_ADMIN' 管理员   "ROLE_BOSS" 认为也是管理员)
 *  classname: '-1', // ( -1 没有分类，1，2 分类)
 */

// 普通用户 无数据
export const User = _user

// 普通用户 有数据
export const User1 = mergeObj({
  hasdata: '1'
})

//* *******************************管理员打开 场景************************/
// Admin 无数据
export const Admin = mergeObj({
  authority: 'ROLE_ADMIN' // ROLE_BOSS
})

// Admin 有数据
export const Admin1 = mergeObj({
  authority: 'ROLE_ADMIN',
  hasdata: '1'
})

// Admin 有出纳
export const Admin2 = mergeObj({
  authority: 'ROLE_ADMIN',
  hasfinancial: 1
})

//* *******************************Admin+Boss 场景************************/
// Admin+Boss 无数据
export const AdminAndBoss = mergeObj({
  authority: 'ROLE_ADMIN',
  activated: '8'
})

// Admin+Boss 有数据
export const AdminAndBoss1 = mergeObj({
  activated: '8',
  authority: 'ROLE_BOSS',
  hasdata: '1'
})

// Admin+Boss+Cashier 无数据
export const AdminAndBossCashier = mergeObj({
  activated: '18',
  authority: 'ROLE_BOSS'
})

// Admin+Boss+Cashier 有数据
export const AdminAndBossCashier1 = mergeObj({
  activated: '18',
  authority: 'ROLE_ADMIN',
  hasdata: '1'
})

//* *******************************Boss 场景************************/

// Boss 无数据
export const Boss = mergeObj({
  activated: '8'
})

// Boss 有数据
export const Boss1 = mergeObj({
  activated: '8',
  hasdata: '1'
})

//* *******************************Casher 场景************************/
// Cashier 无数据
export const Cashier = mergeObj({
  activated: '10'
})
// Cashier 有数据
export const Cashier1 = mergeObj({
  activated: '10',
  hasdata: '1'
})
//* *******************************Boss+Casher 场景************************/
// Boss+Cashier 无数据
export const BossAndCashier = mergeObj({
  activated: '18'
})
// Boss+Cashier 有数据
export const BossAndCashier1 = mergeObj({
  activated: '18',
  hasdata: '1'
})

