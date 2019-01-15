<template>
  <div>
 
<!-- {{importStep}} {{sendDisabled}} -->
 

    <v-row>
      <v-col span="8">
        <p class="import-row-title">导入流水数据</p>
      </v-col>
      <v-col span="8" offset="8" order="1" style="text-align:right">
      </v-col>
    </v-row>
    <v-row class="import-row" id="static">
      <v-col span="4">
        <div class="import-item-name">导入账户：</div>
      </v-col>
      <v-col span="5">
        <v-select style="width: 100%" 
        :data="editOptions.account" 
        @change="accountChange" 
        :optionOnChange="true" 
        :popup-container="popupContainer"
        :allowClear="false"
        >
       
        </v-select>
      </v-col>
    </v-row>
    <!-- <v-row class="import-row"  v-show="wwh">
      <v-col span="4">
        <div class="import-item-name">导入银行：</div>
      </v-col>
      <v-col span="5">
        <v-select style="width: 100%" :data="editOptions.accounts" @change="accountChangea" :optionOnChange="true" v-model="value">
        </v-select>
      </v-col>
    </v-row> -->
     <v-row class="import-row">
      <v-col span="4">
        <div class="import-item-name">备注：</div>
      </v-col>
      <v-col span="5">
        <v-input size="large" style="width: 100%" v-model="newFile.desc"></v-input>
      </v-col>
    </v-row>
    <v-row class="import-row">
      <v-col span="4">
        <div class="import-item-name">导入文件：</div>
      </v-col>
      <v-col span="10">
        <v-upload :name="name" :action="action" drag @change="onChange" :before-upload="beforeUpload" :before-uploadcheck="beforeUploadcheck" :file-list="fileList">
          <p class="ant-upload-drag-icon import-row">
              <v-icon type="cloud-upload-o"></v-icon>
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
   
    
  <!-- <v-row class="import-row">
      <v-col span="4">
        <div class="import-item-name">说明引导：</div>
      </v-col>
      <v-col span="20">
         <p style="text-align:left;color:#808080;line-height:34px;">
          直接支持以下平台的数据文件导入
        </p>
        <div class="yhk">
          <p><img style="width:100%;height:100%;" src="../../../static/img/1.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/2.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/3.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/4.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/5.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/6.png"/></p>  
        </div>
      </v-col>
    </v-row> -->
    <!-- 上传提示 -->
    <v-modal :visible="specVisiblea" :closable=false>
      <div style="text-align:center">{{acountwater}}</div>
      <div slot="footer" style="text-align: center;">
          <v-button type="primary" @click="specCancela">我知道了</v-button>
      </div>
    </v-modal>

     <v-row class="import-row">
       <v-col span="4">
        <div class="import-item-name">说明 ：</div>         
      </v-col>
       <v-col span="20">
         <div class="import-item-name" style="text-align:left;">1.支持以下银行导出的流水的直接导入：</div>
      </v-col>
    </v-row>
    <v-row class="import-row">
      <v-col span="4">
      </v-col>
      <v-col span="20">
        <div class="yhk">
          <p><img style="width:100%;height:100%;" src="../../../static/img/1.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/2.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/3.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/4.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/5.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/6.png"/></p>  
        </div>
      </v-col>
      <v-col span="4">
      </v-col>
      <v-col span="20">
        <div class="yhk">
          <p><img style="width:100%;height:100%;" src="../../../static/img/7.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/8.png"/></p>
          <p><img style="width:100%;height:100%;" src="../../../static/img/9.png"/></p>
        </div>
      </v-col>
    </v-row>
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
        <p class="import-row-desc-a" style="margin-left:10px;"><a :href="getDownloadTemplateUrl('import.xlsx')" download="导入文件模板.xlsx" >下载模板</a></p>
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
        <v-table :data="dataSource" :columns="columns" bordered ref="xtable">
          <template slot="th" slot-scope="props">
            <strong v-if="props.column.field=='button'"></strong>
            <strong v-else v-html="props.title"></strong>
          </template>
          <template slot="td" slot-scope="props">
              <div v-if="props.column.field=='button'">
                
                <a :href="getDownloadUrl(props.item.fid)" :download="props.item.file">
                  <v-icon type="download" class="import-icon"></v-icon>
                </a>
                <v-popconfirm  title="删除该记录不会删除导入的流水，是否继续？" @confirm="removeFile(props.item.fid)" :placement="props.index===0?'left':'leftBottom'">
                  <span  class="deleteFile">
                    <v-icon type="delete" class="import-icon"></v-icon>
                  </span>
                </v-popconfirm>
                
              </div>
              <span v-else v-html="props.content"></span>
          </template> 
        </v-table>
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
import { format } from "date-fns";
import { searchAccounts, statMoneyflows } from "../../models/moneyFlow";
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
      wwh: true,
      importStep: 0,
      dataRange: "0",
      accountsComplete: [],
      uploadedFile: "",
      nouploadedFile: "",
      instructionsIsShow: false,
      ablaoding: false,
      fileList: [],
      workspeacs: [],
      name: "files",
      newFile: {
        accountid: 0,
        yxdesc: "",
        yxww: ""
      },
      dataSource: {
        data: []
      },
      columns: [
        { title: "导入日期", field: "date", width: "10%" },
        { title: "导入账户", field: "accountname", width: "10%" },
        { title: "导入文件名", field: "file", width: "10%" },
        { title: "数据条目数", field: "rows", width: "8%" },
        { title: "导入人", field: "user", width: "8%" },
        { title: "备注", field: "desc" },
        { title: "", field: "button", width: "10%" }
      ],
      visible: false,
      editOptions: {
        account: []
      },
      acountwater: "",
      yhcom: "default",
      yxtypes: []
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    action() {
      return (
        uploadUrl +
        "?access-token=" +
        this.currentUser.token +
        "&accountid=" +
        this.newFile.accountid +
        "&desc=" +
        this.newFile.desc +
        "&type=" +
        this.newFile.yxww
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
    // dataDesc_bak() {
    //   let _dateMonths = this.currentUser.monthrange - this.dataRange
    //   if (_dateMonths<1) {
    //     return "";
    //   } else {
    //     return "(还需" + (_dateMonths) + "个月)";
    //   }
    // }
  },
  created() {
    // const _data = {"data":[{"date":"2017-10","income":130314,"expense":-549736,"type":"yx-272e89b638abd4ab9c5cb512aa8cc19c"},{"date":"2018-01","income":394389.6,"expense":-387151.37,"type":"yx-545715039b977a651cafa10013e72765"},{"date":"2018-02","income":15801.14,"expense":-1369.13,"type":"yx-808cee715d5a003beda98634033048eb"},{"date":"2017-11","income":130314,"expense":-549736,"type":"yx-272e89b638abd4ab9c5cb512aa8cc19c"},{"date":"2018-02","income":394389.6,"expense":-387151.37,"type":"yx-545715039b977a651cafa10013e72765"},{"date":"2018-03","income":15801.14,"expense":-1369.13,"type":"yx-808cee715d5a003beda98634033048eb"}],"amount":-397744.76,"code":200,"desc":"S_OK"};
    // console.log(this.getAccountsComplete(_data.data))
    // console.log(this.editOptions.account)
    let that = this;
    searchAccounts({}).then(res => {
      if (res.data.code == 200) {
        for (let i = 0, l = res.data.data.length; i < l; i++) {
          that.editOptions.account.push({
            value: res.data.data[i].name,
            label: res.data.data[i].name,
            accountid: res.data.data[i].id,
            type: res.data.data[i].type,
            classname: res.data.data[i].classname
          });
          if (i == 0) that.label = res.data.data[i].name;
        }
      }
    });
    typeFile({}).then(res => {
      if (res.data.code == 200) {
        for (let i = 0, l = res.data.data.length; i < l; i++) {
          that.yxtypes.push({
            desc: res.data.data[i].desc,
            type: res.data.data[i].type
          });
        }
      }
    });
    this.getList();
    // console.log(this.editOptions.account)
  },
  methods: {
    popupContainer() {
      return document.getElementById("static");
    },
    sendBossMessage() {
      // debugger;
      sendMessage({
        agent_id: this.currentUser.agent_id,
        corp_token: this.currentUser.corp_token,
        to_user: "boss",
        msg_title: "完成数据上传",
        msg_text:
          this.currentUser.name +
          "已经按要求完成了数据的上传，请登录首席财务官查看。",
        msg_url: "https://yixinglab.hz.taeapp.com",
        msg_type: "text"
      }).then(res => {
        let _data = res.data;
        if (res.data.code === 200) {
          saveEvents({
            name: "sendBoss",
            value: "true" //sendBoss:true,sendFinance:'true',
          });
          this.$message.success("发送成功");
          this.showStep = false;
        } else {
          this.ablaoding = false;
          this.$message.error("发送失败，请重试");
        }
      });
    },
    getname(classname) {
      return this.yxtypes.find(n => n.type == classname);
    },
    tuiui() {
      let zhezhao = false;
      this.instructionsIsShow = zhezhao;
      localStorage.setItem("zhezhaoshow", true);
    },
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
          this.ablaoding = false;
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
      let _list = filelist.filter(val => val.rows);
      // console.dir(_list)
      // if (_list.length > 0) {
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
          let _zhezhao = localStorage.getItem("zhezhaoshow");
          if (_zhezhao) {
          } else {
            _self.instructionsIsShow = true;
          }
          _self.updateStepState();
        }
      });
      // } else {
      //   // _self.showStep = true;

      //   let _zhezhao = localStorage.getItem("zhezhaoshow");
      //   if (_zhezhao) {
      //   } else {
      //     _self.instructionsIsShow = true;
      //   }
      // }
    },
    getList() {
      let that = this;
      searchFiles({ status: 1 }).then(res => {
        if (res.data.code == 200) {
          // console.log(res.data.data)

          that.getStep(res.data.data);
          that.dataSource.data.splice(0, that.dataSource.data.length);

          for (let i = 0, l = res.data.data.length; i < l; i++) {
            that.workspeacs.push(res.data.data[i]);
            let item = res.data.data[i];
            if (item.desc === "undefined") {
              item.desc = "";
            }
            if (item.rows != 0) {
              that.dataSource.data.push(item);
            }
          }

          //测试
          // this.getMonthsRemaining("2017-6-2","2017-8-30")
        }
      });
    },
    goback() {
      this.$router.replace("/record");
    },
    beforeUploadcheck(files) {
      this.ablaoding = true;
      let _setu = this.dataSource.data;
      let _res = true;
      for (let i = 0; i < _setu.length; i++) {
        if (_setu[i].file == files[0].name) {
          this.ablaoding = false;
          this.$message.error("这个文件已经上传过了，系统不会录入重复的数据。");
          _res = false;
          break;
        }
      }
      return _res;
    },
    beforeUpload(file) {
      if (this.newFile.accountid == 0) {
        this.ablaoding = false;
        this.$message.error("请选择导入账户");
        this.fileList = [];
        return false;
      } else {
      }
      // if (this.yhcom == "") {
      //   this.$message.error("请选择导入账户的平台");
      //   this.fileList = [];
      //   return false;
      // }
    },
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

    // 数组减法运算 第一个参数减去第二个参数
    subtractionMonthList(list1 = [], list2 = []) {
      let curList = [];
      for (let index2 in list2) {
        for (let index1 in list1) {
          if (list1[index1] === list2[index2]) {
            delete list1[index1];
            break;
          }
        }
      }
      for (let index in list1) {
        if (list1[index]) curList.push(list1[index]);
      }
      return curList;
    },
    // 获取月份数组
    getMonthList(startDate, endDate) {
      let monthList = [];
      if (!startDate && !endDate) return monthList;
      let _startDate = new Date(startDate);
      let _endDate = new Date(endDate);
      _startDate.setDate(1);
      _endDate.setDate(5);
      for (_startDate; _startDate < _endDate; ) {
        monthList.push(
          _startDate.getFullYear() + "-" + (_startDate.getMonth() + 1)
        );
        _startDate.setMonth(_startDate.getMonth() + 1);
      }

      return monthList;
    },
    // 获取剩余月数数
    getMonthsRemaining(curAccountId, curFile_StartDate, curFile_EndDate) {
      // 当前文件 起始结束日期
      // 总时间统计数组
      let monthTotal = [];
      let curDate = new Date();
      curDate.setDate(1); // 避免28号以后 二月bug
      for (let i = 0; i < this.currentUser.monthrange; i++) {
        curDate.setMonth(curDate.getMonth() - 1);
        monthTotal.push(curDate.getFullYear() + "-" + (curDate.getMonth() + 1));
      }
      // console.log("monthTotal",monthTotal);

      // 各个文件统计 月数数组   数组相减
      for (let i = 0; i < this.dataSource.data.length; i++) {
        const _item = this.dataSource.data[i];
        if (_item.accountid !== curAccountId) continue;
        const _monthList = this.getMonthList(_item.start, _item.end);
        // console.log("_monthList", i, _item.start,_item.end,_monthList);
        monthTotal = this.subtractionMonthList(monthTotal, _monthList);
        if (monthTotal.length === 0) break;
        // console.log("monthTotal",i, monthTotal);
      }

      if (monthTotal.length > 0) {
        const _monthList = this.getMonthList(
          curFile_StartDate,
          curFile_EndDate
        );
        // console.log("_monthList", curFile_StartDate,curFile_EndDate,_monthList);
        monthTotal = this.subtractionMonthList(monthTotal, _monthList);
        // console.log("monthTotal", monthTotal);
      }

      // console.log("monthTotal.length", monthTotal.length);
      return monthTotal.length;
    },

    onChange(info) {
      // let _self=this;

      //导入数据时间获取
      if (info.file.status === "done") {
        // this.$message.success("上传成功");
        // console.log(event.currentTarget.response)

        const _data = JSON.parse(event.currentTarget.response);
        if (_data.data && _data.data.length > 0) {
          this.acountwater = _data.data[0].rows;

          const _uploadFileData = _data.data[0];
          const _remainingMonths = this.getMonthsRemaining(
            _uploadFileData.accountid,
            _uploadFileData.start,
            _uploadFileData.end
          );

          this.fileList = [];

          if (this.acountwater == undefined || _data.code !== 200) {
            this.ablaoding = false;
            this.$message.error("上传失败");
            this.acountwater =
              "导入失败，需导入正确的" + this.newFile.yxdesc + "流水导出文件";
            this.nouploadedFile = info.file.name;
            this.uploadedFile = false;
            this.newFile.desc = "";
          } else {
            if (this.acountwater == 0) {
              this.ablaoding = false;
              this.$message.error("上传失败");
              this.acountwater = "此文件不包含任何数据，请检查。";
              this.nouploadedFile = info.file.name;
              this.uploadedFile = false;
              this.newFile.desc = "";
            } else {
              if (_remainingMonths > 0) {
                this.ablaoding = false;
                this.$message.success("上传成功");
                this.acountwater =
                  "成功导入" +
                  _uploadFileData.start +
                  "至" +
                  _uploadFileData.end +
                  "的数据，" +
                  "还差" +
                  _remainingMonths +
                  "个月数据需要导入";
                this.uploadedFile = info.file.name;
                this.nouploadedFile = false;
                this.newFile.desc = "";
              } else {
                this.ablaoding = false;
                this.$message.success("上传成功");
                this.acountwater = "成功导入" + this.acountwater + "条数据";
                this.uploadedFile = info.file.name;
                this.nouploadedFile = false;
                this.newFile.desc = "";
              }
              this.getList();
              this.updateStepState();
            }
          }
        } else {
          this.ablaoding = false;
          this.$message.error("上传失败");
          this.acountwater = "此文件格式不正确，请参考模版。";
          this.nouploadedFile = info.file.name;
          this.uploadedFile = false;
          this.newFile.desc = "";
        }

        this.specVisiblea = true;
      } else if (info.file.status === "error") {
        this.ablaoding = false;
        this.$message.error("上传失败");
        this.acountwater =
          "导入失败，需导入正确的" + this.newFile.yxdesc + "流水导出文件";
        console.log(this.acountwater);

        this.nouploadedFile = info.file.name;
        this.uploadedFile = false;
        this.newFile.desc = "";
        this.specVisiblea = true;
      }
    },
    accountChange(opt) {
      // this.newFile.accountid = opt.accountid;
      // console.log(opt.type)
      if (opt.classname == "") {
        this.newFile.yxww = "default";
        this.newFile.accountid = opt.accountid;
        this.newFile.yxdesc = "现金账户";
      } else {
        this.newFile.accountid = opt.accountid;
        this.newFile.yxww = opt.classname;
        this.newFile.yxdesc = this.getname(opt.classname).desc;
      }
      // if(opt.type=='银行账户'){
      //   this.wwh=true;
      // }else{
      //   this.wwh=false;
      //   this.yhcom ="default";
      //   this.yhdec ="";
      // }
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
  border: 1px solid red;
}
</style>
