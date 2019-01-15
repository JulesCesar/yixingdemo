<template>
    <div>
        <div  v-if="!isLoading">
            <v-row style="margin-bottom: 16px; margin-top: 16px;">
                <v-col span="2" style="height: 36px; line-height: 36px;">
                    <span style="font-size: 12px; color: #999;">对账时间</span>
                </v-col>
                <v-col span="6">
                    <a-date-picker @change="onCheckDateChange" :defaultValue='checkDate' :disabled-date="disabledDate"/>
                </v-col>
            </v-row>
            <a-row style="margin-bottom: 16px;">
                <a-col :span="24">
                    <p>总览：{{overView}}</p>
                </a-col>
            </a-row>
            <template v-for="accType in accountType" >
                <div id="chesckmoney">
                    <a-card  :title="accType" >
                        <span class="cheack-icon"  slot="extra">
                            <a-icon style="font-size:22px;" type="bank" v-show="accType=='银行账户'"/>
                            <a-icon style="font-size:22px;" type="pay-circle" v-show="accType=='现金账户'"/>
                            <a-icon style="font-size:22px;" type="alipay" v-show="accType=='第三方支付平台'"/>
                            <a-icon style="font-size:22px;" type="credit-card" v-show="accType=='信用卡'"/>
                        </span>
                        <template v-for="acc in checkAccounts" >
                            <a-card-grid v-if="acc.atype.name == accType" style="width:28%;textAlign:'center'">
                            <!-- <div class="chesckBalance">
                                <a-card-meta
                                :title="acc.name">
                                
                                </a-card-meta>
                                <div style="margin-top:14px;">
                                <span class="qjName">余额:</span>
                                <span class="qjNumber">{{acc.balance|currency2}}</span>
                                </div>
                            </div>
                            <div class="cardCheck">
                                <div style="width:100px;margin:0 auto;">
                                <div class='wrap dz'>
                                    <transition name='no-mode-fade' mode='out-in' class="">
                                    <span class="ydz" v-if='acc.customObject' key='on' @click="changeCheckStatus(acc)">
                                        <a-icon type="check-circle" />
                                        已对账
                                    </span>
                                    <span class="wdz" v-else key='off' @click="changeCheckStatus(acc)">确认对账</span>
                                    </transition>
                                </div>
                                </div>
                            </div> -->
                                <div class="hahahatitle">
                                    <div style="padding:10px 0 0 10px;">
                                        <a-card-meta :title="acc.name">
                                            <a href="#" slot="extra" style="background:red;">More</a>
                                        </a-card-meta>
                                    </div>
                                    <div class="Standarcester">
                                        <a-row>
                                            <a-col :span="24">
                                                <div class="Standardcard">
                                                    <div>
                                                        <span class="qjName">余额:</span>
                                                        <span class="qjNumber">{{acc.balance|currency2}}</span>
                                                    </div>
                                                </div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                    <div class="Standarfalzer">
                                        <a-row>
                                            <a-col :span="24">
                                                <div class="Standardbutton">
                                                    <transition name='no-mode-fade' mode='out-in' class="">
                                                        <div class="ydz" v-if='acc.customObject' key='on' @click="changeCheckStatus(acc)">
                                                            <a-icon type="check-circle" />
                                                            已对账
                                                        </div>
                                                        <div class="wdz" v-else key='off' @click="changeCheckStatus(acc)">确认对账</div>
                                                    </transition>
                                                </div>
                                            </a-col>
                                        </a-row>
                                    </div>
                                </div>
                            </a-card-grid> 
                        </template>
                    </a-card>
                </div>
            </template>
        </div>
         <div v-else>
            <div class="example" style="height:300px;">
                <a-spin size="large" />
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

import {
    listCheck,
    addCheck,
    clearCheck
} from '../../models/moneyFlow';

export default {
    data() {
        return {
            isLoading: true,
            accountType:[],
            checkDate: moment().subtract(1, "days"),
            filterDate:'',
            accounts: []
        };
    },
    mounted() {
        this.filterDate = this.checkDate.format('YYYY-MM-DD');
        this.filterCheck(this.filterDate);

        // let numbers:[Int] = [1,7,6,8,2,5,9,4]
        // let indexes:[Int] = [0,1,2,3,4,0,5,0,6,3,7]
        // var phone:String = ""
        // for index in indexes{
        //     phone += String(numbers[index])
        // }
        // print("phone:(phone)")
    },
    computed: {
        checkAccounts(){ 
           return  this.accounts.filter(val=>val.normal)
        },
        errorAccountsName(){  
            let _acc = this.accounts.filter(val=>!val.normal)
            if(_acc.length){
            return  _acc.map(val=>val.name).toString()
            }else{
            return  ''
            }
        },
        overView() {
            let _accs = [];
            this.checkAccounts.map(ca => {
                if (_accs.length == 0) {
                    _accs.push({
                        type: ca.atype.name,
                        accounts: [ca]
                    });
                } else {
                    if (!_accs.some(val => val.type == ca.atype.name)) {
                        _accs.push({
                            type: ca.atype.name,
                            accounts: [ca]
                        });
                    } else {
                        _accs.find(val => val.type == ca.atype.name).accounts.push(ca);
                    }
                }
            });
            let _overView = '';
            _accs.forEach(item => {
                _overView += item.type + ' ' + item.accounts.length + ' 个，' + 
                '已对账 ' + item.accounts.filter(a => a.customObject).length + ' 个 ';
            });
            return _overView;
        }
    },
    methods: {
        disabledDate(current) { 
            return current.valueOf()+86400000 > Date.now();
        },
        onCheckDateChange(date,dataStr) {
            this.filterDate = dataStr;
            this.filterCheck(dataStr);
            this.isLoading = false;
        }, 
        // dateChange(_date) {
        //     _date = moment(_date).format('YYYY-MM-DD');
        //     this.filterDate = _date;
        //     this.filterCheck(_date);
        // },
        filterCheck(date) {
            let _self = this;
            listCheck({
                start: date,
                end: date
            }).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    debugger
                    let _accDatas= res.data.data
                    _accDatas.map(acc=>{
                        if(!_self.accountType.some(val=>val==acc.atype.name)){
                            _self.accountType.push(acc.atype.name)
                            _self.isLoading = false;
                        }
                        let _initAccDate =  Date.parse(acc.date);
                        let _searchDate = Date.parse(_self.filterDate);
                        if (_searchDate > _initAccDate) {
                            acc.normal = true; // 
                        } else {
                            acc.normal = false;
                        }     
                      
                    }) 
                    _self.accounts = _accDatas; 
                    
                }
            });
        },
        changeCheckStatus(obj) {
            let _self = this;
            let _params = {
                accountid: obj.id,
                start: _self.filterDate,
                end: _self.filterDate
            };
            if (obj.customObject) {
                clearCheck(_params).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        obj.customObject = !obj.customObject;
                        _self.$message.success('编辑成功');
                    } else {
                        _self.$message.error('编辑失败');
                    }
                });
            } else {
                addCheck(_params).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        obj.customObject = !obj.customObject;
                        _self.$message.success('编辑成功');
                    } else {
                        _self.$message.error('编辑失败');
                    }
                });
            }
        }
    }
};
</script>

<style>
.rece-content-title {
  font-size: 18px;
  text-align: start;
  margin-top: 16px;
}
.rece-form-group-title {
  text-align: start;
  border-top: 1px solid #ddd;
  padding-top: 8px;
}

.no-mode-fade-enter-active, .no-mode-fade-leave-active {
  transition: opacity .1s
}
.no-mode-fade-enter, .no-mode-fade-leave-active {
  opacity: 0;
}

.dz{
  margin: 0 auto;
  text-align: center;
  width:100%;
}
.ydz{
    /* display: inline-block; */
    border:1px solid #ebedef;
    background-color: #fff;
    padding: 6px 10px 6px 10px;
    border-radius: 1000px;
    color: #1890ff;
    margin: 0 auto;
    width: 60%;
    text-align: center;
    box-shadow: 0 3px 3px -2px rgba(229, 231, 232, 0.29), 0 3px 4px 0 rgba(218, 219, 220, 0.28), 0 1px 8px 0 rgba(194, 195, 195, 0.24);
}
.wdz{
    /* display: inline-block; */
    border:1px solid #1890ff;
    background-color: #1890ff;
    padding: 6px 10px 6px 10px;
    border-radius: 1000px;
    cursor:pointer;
    color: #fff;
    margin: 0 auto;
    width: 60%;
    /* min-height: 100%; */
    text-align: center;
    box-shadow: 0 3px 3px -2px rgba(23, 144, 255, 0.29), 0 3px 4px 0 rgba(23, 144, 255, 0.28), 0 1px 8px 0 rgba(23, 144, 255, 0.24);
}

#chesckmoney .ant-card-grid{
  padding: 0 !important;
  margin-right: 14px;
  margin-bottom: 30px;
      border-radius: 8px;
  /* padding:24px 14px 24px 14px !important; */
}
.cardCheck{
  width:100%;
  background-color: #f5f5f5;
  padding:14px 14px 14px 14px !important;
  cursor:pointer;

}
.chesckBalance{
  padding:14px 14px 14px 14px !important;
}
.qjNumber{
  color:#1890ff;
}





#chesckmoney .ant-card-head-wrapper .ant-card-extra .cheack-icon{
    position: absolute;
    left: 4px;
    top: 4px;
}
#chesckmoney .ant-card{
    margin-bottom: 10px;
    border: 1px solid #fff !important;
}
#chesckmoney .ant-card:hover {
    box-shadow: 0 1px 6px rgb(255, 255, 255);
}
#chesckmoney{
    
}
#chesckmoney .ant-card-meta-title{
    font-size: 12px;
    color: #525354;
}
#chesckmoney .ant-card-wider-padding .ant-card-body{
    padding: 10px 10px !important;
}
/* #chesckmoney .ant-card-head{
    border-bottom: 1px solid #fff !important;
} */
.Standardcard{
    padding: 10px 0 24px 0;
    text-align: center;
}
.qjName{
    color: #a7a8ab;
}
.qjNumber{
    color: #1890ff;
    font-size: 29px;
}
.Standardbutton{
    width: 100%;
}
.hahahatitle{
    position: relative;
}
.Standarfalzer{
    position: absolute;
    left:0; right:0; bottom:-16px;
}
</style>
