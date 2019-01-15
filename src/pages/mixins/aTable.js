import { mapGetters, mapActions } from 'vuex'

import moment from 'moment'
let today = moment().format('YYYY-MM-DD')

import {
    addMoneyflow,
    updateMoneyflow,
    deleteMoneyFlow
} from '../../models/moneyFlow'

export default {
  props: {
    accountDatas: {
      type: Array,
      default: () => []
    },
    receiverDatas: {
      type: Array,
      default: () => []
    },
    fTypeDates: {
      type: Array,
      default: () => []
    },
    aTypeDatas: { // 银行帐户
      type: Array,
      default: () => []
    }
  },
  filters: {
    desc (txt) {
      return txt.length < 11 ? txt : txt.substring(0, 11) + '...'
    }
  },
  data () {
    return {
      today: today,
      inSave: false,
      rowObj: {
        id: '',
        remark: '',
        amount: 0,
        date: today,
        ftype: {
          id: '',
          name: ''
        },
        account: {
          id: '',
          name: '选择账户'
        },
        receiver: {
          id: '',
          name: '选择收付款人'
        },
        istransfer: false
      },
      searchAddAccount: '',
      searchAddReceiver: '',
      searchAddAtag: '',
      accountInsertvisible: false,
      receiverInsertvisible: false,
      atageVisible: false,
      columns: [{
        title: '序号',
        width: '5%',
        scopedSlots: { customRender: 'indexKey' },
        className: 'tableAlignCenter'
      }, {
        dataIndex: 'date',
        key: 'date',
        slots: { title: 'customTitle' },
        width: '10%',
        sorter: true,
        scopedSlots: { customRender: 'date' },
        className: 'tableAlignCenter'
      }, {
        dataIndex: 'remark',
        key: 'remark',
        slots: { title: 'customSummary' },
        width: '11%',
        scopedSlots: { customRender: 'remark' },
        className: 'tableAlignCenter'
      },
      {
        dataIndex: 'account',
        key: 'account',
        slots: { title: 'customAccount' },
        width: '10%',
        scopedSlots: { customRender: 'account' },
        className: 'tableAlignCenter'
      },
      {
        dataIndex: 'receiver',
        key: 'receiver',
        slots: { title: 'customReceiver' },
        width: '10%',
        scopedSlots: { customRender: 'receiver' },
        className: 'tableAlignCenter'
      },
      {
        dataIndex: 'inFlow',
        key: 'inFlow',
        slots: { title: 'customInFlow' },
        width: '10%',
        scopedSlots: { customRender: 'inFlow' },
        className: 'tableAlignCenter'
      },
      {
        dataIndex: 'outFlow',
        key: 'outFlow',
        slots: { title: 'customOutFlow' },
        width: '10%',
        scopedSlots: { customRender: 'outFlow' },
        className: 'tableAlignCenter'
      },
      {
        title: '内部转账',
        dataIndex: 'istransfer',
        width: '7%',
        scopedSlots: { customRender: 'istransfer' },
        className: 'tableAlignCenter'
      },
      {
        title: '收支分类',
        dataIndex: 'ftype',
        width: '10%',
        scopedSlots: { customRender: 'ftype' },
        className: 'tableAlignCenter'
      },
      {
        title: '操作',
        key: 'action',
        width: '12%',
        scopedSlots: { customRender: 'action' },
        className: 'tableAlignCenter'
      }
      ]
    }
  },
  computed: {
    ...mapGetters(['editId']),
    // selectRowStyle () {
    //   debugger
    //         // 错误提示类名：ErrorMessage
    //         // return { 'handleSelect': true }
    //   return { 'ErrorMessage': true }
    // },
    remarkTooltipVisible: {
      get () {
        return this.rowObj.remark ? this.rowObj.remark.length > 29 : false
      },
      set () {}
    },
    // fInOut () {
    //     // 2: 分类全部显示， 1: 收入， 0: 支出
    //   if (!this.rowObj.inFlow && !this.rowObj.outFlow) {
    //     return 2
    //   }
    //   return this.rowObj.inFlow > 0 ? 1 : 0
    // },
    tableSources () {
      let _self = this
      if (_self.moneyflowDatas.length) {
        let _income = 0
        let _outcome = 0
        let _tableDatas = _self.moneyflowDatas.map((val, index) => {
        //   val.date = _self.moment(val.date).format('YYYY-MM-DD')
          val.ftype = val.ftype ? val.ftype : {id: '', name: ''}
          val.receiver = val.receiver ? val.receiver : {id: '', name: ''}
          let _rowId = _self.editId
          let _row = {
            ...val,
            isEditRow: typeof _rowId === 'string' ? _rowId === val.id : _rowId === index + 10000
          }
          let _amount = val.amount
          if (_amount > 0) {
            _income += _amount
            _row.inFlow = _amount
            _row.outFlow = ''
          } else {
            _outcome += _amount
            _row.outFlow = Math.abs(_amount)
            _row.inFlow = ''
          }
          return _row
        })
        _self.sumIncome = _income
        _self.sumOutcome = _outcome
        // return _tableDatas
        return JSON.parse(JSON.stringify(_tableDatas))
      } else {
        return []
      }
    },
    accounts () {
      let _self = this
      let _accounts = _self.accountDatas
      let _typeName = _self.aTypeDatas // ['银行账户', '现金账户', '第三方账户', '信用卡账户']
      let _rslt = _typeName.map(val => {
        let _typeAccounts = _accounts.filter(account => account.atype.id === val.id)
        return {'type': val.name, 'options': _typeAccounts}
      })
      return _rslt
    },
    receivers () {
      let _self = this
      let _receivers = _self.receiverDatas
      let _typeName = ['公司', '个人']
      let _rslt = _typeName.map(val => {
        let _typeReceivers = _receivers.filter(receiver => receiver.rtype.name == val)
        return {'type': val, 'options': _typeReceivers}
      })
      return _rslt
    },
    fTypes () {
      let _self = this
      let _ftypes = _self.fTypeDates
      let _fdata = _ftypes.filter(val => val.parrentid == 0)
      // debugger
      if (_self.rowObj.inFlow || _self.rowObj.outFlow) {
        let _flag = _self.rowObj.inFlow > 0
         // 支出 false    收入 true
        _fdata = _fdata.filter(val => val.flag === _flag)
      }
      return _fdata.map(fval => {
        let _opt = _ftypes.filter(val => val.parrentid == fval.id)
        return { 'type': fval.name, 'options': _opt }
      })
    },
    rowObjChange () {
      let _self = this
      let _rowId = _self.editId
      let _newRow = _self.rowObj
      // console.log('moneyflowDatas', _self.moneyflowDatas)
      if (!_rowId) return false
      if (typeof _rowId === 'string') {
        let _editRow = _self.tableSources.find(val => val.id === _self.editId)
        // console.log('11', JSON.stringify(_self.rowObj))
        // console.log('22', JSON.stringify(_editRow))
        return JSON.stringify(_newRow) != JSON.stringify(_editRow)
      } else {
        if (_newRow.remark || _newRow.amount || _newRow.account.id || _newRow.receiver.id) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    ...mapActions(['setEditId']),
    moment,
    // 设置选中行样式。
    setRowClass (record, index) {
      return record.isEditRow ? 'detailsGrid' : ''
    },
    // 表头变化事件
    headerChange (pagination, filters, sorter) {
      let _self = this
        // console.log('Various parameters', pagination, filters, sorter);
      let sorterDate = (a, b) => {
        if (sorter.order == 'ascend') { // descend
          return _self.moment(b.date).isAfter(a.date) ? 1 : -1
        } else {
          return _self.moment(b.date).isAfter(a.date) ? -1 : 1
        }
      }
      _self.moneyflowDatas.sort(sorterDate)
    },
    // 选择项过滤
    filterOption (input, option) {
      // debugger
      let _optText = option.componentOptions.children[0].text

      let _value = option.componentOptions.propsData.value

      switch (_value) {
        case 'addAccount':
          this.searchAddAccount = input
          return true

        case 'addReceiver':
          this.searchAddReceiver = input
          return true

        case 'addFtype':
          this.searchAddAtag = input
          return true
      }

      if (_optText) {
        return _optText.toLowerCase().indexOf(input.toLowerCase()) >= 0
      } else {
        return false
      }
    },
    // 输入项验证
    rowRequired (row) {
      let _required = {
        date: !!row.date || '日期',
        remark: !!row.remark || '摘要',
        account: (!!row.account.id && row.account.id != '选择账户') || '账户',
        receiver: (!!row.receiver.id && row.receiver.id != '选择收付款人') || '收付款人',
        amount: !!row.amount || '流入流出'
      }
      // 内部转账收付款人非必填
      if (this.rowObj.istransfer) {
          _required.receiver = true;
      }
      let _msg = ''
      Object.keys(_required).forEach(item => {
        if (_required[item] !== true) {
          _msg += _required[item] + ','
        }
      })
      return _msg.substring(0, _msg.length - 1)
    },
    editConfirm () {
      let _self = this
      this.$confirm({
        title: '系统提示',
        content: '您是否要保存对该数据的修改？',
        okText: '保存',
        cancelText: '取消',
        onOk () {
          let _param = {
            id: _self.rowObj.id
          }
          let _index = _self.moneyflowDatas.findIndex(val => val.id == _self.rowObj.id)
          debugger
          _self.saveRowClick(_param, _index)
        },
        onCancel () {
          _self.cancelEidtRow()
        }
      })
    },
    // 编辑行
    onAccountChange (val, opt) {

    },
    editButtonClick (record, index) {
      let _self = this
      let setEditState = () => {
        record.isEditRow = true
        _self.rowObj = record
        let _editId = record.id || index + 10000
        _self.setEditId(_editId)
      }
      if (_self.editId) {
        if (_self.rowObjChange) {
          _self.editConfirm()
        } else {
          setEditState()
        }
      } else {
        setEditState()
      }
    },
    editRowClick (record, index) {
      debugger
      let _self = this
      if (_self.isClickEditRow) {
        _self.editButtonClick(record, index)
        let _len = _self.moneyflowDatas.length
        if (index === _len - 1) _self.addRowClick(_len)
      }
    },
    // 行 保存按钮
    saveRowClick (oldRow, index) {
      let _self = this
      let _required = _self.rowRequired(_self.rowObj)
      if (_required) {
        _self.$confirm({
          title: '当前流水账无法完成保存操作，还有如下必填项未完成填写：',
          iconType: 'exclamation-circle',
          content: _required
        })
        return
      }

      let _param = JSON.parse(JSON.stringify(_self.rowObj))
      // Object.keys(_self.rowObj).forEach(key => {
      //   _param[key] = _self.rowObj[key]
      // })

      delete _param.isEditRow
      if (!_param.ftype.id) _param.ftype = null
      if (_param.receiver.id == '') {
          delete _param.receiver;
      }
      let _ceidt = null
      // let key = oldRow.id
      let key = _param.id
      if (key) {
        _ceidt = updateMoneyflow(_param)
      } else {
        _ceidt = addMoneyflow(_param)
      }
      _self.inSave = true
      return _ceidt.then(res => {
        if (res.status === 200 && res.data.code === 200) {
          let _returnRow = res.data
          let _mes = '修改成功'
          if (!key) {
            _mes = '添加成功'
          }
          _self.moneyflowDatas.splice(index, 1, _returnRow)
          _self.$message.success(_mes)
          // return Promise.resolve()
        } else {
          _self.$message.error('修改失败')
        }
        // 清除修改状态
        _self.cancelEidtRow()
      })
    },
    // 删除按钮
    delRowClick (record, index) {
      let id = record.id
      let _self = this
      if (!id) {
        if (_self.moneyflowDatas.length == (index + 1)) {
          _self.$message.warning('最后一行')
          return
        }
        _self.moneyflowDatas.splice(index, 1)
        _self.$message.success('删除空行')
      } else {
        deleteMoneyFlow(id).then(res => {
          debugger
          if (res.data.code == 200) {
            _self.moneyflowDatas.splice(index, 1)
            // _self.moneyflowDatas = _self.moneyflowDatas.filter(item => item.id != id)
            // if (_self.moneyflowDatas.length == 0) _self.addRowClick(0)
            _self.$message.success('删除成功')
          } else {
            _self.$message.error('删除失败')
          }
        })
      }
    },

    // 取消按钮
    cancelEidtRow (row, index) {
      // debugger
      let _self = this
      _self.inSave = false
      // _self.editRowIds = ''
      _self.setEditId('')
      // let _row = _self.moneyflowDatas[index]
      // console.log('row', _row)
      // _self.rowObj.account = _row.account
      // _self.rowObj.receiver = _row.receiver
      // _self.rowObj.ftype = _row.ftype
      _self.searchAddAccount = ''
      _self.searchAddReceiver = ''
      _self.searchAddAtag = ''
    },
    // 确定修改框
    handleCancelEditPop (visible) {
      // if (!visible) {
      //   this.ifRowEdited = false
      //   return
      // }
      // this.ifRowEdited = !this.isRowEdit(this.rowObj2)
      // if (!this.ifRowEdited) {
      //   this.cancelEidtRow()
      // }
    },
    // 内部转账框
    changeInterTransfer (text, record, index) {
      if (text) {
        this.rowObj.istransfer = false
        record.istransfer = false
        // this.isOrNot = true
      } else {
        this.rowObj.istransfer = true
        record.istransfer = true
        // this.isOrNot = false
      }
    },
    // 验证流入和流出是否和分类匹配
    verifyFType (flag) {
      debugger
      if (!this.rowObj.ftype.id) return
      let _type = this.fTypeDates.find(val => val.id == this.rowObj.ftype.id)
      if (!_type) return
      if (_type.flag != flag) {
        this.rowObj.ftype.id = ''
        this.rowObj.ftype.name = ''
      }
    },

    // 流入变化
    onInflowChange (e) {
      debugger
      this.rowObj.outFlow = ''
      this.verifyFType(true)
      
      const { value } = e.target
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.rowObj.inFlow = value
        this.rowObj.amount = value
      }
      debugger
    },
    // 流出变化
    onOutflowChange (e) {
      this.rowObj.inFlow = ''
      this.verifyFType(false)

      const { value } = e.target
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.rowObj.outFlow = value
        this.rowObj.amount = -value
      }
      // this.rowObj.outFlow = val
      // this.rowObj.amount = -val
    },
    // 日期变化
    onDateChange (val, dataStr) {
      this.rowObj.date = dataStr
    },
    /**  -----弹出框的回调事件----------------
     * 1 可以优化避免刷新请求
     * 2 避免使用emit发送事件，可以通过$ref 访问内部函数
     * **/
    // --------帐户 ---------
    clickAddAccount () {
      this.accountInsertvisible = true
      if (this.searchAddAccount) {
        this.$bus.$emit('updateaccount', this.searchAddAccount)
      }
    },
    accountModalCancel () {
      debugger
      this.accountInsertvisible = false
      // this.searchAddAccount = ''
      if (this.rowObj.account.id == 'addAccount') {
        this.rowObj.account.id = ''
      }

      // this.$bus.$emit('accountmodalinit')
    },
    refreshAccounts (account) {
      debugger
      let _self = this
      _self.accountDatas.push(account)
      _self.rowObj.account = account
      _self.accountInsertvisible = false
    },
    // --------  收付款人 ---------
    clickAddReceiver () {
      this.receiverInsertvisible = true
      if (this.searchAddReceiver) {
        this.$bus.$emit('updatereceiver', this.searchAddReceiver)
      }
    },
    receiverModalCancel (receiver) {
      this.receiverInsertvisible = false
      if (this.rowObj.receiver.id == 'addReceiver') {
        this.rowObj.receiver.id = ''
      }
      // this.rowObj.receiver.id = ''
      // this.searchAddReceiver = ''
    },
    refreshReceivers (receiver) {
      let _self = this
      debugger
      _self.receiverDatas.unshift(receiver)
      _self.rowObj.receiver = receiver
      this.receiverInsertvisible = false
    },
    // -------- 分类 ---------
    clickAddFtype () {
      this.atageVisible = true
      if (this.searchAddAtag) {
        this.$bus.$emit('updateFtype', this.searchAddAtag)
      } else {
        this.$bus.$emit('updateFtype', '')
      }
    },
    fTypeModalCancel (ftype) {
      this.atageVisible = false
      // this.searchAtage = ''
      if (this.rowObj.ftype.id == 'addFtype') {
        this.rowObj.ftype.id = ''
      }
    },
    refreshFtype (ftype) {
      let _self = this
      debugger
      _self.fTypeDates.push(ftype)
      _self.rowObj.ftype = ftype
      _self.atageVisible = false
    }
  }
}
