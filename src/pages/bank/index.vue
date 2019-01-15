<template>
  <div>
        <a-tabs   @change="onTabClick"  style="position:relative;">
          <!-- 表格页 -->
          <a-tab-pane key="流水上传" tab="流水上传">
            <import-datas v-if="accountDatas.length" :accountDatas.sync='accountDatas' />
          </a-tab-pane>
          <a-tab-pane key="上传_查看流水" tab="查看流水">
             <record-search 
             :accountDatas.sync='accountDatas' 
             :receiverDatas.sync='receiverDatas' 
             :fTypeDates.sync='fTypeDatas'
             :aTypeDatas='aTypeDatas' ref="key2"/>
          </a-tab-pane>
          
        </a-tabs>
   
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import importDatas from './ImportData.vue'
import recordSearch from '../search/RecordSearch.vue'
 
import {
    listAccount,
    listReceiver,
    listFtype,
    listAtype
} from "../../models/moneyFlow";


import { setEvent } from "../../models/pages"

export default {
    components: {
        importDatas,
        recordSearch
    },
    data() {
        return {
            accountDatas:[],
            receiverDatas:[],
            fTypeDatas:[],
            aTypeDatas:[],
        }
    },
    created() {
        this.getRecordData();
    },
    methods: { 
        onTabClick(tabKey) {
            let _self = this 
             setEvent({
              "keyname": "bank_page",
              "keyvalue": tabKey
            })
            // if(tabKey=='key2'){ 
            //     // _self.$refs[tabKey].filterMoneyflow('init')
            // }   
        },
        getRecordData(){
            let _self = this  
            let _receivers = listReceiver({}) // 填充收付款人
            let _accounts = listAccount({})   // 填充帐户 
            let _fTypes = listFtype({}) //填充类别  
            let _aTypes = listAtype({}) //填充类别  
            let _promise =[_receivers,_fTypes,_accounts, _aTypes]; 

            Promise.all(_promise).then(results=>{
                if(results[0].data.code == 200){ 
                    _self.receiverDatas =  results[0].data.data.filter(val=>val.name);
                }
                if(results[2].data.code == 200){ 
                    _self.accountDatas =  results[2].data.data.filter(val=>val.name); 
                }
                if(results[1].data.code == 200){ 
                    _self.fTypeDatas =  results[1].data.data.filter(val=>val.name);
                }
                if (results[3].data.code == 200) {
                    _self.aTypeDatas = results[3].data.data.filter(val => val.name);
                }
                return results;
            }).then(alldata=>{
            }).catch(function(err){
                // console.log(err);
            }); 
        }
    }
}
</script>

<style>
 
</style>
