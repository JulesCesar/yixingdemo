<template>
  <div>
    <v-row>
      <v-col span="24">
        <p class="bdata-content-title">业务数据管理</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col span="24">
        <p class="bdata-content-title2">业务数据上传说明：通过“数据源接入”功能，按照流程进行数据接入，即可在这里看到上传后的有效信息</p>
      </v-col>
    </v-row>
    <v-row style="margin-top: 24px;">
      <v-col span="24">
        <v-data-table class="bdata-table" :data="busiData" :columns="columns" stripe bordered></v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col span="24" style="border-bottom: 2px solid #ddd; margin: 16px 0;"></v-col>
    </v-row>
    <v-row>
      <v-col span="24">
        <p class="bdata-content-title">重点关注指标</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col span="16">
        <p class="bdata-content-title2">使用说明：老板可在移动端的“业务”tab下按顺序查看这些数据的分析</p>
      </v-col>
      <v-col span="8" style="text-align: end;">
        <v-button type="primary" size="large" @click="showModal"><v-icon type="plus"></v-icon> 新增关注指标</v-button>
      </v-col>
    </v-row>
    <v-row style="margin-top: 24px;">
      <v-col span="24" >
        <v-data-table class="bdata-table" :data="keyIdxData" :columns="keyIdxColumns" stripe bordered ref="keyTable" @clickrow="handleRowClick">
          <template slot="th" slot-scope="props">
            <strong v-if="props.column.field=='action'">操作</strong>
            <strong v-else v-html="props.title"></strong>
          </template>
          <template slot="td" slot-scope="props">
              <div v-if="props.column.field=='action'" class="bdata-form-icon-group">
                <div @click="handleUp"><v-icon type="arrow-up" class="bdata-form-icon" ></v-icon></div>
                <div @click="handleDown"><v-icon type="arrow-down" class="bdata-form-icon"></v-icon></div>
                <v-popconfirm  title="确定删除吗?" @confirm="handleDelete">
                  <v-icon type="delete" class="bdata-form-icon"></v-icon>
                </v-popconfirm>
              </div>
            <span v-else v-html="props.content"></span>
          </template>   
        </v-data-table>
      </v-col>
    </v-row>

    <v-modal title="新增重点关注指标" :visible="visible" @cancel="modalClose">
      <v-form direction="horizontal">
        <v-form-item label="指标分类" :label-col="labelCol" :wrapper-col="wrapperCol" required>
          <v-radio-group 
            @change="change"
            v-model="radioValue"
            :data="[{value: '财务', text: '财务指标'},{value: '业务', text: '业务指标'}]">
          </v-radio-group>
        </v-form-item>
        <v-form-item label="指标名称" :label-col="labelCol" :wrapper-col="wrapperCol">
          <v-select :allowClear="false" placeholder="请选择" search :data="modalValues" v-model="modalSelectValue"></v-select>
        </v-form-item>
      </v-form>
      <div slot="footer">
        <v-button key="cancel" type="ghost" @click="modalClose">
            取 消
        </v-button>
        <v-button key="confirm" type="primary" @click="handleAdd">
            保 存
        </v-button>
      </div>
    </v-modal>
  </div>
</template>

<script>
import {
  getDrivingStat,
  getActivity,
  insertActivity,
  sortActivity,
  deleteActivity
} from '../../models/driving.js';

export default {
  data() {
    return {
      selectRow: null,
      handleState: '',
      visible: false,
      modalSelectValue: '',
      radioValue: '财务',
      modalValues: [],
      receiverOptions: [
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'}
      ],
      categoryOptions: [
        {value: '4', label: '4'},
        {value: '5', label: '5'},
        {value: '6', label: '6'}
      ],
      value: '1',
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 14
      },
      newArapData: {
        receiver: '',
        accountType: '',
        name: '',
        category: '',
        money: '',
        date: '',
        note: ''
      },
      busiData(params) {
        // let _self = this;
        return getDrivingStat({}).then(res => {
          // console.log(res.data);
          if (res.data.code !== 200) {
            this.$notification.open({
                  message: '业务管理',
                  description: '错误信息：' + res.data.desc,
                  onClose: close
                });
          }
          if (res.data.data === null) {
            res.data.data = [];
          }
          return {
            "result": res.data.data
          }
        });
      },
      keyIdxData(params) {
        let _self = this;
        return getActivity({}).then(res => {
          if (res.data.code !== 200) {
            _self.$notification.open({
                  message: '业务管理',
                  description: '错误信息：' + res.data.desc,
                  onClose: close
                });
          }
          if (res.data.data === null) {
            res.data.data = [];
          }
          return {
            "result": res.data.data
          }
        });
      },
      columns: [
        {title: 'ID', field: 'id'}, // {id: 10001, name: "低价值客户", mindate: "2017-06-01", maxdate: "2017-12-04", datasource: "Mysql"
        {title: '指标名称', field: 'name'},
        {title: '数据起始时间', field: 'mindate'},
        {title: '数据最新更新时间', field: 'maxdate'},
        {title: '来源', field: 'datasource'}
      ],
      keyIdxColumns: [
        {title: '排序', field: 'index'}, // {id: 10001, name: "低价值客户", type: "业务", index: 1}
        {title: '指标名称', field: 'name'},
        {title: 'ID', field: 'id'},
        {title: '指标类型', field: 'type'},
        {title: '操作', field: 'action'}
      ]
    }
  },
  methods: {
    change(value) {
      // console.log(value + '|||||' + this.radioValue);
    },
    showModal() {
      let _self = this;
      _self.visible = true;
      if (_self.modalValues.length===0) {
        getDrivingStat({}).then(res => {
          if (res.data.data === null) {
            res.data.data = [];
          }
          if (res.data.data.length>0) {
            _self.modalValues = [];
            res.data.data.forEach(element => {
              _self.modalValues.push({value:element.id+'', label:element.name});
            });
            _self.modalSelectValue = _self.modalValues[0].value;
          }
        });
      }
      
    },
    modalClose() {
      this.visible = false;
    },
    handleRowClick(rowObj) {
      // debugger;
      let _self = this;
      _self.selectRow = rowObj.row;
      // console.log(_self.selectRow);
      // console.log(_self.handleState);
      if (_self.handleState !== '') {
        sortActivity({ id: _self.selectRow.id, sort: _self.handleState }).then(res => {
          if (res.data.code !== 200) {
            this.$notification.open({
                  message: '排序信息',
                  description: '错误信息：' + res.data.desc,
                  onClose: close
                });
          } else {
            _self.$refs.keyTable.refresh();
          }
        });
      }
      _self.handleState = '';
    },
    handleUp() {
      this.handleState = 'up';
      // console.log(this.selectRow);
      // this.$refs.keyTable.refresh();
    },
    handleDown() {
      this.handleState = 'down';
      // console.log(this.$refs.keyTable.currentData)
    },
    handleDelete() {
      // console.log("handleDown:"+index)
      // alert(index);
      deleteActivity({ id: _self.selectRow.id }).then(res => {
        if (res.data.code !== 200) {
          this.$notification.open({
                message: '删除信息',
                description: '错误信息：' + res.data.desc,
                onClose: close
              });
        } else {
          _self.$refs.keyTable.refresh();
        }
      });
    },
    handleAdd() {
      // alert(this.modalSelectValue + this.radioValue);
      let _self = this;
      _self.visible = false;
      let modalSelectName = '';
      _self.modalValues.forEach(element => {
        if (element.id === _self.modalSelectValue) modalSelectName = element.name;
      });
      insertActivity({ id: _self.modalSelectValue,
        name: modalSelectName,
        type: _self.radioValue }).then(res => {
        if (res.data.code !== 200) {
          _self.$notification.open({
            message: '添加信息',
            description: '错误信息：' + res.data.desc,
            onClose: close
          });
        } else {
          _self.$refs.keyTable.refresh();
        }
      });
    }
  }
}
</script>

<style>
.bdata-content-title {
  font-size: 18px;
  text-align: start;
  margin-top: 8px;
}
.bdata-content-title2 {
  font-size: 14px;
  text-align: start;
  margin-top: 8px;
  color: #999;
}
.bdata-form-group-title {
  text-align: start;
  border-top: 1px solid #ddd;
  padding-top: 8px;
}
.bdata-form-icon-group {
  display: -webkit-flex; /* Safari */
  display: flex;
}
.bdata-form-icon-group div{
  margin-left: 5px;
  margin-right: 10px;
  cursor: pointer;
}
.bdata-form-icon {
  font-size: 16px;
  color: #1E90FF;
}
.bdata-table:hover {
  cursor: pointer;
}
</style>
