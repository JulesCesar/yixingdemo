<template>
  <div>
    <!-- <a-spin tip="Loading..." v-show="tagsLoading">
      <div class="spin-content">
        新增收付款人管理洁页面
      </div>
    </a-spin> -->
    <receiver-modal :insertvisible="receiverInsertvisible" @receivermodalcancel="receivermodalcancel" @receiverInserted="refreshReceivers"/>
    <v-row>
      <v-col span="24" style="height: 64px; padding-top: 8px;">
        <v-button type="primary" @click="showInsertModal" size="large"> 新增{{title}}人</v-button> 
      </v-col>
    </v-row>
    <v-row>
      <v-col span="12">
        <p class="receiver-content-title">{{ title }}人管理</p>
      </v-col>
      <v-col span="12"  style="padding-top: 8px;display:none;">
        
      </v-col>
    </v-row>
    <v-row style="display:none;">
      <v-col span="8" offset="16">
        <p style="text-align: start; font-size: 14px; text-align: end; padding-right: 4px;"> {{dateValue}} </p>
      </v-col>
    </v-row>
    <v-row v-show="true">
      <v-col span="1" style="min-width:40px;">
        <p class="receiver-content-type">类型</p>
      </v-col>
      <v-col span="20" style="min-width:200px;">
        <yx-tags :tags="receiverTags" @tagsClick="onCheckType" />
      </v-col>
    </v-row>
    <v-row>
      <v-col span="1" style="min-width:40px;">
        <p class="receiver-content-type">总览</p>
      </v-col>
      <v-col span="20">
        <p class="receiver-content-type receiver-content-type-content">{{statValue}}</p>
      </v-col>
    </v-row>
    <!-- 收付款人卡片 -->
    <div v-if="receivers.length">
      <v-row>
        <v-col span="24" >
          <div class="settimeLoading"  v-show="tagsLoading">
            <div class="example">
              <a-spin />
            </div>
          </div>
          <yxcard-arap
            v-for="acc in receivers"
          :id="acc.id"
          :type="acc.type"
          :showname="acc.showname"
          :name="acc.cname" 
          :total="acc.total"
          :phone="acc.phone? acc.phone : '无'"
          :income="acc.curincome"   
          :outcome="acc.curexpense"
          :income2="acc.curincome2"
          :outcome2="acc.curexpense2"
          rightTitle="期间总和"
          :click="showModifyModal" >
          </yxcard-arap>
        </v-col> 
      </v-row>
    </div>
    <div v-else style="width:100%;">
      <div style="width:100px;height:100px;margin:200px auto;">
        <!-- <img style="width:100px;height:100px;" src="../../assets/img/zwsj.jpg" alt=""> -->
        <img src="../../assets/img/nodata.svg" alt="">
      </div> 
    </div>
   <!-- end 收付款人卡片 -->

 
  </div>
</template>

<script>
import {
  searchReceivers,
  insertReceivers,
  modifyReceivers,
  deleteReceivers,
  searchMoneyflows,
  statMoneyflows
} from "../../models/moneyFlow.js";

import { searchArap } from "../../models/arap.js";

import _ from "lodash";
import moment from "moment";

import YxcardArap from "../../components/YxcardArap.vue";

import ReceiverModal from '../edit/ReceiverModal.vue';

Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

export default {
  props: {
    isArap: {
      type: Boolean,
      default: false
    },
    receiverDatas:{
      type: Array, 
      default: () => [],
   },
  },
  components: { 
    YxcardArap,
    ReceiverModal
  },
  data() {
    return {
      receiverInsertvisible: false,
      editReceiverRow: {
        cname: '',
        desc: '',
        id: '',
        name: '',
        type: '',
        linkman: '',
        linkphone: '',
        phone: ''
      },
      tagsLoading:false, 
      receiverTags: [
        {
          name: "公司",
          isActive: true
        },
        {
          name: "个人",
          isActive: false
        }
      ],
     
      isDay: true,
      selectType: "公司",
      selectAccount: {},
      accounts: [
        // { name: '中国工商银行账户', type:'银行账户', balance: 25468.42, startdate: '2014-12-12', enddate: '2017-1-1', rows: 1234},
      ],
      insertvisible: false,
      modifyvisible: false,
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      pageSize: 10,
      page: 1,
      pageTotal: 1,
      curPageValueIndex: 0
    };
  },
  created() {
    // this.initObjects();
    // this.initAccouts(this.startDate, this.endDate);
  },
  computed: {
    receivers(){
      debugger
      //  :id="acc.id"
      //     :showname="acc.name.length < 11? acc.name: acc.name.substring(0,11)+'...'"
      //     :name="acc.cname" 
      //     :total="acc.curincome-acc.curexpense + acc.curincome2-acc.curexpense2"
      //     :phone="acc.phone? acc.phone : '无'"
      //     :income="acc.curincome"   
      //     :outcome="acc.curexpense"
      //     :income2="acc.curincome2"
      //     :outcome2="-acc.curexpense2"
      //     rightTitle="期间总和"
      //     :click="showModifyModal" :type="acc.type">

      let _type =  this.receiverTags.filter(val=>val.isActive)
      let _typeReceivers = this.receiverDatas

      if(_type.length==1){
        _typeReceivers = this.receiverDatas.filter(val=> val.type == _type[0].name)
      }  
      return _typeReceivers.map(acc=>{
        acc.showname = acc.name.length < 11? acc.name: acc.name.substring(0,11)+'...'
        acc.total=acc.curincome-acc.curexpense 
        acc.phone = acc.phone? acc.phone : '无'
        acc.income=acc.curincome
        acc.outcome= acc.curexpense 
        acc.income2=11111
        acc.outcome2= -1111 
        return acc
      })
    },
    title() {
      return this.isArap ? "应收应付款" : "收付款";
    },
    statValue() {
      let len = this.receiverDatas.length;
      // let len = this.lenCompany.length+this.lenPerson.length;
      let lenCompany = 0;
      let lenPerson = 0;
      // debugger;
      console.log(this.selectType);
      for (let i = 0; i < len; i++) {
        const acc = this.receiverDatas[i];
        if (this.selectType === "公司" && this.selectType === acc.type) {
          lenCompany++;
          lenPerson = 0;
        }
        else if (this.selectType === "个人" && this.selectType === acc.type) {
          lenPerson++;
          lenCompany = 0;
        }
        else if (this.selectType === "all") {
          if (acc.type === "公司") lenCompany++;
          else lenPerson++;
        }
      }
      len = lenCompany + lenPerson;

      //页码计算
      this.curPageValueIndex = 0;
      this.page = 1;
      if (this.selectType === "公司") this.pageTotal = lenCompany;
      else if (this.selectType === "个人") this.pageTotal = lenPerson;
      else this.pageTotal = len;

      return (
        "共选择 " +len+ " 个" + this.title + "人，其中公司 " +lenCompany+ " 个，个人 " +lenPerson+ " 个"
      );
    },
    dateValue() {
      if (this.isDay) return "时间：" + this.startDate + " 至 " + this.endDate;
      else return "时间：" + this.startDate;
    },
  },
  methods: {
    receivermodalcancel() {
      this.receiverInsertvisible = false;
    },
    refreshReceivers(new_receiver, isModify) {
      if (isModify == 'isModify') {
        this.receiverDatas.map(item => {
          if (item.id == new_receiver.id) {
            Object.keys(new_receiver).forEach(key => {
              item[key] = new_receiver[key];
            });
          }
        });
      } else {
        this.receiverDatas.push(new_receiver);
      }
      this.receivermodalcancel();
    },
    initAccouts() {
      //type 分类类型，    0无分类    1财务分类    2标签分类   3公司分类   4收付款人分类
    // start   起始日期
    // end     结束日期

    //    let _outop3 =  statMoneyflows({'type': 4,"start": this.lastWeekDay, "end": this.tomorrow,"days":1});
      // let _receivers =  searchReceivers({})

      let _startDate= "2000-01-01"
      let _endDate= "2020-01-01"
      statMoneyflows({'type': 4, "start": _startDate, "end": _endDate}).then(res=>{  //根据收付款人统计  

      }) 

    }, 
    onCheckType(value) {
      let _tag  =  value.tags[value.clickTagId] 
      _tag.isActive = ! _tag.isActive;
      if (value.tags[0].isActive == value.tags[1].isActive) {
        this.selectType = 'all';
      } else if (value.tags[0].isActive) {
        this.selectType = '公司';
      } else {
        this.selectType = '个人';
      }
    },
    showInsertModal() {
      //TDAPP.onEvent("", "顶部");
      let _self = this;
      // _self.initObjects();
      _self.$bus.$emit('receivermodalinit');
      _self.receiverInsertvisible = true;
    },
    showModifyModal(id) {
      let _self = this;
      _self.receiverDatas.map(item => {
        if (item.id == id) {
          Object.keys(_self.editReceiverRow).forEach(key => {
            _self.editReceiverRow[key] = item[key];
          });
          console.log('emit ', _self.editReceiverRow)
        }
      });
      _self.$bus.$emit('editreceiver', _self.editReceiverRow);
      // _self.modifyvisible = true;
      _self.receiverInsertvisible = true;

      for (let i = 0; i < _self.accounts.length; i++) {
        let _r = _self.accounts[i];
        if (_r.id === id) {
          _self.selectAccount = JSON.parse(JSON.stringify(_r));
          break;
        }
      }
    },
    handleCancell() {
      //TDAPP.onEvent("编辑", "顶部");
      this.insertvisible = false;
      this.modifyvisible = false;
    },
    handleModifyDelete() {
      //TDAPP.onEvent("删除", "顶部");
      let _self = this;
      if (_self.selectAccount.id === "") return;
      _self.handleCancell();
      deleteReceivers({ id: _self.selectAccount.id }).then(res => {
        if (res.data.code !== 200) {
          _self.$message.error(
            "删除" + _self.title + "人失败" + res.data.desc.replace("S_E", "")
          );
        } else {
          _self.$message.success("删除" + _self.title + "人成功");
          // console.log(_self.accounts);
          for (let i = 0; i < _self.accounts.length; i++) {
            let ele = _self.accounts[i];
            if (ele.id === _self.selectAccount.id) {
              // debugger;
              _self.accounts.splice(i, 1);
              return;
            }
          }
          // console.log(_self.accounts);
        }
      });
    },
    cancel() {
      // alert('click cancel');
    },
 
  },

};
</script>

<style>
.receiver-content-title {
  font-size: 18px;
  text-align: start;
  margin-top: 16px;
}
.receiver-content-type {
  color: #a9a9a9;
  font-size: 13px;
  text-align: start;
  margin-top: 6px;
  margin-bottom: 12px;
}
.receiver-content-type-content {
  color: #696969;
  font-size: 15px;
  padding-left: 10px;
}
.receiver-form-group-title-name {
  color: #a9a9a9;
  font-size: 12px;
  text-align: start;
}
.receiver-form-group-title {
  text-align: start;
  border-top: 1px solid #ddd;
  padding-top: 16px;
  padding-bottom: 8px;
}
.accountActive {
  color: #108ee9 !important;
  border: 1px solid #108ee9 !important;
}
.accountNoActive:hover {
  border: 1px solid #d3d3d3 !important;
}
.spin-content{
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
  .settimeLoading{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* background-color: #69696926; */
    z-index: 999999999;

    background: rgba(0,0,0,0.05);

  }
  .example {
    text-align: center;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
</style>
