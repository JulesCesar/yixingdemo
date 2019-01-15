<template>
  <div>
    <v-row>
      <v-col span="24">
        <p class="dsource-content-title">已接入源</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col span="24">
        <p class="dsource-content-title2">以下为已经成功接入首席财务官的数据源</p>
      </v-col>
    </v-row>
    <v-row style="margin-top: 24px;">
      <v-col span="24">
        <v-data-table class="dsource-table" :data="sourceData" :columns="columns" stripe bordered></v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col span="24" style="border-bottom: 2px solid #ddd; margin: 16px 0;"></v-col>
    </v-row>
    <v-row>
      <v-col span="24">
        <p class="dsource-content-title">可接入数据源</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col span="24" style="margin-top: 24px;">
        <v-card style="width: 240px; display: inline-block; margin-right: 16px; margin-bottom: 8px;" :body-style="{padding: 0, paddingBottom: '24px'}">
          <v-row>
            <v-col span="24" style="text-align: center; height: 120px; display: flex; align-item: center;">
              <img src="../../assets/img/icbc.png" alt="中国工商银行" style="width: 238px;">
            </v-col>
          </v-row>
          <v-row justify="space-between" style="padding:2px 10px 2px 10px; padding-bottom: 0; font-size: 16px; font-weight: bold; color: #999; transform: translateY(12px);">
            <v-col span="12" style="font-size:15px;">中国工商银行</v-col>
            <v-col span="12" style="text-align: end; color: #75b230;">已接入</v-col>
          </v-row>
        </v-card>
        <v-card style="width: 240px; display: inline-block; margin-right: 16px; margin-bottom: 8px;" :body-style="{padding: 0, paddingBottom: '24px'}">
          <v-row>
            <v-col span="24" style="text-align: center; height: 120px; display: flex; align-item: center;">
              <img src="../../assets/img/cmb.png" alt="招商银行" style="width: 238px;">
            </v-col>
          </v-row>
          <v-row justify="space-between" style="padding:2px 10px 2px 10px; padding-bottom: 0; font-size: 16px; font-weight: bold; color: #999; transform: translateY(12px);">
            <v-col span="12" style="font-size:15px;">招商银行</v-col>
            <v-col span="12" style="text-align: end; color: #75b230;">已接入</v-col>
          </v-row>
        </v-card>
        <v-card style="width: 240px; display: inline-block; margin-right: 16px; margin-bottom: 8px;" :body-style="{padding: 0, paddingBottom: '24px'}">
          <v-row>
            <v-col span="24" style="text-align: center; height: 120px; display: flex; align-item: center;">
              <img src="../../assets/img/ccb.png" alt="中国建设银行" style="width: 238px;">
            </v-col>
          </v-row>
          <v-row justify="space-between" style="padding:2px 10px 2px 10px; padding-bottom: 0; font-size: 16px; font-weight: bold; color: #999; transform: translateY(12px);">
            <v-col span="12" style="font-size:15px;">中国建设银行</v-col>
            <v-col span="12" style="text-align: end;">未接入</v-col>
          </v-row>
        </v-card>
        <v-card style="width: 240px; display: inline-block; margin-right: 16px; margin-bottom: 8px;" :body-style="{padding: 0, paddingBottom: '24px'}">
          <v-row>
            <v-col span="24" style="text-align: center; height: 120px; display: flex; align-item: center;">
              <img src="../../assets/img/bc.png" alt="中国银行" style="width: 238px;">
            </v-col>
          </v-row>
          <v-row justify="space-between" style="padding:2px 10px 2px 10px; padding-bottom: 0; font-size: 16px; font-weight: bold; color: #999; transform: translateY(12px);">
            <v-col span="12" style="font-size:15px;">中国银行</v-col>
            <v-col span="12" style="text-align: end;">未接入</v-col>
          </v-row>
        </v-card>
        <v-card style="width: 240px; display: inline-block; margin-right: 16px; margin-bottom: 8px;" :body-style="{padding: 0, paddingBottom: '24px'}">
          <v-row>
            <v-col span="24" style="text-align: center; height: 120px; display: flex; align-item: center;">
              <img src="../../assets/img/abc.png" alt="中国农业银行" style="width: 238px;">
            </v-col>
          </v-row>
          <v-row justify="space-between" style="padding: 2px; padding-bottom: 0; font-size: 16px; font-weight: bold; color: #999; transform: translateY(12px);">
            <v-col span="12" style="font-size:15px;">中国农业银行</v-col>
            <v-col span="12" style="text-align: end;">未接入</v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import {
  searchArap,
  insertArap,
  deleteArap
} from '../../models/arap.js';

export default {
  data() {
    return {
      imgSrc: {
        aly: '../../static/img/aly.png',
        bd: '../../static/img/bd.png',
        ym: '../../static/img/ym.png',
        mysql: '../../static/img/mysql.png'
      },
      date1: null,
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
        span: 6
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
      sourceData(params) {
        return axios.get('http://101.200.72.142/api/v1/files/search?token=a246d24a-e23d-49fe-919d-92c6ccc61be2').then(res => {
          return {
            "result": [
              {"order": 1, "name": "中国工商银行", "update": "2018-02-01 11:22:00", "state": "已接入"},
              {"order": 2, "name": "招商银行", "update": "2018-02-01 11:22:00", "state": "已接入"},
              {"order": 3, "name": "中国建设银行", "update": "2018-02-01 11:22:00", "state": "未接入"},
              {"order": 4, "name": "中国银行", "update": "2018-02-01 11:22:00", "state": "未接入"},
              {"order": 5, "name": "中国农业银行", "update": "2018-02-01 11:22:00", "state": "未接入"}
            ]
          }
        })
      },
      columns: [
        {title: '排序', field: 'order'},
        {title: '名称', field: 'name'},
        {title: '最后更新时间', field: 'update'},
        {title: '接入状态', field: 'state'}
      ],
      visible: false
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      insertArap({
        "token":"977b5e18-4b3c-499a-8bc2-53ce129ccff9",
        "atype":"福利费",
        "atag":1,
        "value":386,
        "status":0,
        "date":"2017-09-25",
        "desc":"这是我的账户吗，钱真多。"
      }).then((res) => {
        console.log(res);
      });
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    customFooterCancel(){

    },
    customFooterOk(){

    },
    change() {

    }
  }
}
</script>

<style>
.dsource-content-title {
  font-size: 18px;
  text-align: start;
  margin-top: 8px;
}
.dsource-content-title2 {
  font-size: 14px;
  text-align: start;
  margin-top: 8px;
  color: #999;
}
.dsource-form-group-title {
  text-align: start;
  border-top: 1px solid #ddd;
  padding-top: 8px;
}
img:hover {
  cursor: pointer;
}
.dsource-table:hover {
  cursor: pointer;
}
</style>
