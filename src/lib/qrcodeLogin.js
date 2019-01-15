 import {
    snsLogin,
    snsCorplist
} from '../models/users'

// 获取钉钉的免登录信息
 export const qrcodeLogin = async (cid, did, sign) => {
   return snsLogin({
     'corpid': cid,
     'dinguserid': did,
     'sign': sign
   }).then(res => {
     let _locSns = {
       corpid: cid,
       dinguserid: did,
       corpSign: sign
     }
     localStorage.setItem('snsLogin', JSON.stringify(_locSns))
     return Promise.resolve(res.data)
   })
 }

// 公司列表
 export const getCorpList = (tmpAuthCode) => {
    // var appid = 'dingoao6apgewaxgmzwb7j'; // gray
    // var appid = 'dingoaizalf6ogmnistel'; // prod
    // var appid = 'dingoa81rbtnu0kotanm6h'; // test
   let _appid = 'dingoa81rbtnu0kotanm6h' // test
   if (location.hostname === 'www.yixinglab.com') {
     _appid = 'dingoaizalf6ogmnistel1' // prod
   }

   if (location.hostname === 'www.yixingcloud.com') {
     _appid = 'dingoao6apgewaxgmzwb7j' // gray
   }

    // var redirect_uri = 'https://www.yixingcloud.com/yxpcgray'; // gray
    // var redirect_uri = 'https://www.yixinglab.com/yxpcprod'; // prod
    // var redirect_uri = 'https://www.yixingcloud.com/yxpctest'; // test

   return snsCorplist({
     'appid': _appid,
     'authcode': tmpAuthCode
   }).then(res => {
     return Promise.resolve(res)
   })
 }

