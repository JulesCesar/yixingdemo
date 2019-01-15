<template>
  <div id="yxcard2" class="yxcard-wrapper2" @click="clickFunc" :style="{cursor: isMoneyCheck}">
    <div>
      
    </div>


    <!-- ======================================= -->
    <v-card style="width: 280px; border: 1px solid #ecebeb; border-radius: 14px;" :body-style="{padding: '8px'}">
      <div class="yxcard-title2">
        
        <div>
          <a-row>
            <a-col :span="20">
              <span v-if="outcome!=undefined">
                <a-icon style="font-size:22px;" type="bank" v-show="type=='银行账户'"/>
                <a-icon style="font-size:22px;" type="pay-circle" v-show="type=='现金账户'"/>
                <a-icon style="font-size:22px;" v-show="type=='第三方支付平台'" type="alipay" />
                <a-icon style="font-size:22px;" v-show="type=='信用卡'" type="credit-card" />
                <span style="font-size:18px;" :title="name">{{name|stringFilter}}</span>
              </span>
              <span v-else>
                <a-icon style="font-size:22px;" type="bank" v-show="type=='银行账户'"/>
                <a-icon style="font-size:22px;" type="pay-circle" v-show="type=='现金账户'"/>
                <a-icon style="font-size:22px;" v-show="type=='第三方支付平台'" type="alipay" />
                <a-icon style="font-size:22px;" v-show="type=='信用卡'" type="credit-card" />
                <span style="font-size:18px;" :title="name">{{name|stringFilter}}</span>
              </span>
            </a-col>
            <a-col :span="2" :offset="2">
              <span class="cardedit">
                <a-icon type="edit" />
              </span> 
            </a-col>
          </a-row>
        </div>
        
        <div class="yue">
          <p style="font-weight: 100;">余额:</p>
          <p>{{balance|thousandFilter}}</p>
         
        </div>
      </div>
      <div class="cardname">
        <p>{{type}}</p>
      </div>

      

      <v-row class="yxcard-row2" style="height: 18px; line-height: 18px;" v-if="income!=undefined">
        <v-col span="7">
          <span>期间流入</span>
        </v-col>
        <v-col span="16" style="margin-left: -32px;">
          <span style="font-size: 16px;">{{income|thousandFilter}}</span>
        </v-col>
      </v-row>

      <v-row class="yxcard-row2" style="height: 18px; line-height: 18px;" v-if="outcome!=undefined">
        <v-col span="7">
          <span>期间流出</span>
        </v-col>
        <v-col span="16" style="margin-left: -32px;">
          <span style="font-size: 16px;">{{outcome|thousandFilter}}</span>
        </v-col>
      </v-row>


      <v-row v-if="checkMoney" style="position: relative;" >
        
        <v-col span="24" style="display: flex; justify-content: flex-end; position: absolute; top: -20px;">
          <template v-if="duizhang">
            <div @click="clickChecked">
              <v-sverch v-model="isChecked">
                <span slot="checkedChildren">已对账</span>
                <span slot="unCheckedChildren">未对账</span>
              </v-sverch>
            </div>
          </template> 
          <template v-else >
             从账户初始化日期开始，对账功能可以使用
          </template>
          
        </v-col>

      </v-row>




      <v-row v-if="dateStart">
        <v-col span="24">
          <div class="cardfooter">
            <p style="text-align: start;" v-if="dateStart!=''&&dateEnd!=''&&count!=0"> <strong>{{dateStart}}</strong>  至 <strong>{{dateEnd}}</strong> 共计流水<strong>{{count}}</strong>条</p>
            <p style="text-align: start;color: #2ca01c;" v-else>无流水记录</p>
          </div>
          
        </v-col>
      </v-row>

    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    id: [String,Number],
    name: [String,Number],
    type: [String,Number],
    balance: [String,Number],
    income: [String,Number],
    outcome: [String,Number],
    checkMoney: Boolean,
    checked: {
      type:Boolean
    },
    dateStart: [String,Number],
    dateEnd: [String,Number],
    count: [String,Number],
    click: Function,
    check: Function,
    duizhang:{
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      isChecked: false,
    }
  },
  mounted() {
      this.isChecked = this.checked;
  },
  computed: {
    isMoneyCheck() {
      return this.income != undefined ? 'default' : 'pointer';
    }
  },
  methods: {
    clickFunc() {
      if (this.click) this.click(this.id);
    },
    clickChecked() {
      if (this.check) {
        // this.check(this.checked,this.id);
      }
        this.$emit('checkmoney', this.isChecked, this.id);
    }
  },
  filters: {
    stringFilter(str) {
      return str.length >= 10 ? str.substring(0, 9) + '...' : str;
    },
    thousandFilter(num) {
      let addPlus = '';
      if (typeof num !== 'number' || isNaN(num)) {
          return num;
      }
      let numLabel = '', newNum = '';
      if (num < 0) {
          numLabel = '-';
          num = -num;
      } else {
          numLabel = addPlus == '+' ? '+' : '';
      }
      let numFixed = num.toFixed(2);
      let num_int, num_dec;
      [num_int, num_dec] = numFixed.split('.');
      let count = 0;
      for (let i = num_int.length - 1; i >= 0; i--) {
          count++;
          if (count % 3 == 0 && i != 0) {
              newNum = ',' + num_int[i] + newNum;
          } else {
              newNum = num_int[i] + newNum;
          }
      }
      newNum = numLabel + newNum + '.' + num_dec;
      return newNum;
    }
  }
}
</script>

<style>
.yxcard-wrapper2 {
  display: inline-block;
  margin-right: 16px;
  margin-top: 16px;
  border-radius: 8px;
}
.yxcard-title2 {
  font-size: 16px;
  text-align: start;
  /* color: #333; */
  /* display: flex;
  justify-content: space-between; */
}
.yxcard-row2 {
  margin-top: 8px;
  font-size: 12px;
}
.ant-card-body {
  padding: 18px;
}
#yxcard2 .ant-card-body{
  padding: 0 !important;
}
#yxcard2 .yxcard-title2{
  background-color: #4693e0;
  color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 10px 2px 10px 14px;
}
#yxcard2 .yue{
      padding: 4px 0 0 26px;
}
#yxcard2 .cardname{
  padding: 6px 2px 6px 14px;
      color: #404040;
}
#yxcard2 .cardfooter{
  padding: 0 2px 6px 14px;
      color: #404040;
}
#yxcard2 .cardedit:hover{
  color: #333;
}
</style>
