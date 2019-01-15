import axios from 'axios'
import store from '../vuex/store.js'

import { setEvent } from './pages';
// let url = location.origin + '/api/v1/'

let url = location.origin + '/apigray/'

switch (process.env.NODE_ENV) {
  case 'development': {
    // url = 'http://101.200.72.142/api/v1/'  //old 废弃
    // url = 'http://47.98.230.151/apitest/'  // test
    url = 'http://www.yixingcloud.com/apitest/'
    // url = 'http://47.98.230.151/apiprod/' // 正式
    // url = 'http://47.98.230.151/apigray/' // 灰度
    break
  }
  default: {
    let locApi = location.href.indexOf('test/')
    if (locApi > 0) {
      url = location.origin + '/apitest/'
      break
    }
    locApi = location.href.indexOf('gray/')
    if (locApi > 0) {
      url = location.origin + '/apigray/'
      break
    }
    locApi = location.href.indexOf('prod/')
    if (locApi > 0) {
      url = location.origin + '/apiprod/'
      break
    }
    break
  }
}
// console.log('url:', url)
// 创建请求
const http = axios.create({
  baseURL: url,
  params: {
    // token: ''
  }
})

// 添加一个请求拦截器
http.interceptors.request.use(function (config) {
    let token = store.getters.currentUser.token
    if (token) {
        config.headers.token = token
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

// 添加一个响应拦截器
http.interceptors.response.use(function (res) {
    if (res.status != 200) {
        // 网络或服务器错误
        $vue.$notification.error({
            message: '系统提示',
            description: '服务器返回错误！'
        });
        setEvent({
            keyname: 'responseErr',
            keyvalue: 'status: ' + res.status +', error: ' + res.error
        })
        return Promise.reject(res);
    } else {
        if (res.data.code != 200) {
            if (res.data.code != 30015) {
                setEvent({
                    keyname: 'responseErr',
                    keyvalue: 'status: ' + res.status + ', resCode: ' + res.data.code + ', resDesc: ' + res.data.desc
                });
            }
        }
        if (res.data.code == 30015) {
            // token 失效
            $vue.$notification.error({
                message: '系统提示',
                description: '登录超时，请退出后重新进入'
            });
            return Promise.reject(res);
        } else if (res.data.code >= 90000) {
            // 获取用户相关信息失败
            $vue.$notification.error({
                message: '系统提示',
                description: '登录信息失效，请重新打开应用'
            });
            return Promise.reject(res);
        } else {
            // 其余 res.data.code 由请求内自行判断
            return Promise.resolve(res);
        }
    }
})

export default http
