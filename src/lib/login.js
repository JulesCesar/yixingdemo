import { getMessages } from '../models/users'
import { statMoneyflows } from '../models/moneyFlow'

// 1 是否给老板发送过完成上传的消息
export const sendBoss = async function () {
  return getMessages({'to_user': 'boss' }).then(res => {
    let _data = res.data.data.filter(val => val.title === '完成数据上传')
    return _data.length > 0
  })
}

// 2 上传数据的时长
export const moneyMonth = async function () {
  return statMoneyflows({
    'type': 0,
    'start': '2010-09-01',
    'end': '2021-10-01'
  }).then((response) => Promise.resolve(response))
  .catch((error) => Promise.reject(error))
}
