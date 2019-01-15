import http from '.'

// /**
//  * 用户登录
//  */
// export const userLogin = params => http.post('users/login', params)
// export const userSearch = params => http.post('users/search', params)
// export const userModify = params => http.post('users/modify', params)

// /**
//  * 用户消息
//  */
// // 系统发送消息
// export const sendMessage = params => http.post('messages/send', params)

// // 系统发送消息状态
// // export const getMessages = params => http.post('messages/get', params)

// export const searchEvents = params => http.post('events/search', params)
// export const saveEvents = params => http.post('events/save', params)

// /**
//  * Department
//  */
// export const departmentsSearch = params => http.post('departments/search', params)

// let _url = location.origin + '/api/dingtalk/'
// export const dingtalkLoginJsAPI = params => http.post(_url + 'login_jas', params)
// export const dingtalkUserInfo = params => http.post(_url + 'login_userinfo', params)

/*
 *  ----------------------------新接服务-----服务替换------------------------------------
 *  ----------------------------2018-6-26------------------------------------
 */

// 用户登录
export const appUserLogin = params => http.post('app/user/login', params)
// 用户列表
export const appUserList = params => http.get('app/user/list', params)

// clear user auth
export const clearUserAuth = params => http.delete(`app/user/clear/${params}`)

// ------- dingtalk --------
// 扫码登录
export const snsLogin = params => http.post('dingtalk/sns/login', params);
// corplist
export const snsCorplist = params => http.post('dingtalk/sns/corplist', params);

// 对钉钉用户赋予权限
export const appUserPermission = params => http.post('dingtalk/permission', params)
// 钉钉用户免登
export const ddUserLogin = params => http.post('dingtalk/login', params)
// 钉钉鉴权 dd容器控件选人控件需要
export const ddJsAPI = params => http.post('dingtalk/jsapi', params)
