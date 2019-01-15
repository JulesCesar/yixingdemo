// 导航菜单项
export default [
  {
    key: 'dashboard',
    type: 'item',
    icon: 'pie-chart',
    name: '仪表盘',
    router: {
        'name': 'Dashboard'
    }
  },
  // 流水账管理
  {
    key: 'cashier',
    type: 'item',
    name: '流水账管理',
    icon: 'exception',
    children: [
      {
        type: 'item',
        name: '日记账',
        father: '流水账管理',
        desc: '',
        router: {
          name: 'Cashier'
        }
      },
      // {
      //   type: 'item',
      //   name: '新记一笔流水账',
      //   icon: 'edit',
      //   father: '流水账管理',
      //   desc: '',
      //   router: {
      //     name: 'Demomodel'
      //   }
      // },
      {
        type: 'item',
        name: '流水上传',
        father: '流水账管理',
        desc: '',
        router: {
          name: 'RecordImportData'
        }
      },
      // {
      //   type: 'item',
      //   name: '查看流水账',
      //   father: '流水账管理',
      //   // selected: true,
      //   desc: '',
      //   router: {
      //     name: 'Record'
      //   }
      // },
      {
        type: 'item',
        name: '对账',
        father: '流水账管理',
        router: {
          name: 'CheckMoney'
        }
      },
      {
        type: 'item',
        name: '账户管理',
        father: '流水账管理',
        router: {
          name: 'MoneyAccount'
        }
      },
      // {
      //   type: 'item',
      //   name: '收付款人管理',
      //   father: '流水账管理',
      //   router: {
      //     name: 'Receiver'
      //   }
      // },
      // {
      //   type: 'item',
      //   name: '标签管理',
      //   father: '流水账管理',
      //   tag_beta: true,
      //   router: {
      //     name: 'Tag'
      //   }
      // }
    ]
  },
  // 帐户管理
  // {
  //   type: 'item',
  //   icon: 'desktop',
  //   name: '流水账管理',
  //   children: [{
  //     type: 'item',
  //     name: '账户管理',
  //     father: '流水账管理',
  //     router: {
  //       name: 'MoneyAccount'
  //     }
  //   }]
  // },
  // 应收应付管理
  {
    key: 'arap',
    type: 'item',
    icon: 'desktop',
    name: '应收应付管理',
    children: [
      {
        name: '记一笔应收应付',
        father: '应收应付管理',
        router: {
          name: 'Arap'
        }
      },
      // {
      //   name: '导入应收应付数据',
      //   father: '应收应付管理',
      //   router: {
      //     name: 'Arapimport'
      //   }
      // },
      // {
      //   name: '查看应收应付',
      //   father: '应收应付管理',
      //   router: {
      //     name: 'Araploader'
      //   }
      // },
      {
        name: '应收应付款人管理',
        father: '应收应付管理',
        router: {
          name: 'Araper'
        }
      },
    //   {
    //     name: '布局demo专用',
    //     father: '布局demo专用',
    //     router: {
    //       name: 'layoutdemo'
    //     }
    //   }
    ]
  },
  // {
  //     key: 'tag',
  //     type: 'item',
  //     name: '标签管理',
  //     router: {
  //         name: 'Tags'
  //     }
  // }
  // 业务管理
  // {
  //   type: 'item',
  //   icon: 'desktop',
  //   name: '业务管理',
  //   children: [
  //     {
  //       name: '数据源接入',
  //       father: '业务管理',
  //       tag_demo: true,
  //       router: {
  //         name: 'DSource'
  //       }
  //     },
  //     {
  //       name: '业务数据管理',
  //       father: '业务管理',
  //       tag_demo: true,
  //       router: {
  //         name: 'BusiData'
  //       }
  //     }
  //   ]
  // }
  // // 角色与权限管理
  // {
  //   type: 'item',
  //   icon: 'desktop',
  //   name: '角色与权限管理',
  //   children: [{
  //     name: '权限管理',
  //     father: '角色与权限管理',
  //     router: {
  //       name: 'Permission'
  //     }
  //   }]
  // }
]
