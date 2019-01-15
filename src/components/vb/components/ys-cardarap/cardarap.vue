<template>
  <div class="yxcard-wrapper" @click="clickFunc">
    <v-card style="width: 360px; border: 1px solid #ddd; border-radius: 8px;" :body-style="{padding: '8px'}">
      <p class="yxcard-title">
        <span style="color: #3296fa;overflow:hidden;">
          <img src="../../../../assets/img/COMPANY.svg" style="width: 20px;float:left;margin-right:4px;" v-if="type=='公司'">
          <img src="../../../../assets/img/man.svg" style="width: 20px;float:left;margin-right:4px;" v-else> 
          <span style=" display: inline-block;float:left;">{{showname}}</span>
        </span>
        <span style="color: rgba(0,0,0,0.65);"><span style="font-size: 12px;">{{rightTitle}}</span> {{total|thousandFilter}}</span>
      </p>
      <v-row class="yxcard-row">
        <v-col span="6" class="yxcard-row-right">
          <span>真实名称</span>
        </v-col>
        <v-col span="14" offset="1">
          <span style="font-size: 16px;">{{name|stringFilter}}</span>
        </v-col>
      </v-row>

      <v-row class="yxcard-row">
        <v-col span="6" class="yxcard-row-right">
          <span>联系电话</span>
        </v-col>
        <v-col span="14" offset="1">
          <span style="font-size: 16px;">{{phone}}</span>
        </v-col>
      </v-row>

      <v-row class="yxcard-row">
        <v-col span="6" class="yxcard-row-right">
          <span>未结应收</span>
        </v-col>
        <v-col span="7" offset="1">
          <span style="font-size: 16px;">{{income|thousandFilter}}</span>
        </v-col>
        <v-col span="6" class="yxcard-row-right">
          <span>未结应付</span>
        </v-col>
        <v-col span="7" offset="1">
          <span style="font-size: 16px;">{{outcome|thousandFilter}}</span>
        </v-col>
      </v-row>
      <v-row class="yxcard-row">
        <v-col span="6" class="yxcard-row-right">
          <span>已结应收</span>
        </v-col>
        <v-col span="7" offset="1">
          <span style="font-size: 16px;">{{income2|thousandFilter}}</span>
        </v-col>
        <v-col span="6" class="yxcard-row-right">
          <span>已结应付</span>
        </v-col>
        <v-col span="7" offset="1">
          <span style="font-size: 16px;">{{outcome2|thousandFilter}}</span>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
    name:'YsCardarap',
  props: {
    id: [String, Number],
    showname: [String, Number],
    rightTitle: [String, Number],
    name: [String, Number],
    total: [String, Number],
    phone: [String, Number],
    income: [String, Number],
    outcome: [String, Number],
    income2: [String, Number],
    outcome2: [String, Number],
    click: Function,
    type: String
  },
  methods: {
    clickFunc() {
      if (this.click) this.click(this);
    }
  },
  filters: {
    stringFilter(str) {
      return str.length > 8 ? str.substring(0, 9) + '...' : str;
    },
    thousandFilter(num) {
        if (!num) return;
      // let addPlus = '';
      // if (typeof num !== 'number' || isNaN(num)) {
      //     return num;
      // }
      // let numLabel = '', newNum = '';
      // if (num < 0) {
      //     numLabel = '-';
      //     num = -num;
      // } else {
      //     numLabel = addPlus == '+' ? '+' : '';
      // }
      // let num_int = parseInt(num).toFixed(0);
      // let count = 0;
      // for (let i = num_int.length - 1; i >= 0; i--) {
      //     count++;
      //     if (count % 3 == 0 && i != 0) {
      //         newNum = ',' + num_int[i] + newNum;
      //     } else {
      //         newNum = num_int[i] + newNum;
      //     }
      // }
      // newNum = numLabel + newNum;
      // return newNum;
      if(num>=8){
              let aree = (num/10000).toFixed(2)+"万"
              return aree;
        }else{
            return num;
        } 
    }
  }
}
</script>

<style>
.yxcard-wrapper {
  display: inline-block;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 8px;
  cursor: pointer;
}
.yxcard-title {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.yxcard-row {
  margin-top: 6px;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}
.yxcard-row-right {
  text-align:right;
}
.ant-col-6 {
  width: 14.8333% !important;
}
</style>
