<template>
    <div>
        <receiver-modal @receiverInserted="refreshReceiver" :insertvisible="receiverModalVisible" @receivermodalcancel="receivermodalcancel" :is-receiver-modify="isReceiverModify" />
        <!-- <v-row>
            <v-col span="3">
             
                  <div class="Modifybutton">新增收付款人</div>
            </v-col>
            <v-col>
                <v-row v-show="true">
                    <v-col span="1" style="min-width:40px;margin-left: 16px;">
                        
                    </v-col>
                    <v-col span="4">
                        <span class="receiver-content-type">类型</span>
                        <span>
                            <v-ys-tags :tags="receiverTags" @tagsClick="onCheckType" />
                        </span>
                        
                    </v-col>
                    <v-col span="1" style="min-width:40px;">
                        
                    </v-col>
                    <v-col span="12">
                        <span class="receiver-content-type">总览</span>
                        <span><p class="receiver-content-type receiver-content-type-content">{{statValue}}</p></span>
                        
                    </v-col>
                </v-row>
            </v-col>
        </v-row> -->
        <div>
            <a-row type="flex">
                <a-col :span="3" :order="1" class="clearfloat">
                    <div class="Modifybutton apileft"  @click="showInsertModal">新增收付款人</div>
                </a-col>
                <a-col :span="20" :order="2" class="clearfloat" style="margin-left:10px;">
                    <!-- <div class="Modifybutton apileft"  @click="showInsertModal">新增收付款人</div> -->
                    <span class="receiver-content-type apileft">类型:</span>
                    <span class="receiver-content-anniu apileft">
                        <v-ys-tags :tags="receiverTags" @tagsClick="onCheckType" />
                    </span>
                    <span class="receiver-content-type apileft">总览:</span>
                    <span style="color:#4e4f50;margin-left:10px;font-size:12px;" class="receiver-content-type apileft">{{statValue}}</span>
                </a-col>
                
            </a-row>
        </div>
      
        <!-- 收付款人卡片 -->
        <div v-if="filterReceivers.length">
            <v-row>
                <v-col span="24">
                    <div class="settimeLoading" v-show="tagsLoading">
                        <div class="example">
                            <a-spin />
                        </div>
                    </div>
                    <yxcard 
                        v-for="acc in filterReceivers" 
                        :key="acc.id"
                        :id="acc.id" 
                        :name="acc.cname"
                        :showname="acc.name" 
                        :phone="acc.phone ? acc.phone : '无'" 
                        :click="showModifyModal"
                        rightTitle="盈余"
                        :income="acc.income"
                        :outcome="acc.expense < 0 ? -acc.expense : acc.expense"
                        :total="acc.income + acc.expense"
                        :type="acc.rtype.name"
                        :remark="acc.remark"
                        :atags="acc.tags" >
                    </yxcard>
                </v-col>
            </v-row>
        </div>
        <div v-else style="width:100%;">
        <div style="width:100px;height:100px;margin:200px auto;">
            <img style="width:100px;height:100px;" src="../../assets/img/zwsj.jpg" alt="">
        </div>
        </div>
    </div>
</template>

<script>
// import {
//   searchMoneyflows,
//   statMoneyflows
// } from "../../models/moneyFlow.js";

import {
  listReceiver,
  listRAtype,
  deleteReceiver
} from '../../models/moneyFlow.js';

import { searchArap } from "../../models/arap.js";
 

import Yxcard from "../../components/Yxcard.vue";
import ReceiverModal from '../edit/ReceiverModal.vue';
 

export default {
    props: {
        isArap: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isReceiverModify: false,
            oldReceiver: {},
            receiverModalVisible: false,
            tagsLoading: false,
            receivers: [],
            filterReceivers: [],
            // receiverTags: [],
            startDate: "2000-01-01",
            endDate: "2020-01-01",
            isDay: true,
            selectType: "all",
            selectAccount: {},
            accounts: [],
            insertvisible: false,
            modifyvisible: false,
            receiverTags: [
                {
                    id: 1,
                    name: "公司",
                    isActive: true
                },
                {
                    id: 2,
                    name: "个人",
                    isActive: false
                }
            ]
        };
    },
    created() {
        this.$bus.$on('initCashierReceiver', () => {
            this.initAccouts();
        })
    },
    mounted() {
        this.initAccouts();
    },
    computed: {
        statValue() {
            let len = this.filterReceivers.length;
            let lenCompany = 0;
            let lenPerson = 0;
            for (let i = 0; i < len; i++) {
                const acc = this.filterReceivers[i];
                if (this.selectType === "公司" && 1 === acc.rtype.id)
                    lenCompany++;
                else if (this.selectType === "个人" && 2 === acc.rtype.id)
                    lenPerson++;
                else{
                    if (acc.rtype.id === 1) lenCompany++;
                    else lenPerson++;
                }
            }
            len = lenCompany + lenPerson;
            return (
                "共选择 " + len + " 个收付款人，其中公司 " + lenCompany + " 个，个人 " + lenPerson + " 个"
            );
        },
        isSaveEnabled() {
            return this.selectAccount.name === "" || this.selectAccount.cname === "";
        }
    },
    methods: {
        initAccouts() {
            let _self = this;
            listReceiver({}).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    _self.receivers = res.data.data;
                    _self.filterReceivers = _self.receivers;
                    _self.receiverTags.map(item => {
                        item.isActive = true;
                    });
                }
            });
        },
        onCheckType(value) {
            let _tag  =  value.tags[value.clickTagId] 
            _tag.isActive = ! _tag.isActive;
            if (value.tags[0].isActive == value.tags[1].isActive) {
                this.selectType = 'all';
                this.filterReceivers = this.receivers;
            } else if (value.tags[0].isActive) {
                this.selectType = '公司';
                this.filterReceivers = this.receivers.filter(item => item.rtype.name == '公司');
            } else {
                this.selectType = '个人';
                this.filterReceivers = this.receivers.filter(item => item.rtype.name == '个人');
            }
         },
 
        showInsertModal() {
            // TDAPP.onEvent("", "顶部");
            this.receiverModalVisible = true;
        },
        showModifyModal(id) {
            let _self = this;
            _self.isReceiverModify = true;
            let _rec = _self.receivers.find(item => item.id == id);
            Object.keys(_rec).forEach(key => {
                _self.oldReceiver[key] = _rec[key];
            });
            _self.receiverModalVisible = true;
            this.$bus.$emit('updatereceiver', _self.oldReceiver);
        },
        receivermodalcancel(acc) {
            this.receiverModalVisible = false;
            this.isReceiverModify = false;
            this.oldReceiver = {};
            if (acc) {
                if (acc.isDeleted) {
                    for (let i = 0, l = this.receivers.length; i < l; i++) {
                        if (acc.id == this.receivers[i].id) {
                            this.receivers.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    let _rec = this.receivers.find(val => val.id == acc.id);
                    if (_rec) {
                        Object.keys(acc).forEach(key => {
                            _rec[key] = acc[key];
                        });
                    }
                }
            }
            this.$bus.$emit('receivermodalinit');
        },
        refreshReceiver(new_receiver) {
            let _item = this.receivers.find(val => val.id == new_receiver.id);
            if (_item != undefined) {
                Object.keys(new_receiver).forEach(key => {
                    _item[key] = new_receiver[key];
                });
            } else {
                this.receivers.push(new_receiver);
            }
            this.receiverModalVisible = false;
            this.isReceiverModify = false;
        }
    },
    components: {
        Yxcard,
        ReceiverModal
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
  font-size: 12px;
  padding-left: 10px;
  line-height: 20px;
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
