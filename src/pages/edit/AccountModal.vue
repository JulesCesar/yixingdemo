<template>
    <div>
        <v-modal
            :title="isAccountModify ? '编辑账户' : '新增账户'"
            :visible="insertvisible"
            @cancel="handleModifyCancell">
            <v-form direction="horizontal">
                <v-form-item label="账户类型" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-radio-group
                        v-model="selectAccount.type"
                        @change="radiochange">
                        <!-- <v-radio label="银行账户">银行账户</v-radio>
                        <v-radio label="现金账户">现金账户</v-radio>
                        <v-radio label="第三方平台">第三方支付平台</v-radio> -->
                        <a-radio :disabled="isAccountModify" v-for="optItem in atypeOption" :key="optItem.id" :value="optItem.id">
                            {{optItem.remark}}
                        </a-radio>
                    </a-radio-group>
                </v-form-item>
                <v-form-item
                    label="显示名称"
                    
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    required="required">
                    <v-input type="text" v-model="selectAccount.name" :len="8"></v-input>
                </v-form-item>
                <v-form-item
                    label="初始余额"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    required="required">
                    <a-input-number v-if="selectAccount.type == 4" :maxlength="15" style="width: 100%;" 
                    v-model="selectAccount.value" @change="watchMoney"></a-input-number>
                    <a-input-number v-else :min="0" :maxlength="15" style="width: 100%;" 
                    v-model="selectAccount.value" @change="watchMoney"></a-input-number>
                    <!-- <input type="number" style="width: 100%;" maxlength="8" v-model="selectAccount.value" @input="watchMoney" :min="0" :max="6"> -->
                    <!-- <input type="number" v-model="selectAccount.value" @input="watchMoney"  /> -->
                </v-form-item>
                <v-form-item
                    v-if="selectAccount.type == 2"
                    label="选择银行"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    
                    required="required">
                    <v-select style="width: 100%" :data="accountbank" @change="accountChangebank" :optionOnChange="true" v-model="selectAccount.classname" :allowClear="false"></v-select>
                </v-form-item>
                <v-form-item
                    v-if="selectAccount.type == 3"
                    label="选择平台"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    required="required">
                    <v-select style="width: 100%" :data="accountbankthree" @change="accountChangebank" :optionOnChange="true" v-model="selectAccount.classname" :allowClear="false"></v-select>
                </v-form-item>
                <v-form-item
                    label="初始时间"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    required="required">
                    <v-date-picker
                        v-model="selectAccount.date"
                        style="width:'100%'"
                        :disabled-date="disabledDate"></v-date-picker> 
                    <p style="color:#f34040;">*填写提示:请从今天以前的日期中设定</p>  
                </v-form-item>
                <!-- <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol" :disabled="false">
                <v-input type="textarea" v-model="selectAccount.desc"  :disabled="false"></v-input>
                    <v-input type="textarea" v-model="selectAccount.desc"  :disabled="false" style="resize:none;"></v-input>
                </v-form-item> -->
            </v-form>
            <div slot="footer">
                <div v-if="isAccountModify" style="float:left; padding-left:10px;">
                    <v-popconfirm title="确定删除吗?" @confirm="handleModifyDelete">
                        <v-button key="delete" type="error">
                            删 除
                        </v-button>
                    </v-popconfirm>
                </div>
                <v-button key="cancel" type="ghost" @click="handleModifyCancell">
                    取 消
                </v-button>
                <v-button
                    key="confirm"
                    type="primary"
                    @click="handleModifyOk"
                    :disabled="!isSaveEnabled">
                    保 存
                </v-button>
            </div>
        </v-modal>
    </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import { addAccount,deleteAccount,updateAccount, listAtype } from "../../models/moneyFlow.js";

export default {
    props: {
        insertvisible: {
            type: Boolean,
            default: false
        },
        isAccountModify: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            atypeOption: [],
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 14
            },
            modyhxz: true,
            modysan: false,
            selectAccount: {
                id: "",
                name: "",
                number: "",
                classname: "",
                type: 1,
                value: "",
                date: "",
                desc: ""
            },
            accountbank: [
                { label: "建设银行", value: "www.ccb.com" },
                { label: "工商银行", value: "www.icbc.com" },
                { label: "交通银行", value: "www.bankcomm.com" },
                { label: "农业银行", value: "www.abchina.com" },
                { label: "中国银行", value: "www.boc.cn" },
                { label: "招商银行", value: "www.cmbchina.com" },
                { label: "上海银行", value: "www.bosc.cn" },
                { label: "光大银行", value: "www.cebbank.com" },
                { label: "浦发银行", value: "www.spdb.com.cn" },
                { label: "其他", value: "otherbanks" }
            ],
            accountbankthree: [
                { label: "京东", value: "www.jd.com" },
                { label: "支付宝", value: "www.alipay.com" },
                { label: "其他", value: "other" }
            ],
        }
    },
    computed: {
        isSaveEnabled() {
            let _rslt = false;
            switch (this.selectAccount.type) {
                case 1: {
                    _rslt = this.selectAccount.name != "" &&
                        this.selectAccount.value !== '' &&
                        this.selectAccount.date != "";
                        break;
                } case 2: {
                    _rslt = this.selectAccount.name != "" &&
                        this.selectAccount.date != "" &&
                        this.selectAccount.value !== '' &&
                        this.selectAccount.classname != "";
                        break;
                } case 3: {
                    _rslt = this.selectAccount.name != "" &&
                        this.selectAccount.date != "" &&
                        this.selectAccount.value !== '' &&
                        this.selectAccount.classname != "";
                        break;
                } case 4: {
                    _rslt = this.selectAccount.name != "" &&
                        this.selectAccount.date != "" &&
                        this.selectAccount.value !== '';
                        break;
                } default: {
                    break;
                }
            //     if(this.selectAccount.type == 1){
            //         return (
            //             this.selectAccount.name != "" ||
            //             this.selectAccount.date != "" ||
            //             this.selectAccount.classname != ""
            //         );
            //     }else{
            //         return (
            //             this.selectAccount.name === "" ||
            //             this.selectAccount.date === "" ||
            //             this.selectAccount.value === ""
            //         );
            //     }
            // } else {
            //     if(this.selectAccount.type!=1){
            //         return (
            //             this.selectAccount.name === "" ||
            //             this.selectAccount.date === "" ||
            //             this.selectAccount.classname === "" ||          
            //             this.selectAccount.value === ""
            //         );
            // }else{
            //     return (
            //         this.selectAccount.name === "" ||
            //         this.selectAccount.date === "" ||
            //         this.selectAccount.value === ""
            //     );
            // }
                // return (
                //   this.selectAccount.name === "" ||
                //   this.selectAccount.classname === "" ||
                //   this.selectAccount.value === ""
                // );
            }
            return _rslt;
        },
    },
    created() {
        this.$bus.$on('accountmodalinit', () => {
            this.initAccouts();
        });
        this.$bus.$on('updateaccount', (oldAccount) => {
            if (typeof oldAccount == 'string') {
                this.initAccouts();
                this.selectAccount.name = oldAccount;
            } else {
                this.initAccouts();
                Object.keys(oldAccount).forEach(key => {
                    this.selectAccount[key] = oldAccount[key]
                });
                this.selectAccount.type = this.selectAccount.atype.id;
                this.selectAccount.date = this.selectAccount.date.substring(0, 10);
            }
        })
    },
    mounted() {
        let _self = this;
        listAtype({}).then(res => {
            if (res.status === 200 && res.data.code === 200) {
                _self.atypeOption = res.data.data;
            }
        });
    },
    methods: {
        initAccouts() {
            this.selectAccount = {
                id: '',
                name: "",
                number: "",
                classname: "",
                type: 1,
                value: "",
                date: "",
                desc: ""
            }; 
        },
        handleModifyCancell() {
            // this.insertvisible = false;
            this.$emit('accountmodalcancel');
        },
        radiochange(opt) {
            let opt_val = opt.target.value;
            if (opt_val == 2) {
                this.modyhxz = true;
                this.modysan = false;
                this.selectAccount.classname = "";        
            } else if (opt_val == 3) {
                this.modyhxz = false;
                this.modysan = true;
                this.selectAccount.classname = "";        
            } else {
                this.modyhxz = false;
                this.modysan = false;
                this.selectAccount.classname = "";
            }
        },
        watchMoney(){
            if(this.selectAccount.value.toString().includes('.') ){
                let xsd=this.selectAccount.value.toString().split(".");
                if(xsd[1] && xsd[1].length>=2){
                    this.selectAccount.value = xsd[0]+'.'+xsd[1].substring(0,2);
                }
            }
            if (this.selectAccount.type != 4 && parseFloat(this.selectAccount.value) < 0) {
                this.$message.error('金额不能为负');
                this.selectAccount.value = 0;
            }
        },
        accountChangebank(opt) {
            this.selectAccount.classname = opt.value;
        },
        disabledDate(current) {
            return current.valueOf()+86400000 > Date.now();
        },
        handleModifyDelete() {
            let _self = this;
            if (_self.selectAccount.id === "") return;
            deleteAccount(_self.selectAccount.id).then(res => {
                if (res.status == 200 && res.data.code == 200) {
                    _self.$message.success("删除账户成功");
                    _self.$bus.$emit('deleteAccountSuccess', _self.selectAccount.id);
                    _self.handleModifyCancell();
                } else if (res.data.code == 60001) {
                    _self.$error({
                        title: '系统提示',
                        content: res.data.desc + '，不可删除!'
                    });
                } else {
                    _self.$error(
                        "删除账户失败" + res.data.desc.replace("S_E", "")
                    );
                }
            });
        },
        handleInsertOk() {
            if (this.selectAccount.name.length >20) {
                this.$message.error("名称不得多于20个汉字");
                return;
            }
            // var reg = new RegExp(specialKey)
            // let specialKey1 = this.selectAccount.name.replace(/[^u4e00-u9fa5w]/g,'')
            // let specialKey = specialKey.split("`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？")
           
            if (!(/[^a-zA-Z]/.test(this.selectAccount.value))) {
                this.$message.error("金额只可输入数字");
                return;
            }
            
            debugger
            let _isIn = this.selectAccount.name.split("").some(val=>val == '_' || val == ',' || val == '\\' || val == ';' || val == '$' || val == '-' )
            if (_isIn) {
                this.$message.error("名称不得含有 , _等特殊字符");
                return;
            }
            // if (this.selectAccount.desc.length > 50) {
            //     this.$message.error("备注不得多于50个汉字");
            //     return;
            // }
            let _self = this;

            // this.selectAccount = {
            //     id: "",
            //     name: "",
            //     number: "",
            //     issuing: "",
            //     type: "银行账户",
            //     value: "",
            //     date: "",
            //     desc: ""
            // }; 

          let _pam = {
               "atype": { 
                    "id": _self.selectAccount.type, //现金类型 
                },  
                "date":_self.selectAccount.date, //初始日期
                "classname": _self.selectAccount.classname, //开户银行
                "name":_self.selectAccount.name, //帐户名称
                // "number": _self.selectAccount.number, //帐户号
                "remark": _self.selectAccount.desc, //备注
                "value": parseFloat(_self.selectAccount.value) //初始余额
            }

            addAccount(_pam).then(res => {
                if (res.data.code !== 200) {
                    _self.$message.error("新增账户失败");
                } else {
                    _self.$message.success("新增账户成功");
                    // let curAccounts = res.data.data;
                    // let ele = curAccounts[0];
                    // ele.startdate = "";
                    // ele.enddate = "";
                    // ele.rows = 0;
                    // ele.curincome = 0;
                    // ele.curexpense= 0;
                    // _self.accounts.push(ele);
                    _self.$emit('accountInserted', res.data);
                }
                _self.handleModifyCancell();
                _self.initAccouts();
            });
        },
        handleModifyOk() {
            let _self = this;
            if (!_self.isAccountModify) {
                _self.handleInsertOk();
                return;
            }
            debugger
            if (_self.selectAccount.id === "") return;
            if (_self.selectAccount.name.length > 20) {
                _self.$message.error("名称不得多于20个");
                return;
            }
            let _isIn = this.selectAccount.name.split("").some(val=>val == '_' || val == ',' || val == '\\' || val == ';' || val == '$' || val == '-' )
            if (_isIn) {
                this.$message.error("名称不得含有 , _ \\ ; $ -等特殊字符");
                return;
            }
            // if (_self.selectAccount.desc.length > 20) {
            //     _self.$message.error("备注不得多于50个汉字");
            //     return;
            // }
           
            if (!(/[^a-zA-Z]/.test(_self.selectAccount.value))) {
                _self.$message.error("金额只可输入数字");
                return;
            }
            // console.log(_self.selectAccount);
            // debugger;
            // delete _self.selectAccount.type;
            _self.selectAccount.value = parseFloat(_self.selectAccount.value);
            delete _self.selectAccount.company;
            const curAcccount = _self.selectAccount;
            
            // if (_self.currentUser.hasaccount) {
            updateAccount(_self.selectAccount).then(res => {
                if (res.data.code !== 200) {
                    _self.$message.error(
                    "修改账户失败" + res.data.desc.replace("S_E", "")
                    );
                    // console.log("删除账户失败" + res.data.desc);
                } else {
                    // let ele =  _self.accounts.filter(val=>val.id==_self.curAcccount.id)[0]

                    // for (let i = 0; i < _self.accounts.length; i++) {
                    //   let ele = _self.accounts[i];
                    //   if (ele.id === _self.curAcccount.id) {
                    //     // debugger;
                    //     ele.name = _self.curAcccount.name;
                    //     ele.date = _self.curAcccount.date;
                    //     // ele.value += curAcccount.value - ele.balance;
                    //     ele.value = _self.curAcccount.value;
                    //     ele.desc = _self.curAcccount.desc;
                    //     ele.classname = _self.curAcccount.classname;
                    //     ele.balance = parseFloat(ele.balance) + parseFloat(_self.curAcccount.value)
                    //     break;
                    //   }
                    // }
                    
                    debugger
                    //  _self.selectAccount= _self.selectAccount 
                    _self.$message.success("更改账户成功");
                    _self.$emit('accountInserted', res.data);

                    _self.handleModifyCancell();
                    _self.initAccouts();
                }
            });
        }
    }
}
</script>
