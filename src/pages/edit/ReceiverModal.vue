<template>
    <div>
        <v-modal :title="isReceiverModify ? '编辑收付款人' : '新增收付款人'" :visible="insertvisible" @cancel="handleCancell">
            <v-form direction="horizontal">
            <v-form-item label="收付款人类型" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                <a-radio-group v-model="selectAccount.type">
                <a-radio :disabled="isReceiverModify" v-for="optItem in rtypeOption" :key="optItem.id" :value="optItem.id">
                    {{optItem.remark}}
                </a-radio>
                </a-radio-group>
            </v-form-item>
            <v-row v-if="selectAccount.type== 1">
                <v-col span="24">
                <p class="receiver-form-group-title-name">公司信息</p>
                <p class="receiver-form-group-title"></p>
                </v-col>
            </v-row>
            <v-form-item label="显示名称" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                <v-input v-model="selectAccount.name"></v-input>
                <!-- <p>(不多于20个汉字)</p> -->
            </v-form-item>
            <v-form-item  label="真实名称" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                <v-input v-model="selectAccount.cname"></v-input>
                <!-- <p>(不多于20个汉字)</p> -->
            </v-form-item>
                <!-- 选择标签 -->
                <!-- <a-form-item label="选择标签" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-tag v-if="selectAccount.tags.length" v-for="tag in selectAccount.tags" :key="tag.id" closable @afterClose="() => handleRemoveTag(tag)">{{tag.name}}</a-tag>
                    <a-cascader expandTrigger="hover" style="width: 82px;" placeholder="选择标签" :options="tagOptions" @change="selectTagChange" v-model="tagCascader" />
                </a-form-item> -->
            <v-form-item  v-if="selectAccount.type==1" label="联系电话" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input v-model="selectAccount.phone"></v-input>
            </v-form-item>
            <v-form-item v-if="selectAccount.type==2" label="联系电话" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input v-model="selectAccount.phone"></v-input>
            </v-form-item>



            <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input v-model="selectAccount.remark"></v-input>
            </v-form-item>
            <v-row v-if="selectAccount.type==1">
                <v-col span="24">
                <p class="receiver-form-group-title-name">联系人信息</p>
                <p class="receiver-form-group-title"></p>
                </v-col>
            </v-row>
            <v-form-item v-if="selectAccount.type==1" label="联系人姓名" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input v-model="selectAccount.linkman"></v-input>
                <!-- <p>(不多于8个汉字)</p> -->
            </v-form-item>
            <v-form-item v-if="selectAccount.type==1" label="联系人手机" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input v-model="selectAccount.linkphone"></v-input>
            </v-form-item>
            </v-form>
            <div slot="footer">
            <div v-if="isReceiverModify" style="float:left; padding-left:10px;">
                <v-popconfirm title="确定删除吗?" @confirm="handleModifyDelete">
                    <v-button key="delete" type="error">
                        删 除
                    </v-button>
                </v-popconfirm>
            </div>
            <v-button key="cancel" type="ghost" @click="handleCancell">
                取 消
            </v-button>
            <v-button key="confirm" type="primary" @click="handleOk" :disabled="isSaveEnabled">
                保 存
            </v-button>
            </div>
        </v-modal>

        <!-- 添加标签modal -->
        <a-modal :visible="addTagModalVisible" title="添加标签" @cancel="handleAddTagCancel" width="480px">
            <a-form style="margin-top: 16px;">
                <a-form-item required label="所属一级标签" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-select :options="pTagOpt" v-model="selectTag.parrentid" />
                </a-form-item>
                <a-form-item required label="名称" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-input v-model="selectTag.name" />
                </a-form-item>
                <a-form-item label="备注" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-input v-model="selectTag.remark" />
                </a-form-item>
            </a-form>
            <template slot="footer">
                <a-button @click="handleAddTagCancel">取消</a-button>
                <a-button @click="saveTag" type="primary" :disabled="disableSave">保存</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
import {
  listReceiver,
  addReceiver,
  listRAtype,
  updateReceiver,
  deleteReceiver
} from '../../models/moneyFlow.js';

import {
    listTag,
    addTag,
    updateTag,
    deleteTag
} from '../../models/tag';

export default {
  props: {
    isArap: {
      type: Boolean,
      default: false
    },
    insertvisible: {
      type: Boolean,
      default: false
    },
    isReceiverModify: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        tagDatas: [],
        tagCascader: [],
        addTagModalVisible: false,
        selectTag: {
            name: '',
            parrentid: '',
            remark: ''
        },
        formLayout: {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 13,
                offset: 1
            }
        },
      rtypeOption: [],
      selectType: '公司',
      selectAccount: {
        "id":'',
        "type": 1,
        "name":"",
        "cname":"",
        "account":"",
        "phone":"",
        "email":"",
        "linkman":"",
        "linkphone":"",
        "remark":"",
        tags: []
      },
      labelCol: {
          span: 7
      },
      wrapperCol: {
          span: 14
      }
    }
  },
  created() {
    this.$bus.$on('receivermodalinit', () => {
      this.initObjects();
    });
    this.$bus.$on('updatereceiver', (old_receiver) => {
        if (typeof old_receiver == 'string') {
            this.initObjects();
            this.selectAccount.name = old_receiver;
        } else {
            this.selectAccount = {};
            Object.keys(old_receiver).forEach(key => {
                this.selectAccount[key] = old_receiver[key]
            });
            this.selectAccount.type = this.selectAccount.rtype.id;
        }
    })
  },
  computed: {
    labelIstext() {
      return this.isEdit ? "编辑普通流水" : "记一笔流水";
    },
    isSaveEnabled() {
      return this.selectAccount.name==='' || this.selectAccount.cname === '';
    },
    title() {
      return this.isArap? '应收应付款' : '收付款';
    },
    tagOptions() {
        let _tagDatas = [];
        // this.tagDatas深度复制
        this.tagDatas.map(td => {
            let _tmp = {};
            Object.keys(td).forEach(key => {
                _tmp[key] = td[key];
            });
            _tagDatas.push(_tmp);
        });
        let _pTags = _tagDatas.filter(td => td.parrentid == '0');
        _pTags.map(pt => {
            pt.label = pt.name;
            pt.value = pt.id;
        });
        _pTags.map(pt => {
            let _cTags = _tagDatas.filter(td => td.parrentid == pt.id);
            _cTags.map(ct => {
                ct.label = ct.name;
                ct.value = ct.id;
            });
            pt.children = _cTags;
            pt.disabled = false;
            // 一级标签下无二级标签，则不可选
            if (_cTags.length == 0) {
                pt.disabled = true;
            }
            // 每个一级标签下的二级标签只能选一个
            this.selectAccount.tags.map(st => {
                if (st.parrentid == pt.id) {
                    pt.disabled = true;
                }
            });
        });
        _pTags.unshift({
            label: '添加标签',
            value: '添加标签'
        });
        return _pTags;
    },
    pTagOpt() {
        let _pt = this.tagDatas.filter(td => td.parrentid == '0');
        _pt.map(item => {
            item.label = item.name;
            item.value = item.id;
            item.key = item.id;
        });
        return _pt;
    },
    disableSave() {
        return this.selectTag.name == '' || this.selectTag.parrentid == '';
    }
  },
  mounted() {
      let _self = this;
    listRAtype({}).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        _self.rtypeOption = res.data.data;
      }
    });
    listTag().then(res => {
        if (res.data.code == 200) {
            _self.tagDatas = res.data.data;
        }
    })
  },
  methods: {
    initObjects() {
      this.selectAccount = {
        "id":0,
        "type": 1,
        "name":"",
        "cname":"",
        "account":"",
        "phone":"",
        "email":"",
        "linkman":"",
        "linkphone":"",
        "remark":"",
        tags: []
      };
    },
    onCheckType(value) {
      // debugger;
      let _self = this;
      if (_self.selectType === value) {
        return;
      }
      if (_self.selectType === 'all' && value === '公司') {
        _self.selectType = '个人';
      } else if (_self.selectType === 'all' && value === '个人') {
        _self.selectType = '公司';
      } else {
        _self.selectType = 'all';
      }
    },
    handleCancell(acc) {
        if (!acc) {
            acc = null;
        }
        this.$emit('receivermodalcancel', acc);
    },
    handleOk() {
      let _self = this;
      if (_self.selectAccount.name==='') {
        _self.$message.error(_self.title+"显示名称不能为空");
        return;
      }
      if (_self.selectAccount.name.length > 20 ) {
        _self.$message.error('显示名称不得多于20个汉字');
        return;
      }

      if (_self.selectAccount.cname==='') {
        _self.$message.error(_self.title+"真实名称不能为空");
        return;
      }
      if (_self.selectAccount.cname.length > 20) {
        _self.$message.error('真实名称不得多于20个汉字');
        return;
      }

      if (_self.selectAccount.remark && _self.selectAccount.remark.length > 20) {
          _self.$message.error("备注不得多于20个汉字");
          return;
      }

      if (_self.selectAccount.linkman && _self.selectAccount.linkman.length > 20) {
        _self.$message.error('联系人姓名不得多于个20汉字');
        return;
      }
      if (_self.selectAccount.phone) {
        let reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!reg.test(_self.selectAccount.phone)) {
          _self.$message.error('手机号格式不正确');
          return;
        }
      }
      // 添加
      if (!_self.isReceiverModify) {
        _self.selectAccount.rtype = {
          id: _self.selectAccount.type,
          name: _self.selectAccount.type == 1 ? '公司' : '个人'
        };
        delete _self.selectAccount.type;
        addReceiver(_self.selectAccount).then(res => {
          if (res.data.code === 200) {
            _self.$message.success('新增' + _self.title + '人成功');
            // _self.$emit('insertReciverCallback',res.data.data); 
            _self.$emit('receiverInserted', res.data);
          } else {
            _self.$message.error('新增' + _self.title + '人失败');
          }
        });
        _self.initObjects();
      } else {
        delete _self.selectAccount.company;
        delete _self.selectAccount.customObject;
        delete _self.selectAccount.email;
        delete _self.selectAccount.issuing;
        delete _self.selectAccount.customtype;
        _self.selectAccount.value = parseFloat(_self.selectAccount.value);
        updateReceiver(_self.selectAccount).then(res => {
          if (res.data.code === 200) {
            _self.$message.success('编辑收付款人成功！');
            // _self.handleCancell(_self.selectAccount);
            _self.$emit('receiverInserted', _self.selectAccount);
          } else {
            _self.$message.error('编辑收付款人失败！');
          }
        })
      }
    },
    handleModifyDelete() {
      let _self = this;
      deleteReceiver(_self.selectAccount.id).then(res => {
        if (res.status === 200 && res.data.code === 200) {
          _self.$message.success('Delete Receiver Succeeded.');
          _self.selectAccount.isDeleted = true;
          _self.handleCancell(_self.selectAccount);
        } else if (res.data.code == 60002) {
            _self.$error({
                title: '系统提示',
                content: res.data.desc + '，不可删除！'
            });
        } else {
          _self.$message.error('Delete Receiver Failed.');
        }
      })
    },
    selectTagChange(val, opt) {
        if (val[0] == '添加标签') {
            this.selectTag = {
                name: '',
                parrentid: '',
                remark: ''
            }
            this.addTagModalVisible = true;
        } else {
            // 只显示二级标签
            this.selectAccount.tags.push(opt[1]);
        }
        this.tagCascader = [];
    },
    handleRemoveTag(removedTag) {
        this.selectAccount.tags = this.selectAccount.tags.filter(st => st != removedTag);
    },
    handleAddTagCancel() {
        this.addTagModalVisible = false;
    },
    saveTag() {
        let _self = this;
        let _param = {
            name: _self.selectTag.name,
            remark: _self.selectTag.remark,
            parrentid: _self.selectTag.parrentid
        };
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
                _self.selectAccount.tags.push(_resTag);
            } else {
                _self.$message.error('添加失败！');
            }
            _self.addTagModalVisible = false;
        });
    }
  }
}
</script>

<style>
.receiver-content-title {
  font-size: 18px;
  text-align: start;
  margin-top: 16px;
}
.receiver-content-type {
  color: #A9A9A9;
  font-size: 13px;
  text-align: start;
  margin-top: 6px;
  margin-bottom: 12px;
}
.receiver-content-type-content {
  color: #696969;
  font-size: 15px;
  padding-left: 10px;
}
.receiver-form-group-title-name {
  color: #A9A9A9;
  font-size: 9px;
  text-align: start;
}
.receiver-form-group-title {
  text-align: start;
  border-top: 1px solid #ddd;
  padding-top: 16px;
  padding-bottom: 8px;
}
li[title="添加标签"]::before {
    content: '+';
    color: #fff;
    padding: 0px 6px 3px 5px;
    margin-right: 3px;
    border-radius: 10px;
    width: 20px;
    height: 10px;
    background-color: #14b601;
}
</style>
