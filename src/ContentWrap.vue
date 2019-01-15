<template>
    <div id="content-wrap" class="content-wrapper">
        <section id="container">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import { setEvent } from "./models/pages"

export default {
    name: 'yx-content-wrap',
    props:{
      user: {
        type: Object, 
        default () {
            return {}
        }
      }, 
    //   menuItems:Array
    },
    data(){
        return {
          adminItem:{// 角色与权限管理
            type: 'item',
            icon: 'user-add',
            name: '角色与权限管理',
            children: [{
                    name: '权限管理',
                    father: '角色与权限管理',
                    selected:false,
                    router: {
                        name: 'Permission'
                    }
                }]
          },
          demomodel:{
            type: 'item',
            icon: 'desktop',
            name: 'demo',
            router: {
                name: 'Demomodel'
            }
          }, 
        }
    },
    computed: {
        ...mapGetters(["currentUser",'editId'])
    },
    // watch:{
    //     user(newVal,oldVal){
    //         if (newVal === oldVal) return; 
    //     }
    // },
    created() {
        this.creatPage() 
    },
    methods:{ 
      // 判断是否包含 角色名
      isContain(roleName) {
        if (!this.currentUser.roles) return false;
        return this.currentUser.roles.some(sval=> sval.name == roleName) 
      },
      creatPage(){
            let _self = this;
            // let replaceUrl = null;
            // let replaceMenuItemName = null;
            
            // 1、 首先判断是否 出纳   是 直接进入日记账结束； 否进入下一步
            // 2、 判断是否管理员、是进入授权管理，只有授权一个目录，结束；否进入下一步
            // 3、 进入未授权页
            // const isContainFinance = _self.isContain('ROLE_CASHIER');
            // if(isContainFinance){
            //     // _menuItems = menuItems.concat(_menuItems)
            //      _self.menuItems[0].selected= true
            //      replaceUrl = '/dashboard' 
            //     // replaceUrl = '/cashier'
            // }
            // if(_self.isContain('ROLE_ADMIN')){ 
            //     _self.menuItems[0].push(_self.adminItem)  
                
            //     if (!isContainFinance) // 已经设置了出纳
            //         replaceUrl = '/permission' 
            // }
            // if ((_self.isContain('ROLE_USER') && _self.user.roles.length == 1) || (_self.isContain('ROLE_BOSS') && _self.user.roles.length == 1)) {
            //     replaceUrl = '/noPermission';
            // }
            if (this.user && this.user.type == 'test') {
                _self.$router.replace({name: 'noPermission'});
                return;
            }

            // 权限判断
            if (!_self.isContain('ROLE_CASHIER')) {
                _self.$router.replace({name: 'noPermission'});
            } else {
                // 出纳
                let tour = localStorage.getItem('tour');
                if (tour == 'true') {
                     setEvent({
                        "keyname": "cashier_login",
                        "keyvalue": '出纳第'+this.currentUser.loginnum+'次登陆记账'
                        })
                    _self.$router.replace({name: 'Dashboard'});
                } else {
                    // 进引导页
                    _self.$router.replace({name: 'Demomodel'})
                }
            }

            
            // _menuItems.push(_self.helpItem)  
            // if(replaceUrl == '/help' ){ 
            //     _self.helpItem.selected = true
            // } 
            // if(_self.user.location) {
            //     _self.$router.replace({'path':_self.user.location});
            //     replaceMenuItemName = _self.user.location.substring(1);
            // } else {
            //     if (replaceUrl) {
            //         _self.$router.replace({path: replaceUrl});
            //         replaceMenuItemName = replaceUrl.substring(1);
            //     }
            // }

            // _self.$bus.$emit('completeAuth', _menuItems)
            // if (replaceMenuItemName) _self.$bus.$emit('onMenuItemSelected',replaceMenuItemName);
      }
    }
}
</script>

<style>
#container {
    width: 100%;
    padding: 16px;
}
</style>
