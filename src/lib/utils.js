import moment from 'moment';

export const thousands = (num, addPlus) => {
  // 判断num是数值型且不为NaN
  if (typeof num !== 'number' || isNaN(num)) {
      return num;
  }

  // 判断正负
  let numLabel = '', newNum = '';
  if (num < 0) {
      numLabel = '-';
      num = -num;
  } else {
      numLabel = addPlus == '+' ? '+' : '';
  }

  // 小数点后两位（四舍五入）
  let numFixed = num.toFixed(2);

  // 分隔整数部分和小数部分
  let num_int, num_dec;
  [num_int, num_dec] = numFixed.split('.');

  // 添加千分符号
  let count = 0;
  for (let i = num_int.length - 1; i >= 0; i--) {
      count++;
      if (count % 3 == 0 && i != 0) {
          newNum = ',' + num_int[i] + newNum;
      } else {
          newNum = num_int[i] + newNum;
      }
  }
  newNum = numLabel + newNum + '.' + num_dec;
  
  return newNum;
}
// 更加开始时间和结束时间计算时间范围。
export const monthRange = (start, end) => {
  let dateArry = []
  let s1 = start.split('-')
  let s2 = end.split('-')
  let mCount = 0
  if (parseInt(s1[0]) < parseInt(s2[0])) {
    mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1]) + 1
  } else {
    mCount = parseInt(s2[1]) - parseInt(s1[1]) + 1
  }
  if (mCount > 0) {
    let startM = parseInt(s1[1])
    let startY = parseInt(s1[0])
    for (let i = (mCount); i > -1; i--) {
      if (startM < 12) {
        dateArry[i] = startY + '-' + (startM > 9 ? startM : '0' + startM)
        startM += 1
      } else {
        dateArry[i] = startY + '-' + (startM > 9 ? startM : '0' + startM)
        startM = 1
        startY += 1
      }
    }
  }
  return dateArry// ['2017-07','2017-08','2017-09'];
}

export const dateSort = (ary) => {
    for (let i = 0, l = ary.length; i < l; i++) {
      for (let j = 0; j < l - 1; j++) {
        if (moment(ary[j].date).isAfter(moment(ary[j + 1].date))) {
          let _tmp = ary[j]
          ary[j] = ary[j + 1]
          ary[j + 1] = _tmp
        }
      }
    }
  }

export default { 
  thousands,
  monthRange,
  dateSort
}
