<template>
     <a-modal title="数据入库" :visible="fieldVisible"  :footer="null" :maskClosable='false' @cancel='cancelfield' width="60%">
         <p>字段预览：</p>
         <a-table style="text-align: center; margin-bottom: 24px; margin-top: 8px;" :columns="previewCol" :dataSource="previewData" :pagination="false" bordered></a-table>
         <!-- {{ruleForm}}  :closable='false'-->
            <a-form layout="vertical" @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item label="Sheet" 
                 :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择对应字段' }]}"
                 :labelCol="labelCol" :wrapperCol="wrapperCol"  
                 help='Excel表格的sheet tab页'
                 extra='如果一个文件中有多个sheet，请置于不同的文件中分别上传'
                 v-if="sheetNames.length>1">
                    <a-select 
                     v-model="custom_sheet" 
                     @change='sheetChange'
                     placeholder="请选择Sheet" 
                     :options="sheetNames" ></a-select>
                </a-form-item>
                <!-- <span style="color: #776969cc;font-size: 12px;">注意：如果一个文件中有多个sheet，请置于不同的文件中分别上传. </span> -->
                <a-form-item label="时间" 
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择对应字段' },{validator: validateToDate}]}"
                 :labelCol="labelCol" 
                 :wrapperCol="wrapperCol" 
                 fieldDecoratorId="custom_date" 
                 help='支持格式: 2018-08-01, 2018/08/08'>
                    <a-select  
                     labelInValue
                     title="custom_date" 
                     @change="fieldChange" 
                     placeholder="请选择时间"  :options="fields"></a-select>
                </a-form-item>
                <a-form-item label="摘要" required
                 :label-col="labelCol" :wrapper-col="wrapperCol" 
                 fieldDecoratorId="custom_remark" 
                 help='对资金用途的简要描述'>
                    <a-select  
                     labelInValue
                     title="custom_remark" 
                     @change="fieldChange"  
                     placeholder="摘要"  
                     :options="fields">
                     </a-select>
                </a-form-item>

                <a-form-item label="金额存放在" 
                :label-col="labelCol" :wrapper-col="wrapperCol" 
                 fieldDecoratorId="amount_type" >
                    <a-radio-group defaultValue="1"  v-model="amount" :options="amountType" @change="amountTypeChange"> </a-radio-group>
                </a-form-item>  
                <!-- v-if="amount==1" label="流入流出" -->
                    <a-row v-if="amount==2" :gutter=8>
                         <a-col :span=6>
                             流入流出
                         </a-col>
                        <a-col :span=8>
                             <a-form-item  
                                fieldDecoratorId="custom_income"
                                >
                            <a-select   
                            labelInValue
                            title="custom_income"
                            placeholder="流入" 
                            @change="fieldChange"   
                            :options="fields"></a-select>
                              </a-form-item>
                        </a-col>
                        <a-col :span=8>
                            <a-form-item  
                                fieldDecoratorId="custom_outcome"
                                >
                            <a-select 
                            labelInValue
                            title="custom_outcome" 
                            placeholder='流出'  
                            @change="fieldChange" 
                            :options="fields"> 
                            </a-select>
                          </a-form-item>
                        </a-col>
                    </a-row> 
                <a-form-item v-else label='流入流出'  
                 :label-col="labelCol" :wrapper-col="wrapperCol" 
                 help='金额须为数字如: 80,008.9 或者 10000.08'
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择对应字段' },{validator: validateToMoney}]}"
                 fieldDecoratorId="custom_amount" >
                    <a-select 
                      labelInValue
                      title="custom_amount"
                      placeholder="流入流出" 
                      @change="fieldChange"    
                      :options="fields"></a-select>
                </a-form-item>  
                <a-form-item style="display: flex; justify-content: flex-end;">
                    <a-button @click="cancelfield" style="margin-right: 16px;">取消</a-button>
                     <a-button type="primary" :loading="isLoading" htmlType='submit'>
                    确定
                     </a-button>
                </a-form-item>
            </a-form>
            <template slot="footer">
                <!-- <a-button @click="cancelfield">取消</a-button> -->
               
            </template>
             <!-- 上传提示 -->
            <a-modal :visible="specVisiblea" >
            <div style="text-align:center">{{acountwater}}</div>
            <div slot="footer" style="text-align: center;">
                <a-button type="primary" @click="specVisiblea = !specVisiblea">我知道了</a-button>
            </div>
            </a-modal>
        </a-modal>
</template>
<script>
import moment from 'moment';
import { 
    parseFile, 
} from '../../models/file';
 
export default {
    props:{
        account:Object,
        file:{
            type:Object,
            default:{}
        }
    },
    data() {
        return {
            fieldVisible:true,
            isLoading:false,  
            custom_sheet:'',
            ruleForm: {  
                custom_date: '', 
                custom_remark:'',
                custom_income: '', 
                custom_outcome: '',
                custom_amount:''
            },  
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },  
            specVisiblea:false,
            acountwater:"",
            amount:'1',
            amountType:[{value: '1', label: '正负区分收支'},{value: '2', label: '两列区分收支'}], 
            previewCol: [],
            previewData: []
        }
    },
    created(){
        let _self= this;
        _self.custom_sheet = _self.file.sheets[0].name
        // console.log(_self.file);
    },
    computed: {
        //表格的sheet描述
        sheetNames(){
           const {file} = this;
           return  file.sheets.map(val=>{ 
                let _value = val.name  
                let _disabled  = val.fields.length>2? false : true
                let _label = _disabled ? val.name+'(少于3列)' :val.name
                return   { value:_value, label:_label, disabled:_disabled}
           })
        },
        //sheet都字段
        fields(){
            // this.custom_sheet = this.file.sheets[0].name
            let {file,ruleForm,custom_sheet} = this;
            let _sheet =  file.sheets.find(val => val.name == custom_sheet)
            // let _sheet = file.sheets[0]
            // let _rows = _sheet.rows
            let _values = Object.values(ruleForm)

            let getExampleRow  = (index)=>{
                return _sheet.rows.find(val=>val[index])
            }


            return  _sheet.fields.map((val,index)=>{
                let _example = getExampleRow(index)
                return {
                    'value':val, 
                    // 'label':_example ? val+' 如:'+_example[index] : val +'  空',
                    'label': val,
                    'disabled': _values.some(sval => sval == val)
                }
            })
            
            // let _fields =  _sheet.fields.filter(val=> {
            //     return !_values.some(sval => sval == val)
            // })
            // return _fields.map(val=>({'value':val, 'label':val}))
        },
    },
    mounted() {
        this.prevTable();
    },
    methods:{
        prevTable() {
            let {file,ruleForm,custom_sheet} = this;
            let _sheet =  file.sheets.find(val => val.name == custom_sheet)
            // let _sheet = file.sheets[0]
            let getExampleRow  = (index)=>{
                return _sheet.rows.find(val=>val[index])
            }
            this.previewCol = [];
            this.previewData = [];
            let _tmp = {
                key: 1
            };
            _sheet.fields.forEach((val, index) => {
                let _example = getExampleRow(index)
                if (_example) {
                    _tmp[val] = _example[index].length > 10 ? _example[index].substring(0, 10) + '...' : _example[index];
                    this.previewCol.push({
                        title: val.length > 5 ? val.substring(0, 5) + '...' : val,
                        dataIndex: val,
                        align: 'center'
                    });
                }
            })
            this.previewData.push(_tmp);
        },
        validateToMoney(rule, value, callback) {
            let _idx = null;
            let _sheet = this.file.sheets.find(val => val.name == this.custom_sheet);
            _sheet.fields.forEach((val, index) => {
                if (val == value.key) {
                    _idx = index;
                }
            })
            if (!isNaN(parseFloat(_sheet.rows[0][_idx]))) {
                callback();
            }
            callback('格式不符合')
        },
        validateToDate(rule, value, callback) {
            let _idx = null;
            let _sheet = this.file.sheets.find(val => val.name == this.custom_sheet);
            _sheet.fields.forEach((val, index) => {
                if (val == value.key) {
                    _idx = index;
                }
            })
            if (new Date(_sheet.rows[0][_idx]).toString() != 'Invalid Date' ) {
                callback();
            }
            // const form = this.form
            // if (value && this.confirmDirty) {
            //     form.validateFields(['confirm'], { force: true })
            // }
            callback('格式不符合')
        },
        clearSelectField(){
            let { ruleForm } = this 
            for ( let index in ruleForm){
                console.log(index,ruleForm[index])
                ruleForm[index] = ''
            }
        },
        fieldChange(val,opt){
           let _type = opt.context.$attrs.title
           let { ruleForm } = this 
           ruleForm[_type] = val.key 
        }, 
        sheetChange(val){
            this.clearSelectField()
            this.form.resetFields(['custom_date','custom_remark','custom_income','custom_outcome','custom_amount'])
            this.prevTable();
        },
        amountTypeChange(obj){
            let { ruleForm } = this 
            if(obj.target.value==1){
                ruleForm.custom_income=''
                ruleForm.custom_outcome=''
            }else{
                ruleForm.custom_amount=''
            }
        },
        handleSubmit (e) {
            console.log(this.custom_sheet)
            debugger
            e.preventDefault()

            let {account, file,ruleForm,custom_sheet,form} = this 
           

            let _formFieldsValue = form.getFieldsValue()
            let _parseParam = {
                accountid: account.id,
                id:  file.id,// file id
                sheetname: custom_sheet, // sheet name
                custom_date: ruleForm.custom_date.trim(),
                custom_remark: ruleForm.custom_remark.trim(),
                custom_income: ruleForm.custom_amount.trim(), 
            };
            if (_formFieldsValue.amount_type == 2){
                _parseParam.custom_income = ruleForm.custom_income.trim(), 
                _parseParam.custom_outcome = ruleForm.custom_outcome.trim();
            }
            
            debugger
            this.isLoading = true;
            parseFile(_parseParam).then(res => {
                if (res.data.code === 200) {
                    this.$emit('parseFinish', res.data);
                } else {
                    this.$message.error("文件解析失败：" + res.data.desc + '，请正确填写对应字段！', 3); 
                }
               this.isLoading = false;
            })

            // this.form.validateFields((err, values) => {
            //     if (!err) {
            //     console.log('Received values of form: ', values)
            //     }
            // })
        },
                

        //完成 上传文件解析
        uploadfilebyfield(){
            let _self = this;
            _self.isLoading = true;
           
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
        },
        cancelfield(){
            // this.fieldVisible = false;
            this.$emit('cancelParse');
        },
    }
}
</script>
