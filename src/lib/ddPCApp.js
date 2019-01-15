import { ddJsAPI } from '../models/users'
// import * as dd from 'dingtalk-jsapi' // 开发文档 https://open-doc.dingtalk.com/microapp/frontjsapi

let ddUrl = 'https://g.alicdn.com/dingding/dingtalk-pc-api/2.7.0/index.js'

const jsApiList = [
  'runtime.info',
  'device.notification.prompt',
  'biz.chat.pickConversation',
  'device.notification.confirm',
  'device.notification.alert',
  'device.notification.prompt',
  'biz.chat.open',
  'biz.util.open',
  'biz.user.get',
  'biz.contact.choose',
  'biz.telephone.call',
  'biz.util.uploadImage',
  'biz.ding.post'
]

// 获取钉钉的免登录信息
let ddLogin = async function () {
  let _href = location.href
  let _corpId = _href.match(/corp_id=(\w*)/)[1]
  // let _appId = _href.match(/app_id=(\d*)/)[1]
  let _appType = _href.match(/app_type=(\w*)/)[1]
  return ddJsAPI({
    corpid: _corpId,
    url: _href
  }).then(res => {
    if (res.data.code === 200) {
      res.data.corpid = _corpId
      res.data.apptype = _appType
      return res.data
    }
  })
}

// 钉钉容器配置
let ddUserInfo = function (_config, callback) {
  // console.log('ddUserInfo', _config)
  DingTalkPC.config({
    agentId: _config.agentid,
    corpId: _config.corpid,
    timeStamp: _config.timestamp,
    nonceStr: _config.nonce,
    signature: _config.signature,
    jsApiList: jsApiList
  })
  DingTalkPC.ready(function () {
    DingTalkPC.runtime.permission.requestAuthCode({
      corpId: _config.corpid,
      onSuccess: function (info) {
        const params = {
          agentid: _config.agentid,
          appid: _config.appid,
          apptype: _config.apptype,
          authcode: info.code,
          corpid: _config.corpid,
          corpname: _config.corpname,
          suitetoken: _config.suitetoken,
          corptoken: _config.corptoken
        }
        callback(params)
      }
    })
  })
}

// // 钉钉js文件加载完成
// export const loadScript_bak = function (callback) {
//   let _script = document.createElement('script')
//   _script.type = 'text/javascript'
//   _script.async = 'async'
//   _script.src = ddUrl
//   document.body.appendChild(_script)
//   if (_script.readyState) {   // IE
//     _script.onreadystatechange = function () {
//       if (_script.readyState === 'complete' || _script.readyState === 'loaded') {
//         _script.onreadystatechange = null
//         callback()
//       }
//     }
//   } else {    // 非IE
//     _script.onload = function () {
//       callback()
//     }
//   }
// }

export const loadScript = () => {
  return new Promise(function (resolve, reject) {
    let _script = document.createElement('script')
    _script.type = 'text/javascript'
    _script.async = 'async'
    _script.src = ddUrl
    document.body.appendChild(_script)
    if (_script.readyState) {   // IE
      _script.onreadystatechange = function () {
        if (_script.readyState === 'complete' || _script.readyState === 'loaded') {
          _script.onreadystatechange = null
          return resolve('IE')
        }
      }
    } else {    // 非IE
      _script.onload = function () {
        return resolve('notIE')
      }
    }
  })
}

// 获取token - async
// 调用方法   getToken(_self.getUserInfo)
export const getToken = callback => {
  ddLogin().then(res => {
    // console.dir(res)
    ddUserInfo(res, callback)
  })
}

