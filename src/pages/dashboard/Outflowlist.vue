<template>
  <div  style=" padding: 5px;">
    <div class="topdashbar">
      <div class="dashbao-card">
        <h4 style="padding-left:24px;">
          <div class="number-grow-warp">
            流出:¥<span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">{{outflowValue|currency2}}</span>
          </div>
          <div id="mountNodeOutflowlist"></div>
        </h4>
      </div>
    </div>
    
  </div>
</template>
<script> 
import currency from 'currency.js'
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
// import {
//   statMoneyflows,
//   insertMoneyFlow,
//   deleteMoneyFlow, 
//   modifyMoneyFlow,
//   searchCreteTimeMoneyflows, 
// } from "../../models/moneyFlow"; 
// import aTable from "../mixins/aTable.js";
export default {
   props: { 
    outflowDatas:{
      type: Array, 
      default: () => [],
    },
    atageDatas:{
        type: Array, 
        default: () => [],
    },
  },
  data() {
    return { 
      time:2,
      value:999999, 
    }
  },
  watch:{
    outflowDatas(newVal,oldVal){
       this.renderChart() 
    }
  }, 
  mounted() { 
    let _self = this; 
    _self.renderChart()
      //  _self.numberGrow(_self.$refs.numberGrow) 
  },
  computed: {
    outflowValue(){
      let _val = 0
      this.outflowDatas.map(val=>{
        _val += val.count
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
    renderChart(){
      let _DataSet = DataSet,
          DataView = _DataSet.DataView;
      let dv = new DataView();
      dv.source(this.outflowDatas).transform({
        type: 'percent',
        field: 'count',
        dimension: 'name',
        as: 'percent'
      });
      let chart = new G2.Chart({
        container: 'mountNodeOutflowlist',
        forceFit: true,
        // width:260,
        height:160,
        padding: [ 0, 100, -20, -50 ],
        animate: true
      });
      chart.source(dv, {
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + '%';
           return currency(val,{ symbol: "",precision: 1 })+ '%';
          }
        }
      });
      chart.legend({
        position: 'right',
        offsetY: -50,
        offsetX: -44
      });
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      let interval = chart.intervalStack().position('percent').color('name', ['#613400', '#874d00', '#ad6800', '#d48806', '#faad14','#ffc53d']).style({
        lineWidth: 1,
        stroke: '#fff'
      });
      chart.render();
    }
    
  }
}
</script>

<style>

</style>
