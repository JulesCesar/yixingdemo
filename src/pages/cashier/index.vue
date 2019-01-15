<template>
  <div style="position:relative;">
    <!-- 表格页 -->
    <div class="backgroundtHeadertab" v-show="editId"  @click="() => openNotificationWithIcon('error')"></div>
    <a-tabs  @change="onTabClick"  style="position:relative;">
      
    <!-- <div class="backgroundtHeadertab"></div> -->
    <!-- <a-tab-pane tab-key="key1" tab="日记帐" data-step="1" data-intro="日记账您可以记录每天的账款流入流出"> -->
      
      <a-tab-pane key="日记帐" tab="日记帐">
        <recording  
         v-if='accountDatas.length'
          :accountDatas.sync='accountDatas' 
          :receiverDatas.sync='receiverDatas' 
          :fTypeDates.sync='fTypeDates' 
          :aTypeDatas='aTypeDatas'
          />
      </a-tab-pane>
      <!-- <a-tab-pane tab-key="key2" tab="查流水账" data-step="2" data-intro="这里您可以及时查看当天记录或以前记录的流入流出"> -->
      <a-tab-pane key="查流水账" tab="查流水账">
        <record-search   
          v-if='accountDatas.length'
          :accountDatas.sync='accountDatas' 
          :receiverDatas.sync='receiverDatas' 
          :fTypeDates.sync='fTypeDates'
          :aTypeDatas='aTypeDatas'
          />
      </a-tab-pane>
      <!-- <a-tab-pane  tab-key="key3" tab="收付款人管理" data-step="3" data-intro="收付款人您可以查看你的收付款人"> -->
      <a-tab-pane  key="收付款人管理" tab="收付款人管理">
        <receiver :is-arap="false" />
      </a-tab-pane> 

      <a-tab-pane  key="收支分类" tab="收支分类">
        <tabs-classif :f-type-dates.sync="fTypeDates"/>
      </a-tab-pane>
      <a-tab-pane key='操作记录' tab='操作记录'>
        <logs/>
      </a-tab-pane>
      <!-- <v-tab-pane  tab-key="key5" tab="demo">
        <tabs-demo/>
      </v-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script> 
import { mapGetters, mapActions } from 'vuex'
import recording from './Recording.vue'
import receiver from './Receiver.vue'
import tabsClassif from './TabsClassif.vue'
import tabsDemo from './TabsDemo.vue'
import logs from './Logs.vue'
import recordSearch from '../search/RecordSearch.vue'


import { setEvent } from "../../models/pages"


import {
 listAccount,
 listReceiver,
 listFtype,
 listAtype
} from "../../models/moneyFlow"; 

export default {
  data() {
    return {
      accountDatas:[],
      receiverDatas:[], 
      fTypeDates:[], 
      aTypeDatas:[],
    }
  },
  computed: {
     ...mapGetters(['editId'])
  },
  components: {
    logs,
    recording,
    recordSearch,
    receiver,
    tabsClassif,
    tabsDemo
  },
  mounted(){
    this.getRecordData();
    setTimeout(() => {
        // introJs().start();
        let _guide = localStorage.getItem('guide');
        if (!_guide)  {
            introJs().start().onexit((() => {
                localStorage.setItem('guide', true);
            }))
        }
    }, 1000)
  },
  methods: { 
      ...mapActions(['setEditId']),
      getRecordData(){
        let _self = this 
        let _receivers = listReceiver({}) // 填充收付款人 
        let _fTypes = listFtype({}) //填充类别  
        let _accounts = listAccount({})   // 填充帐户 
        let _aTypes = listAtype({}) // 或者帐户类型
        let _promise =[_receivers,_fTypes,_accounts,_aTypes]; 

        Promise.all(_promise).then(results=>{
          if(results[0].data.code == 200){ 
              _self.receiverDatas =  results[0].data.data.filter(val=>val.name);
          }
          if(results[1].data.code == 200){ 
              _self.fTypeDates =  results[1].data.data.filter(val=>val.name);
          }
          if(results[2].data.code == 200){ 
              _self.accountDatas =  results[2].data.data.filter(val=>val.name); 
          } 
          if(results[3].data.code == 200){ 
              _self.aTypeDatas =  results[3].data.data.filter(val=>val.name); 
          } 
          return results;
        }).then(alldata=>{ 
          //  _self.$refs['key1'].getListDatas()
        }).catch((err)=>{
            console.log(err);
        }); 
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
      onTabClick(tabKey) {
            debugger
            let _self = this 
            setEvent({
              "keyname": "cashier_page",
              "keyvalue": tabKey
            })
            // 编辑流水后更新收付款人信息
            let _event = ''
            switch (tabKey){
              case  '收付款人管理':
                _event = 'initCashierReceiver'
              break

               case  '查流水账':
                _event = 'initCashierResearch'
              break

               case  '日记帐':
                _event = 'initCashierRecording'
              break

               case  '操作记录':
                _event = 'initCashierLogs'
              break 
            }
            if(_event){
              _self.$bus.$emit(_event);
            }
             

            // if (tabKey == '收付款人管理') {
            //     _self.$bus.$emit('initCashierReceiver');
            // } else if (tabKey == '查流水账') {
            //     _self.$bus.$emit('initCashierResearch');
            // } else if (tabKey == '日记帐') {
            //     _self.$bus.$emit('initCashierRecording');
            // } else if (tabKey == '操作记录') {
            //     _self.$bus.$emit('initCashierLogs');
            // }
      }
  }
}
</script>

<style>
 .backgroundtHeadertab{
  /* background-color: #0077c5; */
  position: absolute;
  top: -10px;
  width: 100%;
  height: 100px;
  z-index: 9;
}
</style>
