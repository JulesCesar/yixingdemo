<template>
    <div>
        <a-modal
            :title="isFtypeModify ? '编辑收支分类' : '新建收支分类'"
            :visible="addvisible"
            @ok="addAtype"
            @cancel="cancelAtype"
            okText="保存"
            cancelText="取消"
        >
            <a-form-item label="选择父类:" :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol">
                <a-select style="width: 100%;" v-model="selectFtype.parrentid" >
                    <a-select-opt-group v-for="item in inOutAtype" :key="item.type">
                        <span slot="label"><a-icon type="user"/>{{item.type}}</span>
                        <a-select-option v-for="opt in item.options" :value="opt.id" :key="opt.id">
                            {{opt.name}}
                        </a-select-option> 
                    </a-select-opt-group> 
                </a-select>
            </a-form-item>

            <a-form-item label="类目名称:" :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol">
                <a-input placeholder="请输要创建的子类名称" v-model="selectFtype.name"/>
            </a-form-item>

            <a-form-item label="备注:" :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol">
                <a-input placeholder="请输入备注" v-model="selectFtype.remark" />
            </a-form-item>
        </a-modal>
    </div>
</template>

<script>
import {
    addFtype,
    updateFtype,
    listFtype
} from '../../models/moneyFlow';

export default {
    props: {
        addvisible: {
            type: Boolean,
            default: false
        },
        isFtypeModify: {
            type: Boolean,
            default: false
        },
        atageDatas: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            // atageDatas:[],
            selectFtype: {
                id: '',
                name: '',
                parrentid: '',
                flag: false,
                remark: ''
            },
            formItemLayout: {
                labelCol: {
                    span: 4,
                    offset: 2
                },
                wrapperCol: {
                    span: 14
                }
            }
        }
    },
    computed: {
        parrentFtypes(){
            let _self = this;
            let _fdata = _self.atageDatas.filter(val=>val.parrentid==0);
            _fdata.forEach(fval => { 
                fval.children= _self.atageDatas.filter(val=>val.parrentid == fval.id);
            });
            return _fdata;
        },
        inOutAtype(){
            let _self = this;
            let _atypes = _self.parrentFtypes;
            return [{
                'type':'支出',
                'flag':0,
                'options': _atypes.filter(val => val.flag == false)
            },
            {
                'type':'收入',
                'flag':1,
                'options': _atypes.filter(val => val.flag == true)
            }]
        },
    },
    created() {
        this.$bus.$on('updateFtype', (oldFtype) => {
            if (typeof oldFtype == 'string') {
                this.initAtype();
                this.selectFtype.name = oldFtype;
            } else {
                Object.keys(oldFtype).forEach(key => {
                    this.selectFtype[key] = oldFtype[key];
                });
            }
        });
    },
    mounted() {
        // let _self = this; 
        // listFtype({}).then(res => {
        //     if (res.status === 200 && res.data.code === 200) {
        //         _self.atageDatas = res.data.data;
        //     }
        // });
    },
    methods: {
        cancelAtype() {
            this.initAtype();
            this.$emit('atagemodalcancel');
        },
        addAtype() {
            let _self = this;
            let _isIn = _self.selectFtype.name.split("").some(val=>val == '_' || val == ',' || val == '\\' || val == ';' || val == '$' || val == '-' || val == '，' )
            if (_isIn) {
                _self.$message.error("创建的类目不得含有 , _ @ 等特殊字符");
                return;
            }
            let _class = {
                'name': _self.selectFtype.name,
                'parrentid': _self.selectFtype.parrentid,
                remark: _self.selectFtype.remark
            };
            if (_self.selectFtype.id) {
                _class.id = _self.selectFtype.id;
                updateFtype(_class).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        _self.$message.success('更新成功');
                        _self.$emit('ftypeSaved', _self.selectFtype)
                    } else {
                        _self.$message.error('更新失败');
                    }
                });
            } else {
                addFtype(_class).then(res=>{
                    if (res.status === 200 && res.data.code === 200) {
                        _self.$message.success("添加成功");
                        _self.$emit('ftypeSaved', res.data);
                    } else {
                        _self.$message.error("添加失败");
                    }
                });
            }
        },
        initAtype() {
            this.selectFtype = {
                id: '',
                parrentid: '',
                flag: false,
                name: '',
                remark: ''
            };
        }
    }
}
</script>
