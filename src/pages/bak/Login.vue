<template>
  <div class="login-box">
    <div class="login-logo">
      <router-link to="/"><b>Yixing</b> Bamai</router-link>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <form @submit.prevent="login">
        <div v-if="error" class="alert alert-danger">
          <a class="close" data-dismiss="alert">&times;</a>
          {{ error }}
        </div>
        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="Username" v-model="credentials.username">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Password" v-model="credentials.password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
            <label>
            <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false" style="position: relative;">
              <input type="checkbox" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);">
              <ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);">
                </ins>
            </div> Remember Me
            </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">登录</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { userLogin } from '../models/users';
  export default {
    name: 'Login',
    data: function () {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    created(){ 
        let _self = this;
        let _token =_self.getQueryString('token'); 
        if (_token) {//钉钉登录
          localStorage.setItem('access_token',_token);
          // _data.name = '钉钉Test';
          // _data.token = _data._token;
          let _name = decodeURI(_self.getQueryString('username'));
        
          console.log(_name);
     
          
          let _type =_self.getQueryString('type'); 
          if(_type=='demo'){
               _self.$router.replace('/money');//importdata
          }else{
            let _logo = decodeURIComponent(_self.getQueryString('userlogo'));
            console.log(_logo);
             _self.setUser({name:_name,token:_token,logo:_logo});
              // axios.defaults.headers.common['access-token'] = _token;
              _self.$router.push('/dashboard/v0');
              _self.setPage({name:'现金流向'});
          }


          // if(this.isMobile){
           
          //   _self.$router.replace('/money');//importdata
          // }else{
          //   _self.$router.push('/dashboard/v0');
          //   _self.setPage({name:'现金流向'});
          // }

        }
    },
    methods: {
      ...mapActions([
        'setUser',
        'setPage'
        ]),
      login: function () {
       // var store = this.$store
       let _self = this;
       let _user = _self.credentials
       userLogin(_user).then(res => {
          let _data = res.data; 
          // _data.access_token='257288fa-8c90-4f75-a536-0ab300771a1d'; 
          
          if (_data.code == 200) {
            localStorage.setItem('access_token',_data.access_token);
            _data.name = _user.username
            _data.token = _data.access_token
            _self.setUser(_data);

          if(this.isMobile){
            _self.$router.replace('/daybook');//importdata
          }else{
            _self.$router.push('/dashboard/v0');
            _self.setPage({name:'现金流向'});
          }


            // if (_data.authority == 'ROLE_USER') {
            //       _self.$router.push('/sample');//importdata
            //        _self.setPage({name:'现金流向'});//数据接入
            //   } else {
            //       _self.$router.push('/sample');
            //       _self.setPage({name:'现金流向'});
            //   }
          } 
          return _data
       }); 
      },
          // console.log(_logo);
      isMobile(){ 
        if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){ 
          
          return true;
        }else{
          return false;
        }
      },
      getQueryString: function (name) {
        var url = window.location.href;
        if (url.indexOf('?') !== -1) {
            var str = url.split('?')[1];
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                var _name = strs[i].split('=')[0];
                var _value = strs[i].split('=')[1];
                if (_name === name) {
                    return _value;
                }
            }
        }
        return null;
      } 
    }
  }
</script>
