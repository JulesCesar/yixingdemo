<template>
  <div  style=" padding: 5px;">
    <div class="topdashbar">
      <div class="dashbao-card">
        <h4 style="padding-left:24px;">
          <div class="number-grow-warp">
            流入:¥<span ref="numberGrow" :data-time="time" class="number-grow" :data-value="inflowValue">{{inflowValue|currency2}}</span>
          </div>
        </h4>
        <div id="mountNodeInflowlist"></div>
      </div>
    </div>
    
  </div>
</template>
<script> 
import currency from 'currency.js'
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
 
export default {
   props: { 
    inflowDatas:{
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
      chart:{},
      time:2, 
      sdata:[
       {name: '事例一啊科斯',count: 40},  
      ]
    }
  },
  computed: {
    inflowValue(){
      let _val = 0
      this.inflowDatas.map(val=>{
        _val += val.count
      })
      return _val
    }
  },
  watch:{
    inflowDatas(newVal,oldVal){
       this.renderChart(this.inflowDatas) 
    }
  }, 
  mounted() { 
      // console.log(this.inflowDatas);
     this.renderChart(this.inflowDatas) 
  },
  methods: {
    numberGrow (ele) {
      let _this = this
      let step = (_this.inflowValue * 10) / (_this.time * 1000)
      let current = 0
      let start = 0
      let t = setInterval(function () {
        start += step
        if (start > _this.inflowValue) {
        clearInterval(t)
          start = _this.inflowValue
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
      let _DataSet = DataSet,
          DataView = _DataSet.DataView;
      let dv = new DataView();
      dv.source(cdatas).transform({
        type: 'percent',
        field: 'count',
        dimension: 'name',
        as: 'percent'
      });
      this.chart= new G2.Chart({
        container: 'mountNodeInflowlist',
        forceFit: true,
        // width:260,
        height:160,
        padding: [ 0, 100, -20, -50 ],
        animate: true
      });
      this.chart.source(dv, {
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + '%';
            return currency(val,{ symbol: "",precision: 1 })+ '%';
          }
        }
      });
      this.chart.legend({
        position: 'right',
        offsetY: -50,
        offsetX: -44
      });
      this.chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      this.chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      let interval = this.chart.intervalStack().position('percent').color('name', ['#003a8c', '#0050b3', '#096dd9', '#1890ff', '#40a9ff','#69c0ff']).style({
        lineWidth: 1,
        stroke: '#fff'
      });
      this.chart.render();
    }
    
  }
}
</script>

<style>


</style>
