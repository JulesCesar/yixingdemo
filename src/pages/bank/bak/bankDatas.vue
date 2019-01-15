<template>
  <div class="vue-xlsx-container">
    <button type="button" class="xlsx-button" @click="handleUploadBtnClick">
      <slot>上传文件</slot>
    </button>
    <input :id="uploadInputId" type="file" :accept="accept" class="c-hide" @change="handkeFileChange">
    
   <v-form direction="horizontal" :model="ruleForm"  ref="ruleForm" v-show="tableData.header.length">
       <!-- {{ruleForm.date}}  -->
        <v-form-item label="时间" :label-col="labelCol" :wrapper-col="wrapperCol" >
            <v-select v-model="ruleForm.date" placeholder="请选择活动区域" notfound="无法找到" :data="fileds"></v-select>
        </v-form-item>
         <!-- {{ruleForm.comment}}  -->
        <v-form-item label="描述" :label-col="labelCol" :wrapper-col="wrapperCol" >
           <v-select v-model="ruleForm.comment" placeholder="描述" notfound="无法找到" :data="fileds"></v-select>
        </v-form-item>
          <!-- {{ruleForm.amount}}  -->
        <v-form-item label="金额" :label-col="labelCol" :wrapper-col="wrapperCol">
           <v-select v-model="ruleForm.amount" placeholder="金额" notfound="无法找到" :data="fileds"></v-select>
        </v-form-item>
 
        <v-form-item label="文件金额在" :label-col="labelCol" :wrapper-col="wrapperCol"  >
            <v-radio-group v-model="ruleForm.type" value="1"  :data="[{value: '1', text: '收支正负区分'},{value: '2', text: '收支两列区分'}]"></v-radio-group>
        </v-form-item>
        <!-- <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol" prop="desc">
            <v-input v-model="ruleForm.desc" type="textarea"></v-input>
        </v-form-item> -->
        <v-form-item :wrapper-col="{offset:6, span: 14 }">
            <v-button type="primary" style="margin-right:10px" @click.prevent="submitForm('ruleForm')">立即创建</v-button>
            <v-button type="ghost" @click.prevent="resetForm('ruleForm')">重置</v-button>
        </v-form-item>
    </v-form>

    <!-- {{headerIndex}}<br/>
    {{tableData.header}} -->
  </div>
</template>

<script>
const a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" 
import XLSX from 'xlsx'
export default {
  name: 'vue-xlsx-table',
  data () {
    return {
      rawFile: null,
      workbook: null,
      headerIndex:0,
      tableData: {
        header: [],
        body: []
      },
      uploadInputId: (new Date().getUTCMilliseconds()),
      ruleForm: {  
          date: {}, 
          comment:{},
          amount: {}, 
          type:{}
      },
      rules: {
          date: [{
              required: true,
              message: '请选择日期字段'
          }],
          comment: [{
              required: true,
              message: '请选择活动资源'
          }],
          amount: [{
              required: true,
              message: '请输入活动名称'
          }],  
      }, 

         
      labelCol: {
          span: 6
      },
      wrapperCol: {
          span: 14
      }
    }
  },
  props: {
    accept: {
      type: String,
      default: '.xlsx, .xls, .csv'
    }
  },
  computed: {
    fileds(){
       let _self = this
       return _self.tableData.header.filter(val=> val.label != _self.ruleForm.date.label && val.label != _self.ruleForm.comment.label  )
    },
    rABS () {
      //  Vue.use(vueXlsxTable, {rABS: false}) //浏览器的FileReader API 有两个方法可以读取本地文件 readAsBinaryString 和 readAsArrayBuffer, 默认rABS为false，也就是使用readAsArrayBuffer
    //   return window.xlsxEventBus.XLSX_EVENTS_DATA.options.rABS
       return false
    }
  },
  methods: { 
    handkeFileChange (e) { 
      if (this.rawFile !== null) {
        return
      }
      this.rawFile = e.target.files[0] //文件信息
      this.fileConvertToWorkbook(this.rawFile)
        .then((workbook) => {
        //   let xlsxArr = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) 
          this.workbook = workbook
          let _worksheet =workbook.Sheets[workbook.SheetNames[0]]
          this.getTable(_worksheet) 
        })
        .catch((err) => {
          console.error(err)
        })
    },
    fileConvertToWorkbook (file) {
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
          reader.onload = (renderEvent) => {
            let data = renderEvent.target.result
            if(this.rABS) {
              /* if binary string, read with type 'binary' */
              resolve(XLSX.read(data, {type: 'binary'}))
            } else {
              /* if array buffer, convert to base64 */
              let arr = fixdata(data)
              resolve(XLSX.read(btoa(arr), {type: 'base64'}))
            }
          }
          reader.onerror = (error) => {
            reject(error)
          }
          if (this.rABS) {
            reader.readAsBinaryString(file)
          } else {
            reader.readAsArrayBuffer(file)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    getTable (worksheet ) { 
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
                        _obj.label = _obj.v
                        _obj.value = _obj
                        _header.push({'label':_obj.v,'value':{label:_obj.v, col:index}})
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

        console.dir(headers);
        

        // const keys = Object.keys(worksheet);
        // keys.filter(k => k[0] !== '!') // 过滤以 ! 开头的 key
        //  // 遍历所有单元格
        //  .forEach(k => {
        //   // 如 A11 中的 A
        //   let col = k.substring(0, 1);
        //   // 如 A11 中的 11
        //   let row = parseInt(k.substring(1));
        //   // 当前单元格的值
        //   let value = worksheet[k].v;
        //  
        //   // 保存字段名
        //   if (row === 1) {
        //    headers[col] = value;
        //    return;
        //   }
        //  
        //   // 解析成 JSON
        //   if (!data[row]) {
        //    data[row] = {};
        //   }
        //   data[row][headers[col]] = value;
        //  });
         
        // console.dir(headers); // [ { '姓名': 'test1', '年龄': 20 }, { '姓名': 'test2', '年龄': 10 } ... ]
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
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less">
.vue-xlsx-container{
  display: inline-block;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .c-hide{
    display: none;
  }
}
.xlsx-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #20a0ff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 7px 9px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #20a0ff;
  &.button-large{
    padding: 10px 15px;
    font-size: 14px;
  }
  &.button-primary{
    color: #1f2d3d;
    border: 1px solid #bfcbd9;
    background-color: #fff;
  }
}
</style>