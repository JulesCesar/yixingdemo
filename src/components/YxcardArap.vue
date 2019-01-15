<template>
  <div class="yxcard-wrapper" @click="clickFunc">
    <v-card style="width: 360px; border: 1px solid #fff; border-radius: 8px;box-shadow: 0 12px 20px -10px rgba(255, 255, 255, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 255, 255, 0.2);" :body-style="{padding: '8px'}">
      <div class="yxcard-title2" style="margin-bottom:4px;color: #272b2f;">
            <div>
              <a-row>
                <a-col :span="20">
                  <span>
                    <!-- <a-icon style="font-size:22px;" type="credit-card" v-if="type=='公司'"/> -->
                    <a-icon style="font-size:22px;" type="save" v-if="type=='公司'"/>
                    <a-icon style="font-size:22px;" type="user" v-else/>
                    <span style="font-size:18px;" :title="showname">&nbsp;&nbsp;{{showname|stringFilter}}</span>
                  </span>
                  <span style="color: rgba(0,0,0,0.65);"><span style="font-size: 12px;">{{rightTitle}}</span> {{total|thousandFilter}}</span>
                
                </a-col>
                <a-col :span="1" :offset="2">
                  <span class="cardedit">
                    <a-icon type="edit" />
                  </span> 
                </a-col>
              </a-row>
            </div>
          </div>
      <!-- <p class="yxcard-title">
        <span style="color: #3296fa;overflow:hidden;">
          <img src="../assets/img/COMPANY.svg" style="width: 20px;float:left;margin-right:4px;" v-if="type=='公司'">
          <img src="../assets/img/man.svg" style="width: 20px;float:left;margin-right:4px;" v-else> 
          <span style=" display: inline-block;float:left;">{{showname}}</span>
        </span>
        <span style="color: rgba(0,0,0,0.65);"><span style="font-size: 12px;">{{rightTitle}}</span> {{total|thousandFilter}}</span>
      </p> -->
      <div style="color:#3C4858;">
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
      </div>
      <div style="height:1px;width:100%;background-color: rgba(220, 217, 217, 0.45);margin-top:10px;"></div>
      <div style="color:#999;">
        <div  style="margin-top:10px;">
          <a-row>
            <a-col :span="7">
              <span  style="font-size: 12px;"><a-icon type="solution" />&nbsp;&nbsp;&nbsp;真实名称:</span>
            </a-col>
            <a-col :span="17">
              <span style="font-size: 12px;">{{name|stringFilter}}</span>
            </a-col>
          </a-row>
        </div>
        <div>
          <a-row>
            <a-col :span="7">
              <span  style="font-size: 12px;"><a-icon type="phone" />&nbsp;&nbsp;&nbsp;联系电话:</span>
            </a-col>
            <a-col :span="17">
              <span style="font-size: 12px;">{{phone}}</span>
            </a-col>
          </a-row>
        </div>
      </div>
      
    </v-card>
  </div>
</template>

<script>
export default {
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
      if(num.toString().length >= 8){
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
