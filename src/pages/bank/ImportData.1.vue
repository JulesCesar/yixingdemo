<template>
    <div>
        <v-row class="import-row" id="static">
            <v-col span="4">
                <div class="import-item-name import-item-red">导入账户：</div>
            </v-col>
            <v-col span="5">
                <v-select style="width: 100%" 
                    :data="accounts" 
                    clue='id'
                    label='name'
                    groupLabel ='type'
                    @change="accountChange" 
                    :optionOnChange="true" 
                    :popup-container="popupContainer"
                    :allowClear="false"
                >
                </v-select>
            </v-col>
        </v-row>
    
        <v-row class="import-row">
            <v-col span="4">
                <div class="import-item-name import-item-name1">备注：</div>
            </v-col>
            <v-col span="7">
                <v-input size="large" style="width: 100%" v-model="newFile.remark"></v-input>
            </v-col>
        </v-row>

        <v-row class="import-row">
            <v-col span="4">
                <div class="import-item-name import-item-red">导入文件：</div>
            </v-col>
            <v-col span="7"> 
                <div  @click="handleUploadBtnClick" class="handleUploadBtnClick">
                    <v-input placeholder="点击选择文件" v-model="fileName"></v-input>
                    <span class="handleUploadBtnClick2"></span>
                </div>
            </v-col>
            <v-col span="1">
            </v-col>
            <v-col span="2">
                <!-- <a-upload -->
                <v-button type="primary"  @click="handleUploadBtnClick" >选择文件</v-button>   
                <input :id="uploadInputId" type="file" :accept="accept"  style="display: none" @change="selectFileChange">
            </v-col>

            <v-col span="2" v-if="fileName && newFile.accountid">
            <v-button type="primary" @click="nextFieldClick">下一步</v-button>    
            </v-col>
            <v-col span="2" v-else>
            <v-button type="primary" @click="nextFieldClick" disabled>下一步</v-button>    
            </v-col>
            
        </v-row>
        <!-- <v-row>
            <v-col span="10" offset="4" v-if="uploadedFile">
                <p style="margin-top: 8px; font-size: 13px; height: 24px; line-height: 24px;">{{uploadedFile}} <span style="color: rgb(98, 212, 21); display: inline-block; margin-left: 20px;">上传成功</span></p>
            </v-col>
            <v-col span="10" offset="4" v-if="nouploadedFile">
                <p style="margin-top: 8px; font-size: 13px; height: 24px; line-height: 24px;">{{nouploadedFile}} <span style="color: rgb(255, 0, 0); display: inline-block; margin-left: 20px;">上传失败</span></p>
            </v-col>
        </v-row> -->
    
        <!-- 上传提示 -->
        <v-modal :visible="specVisiblea" :closable= false>
        <div style="text-align:center">{{acountwater}}</div>
        <div slot="footer" style="text-align: center;">
            <v-button type="primary" @click="specCancela">我知道了</v-button>
        </div>
        </v-modal>
    
        <v-row class="import-row">
        <v-col span="24">
            <p class="import-row-title import-row-title2">导入历史</p>
        </v-col>
        </v-row>
        <v-row class="import-row">
        <v-col span="24">
            <div id="importData">
            <a-table v-if="dataSource.length" :dataSource="dataSource" :columns="columns" bordered>
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
                    <a-popconfirm  title="删除该记录会删除导入的流水，是否继续？" @confirm="removeFile(record)" okText='确定' cancelText="取消" >
                        <span  class="deleteFile">
                            <a-icon type="delete" class="import-icon"></a-icon>
                        </span>
                    </a-popconfirm>
                </span>
            </a-table>
            <div v-else class="nodataimg" style="width:100%;">
                <img src="../../assets/img/nodata.svg" alt="">
                
                <p>暂无..</p>
            </div>
            </div>
        </v-col>
        </v-row>

        <a-modal title="字段映射" :visible="fieldVisible" :closable=false>
            <v-form direction="horizontal"    >
                <div id="Mapping">
                <!-- {{ruleForm.date}}  -->
                <v-form-item label="时间" :label-col="labelCol" :wrapper-col="wrapperCol"   prop='custom_date'>
                    <v-select v-model="ruleForm.custom_date" placeholder="请选择时间" notfound="无法找到" :data="fileds"></v-select>
                </v-form-item>
                <!-- {{ruleForm.comment}}  -->
                <v-form-item label="摘要" :label-col="labelCol" :wrapper-col="wrapperCol" prop='custom_remark'>
                    <v-select  v-model="ruleForm.custom_remark"   placeholder="摘要" notfound="无法找到" :data="fileds"></v-select>
                </v-form-item>
                    <!-- {{ruleForm.amount}}  -->
        
                    <v-form-item :label="amountLabel" :label-col="labelCol" :wrapper-col="wrapperCol" prop='custom_income'>
                    <v-select  v-model="ruleForm.custom_income"   placeholder="金额" notfound="无法找到" :data="fileds"></v-select>
                    </v-form-item>   

                    <v-form-item v-show="amount==1" label="流出" :label-col="labelCol" :wrapper-col="wrapperCol" prop='custom_outcome' >
                        <v-select  v-model="ruleForm.custom_outcome"   placeholder="金额" notfound="无法找到" :data="fileds"></v-select>
                    </v-form-item> 
        
                <v-form-item label="文件金额在" :label-col="labelCol" :wrapper-col="wrapperCol"  >
                    <v-radio-group  v-model="amount" :data="amountType"> </v-radio-group>
                </v-form-item>
                </div>
            </v-form>
            <template slot="footer">
                <a-button @click="cancelfield">取消</a-button>
                <a-button type="primary" :disabled="!upEnable" :loading="isLoading" @click="uploadfilebyfield">
                确定
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import {
    listFile,
    deleteFile,
    parseFile,
    upFile,
    downFile
} from '../../models/file';

import {
    listAccount
} from '../../models/moneyFlow';

// import _ from "lodash";
import XLSX from 'xlsx';

// function groupBy(array, f) {
//   let groups = {};
//   array.forEach(function(o) {
//     let group = JSON.stringify(f(o));
//     groups[group] = groups[group] || [];
//     groups[group].push(o);
//   });
//   return Object.keys(groups).map(function(group) {
//     return groups[group];
//   });
// }
 

export default {
    data() {
        return {
            isLoading: false,
            accept: '.xlsx, .xls, .csv',
            fileDatas: [],
            accountData:[],
            newFile: {
                accountid: 0,
                remark: "",
                type: ""
            },
            fileName:'',
            rawFile: null,
            fieldVisible: false,
            workbook: null,
            headerIndex:0,
            tableData: {
                header: [],
                body: []
            },
            uploadInputId: (new Date().getUTCMilliseconds()),
            ruleForm: {  
                custom_date: '', 
                custom_remark:'',
                custom_income: '', 
                custom_outcome: ''
            },  
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            }, 
            amount:'1',
            amountType:[{value: '1', text: '收支两列区分'},{value: '2', text: '收支正负区分'}], 
            
            specVisiblea: false,
            wwh: true,
            uploadedFile: "",
            nouploadedFile: "",
            ablaoding: false,
            fileList: [], 
            name: "files",
            columns: [{
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
                dataIndex: 'filename', 
                width: '10%', 
                scopedSlots: { customRender: 'filename' }
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
            }], 
            acountwater: "", 
            yxtypes: []
        };
    },
    computed: {
        ...mapGetters(["currentUser"]),
        upEnable() {
            let _form = this.ruleForm;
            if (this.amount == '1') {
                return _form.custom_date != ''
                    && _form.custom_remark != ''
                    && _form.custom_income != ''
                    && _form.custom_outcome != '';
            } else {
                return _form.custom_date != ''
                    && _form.custom_remark != ''
                    && _form.custom_income != '';
            }
        },
        dataSource() {
            return this.fileDatas.filter(item => item.rows != null);
        },
        fileds(){
            let _self = this
            let _rule =  this.ruleForm
            return _self.tableData.header.filter(val=> {
                let _same = true
                for (let prop in _rule) {
                    if(_rule[prop]== val.label) {
                    _same = false
                    }
                }
                return _same
            })
        },
        amountLabel(){
            return this.amount == 1 ? '流入' : '流入流出';
        },
        action() {
            return ( 
                "?access-token=" +
                this.currentUser.token +
                "&accountid=" +
                this.newFile.accountid +
                "&remark=" +
                this.newFile.remark +
                "&type=custom" 
                // this.newFile.type //custom
            );
        },
        accounts(){
            let _self = this;
            let _typeName = [];
            _self.accountData.map(item => {
                if (_typeName.indexOf(item.atype.name) == -1) {
                    _typeName.push(item.atype.name);
                }
            });
            return _typeName.map(val=>{
                let _typeAccounts =  _self.accountData.filter(account => account.atype.name == val);
                return {
                    'type': val,
                    'options': _typeAccounts
                }
            });
        }
    },
    mounted() {
        let _self = this;
        listAccount({}).then(res => {
            if (res.status === 200 && res.data.code === 200) {
                _self.accountData = res.data.data;
            }
        });
        _self.getList();
    },
    methods: {
        clearHeaders(){
            this.tableData.header =[]
            let _rule = this.ruleForm
            for (let prop in _rule ) {
                _rule[prop]=""
            }
        },
        //上传完成
        uploadfilebyfield(){
            let _self = this;
            _self.isLoading = true;
            let formData = new FormData();
            let _form = _self.ruleForm
            formData.append('file', _self.rawFile);
            // formData.append('custom_date', _form.custom_date);
            // formData.append('custom_remark', _form.custom_remark);
            // formData.append('custom_income', _form.custom_income);
            if (_self.amount == 1){
                formData.append('custom_outcome', _form.custom_outcome);
            }
            let _params = {
                file: formData,
                type: 'file',
                classname: 'moneyflows',
                remark: _self.newFile.remark
            };
            upFile(_params).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    let _parseParam = {
                        accountid: _self.newFile.accountid,
                        custom_date: _form.custom_date.trim(),
                        custom_remark: _form.custom_remark.trim(),
                        custom_income: _form.custom_income.trim(),
                        id: res.data.id
                    };
                    if (_self.amount == 1){
                        _parseParam.custom_outcome = _form.custom_outcome.trim();
                    }
                    parseFile(_parseParam).then(res => {
                        if (res.status === 200 && res.data.code === 200) {
                            _self.fieldVisible = false
                            let _data = res.data
                            if(_data.rows){ 
                                _self.fileName = ""
                                _self.clearAllData()
                                _self.newFile.remark = "";
                                _self.specVisiblea = true
                                _self.acountwater = "成功导入" + _data.rows + "条数据";
                                _self.$message.success('导入成功');
                                _self.getList()
                            }
                        } else {
                            _self.$message.error("文件解析失败"); 
                        }
                        _self.isLoading = false;
                    })
                    //     _self.$message.error("文件解析失败");
                    //     _self.isLoading = false;
                    // });
                }else{
                    _self.$message.error('文件上传失败');
                    _self.isLoading = false;
                }
            })
            //     _self.$message.error('文件上传失败');
            //     _self.isLoading = false;
            // });
        },
        cancelfield(){
        this.fieldVisible = false
        },
        nextFieldClick(){
            this.clearHeaders()
            if(!this.newFile.accountid){
                this.$message.error('请选择导入帐户!')
                return
            }
            this.fieldVisible = true
            let _file = this.rawFile

            let filename=_file.name;   
            let fileType=filename.substr(filename.lastIndexOf('.')+1,filename.length).toUpperCase();  

            if(fileType == 'XLS' || fileType == 'XLSX'){
                this.fileConvertToWorkbook(_file,fileType).then((workbook) => { 
                    this.workbook = workbook
                    let _worksheet =workbook.Sheets[workbook.SheetNames[0]]
                    this.getTable(_worksheet) 
                }).catch((err) => {
                    console.error(err)
                })
            }else{
                this.getCSVHead(_file).then(headers=>{
                    this.tableData.header = headers.map(val=>{
                        return {'label':val,'value': val}
                    })
                })
            } 
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
        fileConvertToWorkbook (file,fileType) {

            let reader = new FileReader()
            let fixdata = (data) => {
                let o = "", l = 0, w = 10240
                for( ; l<data.byteLength/w ; ++l) {
                o += String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)))
                }
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)))
                return o
            }

            return new Promise((resolve, reject) => {
                try {
                    
                if (this.rABS) {
                    reader.readAsBinaryString(file)
                } else {
                    if(fileType == 'CSV'){
                    //  reader.readAsText(file,'latin1')
                    reader.readAsText(file,'GBK');
                    }else{
                    reader.readAsArrayBuffer(file)
                    } 
                }

                reader.onload = (renderEvent) => { 

                    let XL =  XLSX //fileType === 'XLS' ? XLS : XLSX;   //选择是XLS对象还是XLSX对象 
                    let data = renderEvent.target.result
                    debugger
                    if(this.rABS) {
                    /* if binary string, read with type 'binary' */
                    resolve(XL.read(data, {type: 'binary'}))
                    } else {
                    /* if array buffer, convert to base64 */
                    let arr = fixdata(data)
                    resolve(XL.read(btoa(arr), {type: 'base64'}))
                    }
                }
                reader.onerror = (error) => {
                    reject(error)
                } 

                } catch (error) {
                reject(error)
                }
            })
        },
        getTable (worksheet) { 
        // debugger
            let headers = [];
            let data = [];
            // const _range =  worksheet['!autofilter'].ref
            const _range =  worksheet['!ref']

            let _topLeft = _range.split(':')[0]
            let _bottonRight = _range.split(':')[1]

            let _top  =  _topLeft.replace(/[^0-9]/ig,""); 
            let _left =  _topLeft.replace(_top,'');

            let _botton  =  _bottonRight.replace(/[^0-9]/ig,""); 
            let _right =  _bottonRight.replace(_botton,""); 

            let _A =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("").map(val=>'A'+val)
            let _col = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("").concat(_A) // 51列 

            let getHeader = (sheet,rowNum,col) => {
                let _header = [] 
                col.forEach((val,index)=>{
                    let _k = val+rowNum
                    let _obj = sheet[_k]
                    if(_obj){
                        let _str=""
                        if(_obj.t=='s'){ 
                        _str = _obj.v.replace(/\s+/g,"");
                        }else{ 
                        // console.dir(_obj)
                        _str=_obj.v
                        }
                        if(_str){
                            _obj.row = rowNum
                            _obj.col = index
                            _obj.colname = val 
                            _header.push({'label':_obj.v,'value': _obj.v })
                        } 
                    }
                })
                return _header
            }

            headers = getHeader(worksheet,_top,_col)
            if(headers.length>10){
            this.headerIndex = _top
            }else{
                let _leftNum =  _col.findIndex(val=> val==_left)
                let _rigthNum =   _col.findIndex(val=> val==_right)
                let _headerLenght = _rigthNum - _leftNum-2
                console.log(_headerLenght)
                for(let i= _top; i<_top+20;i++){
                let  _headers = getHeader(worksheet,i,_col)
                if(_headers.length > _headerLenght){
                    this.headerIndex = i
                    headers = _headers
                    break; 
                }
                }
            }

            this.tableData.header = headers 
        },
        getCSVHead(file){
            let reader = new FileReader()
            return new Promise((resolve, reject) => {
            try { 
                debugger
                reader.readAsText(file,'GBK'); 
                reader.onload = (e) => {  
                debugger
                let _str = e.target.result
                let _header=[]
                if(_str){
                    let _array = _str.split('\n') 
                    let _max = 0
                    for(let i =0 ; i< _array.length;i++){
                        let _row = _array[i].split(',')
                        let _len = _row.filter(fval=> fval.replace(/\s+/g,"") != "").length
                        // debugger
                        // console.log(_len)
                        if(_len>_max || _len<5){
                        _max = _len
                        }else{
                        _header =  _array[i-1].split(',')
                        break
                        }
                    }
                } 
                return  resolve(_header)  
                //  let foo =  CSVToArray(data)
                }
                reader.onerror = (error) => {
                reject(error)
                }  
            } catch (error) {
                reject(error)
            }
            }) 
        },
        ///-----old --------------------------------------
        popupContainer() {
        return document.getElementById("static");
        },
    
        specCancela() {
             this.specVisiblea = false;
        },
        // getDownloadUrl(fid) {
        // let _surl =
        //     downloadUrl.url +
        //     "?access-token=" +
        //     this.currentUser.token +
        //     "&fid=" +
        //     fid;
        // return _surl;
        // },
        // getDownloadTemplateUrl(tmpFileName) {
        // let _surl =
        //     downloadTemplateUrl +
        //     "?token=" +
        //     this.currentUser.token +
        //     "&file=" +
        //     tmpFileName;
        // return _surl;
        // },
        removeFile(record) {
            deleteFile(record.id).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    this.$message.success("删除成功");
                    this.getList();
                } else {
                    this.ablaoding = false;
                    this.$message.error("删除失败");
                }
            });
        },
        getList() {
            let _self = this;
            listFile({
                type: 'file',
                classname: 'moneyflows'
            }).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    _self.fileDatas = res.data.data;
                    // let _dlength =  _self.dataSource.length
                    // _self.dataSource.splice(0, _dlength);
                    // res.data.data.forEach(item => {
                    //     if (item.remark === "undefined") {
                    //         item.remark = "";
                    //     }
                    //     _self.dataSource.push(item);
                    // });
                }
            });
        },  
        accountChange(opt) {
        // this.newFile.accountid = opt.accountid;
        // console.log(opt.type)
            this.newFile.accountid = opt.id; 
            this.newFile.type = opt.classname;
        // this.newFile.desc = this.getname(opt.classname).desc; 
        },
        handleUploadBtnClick () {
            this.clearAllData()
            document.getElementById(this.uploadInputId).click()
        },
        clearAllData () {
            document.getElementById(this.uploadInputId).value = null
            this.headerIndex=0
            this.tableData = {
                header: [],
                body: []
            }
            this.rawFile = null
            this.workbook = null
        },

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
</style>
