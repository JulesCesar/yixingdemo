<template>
  <div>
    <v-row>
      <v-col span="24" style="height: 64px; padding-top: 8px; border-bottom: 1px solid #ddd;">
        <v-button type="primary" @click="showInsertModal" size="large">新增{{title}}人</v-button> 
      </v-col>
    </v-row>
    <v-row>
      <v-col span="12">
        <p class="receiver-content-title">{{ title }}人管理</p>
      </v-col>
      <v-col span="12"  style="padding-top: 8px;">
        <YxTabDate :changedFormart="changedDateFormart" />
      </v-col>
    </v-row>
    <v-row>
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
    <div v-if="accounts.length">
    <v-row>
      <v-col span="24" >
         <YxcardArap
          v-for="acc in accounts"
         v-if="isPage(acc)"
        :id="acc.id"
        :showname="cardName(acc)"
        :name="acc.cname" 
        :total="cardTotal(acc)"
        :phone="acc.phone? acc.phone : '无'"
        :income="acc.curincome"   
        :outcome="acc.curexpense"
        :income2="acc.curincome2"
        :outcome2="-acc.curexpense2"
        rightTitle="期间总和"
        :click="showModifyModal" :type="acc.type"></YxcardArap>

      </v-col>
 
    </v-row>
    </div>
    <div v-else style="width:100%;">
      <div style="width:100px;height:100px;margin:200px auto;">
        <img style="width:100px;height:100px;" src="../../assets/img/zwsj.jpg" alt="">
      </div>
      
    </div>
    <v-modal :title="modifyvisible ? '编辑收付款人' : '应收应付款人'" :visible="insertvisible || modifyvisible" @cancel="handleCancell">
      <v-form direction="horizontal">
        <v-form-item label="对方账户类型" :label-col="labelCol" :wrapper-col="wrapperCol" required >
          <v-radio-group 
            v-model="selectAccount.type"
            :data="[{value: '公司', text: '公司'},{value: '个人', text: '个人'}]">
          </v-radio-group>
        </v-form-item>
        <v-row v-if="selectAccount.type=='公司'">
          <v-col span="24">
            <p class="receiver-form-group-title-name">公司信息</p>
            <p class="receiver-form-group-title"></p>
          </v-col>
        </v-row>
        <v-form-item label="显示名称" :label-col="labelCol" :wrapper-col="wrapperCol" required>
          <v-input v-model="selectAccount.name"></v-input>
        </v-form-item>
        <v-form-item label="真实名称" :label-col="labelCol" :wrapper-col="wrapperCol" required>
          <v-input v-model="selectAccount.cname"></v-input>
        </v-form-item>
        <v-form-item label="联系电话" :maxlength="15" :label-col="labelCol" :wrapper-col="wrapperCol">
          <v-input @blur="keygongs" v-model="selectAccount.phone"></v-input>
        </v-form-item>
        <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
          <v-input type="textarea" v-model="selectAccount.desc"></v-input>
        </v-form-item>
        <v-row v-if="selectAccount.type=='公司'">
          <v-col span="24">
            <p class="receiver-form-group-title-name">联系人信息</p>
            <p class="receiver-form-group-title"></p>
          </v-col>
        </v-row>
        <v-form-item v-if="selectAccount.type=='公司'" label="联系人姓名" :label-col="labelCol" :wrapper-col="wrapperCol">
          <v-input v-model="selectAccount.linkman"></v-input>
        </v-form-item>
        <v-form-item v-if="selectAccount.type=='公司'" label="联系人手机" :label-col="labelCol" :wrapper-col="wrapperCol">
          <v-input  v-model="selectAccount.linkphone" @blur="keyphone"></v-input>
        </v-form-item>
      </v-form>
      <div slot="footer">
        <div v-if="modifyvisible"  style="float:left; padding-left:10px;">
          <v-popconfirm  title="确定删除吗?" @confirm="handleModifyDelete" @cancel="cancel">
            <v-button  key="delete" type="error">
              删 除
            </v-button>
          </v-popconfirm>
        </div>
       
        <v-button key="cancel" type="ghost" @click="handleCancell">
          取 消
        </v-button>
        <v-button key="confirm" type="primary" @click="handleOk" :disabled="isSaveEnabled">
          保 存
        </v-button>
      </div>
    </v-modal>
  </div>
</template>

<script>
import {
  searchReceivers,
  insertReceivers,
  modifyReceivers,
  deleteReceivers,
  searchMoneyflows
} from "../../models/moneyFlow.js";

import { searchArap } from "../../models/arap.js";

import _ from "lodash";
import moment from "moment";

import YxcardArap from "../../components/YxcardArap.vue";
import Yxcard from "../../components/Yxcard.vue";
import YxTabDate from "../../components/YxTabDate.vue";

export default {
  props: {
    isArap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
      startDate: "",
      endDate: "",
      endDate2: "",
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
    this.initObjects();
  },
  computed: {
    title() {
      return  "应收应付款" 
    },
    attachType() {
      return   "araper" 
    },
    statValue() {
      debugger
      let len = this.accounts.length;
      // let len = this.lenCompany.length+this.lenPerson.length;
      let lenCompany = 0;
      let lenPerson = 0;
      // debugger;
      // console.log(this.selectType);
      for (let i = 0; i < len; i++) {
        const accObj = this.accounts[i];
        if (this.selectType === "公司" && this.selectType === accObj.type)
          lenCompany++;
        else if (this.selectType === "个人" && this.selectType === accObj.type)
          lenPerson++;
        else if (this.selectType === "all") {
          if (accObj.type === "公司") lenCompany++;
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
    isSaveEnabled() {
      return this.selectAccount.name === "" || this.selectAccount.cname === "";
    } 
  },
  methods: {
    cardName(obj){
      // return 1
      return obj.name.length < 11? obj.name: obj.name.substring(0,11)+'...'
    },
    cardTotal(obj){
      // return 2
      return obj.curincome-obj.curexpense + obj.curincome2-obj.curexpense2
    },
    keygongs(val) {
      let _self = this;
      if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(val)) {
        _self.$message.error("联系电话不正确");
        return;
      }
    },
    keyphone(val) {
      let _self = this;
      if (!/^1(3|4|5|7|8)\d{9}$/.test(val)) {
        _self.$message.error("手机号码不正确");
        return;
      }
    },
    changedDateFormart(_startDate, _endDate, _endDate2, isDay) {
      // alert(_startDate);
      let _self = this;

      _self.startDate = _startDate;
      _self.endDate = _endDate;
      _self.endDate2 = _endDate2;
      _self.isDay = isDay;

      _self.initAccouts(_self.startDate, _self.endDate2);
    },
    initObjects() {
      this.selectAccount = {
        id: 0,
        type: "公司",
        name: "",
        cname: "",
        account: "",
        atype: "",
        alast4: "",
        phone: "",
        email: "",
        linkman: "",
        linkphone: "",
        desc: ""
      };
    },
    initAccouts(startdate, enddate) {
      // 账户查询信息
      // debugger;
      let _self = this;

      searchReceivers({
        start: startdate,
        end: enddate,
        attach: _self.attachType
      }).then(res => {
        _self.accounts = res.data.data;
        if (_self.attachType == "receiver") {
          searchMoneyflows({
            page: 1,
            pagenum: 100000,
            start: startdate,
            end: enddate
          }).then(res => {
            if(res.data.code==200){
            let _group = _.groupBy(res.data.data, "receiverid");
            Object.keys(_group).forEach(key => {
              let _d = _group[key][0].date;
              _group[key].map(item => {
                if (moment(item.date).isAfter(_d)) {
                  _d = item.date;
                }
              });
              _self.accounts.map(item => {
                if (item.id == _group[key][0].receiverid) {
                  item._d = _d;
                }
              });
            });
            _self.accounts.map(item => {
              item._d = item._d
                ? item._d
                : moment(startdate)
                    .subtract(1)
                    .format("YYYY-MM-DD");
            });
            _self.accounts.sort((a, b) => {
              if (moment(a._d).isAfter(b._d)) {
                return -1;
              } else if (moment(a._d).isBefore(b._d)) {
                return 1;
              } else {
                return 0;
              }
            });
          }
          });
        } else {
          searchArap({
            start: startdate,
            end: enddate
          }).then(res => {
            if(res.data.code==200){
            let _group = _.groupBy(res.data.data, "arapid");
            Object.keys(_group).forEach(key => {
              let _d = _group[key][0].initdate;
              _group[key].map(item => {
                if (moment(item.initdate).isAfter(_d)) {
                  _d = item.initdate;
                }
              });
              _self.accounts.map(item => {
                if (item.id == _group[key][0].arapid) {
                  item._d = _d;
                }
              });
            });
            _self.accounts.map(item => {
              item._d = item._d
                ? item._d
                : moment(startdate)
                    .subtract(1)
                    .format("YYYY-MM-DD");
            });
            _self.accounts.sort((a, b) => {
              if (moment(a._d).isAfter(b._d)) {
                return -1;
              } else if (moment(a._d).isBefore(b._d)) {
                return 1;
              } else {
                return 0;
              }
            });
          }
          });
        }
      });
    },
    onCheckType(value) {
      let _v = value.clickTagId == 0 ? "公司" : "个人";
      let _self = this;
      //TDAPP.onEvent("" + _v + "tab");
      value = value.clickTagId;

      _self.receiverTags[value].isActive = !_self.receiverTags[value].isActive;
      value = value == 0 ? "公司" : "个人";
      // let _self = this;
      if (_self.selectType === value) {
        return;
      }
      if (_self.selectType === "all" && value === "公司") {
        _self.selectType = "个人";
      } else if (_self.selectType === "all" && value === "个人") {
        _self.selectType = "公司";
      } else {
        _self.selectType = "all";
      }
    },
    showInsertModal() {
      //TDAPP.onEvent("", "顶部");
      let _self = this;
      _self.initObjects();
      _self.insertvisible = true;
    },
    showModifyModal(id) {
      let _self = this;
      _self.modifyvisible = true;

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
    handleOk() {
      // debugger;
      let _self = this;
      if (_self.selectAccount.name === "" || _self.selectAccount.cname === "") {
        _self.$message.error(_self.title + "名称不能为空");
        return;
      }
      if (
        _self.selectAccount.name.length > 20 ||
        _self.selectAccount.cname.length > 20
      ) {
        _self.$message.error("名称不得多于20个汉字");
        return;
      }
      if (_self.selectAccount.linkman.length > 8) {
        _self.$message.error("联系人姓名不得多于8个汉字");
        return;
      }
      if (_self.selectAccount.desc.length > 50) {
        _self.$message.error("备注不得多于50个汉字");
        return;
      }

      // if (!/^1(3|4|5|7|8)\d{9}$/.test(_self.selectAccount.linkphone)) {
      //   _self.$message.error("手机号码不正确");
      //   return;
      // }
      // if (!/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(_self.selectAccount.phone)) {
      //   _self.$message.error("联系电话不正确");
      //   return;
      // }
      // 添加
      if (_self.insertvisible) {
        _self.selectAccount.attach = this.attachType;
        _self.handleCancell();
        if (_self.selectAccount.phone === "") _self.selectAccount.phone = "无";
        insertReceivers(_self.selectAccount).then(res => {
          if (res.data.code !== 200) {
            _self.$message.error("新增" + _self.title + "人失败");
          } else {
            _self.$message.success("新增" + _self.title + "人成功");
            let curAccounts = res.data.data;

            _self.initAccouts(_self.startDate, _self.endDate);
          }
        });

        _self.initObjects();
      }
      // 修改
      if (_self.modifyvisible) {
        _self.selectAccount.attach = this.attachType;
        _self.handleCancell();
        modifyReceivers(_self.selectAccount).then(res => {
          let _self = this;
          if (res.data.code !== 200) {
            // console.log(_self.res.data.code )

            _self.$message.error("修改" + _self.title + "人失败");
            // debugger;
          } else {
            _self.$message.success("修改" + _self.title + "人成功");
            // let curAccounts =  res.data.data;
            // let ele = curAccounts[0];
            // _self.accounts.push(ele);
            for (let i = 0; i < _self.accounts.length; i++) {
              let _r = _self.accounts[i];
              if (_r.id === _self.selectAccount.id) {
                _self.accounts[i] = JSON.parse(
                  JSON.stringify(_self.selectAccount)
                );
                break;
              }
            }
          }
          _self.initObjects();
        });
      }
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
    isPage(item) {
      if (this.isArap) {
        // 应收应付
        if (
          this.selectType === "all" ||
          (this.selectType === "公司" && this.selectType === item.type) ||
          (this.selectType === "个人" && this.selectType === item.type)
        )
          return true;
      } 
 

      return false;
    }
  },
  components: {
    Yxcard,
    YxcardArap,
    YxTabDate
  }
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
</style>
