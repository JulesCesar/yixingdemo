<template>
    <a-modal :title="isModify ? '编辑应收应付款人' : '新增应收应付款人'" :visible="modalVisible" @cancel="handleCancel">
        <v-form direction="horizontal">
            <v-form-item label="对方账户类型" :label-col="labelCol" :wrapper-col="wrapperCol" required >
                <v-radio-group 
                    v-model="selectAraper.rtype.id"
                    :disabled="isModify"
                    :data="[{value: 1, text: '公司'},{value: 2, text: '个人'}]">
                </v-radio-group>
            </v-form-item>
            <v-row v-if="selectAraper.rtype.id == 1">
                <v-col span="24">
                    <p class="receiver-form-group-title-name">公司信息</p>
                    <p class="receiver-form-group-title"></p>
                </v-col>
            </v-row>
            <v-form-item label="显示名称" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                <v-input v-model="selectAraper.name"></v-input>
            </v-form-item>
            <v-form-item label="真实名称" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                <v-input v-model="selectAraper.cname"></v-input>
            </v-form-item>
            <v-form-item label="联系电话" :maxlength="15" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input v-model="selectAraper.phone"></v-input>
            </v-form-item>
            <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input type="textarea" v-model="selectAraper.remark"></v-input>
            </v-form-item>
            <v-row v-if="selectAraper.rtype.id == 1">
                <v-col span="24">
                    <p class="receiver-form-group-title-name">联系人信息</p>
                    <p class="receiver-form-group-title"></p>
                </v-col>
            </v-row>
            <v-form-item v-if="selectAraper.rtype.id == 1" label="联系人姓名" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input v-model="selectAraper.linkman"></v-input>
            </v-form-item>
            <v-form-item v-if="selectAraper.rtype.id == 1" label="联系人手机" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input  v-model="selectAraper.linkphone"></v-input>
            </v-form-item>
        </v-form>
        <div slot="footer">
            <div v-if="isModify"  style="float:left; padding-left:10px;">
                <a-popconfirm title="确定删除吗?" @confirm="handleModifyDelete" okText='确定' cancelText="取消">
                    <a-button type="danger">
                        删 除
                    </a-button>
                </a-popconfirm>
            </div>
            <a-button @click="handleCancel">
                取 消
            </a-button>
            <a-button type="primary" @click="handleSave" :disabled="isSaveEnabled">
                保 存
            </a-button>
        </div>
    </a-modal>
</template>

<script>
import {
    updateAraper,
    deleteAraper,
    addAraper
} from '../../models/arap';

export default {
    props: {
        modalVisible: {
            type: Boolean,
            default: false
        },
        isModify: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectAraper: {
                id: '',
                rtype: {
                    id: 1,
                    name: '公司'
                },
                name: "",
                cname: "",
                phone: "",
                linkman: "",
                linkphone: "",
                remark: ""
            },
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 14
            },
        }
    },
    computed: {
        isSaveEnabled() {
            return this.selectAraper.name === "" || this.selectAraper.cname === "";
        }
    },
    created() {
        this.$bus.$on('updatearaper', (_araper) => {
            Object.keys(_araper).forEach(key => {
                this.selectAraper[key] = _araper[key];
            });
        });
    },
    methods: {
        // keygongs(val) {
        //     let _self = this;
        //     if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(val)) {
        //         _self.$message.error("联系电话不正确");
        //         return;
        //     }
        // },
        // keyphone(val) {
        //     let _self = this;
        //     if (!/^1(3|4|5|7|8)\d{9}$/.test(val)) {
        //         _self.$message.error("手机号码不正确");
        //         return;
        //     }
        // },
        initSelectAraper() {
            this.selectAraper = {
                id: '',
                rtype: {
                    id: 1,
                    name: '公司'
                },
                name: "",
                cname: "",
                phone: "",
                linkman: "",
                linkphone: "",
                remark: ""
            };
        },
        handleCancel() {
            this.initSelectAraper();
            this.$emit('arapercancel');
        },
        handleSave() {
            let _self = this;
            if (_self.selectAraper.name === "" || _self.selectAraper.cname === "") {
                _self.$message.error(_self.title + "名称不能为空");
                return;
            }
            if (_self.selectAraper.name.length > 20 || _self.selectAraper.cname.length > 20) {
                _self.$message.error("名称不得多于20个汉字");
                return;
            }
            if (_self.selectAraper.linkman && _self.selectAraper.linkman.length > 20) {
                _self.$message.error("联系人姓名不得多于20个汉字");
                return;
            }
            if (_self.selectAraper.remark && _self.selectAraper.remark.length > 50) {
                _self.$message.error("备注不得多于50个汉字");
                return;
            }
            if (!_self.isModify) {
                addAraper(_self.selectAraper).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        _self.$message.success("新增应收应付款人成功");
                        _self.initSelectAraper();
                        _self.$emit('arapersaved', res.data);
                    } else {
                        _self.$message.error("新增应收应付款人失败");
                    }
                });
            } else {
                Object.keys(_self.selectAraper).forEach(key => {
                    if (_self.selectAraper[key] == null) {
                        _self.selectAraper[key] = ''
                    }
                });
                _self.selectAraper.customObject = {};
                updateAraper(_self.selectAraper).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        _self.$message.success("修改应收应付款人成功");
                        _self.$emit('arapersaved', _self.selectAraper);
                        _self.initSelectAraper();
                    } else {
                        _self.$message.error("修改应收应付款人失败");
                    }
                });
            }
        },
        handleModifyDelete() {
            TDAPP.onEvent("删除", "顶部");
            let _self = this;
            deleteAraper(_self.selectAraper.id).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    _self.$message.success("删除应收应付款人成功");
                    _self.selectAraper.isDelete = true;
                    _self.$emit('arapersaved', _self.selectAraper);
                    _self.initSelectAraper();
                } else {
                    _self.$message.error("删除应收应付款人失败");
                }
            });
        },
    }
}
</script>
