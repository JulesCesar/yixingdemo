import Vue from 'vue'
import Router from 'vue-router'

import baseUrl from './baseUrl'

// const Login = resolve => require(['pages/Login.vue'], resolve);
// const Guide = resolve => require(['pages/Guide.vue'], resolve);

const Help = resolve => require(['pages/help/index.vue'], resolve)
// 模仿quickbooks的弹框所做的一些demo
const Demomodel = resolve => require(['pages/demomodel/index.vue'], resolve)
const Det = resolve => require(['pages/demomodel/det.vue'], resolve)
const upload = resolve => require(['pages/demomodel/upload.vue'], resolve)
const createAccount = resolve => require(['pages/demomodel/createAccount.vue'], resolve)

const Dashboard = resolve => require(['pages/dashboard/index.vue'], resolve)

// 作为布局用的demo
const layoutdemo = resolve => require(['pages/layoutdemo/index.vue'], resolve)

// 日记账
const Cashier = resolve => require(['pages/cashier/index.vue'], resolve)
// 银行--流水上传
const RecordImportData = resolve => require(['pages/bank/index.vue'], resolve)

const MoneyAccount = resolve => require(['pages/accounts/MoneyAccount.vue'], resolve)
const CheckMoney = resolve => require(['pages/accounts/CheckMoney.vue'], resolve)

// const Arapimport = resolve => require(['pages/receivers/Arapimport.vue'], resolve)
const Arap = resolve => require(['pages/receivers/Arap.vue'], resolve)
const Araper = resolve => require(['pages/receivers/Araper.vue'], resolve)
// const Araperloader = resolve => require(['pages/receivers/Araploader.vue'], resolve)

const Permission = resolve => require(['pages/permission/Permission.vue'], resolve)

const noPermission = resolve => require(['pages/permission/noPermission.vue'], resolve);

// 标签管理
const Tags = resolve => require(['pages/Tags/index.vue'], resolve);

Vue.use(Router)

export default new Router({
  base: baseUrl,
  // base: '/app/',
  mode: 'history',
  routes: [
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login,
    //   meta: {allowBack: false}
    // },
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Help
    // },
    // {
    //   path: '/dingtalk',
    //   name: 'DingTalk',
    //   alias: '/dingtalk',
    //   component: Guide
    // },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/demomodel',
      name: 'Demomodel',
      component: Demomodel
    },
    {
      path: '/layoutdemo',
      name: 'layoutdemo',
      component: layoutdemo
    },
    {
      path: '/Det',
      name: 'Det',
      component: Det
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      component: createAccount
    },
    {
      path: '/cashier',
      name: 'Cashier',
      component: Cashier
    },
    {
      path: '/importdata',
      name: 'RecordImportData',
      component: RecordImportData
    },
    {
      path: '/checkmoney',
      name: 'CheckMoney',
      component: CheckMoney
    },
    {
      path: '/moneyaccount',
      name: 'MoneyAccount',
      component: MoneyAccount
    },
    // {
    //   path: '/arapimport',
    //   name: 'Arapimport',
    //   component: Arapimport
    // },
    {
      path: '/arap',
      name: 'Arap',
      component: Arap
    },
    // {
    //   path: '/araploader',
    //   name: 'Araploader',
    //   component: Araperloader
    // },
    {
      path: '/araper',
      name: 'Araper',
      component: Araper
    },
    {
      path: '/permission',
      name: 'Permission',
      component: Permission
    },
    {
        path: '/noPermission',
        name: 'noPermission',
        component: noPermission
    },
    {
        path: '/tags',
        name: 'Tags',
        component: Tags
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  linkActiveClass: 'active'
})
