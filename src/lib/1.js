// 导航菜单项

module.exports = [
    {
      key: 'item',
      icon: 'desktop',
      name: '仪表盘',
      router: {
        'name': 'Dashboard'
      }
    },
    // 流水账管理
    {
      type: 'item',
      name: '流水账管理',
      icon: 'desktop',
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
        {
          type: 'item',
          name: '流水上传',
          father: '流水账管理',
          desc: '',
          router: {
            name: 'RecordImportData'
          }
        },
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
        }
      ]
    }
  ]
  