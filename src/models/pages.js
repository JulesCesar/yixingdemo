import http from './'

/**
 * 页面 事件
 */
//  设置事件
export const setEvent = params => http.post('app/event/set', params)
// {
//     "keyname": "string",
//     "keyvalue": "string"
//   }
// 查询事件
export const searchEvent = params => http.post('app/event/search', params)
// {
//     "end": "string",
//     "keynames": [
//       "string"
//     ],
//     "start": "string"
//   }

