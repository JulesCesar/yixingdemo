<template> 
    <div> 
        <!-- <div style="height:20px;" @click="lcahost()">1111</div> -->
        <!-- <a-button type="primary" @click="addRowClick(index)">+&nbsp;&nbsp;记一笔日记账</a-button> -->
        <!-- <div style="height:20px;"></div> -->
        
        <!-- 行编辑 -->
        <!-- <div id="recordingTable" :style="{ marginBottom: '10px',overflowY: 'scroll',height: scrollHeight - 200 + 'px',}"> -->
    <!-- {{getTableScroll}} -->
       <template>
        <!-- <a-alert
            style="margin-bottom: 10px;"
            v-if="recordingTip"
            message="先记一笔"
            description="您还没有使用日账体验首席财务记账体验，想体验更丰富出纳内容请您点击表格开始记账吧！！！！"
            type="error"
            showIcon
            iconType ='bulb'
            closeText="关闭"
            @close="closeTip"
        /> -->

        <a-alert type="info" v-if="currentUser.companyinfo.num_moneyflow_data == 0"  message="双击表格开始记账" banner closable />

        <a-alert type="info" v-if="currentUser.companyinfo.num_moneyflow_data != 0&&tableSources.length <3 && currentUser.companyinfo.num_moneyflow_data<10"  message="新的一天开始了,昨日流水可以在【查流水账】查看修改" banner closable />

    <!-- 流入:{{sumIncome|currency2 }} 流出:{{sumOutcome|currency2}} <a-icon type="warning" />-->
        <!-- {{rowObj}} -->
        </template>

    <div id="recordingTable" :style="{height: scrollHeight - 200 + 'px',}">
        <template  v-if="tableSources.length" >
             <edit-table 
              :moneyflowDatas.sync = 'moneyflowDatas'
              :accountDatas.sync='accountDatas' 
              :receiverDatas.sync='receiverDatas' 
              :fTypeDates.sync='fTypeDates' 
              :aTypeDatas= 'aTypeDatas'
              :isClickEditRow = true
              @addRowClick="addRowClick"
             />
        </template>
          
        <!-- nodata 的暂无数据 -->
        <div v-else class="nodataimg" style="width:100%;">
            <!-- <img src="../../assets/img/nodata.svg" alt=""> -->
            <a-spin size="large" />
            <p>加载中..</p>
        </div>
  
    
    </div>
    <div class="sheet-footer">
      <a-row>
          <a-col :span="24">
              <!-- <a-col :span="2" style="text-align: left;font-size: 16px;font-weight: 700;olor: #606266;">合计：</a-col> -->
              <a-col :span="12" style="border-right:1px solid #d6dfe4;padding-right:10px;">流入:&nbsp;&nbsp;{{sumIncome|currency2 }}</a-col>
              <!-- <a-col :span="12">流出:&nbsp;&nbsp;{{sumOutcome|currency2}}</a-col> -->
              <a-col :span="12">流出:&nbsp;&nbsp;{{Math.abs(sumOutcome)|currency2}}</a-col>
              
          </a-col>
      </a-row>
    </div>
    </div>
</template>

<script> 
import moment from "moment";
import { mapGetters, mapActions } from 'vuex'
let today = moment().format("YYYY-MM-DD");  
import { listCreatetimeMoneyflow } from "../../models/moneyFlow";
import editTable from '../edit/EditTable.vue'
import aTable from "../mixins/aTable.js";

export default { 
  mixins: [aTable],
  data() {
    return {
      isOrNot: false,
      scrollHeight: window.innerHeight,
      sumIncome: 0,
      sumOutcome: 0, 
      recordingTip: true,
      moneyflowDatas:[],
      newRow: {
        remark: "",
        amount: 0,
        date: today,
        ftype: {
            id: '',
            name: ''
        },
        account: {
          id: "",
          name: ""
        },
        receiver: {
          id: "",
          name: ""
        },
        istransfer: false
      }
    };
  },
  components:{
      editTable
  },
  computed: {
     ...mapGetters(['currentUser']),
    getTableScroll() {
      return { y: this.scrollHeight - 340 };
    }
  },
  created() {
      this.$bus.$on('initCashierRecording', () => {
          this.filterMoneyflow();
      })
  },
  mounted() {
    let _self = this;
    window.addEventListener("resize",()=>{
      _self.scrollHeight = window.innerHeight;
    })
    //  localStorage
    let _record_tip = localStorage.getItem("record_tip");
    this.recordingTip = _record_tip == "hidden" ? false : true;
    this.filterMoneyflow();
  },
  methods: {
    closeTip() {
      localStorage.setItem("record_tip", "hidden");
    },
    filterMoneyflow() {
      this.getListDatas().then(res => {});
    }, 
    getListDatas() {
      let _self = this;
      return listCreatetimeMoneyflow({
        start: today,
        end: today
      }).then(res => {
        if (res.status === 200 && res.data.code === 200) {
          _self.moneyflowDatas = res.data.data;
          _self.addRowClick(res.data.data.length);
          // if(res.data.data.length==0){
          //   _self.addRowClick(1);
          // }
          return Promise.resolve(res);
        }
      });
    },
    addRowClick(index) {
      let _self = this;
      if (_self.editId && _self.moneyflowDatas.length != index)
        return;
      let _new = JSON.parse(JSON.stringify(_self.newRow));
      _self.moneyflowDatas.splice(index, 0, _new);
    }
  }
};
</script>
<style>
#recordingTable .ant-select-selection{
  border:1px solid #fff !important;
}
</style>

