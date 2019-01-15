<template>
    <div>
        <!-- {{account.id}} -->
         <!--    -->
        <account-modal :insertvisible="accountInsertvisible" @accountmodalcancel="accountModalCancel" @accountInserted="refreshAccounts"/>
        <parse-file-modal @cancelParse="cancelParse" v-if="parseVisible" :account='account' :file='file' @parseFinish='completeParse'/> 
            <div id="UploadFile">
                <a-row>
                    <a-col :span="8">
                        <div>
                            <h4 style="margin-bottom:5px;">导入账户</h4>
                            <a-select 
                                showSearch
                                placeholder="选择您的账户" 
                                :defaultValue='account.id' 
                                @change="onAccountChange" 
                                v-model="selectAccount"
                                :filterOption="filterOption"
                                style="width:100%;border: none;"
                                > 
                                <a-select-option style="border: none;" value="addAccount">
                                    <div>
                                        <span class="addReceiverIcon" style="">
                                        +
                                        </span>
                                        增加帐户
                                    </div>
                                </a-select-option> 
                                <a-select-opt-group  v-for="item in accounts" :key="item.type" >
                                    <span slot="label">{{item.type}}</span>
                                    <a-select-option  v-for="opt in item.options" 
                                    :value="opt.id" :key="opt.id" >
                                        {{opt.name}}
                                    </a-select-option> 
                                </a-select-opt-group> 

                            </a-select>
                        </div>
                        <div>
                            <h4 style="margin-top:26px;margin-bottom:6px;">备注</h4>
                            <a-input placeholder='请输入备注' v-model="fileRemark"/>
                        </div>
                    </a-col>
                    <a-col :span="16">
                       <div class="soloupload">
                            <h3>导入文件</h3>
                            <div class="upload">
                                <a-upload name='logo'
                                :fileList="fileList"
                                @remove="handleRemove"
                                :beforeUpload="beforeUpload"
                                listType='picture'>
                                <a-row>
                                    <a-col :span="24">
                                        <a-button style="margin-top: 14px;">
                                            <a-icon type='upload' /> 选择上传文件
                                        </a-button>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :span="24">
                                        
                                        <span style="color: #776969cc;font-size: 12px;">注意：支持 xlsx xls csv 三种格式</span>
                                    </a-col>
                                </a-row>
                                    
                                    
                                </a-upload>
                            </div>
                            <!-- <div style="padding-top:8px;">
                                <span style="color: #000;">注意：如果一个文件中有多个sheet，请置于不同的文件中分别上传. </span>
                                <span style="color: #776969cc;">支持 xlsx xls csv 三种格式</span>
                            </div> -->
                            <a-button
                                class="upload-demo-start"
                                type="primary"
                                @click="handleUpload"
                                :disabled="fileList.length === 0"
                                :loading="uploading"
                                >
                                {{uploading ? '上传中..' : '开始上传' }}
                            </a-button>
                        </div>
                    </a-col>
                </a-row>
            </div>
            
           
            
           
            
            
        <a-row class="import-row">
        <a-col :span="24">
             <h3>导入历史</h3>
            <!-- <p class="import-row-title import-row-title2">导入历史</p> -->
        </a-col>
        </a-row>
        <a-row class="import-row">
        <a-col :span="24">
            <div id="importData">
                <div v-if="isLoading" class="nodataimg" style="width:100%;">
                    <!-- <img src="../../assets/img/nodata.svg" alt=""> -->
                    <a-spin size="large" />
                </div>
                <div v-else>
                    <a-row style="margin-bottom: 16px;">
                        <a-col :span="24">
                            <p>总览: 导入文件 {{fileOverView.fileCount}} 个，共 {{fileOverView.dataCount}} 条数据，流水起始时间 {{fileOverView.date.start ? fileOverView.date.start.substring(0, 10) + ' 至 ' + fileOverView.date.end.substring(0, 10) : '空'}}</p>
                        </a-col>
                    </a-row>
                    <a-table :dataSource="dataSource" :columns="columns" bordered :pagination="false">
                        <span slot="indexKey" slot-scope="text,record,index" style="padding-left:5px;padding-right:0px;">
                            {{index+1}}
                        </span>
                        <span slot="curdate" slot-scope="text, record, index">
                            {{ text.substring(0, 11) }}
                        </span>
                        <span slot="account" slot-scope="text, record, index">
                            {{ text ? text.name : '' }}
                        </span>
                        <span slot="user" slot-scope="text, record, index">
                            {{ text.name || '' }}
                        </span>
                        <span slot="action" slot-scope="text,record,index">
                            <a-icon title="查看文件流水" class="deleteFile" style="margin-right: 8px;" type="file-text"  @click="viewFileMoneyflow(record)" />
                            <!-- <a-popconfirm  title="删除该记录会删除导入的流水，是否继续？" @confirm="removeFile(record)" okText='确定' cancelText="取消" > -->
                                <span  class="deleteFile" title="删除" @click="handleConfirmDelete(record)">
                                    <a-icon type="delete" style="color: red;"></a-icon>
                                </span>
                            <!-- </a-popconfirm> -->
                        </span>
                    </a-table>
                </div>
                
            </div>
        </a-col>
        </a-row>

        <!-- 删除文件提示框 -->
        <a-modal :visible="delFileModalVisible">
            <template slot="title">
                <p style="color: red;"><a-icon type="exclamation-circle-o" style="margin-right: 10px;" />删除导入的文件会删除对应的流水数据，请确认文件信息后继续！</p>
            </template>
            <template slot="footer">
                <a-button @click="cancelRemove">取消</a-button>
                <a-button type="danger" @click="removeFile(selectRemoveFile)">删除</a-button>
            </template>
            <div style="width: 80%; margin: 0 auto; font-size: 14px;">
                <p style="line-height: 2;">文件名：{{ selectRemoveFile.name }}</p>
                <p style="line-height: 2;">导入日期：{{ selectRemoveFile.curdate.substring(0, 10) }}</p>
                <p style="line-height: 2;">导入账户：{{ selectRemoveFile.account.name }}</p>
                <p style="line-height: 2;">导入人：{{ selectRemoveFile.user.name }}</p>
                <p style="line-height: 2;">数据条目数：{{ selectRemoveFile.rows }}</p>
                <p style="line-height: 2;">流水数据起始/结束日期：{{selectRemoveFile.startdate.substring(0, 10)}} / {{selectRemoveFile.enddate.substring(0, 10)}}</p>
                <p style="line-height: 2;">文件备注：{{ selectRemoveFile.remark }}</p>
            </div>
        </a-modal>

        <a-modal title="文件流水数据预览" :visible="previewMoneyflow" @cancel="closePreview" width="60%">
            <a-row style="margin-bottom: 12px;">
                <a-col :span="24">
                    <p>流水总览：流入 {{overView.in | inOut}} 流出 {{overView.out | inOut}} 盈余 {{overView.sum | inOut}} 数据条数 {{overView.count}}</p>
                </a-col>
            </a-row>
            <template slot="footer">
                <a-button type="primary" @click="closePreview">关闭</a-button>
            </template>
            <a-table :columns="prevCol" :dataSource="prevData" bordered>
                <span slot="indexKey" slot-scope="text,record,index" style="display: block; text-align: center; text-align: center; width: 100%;">
                    <span>
                        {{index+1}}
                    </span>
                </span>
                <span slot="date" slot-scope="text,record,index" style="display: block; text-align: center; width: 100%;">
                    {{text.substring(0, 10)}}
                </span>
                <span slot="remark" slot-scope="text, record,index" style="display: block; text-align: center; text-align: center; width: 100%;">
                        {{text || '' |desc}}
                </span>
                <span slot="account" slot-scope="text, record,index" style="display: block; text-align: center; text-align: center; width: 100%;">
                    {{text ? text.name : ''}}
                </span>
                <span slot="inFlow" slot-scope="text, record,index" style="display: block; text-align: center; text-align: center; width: 100%;">
                    {{ text | inOut }}
                </span>
                <span slot="outFlow" slot-scope="text, record,index" style="display: block; text-align: center; text-align: center; width: 100%;">
                    {{ text | inOut }}
                </span>
            </a-table>
        </a-modal>
    </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import ParseFileModal from './ParseFileModal.vue'
import AccountModal from "../edit/AccountModal.vue";
import moment from 'moment';

import {
    listFile,
    deleteFile,
    upload2File,
    downFile
} from '../../models/file';

import {
    listMoneyflow
} from '../../models/moneyFlow';
import { setEvent } from "../../models/pages"
export default {
    components:{
        ParseFileModal,
        AccountModal
    },
    props: {
        accountDatas: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            selectAccount: '',
            accountInsertvisible: false,
            isLoading: true,
            previewMoneyflow: false,
            prevCol: [{
                title: '序号',
                width: '5%',
                scopedSlots: { customRender: 'indexKey' },
                className: 'tableAlignCenter'
            }, {
                dataIndex: 'date',
                title: '日期',
                key: 'date',
                width: '10%',
                scopedSlots: { customRender: 'date' },
                className: 'tableAlignCenter'
            }, {
                dataIndex: 'remark',
                title: '备注',
                key: 'remark',
                width: '11%',
                scopedSlots: { customRender: 'remark' },
                className: 'tableAlignCenter'
            },
            {
                dataIndex: 'account',
                title: '账户',
                key: 'account',
                width: '10%',
                scopedSlots: { customRender: 'account' },
                className: 'tableAlignCenter'
            },
            {
                dataIndex: 'inFlow',
                title: '流入',
                key: 'inFlow',
                slots: { title: 'customInFlow' },
                width: '10%',
                scopedSlots: { customRender: 'inFlow' },
                className: 'tableAlignCenter'
            },
            {
                dataIndex: 'outFlow',
                title: '流出',
                key: 'outFlow',
                width: '10%',
                scopedSlots: { customRender: 'outFlow' },
                className: 'tableAlignCenter'
            }],
            prevData: [],
            delFileModalVisible: false,
            parseVisible: false,
            selectRemoveFile: {
                name: '',
                account: {
                    name: ''
                },
                curdate: '',
                startdate: '',
                enddate: '',
                user: {
                    name: ''
                },
                remark: ''
            },
            account:{},
            uploading: false,
            accept: '.xlsx, .xls, .csv',
            fileList: [], 
            fileDatas: [],
            fileRemark:"",
            file:{},
            file1:{
                sheets:[
                   { fields:['ee','ww','ee1','ee12','23'],  name:'111',"rows":[["","7.0","2018-07-27 00:00:00","6月份水果款","3011.0","3011.0"]]},
                   { fields:['22ee','22ww','22ee1','22ee13','2223'],  name:'211',"rows":[["","7.0","2018-07-27 00:00:00","新教室设计费用","88.0","88.0"],["","7.0","2018-07-27 00:00:00","新生黄圣辉退预收下学期学费","600.0","600.0"]]},
                   { fields:[],  name:'222'}
                ]
            },
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }, 

            columns: [
                {
                    title: '序号',
                    width: '5%',
                    slots: { title: 'indexKey' },
                    scopedSlots: { customRender: 'indexKey' },
                    className: 'tableAlignCenter'
                }, {
                    title: '导入日期',
                    dataIndex: 'curdate', 
                    width: '10%', 
                    scopedSlots: { customRender: 'curdate' }
                }, {
                    title: '导入账户',
                    dataIndex: 'account', 
                    width: '10%', 
                    scopedSlots: { customRender: 'account' }
                }, {
                    title: '导入文件名',
                    dataIndex: 'name', 
                    width: '10%', 
                    scopedSlots: { customRender: 'name' }
                }, {
                    title: '数据条目数',
                    dataIndex: 'rows', 
                    width: '10%', 
                    scopedSlots: { customRender: 'rows' }
                }, {
                    title: '导入人',
                    dataIndex: 'user', 
                    width: '10%', 
                    scopedSlots: { customRender: 'user' }
                }, {
                    title: '备注',
                    dataIndex: 'remark', 
                    width: '10%', 
                    scopedSlots: { customRender: 'remark' }
                }, {
                    title: '操作',
                    width: '10%', 
                    key: 'action',
                    slots: { title: 'action' },
                    scopedSlots: { customRender: 'action' },
                }
            ], 
        };
    },
    computed: {
        formItemLayout () {
            return  {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            }
        },
        buttonItemLayout () {
            return   {  wrapperCol: { span: 14, offset: 4 }} 
        },
        dataSource() {
            return this.fileDatas.filter(item => item.rows != null);
        },
        accounts(){
            let _self = this;
            let _typeName = [];
            _self.accountDatas.map(item => {
                if (_typeName.indexOf(item.atype.name) == -1) {
                    _typeName.push(item.atype.name);
                }
            });
            return _typeName.map(val=>{
                let _typeAccounts =  _self.accountDatas.filter(fval => fval.atype.name == val);
                return {
                    'type': val,
                    'options': _typeAccounts
                }
            });
        },
        // 总览
        overView() {
            let _totalIn = 0;
            let _totalOut = 0;
            let _totalSum = 0;
            this.prevData.map(md => {
                if (md.amount < 0) {
                    _totalOut += md.amount;
                } else {
                    _totalIn += md.amount;
                }
            });
            _totalSum = _totalIn + _totalOut;
            return {
                in: _totalIn,
                out: Math.abs(_totalOut),
                sum: _totalSum,
                count: this.prevData.length
            };
        },
        // 上传历史总览
        fileOverView() {
            let _dCount = 0;
            let _date = {
                start: this.dataSource.length ? this.dataSource[0].startdate : '',
                end: this.dataSource.length ? this.dataSource[0].enddate : ''
            };
            this.dataSource.map(ds => {
                _dCount += ds.rows;
                if (moment(ds.startdate).isBefore(moment(_date.start))) {
                    _date.start = ds.startdate;
                }
                if (moment(ds.enddate).isAfter(moment(_date.end))) {
                    _date.end = ds.enddate;
                }
            });
            return {
                fileCount: this.dataSource.length,
                dataCount: _dCount,
                date: _date
            };
        }
    },
    created() {
        debugger
        this.account =  this.accountDatas[0] //选中帐户
        this.selectAccount = this.account.id;
        this.getList();
    },
    methods:{
        cancelParse() {
            this.parseVisible = false;
        },
        onAccountChange(val,opt){
            if (val == 'addAccount') {
                this.accountInsertvisible = true;
                this.selectAccount = '';
                this.account = {};
            } else {
                let _self = this
                 let _acc =  _self.accountDatas.find(fval=>fval.id == val)
                 _self.account = _acc//JSON.parse(JSON.stringify(_acc)) //JSON.parse(JSON.stringify(this.accountDatas[0]))
            }
        },
        accountModalCancel() {
            this.accountInsertvisible = false
        },
        refreshAccounts(res) {
            this.accountDatas.push(res);
            this.selectAccount = res.id;
            this.account = res;
            this.accountInsertvisible = false;
        },
        nextFieldClick(){

        },
        selectFileChange(e) {
            if (this.rawFile !== null) {
                return
            }
            let _file = e.target.files[0] //文件信息
            this.rawFile = _file
            let _fileList = this.dataSource;
            let _res = true;
            for (let i = 0; i < _fileList.length; i++) {
                if (_fileList[i].filename == _file.name) { 
                    this.$message.error("这个文件已经上传过，请重新选择文件。");
                    _res = false;
                    break;
                }
            }
            if(_res){
                this.fileName = _file.name 
            }
        },
        // 选择项过滤
        filterOption (input, option) {
            // debugger
            let _optText = option.componentOptions.children[0].text

            let _value = option.componentOptions.propsData.value
    
            if (_optText) {
                return _optText.toLowerCase().indexOf(input.toLowerCase()) >= 0
            } else {
                return false
            }
        },
        removeFile(record) {
            setEvent({
                "keyname": "remove_liushui",
                "keyvalue":"流水上传删除流水"
            })
            deleteFile(record.id).then(res => {

                if (res.status === 200 && res.data.code === 200) {
                    this.$message.success("删除成功");
                    this.getList();
                } else {
                    this.ablaoding = false;
                    this.$message.error("删除失败");
                }
                this.delFileModalVisible = false;
            });
        },
        getList() {
            let _self = this;
            //, classname: 'moneyflows'
            listFile({
                type: 'file',
                classname:''
            }).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    _self.isLoading = false;
                    _self.fileDatas = res.data.data;
                }
            });
        },  
 
        handleRemove(file) {
            const index = this.fileList.indexOf(file);
            const newFileList = this.fileList.slice();
            newFileList.splice(index, 1);
            this.fileList = newFileList
         },
        beforeUpload(file) {
            // this.fileList = [...this.fileList, file]
            console.log(file.name);
            if (this.dataSource.map(fd => fd.name).includes(file.name)) {
                this.$warning({
                    title: '系统提示',
                    content: '该文件已上传过，请重新选择文件',
                    okText: '确定'
                });
                this.fileList = [];
            } else {
                this.fileList = [file]
            }
            return false;
        },
        handleUpload() {
            // let { account,fileList,fileRemark,uploading,file } = this;
            let _self = this
            const formData = new FormData();
            // let _file = e.target.files[0] //文件信息
            // this.rawFile = _file
            _self.fileList.forEach((file) => {
                formData.append('file', file);
            });
            _self.uploading = true   
            let _params = {
                'file': formData, 
                'classname': _self.account.className || 'moneyflows',
                'remark': _self.fileRemark
            };
            upload2File(_params).then(res => {
                debugger
                if (res.data.code === 200) { 
                    _self.file = res.data  
                    this.parseVisible = true;
                    console.log(_self.file);
                }else{
                    // if(res.data.code == 80010){
                     _self.file = {}
                     alert(res.data.desc)
                    //}
                }
                _self.fileList.splice(0, 1); //清空上传列表
                _self.uploading = false  
            }).catch(err => {
                _self.$message.error('上传失败！');
                _self.uploading = false;
            })
        },
        completeParse(obj) {
            let _self = this;
            this.parseVisible = false;
            this.selectAccount = '';
            this.$message.success('成功导入' + obj.rows + '条数据！', 3);
            listMoneyflow({
                fileids: [
                    obj.fileid
                ]
            }).then(res => {
                if (res.data.code == 200) {
                    res.data.data.map(item => {
                        if (item.amount < 0) {
                            item.outFlow = -item.amount;
                        } else {
                            item.inFlow = item.amount;
                        }
                    });
                    _self.prevData = res.data.data;
                    _self.previewMoneyflow = true;
                }
            });
            this.getList();
        },
        handleConfirmDelete(record) {
            this.selectRemoveFile = record;
            this.delFileModalVisible = true;
        },
        cancelRemove() {
            this.delFileModalVisible = false;
        },
        closePreview() {
            this.previewMoneyflow = false;
        },
        viewFileMoneyflow(record) {
            let _self = this;
            listMoneyflow({
                fileids: [
                    record.id
                ]
            }).then(res => {
                if (res.data.code == 200) {
                    res.data.data.map(item => {
                        if (item.amount < 0) {
                            item.outFlow = -item.amount;
                        } else {
                            item.inFlow = item.amount;
                        }
                    });
                    _self.prevData = res.data.data;
                    _self.previewMoneyflow = true;
                }
            });
        }
    },
    filters: {
        desc(txt) {
            return txt.length < 11 ? txt : txt.substring(0, 11) + '...';
        }
    }
}
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
.handleUploadBtnClick{
  position: relative;
  /* background-color: #3296fa; */
  width: 100%;
  height: 100%;
}
.handleUploadBtnClick2{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgba(0,0,0,0.05);  */
}

.import-item-name1:before{
    display: inline-block;
    margin-right: 4px;
    content: "*";
    font-family: SimSun;
    line-height: 1;
    font-size: 12px;
    color: #fff;
}

.import-item-red:before{
   display: inline-block;
    margin-right: 4px;
    content: "*";
    font-family: SimSun;
    line-height: 1;
    font-size: 12px;
    color: #f04134;
}
.ant-form-item-label label:after {
    content: ":";
    margin: 0 8px 0 2px;
    position: relative;
    top: -0.5px;
}
#Mapping .ant-form-item-label label:before  {
    display: inline-block;
    margin-right: 4px;
    content: "*";
    font-family: SimSun;
    line-height: 1;
    font-size: 12px;
    color: #f04134;
}


#importData .ant-table table td:nth-of-type(1){
  text-align: center;
}
#importData .ant-table table td:nth-of-type(2){
  padding-left: 10px !important;
}
#importData .ant-table table td:nth-of-type(3){
  padding-left: 10px !important;
  padding-right: 4px !important;
}
#importData .ant-table table td:nth-of-type(4){
  padding-left: 10px !important;

  padding-right: 4px !important;
}
#importData .ant-table table td:nth-of-type(5){
  padding-left: 10px !important;
}
#importData .ant-table table td:nth-of-type(6){
  padding-left: 10px !important;
}
#importData .ant-table table td:nth-of-type(7){
  padding-left: 10px !important;
}
#importData .ant-table table td:nth-of-type(8){
  text-align: center;
}
#importData .ant-table table td:nth-of-type(9){
  padding-left: 10px !important;
}





#importData .ant-table table th:nth-of-type(2){
  padding-left: 10px !important;
}
#importData .ant-table table th:nth-of-type(3){
  padding-left: 10px !important;
  
}
#importData .ant-table table th:nth-of-type(4){
  padding-left: 10px !important;
}
#importData .ant-table table th:nth-of-type(5){
  padding-left: 10px !important;
}
#importData .ant-table table th:nth-of-type(6){
  padding-left: 10px !important;
}
#importData .ant-table table th:nth-of-type(7){
  padding-left: 10px !important;
}
#importData .ant-table table th:nth-of-type(8){
  text-align: center;
}
#importData .ant-table table th:nth-of-type(9){
  padding-left: 10px !important;
}
.soloupload{
    padding: 0 10px 10px 30px;
}
#UploadFile .upload{
    border: 1px dashed #ccc;
    padding: 0 10px 0 0;
    text-align: center;
    position: relative;
    height: 78px;
}
#UploadFile .ant-upload-list{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-color: #fff;
       

}
#UploadFile .ant-upload-list-item {
    padding-top: 0;
        height: 66px;
    border: none;
}
#UploadFile .ant-upload-list-item-name{
    line-height: 68px;
}
/* #UploadFile .ant-btn{
    margin-top: 30px;
} */
#UploadFile .ant-upload-list-picture{
/* position: absolute;
    top: 15px; */
}
#UploadFile .upload-demo-start{
    margin-top: 6px;
}
#importData{
    position: relative;
}
#importData .ant-table-placeholder::after{
   content: '暂无导入记录...';
   position: absolute;
    bottom:0;
    left: 0;
    top: 118px;
    right: 0;
    width: 100%;
    height: 20px;
    display: block;
    background-color: #fff;
}
#importData .ant-table-placeholder::before{
    content: '';
    background-image:url(../../../static/img/nodata.svg); 
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    /* background-color: #ccc; */
    width: 100%;
    height: 100px;
    display: block;
}
</style>
