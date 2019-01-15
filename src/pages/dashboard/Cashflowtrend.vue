<template>
  <div  style=" padding: 5px;" id="cashflowtrend">
    <div class="topdashbar">
      <!-- <div class="clearfloat" style="height:200px; width:300px;border:1px solid #ccc;display: inline-flex;">
        <div class="apileft" style="background:blue;width:30%;">1</div>
        <div class="apileft" style="background:pink;width:70%;">2</div>
      </div> -->
      <div class="dashbao-card">
        <a-row type="flex" justify="start">
          <a-col :span="8">
            <div class="Cash-inflow">
              <div class="clearfloat" style="display: inline-flex;width: 100%;">
                    <div class="apileft cashleft-inflow">
                      <div class="cashleft-img">
                        <i>
                          <img src="../../../static/img/inflowfff.svg" alt="">
                        </i>
                      </div>
                    </div>
                    <div class="apileft cashright-inflow">
                      <p>流入</p>
                      <h4>¥{{inflowValue|currency2 }}</h4>
                    </div>
                    
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="Cash-outflow">
              <div class="clearfloat" style="display: inline-flex;width: 100%;">
                
                    <div class="apileft cashleft-outflow">
                      <div class="cashleft-img">
                        <i>
                          <img src="../../../static/img/outflowfff.svg" alt="">
                        </i>
                      </div>
                    </div>
                    <div class="apileft cashright-inflow">
                      <p>流出</p>
                      <h4>¥{{outflowValue|currency2}}</h4>
                    </div>
                    
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="Cash-surplus">
              <div class="clearfloat" style="display: inline-flex;width: 100%;">
                
                    <div class="apileft cashleft-numberGrow">
                      <div class="cashleft-img">
                        <i>
                          <img src="../../../static/img/numberGrow.svg" alt="">
                          <!-- <a-icon type="pay-circle-o" /> -->
                        </i>
                      </div>
                    </div>
                    <div class="apileft cashright-inflow">
                      <p>盈余</p>
                      <h4>
                        <div class="number-grow-warp">
                          ¥<span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">{{(inflowValue-outflowValue)|currency2}}</span>
                          
                        </div>
                      </h4>
                    </div>
                    
              </div>
            </div>
          </a-col>
          <!-- <a-col :span="8">
            <div class="Cash-outflow">
              <p>流出</p>
              <h4>¥{{outflowValue|currency2}}</h4>
              <i class="expenseclass"><img src="../../../static/img/expense.svg" alt=""></i>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="Cash-surplus">
              <p>盈余</p>
              <h4>
                <div class="number-grow-warp">
                  ¥<span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">{{(inflowValue-outflowValue)|currency2}}</span>
                  
                </div>
              </h4>
              <i class="balanceclass"><img src="../../../static/img/balance.svg" alt=""></i>
            </div>
          </a-col> -->
        </a-row>
      </div>
    </div>
    <div id="cashmountNode"></div>
    <!-- <p style="margin-left:20px;margin-top:20px;">
      <strong>提示:</strong><span>本图表最小显示单位为’K‘</span>
    </p> -->
        
      
    
    
  </div>
</template>
<script> 
import currency from 'currency.js'
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
 
export default {
  props: { 
    moneyflowDatas:{
      type: Array, 
      default: () => [],
    }, 
  }, 
  data() {
    return { 
      chart:{},
      time:2,
      value:198712341,
 
    }
  },
  watch:{
    moneyflowDatas(newVal,oldVal){
      this.renderChart(this.sdata)
    }
  },
  mounted() { 
    //  debugger
    this.renderChart(this.sdata)
    // this.numberGrow(this.$refs.numberGrow)
  },
  computed: {
    sdata(){
     return  this.moneyflowDatas.map(val=>{
        return {
            'year':val.date,
            '流入':val.income, 
            '流出':Math.abs(val.expense),
            '盈余':val.income-Math.abs(val.expense),
          } 
      })
    },
    inflowValue(){
      let _val = 0
      this.moneyflowDatas.map(val=>{
        _val += val.income
      })
      return Math.abs(_val)
    },
    outflowValue(){
      let _val = 0
      this.moneyflowDatas.map(val=>{
        _val += val.expense
      })
      return Math.abs(_val)
    }
  },
  methods: {
    numberGrow (ele) {
      let _this = this
      let step = (_this.value * 10) / (_this.time * 1000)
      let current = 0
      let start = 0
      let t = setInterval(function () {
        start += step
        if (start > _this.value) {
        clearInterval(t)
          start = _this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
      }, 10)
    },
    renderChart(cdatas){
      // debugger
      let ds = new DataSet();
      let dv = ds.createView().source(cdatas);
      dv.transform({
        type: 'fold',
        fields: ['流入', '流出','盈余'], // 展开字段集
        key: 'city', // key字段
        value: 'temperature' // value字段
      });
      this.chart = new G2.Chart({
        container: 'cashmountNode',
        forceFit: true,
        padding: [ 10, 20, 60, 70 ],
        width:window.innerWidth,
         height: 210
      });
      this.chart.source(dv, {
        year: {
          type:'timeCat',
          range: [0, 1],
          mask: 'MM/DD',
        },
        temperature: {
            formatter: val => {
              if(val>100000){
                 return currency(val/ 10000,{ symbol: "",precision: 1 }).format(true)+'万'; 
              }else{
                 return currency(val,{ symbol: "",precision: 1 }).format(true)
              } 
            }
          }
      });
      this.chart.scale('x', {
        tickCount: 20
      });
      this.chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      });
      this.chart.line().position('year*temperature').color('city',['#096dd9','#d48806','#7cb305']);
      this.chart.point().position('year*temperature').color('city',['#096dd9','#d48806','#7cb305']).size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      });
      this.chart.render();
    }
  }
}
</script>

<style>
#cashflowtrend .ant-card{
  height: 100% !important;
}
.number-grow-warp{
 transform: translateZ(0);
}
.number-grow {
 font-family: Arial-BoldMT;
 letter-spacing: 2.67px;
}

.dashbao-card{
  margin-bottom: 20px;
}
.Cash-inflow{border-radius: 6px;
/* border-bottom: 2px solid #ccdce4; */
cursor: auto;margin-right: 10px;
box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
/* box-shadow:0 2px 4px rgba(199, 197, 197, 0.52), 0 2px 4px rgba(134, 133, 133, 0.11); */
/* background-color:#096dd9;  */
color:#000;font-family: Arial-BoldMT;
overflow: hidden;
position: relative;
}
.Cash-outflow{border-radius: 6px;margin-right: 10px;
box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
/* background-color: #d48806; */
color:#000;font-family: Arial-BoldMT;
overflow: hidden;
position: relative;
}
.Cash-surplus{border-radius: 6px;
box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12);
/* background-color: #7cb305; 8c8e92*/
color:#000;font-family: Arial-BoldMT;
overflow: hidden;
position: relative;
}
.Cash-inflow p{padding: 8px;font-size: 12px;color:#8c8e92;color:#8c8e92;
}
.Cash-inflow h4{    padding: 4px 8px 8px 8px;    font-size: 18px;color:#454646;
  word-wrap: break-word;
  z-index: 2;
}
.Cash-outflow p{padding: 8px;font-size: 12px;color:#8c8e92;
}
.Cash-outflow h4{   padding: 4px 8px 8px 8px;    font-size: 18px;color:#454646;
  word-wrap: break-word;
  z-index: 2;
}

.Cash-surplus p{padding: 8px; font-size: 12px;color:#8c8e92;
}
.Cash-surplus h4{padding: 4px 8px 8px 8px;    font-size: 18px;color:#454646;
  word-wrap: break-word;
  z-index: 2;
}
.cashflowChart{

}
.incomeclass {
  position: absolute;
  top: 0;
  right: -26px;
  opacity: 0.3;
}
.incomeclass img{
  width: 100px;
}
.expenseclass{
  position: absolute;
  top: 0;
  right: -26px;
  opacity: 0.3;
}
.expenseclass img{
  width: 100px;
}
.balanceclass{
  position: absolute;
  top: 7px;
  right: -26px;
  opacity: 0.3;
}
.balanceclass img{
  width: 100px;
}




.cashleft-inflow{
  background-color: #1890ff;
  color: #fff;
  /* height: 100%; */
  min-height: 100%;
  width: 20%;
}
.cashleft-outflow{
  background-color: #faad14;
  color: #fff;
  /* height: 100%; */
  min-height: 100%;
  width: 20%;
}
.cashleft-numberGrow{
  background-color: #a0d911;
  color: #fff;
  min-height: 100%;
  width: 20%;
}
.cashright-inflow{
  width: 80%;
}
.cashleft-img{
  position: relative;
  display: inline-flex;
  width: 100%;
}
.cashleft-img i{
  display: inline-block;
  position: absolute;
  top: 8px;
  left: 5px;
  bottom: 0;
  right: 0;
}
</style>
