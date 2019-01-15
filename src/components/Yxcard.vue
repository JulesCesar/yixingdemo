<template>
  <div id="yxcard-wrapper" class="yxcard-wrapper" @click="clickFunc">
    <div>
      <v-card style="width: 310px; border: 1px solid #ecebeb; border-radius: 12px;">
        <div class="yxcard-headers">
          <div class="yxcard-title2" style="margin-bottom:4px;">
            <div>
              <a-row>
                <a-col :span="20">
                  <span v-if="outcome!=undefined">
                    <a-icon style="font-size:22px;" type="save" v-if="type=='公司'"/>
                    <a-icon style="font-size:22px;" type="user" v-else/>
                    <span style="font-size:18px;" :title="showname">{{showname|stringFilter}}</span>
                    <!-- <span style="font-size:18px;" >{{name|stringFilter}}</span> -->
                  </span>
                </a-col>
                <a-col :span="1" :offset="2">
                  <span class="cardedit">
                    <a-icon type="edit" />
                  </span> 
                </a-col>
              </a-row>
            </div>
          </div>
          <div style="margin-bottom:10px;">
            <div class="cardtotal">
              <span>
                <span style="font-size: 12px;">{{rightTitle}}</span> 
                <span style="font-size: 16px;"> {{total|thousandFilter}}</span>
              </span>
            </div>
            <div>
              <a-row>
                <a-col :span="12">
                  <div class="cardicome">
                    <span>流入</span>
                    <span style="font-size: 16px;">{{income|thousandFilter}}</span>
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="cardoutcome">
                    <span>流出</span>
                    <span style="font-size: 16px;">{{outcome|thousandFilter}}</span>
                  </div>
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
        <!-- <hr> -->

          <div class="card-foteros">
            <div  style="margin-top:10px;">
              <a-row>
                <a-col :span="8">
                  <span  style="font-size: 14px;"><a-icon type="solution" />&nbsp;&nbsp;&nbsp;真实名称:</span>
                </a-col>
                <a-col :span="16">
                  <span style="font-size: 14px;">{{name|stringFilter}}</span>
                </a-col>
              </a-row>
            </div>
            <div>
              <a-row>
                <a-col :span="8">
                  <span  style="font-size: 14px;"><a-icon type="phone" />&nbsp;&nbsp;&nbsp;联系电话:</span>
                </a-col>
                <a-col :span="16">
                  <span style="font-size: 14px;">{{phone}}</span>
                </a-col>
              </a-row>
            </div>
          </div>
          <!-- div -->
          <div class="card-foteros">
            <footer class="tagsstyle" style="overflow-x:auto;overflow-y: auto;">
              <a-row>
                <a-col :span="8">
                  <span  style="font-size: 14px;"><a-icon type="tag-o" />&nbsp;&nbsp;&nbsp;备注:</span>
                </a-col>
                <a-col :span="16">
                  <span style="font-size: 14px;">{{remark}}</span>
                </a-col>
              </a-row>
              <!-- <span  v-if="atags.length == []">暂未添加标签</span>
              <a-tag v-else style="margin-bottom:4px;" color="blue" v-for="t in atags" :key="t.name">{{t.name}}</a-tag> -->
            </footer>
          </div>
      </v-card>
    </div>
    
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
    click: Function,
    type: String,
    remark: String,
    atags:Array
  },
  methods: {
    clickFunc() {
      if (this.click) this.click(this.id);
    }
  },
  filters: {
    stringFilter(str) {
      return str.length > 10 ? str.substring(0, 9) + '...' : str;
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
.yxcard-wrapper {
  display: inline-block;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 8px;
  cursor: pointer;
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
  width: 17.83333%;
}
#yxcard-wrapper .cardicome{
  text-align: center;
}
#yxcard-wrapper .cardoutcome{
  text-align: center;
}
#yxcard-wrapper .cardtotal{
  text-align: center;
  margin-bottom: 6px;
}
#yxcard-wrapper .yxcard-headers{
  background-color:#4693e0;
  color:#fff; 
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 10px 2px 10px 14px;
}
#yxcard-wrapper .ant-card-body{
  padding: 0 !important;
}
#yxcard-wrapper .card-foteros{
  padding:0 2px 6px 14px;
}

</style>
