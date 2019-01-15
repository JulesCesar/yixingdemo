<template>
    <div id="app">
        <!-- 头部蓝条Demo提示 -->
        <div id="demo_notification" v-if="isDemo">
            <p>当前为<B><u style="color:rgb(51, 241, 11) !important;">体验示例</u></B>,<span>请联系</span><U>老板在手机端</U> <u>【首席财务官-发现-安全管理-权限管理】 </u>  选择出纳开始记账 </p>
        </div>
        <!-- <a-alert message="" banner closable /> -->
       <!-- end 头部蓝条 -->
 
        <!-- 程序区  -->
        <a-layout v-if="userData" >
          <!-- 左侧菜单栏 -->
           <!-- {{ currentUser.corpid}} :collapsed-width="0"-->
            <a-layout-sider 
               v-model="collapsed"
               :trigger="null" 
               >
                <div class="backgroundt" v-show="editId" @click="() => openNotificationWithIcon('error')"></div>
                 <div class="logo" >首席财务官</div>
                  <a-menu theme="dark"
                  mode="inline" 
                  v-model="current"
                  :defaultOpenKeys="['cashier','arap']" 
                  @click="menuClick"
                  :key="item.key"
                  v-for="(item,index) in menuItems">
                    <!-- <a-sub-menu v-if="item.children" :key="index"  :value='item' >
                      <span slot="title">
                            <a-icon style="font-size:16px;" type="file-text" v-show="item.name=='流水账管理'"/>
                            <a-icon style="font-size:16px;" type="swap" v-show="item.name=='应收应付管理'"/>
                            <span>{{item.name}}</span>
                      </span> -->
                    <a-sub-menu v-if="item.children" :key="item.key"  :value='item' >
                      <span slot="title">
                            <a-icon style="font-size:16px;" type="file-text" v-show="item.name=='流水账管理'"/>
                            <a-icon style="font-size:16px;" type="swap" v-show="item.name=='应收应付管理'"/>
                            <span>{{item.name}}</span>
                      </span>
                      <!-- <span slot="title"><a-icon type="exception" /><span>{{item.name}}</span></span> -->
                      <a-menu-item  v-for="(citem,cindex) in item.children"  :key="`${index}-${cindex}`"  :value='citem'>
                        
                          <!-- <span slot="title">
                            <a-icon style="font-size:16px;" type="file-text" v-show="citem.name=='日记账'"/>
                            <a-icon style="font-size:16px;" type="swap" v-show= "citem.name=='应收应付管理'"/>
                            <span>{{citem.name}}</span>
                          </span> -->
                          <span>{{citem.name}}</span>
                      </a-menu-item> 
                    </a-sub-menu>
                    <a-menu-item   :key="item.key" :value='item'  v-else>
                      <a-icon type="pie-chart" />
                      <span>{{item.name}}</span>
                    </a-menu-item> 
                  </a-menu>

                  

                <!-- <div class="logo">首席财务官</div>
                <v-menu theme="dark" mode="inline" :data="menuItems" :expand="true" >
                    <template slot-scope="{data}">
                        <div @click="itemClick(data)">
                        <i v-if="data.icon" :class="'anticon anticon-' + data.icon"></i>
                        <span class="nav-text">{{data.name}}</span>
                        <span v-if="data.tag_beta" class="ant-tag-custom"> <i class="beforAfter"></i>BETA</span>
                        <span v-if="data.tag_demo" class="ant-tag-custom"> <i class="beforAfter"></i>DEMO</span>
                        </div>
                    </template>
                </v-menu> -->
            </a-layout-sider>
          <!-- /左侧菜单栏 -->

          <!-- 右侧内容栏  -->
             <a-layout >
                <a-layout-header style="background: #fff; padding: 0" >
                  <!-- {{collapsed}} -->
                   <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> collapsed = !collapsed"
                    /> 
                  <!-- <span  style="display: inline-block; transform: translateY(-2px); color: #3296fa">{{collapsed ? '展开导航' : '收起导航'}} </span> -->
                  <yx-header :collapsed.sync='collapsed' :baseUrl='baseUrl' />
                </a-layout-header>
                <a-layout-content :style="{ margin: '24px 16px',background: '#fff', minHeight: '280px' }">
                    <!-- <a-breadcrumb :style="{ margin: '12px 0', marginLeft: '24px', display: 'inline-block' }">
                        <a-breadcrumb-item>{{breadcrumb1}}</a-breadcrumb-item>
                        <a-breadcrumb-item>{{breadcrumb2}}</a-breadcrumb-item>
                    </a-breadcrumb>  -->

                <yx-content-wrap  
                :user="userData"
                :style="{height: pageHeight - 120 + 'px', margin: '0px 24px',
                 marginBottom: '24px',  overflow: 'auto', borderRadius: '8px',backgroundColor: '#fff'}"
                >

                </yx-content-wrap>
                </a-layout-content>
                 <!-- footer -->
                <!-- <a-layout-footer style="textAlign: center">
                  Yi Xinng ©2018 Team production
                  <b>如有疑问请联系客服: alan19911</b>
                </a-layout-footer> -->
            </a-layout>
          <!-- /右侧内容栏  -->

         
        </a-layout>
        <!-- end 程序区  -->

        <!-- corp list -->
         <corp-lists v-if="showLoginCorp&&corpCode.length" 
         :corpCode='corpCode'
          @chooseCorp='chooseCorp'
          @loginDemo='ddTest'/>
 
  </div>
</template>



<script>
// import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import ContentWrap from "ContentWrap.vue";
import Header from "Header.vue";
import CorpLists from 'CorpLists.vue'


import { loadScript,ddLogin,getToken } from "./lib/ddPCApp";
import { getCorpList,qrcodeLogin } from "./lib/qrcodeLogin";
import { appUserLogin, ddUserLogin } from "./models/users"
import { setEvent } from "./models/pages"
import spec from "./models/spec.js";

import sMenus from './lib/slideMenuItems';

import baseUrl from './router/baseUrl';


 

export default {
  name: "app",
  components: {
    "yx-content-wrap": ContentWrap,
    "yx-header": Header,
    CorpLists
  },
  data() {
    return {
      isDemo: false,
      showLoginCorp: true,
      corpCode:[],
      current:['dashboard'],
      baseUrl: baseUrl,
      collapsed:false,
      userData: null,
      pageHeight: window.innerHeight,
      menuItems: sMenus,
    };
  },
  computed: {
    ...mapGetters(["currentUser",'editId']),
  },
  created() {
    this.$bus.$on('showDemoNotification', () => {
        this.isDemo = true;
    })
    debugger
    let _self = this;
    if (location.search) { // 正常访问
        // https://www.yixingcloud.com/yxpctest/?code=c830df78ee343ac682257c9bbed540c9&state=STATE
        let _code = location.href.match(/code=(\w*)/) 
        if(_code){ // 扫码登录
        debugger
            localStorage.setItem('showLogout', 1);
            _self.corpCode = _code
        }else{ // 钉钉内登录
            let _corpId = location.href.match(/corp_id=(\w*)/)
            // https://www.yixinglab.com/yxpcprod/dingtalk?app_id=4000&app_type=pc&corp_id=$CORPID$
            if(_corpId){
                localStorage.setItem('showLogout', 0);
                loadScript().then(res=>{ 
                    getToken(_self.getUserInfo);
                })
                _self.showLoginCorp = false;
            }else{
                //未知入口
            }
        }  
    }else{ // 刷新
        _self.showLoginCorp = false;
        let _loc_ding = localStorage.getItem('ding_param');
        if (_loc_ding && JSON.parse(_loc_ding).param != '?undefined') { // 钉钉内刷新
            if (location.href.split('?')[1] == undefined) {
                _loc_ding = JSON.parse(_loc_ding);
                let _loc = _loc_ding.base + _loc_ding.pos + _loc_ding.param;
                location = _loc; 
                localStorage.setItem('showLogout', 0);
            }
        } else {
            let _loc_sns = localStorage.getItem('snsLogin');
            let _emp = localStorage.setItem('showLogout', 1);
            if (_loc_sns) { // 浏览器刷新
                _loc_sns = JSON.parse(_loc_sns);
                //  
                this.chooseCorp(_loc_sns);
            } else {
                // 进demo
                _self.userData = {
                    type: 'test'
                }
             
                // this.chooseCorp('dingc2d71ba9b26822b535c2f4657eb6378f','3425461329429481')
              //  {"corpid":"dingc2d71ba9b26822b535c2f4657eb6378f","dinguserid":"3425461329429481","name":"哒哒商贸"},
                // alert('登录失败，请重新登录或联系客服');
            }
        }
        /// ------------test----------------
        // this.showLoginCorp = true;
        //  // ------------模拟扫码----------------
        //   this.corpDatas = [
        //     {"corpid":"dingb642f8f8960636e335c2f4657eb6378f","dinguserid":"manager2513","name":"北京毅行千里企业管理服务有限责任公司"},
        //     {"corpid":"ding56ee0f8b2056aaf235c2f4657eb6378f","dinguserid":"3425461329429481","name":"花繁树下测试公司"},
        //     {"corpid":"dingc2d71ba9b26822b535c2f4657eb6378f","dinguserid":"3425461329429481","name":"哒哒商贸"}
        //   ]
    }
 
    window.addEventListener("resize",()=>{
      _self.pageHeight = window.innerHeight;
    });
 
  },
  methods: {
    ...mapActions(["setUser",'setEditId']),
    chooseCorp(item) {
        let _self = this;
       
        // chooseCorp(item.corpid, item.dinguserid, item.isCashier)
       // cid, did, isCashier,corpSign
        if (item.isCashier) { // 出纳
            qrcodeLogin(item.corpid, item.dinguserid, item.corpSign).then(user => {
              if ( user.code == 200) {  
                _self.showLoginCorp = false;
                user.corpid = item.corpid;
                _self.setUser(user)
                setEvent({
                    "keyname": "login_qrcode",
                    "keyvalue":"扫码登陆_获取公司列表"
                })
                _self.userData = user
              }else{
                _self.showLoginCorp = true;
                _self.$message.error('登录失败');
              }
            });
        } else { // 非出纳，弹出提示
            _self.ddTest();
        }
    },
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
    getUserInfo(user) {
      let _self = this;
      // debugger
      console.log('getUserInfo', user)
      ddUserLogin(user).then(res => { 
        if (res.status === 200 && res.data.code === 200) {
            let _data = res.data 
            console.log('ddUserLogin',_data)
            _data.corpid = user.corpid; 
            _self.setUser(_data)
            _self.userData = _data
            let _loc = {
                base: location.origin,
                pos: location.pathname,
                param: '?' + location.href.split('?')[1]
            }
            setEvent({
                "keyname": "login_pc_app",
                "keyvalue":"用户登陆PC记账"
            })
            localStorage.setItem('ding_param', JSON.stringify(_loc));
            localStorage.setItem("yxlabUserData", JSON.stringify(_data)); 
        } else { 
          const h = this.$createElement
          this.$info({
            title: '登录',
            content: h('div',{}, [
              h('p', '登录失败，请联系客服'),
              h('img',{attrs:{
                'width':300,
                'src':'../static/img/keewm1.png',
                'alt':''
              }}),
            ]),
            onOk() {},
          }); 
        }

      });
    }, 
    ddTest() {
      let _self = this;
 
        const appId = 5898; // 用于区分不同的前端应用
        // const userName = "testroot"; // 钉钉主管理员
        // const userName = "testadmin"; // 管理员
        // const userName = "testboss"; // 老板
        const userName = "testcashier"; // 出纳  
        // const userName = "testadminbosscashier" // 管理员+老板+出纳
        // const userName = "testadminboss" // 管理员+老板
        // const userName = "testbosscashier" // 管理员+出纳
        // const userName = "test"; // 普通用户
        const passWord = "123456";
        const apptype = "web";

       

        appUserLogin({"appid": appId,"apptype": apptype, "username":userName,"password":passWord}).then(res => {
          debugger
          if (res.status === 200 && res.data.code === 200) {

           
            if(res.data.roles.length){
              res.data.corpid = 'dingc2d71ba9b26822b535c2f4657eb6378f' //哒哒商贸
              res.data.companyinfo.num_remain_days =10 //测试购买
              _self.setUser(res.data)
              _self.isDemo = true;
               setEvent({
                "keyname": "login_pc_demo",
                "keyvalue":"用户登陆PC体验"
              })
              _self.userData = res.data;
              _self.showLoginCorp = false;
              _self.$router.replace({name: 'Dashboard'});
            }else{
              // this.$warning({
              //   title: '登录',
              //   content: '未授权用户，请管理员授权',
              // })  
            }
          } else { 
            const h = this.$createElement
            this.$info({
              title: '登录',
              content: h('div',{}, [
                h('p', '登录失败，请联系客服'),
                h('img',{attrs:{
                  'width':300,
                  'src':'../static/img/keewm1.png',
                  'alt':''
                }}),
              ]),
              onOk() {},
            }); 
          }
        }); 
    },

    menuClick(item){
      // item, key, keyPath
      //  debugger
      // console.log('menu',item)
      this.current =[item.key]
      let _item = item.item.value
      // TDAPP.onEvent(_item.name);
      setEvent({
        "keyname": "leftmenu",
        "keyvalue": _item.name
      })
      this.$router.replace(_item.router);
    },
  }
};
</script>

<style>
/* .content-wrapper{
  margin-top: 24px !important;
} */
.ant-menu-dark.ant-menu-submenu-popup{
  width: 0 !important;
}
.backgroundt{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 9;
  /* background-color: #0077c5; */
}
.backgroundtHeader{
  /* background-color: #0077c5; */
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.holpCLICK{
  /* background-color: #0077c5; */
    display: inline-block;
    color: #3296fa;
    cursor: pointer;
        margin-right: 16px;
}
.leftBox{float:left;}
.rightBox{float:right;}
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}

#app .trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  margin-left: 18px;
}
#app .trigger:hover {
  color: #3296fa;
}
#app .logo {
  height: 32px;
  background: #666;
  border-radius: 6px;
  margin: 16px;
  color: #ffffff;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  overflow: hidden;
}
#app .ant-layout-sider-collapsed .anticon {
  font-size: 16px;
}
#app .ant-layout-sider-collapsed .nav-text {
  display: none;
}
.dropdown-ljdy {
  /* width: 400px; */
  display: inline-block;
  position: absolute;
  line-height: 60px;
  top: 0;
  padding-left: 10px;
  /* right: 160px; */
}
.dropdown-ljdy > div {
  display: inline-block;
}
.dropdown-ljdy-dayold {
  /* color: red; */
  margin-right: 10px;
}
.dropdown-wrapper {
  float: right;
  width: 160px;
  line-height: 24px;
}
.dropdown-wrapper > div {
  /* width: 100%; */
}
.ant-tag-custom {
  width: 32px;
  background-color: #666;
  font-size: 4px;
  font-family: arial, sans-serif;
  font-weight: 500;
  padding: 2px;
  text-align: center;
  border: 1px solid #666;
  color: #dddddd;
  height: 16px;
  line-height: 16px;
  border-radius: 2px;
  margin-left: 8px;
  position: relative;
}
.beforAfter {
  position: absolute;
  top: 5px;
  left: -6px;

  width: 0;
  height: 0;
  margin-right: 20px;
  border-top: 4px solid transparent;
  border-right: 6px solid #666;
  border-bottom: 4px solid transparent;
}
.breadcrumb-specs {
  width: 90px;
  display: inline-block;
  color: #3296fa;
  cursor: pointer;
      margin-right: 8px;
  margin-left: 16px;
}
.breadcrumb-specs1{
  margin-left: 32px;
  margin-right: 10px;
  display: inline-block;
  color: #3296fa;
  cursor: pointer;
}
.ant-layout-header {
  height: 56px;
  position: relative;
}
.account-username {
  width: 100px;
  color: #666;
  padding: 0;
  text-align: right;
  transform: translateY(-16px);
  height: 24px;
  font-size: 14px;
  display: inline-block;
}
.dropdown__1 {
  height: 56px;
  padding: 8px 0;
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 14px;
}

td {
      padding: 4px 0 !important;
}
th{
  padding: 14px 0 !important;
}
/* 头部蓝条 */
.blue-example {
  text-align: center;
  width: 100%;

  background-color: #3295fa;
  z-index: 1900;
  opacity: 0.8;
  color: #fff;
  padding: 6px 6px;
}

/*tabs*/
.box-tabs {  
      width: 90%;  
      /* height: 200px;   */
      margin: 0 auto;  
      position: relative;
      /* border: 1px solid #000;   */
  }  
  .tabs-all-options li {  
      float: left;  
      margin-right: 2px;  
      list-style: none;  
      transition: all  .6s  ease-in;
      -moz-transition: all  .6s  ease-in;
      -webkit-transition: all  .6s  ease-in;
      background-color: pink;
      position: relative;
  }
  .tabs-all-options li:hover {  
    border-bottom:10px solid rgba(0, 0, 0, 0.25);
    transform:translateY(-10px);
  }
  
  .tabs-all-options li:nth-of-type(1){  
      background-color: #21abf6;
  } 
  .tabs-all-options li:nth-of-type(2){  
      background-color: #0077c5;
  } 
  .tabs-all-options li:nth-of-type(3){  
      background-color: #ff8000;
  } 
  .tabs-all-options li:nth-of-type(4){  
      background-color: #b8bcc4;
  } 
  .tabs-all-options li:nth-of-type(5){  
      background-color: #7ece00;
  }  
  .tabs-all-options .tab-link {  
      display: block;  
      width: 160px;  
      height: 49px;  
      text-align: center;  
      line-height: 49px;  
      color: #fff;  
      text-decoration: none;  
    color: #fff;
    cursor: pointer;
    
  }  

  .tabs-all-options .tab-link.active {  
      background-color: #999;
      border-top: 1px solid #000;
      transition: .3s;  
  }  
  .cards-content {
      margin-top: 20px;  
      float: left; 
      width: 100%;
      background-color: #f4f4f4;
      height: 100px; 
      position: absolute;
      top: 40px;
      left: 0;
  }  
  .cards-content .tab-card {  
      display: none;  
  }  
  .clearfix:after {  
      content: "";  
      display: block;  
      height: 0;  
      clear: both;  
  }  
  .clearfix {  
      zoom: 1;  
  } 

  .btn {
    border: 1px solid #d1d1d1;
    border-radius: 3px;
    background-color: #f7f7f7;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#f7f7f7),
  to(#f2f2f2));
    background: -moz-gradient(linear, 0 0, 0 100%, from(#f7f7f7),
  to(#f2f2f2));
    background: -o-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    background: -ms-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    height: 28px;
    padding: 0 20px;
    cursor: pointer;
    line-height: 28px;
    display: inline-block;
    color: #666666;
    margin-right: 5px;
    outline: none;
  }
  .blue {
      border: 1px solid #f4f5f8;
      background-color: #f4f5f8;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(#5a98de),
    to(#5a98de));
      background: -moz-gradient(linear, 0 0, 0 100%, from(#5a98de),
    to(#5a98de));
      background: -o-gradient(linear, 0 0, 0 100%, from(#5a98de), to(#5a98de));
      background: -ms-gradient(linear, 0 0, 0 100%, from(#5a98de), to(#5a98de));
      color: #FFFFFF;
  }   
  /* .fade-enter-active, .fade-leave-active {
    transition: all ease .4s;
    transform:translate(0, 10px);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transition: all ease .4s;
    transform:translate(0, -800px);
  } */
  .content-imgs{
    width: 70%;
    margin: 0 auto;

  }
  .content-imgs img{
    width: 100%;
    
  }
  .example{
    text-align: center;
}
.corp-animates{
  margin: 0 auto;
}
#corp-animates{
  /* margin-top: 100px; */
}
.card-center-imgs{
  margin: 0 auto;
  width: 100px;
  height: 100px;
  text-align: center;
}
.card-center-imgs img{
  width: 100%;
  height: 100%;
}
#corp-animates .ant-card-head-title{
  text-align: center;
}
.smartesta-center{
  width: 50px;
  height: 50px;
  /* text-align: right; */
      margin-left: 10px;
  border-radius: 50%;
  /* overflow: hidden; */


    /* margin: 0 auto; */

}
.smartesta-center img{
  width: 100%;
  height: 100%;
  text-align: left;
}
.corp-animates-header{
  margin-top: 100px;
}


.trigger{
      color: rgb(50, 150, 250);
}


#corp-animates .ant-list-item-meta-title{
  line-height: 40px !important;
}

#corp-animates{
    



}
.leaderboard {
  /* position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%); */
          margin: 0 auto;
  width: 70%;
  background: -webkit-linear-gradient(top, #3a404d, #181c26);
  background: linear-gradient(to bottom, #3a404d, #181c26);
  border-radius: 10px;
  box-shadow: 0 7px 30px rgba(58, 53, 53, 0.3);
}
.leaderboard h1 {
  font-size: 18px;
  color: #fff;
  padding: 12px 13px 18px;
}
.leaderboard h1 svg {
  width: 25px;
  height: 26px;
  position: relative;
  top: 3px;
  margin-right: 6px;
  vertical-align: baseline;
}
/* .leaderboard ol {
  counter-reset: leaderboard;
} */
#corp-animates .leaderboard .ant-list-item {
  position: relative;
  z-index: 1;
  font-size: 14px;
      background-color: #fff;
  counter-increment: leaderboard;
  padding: 18px 10px 18px 50px;
  cursor: pointer;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  -webkit-transform: translateZ(0) scale(1, 1);
          transform: translateZ(0) scale(1, 1);
}
#corp-animates .leaderboard .ant-list-item:hover {
    color:#fff !important;
}
#corp-animates .leaderboard .ant-list-item::before {
  content: counter(leaderboard);
  position: absolute;
  z-index: 2;
  top: 15px;
  left: 15px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: #c24448;
  background: #fff;
  border-radius: 20px;
  text-align: center;
}
#corp-animates .leaderboard ol li mark {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 18px 10px 18px 50px;
  margin: 0;
  background: none;
  color: #fff;
}
#corp-animates .leaderboard .ant-list-item::before{
  content: '';
  position: absolute;
  z-index: 1;
  bottom: -11px;
  left: -9px;
  border-top: 10px solid #c24448;
  border-left: 10px solid transparent;
  -webkit-transition: all .1s ease-in-out;
  transition: all .1s ease-in-out;
  opacity: 0;
}

#corp-animates .leaderboard .ant-list-item::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f3f4f7;
  box-shadow: 0 3px 0 rgba(0, 0, 0, 0.08);
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  opacity: 0;
  border-radius: 14px;
}

#corp-animates .leaderboard .ant-list-item:hover {
  z-index: 2;
  overflow: visible;
}
#corp-animates .leaderboard .ant-list-item:hover::after {
  opacity: 1;
  -webkit-transform: scaleX(1.06) scaleY(1.03);
          transform: scaleX(1.06) scaleY(1.03);
}
#corp-animates .leaderboard .ant-list-item:hover mark::before, .leaderboard ol li:hover mark::after {
  opacity: 1;
  -webkit-transition: all .35s ease-in-out;
  transition: all .35s ease-in-out;
}
#corp-animates .ant-list-item-meta{
  z-index: 2;
  color:#4c4949 !important;
}
#corp-animates .ant-list-item-action{
  z-index: 2;
  color:#4c4949 !important;
}
#corp-animates .ant-list-item-action a{ 
  color:#4c4949 !important;
}
#corp-animates .ant-list-item-action a:hover{ 
  color:#3296fa !important;
}
#corp-animates  .leaderboard .ant-list-item .ant-avatar{
background: #4c4949 !important;
}
#corp-animates .ant-spin-nested-loading{
  height: 342px;overflow-y: auto;
}
.ant-layout-footer{
  background: #f5f7fb !important;
  padding: 0px 26px 20px 26px !important;
}
#demo_notification {
    height: 24px;
    width: 100%;
    background-color: #3296fa;
}
#demo_notification p {
    color: white;
    text-align: center;
    line-height: 24px;
}
</style>
