<template> 
  <div id="demomodel" class="newguide"> 
    <div><a-button @click="det2" type="primary"><a-icon type="arrow-right"  />下一步</a-button> <a-button @click="quirechat">跳过</a-button> </div>
    <a-row>
      <a-col :span="10"></a-col>
      <a-col :span="14" style="text-align: left; color:#fff;">
        <div class="Introduction">
          仪表盘可以查看您的公司流入流出和盈余，公司数据真正可视化展示。 
        </div>
        
      </a-col>
    </a-row>
    <!-- <img src="../../../static/img/1dashboard.png" alt=""> -->
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
    
     det2(){
      this.$router.push({ path: 'Det' })
    },
    quirechat(){
      localStorage.setItem('tour', true);
      this.$router.replace({name: 'Dashboard'});
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
  #demomodel {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /* padding-top: 20px; */
    z-index: 999;
    background-image: #fff;
    font-size: 24px;
    text-align: center;


    background-image:url(../../../static/img/1dashboard.png); 
    background-repeat:no-repeat; 
    background-size:100% 100%;
    -moz-background-size:100% 100%;

}
.text-jumbo{
    font-size: 60px;
    font-weight: 700;
    color: #484848;
}
.newguide img{
  width: 100%;
  height: 100%;
}
.Introduction{
  width: 200px;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 8px;
      font-size: 14px;
}
</style>