<template>
 <div>
   <a-row>
            <a-col :span="1" style="min-width:40px;">
                <p class="receiver-content-type">类型</p>
            </a-col>
        <a-col :span="20" style="min-width:200px;">
            <v-ys-tags :tags="logFlags" @tagsClick="onCheckType" />
        </a-col>
    </a-row>

    <a-row>
       <a-col >
         <div 
            class="demo-infinite-container" 
            v-infinite-scroll="handleInfiniteOnLoad" 
            :infinite-scroll-disabled="busy"
            :infinite-scroll-distance="10"
          >
            <a-list
              :dataSource="listDatas"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :description="item.desc">
                  <a slot="title" >{{item.value}}</a>
                  <!-- <a-avatar  /> -->
                  <a-avatar size="large" icon="user" :src="item.avatar" slot="avatar" style="backgroundColor:#87d068"/>
                </a-list-item-meta>
                <div style="color:#52c41a;">{{item.timdata}}</div>
              </a-list-item>
              <a-spin v-if="loading && !busy" class="demo-loading" />
            </a-list>
          </div>

      <!-- <div 
        class="demo-infinite-container" 
        v-infinite-scroll="handleInfiniteOnLoad" 
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10"
      >
        <a-list
          :dataSource="listDatas"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-list-item-meta :description="item.desc">
              <a slot="title" >{{item.value}}</a>
              <a-avatar slot="avatar" :src="item.avatar" />
            </a-list-item-meta>
            <div>{{item.timdata}}</div>
          </a-list-item>
          <a-spin v-if="loading && !busy" class="demo-loading" />
        </a-list>
      </div> -->
      </a-col >
    </a-row>

 </div>

</template>
<script> 
//npm-run-all --parallel dev-server
import infiniteScroll from 'vue-infinite-scroll'
import { searchEvent } from "../../models/pages"
import moment from 'moment'
export default {
  directives: { infiniteScroll },
  data () {
    return {
      data: [],
      start:moment().subtract(100, 'days'),
      end:moment(),
      logFlags:[
          {
              id: 'boss_login_app',
              name: "老板看帐",
              isActive: true
          },
          {
              id: 'cashier_login',
              name: "出纳登陆",
              isActive: true
          },
          {
              id: 'cashier_del_moneyflows',
              name: "删除流水",
              isActive: true
          },
          {
              id: 'cashier_export_file',
              name: "导出流水",
              isActive: true
          }],
      loading: false,
      busy: false,
    }
  },
  mounted () { 
     this.getData().then(res=>{
         this.data = res.data
     })
  },
  created(){
     this.$bus.$on('initCashierLogs', () => {
          this.getData().then(res=>{
              this.data = res.data
          })
      })
  },
  computed:{
    listDatas(){
      debugger
      let _flags = this.logFlags.filter(val=>val.isActive).map(val=>val.id)

      let _list = this.data.filter(val=>_flags.includes(val.name))
        return _list.map(val=>{
          let _uname = val.uname||'无名'
          let _udate = val.udate.substr(0, val.udate.length-2)
          return {
              value :val.value,
              avatar :val.uavatar,
              timdata: val.udate,
              desc: `${_uname}:${_udate}`
          }
        }) 
    }
    // appid:"5898"
    // apptype:"web"
    // id:"0000000065567797016556ce54420049"
    // name:"leftmenu"
    // remark:null
    // udate:"2018-08-20 18:08:07.0"
    // username:"测试出纳"
    // value:"日记账" 
  },
  methods: {
    getData () {
     return  searchEvent({
          "end": this.end.format("YYYY-MM-DD"),
          "keynames": ['cashier_del_moneyflows','cashier_export_file','cashier_login','boss_login_app'],
          'start':this.start.format("YYYY-MM-DD"),
       }).then(res=>{
          debugger
          // this.end = this.end.subtract(1,'days') 
          // this.start =this.start.subtract(1,'days') 
          // if(res.data.data.length==0){
          //   this.end = this.end.subtract(1,'days') 
          //   this.start =this.start.subtract(1,'days') 
          //   this.getData()
          // }
          return Promise.resolve(res.data)
      })
    }, 
    handleInfiniteOnLoad() {
        const data = this.data
        this.getData().then(res=>{
            this.data = data.concat(res.data)
        })
    },
    onCheckType(value) {
      let _tag  =  value.tags[value.clickTagId] 
      _tag.isActive = ! _tag.isActive; 
    },
  },
}
</script>
<style>
.demo-infinite-container {
  /* border: 1px solid #e8e8e8; */
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 500px;
}
.demo-loading {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>