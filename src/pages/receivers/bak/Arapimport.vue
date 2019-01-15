<template>
  <div>
    <v-row>
      <v-col span="8">
        <p class="import-row-title">导入应收应付数据</p>
      </v-col>
      <v-col span="8" offset="8" order="1" style="text-align:right">
      </v-col>
    </v-row>
   
     
    <v-row class="import-row">
      <v-col span="4">
        <div class="import-item-name">导入文件：</div>
      </v-col>
      <v-col span="10">
        <v-upload :name="name" :action="action" drag @change="onChange" :before-uploadcheck="beforeUploadcheck" :file-list="fileList">
          <p class="ant-upload-drag-icon import-row">
              <a-icon  type="cloud-upload-o"></a-icon >
          </p>
          <p class="ant-upload-text import-row">点击上传</p>
          <p class="ant-upload-hint">支持的Excel文件格式: csv, xls, xlsx</p>
          <p class="import-row" />
        </v-upload>
      </v-col>
    </v-row>
    <v-row>
        <v-col span="10" offset="4" v-if="uploadedFile">
            <p style="margin-top: 8px; font-size: 13px; height: 24px; line-height: 24px;">{{uploadedFile}} <span style="color: rgb(98, 212, 21); display: inline-block; margin-left: 20px;">上传成功</span></p>
        </v-col>
        <v-col span="10" offset="4" v-if="nouploadedFile">
            <p style="margin-top: 8px; font-size: 13px; height: 24px; line-height: 24px;">{{nouploadedFile}} <span style="color: rgb(255, 0, 0); display: inline-block; margin-left: 20px;">上传失败</span></p>
        </v-col>
    </v-row>

    
 
    <!-- 上传提示 -->
    <v-modal :visible="specVisiblea" :closable=false>
      <div style="text-align:center">{{acountwater}}</div>
      <div slot="footer" style="text-align: center;">
          <v-button type="primary" @click="specCancela">我知道了</v-button>
      </div>
    </v-modal>
    
    <v-row class="import-row">
       <v-col span="4">
      </v-col>
       <v-col span="8">
         <div class="import-item-name">2.也可按照以下格式进行普通流水账文件的直接导入：</div>
      </v-col>
      <v-col span="12">
      </v-col>
    </v-row>
    <v-row class="import-row">
      <v-col span="4">
      </v-col>
      <v-col span="11">
        <img src="../../assets/img/tempexcel.png" width="100%" style="border:2px solid #eeeeee;border-radius:8px;" />
      </v-col>
      <v-col span="9">
        <p class="import-row-desc-a" style="margin-left:10px;"><a :href="getDownloadTemplateUrl('arapimport.xlsx')" download="导入应收应付文件模板.xlsx" >下载模板</a></p>
      </v-col>
    </v-row>




    <v-row>
      <v-col span="2">
        <div class="import-item-name"></div>
      </v-col>
      <v-col span="20" offset="2">
        <div style="text-align:left;color:#808080;">
          <p>格式参考上图，填写收付款人的信息，可方便进行流水的管理和分析。</p>
          <p>如果流水的收付款人已经录入过，则只要填写显示名称即可将流水归到其名下；</p>
          <p>如果收付款人未录入过，则会新建该收付款人。</p>
        </div>
      </v-col>
      <v-col span="2">
        <div class="import-item-name"></div>
      </v-col>
    </v-row>


    <v-row class="import-row">
      <v-col span="24">
        <p class="import-row-title import-row-title2">导入历史</p>
      </v-col>
    </v-row>
    <v-row class="import-row">
      <v-col span="24">
        <div id="arapimport">

        
        <a-table v-if="dataSource.length"  :columns="columns" :dataSource="dataSource" bordered class="arap-table">
          <span slot="order" slot-scope="text,record,index" style="padding-left:5px;padding-right:0px;">
            {{index+1}}
          </span>
          <span  slot="action" slot-scope="text,record,index">
            <v-popconfirm  title="删除该记录不会删除导入的流水，是否继续？" @confirm="removeFile(record.fid)">
                <span  class="deleteFile">
                  <a-icon  type="delete" class="import-icon"></a-icon >
                </span>
            </v-popconfirm>
           </span>
        </a-table>
        <div v-else class="nodataimg" style="width:100%;">
              <img src="../../assets/img/nodata.svg" alt="">
              <p>暂无倒入记录</p>
          </div>
        </div>
        <!-- <v-table :data="dataSource" :columns="columns" style="height: 400px !important;" bordered ref="xtable">
          <template slot="th" slot-scope="props">
            <strong v-if="props.column.field=='button'"></strong>
            <strong v-else v-html="props.title"></strong>
          </template>
          <template slot="td" slot-scope="props">
              <div v-if="props.column.field=='button'">
                
                <a :href="getDownloadUrl(props.item.fid)" :download="props.item.file">
                  <a-icon  type="download" class="import-icon"></a-icon >
                </a>
                <v-popconfirm  title="删除该记录不会删除导入的流水，是否继续？" @confirm="removeFile(props.item.fid)" :placement="props.index===0?'left':'leftBottom'">
                  <span  class="deleteFile">
                    <a-icon  type="delete" class="import-icon"></a-icon >
                  </span>
                </v-popconfirm>
                
              </div>
              <span v-else v-html="props.content"></span>
          </template> 
        </v-table> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  searchEvents,
  saveEvents,
  getMessages,
  sendMessage
} from "../../models/users";
// import { searchAccounts, statMoneyflows } from "../../models/moneyFlow";
import {
  searchFiles,
  downloadUrl,
  downloadTemplateUrl,
  uploadUrl,
  delFile,
  typeFile
} from "../../models/file";
import axios from "axios";
import _ from "lodash";

function groupBy(array, f) {
  let groups = {};
  array.forEach(function(o) {
    let group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}

export default {
  data() {
    return {
      showStep: false,
      specVisiblea: false,
      importStep: 0,
      dataRange: "0",
      accountsComplete: [],
      uploadedFile: "",
      nouploadedFile: "",
      instructionsIsShow: false,
      fileList: [],
      name: "files",
      dataSource:[],
      columns: [
        {
        title: '导入日期',
        dataIndex: 'date', 
        scopedSlots: { customRender: 'date' }
      },
      {
        title: '导入文件名',
        dataIndex: 'file', 
        scopedSlots: { customRender: 'file' }
      },
      {
        title: '数据条目数',
        dataIndex: 'rows', 
        scopedSlots: { customRender: 'rows' }
      },
      {
        title: '导入人',
        dataIndex: 'user', 
        scopedSlots: { customRender: 'user' }
      },
      {
        title: '操作',
        key: 'action',
        width: '10%',
        scopedSlots: { customRender: 'action' },
        className: 'tableAlignCenter'
      } 
      ], 
      // columns: [
      //   { title: "导入日期", field: "date", width: "10%" },
      //   // { title: "导入账户", field: "accountname", width: "10%" },
      //   { title: "导入文件名", field: "file", width: "10%" },
      //   { title: "数据条目数", field: "rows", width: "8%" },
      //   { title: "导入人", field: "user", width: "8%" },
      //   // { title: "备注", field: "value" },
      //   { title: "", field: "button", width: "10%" }
      // ],
      visible: false,
      editOptions: {
        account: []
      },
      acountwater: "",
      yhcom: "default",
      yxtypes:[]
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    action() {
      return (
        uploadUrl +
        "?access-token=" +
        this.currentUser.token +
        "&desc=应收应付"+
        "&type=arap"
        
      );
    },
    sendDisabled() {
      return this.importStep > 1;
    },
    dataTitle() {
      // return "已录入" + this.dataRange + "个月";
      return "已完成" + this.accountsComplete.length + "个帐户";
    },
    dataDesc() {
      let _accounts =
        this.editOptions.account.length - this.accountsComplete.length;
      if (_accounts < 1) return "";
      // let _accountsName = "";
      // for (let i=0;i<this.accountsComplete.length;i++) {
      //   const _id = this.accountsComplete[i].id;
      //   for (let j=0;j<this.editOptions.account.length;j++) {
      //     const acc = this.editOptions.account[j];
      //     const _acc_ID = acc.id;
      //     if (_id === _acc_ID) {
      //       _accountsName += acc.name+'，';
      //       break;
      //     }
      //   }
      // }

      return "(还需完成" + _accounts + "个帐户)";
    }
  },
  created() {
    // this.getList();
    // console.log(this.editOptions.account)
  },
  methods: {
    specCancela() {
      this.specVisiblea = false;
    },
    getDownloadUrl(fid) {
      let _surl =
        downloadUrl.url +
        "?access-token=" +
        this.currentUser.token +
        "&fid=" +
        fid;
      return _surl;
    },
    getDownloadTemplateUrl(fileName) {
      let _surl =
        downloadTemplateUrl +
        "?token=" +
        this.currentUser.token +
        "&file=" +
        fileName;
      return _surl;
    },
    removeFile(fid) {
      delFile({
        fid: fid,
        status: 1
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getList();
          this.updateStepState();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    getAccountsComplete(data) {
      // console.log(data);
      const _accounts = _.groupBy(data, "type");
      // console.log(_accounts);
      // console.log(this.currentUser);

      let _accountsComplete = [];
      for (let p in _accounts) {
        //遍历json对象的每个key/value对,p为key
        const _accMonths = _accounts[p];
        if (_accMonths.length >= this.currentUser.monthrange) {
          _accountsComplete.push({ id: p });
        }
      }
      return _accountsComplete;
    },
    getStep(filelist) {
      // debugger;
      let _self = this;
      if (_self.currentUser.hasaccount == 0) {
        _self.importStep = -1;
      } else {
        _self.importStep = 1;
      }
      if (filelist.length > 0) {
        searchEvents({}).then(res => {
          let _data = res.data.data;
          let _info = {
            loginApp: _data.filter(val => val.name == "loginApp" && val.value)
              .length, //老板是否登录app事件
            sendBoss: _data.filter(val => val.name == "sendBoss" && val.value)
              .length //是否给老板发送过完成上传的消息
          };

          // console.log(_self.currentUser)
          if (_info.loginApp) {
            _self.showStep = false;
          } else {
            _self.showStep = true;
            _self.updateStepState();
          }
        });
      } else {
        _self.showStep = true;
        _self.instructionsIsShow = true;
      }
    },
    getList() {
      let that = this;
      searchFiles({"type":"arap"}).then(res => {
        if (res.data.code == 200) {
          that.getStep(res.data.data);
          that.dataSource.splice(0, that.dataSource.length);

          for (let i = 0, l = res.data.data.length; i < l; i++) {
            if(res.data.data[i].rows!=0){
            that.dataSource.push(res.data.data[i]);              
            }
          }
        }
      });
    },
    // beforeUpload(file) {
    //   if (this.newFile.accountid == 0) {
    //     this.$message.error("请选择导入文件");
    //     this.fileList = [];
    //     return false;
    //   } else {
    //   }
    //   // if (this.yhcom == "") {
    //   //   this.$message.error("请选择导入账户的平台");
    //   //   this.fileList = [];
    //   //   return false;
    //   // }
    // },
    updateStepState() {
      let _self = this;
      if (_self.showStep === false) return;
      statMoneyflows({
        type: 3
      }).then(sres => {
        if (sres.data.code == 200) {
          // debugger;
          if (sres.data.data) {
            let _months = sres.data.data;
            _self.dataRange = _months.length;
            // let _dateMonths = _self.currentUser.monthrange - _self.dataRange

            // let _accountMonths = groupBy(_months, function(item){ return [item.type]});
            // _self.accountsComplete= _accountMonths.filter(val=>val.length>(_self.currentUser.monthrange-1)).length
            _self.accountsComplete = _self.getAccountsComplete(_months);

            // console.log(_self.accountsComplete,_self.currentUser.hasaccount)
            // console.log("test my account")
            // console.log(_self.accountsComplete)
            // _accountMonths.sort(function (a,b) {
            //     return b.length - a.length;
            // });

            // _accountMonths[0].length; //最长
            // _accountMonths[(_accountMonths.length-1)].length; //最短

            if (
              _self.accountsComplete.length === _self.editOptions.account.length
            ) {
              _self.importStep = 2;
            } else {
              _self.importStep = 1;
            }
          }
        }
      });
    },
    // beforeUploadcheck(files) {
    //   let _setu=this.dataSource.data;
    //   let _res = true;
    //   for(let i = 0 ; i < _setu.length;i++){
    //     if(_setu[i].file==files[0].name){
    //       // console.log("7777777777777777777777777777777")
    //       this.$message.error("倒入过了这个文件");                
    //       _res =  false;
    //       break;
    //     }
    //   }
    //   return _res;
    // },
    beforeUploadcheck(files) {
      let _setu=this.dataSource;
      let _res = true;
      for(let i = 0 ; i < _setu.length;i++){
        if(_setu[i].file==files[0].name){
          // console.log("7777777777777777777777777777777")
          this.$message.error("这个文件已经上传过了，系统不会录入重复的数据。");                
          _res =  false;
          break;
        }
      }
      return _res;
    },
    onChange(info) {
      // let _self=this;
      if (info.file.status === "done") {
        // this.$message.success("上传成功");
        // console.log(event.currentTarget.response)
        const _data = JSON.parse(event.currentTarget.response);
        this.acountwater = _data.data[0].rows;
        this.specVisiblea = true;
        this.fileList = [];
        this.getList();
        this.updateStepState();
        if (this.acountwater==undefined) {
          this.$message.error("上传失败");
        this.acountwater="导入失败，需导入正确的应收应付导出文件"                  
          this.nouploadedFile = info.file.name;
          this.uploadedFile = false;          
        } else {
          if(this.acountwater==0){
          this.$message.error("上传失败");
          this.acountwater="导入失败，需导入正确的应收应付导出文件"                  
          this.nouploadedFile = info.file.name;
          this.uploadedFile = false;
          }else{
          this.$message.success("上传成功");
          this.acountwater="成功导入"+this.acountwater+"条数据";          
          this.uploadedFile = info.file.name;
          this.nouploadedFile = false; 
          }                  
          
        }
      } else if (info.file.status === "error") {
        this.$message.error("上传失败");
        this.acountwater="导入失败，需导入正确的应收应付导出文件"                
        this.nouploadedFile = info.file.name; 
          this.uploadedFile = false;                   
              
      }
    }
  }
};
</script>

<style>
#Choice {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  outline: 0;
  -webkit-overflow-scrolling: touch;
  background-color: rgb(0, 0, 0);
  filter: alpha(opacity=60);
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.choice_tuuui {
  position: relative;
  width: 100px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  color: #3296fa;
  cursor: pointer;
  margin-left: 32px;
  top: 61px;
  left: 350px;
  background: #fff;
  text-align: center;
}
.choice_tutu {
  width: 216px;
  height: 100px;
  background-image: url(../../../static/img/pointer.png);
  background-repeat: no-repeat;
  position: absolute;
  left: 27rem;
  top: 5rem;
}
.choice_tctc {
  position: absolute;
  top: 2rem;
  left: 8rem;
  font-size: 20px;
  color: #efefef;
  border: 1px solid #fff;
  float: right;
  cursor: pointer;
  border-radius: 50%;
  width: 25rem;
  height: 6rem;
  line-height: 6rem;
  text-align: center;
  margin-left: 5px;
}
.choice_zdl {
  width: 100px;
  line-height: 30px;
  border: 1px solid;
  border-radius: 27px;
  float: right;
}
.import-row-title {
  font-size: 18px;
  text-align: start;
  margin-top: 0px;
}
.import-row {
  padding-top: 16px;
}
.import-row-title2 {
  padding-top: 8px;
  border-top: 1px solid #ddd;
}
.import-item-name {
  /* text-align: end; */
  padding-top: 8px;
}
.import-row-goback {
  font-size: 16px;
}
.import-row-desc-a {
  /* padding-left: 0px;
  */
  padding-top: 10px;
}
.import-row-desc-a a {
  color: LightPink;
  text-decoration: underline;
}
.import-row-desc-a a:link {
  color: LightPink;
}
.import-icon {
  margin-left: 5px;
  margin-right: 10px;
  font-size: 16px;
  color: #1e90ff;
}
.deleteFile:hover {
  cursor: pointer;
}
.yhk p {
  width: 16%;
  height: auto;
  float: left;
  padding: 10px;
}
.yhk p img {
  width: 100%;
  height: 100%;
}
.on {
  /* border: 1px solid red; */
}



#arapimport .ant-table table td:nth-of-type(1){
  text-align: center;
}
#arapimport .ant-table table td:nth-of-type(2){
  padding-left: 10px !important;
}
#arapimport .ant-table table td:nth-of-type(3){
  padding-left: 10px !important;
}
#arapimport .ant-table table td:nth-of-type(4){
  padding-left: 10px !important;
}
#arapimport .ant-table table td:nth-of-type(5){
  /* padding-left: 30px !important; */
  text-align: center;
}





#arapimport .ant-table table th:nth-of-type(1){
  text-align: center;
}
#arapimport .ant-table table th:nth-of-type(2){
  padding-left: 10px !important;
}
#arapimport .ant-table table th:nth-of-type(3){
  padding-left: 10px !important;
}
#arapimport .ant-table table th:nth-of-type(4){
  padding-left: 10px !important;
}
#arapimport .ant-table table th:nth-of-type(5){
  text-align: center;
}

</style>
