<template>
  <div id="baoccountlist">
    <section id="section04">
          <a><span></span></a>
    </section>
    <div class="fffbaoaccount">
      <a-row style="padding-bottom:4px;">
        <a-col :span="12" style="font-size:14px;text-align: left;color:#797b7d;">账户名称</a-col>
        <a-col :span="12" style="font-size:14px;text-align: right;color:#797b7d;">余额</a-col>
      </a-row>
      <div class="baoaccount">
        <a-list itemLayout="horizontal" :dataSource="accountDatas" >
          <a-list-item slot="renderItem" slot-scope="item, index">
            
            <a-list-item-meta :description="item.atype.name">
              <span slot="title">{{item.name}}</span> 
            </a-list-item-meta>
            <div>{{item.balance|currency2}}</div>
          </a-list-item>
        </a-list>
      </div>
      
    </div>
  </div>
</template>
<script> 
 
 
export default {
   props: { 
    accountDatas:{
      type: Array, 
      default: () => [],
    }, 
  }, 
  mounted() { 
    // let _self = this;
    // this.renderChart()
        // _self.numberGrow(_self.$refs.numberGrow)
  },
}
</script>

<style>
.fffbaoaccount{
  padding: 0 24px 40px 24px;
  
}
.baoaccount{
  height: 262px;
  overflow-y: scroll;
}
#baoccountlist .baoaccount .ant-list-item{
  padding-top:6px !important;
  padding-bottom: 6px !important;
}
#baoccountlist .baoaccount .ant-list-item .ant-list-item-meta-title{
  font-size: 16px;
}
#baoccountlist .baoaccount .ant-list-item .ant-list-item-meta-description{
  font-size: 12px;
}


#section04 a {
    padding-top: 60px;
}
#section04 a span {
    position: absolute;
    bottom: 20px;
    left: 50%;
    width: 24px;
    height: 24px;
    margin-left: -12px;
    border-left: 1px solid #bfbfbf;
    border-bottom: 1px solid #bfbfbf;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: sdb04 2s infinite;
    animation: sdb04 2s infinite;
    box-sizing: border-box;
}
@-webkit-keyframes sdb04 {
    0% {
        -webkit-transform: rotate(-45deg) translate(0, 0);
    }
    20% {
        -webkit-transform: rotate(-45deg) translate(-10px, 10px);
    }
    40% {
        -webkit-transform: rotate(-45deg) translate(0, 0);
    }
}
@keyframes sdb04 {
    0% {
        transform: rotate(-45deg) translate(0, 0);
    }
    20% {
        transform: rotate(-45deg) translate(-10px, 10px);
    }
    40% {
        transform: rotate(-45deg) translate(0, 0);
    }
}
</style>
