<template>
    <div style="width: 100%; position: absolute; top: 0; left: 0; background-color: white;">
        <div style="margin-top: 10px;" >
            <a-row>
                <a-col :span="2">
                    <a-button style="margin-left: 20px; height: 32px;" icon="rollback" @click="handleBack">返回</a-button>
                </a-col>
                <a-col :span="12" :offset="4">
                    <div class="topslogo" style="text-align: center; margin-bottom: 10px;">
                        <img src="../static/img/bamaiprod.jpg" alt="首席财务官">
                        <h2 style="font-size: 24px;">首席财务官</h2>
                        <h6 style="font-size: 18px;">管理好公司，就是管好现金流</h6>
                    </div>
                </a-col>
            </a-row>
        </div>
      <div id="corp-animates" class="corp-animates">
            <div class="leaderboard" v-if="corpList.length">
              <a-list size="large" :dataSource="corpList">
                  <!-- <h5 slot="header"><a-icon type="pushpin-o" />请选择要登录的公司</h5> -->
                  <a-list-item slot="renderItem" slot-scope="item, index" 
                  style="cursor: pointer; "> 
                      <!-- <a >
                        登录记账
                      </a> -->
                      <a-button slot="actions" v-if="item.isCashier" type="primary" @click="chooseCorp(item)"  >登录记账</a-button> 
                      <a-button  slot="actions" v-else @click="loginDemo"  > 体验记账  </a-button>
                      
                      <a-list-item-meta  :description="item.corpDesc" > 
                        <a-avatar  slot="avatar" size="large">{{item.name.substr(0,1)}}</a-avatar> 
                        <a slot="title" > {{item.name}}</a> 
                      </a-list-item-meta> 
                  </a-list-item>
              </a-list>
            </div>
            <div v-else style="padding-top: 100px;"> 
                <a-row>
                    <a-col :span="12" :offset="6" style="position:relative; text-align: center;">
                      <div class="seterweimas">
                         <img src="../static/img/bamaiqr.png" alt="首席财务官">
                          <p style="font-size: 18px; text-align: center;">
                              钉钉扫码试用《首席财务官》
                          </p>
                          <a-button size="large" @click="loginDemo">体验【首席财务官】</a-button>
                      </div>
                      
                    </a-col>
                </a-row>
            </div>
      </div> 
        <div style="margin-top:20px;margin-bottom:10px;position: fixed;left: 50%;bottom: 0;transform: translate(-50%,-50%);">
            <p style="text-align: center; font-size: 14px;">毅行团队出品</p>
            <p style="text-align: center;margin-top: 10px; font-size: 12px;">如有疑问请联系客服: alan19911</p>
        </div>
    </div> 

</template>



<script>
// import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import { getCorpList,qrcodeLogin } from "./lib/qrcodeLogin";
 

export default {
  props:{
    corpCode:Array
  },
  data() {
    return {
      corpDatas: [], 
      corpSign:""
    };
  },
  computed: {
    ...mapGetters(["currentUser",'editId']),
    corpList(){
      if(this.corpDatas.length){
        this.corpDatas.map(val=>{
          let _corp = val.companyinfo
          if(!_corp){
            val.companyinfo={
                num_account: 22, // 帐户数量
                num_arap_data: 10, // 应收应付数量
                num_araper: 3, // 应收应付款人
                num_boss: 1, // 老板数量
                num_cashier: 1, // 出纳数量
                num_moneyflow_data: 27, // 流水数量
                num_receiver: 8, // 收付款人数量
                num_users: 7, // 登录人数
                is_order: false, // 订单信息----是否订购-----------
                num_order_days: 0, // 订购的天数
                num_remain_days: 0 // 可用时间
            }
            val.roles=[{remark:'管理员'},{remark:'老板'}]
            _corp = val.companyinfo
          }
          let _role_name = val.roles.map(r => r.remark);
          // _role_name = _role_name.length ? _role_name.join('、') : '无';
          let _isCashier = _role_name.includes('出纳');
          val.isCashier = _isCashier;
          val.corpDesc = `老板人数 ${_corp.num_boss} 人  可用时长 ${_corp.num_remain_days} 天`
          if(!_isCashier){
             val.corpDesc =  ' 【首席财务官-发现-安全管理-权限管理】 选择出纳开始记账'
          }
         
        })
      }
      return this.corpDatas
    },
  },
  created() {
    let _self = this; 
    debugger
    let _code = _self.corpCode[1]

    // ------------模拟扫码----------------
    // this.corpDatas = [
    //   {"corpid":"dingb642f8f8960636e335c2f4657eb6378f","dinguserid":"manager2513","name":"北京毅行千里企业管理服务有限责任公司"},
    //   {"corpid":"ding56ee0f8b2056aaf235c2f4657eb6378f","dinguserid":"3425461329429481","name":"花繁树下测试公司"},
    //   {"corpid":"dingc2d71ba9b26822b535c2f4657eb6378f","dinguserid":"3425461329429481","name":"哒哒商贸"}
    // ]

    getCorpList(_code).then(res=>{
        _self.corpSign = res.data.sign // || _self.corpSign
        let _rdata = res.data.data
        if(_rdata.length >0){
          _self.corpDatas = _rdata
        }
    })
  },
  methods: {
    ...mapActions(["setUser",'setEditId']),
    chooseCorp(corp) {
      corp.corpSign = this.corpSign
// corpSign
// .corpid, item.dinguserid, item.isCashier
      this.$emit('chooseCorp',corp)
    },
    handleBack() {
        history.go(-1);
    },
    loginDemo(){
      this.$emit('loginDemo')
    }
  }
};
</script>

<style>
 
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
th,
td {
      padding: 16px 0 !important;
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
