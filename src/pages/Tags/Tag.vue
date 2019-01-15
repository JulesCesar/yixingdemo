<template>
    <div id="Labeltags">
        <a-modal :visible="modalVisible" :title="(isEdit ? '编辑' : '添加') + (selectTagLvl == '1' ? '一级' : '二级') + '标签'" @cancel="handleCancel" width="480px">
            <a-form style="margin-top: 16px;">
                <a-form-item required label="所属一级标签" v-if="selectTagLvl == '2'" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-select :options="pTagOpt" v-model="selectTag.parrentid" />
                </a-form-item>
                <a-form-item required label="名称" :labelCol="selectTagLvl == '2' ? formLayout.labelCol : {span: 4}" :wrapperCol="selectTagLvl == '2' ? formLayout.wrapperCol : {span: 16, offset: 1}">
                    <a-input v-model="selectTag.name" />
                    <a-alert type="error" v-if="nameExists" message="该名称已存在！" banner class="nameInputAlert" />
                </a-form-item>
                <a-form-item label="备注" v-if="selectTagLvl == '2'" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-input v-model="selectTag.remark" />
                </a-form-item>
            </a-form>
            <template slot="footer">
                <a-button v-if="isEdit" @click="handleRmCTag" type="danger" style="position: absolute; left: 16px;">删除</a-button>
                <a-button @click="handleCancel">取消</a-button>
                <a-button @click="saveTag" type="primary" :disabled="disableSave">保存</a-button>
            </template>
        </a-modal>

        <a-row style="margin-top: 8px; margin-bottom: 16px;">
            <a-col :span="24">
                <a-button type="primary" size="large" @click="handleAddPTag">新增一级标签</a-button>
            </a-col>
        </a-row>

        <div v-if="isLoading" class="nodataimg"><a-spin size="large" /></div>
        <div v-else>
            <a-tabs v-if="tagDatas.length" v-model="activeTag" type="editable-card" hideAdd @edit="handelRmPTag">
                <a-tab-pane v-for="pane in pTagDatas" :key="pane.id" :tab="pane.name">
                    <a-row style="padding: 24px;">
                        <a-col :span="24" v-if="cTagDatas[pane.id].length">
                            <div class="add_cTag_card" @click="handleAddCTag(pane.id)">
                                <a-card title="添加标签" class="borderdashed" style="width:170px;display: inline-block; margin-right: 24px;">
                                    <p style="overflow-y: auto;text-align: center; transform: scale(3, 3) translateY(-3px);">
                                        <a-icon type="plus" />
                                    </p>
                                </a-card>
                            </div>

                            <a-card v-for="cTag in cTagDatas[pane.id]" :title="cTag.name" :key="cTag.id"
                            style="width:170px; display: inline-block; margin-right: 24px; margin-bottom: 24px;">
                                <span slot="extra" @click="editTag(cTag)" title="编辑标签" class="tag-edit-hover">
                                    <a-icon type="edit" />
                                </span>
                                <p class="tagsoverfliot">{{cTag.remark ? cTag.remark : '暂无标签信息'}}</p>
                            </a-card>
                        </a-col>

                        <a-col :span="24" v-else>
                            <div class="add_cTag_card" @click="handleAddCTag(pane.id)">
                                <a-card title="添加标签">
                                    <p style="text-align: center; transform: scale(3, 3) translateY(-3px);">
                                        <a-icon type="plus" />
                                    </p>
                                </a-card>
                            </div>
                        </a-col>
                    </a-row>
                </a-tab-pane>
            </a-tabs>
            <div v-else style="width:100%;">
                <div style="width:100px;height:100px;margin:200px auto;">
                    <img style="width:100px;height:100px;" src="../../assets/img/zwsj.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    listTag,
    addTag,
    updateTag,
    deleteTag
} from '../../models/tag';

export default {
    data() {
        return {
            isLoading: true,
            isEdit: false,
            tagDatas: [],
            activeTag: '',
            modalVisible: false,
            selectTag: {
                name: '',
                parrentid: '',
                remark: ''
            },
            selectTagLvl: '1',
            formLayout: {
                labelCol: {
                    span: 7
                },
                wrapperCol: {
                    span: 13,
                    offset: 1
                }
            }
        }
    },
    computed: {
        // 一级标签
        pTagDatas() {
            return this.tagDatas.filter(td => td.parrentid == '0');
        },
        // 二级标签
        cTagDatas() {
            let _cTags = {};
            this.pTagDatas.map(item => {
                _cTags[item.id] = this.tagDatas.filter(td => td.parrentid == item.id);
            });
            return _cTags;
        },
        pTagOpt() {
            let _pt = this.pTagDatas;
            _pt.map(item => {
                item.label = item.name;
                item.value = item.id;
                item.key = item.id;
            });
            return _pt;
        },
        disableSave() {
            if (this.nameExists) {
                return true;
            }
            if (this.selectTagLvl == '1' && this.selectTag.name) {
                return false;
            }
            if (this.selectTagLvl == '2' && this.selectTag.name && this.selectTag.parrentid) {
                return false;
            }
            return true;
        },
        nameExists() {
            if (this.selectTagLvl == '1') {
                return this.pTagDatas.map(pt => pt.name).includes(this.selectTag.name);
            } else {
                let _editTag = this.cTagDatas[this.activeTag].find(ct => ct.id == this.selectTag.id);
                if (_editTag) {
                    // 编辑状态
                    return this.cTagDatas[this.activeTag].filter(ct => ct.id != this.selectTag.id).map(ct => ct.name).includes(this.selectTag.name);
                } else {
                    // 添加状态
                    return this.cTagDatas[this.activeTag].map(ct => ct.name).includes(this.selectTag.name);
                }
            }
        }
    },
    mounted() {
        let _self = this;
        listTag().then(res => {
            if (res.data.code == 200) {
                _self.isLoading = false;
                _self.tagDatas = res.data.data;
                _self.activeTag = _self.tagDatas.length ? res.data.data[0].id : '';
            }
        })
    },
    methods: {
        handleAddTag(pid) {
            this.isEdit = false;
            this.initSelectTag(pid);
            this.modalVisible = true;
        },
        handleAddCTag(pid) {
            this.selectTagLvl = '2';
            this.handleAddTag(pid);
        },
        handleAddPTag() {
            this.selectTagLvl = '1';
            this.handleAddTag();
        },
        handleCancel() {
            this.modalVisible = false;
        },
        initSelectTag(pid) {
            this.selectTag = {
                name: '',
                parrentid: pid ? pid : '',
                remark: ''
            };
        },
        saveTag() {
            let _self = this;
            let _param = {
                name: _self.selectTag.name,
                remark: _self.selectTag.remark
            };
            if (_self.selectTagLvl == '1') {
                _param.parrentid = '0';
            } else {
                _param.parrentid = _self.selectTag.parrentid;
            }
            if (_self.isEdit) {
                _param.id = _self.selectTag.id;
                updateTag(_param).then(res => {
                    if (res.data.code == 200) {
                        _self.$message.success('修改成功！');
                        let _modifiedTag = _self.tagDatas.find(td => td.id == res.data.id);
                        if (_modifiedTag) {
                            _modifiedTag.name = res.data.name;
                            _modifiedTag.parrentid = res.data.parrentid;
                            _modifiedTag.remark = res.data.remark;
                        }
                    } else {
                        _self.$message.error('修改失败！');
                    }
                    _self.modalVisible = false;
                });
            } else {
                addTag(_param).then(res => {
                    if (res.data.code == 200) {
                        _self.$message.success('添加成功！');
                        let _resTag = {
                            name: res.data.name,
                            id: res.data.id,
                            parrentid: res.data.parrentid,
                            remark: res.data.remark
                        };
                        _self.tagDatas.push(_resTag);
                    } else {
                        _self.$message.error('添加失败！');
                    }
                    _self.modalVisible = false;
                });
            }
        },
        handelRmPTag(targetKey, action) {
            let _self = this;
            let _pTag = _self.pTagDatas.find(pt => pt.id == targetKey);
            if (_pTag.name == '未分类') {
                _self.$message.warning('“未分类”标签不可删除！');
                return;
            }
            let _children = _self.cTagDatas[targetKey];
            if (_children.length) {
                _self.$confirm({
                    title: '系统提示',
                    content: '该标签分类下有 ' + _children.length + ' 项二级标签，确认删除？',
                    okText: '确定',
                    cancelText: '取消',
                    iconType: 'exclamation-circle',
                    onOk() {
                        return Promise.resolve(_self.removeTag(targetKey));
                    },
                    onCancel() {}
                });
            } else {
                _self.removeTag(targetKey);
            }
        },
        handleRmCTag() {
            this.removeTag(this.selectTag.id);
        },
        removeTag(id) {
            let _self = this;
            deleteTag(id).then(res => {
                if (res.data.code == 200) {
                    _self.modalVisible = false;
                    _self.$message.success('删除成功！');
                    _self.tagDatas = _self.tagDatas.filter(td => td.id != id);
                    // 若删除当前active一级标签，则置active为第一个tab页
                    if (_self.activeTag == id && _self.tagDatas.length) {
                        _self.activeTag = _self.tagDatas[0].id;
                    }
                } else {
                    _self.$message.error('删除失败！' + res.data.desc);
                }
            })
        },
        editTag(obj) {
            let _self = this;
            _self.isEdit = true;
            _self.selectTag = {
                name: obj.name,
                id: obj.id,
                remark: obj.remark,
                parrentid: obj.parrentid
            };
            _self.selectTagLvl = _self.selectTag.parrentid == '0' ? '1' : '2';
            _self.modalVisible = true;
        }
    }
}
</script>

<style>
.tag-edit-hover {
    cursor: pointer;
}
.tag-edit-hover:hover {
    color: #3296fa;
}
.add_cTag_card {
    color: #3296fa;
    width: 115px;
    display: inline-block;
    margin-right: 24px;
    margin-bottom: 24px;
}
.add_cTag_card:hover {
    cursor: pointer;
}
.add_cTag_card:hover div {
    opacity: 1;
}
.add_cTag_card div {
    text-align: center;
    color: #3296fa;
    opacity: 0.9;
}
.nameInputAlert {
    font-size: 12px;
    line-height: 12px;
    margin-top: 8px;
}
.nameInputAlert i {
    top: 8px !important;
}
</style>
