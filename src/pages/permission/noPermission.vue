<template>
    <div id="noPermission">
        <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1000; background-color: #fff;" v-if="showCover"></div>
        <a-row>
            <!-- <a-col :span="2">
                <a-button style="margin-left: 20px; height: 32px;" icon="rollback" @click="handleBack" v-if="showBack">返回</a-button>
            </a-col> -->
            <a-col :span="12" :offset="6">
                <div style="width: 100%; text-align: center; margin-bottom: 10px;">
                    <img width="100" src="../../../static/img/bamaiprod.jpg" alt="首席财务官">
                    <h2>首席财务官</h2>
                    <h6>管理好公司，就是管好现金流</h6>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="20" :offset="2">
                <div>
                    <a-row>
                        <a-col :span="12" style="margin-top: 80px;">
                            <h4>请授权出纳进行记账</h4>
                            <p style="font-size: 16px; margin-top: 16px;">您的权限是：{{roleNames}}</p>
                            <p style="font-size: 16px; margin-top: 32px;">
                                您可以 <a-button type="primary" size="large" @click="goAuth">进入授权页</a-button>
                                ，或者 <a-button size="large" @click="ddTest">体验【首席财务官】</a-button>
                                </p>
                            <!-- <p style="font-size: 16px; margin-top: 32px;">或者 <a-button size="large" @click="ddTest">体验Demo</a-button></p> -->
                        </a-col>
                        <a-col :span="12">
                            <img src="../../../static/img/404.jpg" style="width: 50%; margin-top: 40px;" alt="">
                            <img src="../../../static/img/libai.png" style="width: 30%; margin-top: 10px;" alt="">
                        </a-col>
                    </a-row>
                </div> 
            </a-col>
        </a-row>
       
        <div style="position: absolute; bottom: 10px; left: 0; width: 100%; font-size: 16px;">
            <p style="text-align: center;">毅行团队出品</p>
            <p style="margin-top: 10px; font-size: 14px;">如有疑问请联系客服: alan19911</p>
            
        </div>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex';

import { appUserLogin, ddUserLogin } from "../../models/users";

export default {
    data() {
        return {
            showCover: true
        }
    },
    computed: {
        ...mapGetters(['currentUser']),
        showBack() {
            return localStorage.getItem('showLogout') == '1';
        },
        roleNames(){
            return this.currentUser.roles.map(r => r.remark)
        }
    },
    mounted() {
        if (!this.currentUser.roles.map(r => r.name).some(val=> val=='ROLE_ADMIN'||val=='ROLE_BOSS' )) {
            // 非管理员进demo
            this.ddTest();
            this.showCover = false  
        } else {
            this.showCover = false;
        }
    },
    methods: {
        ...mapActions(['setUser']),
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
                if (res.status === 200 && res.data.code === 200) {
                    if(res.data.roles.length){
                        res.data.corpid = 'dingc2d71ba9b26822b535c2f4657eb6378f' //哒哒商贸
                        _self.setUser(res.data)
                        _self.$bus.$emit('showDemoNotification');
                        let tour = localStorage.getItem('tour');
                        this.showCover = false;
                        if (tour == 'true') {
                            _self.$router.replace({name: 'Dashboard'});
                        } else {
                            _self.$router.replace({name: 'Demomodel'})
                        }
                    }else{
                        // this.$warning({
                        //     title: '登录',
                        //     content: '未授权用户，请管理员授权',
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
        goAuth() { // 管理员进入授权页
            this.$router.push({name: 'Permission'});
        },
        handleBack() {
            location = location.origin;
        }
    }
}
</script>

<style>
#noPermission {
    position: fixed;
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
