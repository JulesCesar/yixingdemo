<template>
    <div>
      <!-- <div class="backmodel">laksfj</div> -->
    <!-- 帐户筛选 -->
      <!-- <div class="filterDatasStyle clearfloat" style="margin-bottom: 30px; margin-top: 16px;">
          <div class="apileft filtertitle">
            <span style="font-size: 14px;font-weight: 700;olor: #606266;">账户筛选：</span> 
          </div>
          <div class="apileft filterselect" style="height:8px;">
            <a-select 
            showSearch
            allowClear
            mode="multiple"
            placeholder="请选择需要查看的账户"
            v-model="filterDatas.accountids"
            :filterOption="filterOption"
            @change='changeAccount'
            style="width:100%;border: none;"
            >  
          <a-select-opt-group  v-for="item in accounts" :key="item.type" >
              <span slot="label">{{item.type}}</span>
              <a-select-option  v-for="opt in  item.options"
                :value="opt.id"  
                :key="opt.id">
                  {{opt.name}}
              </a-select-option> 
          </a-select-opt-group>  
        </a-select>
        </div>
    </div> -->
    <!-- hearderdropdown -->
    <div id="dropdownSearch">
      <!-- {{selectedRowKeys}} -->
      <a-row type="flex">
        <a-col :span="1" :order="1" style="">
          <div class="togglestshow">
            <div class="rule" id="rule" :class="{rule2: toggleRule2}" @click="Timetoggleshow()">
              <p><a-icon type="filter" /></p>
              <p style="font-size:12px;">筛选</p>
            </div>
            <div id="Shownbelow" class="Shownbelow" v-show="dropdownisShow">
              <div class="closeShownbelow iffilterclose" @click="closeShownbelow()">
                <a-icon type="close-circle-o" />
              </div>
              <h5 class="shaixuanshow">选择筛选条件</h5>
              <div class="iffilter">
                <!-- 时间 -->
                <div class="listshaixuan">
                  <h5>时间:</h5>
                  <a-select v-model="dateSelect" labelInValue style="width: 80px" @change="changeDateRange">
                    <a-select-option value="custom">自定义</a-select-option>
                    <a-select-option value="today">今天</a-select-option>
                    <a-select-option value="yesterday">昨天</a-select-option>
                    <a-select-option value="thisWeek">本周</a-select-option>
                    <a-select-option value="lastWeek">上周</a-select-option>
                    <a-select-option value="thisMonth">本月</a-select-option>
                    <a-select-option value="lastMonth">上个月</a-select-option>
                    <a-select-option value="threeMonths">近3个月</a-select-option>
                    <a-select-option value="sixMonths">近6个月</a-select-option>
                  </a-select>
                  <a-locale-provider :locale="zh_CN" style="width: 70%">
                    <a-range-picker  
                      v-model="dateVal" 
                      @change="changeDatapick"
                      :disabledDate="disabledDate" 
                      format="YYYY-MM-DD"
                      >
                      <template slot="renderExtraFooter">
                      
                      </template>
                    </a-range-picker>
                  </a-locale-provider> 
                </div>
                <!-- 收付款人 -->
                <div class="listshaixuan">
                  <h5>收付款人:</h5>
                  <!-- <div style="height:8px;"></div> -->
                    <a-select  
                      mode="multiple"
                      showSearch
                      allowClear
                      placeholder="请选择收付款人"
                      v-model="filterDatas.receiverids"
                      optionFilterProp="children"
                      :filterOption="filterOption"
                      @change="changeReceiver"
                      style="width:100%;">  

                    <a-select-opt-group  v-for="item in receivers" :key="item.type" >
                          <span slot="label">
                            <a-icon type="item.type=='个人' ？ 'user' : 'folder'"/>
                            {{item.type}}
                          </span>
                          <a-select-option  v-for="opt in  item.options"  :value="opt.id"  :key="opt.id">
                            {{opt.name}}
                          </a-select-option> 
                      </a-select-opt-group>  
                  </a-select>
                </div>
                <!-- 收支类型 -->
                <div class="listshaixuan">
                  <h5>收支类型:</h5>
                  <a-select 
                      mode="multiple"
                      allowClear
                      showSearch
                      placeholder="请选择收支类型"
                      optionFilterProp="children"
                      style="width:100%;"
                      :defaultActiveFirstOption="false"
                      :filterOption="filterOption"
                      v-model="filterDatas.atypes" 
                      @change="changeAtype"
                    > 
                    <a-select-opt-group  v-for="item in fTypes" :key="item.type" >
                        <span slot="label"><a-icon type="user"/>{{item.type}}</span>
                        <a-select-option  v-for="opt in  item.options"  :value="opt.id"  :key="opt.id">
                            {{opt.name}}
                        </a-select-option> 
                    </a-select-opt-group> 
                  </a-select>
    
                </div>
                <!-- 内部转账 -->
                <div class="listshaixuan">
                  <h5>内部转账:</h5>
                  <div style="height:8px;"></div>
                    <a-select 
                    mode="multiple"
                    placeholder="是否为内部转账" 
                    allowClear  
                    @change="changeSearchTransfer" 
                    v-model="filterDatas.istransfer"
                    style="width:100%;">
                      <a-select-option value="true">是</a-select-option>
                      <a-select-option value="false">否</a-select-option> 
                    </a-select>
                </div>
                <!-- 账户筛选 -->
                <div class="listshaixuan">
                  <h5>账户筛选:</h5>
                  <div>
                    <a-select 
                    showSearch
                    allowClear
                    mode="multiple"
                    placeholder="请选择需要查看的账户"
                    v-model="filterDatas.accountids"
                    :filterOption="filterOption"
                    @change='changeAccount'
                    style="width:100%;border: none;"
                    >  
                      <a-select-opt-group  v-for="item in accounts" :key="item.type" >
                        <span slot="label">{{item.type}}</span>
                        <a-select-option  v-for="opt in  item.options"
                          :value="opt.id"  
                          :key="opt.id">
                            {{opt.name}}
                        </a-select-option> 
                      </a-select-opt-group>  
                    </a-select>
                  </div>
                </div>
              </div>
              <div>
                <div class="iffilter" style="text-align: right;margin-bottom: 1rem;">
                  <a-button  @click="closeShownbelow()">取消</a-button>
                  <a-button type="primary" @click="Startquery()"> 确定</a-button>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="19" :order="2" style="height: 30px;overflow-y: auto;padding-top:10px;font-size: 12px;padding-left: 8px;">
          <div>
            <div v-if="Exces">121212</div>
            <span>筛选条件</span><a-divider type="vertical" />
            <span style="color: #a5a7a9;">{{searchInfo.start}}至{{searchInfo.end}}<a-divider type="vertical" /></span>    
            <span>
              <span>帐户:</span>
              <span style="color: #a5a7a9;">{{searchInfo.accountNames||'无'}}</span>
              <a-divider type="vertical" />
            </span>
            <span>
              <span>收付款人: </span>
              <span style="color: #a5a7a9;">{{searchInfo.receiverNames||'无'}}</span>
              <a-divider type="vertical" />
            </span>
            <span>
              <span>收支分类: </span>
              <span style="color: #a5a7a9;">{{searchInfo.ftypesNames|| '无'}}</span>
              <a-divider type="vertical" />
            </span>
            <span>
              <span>内部转账:</span>
              <span style="color: #a5a7a9;">{{searchInfo.istransfer|| '无'}}</span>
            </span>
          </div>
        </a-col>
        <a-col :span="4" :order="3" style="text-align: right;"> 
          <a-button
            type="danger"
            :disabled="!hasSelected"
            @click="batchDeletionClick" style="margin-top: 7px;" icon="delete">
          删除
          </a-button> 
          <a-button @click='exportFile' type="primary" icon="download"  style="margin-top: 7px;">导出</a-button>
        </a-col>
         
      </a-row>
    </div>

    <a-row>
        <a-col :span="24">
            <p style="padding-top: 10px;">流水总览：流入 {{overView.in | inOut}} 流出 {{overView.out | inOut}} 盈余 {{overView.sum | inOut}}</p>
        </a-col>
    </a-row>
    
    
    
    






      <a-row>
        <a-col :span="24" style="margin-top: 4px;">
          <div id="tablesearch">
              <div v-if="isLoading" class="nodataimg">
                <a-spin size="large" />
              </div>
            <template  v-else >
              <div id="searchTable">
                <!-- <span style="text-align: right;position:absolute;top:0;right:0;">
                  <a-button @click='exportFile' type="primary" icon="download" >导出</a-button>
                </span> -->
                <!-- <div class="cearchtab-File">
                  <div  class="cearchtab-qiuzhun">
                  
                  </div>
                  
                </div> -->
                <edit-table 
                  :moneyflowDatas.sync ='moneyflowDatas'
                  :accountDatas.sync='accountDatas' 
                  :receiverDatas.sync='receiverDatas' 
                  :fTypeDates.sync='fTypeDates' 
                  :aTypeDatas='aTypeDatas'
                  :rowSelection='rowSelection'
                />
                 <div v-if="!moneyflowDatas.length" class="nodataimg" style="position: relative; bottom: 400px;">
                    <div v-if="qjz">
                        <p>暂无数据..</p>
                        <a-button type="primary" @click="pathCashier">去记账</a-button>
                    </div>
                    <div v-else>
                        <!-- <p>抱歉，没有查询到与上述条件相符的内容<br>请重新设置查询条件进行查询,如未及账请请去记账</p> -->
                    </div>
                </div>
              </div>
            </template>
          </div>
        </a-col>
      </a-row>
    </div>
</template>

<script>
import aTable from "../mixins/aTable.js";
import zh_CN from 'vue-antd-ui/lib/locale-provider/zh_CN';
import {
  listMoneyflow,
  batchDeleteMoneyflow
} from '../../models/moneyFlow';

import { setEvent } from "../../models/pages"
import moment from "moment";
// import 'moment/locale/zh-cn';
import fileSaver from 'file-saver';
import CSV from 'comma-separated-values';

import editTable from '../edit/EditTable.vue'


export default {
    mixins: [aTable],
    data() {
      return {
          isLoading: true,
        toggleRule2: false,
        toggleRule3: false,
        toggleRule4: false,
        panelShow: true,
        yang:false,
        Exces:false,
        selectedRowKeys:[], 
        text_content: 'Edit me.',
          moneyflowDatas: [],
          today:moment(), //今天
          yesterday:moment().subtract(1, 'days'), //昨天
          fristWeeksDay:moment().startOf('week'), //本周一日期
          lastWeekEndDay:moment().subtract(1, 'weeks').endOf('week'), //上周末日期
          lastWeekDay:moment().subtract(1, 'weeks').startOf('week'), //上周开始日期
          fristMonthsDay:moment().startOf('month'),  //本月开始日期
          lastMothsEndDay:moment().subtract(1, 'months').endOf('month'), //上个月最后一天
          lastMothsDay:moment().subtract(1, 'months').startOf('month'),
          last3MonthsDay:moment().subtract(2, 'months').startOf('month'),
          last6MonthsDay:moment().subtract(5, 'months').startOf('month'),
          dateSelect: {
            key: 'thisMonth'
          },
          dateVal: [moment(), moment()],
          zh_CN,
          qjz: false, 
          filterDatas: { 
            atypes:[], 
            accountids: [], 
            receiverids: [],
            startDate: moment(),
            endDate: moment(),
            istransfer: []
          }, 
          dropdownisShow:false,
          ExportisShow:false,
          AccountisShow:false,
          rowSelection:{
            onChange: (selectedRowKeys, selectedRows) => {
              let _self = this
              debugger
              _self.selectedRowKeys = selectedRows.map(val=>val.id)
              // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            // onSelect: (record, selected, selectedRows) => {
            //   console.log('onSelect------------------')
            //   console.log(record, selected, selectedRows);
            // },
            onSelectAll: (selected, selectedRows, changeRows) => {
               let _self = this
              //  console.log('onSelectAll------------------')
              //  _self.selectedRowKeys = selectedRowKeys
              //  console.log(selected, selectedRows, changeRows);
            }, 
          },
          searchInfo: {
              start: '',
              end: '',
              accountNames: '',
              receiverNames: '',
              ftypeNames: '',
              istransfer: ''
          }
      };
    },
    components:{
      editTable
    },
    computed:{
      hasSelected() {
         let _self = this
          return _self.selectedRowKeys.length > 0
      },
      Excessheight(){

      },
      // 总览
      overView() {
          let _totalIn = 0;
          let _totalOut = 0;
          let _totalSum = 0;
          this.moneyflowDatas.map(md => {
              if (md.amount < 0) {
                  _totalOut += md.amount;
              } else {
                  _totalIn += md.amount;
              }
          });
          _totalSum = _totalIn + _totalOut;
          return {
              in: _totalIn,
              out: Math.abs(_totalOut),
              sum: _totalSum
          };
      }
    },
    created() {
        this.$bus.$on('initCashierResearch', () => {
            this.filterMoneyflow('init');
        })
    },
    mounted() {
        let _self = this
        _self.dateVal[0] = _self.fristMonthsDay;
        this.filterMoneyflow('init');

        // document.addEventListener('click',(e)=> {
        //   console.log(e)
        //   if (e.target.id != 'Shownbelow' && e.target.parentElement.id != 'rule') {
        //     this.dropdownisShow = false;
        //     this.toggleRule2 = false;
        //   } 
        // }, false)
    },
    methods: {
        // getPopupContainer() {
        //   return document.getElementById("recordingTable");
        // },
       
        Timetoggleshow(){
          this.dropdownisShow = !this.dropdownisShow;
          // this.style.backgroundColor = 'blue';
          this.toggleRule2 = !this.toggleRule2;
          if(this.ExportisShow){
              this.ExportisShow = false
              this.toggleRule3 = false;
              this.toggleRule4 = false;
          }
           
        },

        Exporttoggle(){
          this.ExportisShow = !this.ExportisShow;
          this.toggleRule3 = !this.toggleRule3;
          if(this.dropdownisShow){
              this.dropdownisShow = false
              this.toggleRule2 = false
              this.toggleRule4 = false;
          }
        },
       

      
        openNotificationWithIcon (type) {
            let _self = this
            _self.$confirm({
              title:  '是否放弃编辑流水?',
              // content: '请先保存记录，再进行其他操作。',
              okText: '是',
              okType: 'danger',
              cancelText: '否',
              onOk() {
                _self.setEditId('')
                console.log('OK')
              },
              onCancel() {
                console.log('Cancel');
              },
            }); 
        },
        filterMoneyflow(args) {
            let _self = this;
            if (args == 'init') {
                _self.filterDatas.accountids = _self.accountDatas.map(item => {
                    if (item.rownum > 0) {
                        return item.id;
                    }
                }).filter(val => val);
            }
            this.getListDatas().then(res => {
            })
        },
        getListDatas() {
            let _self = this
            // 截止日期的时间应为24点，而不是0点 
            let _params = { 
                start: _self.dateVal[0].format('YYYY-MM-DD'),
                end: _self.dateVal[1].format('YYYY-MM-DD')
            };
            // 显示筛选条件
            let _filterCondition = {
                start: _self.dateVal[0].format('YYYY-MM-DD'),
                end: _self.dateVal[1].format('YYYY-MM-DD')
            };
            if(_self.filterDatas.accountids.length){
                _params.accountids =  _self.filterDatas.accountids
                _filterCondition.accountNames = _self.filterDatas.accountids.map(val=>{
                  let _acc=  _self.accountDatas.find(fval => fval.id == val)
                  return _acc.name
                }).join('    /    ')
            }
            if(_self.filterDatas.receiverids.length){
                _params.receiverids =  _self.filterDatas.receiverids
                _filterCondition.receiverNames =_self.filterDatas.receiverids.map(val=>{
                  let _receiver=  _self.receiverDatas.find(fval => fval.id == val)
                  return _receiver.name
                }).join('    /    ')
            }
            if(_self.filterDatas.atypes.length){
                _params.ftypeids =  _self.filterDatas.atypes
                _filterCondition.ftypesNames =  _self.filterDatas.atypes.map(val=>{
                  let _ftype=  _self.fTypeDates.find(fval => fval.id == val)
                  return _ftype.name
                }).join('    /    ')
            }
            if (_self.filterDatas.istransfer.length ==1) {
                _params.istransfer = _self.filterDatas.istransfer[0]
                _filterCondition.istransfer = _self.filterDatas.istransfer[0] ? '是' :'否'
            }
            _self.searchInfo = _filterCondition;

            this.qjz = !_self.filterDatas.accountids.length && !_self.filterDatas.receiverids.length && _self.filterDatas.istransfer == null;
            return listMoneyflow(_params).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                   
                    _self.moneyflowDatas = res.data.data;
                    _self.isLoading = false;
                    return Promise.resolve(res);
                }
            });
        },
        pathCashier(){
            this.$bus.$emit('qujizhang');
        },
        changeSearchTransfer(val) {
            // if (val == undefined) {
            //     this.filterDatas.istransfer = null;
            // } else {
            //     if (val.key == 'isTransfer') {
            //     this.filterDatas.istransfer = 1;
            //     } else if (val.key == 'noTransfer') {
            //     this.filterDatas.istransfer = 0;
            //     } else {
            //     this.filterDatas.istransfer = null;
            //     }
            // }
            // this.filterMoneyflow();
        },
        //选时间范围
        changeDateRange(val,option){
          let _self = this
          let _start=_self.today
          let _end =_self.today
          switch (val.key) {
              case 'custom': { 
                return
                break;
              } case 'today': { 
                break;
              } case 'yesterday': {
                _start=_end= _self.yesterday
                break;
              } case 'thisWeek': { 
                _start = _self.fristWeeksDay
                break;
              } case 'lastWeek': { 
                _start = _self.lastWeekDay
                _end = _self.lastWeekEndDay
                break;
              } case 'thisMonth': {  
                _start = _self.fristMonthsDay
                break;
              } case 'lastMonth': { 
                _start = _self.lastMothsDay
                _end = _self.lastMothsEndDay 
                break;
              } case 'threeMonths': { 
                _start = _self.last3MonthsDay; 
                break
              } case 'sixMonths': {
                _start = _self.last6MonthsDay; 
                break;
              } default: {
                break;
              }
            } 
            this.dateVal = [_start,_end];
          
            // this.filterMoneyflow();
          },
        disabledDate(current) {
          return current && current > moment().endOf('day');
        },
        changeReceiver(val){
          if (val == undefined) {
              this.filterDatas.receiverids = '';
          } else {
              this.filterDatas.receiverids = val;
          }
          // this.filterMoneyflow()
        },
        changeAtype(val){
            if (val == undefined) {
                this.filterDatas.atypes = '';
            } else {
                this.filterDatas.atypes = val;
            }
            // this.filterMoneyflow()
        },
        changeDatapick(date,dateStr) {
          let _self = this
          _self.dateSelect.key = 'custom';
          //TDAPP.onEvent("查询日期"); 
          _self.filterDatas.startDate =  dateStr[0]
          _self.filterDatas.endDate =  dateStr[1]
          // _self.filterMoneyflow() 
        }, 
        changeAccount(value,option){
          //  this.filterMoneyflow()
        },
        exportFile() {
          let filename = 'export.xls';
          let _data = this.moneyflowDatas.map((item, idx) => {
              return {
                  '序号': idx + 1,
                  '时间': item.date.substring(0, 10),
                  '摘要': item.remark,
                  '账户': item.account.name,
                  '收付款人': item.receiver ? item.receiver.name : '',
                  '流入': item.amount >= 0 ? item.amount : '',
                  '流出': item.amount < 0 ? -item.amount : '',
                  '内部转账': item.istransfer ? '是' : '否',
                  '收支分类': item.ftype ? item.ftype.name : ''
              }
          });
            let _csvFile = new File([new CSV(_data, {header: true}).encode()], '导出流水.csv', {type: "text/plain;charset=utf-8"});
            fileSaver.saveAs(_csvFile);
          setEvent({
              "keyname": "cashier_export_file",
              "keyvalue": '导出流水:'+_data.length+'条记录'
           })
        },
        // 批量删除
        batchDeletionClick () { 
          let _self = this
          let _ids = _self.selectedRowKeys  
          // let _rows = _self.selectedRows

          batchDeleteMoneyflow({ids: _ids}).then(res => {
            debugger
            if (res.data.code === 200) {
              _ids.forEach(val => {
                let _index = _self.moneyflowDatas.findIndex(fval => fval.id == val)
                if(_index>-1) {
                  debugger
                  _self.moneyflowDatas.splice(_index, 1) 
                }else{
                  debugger
                }
              }) 
              let _len = _ids.length
              setEvent({
                  "keyname": "cashier_del_moneyflows",
                  "keyvalue": '删除流水:'+_len+'条记录'
              })
              this.$message.success(`成功删除${_len}条记录`)
              _self.selectedRowKeys=[]
            } else {
              this.$message.error('删除失败')
            }
          })
        },
        Startquery(){
          this.filterMoneyflow()
          // this.searchInfo()
          this.dropdownisShow = false;
          this.toggleRule2 = false;
        },
        closeShownbelow(){
          this.dropdownisShow = false;
          this.toggleRule2 = false;
        },
        

    },
}
</script>
 
 <style>
 
 </style>
 