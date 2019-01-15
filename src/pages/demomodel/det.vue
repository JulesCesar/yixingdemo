<template> 
  <div id="det"> 
    <a-button @click="newdasbao"><a-icon type="arrow-left" />上一步</a-button>
    <a-button @click="upload" type="primary"><a-icon type="arrow-right" />下一步</a-button>
     <a-button @click="quirechat">跳过</a-button> 

     <div class="Introduction detintro">
       <a-row>
          <a-col :span="6"></a-col>
          <a-col :span="18" style="text-align: left; color:#fff;">
            <div class="texrtdetintro">
              出纳可以直接点击表格中间位置进行记账，像平日Excel一样轻松记账。
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
      
    };
  },
  mounted() {
    
  },
  methods: {
    tourStop() {
     localStorage.setItem('tour', true);
    },
    newdasbao(){
      this.$router.push({ path: 'Demomodel' })
    },
    quirechat(){
      localStorage.setItem('tour', true);
      this.$router.replace({name: 'Dashboard'});
    },
    upload(){
      this.$router.replace({name:'upload'});
    }

    
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


    background-image:url(../../../static/img/rijizhang.png); 
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
.detintro{
  position: absolute;
  left:160px;
  bottom:160px;
  
}
.texrtdetintro{
  width: 200px;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 8px;
      font-size: 14px;
}
</style>