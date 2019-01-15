<template>
    <div>
        <v-row>
            <v-col span="12">
                <p class="arap-content-title">应收应付账面清单</p>
            </v-col>
            <v-col span="12" style="padding-top: 16px; display: flex; justify-content: flex-end;">
                <!-- <YxTabDate :changedFormart="changedDateFormart" /> -->
            </v-col>
        </v-row>
        <v-row>
            <v-col span="24">
                <p style="text-align: end; font-size: 14px; padding-right: 4px;">{{dateValue}}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col span="1" style="height: 36px; line-height: 36px;min-width:40px;">
                <span style="font-size: 12px; color: #999;">类型</span>
            </v-col>
            <v-col span="4" style="min-width:150px;">
                <v-ys-tags :tags="arapTypeTags" @tagsClick="btnClick" />
            </v-col>
            <v-col span="2" style="height: 36px; line-height: 36px;min-width:60px;" offset="1">
                <span style="font-size: 12px; color: #999;">结清状态</span>
            </v-col>
            <v-col span="10" tyle="min-width:200px;">
                <v-ys-tags :tags="arapStatusTags" @tagsClick="btnClick" />
            </v-col>
        </v-row>
        <v-row>
            <v-col span="1" style="height: 36px; line-height: 36px;min-width:40px;">
                <span style="font-size: 12px; color: #999;">总览</span>
            </v-col>
            <v-col span="22">
                <p style="text-align: start; font-size: 14px; height: 36px; line-height: 36px;">共选择 {{arapDatas.length}} 条记录，共计 （应收 {{total_in|currency2}} / 应付 {{total_out|currency2}} / 总和 {{total|currency2}}）</p>
            </v-col>
        </v-row>
        <v-row>
            
            <v-col span="24" style="margin-top: 16px;">
                <div id="araploader">
                    <a-table v-if="dataSource.length" :dataSource="dataSource" :columns="columns" stripe bordered class="arap-table">
                        <span slot="indexKey" slot-scope="text, record, index">
                            {{ index + 1 }}
                        </span>
                        <span slot="curdate" slot-scope="text, record, index">
                            {{ text }}
                        </span>
                        <span slot="araper" slot-scope="text, record, index">
                            {{ text.name }}
                        </span>
                        <span slot="araptype" slot-scope="text, record, index">
                            {{ text }}
                        </span>
                        <span slot="araptype" slot-scope="text, record, index">
                            {{ text }}
                        </span>
                        <span slot="plandate" slot-scope="text, record, index">
                            {{ text }}
                        </span>
                        <span slot="iscompleted" slot-scope="text, record, index">
                            {{ text ? '是' : '否' }}
                        </span>
                        <span slot="remark" slot-scope="text, record, index">
                            {{ text }}
                        </span>
                    </a-table>
                    <div v-else class="nodataimg" style="width:100%;">
                        <img src="../../assets/img/nodata.svg" alt="">
                        
                        <p>暂无..</p>
                    </div>
                 </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import moment from 'moment';
// import YxTabDate from '../../components/YxTabDate.vue';

import {
    listArap
} from '../../models/arap.js';

export default {
    data() {
        return {
            arapTypeTags: [{
                name: '应收',
                isActive: true
            }, {
                name: '应付',
                isActive: true
            }],
            arapStatusTags: [{
                name: '未结清',
                isActive: true
            }, {
                name: '已结清',
                isActive: true
            }],
            startDate: '2015-01-01',
            endDate: '2200-01-01',
            endDate2: '2200-01-01',
            isDay: true,
            isEdit: false,
            total_in: 0,
            total_out: 0,
            total: 0,
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 14
            },
            arapDatas: [],
            columns: [{
                title: '序号',
                width: '5%',
                scopedSlots: { customRender: 'indexKey' },
                className: 'tableAlignCenter'
            }, {
                title: '创建日期',
                dataIndex: 'curdate',
                key: 'curdate',
                width: '10%',
                scopedSlots: { customRender: 'curdate' },
                className: 'tableAlignCenter'
            }, {
                title: '应收应付款人',
                dataIndex: 'araper',
                key: 'araper',
                width: '10%',
                scopedSlots: { customRender: 'araper' },
                className: 'tableAlignCenter'
            }, {
                title: '应收',
                dataIndex: 'arapIn',
                key: 'arapIn',
                width: '10%',
                scopedSlots: { customRender: 'arapIn' },
                className: 'tableAlignCenter'
            }, {
                title: '应付',
                dataIndex: 'arapOut',
                key: 'arapOut',
                width: '10%',
                scopedSlots: { customRender: 'arapOut' },
                className: 'tableAlignCenter'
            }, {
                title: '预计结清日期',
                dataIndex: 'plandate',
                key: 'plandate',
                width: '10%',
                scopedSlots: { customRender: 'plandate' },
                className: 'tableAlignCenter'
            }, {
                title: '是否已结清',
                dataIndex: 'iscompleted',
                key: 'iscompleted',
                width: '10%',
                scopedSlots: { customRender: 'iscompleted' },
                className: 'tableAlignCenter'
            }, {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                width: '15%',
                scopedSlots: { customRender: 'remark' },
                className: 'tableAlignCenter'
            }],
            checkedChildren:"已结清",
            unCheckedChildren:"未结清",      
            addVisible: false
        }
    },
    computed: {
        dataSource() {
            let _rslt = [];
            for (let i = 0, l = this.arapDatas.length; i < l; i++) {
                _rslt.push(this.arapDatas[i]);
                _rslt[i].curdate = moment(_rslt[i].curdate).format('YYYY-MM-DD');
                _rslt[i].plandate = moment(_rslt[i].plandate).format('YYYY-MM-DD');
                if (_rslt[i].araptype) {
                    _rslt[i].arapIn = _rslt[i].amount;
                } else {
                    _rslt[i].arapOut = _rslt[i].amount;
                }
            }
            return _rslt;
        },
        dateValue() {
            if (this.isDay)
                return '时间：' + this.startDate + ' 至 ' + this.endDate;
            else
                return '时间：' + this.startDate;
        }
    },
    methods: {
        btnClick(arg) {
            switch (arg.tags[arg.clickTagId].name) {
                case '应收': {
                    TDAPP.onEvent("记一笔应收应付的应收","顶部");
                    this.arapTypeTags[arg.clickTagId].isActive = !this.arapTypeTags[arg.clickTagId].isActive;
                    if ((this.atag<=0 || !this.atag)&& this.arapTypeTags[arg.clickTagId].isActive == false)  this.atag = 2; 
                    else this.atag = -1;    
                    break;
                }
                case '应付': {
                    TDAPP.onEvent("记一笔应收应付的应付","顶部");
                    this.arapTypeTags[arg.clickTagId].isActive = !this.arapTypeTags[arg.clickTagId].isActive;
                    if ((this.atag<=0 || !this.atag)&& this.arapTypeTags[arg.clickTagId].isActive == false)  this.atag = 1;  
                    else this.atag = -1;   
                    break;
                }
                case '未结清': {
                    TDAPP.onEvent("记一笔应收应付的未结清","顶部");
                    this.arapStatusTags[arg.clickTagId].isActive = !this.arapStatusTags[arg.clickTagId].isActive;
                    this.status = (this.status<=0 || !this.status) && this.arapStatusTags[arg.clickTagId].isActive==false? 1:-1;         
                    break;
                }
                case '已结清': {
                    TDAPP.onEvent("记一笔应收应付的已结清","顶部");
                    this.arapStatusTags[arg.clickTagId].isActive = !this.arapStatusTags[arg.clickTagId].isActive;
                    this.status = (this.status<=0 || !this.status)&&this.arapStatusTags[arg.clickTagId].isActive==false? 0:-1;         
                    break;
                }
            }
            this.statusFilter(this.atag, this.status);
        },
        changedDateFormart(_startDate, _endDate, _endDate2, isDay) {
            let _self = this;
            _self.startDate = _startDate;
            _self.endDate = _endDate;
            _self.endDate2 = _endDate2;
            _self.isDay = isDay;
            this.statusFilter(this.atag, this.status);
        },
        statusFilter(_atag = -1, _status = -1) {
            let me = this;
            let _params = {
                "start": me.startDate,
                "end": me.endDate2
            };
            if (_atag == 1) {
                _params.araptype = true;
            } else if (_atag == 2) {
                _params.araptype = false;
            }
            if (_status == 0) {
                _params.completed = false;
            } else if (_status == 1) {
                _params.completed = true;
            }
            me.total_in = 0;
            me.total_out = 0;
            me.total = 0;
            listArap(_params).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    me.arapDatas = res.data.data;
                    me.arapDatas.map(item => {
                        if (item.araptype) {
                            me.total_in += item.amount;
                        } else {
                            me.total_out += item.amount;
                        }
                    });
                    me.total = me.total_in - me.total_out;
                }
            });
        }
    },
    // components: {
    //     YxTabDate
    // }
}
</script>

<style>
.arap-content-title {
  font-size: 18px;
  text-align: start;
  margin-top: 16px;
}
.arap-form-group-title {
  text-align: start;
  border-top: 1px solid #ddd;
  padding-top: 8px;
}
.ant-form-item-label label {
  font-size: 14px;
  color: #999;
  line-height: 1.5;
}
.arap-table:hover {
  cursor: pointer;
}
.ant-btn:focus {
  border: 1px solid #d9d9d9;
}
.accountActive {
  color: #108ee9 !important;
  border: 1px solid #108ee9 !important;
}
.accountNoActive:hover {
  border: 1px solid #D3D3D3 !important;
}

 #araploader .ant-table table td:nth-of-type(1){
  text-align: center;
}
#araploader .ant-table table td:nth-of-type(2){
  padding-left: 10px !important;
}
#araploader .ant-table table td:nth-of-type(3){
  padding-left: 10px !important;
}
#araploader .ant-table table td:nth-of-type(4){
  padding-left: 10px !important;
}
#araploader .ant-table table td:nth-of-type(5){
  padding-left: 10px !important;
}
#araploader .ant-table table td:nth-of-type(6){
  padding-left: 10px !important;
}
#araploader .ant-table table td:nth-of-type(7){
  padding-left: 10px !important;
}
#araploader .ant-table table td:nth-of-type(8){
  padding-left: 10px !important;
}





#araploader .ant-table table th:nth-of-type(2){
  padding-left: 10px !important;
}
#araploader .ant-table table th:nth-of-type(3){
  padding-left: 10px !important;
}
#araploader .ant-table table th:nth-of-type(4){
  padding-left: 10px !important;
}
#araploader .ant-table table th:nth-of-type(5){
  padding-left: 10px !important;
}
#araploader .ant-table table th:nth-of-type(6){
  padding-left: 10px !important;
}
#araploader .ant-table table th:nth-of-type(7){
  padding-left: 10px !important;
}
#araploader .ant-table table th:nth-of-type(8){
  padding-left: 10px !important;
}
</style>
