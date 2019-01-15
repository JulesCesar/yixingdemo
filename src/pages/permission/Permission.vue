<template>
  <div id="permissionPage">
      <div>
        <a-row>
            <a-col :span="2">
                <a-button style="margin-left: 20px; height: 32px;" icon="rollback" @click="handleBack">返回</a-button>
            </a-col>
            <a-col :span="12" :offset="4">
                <div style="width: 100%; text-align: center; margin-bottom: 10px;">
                    <img src="../../../static/img/bamaiprod.jpg" width="96" alt="首席财务官">
                    <h2 style="font-size: 18px;">首席财务官</h2>
                    <h6 style="font-size: 14px;">管理好公司，就是管好现金流</h6>
                </div>
            </a-col>
        </a-row>
        <v-row>
        <v-col span="24">
            <p class="permission-content-title">为相关同事授予权限，开始使用毅行管理</p>
        </v-col>
        </v-row>
        <v-row>
        <v-col v-for="(item, index) in permissionButtons" v-if="item.visible" :span="item.span" :key='index'>       
            <v-row v-if="index<3">
            <v-col span="24" style="display: flex; justify-content: center; margin-top: 32px;">
                <img v-if="index===0" src="../../assets/img/BOSS2.png" width="200px" height="150px" />
                <img v-else-if="index===1" src="../../assets/img/jiantotu.png" style="margin-top: 60px;" />
                <img v-else src="../../assets/img/BOSS3.png" width="200px" height="150px" />
            </v-col>
            </v-row>  
        <v-row v-if="index <3">
        <v-col style="display: flex; justify-content: center; margin-top: 32px;text-align: center;">
            <div v-if="index===0">
            <h4 style="font-size:18px;">老板</h4>
            <p style="color:#ccc !important; font-size:16px;margin-top: 10px;">在移动端查看分析数据</p>
            </div> 
            <div v-else-if="index===1"></div>
            <div v-else >
            <h4 style="font-size:18px;">出纳</h4>
            <p style="color:#ccc !important; font-size:16px;margin-top: 10px;">在后台录入现金流和应收应付数据</p>
            </div>
        </v-col>  
        </v-row>
            

            <v-row v-if="index!==1">
            
            <v-col span="24" style="display: flex; justify-content: center; margin-top: 16px;">
                <v-button type="primary" size="large" @click="showModal" :disabled="index===2&&isExistCashier ?true:false">{{item.text}}</v-button>
            </v-col>
            </v-row>

        </v-col>
        
        </v-row>

        <a-row v-if="showEntrance" style="font-size: 16px; margin-top: 32px; text-align: center;">
            <a-col :span="24">
                <p>您有【出纳】权限，可以 <a-button type="primary" size="large" @click="cashierEntrance">去记账</a-button></p>
            </a-col>
        </a-row>
        
        <v-row style="margin-top: 56px;">
        <v-col span="24">
            <p class="permission-content-title2">已授权账号</p>
        </v-col>
        </v-row>
        <v-row style="margin-top: 24px;">
        <v-col span="24">
            <div id="Permission">
            <a-table class="permission-table" style="background-color: #fff;" ref="test" :dataSource="usersTable" :columns="columns" stripe bordered>
                <span slot="action" slot-scope="text, record, index">
                    <a-popconfirm title="确定解除授权？"
                    okText='确定' cancelText="取消"  
                    @confirm="() => handleDeauth(record)">
                        <a-button type="danger">解除授权</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
            </div>
        </v-col>
        </v-row>

      </div>
    <!-- {{bossIds}} -->
  </div>
</template>

<script>
import {
  appUserList,
  appUserPermission,
  clearUserAuth
} from '../../models/users.js';
import { mapGetters,mapActions } from "vuex";
import menuItems from '../../lib/slideMenuItems';

export default {
  data() {
    return {
      permissionButtons: [
        { text: '给老板授权', username:'', visible: true ,span: 11 },
        { text: 'arrow', username: null, visible: true ,span: 2 },
        { text: '给出纳授权', username: null, visible: true ,span: 11 },
        // { text: '给同事授权', visible: false ,span: 24},
      ],
      bossIndex: 0,
      arrowIndex: 1,
      financeIndex: 2,
      otherIndex: 3,
      
      bossIsExists: false, // 老板是否存在
      tellerIsExists:false, // 财务是否存在
      selectPermissionButtonText: null,
      users:[],
      usersPermission: {
        data: []
      },
      columns: [
        {title: '授权时间', dataIndex: 'date',width: '15%', },
        {title: '钉钉名', dataIndex: 'name', width: '8%',},
        {title: '角色', dataIndex: 'authority',width: '25%',},
        {title: '状态', dataIndex: 'status', width: '8%',},
        {title: '操作', dataIndex: 'action',width: '15%', scopedSlots: {customRender: 'action'}}
      ],
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      visible: false,
      permissionVisible: false,
      selectUsePermission: {},
      modalTitle: "给同事授权"
    }
  },
  computed:{
    ...mapGetters([ 
        'currentUser',
    ]),
    // authInfo(){
    //   if(this.currentUser.errcode=='60011'){
    //     return '应用中心->已开通->首席财务官->设置 中将可见范围进行调整'
    //   }else{
    //     return ""
    //   }
    // },
    // autherro(){
    //   if(this.currentUser.errcode=='60011'){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // },
    usersTable(){
      let _self = this
      // let _users = _self.users.filter(val => val.roles.length>0)

      let _users = _self.users.filter(val => {
          if (val.username == _self.currentUser.username) return true
          let _roleNames =  val.roles.map(val=>val.name)
          if(_roleNames.includes('ROLE_BOSS')) return true
          if(_roleNames.includes('ROLE_CASHIER')) return true
          return false
      })

      // debugger

      return _users.map(val => {
        let _authNames = val.roles.filter(val => val.name !='ROLE_USER' ).map(val=>val.remark)
        // _self.tellerIsExists  = _authNames.includes('ROLE_CASHIER')
        return {
          dinguserid:val.dinguserid,
          username: val.username,
          date: val.lastupdatetime,
          name: val.name,
          authority: _authNames.join('、'),
          authNames: val.roles.map(val=>val.name),
          status: '已生效' 
        }
      }) 
      // return _users.filter(val => val.roles.some(sval=>sval.name =='ROLE_ADMINISTRATOR')) //val.roles.length > 0 &&
      // return this.usersPermission.data
    },
    isExistCashier(){
      return this.usersTable.some(val=>val.authNames.indexOf('ROLE_CASHIER')>-1)
    },
    bossIds(){
      return this.usersTable.filter(val=>val.authNames.indexOf('ROLE_BOSS')>-1 && val.dinguserid).map(val=>val.dinguserid)
    },
    showEntrance() {
        let _rslt = false;
        this.users.map(item => {
            if (item.username == this.currentUser.username && item.roles.map(r => r.name).indexOf('ROLE_CASHIER') != -1) {
                _rslt = true;
            } else {
                _rslt = false;
            }
        });
        return _rslt;
    }
  },
  created() {
    this.initUsers();
  },
  methods: {
    ...mapActions([
        'setUser'
    ]),
    // 初始化 用户
    initUsers() {
      let _self = this;
      appUserList({}).then(res => {
        if ( res.status !== 200 || res.data.code !== 200) {
          _self.$message.error("初始化失败");
          return;
        }
        // console.log(res.data);
        res.data.data.map(item => {
            item.lastlogintime = item.lastlogintime.substring(0, 10);
            item.lastupdatetime = item.lastupdatetime.substring(0, 10);
        })
        _self.users = res.data.data;
        // _self.users.map(item => {
        //     if (item.username == _self.currentUser.username && item.roles.map(r => r.name).indexOf('ROLE_CASHIER') != -1) {
        //         _self.showEntrance = true;
        //     } else {
        //         _self.showEntrance = false;
        //     }
        // })
        // _self.users.map(item => {
        //     if (item.username == _self.currentUser.username && item.roles.map(r => r.name).indexOf('ROLE_CASHIER') != -1) {
        //         _self.handleChangeMenuItem(true);
        //     }
        // })
        // _self.initUsersPermision();
      });
    },
    // 初始化已经授权的用户信息;
    // initUsersPermision() {}
 
    showModal(evt) {
      if(!DingTalkPC.ua.isInDingTalk) {//window.DingTalkPC && window.DingTalkPC.ua && window.
        this.$warning({
              title: '安全提醒',
              content: '请在钉钉内使用授权功能',
        })  
        return
      }
      // TDAPP.onEvent("授权");
      debugger
      let _self = this;
      // console.log('currentUser',this.currentUser);
      _self.selectPermissionButtonText = evt.srcElement.innerText;
      _self.modalTitle = this.selectPermissionButtonText;
      // console.log(this.selectPermissionButtonText);
      // this.visible = true;
      const isBoss = _self.modalTitle === _self.permissionButtons[_self.bossIndex].text;
      const roleName = isBoss ? 'ROLE_BOSS' : 'ROLE_CASHIER'
      console.log('currentUser:',_self.currentUser)
      const ddParam = {
        title: _self.modalTitle, //标题
        multiple: isBoss, //是否多选： true多选 false单选； 默认true
        users:_self.bossIds, //默认选中的用户列表，员工userid；成功回调中应包含该信息
        corpId: _self.currentUser.corpid, //企业id
        max: 10, //人数限制，当multiple为true才生效，可选范围1-1500
        onSuccess: function(data) {
          for (let i=0;i<data.length;i++) {
            const user = data[i];
            user.userid = user.emplId;
          }
          const params = {
            appid: _self.currentUser.appid,
            corpid: _self.currentUser.corpid,
            rolename: roleName,
            users: data
          };
          appUserPermission(params).then(res=>{
            if (res.status === 200 && res.data.code === 200) {
              _self.initUsers()
            }

          })
        },
        onFail : function(err) { 
          // $vue.$warning({
          //   title: '钉钉错误',
          //   content: err.errorCode + err.errorMessage
          // })
          console.log('DingTalkPC.biz.contact.choose ERROR:',err)
           
        }
      };
      DingTalkPC.biz.contact.choose(ddParam);
    },
    handleChangeMenuItem(ifAuth) {
        if (ifAuth) {
            this.$bus.$emit('completeAuth', menuItems);
        } else {
            this.$bus.$emit('removeAuth',menuItems);
        }
    },
    handleDeauth(record) {
      let _self = this;
      clearUserAuth(record.username).then(res => {
        if (res.status === 200 && res.data.code === 200) {
          _self.$message.success('解除授权成功');
          
          //设置自己为出纳显示菜单
          _self.usersTable.map(item => {
              if (item.username == record.username && item.authority.indexOf('出纳') != -1) {
                  _self.handleChangeMenuItem(false);
              }
          })
          //
          _self.users =  _self.users.filter(item => item.username != record.username)
          
          //判断是否有出纳
          // let _finance = _self.usersTable.some(item => item.authority == '出纳');
          // if (_finance) {
          //     _self.tellerIsExists = false;
          // }

          

          // _self.usersPermission.data.map(item => {
          //     if (item.username == record.username && item.authority.indexOf('出纳') != -1) {
          //         _self.handleChangeMenuItem(false);
          //     }
          // })
          // if (record.username == _self.currentUser.username) {
          //     _self.usersPermission.data.find(item => item.username == record.username).authority = '管理员';
          // } else {
          //     _self.usersPermission.data = _self.usersPermission.data.filter(item => item.username != record.username);
          // }
          // let _finance = _self.usersPermission.data.find(item => item.authority == '出纳');
          // if (!_finance) {
          //     _self.tellerIsExists = false;
          // }
        } else {
          _self.$message.error('解除授权失败');
        }
      })
    },
    handleBack() {
        this.$router.go(-1);
    },
    cashierEntrance() {
        this.$router.replace({name: 'Dashboard'});
    }
  }
}
</script>

<style>
#permissionPage {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 999;
}
#permissionPage > div {
    width: 100%;
    padding: 24px 10%;
    background-color: #fff;
}
.permission-content-title {
  font-size: 18px;
  text-align: center;
  margin-top: 16px;
}
.permission-content-title2 {
  text-align: start;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.65);
}
.permission-form-group-title {
  text-align: start;
  border-top: 1px solid #ddd;
  padding-top: 8px;
}
.permission-table:hover {
  cursor: pointer;
}
#Permission .ant-table-body .ant-table-thead th{
  text-align: center;
}
#Permission .ant-table-body .ant-table-tbody td{
  text-align: center;
}
</style>
