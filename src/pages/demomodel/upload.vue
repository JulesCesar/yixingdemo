<template> 
  <div id="det"> 
    <a-button @click="newdasbao"><a-icon type="arrow-left" />上一步</a-button>
    <a-button @click="createAccount" type="primary"><a-icon type="arrow-right" />下一步</a-button>
    <a-button @click="quirechat">跳过</a-button> 
    <div class="">
      <a-row>
        <a-col :span="16"></a-col>
        <a-col :span="8" style="text-align: left;">
          <div class="textupload">出纳可以点击将流水上传</div>
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
      this.$router.push({ path: 'Det' })
    },
    quirechat(){
      localStorage.setItem('tour', true);
      this.$router.replace({name: 'Dashboard'});
    },
    createAccount(){
      this.$router.replace({name:'createAccount'})
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


    background-image:url(../../../static/img/dowshangchuan.png); 
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
.textupload{
  width: 200px;
  border: 1px solid #fff;
  color:#fff;
  border-radius: 8px;
  padding: 8px;
      font-size: 14px;
          margin-top: 35px;

}
</style>