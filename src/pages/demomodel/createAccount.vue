<template> 
  <div id="det"> 
    <a-button @click="newdasbao"><a-icon type="arrow-left" />上一步</a-button>
     <a-button @click="quirechat" type="primary">结束</a-button> 
     <div class="">
      <a-row>
        <a-col :span="8"></a-col>
        <a-col :span="16" style="text-align: left;">
          <div class="textaccount">
            点击按键后可以创建新的账户。弹出界面带有红色星号“*”的为必填项。 所有卡片视图都可以被点击，进行再次编辑。
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="">
      <a-row>
        <a-col :span="16"></a-col>
        <a-col :span="8" style="text-align: left;">
          <div class="textaccount" style="    margin-top: 66px;">
            如对首席财务有何问题请联系客服。或查看帮助手册。
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>

import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    
    return {
      tourCallback: {
          onStop: this.tourStop
      },
    };
  },
  mounted() {
    
  },
  methods: {
    
    newdasbao(){
      this.$router.push({ path: 'upload' })
    },
    quirechat(){
      localStorage.setItem('tour', true);
      this.$router.replace({name: 'Dashboard'});
    },
    

    
  },
  computed: {
    
  },
};
</script>
<style scoped>
  .modeldemo1{
    width: 40px;
  }
  #det {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background-image: #fff;
    font-size: 24px;
    text-align: center;


    background-image:url(../../../static/img/Accountguanli.png); 
    background-repeat:no-repeat; 
    background-size:100% 100%;
    -moz-background-size:100% 100%;
}
.text-jumbo{
    font-size: 60px;
    font-weight: 700;
    color: #484848;
}
.det img{
  width: 100%;
  height: 100%;
}
.textaccount{
  margin-top: 10px;
  width: 300px;
  border: 1px solid #fff;
  color:#fff;
  border-radius: 8px;
  padding: 8px;
      font-size: 14px;
}
</style>