<template>
    <div>
        <div  v-if="!isLoading">
            <araper-modal :is-modify="isModify" :modal-visible="modalvisible" @arapersaved="refreshAraper" @arapercancel="araperCancel" />
            <!-- <v-row>
                <v-col span="4">
                    <v-button type="primary" @click="showAraperModal" size="large">新增应收应付款人</v-button> 
                </v-col>
                <v-col span="6">
                    <v-row v-show="true">
                        <v-col span="1" style="min-width:40px;">
                            <p class="receiver-content-type">类型</p>
                        </v-col>
                        <v-col span="18">
                            
                        </v-col>
                    </v-row>
                </v-col>
                <v-col span="1" style="min-width:40px;">
                    <p class="receiver-content-type">总览</p>
                </v-col>
                <v-col span="10">
                    <p class="receiver-content-type receiver-content-type-content">{{statValue}}</p>
                </v-col>
            </v-row> -->


            <div>
                <a-row type="flex">
                    <a-col :span="4" class="clearfloat">
                        <div class="Modifybutton apileft"  @click="showAraperModal">新增应收应付款人</div>
                    </a-col>
                    <a-col :span="5">
                        <div  class="clearfloat">
                            <span class="receiver-content-type apileft" style="margin-right: 10px; font-size: 12px; color: #999; margin-top: 6px;">类型</span>
                            <span class="receiver-content-anniu apileft" style="margin-left:0;">
                                <v-ys-tags :tags="araperTags" @tagsClick="onCheckType" />
                            </span>
                        </div>
                    </a-col>
                    <a-col :span="12" class="clearfloat">
                        <span class="receiver-content-type apileft">总览:</span>
                        <span style="color:#4e4f50;margin-left:10px;font-size:12px;" class="receiver-content-type apileft">{{statValue}}</span>
                    </a-col>
                    
                </a-row>
            </div>
      


            <div v-if="filterDatas.length">
                <v-row>
                    <v-col span="24" >
                        <YxcardArap
                            v-for="araper in filterDatas"
                            :key="araper.id"
                            :id="araper.id"
                            :income="araper.income!= undefined ? araper.income : 0"
                            :outcome="araper.outcome != undefined ? araper.outcome : 0"
                            :income2="araper.income2 != undefined ? araper.income2 : 0"
                            :outcome2="araper.outcome2 != undefined ? araper.outcome2 : 0"
                            :showname="cardName(araper)"
                            :name="araper.cname"
                            :phone="araper.phone? araper.phone : '无'"
                            :click="showAraperModifyModal" :type="araper.rtype.name">
                        </YxcardArap>
                    </v-col>
                </v-row>
            </div>
            <div v-else style="width:100%;">
                <div style="width:100px;height:100px;margin:200px auto;">
                    <img style="width:100px;height:100px;" src="../../assets/img/zwsj.jpg" alt="">
                </div>
            </div>
        </div>
        <div v-else>
            <div class="example" style="height:300px;">
                <a-spin size="large" />
            </div>
        </div>
    </div>
</template>

<script>
import {
    listAraper,
    listArap
} from '../../models/arap';

import _ from "lodash";
import moment from "moment";

import YxcardArap from "../../components/YxcardArap.vue";
import AraperModal from '../edit/AraperModal.vue';

export default {
    data() {
        return {
            isLoading: true,
            araperTags: [
                {
                    id: 1,
                    name: "公司",
                    isActive: true
                },
                {
                    id: 2,
                    name: "个人",
                    isActive: true
                }
            ],
            selectType: "all",
            araperDatas: [],
            filterDatas: [],
            modalvisible: false,
            isModify: false,
        };
    },
    computed: {
        statValue() {
            let len = this.filterDatas.length;
            let lenCompany = 0;
            let lenPerson = 0;
            for (let i = 0; i < len; i++) {
                const accObj = this.filterDatas[i];
                if (this.selectType === "公司" && 1 === accObj.rtype.id)
                    lenCompany++;
                else if (this.selectType === "个人" && 2 === accObj.rtype.id)
                    lenPerson++;
                else if (this.selectType === "all") {
                    if (accObj.rtype.id === 1) lenCompany++;
                    else lenPerson++;
                }
            }
            len = lenCompany + lenPerson;
            return (
                "共选择 " + len + " 个应收应付款人，其中公司 " + lenCompany + " 个，个人 " + lenPerson + " 个"
            );
        },
    },
    mounted() {
        let _self = this;
        listAraper().then(res => {
            let _araper = res.data.data;
            if (res.status === 200 && res.data.code === 200) {
                listArap({
                    start: '1970-01-01',
                    end: moment().format('YYYY-MM-DD')
                }).then(resArap => {
                    if (resArap.data.code == 200) {
                        resArap.data.data.map(item => {
                            let _item = _araper.find(val => val.id == item.araper.id);
                            if (_item) {
                                if (item.iscompleted) {
                                    if (item.araptype) {
                                        _item.income2 = item.amount;
                                    } else {
                                        _item.outcome2 = item.amount;
                                    }
                                } else {
                                    if (item.araptype) {
                                        _item.income = item.amount;
                                    } else {
                                        _item.outcome = item.amount;
                                    }
                                }
                            }
                        });
                        _self.araperDatas = _araper;
                        _self.filterDatas = _self.araperDatas;
                        _self.isLoading = false;
                    }
                })
            }
        });
    },
    methods: {
        cardName(obj){
            return obj.name.length < 11 ? obj.name: obj.name.substring(0, 11) + '...';
        },
        onCheckType(value) {
            // let _v = value.clickTagId == 0 ? "公司" : "个人";
            // TDAPP.onEvent("" + _v + "tab");
            // let _self = this;
            // value = value.clickTagId;
            // _self.araperTags[value].isActive = !_self.araperTags[value].isActive;
            // value = value == 0 ? "公司" : "个人";
            // if (!_self.araperTags[0].isActive && !_self.araperTags[1].isActive) {
            //     _self.araperTags[value].isActive = !_self.araperTags[value].isActive;
            //     return;
            // }
            // if (_self.araperTags[0].isActive) {
            //     if (_self.araperTags[1].isActive) {
            //         _self.filterDatas = _self.araperDatas;
            //         _self.selectType = 'all';
            //     } else {
            //         _self.filterDatas = _self.araperDatas.filter(item => item.rtype.id == 1);
            //         _self.selectType = '公司';
            //     }
            // } else {
            //     _self.filterDatas = _self.araperDatas.filter(item => item.rtype.id == 2);
            //     _self.selectType = '个人';
            // }
            let _tag  =  value.tags[value.clickTagId] 
            _tag.isActive = ! _tag.isActive;
            if (value.tags[0].isActive == value.tags[1].isActive) {
                this.selectType = 'all';
                this.filterDatas = this.araperDatas;
            } else if (value.tags[0].isActive) {
                this.selectType = '公司';
                this.filterDatas = this.araperDatas.filter(item => item.rtype.id == 1);
            } else {
                this.selectType = '个人';
                this.filterDatas = this.araperDatas.filter(item => item.rtype.id == 2);
            }
        },
        showAraperModal() {
            TDAPP.onEvent("", "顶部");
            this.modalvisible = true;
        },
        showAraperModifyModal(_araper) {
            let _tmp = this.araperDatas.find(val => val.id == _araper.id);
            this.isModify = true;
            this.showAraperModal();
            this.$bus.$emit('updatearaper', _tmp);
        },
        refreshAraper(new_araper) {
            let _item = this.araperDatas.find(val => val.id == new_araper.id);
            if (_item) {
                if (new_araper.isDelete) {
                    // this.araperDatas = this.araperDatas.filter(val => val.id != _item.id);
                    for (let i = 0, l = this.araperDatas.length; i < l; i++) {
                        if (new_araper.id == this.araperDatas[i].id) {
                            this.araperDatas.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    Object.keys(new_araper).forEach(key => {
                        _item[key] = new_araper[key];
                    })
                }
            } else {
                this.araperDatas.push(new_araper);
            }
            this.isModify = false;
            this.modalvisible = false;
        },
        araperCancel() {
            this.isModify = false;
            this.modalvisible = false;
        }
    },
    components: {
        YxcardArap,
        AraperModal
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
