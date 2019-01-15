import Utils from './lib/utils'

import Vue from 'vue'
import App from './App'
import router from './router'
import EventBus from './lib/eventBus.js'
import store from './vuex/store.js'

import currency from 'currency.js'

import Antd from 'vue-antd-ui'
import 'vue-antd-ui/dist/antd.css'

import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

import './assets/js/BeginnersGuide.js'
import './assets/iconts-li/BeginnersCs.css'
import VueIntro from 'vue-introjs'
Vue.use(VueIntro)

// 不显示正负号，保留2位小数
Vue.filter('inOut', function (value) {
  if (!value) return 0;
  return currency(Math.abs(value), { symbol: '', precision: 2 }).format(true)
})

// 显示负号不显示正号显示两位小数  //对账 例如:1.23 或 -11.12
Vue.filter('currency2', function (value) {
  if (!value) return '0'
  return currency(value, { symbol: '', precision: 2 }).format(true)
})

Vue.config.productionTip = false
Vue.use(Antd)

// import YxUI from 'yx-ui'
// Vue.use(YxUI)



import vueB from './components/vb'
import './components/vb/package/style/yxantstyle.css'
// import './components/vb/package/style/vue-beauty.min.css'
Vue.use(vueB)

//  Vue

Vue.prototype.$bus = EventBus
Vue.prototype.$utils = Utils

window.unonload = function(){alert('确定要离开吗?');}


window.onbeforeunload = function(){alert('确定要离开吗?');}



/* eslint-disable no-new */
window.$vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
