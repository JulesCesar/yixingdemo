<template>
  <div>    
    <div class="backgroundtHeader"  v-show="editId" @click="() => openNotificationWithIcon('error')"></div>

    <div class="dropdown-ljdy">
      <!--试用期为0时  v-if="showOrder"  || currentUser.companyinfo.num_remain_days==0 -->
      <div class="gongsiName">{{currentUser.companyinfo.corpname}}</div>
      <div v-if="currentUser.companyinfo.num_remain_days>20 || currentUser.companyinfo.num_remain_days<1"><!-- 0天 --></div>
      <!-- 不为0时 -->
      <div v-else>
          <div> 
          <span>{{versionInfo}}</span> 
          <span class="dropdown-ljdy-dayold">{{currentUser.companyinfo.num_remain_days}}天</span>
          <!-- <a-popover title="续费" trigger="hover">
              <template slot="content">
              <p>请管理员操作续费</p> 
              </template> -->
              <a-button type="primary" @click="orderShow">立即订购</a-button> 
          <!-- </a-popover> -->
          </div>
          <!-- <div class="dropdown-ljdy-dayold">{{currentUser.companyinfo.num_remain_days}}天</div> -->
          
          <a-modal  v-model="showBuyCode" :width="290" > 
          <h1 style="text-align:center;">微应用升级/续期</h1>
          <!-- <p>请管理员操作续费</p>  -->
          <h4 style="text-align:center;margin-bottom:10px;">请管理员扫二维码升级/续费</h4>
          <!-- <img :src="baseUrl + 'static/img/erma.png'" alt=""/> -->
              <p class="content-imgs"><img :src="baseUrl + 'static/img/erma.png'" alt=""></p>
              <template slot="footer" style="border-top:none;">
              <p style="display:none"></p>
              </template>
          </a-modal>
      </div>
    </div>

    <div class="dropdown-wrapper">   
                     
        <div  class="ant-dropdown-link ant-dropdown-trigger dropdown__1 clearfloat">
            <div id="Underthehead" class="Underthehead">
              <div class="togglestshow">
                <template>
                  <a-dropdown :trigger="['click']">
                    <div class="ant-dropdown-link">
                      <div class="yonghutou">
                        <a-avatar shape="square" size="large" icon="user" :src="currentUser.avatar"/>
                        <span class="account-username">{{currentUser.name}}<a-icon style="margin-left:26px;" type="down" /></span>
                      </div>
                    </div>
                    <a-menu slot="overlay">
                      <a-menu-item key="0">
                        <div class="" style="line-height: 40px; height: 32px;font-size:14px;" @click="showCustomTextModal">联系客服
                          <a-icon type="qrcode" style="font-size:15px;"></a-icon>
                        </div>
                      </a-menu-item>
                      <a-menu-item key="1">
                        <div class="" style="line-height: 32px; height: 32px;display: inline-block;font-size: 14px;" @click="helpMe">
                          <span>帮助</span>
                          <a-icon type="exclamation-circle-o"  style="font-size:14px;"/>
                        </div>
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="3" v-if="showLogout">
                        <div class="" @click="handleLogOut"  style="line-height: 40px; height: 32px; transform: translateY(-6px);display: inline-block;font-size: 14px;">
                          <span>退出</span>
                          <a-icon type="logout"  style="font-size:14px;"/>
                        </div>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </template>
              </div>
            </div>
        </div> 
    </div>

    <a-modal :title="specTitle" :visible="specVisible" @cancel="specCancel">
      <div v-for="ctn in specContent" :key="ctn.id" style="transform: translateY(-4px);">
          <p style="text-align: start; font-size: 14px; font-weight: 600; margin-top: 8px;">{{ctn.title}}</p>
          <p style="text-align: start; padding-left: 8px; padding-right: 8px;" v-for="txt in ctn.content" :key="txt.id">
              <span v-if="txt.substring(0,5)!='出纳可根据'">○</span> {{txt}}</p>
      </div>
      <div slot="footer" style="text-align: center;">
          <v-button type="primary" @click="specCancel">我知道了</v-button>
      </div>
    </a-modal>

    
    <a-modal title="首席财务官客服"
            :visible="showServiceCode"
            @ok="showCustomTextModal"
            @cancel="showCustomTextModal"
            ok-text="知道了"
            >
        <p class="content-imgs"><img src="../static/img/keewm1.png" alt=""></p>
        
        <template slot="footer" style="border-top:none;">
            <p></p>
        </template>
    </a-modal>
    </div> 

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { loadScript,ddLogin,getToken } from "./lib/ddPCApp";
import { getCorpList,qrcodeLogin } from "./lib/qrcodeLogin";
import { appUserLogin, ddUserLogin } from "./models/users"
import { setEvent } from "./models/pages"
import spec from "./models/spec.js";

export default {
  name: "app-header",
  props:{
      collapsed:{
        type:Boolean,
        default: false
      },
      baseUrl:String
  },
  data() {
    return {
      specTitle:'',
      specVisible:false,
      specContent:[],
      showLoginCorp: true, 
      showBuyCode: false,
      showServiceCode: false,  
    };
  },
  computed: {
    ...mapGetters(["currentUser",'editId']),
    showLogout() {
        return localStorage.getItem('showLogout') == '1';
    },
    versionInfo(){
       let _ispayfee =this.currentUser.is_order // 0 试用未付过费用 1 付费版本 2 高级付费版本
       if(_ispayfee){
         return '您当前剩余'
       }else{
         return '试用版本，剩余'
       }
    },
  },
  methods: {
    ...mapActions(["setUser",'setEditId']),
   
    openNotificationWithIcon(type) {
      let _self = this
      _self.$confirm({
        title: '是否放弃编辑流水?',
        // content: '请先保存记录，再进行其他操作。',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
          _self.setEditId('')
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel');
        },
      }); 
    },
        //显示订购信息
    orderShow() {  
      this.showBuyCode = true 
    },
 
    helpMe(){
      this.$router.push({ path: 'Help' })
    },
    showCustomTextModal () {
      this.showServiceCode =  !this.showServiceCode;
    }, 
     specCancel() {
      TDAPP.onEvent("使用说明");
      this.specVisible = false;
    },
    handleLogOut() {
        location = location.origin;
    }
  }
}
</script>

<style>
  .dropdown-ljdy{
    position: absolute;
    top: 0;
    left: 30px;
  }
  .gongsiName{
    
      font-family: Geogrotesque,Arial,-apple-system,Helvetica Neue Bold,sans-serif;
      font-size: 1.2rem;
      width: auto;
      white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
      color: #000;
      // vertical-align: middle;
      // pointer-events: auto;
      // max-width: calc(100% - 68px);
      margin-left: 10px;
  }
  #Underthehead .ant-avatar{
    background: #3396fa !important;
  }
</style>

