<template> 
  <div> 
             
        <!-- <span>选择的值为：{{radio}}</span> -->
        <v-row>
            <v-col span="7">
              <!-- 左侧 -->
              <div class="app-wrapper"  id="lasthover">
                <div class="image-grid-left">
                  <div class="image" v-for="pic in picdata" style="text-align: center;">
                    <div @click="openPage(pic.lab)">
                      <h3 style="text-align: left;">{{ pic.caption }}</h3>
                      <p style="width:100% !important;text-align: left;">{{pic.imageText}}</p>
                    </div>
                    <img :src="pic.imgUrl" alt=""  @click="openBox(pic)">
                    <span>{{pic.administratorlogin}}</span>
                    
                  </div>
                </div>
                
                
              </div>
            </v-col>


            <v-col span="7" style="margin-right:10px;margin-left:10px;">
              <!-- 中间picdatacenter -->
              <div class="app-wrapper" style="margin-right:22px;">
                <div class="image-grid-center">
                  <span class="Administratorlogin">
                    <img src="../../assets/img/flag.svg" alt="">
                  </span>
                  <div class="image imagecenters" v-for="pic in picdatacenter">
                    <div>
                      <h3>{{ pic.caption }}</h3>
                      <p style="width:100% !important;">{{pic.imageText}}</p>
                    </div>
                    <img :src="pic.imgUrl" alt=""  @click="openBox(pic)">
                    
                  </div>
                </div>
              </div>
            </v-col>


            <v-col span="9">
              <!-- 右侧 -->
              <div class="app-wrapper">
                  <div class="app-wrapper-uno">
                    <div class="image-grid-right">
                      <div class="cashier-Upload">
                        <span class="Administratorlogin">3</span>
                        <h3>{{chunashezhi}}</h3>
                        <p>{{chunashezhitext}}</p>
                      </div>
                      
                      <div class="image image-dashed" v-for="pic in picdataright">
                        <div>
                          <v-row>
                              <v-col span="12">
                                <div @click="openPage(pic.lab)">
                                  <h3 style="" >{{ pic.caption }}</h3>
                                  <p style="width:100% !important;">{{pic.imageText}}</p>
                                </div>
                              </v-col>
                              <v-col span="12">
                                <img :src="pic.imgUrl" alt=""  @click="openBox(pic)">
                              </v-col>
                          </v-row>
                        </div>
                        
                        
                      </div>
                    </div>
                </div>
              </div>
            </v-col>
        </v-row>
          
          
        
<span style="color:#4f94e2;">温馨提示：{{radiotext}}或点击下载</span> 

          <!-- 弹出 -->
                <div style="display: inline-block;color: #3296fa;font-size: 14px;">
                  <a :href="baseUrl + 'static/img/manualV2.6.pdf'" download="首席财务官产品使用说明文档V2.6.pdf">《产品手册》</a>
                  <!-- <a href="/user/test/xxxx.txt" download="文件名.txt">点击下载</a> -->
                   <a-icon type="file-pdf" style="font-size:14px;"></a-icon>
                </div>
          <p>首席财务官：{{currentUser.version.name}}</p>
          <transition name="fade">
            <app-lightbox :close="closeBox" :imgsource="currentPic" v-if="lightBoxToggle"></app-lightbox>
          </transition>

  </div>
</template>

<script>
import baseUrl from '../../router/baseUrl';
import {
    mapGetters
} from 'vuex';

export default {
  components:{
    'app-lightbox':{
      template: "<div id='overlay' @click='close'>" +
                "<img :src='imgsource.imgUrl' alt='' />" +
                "<span>{{ imgsource.caption }}</span>" +
                "</div>",
      props:{  
        imgsource: Object,
        close: Function
      }, 
      mounted(){
        var overlay = document.getElementById('overlay');
        overlay.setAttribute('style', 'height:' + window.innerHeight + 'px; ' + 'width:' + window.innerWidth + 'px');
        console.log(window.innerWidth);
      }
    }
  },
  data() {
    return {
        baseUrl: baseUrl,
      radio: "",
      chunashezhi:'出纳上传银行数据',
      chunashezhitext:'如果您已经完成出纳授权，想要上传银行数据，请按照如下步骤进行操作：',
      radiotext:'上述使用说明中的所有图片都可以点击查看大图',
      picdata: [
        {
          id: 1,
          caption: '管理员登录',
          lab:'Permission',
          administratorlogin:'1',
          imageText:'如果您是管理员登录，为进行授权操作，请先在权限管理页面完成授权，然后继续下面的操作',
          imgUrl: baseUrl + 'static/img/holp1-1.png'
        },
        {
          id: 2,
          caption: '出纳记一笔流水账',
          lab:'Recordloader',
          administratorlogin:'2',
          imageText:'如果您已经完成出纳授权，想要记一笔流水账，请点击此文字链接',
          imgUrl: baseUrl + 'static/img/holp2-2.png'
        },
      ],
      picdatacenter:[
        {
          id: 1,
          caption: '老板查看数据',
          lab:'RecordImportData',
          imgUrl: baseUrl + 'static/img/holp5.png'
        },
      ],
      picdataright:[
        {
          id: 1,
          caption: '第一步',
          lab:'MoneyAccount',
          administratorlogin:'3',
          imageText:'创建银行账户',
          imgUrl: baseUrl + 'static/img/holp3-3.png'
        },
        {
          id: 2,
          caption: '第二步',
          lab:'RecordImportData',
          administratorlogin:'4',
          imageText:'上传银行流水',
          imgUrl: baseUrl + 'static/img/holp4-4.png'
        },
      ],
      currentPic: '',
      lightBoxToggle: false
    };
  },
  computed: {
      ...mapGetters(['currentUser'])
  },
  methods: {
      openBox(d) {
        let _self = this;
            _self.currentPic = d;
            _self.lightBoxToggle = !_self.lightBoxToggle;
        },
      closeBox() {
        let _self = this;
          _self.lightBoxToggle = false;
      },
      openPage(newVal){
         this.$router.replace({'name':newVal})
      }
  },
  watch:{
      radio(newVal,oldVal){
          this.$router.replace({'name':newVal})
      }
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 2.4rem;
  text-align: center;
  margin: 2rem auto;
}

.image-grid-left {
  width: 100%;
  // background-color: #f7f7f7;
  // margin: auto;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: flex-start;
  position: relative;
}
.image-grid-left-jt{
  position: absolute;
  bottom: 166px;
  right: -10px;
}
.image-grid-left-jt img{
  width: 56px !important;
}
.image-grid-right {
  background-color: #f7f7f7;
  width: 100%;
  position: relative;
  padding-bottom: 16px;
  border-radius: 8px;
}
.image-grid-center {
  width: 100%;
  position: relative;
}

.image {
  // width: 20%;
  margin: 0 20px 20px 20px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
}
.image p{
  color: #8f8f8f;
}
.image img {
  width: 100%;
}

#overlay {
  position: fixed;
  width: 100vw;
  /* height: 100vh; */
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
}

#overlay img {
  height: 80%;
  width: auto;
}

#overlay span {
  color: white;
  margin-top: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 500px) {
  .image {
    width: 80%;
  }
  #overlay img {
    height: auto;
    width: 90%;
  }
}

@media only screen and (max-width: 800px) and (min-width: 500px) {
  .image {
    width: 30%;
  }
  #overlay img {
    height: auto;
    width: 90%;
  }
}
.image-grid-left div:nth-last-of-type(1){
  background-color: #f7f7f7;
  margin-bottom: 20px;
  position: relative;
}
.image-grid-left div:nth-last-of-type(2){
  background-color: #f7f7f7;
  position: relative;
}
.zhezhao{
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 16px;
  background-color:#f7f7f7;
  display: inline-block;
}
.image-grid-left div:nth-of-type(2) input{
  position: absolute;
  top: 0;
  left: 0;
}
.image-grid-left{
  cursor:pointer;
}


.image-grid-center{
  cursor:pointer;
  background-color:#f7f7f7;
}
.imagecenters{
  margin: 4px;
  background-color: #f7f7f7;
  padding: 10px;
}

.image-grid-right{
  cursor:pointer;
}
.image-grid-left :hover{
  color: #4991e5;
}
// .image-grid-center :hover{
//   color: #4991e5;
// }
.image-grid-right :hover{
  color: #4991e5;
}
.image-grid-left div:nth-of-type(1) span:nth-of-type(1){
  display: inline-block;
  background-color: #f7f7f7;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  color: #4991e5;
  font-size: 16px;
  position: absolute;
  top: -14px;
    left: -13px;
}
.image-grid-left div:nth-of-type(2) span:nth-of-type(1){
  display: inline-block;
  background-color: #f7f7f7;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  color: #4991e5;
  font-size: 16px;
  position: absolute;
  top: -14px;
    left: -13px;
}
.cashier-Upload{
  position: relative;
}
.Administratorlogin{
  display: inline-block;
  background-color: #f7f7f7;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  color: #4991e5;
  font-size: 16px;
  position: absolute;
  top: -14px;
  left: -13px;
}
.Administratorlogin img{
  width: 20px;
  height: 20px;
  margin-top: 4px;
}
.cashier-Upload{
  padding: 10px;
}
.image-dashed{
  border: 1px dashed #4990e2;
  color:#4990e2 !important;
}
.image-dashed h3 p{
  color:#4990e2 !important;
}
// #lasthover :hover{
//   color:red;
// }
</style>
