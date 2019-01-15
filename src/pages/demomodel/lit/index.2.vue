<template> 
  <div id="demomodel"> 
    <a-button @click="det2">带有Label标签的事件</a-button>
    <template>
      <div>
        <!-- <div id="v-step-0" class="modeldemo1">我是第一行</div>
        <div class="v-step-1 modeldemo1">卧室第二行</div>
        <div data-v-step="2" class="modeldemo1">卧室第三行</div> -->
        
        <!-- <v-tour name="myTour" :steps="steps" :callbacks="tourCallback" v-if="showTour"></v-tour> -->
        <!-- <v-tour name="myTour" :steps="steps" :callbacks="tourCallback"></v-tour> -->


        
      </div>
    </template>

  </div>
</template>

<script>
// import EditableCell from 'EditableCell'
// import {
//   userSearch,
//   userModify,
//   departmentsSearch
// } from '../../models/users.js';
import { mapGetters,mapActions } from "vuex";
// import menuItems from '../../lib/slideMenuItems';
export default {
  // name: 'my-tour',
  data() {
    
    return {
      // recordingTip: true,
      steps: [
          {
            target: '#v-step-0',  // We're using document.querySelector() under the hood
            content: `我是第一行 <strong>哈哈</strong>!`,
            params: {
              placement: 'left'
            }
          },
          {
            target: '.v-step-1',
            content: '我是第二行<strong>呵呵</strong>!',
            params: {
              placement: 'left'
            }
          },
          {
            target: '[data-v-step="2"]',
            content: '我是第三行\'<strong>嘿嘿</strong>!',
            params: {
              placement: 'left'
            }
          }
        ],
        tourCallback: {
          onStop: this.tourStop
        },
        // showTour: true
    };
  },
  mounted() {
    //  if (!localStorage.getItem('tour')) {
    //    this.$tours['myTour'].start();
    //    }
  },
  methods: {
    tourStop() {
     localStorage.setItem('tour', true);
    },
     det2(){
      this.$router.push({ path: 'Det' })
    },

    EventId(){
      // //TDAPP.onEvent("我就是一个普通的点击");
    },
    // EventLabel(){
    
    //   let Detection = {"内容":"艺兴双12大促","年付品价格":"100~400RMB","我是一个素材":"我是图片"};
    //   TDAPP.onEvent("公司id","我在左侧最下方demo里",Detection);
    // },

    
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
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding-top: 20px;
    z-index: 999;
    background-color: #fff;
    font-size: 24px;
    text-align: center;
}
.text-jumbo{
    font-size: 60px;
    font-weight: 700;
    color: #484848;
}
</style>