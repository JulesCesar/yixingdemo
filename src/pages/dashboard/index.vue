<template>
  <div id="dashboard">
      <!-- <a-button @click="openBrowser">浏览器打开</a-button> -->
    <!-- <div v-if="!isLoading"> -->
        
     
        <a-row :gutter="16" v-if="currentUser.companyinfo.num_moneyflow_data==0 || currentUser.corpid == 'dingc2d71ba9b26822b535c2f4657eb6378f'">
        <!-- <a-row :gutter="16"> -->
            <a-col :span="24">
                 <introduces/>
                  <div style="height:20px;"></div>
                <div>
                   <wordcloud :accountDatas="accountDatas"/>
                        <!-- <wordcloud :accountDatas="cydata" v-else/> -->
                </div>
            </a-col>
        </a-row>
        <br />
        <div class="topDashbard">
            <!-- {{inflowDatas}} -->
            <a-row :gutter="16">
                <a-col class="gutter-row" :span="16">
                    <div class="gutter-box">
                        <a-card title="现金流趋势" :bordered="false">
                            <div href="#" slot="extra">
                                <template>
                                    <div>
                                    <a-radio-group @change="cashflowTrendChange" defaultValue="thisMonth"> 
                                        <a-radio-button value="thisMonth">本月</a-radio-button>
                                        <a-radio-button value="lastMonth">上个月</a-radio-button>
                                        <a-radio-button value="last3Months">近3个月</a-radio-button>
                                        <a-radio-button value="last6Months">近6个月</a-radio-button>
                                    </a-radio-group>
                                    </div>
                                </template>
                            </div>
                            <template>
                                <div v-if="!isLoading">
                                    <cashflowtrend ref="flowtrend" :moneyflowDatas='moneyflowDatas'> </cashflowtrend>
                                    <!--  v-if="moneyflowDatas.length"  <cashflowtrend v-else ref="flowtrend" :moneyflow-datas="sdata" />  -->
                                </div>
                                <div v-else>
                                    <div class="example" style="height:300px;">
                                    <a-spin size="large" />
                                    </div>
                                </div>
                            </template>
                            <!-- <cashflowtrend ref="flowtrend"   v-if="moneyflowDatas.length"  :moneyflowDatas='moneyflowDatas'> </cashflowtrend> -->
                        </a-card>
                    </div>
                </a-col>
                <a-col class="gutter-row" :span="8">
                    <div class="gutter-box">
                        <a-card title="账户" :bordered="false">
                            <!-- <baoaccountlist v-if='accountDatas.length' :accountDatas='accountDatas'> </baoaccountlist> -->
                            <template>
                                <div  v-if="!isLoading4">
                                    <baoaccountlist v-if='accountDatas.length' :accountDatas='accountDatas'> </baoaccountlist>
                                </div>
                                <div v-else>
                                    <div class="example" style="height:300px;">
                                        <a-spin size="large" />
                                    </div>
                                </div>
                            </template>
                        </a-card> 
                    </div>
                </a-col>
               
            </a-row>
            <a-row :gutter="16">
                <a-col>
                    <!-- <a-card title="现金流趋势" :bordered="false">
                        <div href="#" slot="extra">
                            <template>
                                <div>
                                <a-radio-group @change="cashflowTrendChange" defaultValue="thisMonth"> 
                                    <a-radio-button value="thisMonth">本月</a-radio-button>
                                    <a-radio-button value="lastMonth">上个月</a-radio-button>
                                    <a-radio-button value="last3Months">近3个月</a-radio-button>
                                    <a-radio-button value="last6Months">近6个月</a-radio-button>
                                </a-radio-group>
                                </div>
                            </template>
                        </div>
                        <template>
                            <div v-if="!isLoading">
                            <cashflowtrend ref="flowtrend" :moneyflowDatas='moneyflowDatas'> </cashflowtrend>
                            
                            </div>
                            <div v-else>
                                <div class="example" style="height:300px;">
                                <a-spin size="large" />
                                </div>
                            </div>
                        </template>
                        
                    </a-card> -->
                </a-col> 
            </a-row>
            </div>
            <div class="topDashbard1" id="topDashbard1">
            <a-row :gutter="16">
                <a-col :span="8">
                <a-card title="流入分类" :bordered="false">
                    <div href="#" slot="extra">
                        <a-select defaultValue="thisMonth" style="width: 80px" @change="inflowChange"> 
                        <a-select-option value="thisMonth">本月</a-select-option>
                        <a-select-option value="lastMonth">上个月</a-select-option>
                        <a-select-option value="last3Months">近3个月</a-select-option>
                        <a-select-option value="last6Months">近6个月</a-select-option>
                        </a-select>
                    </div>
                    <template>
                    <div v-if="!isLoading1">
                        <inflowlist  ref="inflowChart"  v-if="inflowDatas.length" :inflowDatas='inflowDatas'  > </inflowlist>
                        <!-- <inflowlist  v-else  :inflowDatas='sdata'> </inflowlist> -->
                    </div>
                    <div v-else>
                        <div class="example" style="height:300px;">
                            <a-spin size="large" />
                        </div>
                    </div>
                    </template>
                    
                </a-card>
                </a-col>
                <a-col :span="8">
                <a-card title="流出分类" :bordered="false">
                    <div href="#" slot="extra">
                        <a-select defaultValue="thisMonth" style="width: 80px" @change="outflowChange"> 
                        <a-select-option value="thisMonth">本月</a-select-option>
                        <a-select-option value="lastMonth">上个月</a-select-option>
                        <a-select-option value="last3Months">近3个月</a-select-option>
                        <a-select-option value="last6Months">近6个月</a-select-option>
                        </a-select>
                    </div>
                    <template>
                    <div  v-if="!isLoading2">
                        <outflowlist v-if="outflowDatas.length"  :outflowDatas='outflowDatas' > </outflowlist>
                    </div>
                    <div v-else>
                        <div class="example" style="height:300px;">
                            <a-spin size="large" />
                        </div>
                    </div>
                    </template>
                </a-card> 
                </a-col>
                <a-col :span="8">
                <a-card title="费用" :bordered="false">
                    <div href="#" slot="extra">
                    <a-select defaultValue="thisMonth" style="width: 80px" @change="handleChange"> 
                        <a-select-option value="thisMonth">本月</a-select-option>
                        <a-select-option value="lastMonth">上个月</a-select-option>
                        <a-select-option value="last3Months">近3个月</a-select-option>
                        <a-select-option value="last6Months">近6个月</a-select-option>
                        </a-select>
                    </div>
                    <template>
                        <div  v-if="!isLoading3">
                            <surpluslist v-if="costflow.length"  :outflowDatas='costflow' > </surpluslist>
                        </div>
                        <div v-else>
                            <div class="example" style="height:300px;">
                                <a-spin size="large" />
                            </div>
                        </div>
                    </template>
                    
                </a-card>   
                </a-col>
            </a-row>
           
               
                
        </div>
    <!-- </div>
    <div v-else>
        <div class="example" style="height:300px;">
            <a-spin size="large" />
        </div>
    </div> -->
  </div>
</template>
<script> 
import moment from "moment";
import { mapGetters} from 'vuex';
import introduces from './Introduces.vue'
import cashflowtrend from './Cashflowtrend.vue'
import inflowlist from './Inflowlist.vue'
import outflowlist from './Outflowlist.vue'
import surpluslist from './Surpluslist.vue'
import baoaccountlist from './Baoaccountlist.vue'
import wordcloud from './Wordcloud.vue'

import {
    listAccount,
    statAccountMoneyflow,
    statDefaultMoneyflow,
    statFtypeMoneyflow,
    statReceiverMoneyflow,
    listFtype,
} from "../../models/moneyFlow"; 

export default {
    data() {
        return {
            // tomorrow: moment().add(1, "days").format("YYYY-MM-DD"),
            today:moment().format("YYYY-MM-DD"),
            fristMonthsDay:moment().startOf('month').format("YYYY-MM-DD"),
            lastMothsEndDay:moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD"),
            lastMothsDay:moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD"),
            last3MonthsDay:moment().subtract(2, 'months').startOf('month').format("YYYY-MM-DD"),
            last6MonthsDay:moment().subtract(5, 'months').startOf('month').format("YYYY-MM-DD"),
            moneyflowDatas:[],
            moneyflowByTypeDatas:[],
            atageDatas:[], 
            accountDatas:[],
            
            //---chartdata---
            inflowDatas:[],
            outflowDatas:[],
            costflow:[],
            wordclouddata:[],
            isLoading: true,
            isLoading1: true,
            isLoading2: true,
            isLoading3: true,
            isLoading4: true,
            sdata:[
                {date: '',income: 0,expense: 0,name: '事例1',count: 0}, 
                {date: '',income: 0,expense: 0,name: '事例2',count: 0}, 
                {date: '',income: 0,expense: 0,name: '事例2',count: 0}, 
            ]
        }
    },
    computed: {
     ...mapGetters(['currentUser'])
    },
    components: {
        introduces,
        cashflowtrend,
        inflowlist,
        outflowlist,
        surpluslist,
        baoaccountlist,
        wordcloud,
    },
    mounted() {  
        let _self = this
        let _month1 = statDefaultMoneyflow({'days':1,"start":_self.fristMonthsDay,"end":_self.today,}) //本月数据,按天显示
        let _typeMonth1 =  statFtypeMoneyflow({"start":_self.fristMonthsDay, "end": _self.today}); //本月数据,按照出纳分类显示
        let _atages = listFtype({}) //填充类别  
        let _accounts =  listAccount({})
        // let _accounts =  searchMoneyFlowAccounts({ "start": "1900-01-01", "end": "2100-01-01" })

        let _promise =[_month1,_typeMonth1,_atages,_accounts]; 

        Promise.all(_promise).then(res=>{
        // debugger
            let _days = _self.getEveryDays(_self.fristMonthsDay,_self.today)
            let _month1Datas = res[0].data.data
            let _moneyflow =  _days.map(val=>{
                let _m= false
                if(_month1Datas){
                    _m =  _month1Datas.find(fval=>fval.date==val)
                }
                // if (_m) debugger
                return {
                'date':val,
                'income':_m ? _m.income : 0,
                'expense':_m ? _m.expense : 0,
                }
            })
            _self.moneyflowDatas = _moneyflow
            _self.isLoading = false;
            _self.isLoading1 =false;
            _self.isLoading2 =false;
            _self.isLoading3 =false;
            _self.isLoading4 =false;

            let _typeMonth1Data = res[1].data.data
            _self.moneyflowByTypeDatas = _typeMonth1Data ? _typeMonth1Data.filter(val=>val.id) : []
            _self.atageDatas = res[2].data.data
            _self.accountDatas = res[3].data.data
            return _self.moneyflowByTypeDatas 
        }).then(data=>{
            _self.inflowDatas = _self.getInflowDatas(data)
            _self.outflowDatas = _self.getOutflowDatas(data)
            _self.costflow = _self.getCostflow(data)
        })
        
    }, 
    methods: { 
        openBrowser() {
            DingTalkPC.biz.util.openLink({
                url: "https://www.yixingcloud.com",//要打开链接的地址
                onSuccess : function(result) {
                    /**/
                },
                onFail : function() {}
            })
        },
        cashflowTrendChange (e) { 
            let _self = this  
            _self.isLoading = true;
            let _dateType = e.target.value
            _self.moneyflowDatas = []
            let _param = _self.getParam(0,e.target.value)
            statDefaultMoneyflow(_param).then(res=>{
                debugger 
                let _days=[]
                if(_dateType=='thisMonth' || _dateType=='lastMonth'){
                    _days = _self.getEveryDays(_param.start,_param.end)
                }else{
                    _days =_self.getEveryMonths(_param.start,_param.end)
                }
                
                let _moneyflow =  _days.map(val=>{
                let _m= res.data.data.find(fval=>fval.date==val)
                return {
                    'date':val,
                    'income':_m ? _m.income : 0,
                    'expense':_m ? _m.expense : 0,
                }
                })

                _self.moneyflowDatas = _moneyflow
                _self.isLoading = false;
                // _self.$refs['flowtrend'].renderChart()
            })
        },
        inflowChange(value){
            let _self = this
            _self.isLoading1 = true;
            _self.inflowDatas = []
            let _param = _self.getParam(1,value)
            delete _param.days;
            delete _param.type;
            statFtypeMoneyflow(_param).then(res=>{
                _self.inflowDatas = _self.getInflowDatas(res.data.data)
                _self.isLoading1 = false;
                // _self.$refs['inflowChart'].renderChart(res.data.data)
            })
        },
        outflowChange(value){
            let _self = this
            _self.outflowDatas = []
            _self.isLoading2 = true
            let _param = _self.getParam(1,value)
            statFtypeMoneyflow(_param).then(res=>{
                _self.outflowDatas = _self.getOutflowDatas(res.data.data)
                 _self.isLoading2 =false;
                console.log(_self.outflowDatas);
            })
        },
        handleChange(value) {
            let _self = this
            _self.costflow = []
            _self.isLoading3 = true;
            let _param = _self.getParam(1,value)
            statFtypeMoneyflow(_param).then(res=>{
                _self.costflow = _self.getCostflow(res.data.data)
                _self.isLoading3 =false;
                console.log(_self.costflow);
            })
        },
        getParam(type,dateType){
            let _self = this
            let _param = { "type": type}
            switch (dateType){
                case 'thisMonth':
                _param.start = _self.fristMonthsDay
                _param.end =  _self.today  
                _param.days=1
                break

                case 'lastMonth': 
                _param.start = _self.lastMothsDay
                _param.end =  _self.lastMothsEndDay
                _param.days = 1
                break

                case 'last3Months':
                _param.start = _self.last3MonthsDay
                _param.end =  _self.today   
                break

                case 'last6Months':
                _param.start = _self.last6MonthsDay
                _param.end = _self.today    
                break  
            }  
            console.log('param:',_param)
            return _param
        },
        flowTypeDatas(data){
            let _self = this
            // return _self.moneyflowByTypeDatas.map(val=>{
            return data.map(val=>{
                let _atage =  _self.atageDatas.find(fval=>val.id==fval.id)
                if(_atage){
                val.flag = _atage.flag
                val.pid = _atage.parrentid
                } 
                return val
            })
        },
        getInflowDatas(data){ 
            let _self = this
            let _item = _self.atageDatas.filter(val=>val.parrentid==0&&val.flag==true)
            return _item.map(val=>{
                let _pItem= _self.flowTypeDatas(data).filter(fval=>fval.pid == val.id) 
                // debugger
                let _count = 0
                if(_pItem.length){
                _pItem.forEach(element => {
                    _count+=element.income
                });
                } 
                val.count = _count
                return val
            }) 
        },
        getOutflowDatas(data){
            let _self = this
            let _item = _self.atageDatas.filter(val=>val.parrentid==0&&val.flag==false)
            return _item.map(val=>{
                let _pItem= _self.flowTypeDatas(data).filter(fval=>fval.pid == val.id) 
                // debugger
                let _count = 0
                if(_pItem.length){
                _pItem.forEach(element => {
                    _count+=element.expense
                });
                } 
                val.count = _count
                return val
            }) 
        },
        getCostflow(data){
            return this.getOutflowDatas(data).filter(val=>val.name.indexOf('费用')>0)
        },
        getEveryDays(start,end){
            let _date = start
            let _dateArr = [start]
            while(_date != end)
            { 
                _date= moment(_date).add(1, "days").format("YYYY-MM-DD")
                _dateArr.push(_date)
            }
            // if(_dateArr.length>1){
            //     _dateArr.pop()
            // }
            return _dateArr
        },
        getEveryMonths(start,end){
            let _date = start
            let _dateArr = [start.substr(0,7)]
            while(_date != end.substr(0,7))
            {  
                _date= moment(_date).add(1, "months").format("YYYY-MM")
                _dateArr.push(_date)
            }
            return _dateArr
        }
    }
}
</script>

<style>

.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-box {
  /* background: #00A0E9; */
  padding: 5px 0;
  /* margin-bottom:100px; */
  /* height: 320px; */
  height: 410px;
}
.topDashbard .ant-card-body{
  padding: 15px 0 0 0;
}
.topDashbard{
  margin-bottom: 20px;
}
.topDashbard .ant-card:hover {
    -webkit-transform: translateY(-4px);
    -ms-transform: translateY(-4px);
    transform: translateY(-4px);
    /* box-shadow: 0 12px 24px rgba(84, 48, 132, 0.06); */
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}

.topDashbard1 .ant-card-body{
  padding: 18px 0 0 0;
}
.topDashbard1{
  margin-bottom: 20px;
}

.ant-card-head-title{
  padding:0 !important;
}
/* .bottomDashbard .ant-card-grid:hover{
  -webkit-transform: translateY(-8px);
  -ms-transform: translateY(-8px);
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(84, 48, 132, 0.06);
} */

#topDashbard1 .ant-select-selection{
  border: none !important;
}
#topDashbard1 .ant-select-selection:focus{
  box-shadow:none !important;
}
#dashboard .ant-card-head-title{
  font-size: 18px !important;
}
/* .example {
    text-align: center;
    background: rgba(0,0,0,0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  } */
  .example {
    text-align: center;
    border-radius: 4px;
    padding: 100px 50px;
  }
</style>
