<template>
    <div>
        <araper-modal :is-modify="false" :modal-visible="arpaerModalvisible" @arapersaved="refreshAraper" @arapercancel="araperCancel" />
       
        <a-modal :title="modalTitle" :visible="addVisible" @cancel="cancelArap">
            <div id="modalTitle">
                <a-form direction="horizontal">
                    <a-form-item label="应收应付款人" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                        <a-cascader expandTrigger="hover" placeholder="请选择" :options="formOptions.araper" @change="handleAraperChange" v-model="selectArap.araper.id" size="large"></a-cascader>
                    </a-form-item>
                    <a-form-item label="应收/应付" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-radio-group :options="formOptions.type" v-model="selectArap.araptype"></a-radio-group>
                    </a-form-item>
                    <a-form-item label="金额"  :label-col="labelCol" :wrapper-col="wrapperCol" required>
                        <a-input-number size="large" :maxlength="15" v-model="selectArap.amount" style="width: 100%;" @change="watchMoney"></a-input-number>
                    </a-form-item>
                    <a-form-item label="预计时间" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                        <a-date-picker v-model="selectArap.plandate" size="large" style="width: 100%;"></a-date-picker>
                    </a-form-item>
                    <a-form-item label="结清状态" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                        <a-switch v-model="selectArap.iscompleted">
                            <span slot="checkedChildren">已结清</span>
                            <span slot="unCheckedChildren">未结清</span>
                        </a-switch>
                    </a-form-item>
                    <a-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <a-input type="textarea" v-model="selectArap.remark"></a-input>
                    </a-form-item>
                </a-form>
            </div>
            <div slot="footer">
                <a-popconfirm title="确定删除吗？" @confirm="rmArap" style="float: left; margin-left: 24px;" v-if="isEdit">
                    <a-button type="danger">删除</a-button>
                </a-popconfirm>
                <a-button key="cancel" @click="cancelArap">
                    取 消
                </a-button>
                <a-button key="confirm" type="primary" @click="saveArap" :disabled="!addEnable">
                    保 存
                </a-button>
            </div>
        </a-modal>

        <!-- <a-row>
            <a-col :span="4">
                <a-button type="primary" @click="showAddModal" size="large">记一笔应收应付</a-button>
            </a-col>
            <a-col :span="1" style="height: 36px; line-height: 36px;min-width:40px;">
                <span style="font-size: 12px; color: #999;">时间</span>
            </a-col>
            <a-col :span="5" style="min-width:150px;margin-right:10px;">
                <a-range-picker  
                    :ranges="dataRangeSelect"
                    v-model="dateVal" 
                    @change="changeDatapick" 
                    format="YYYY-MM-DD"
                    :allowClear='false'
                    :disabledDate="disabledDate"
                    > 
                </a-range-picker>
            </a-col>
            <a-col :span="1" style="height: 36px; line-height: 36px;min-width:40px;">
                <span style="font-size: 12px; color: #999;">类型</span>
            </a-col>
            <a-col :span="2" style="min-width:124px;">
                <v-ys-tags :tags="arapTypeTags" @tagsClick="btnClick" />
            </a-col>
            <a-col :span="1" style="height: 36px; line-height: 36px;min-width:70px;" >
                <span style="font-size: 12px; color: #999;">结清状态</span>
            </a-col>
            <a-col :span="5">
                <v-ys-tags :tags="arapStatusTags" @tagsClick="btnClick" />
            </a-col>
        </a-row> -->

        <div>
            <a-row type="flex">
                <a-col :span="3" class="clearfloat">
                    <div class="Modifybutton apileft"  @click="showAddModal">记应收应付</div>
                </a-col>
                <a-col :span="1" class="clearfloat" style="    margin-left: 10px;">
                    <div class="togglestshow">
                        <div class="rule" id="rule" :class="{rule3: toggleRule2}"  @click="Timetoggleshow()">
                            <p><a-icon type="filter" /></p>
                            <p style="font-size:12px;">筛选</p>
                        </div>
                        <div id="Shownbelow" class="Shownbelowarap"  v-show="dropdownisShow"> 
                            <div class="closeShownbelow iffilterclose"  @click="closeShownbelow()">
                                <a-icon type="close-circle-o" />
                            </div>
                            <h5 class="shaixuanshow">选择筛选条件</h5>
                            <div class="iffilter">
                                <!-- 时间 -->
                                <div class="listshaixuan">
                                    <h5>时间:</h5>
                                    <a-range-picker  
                                        :ranges="dataRangeSelect"
                                        v-model="dateVal" 
                                        @change="changeDatapick" 
                                        format="YYYY-MM-DD"
                                        :allowClear='false'
                                        :disabledDate="disabledDate"
                                        > 
                                    </a-range-picker>
                                </div> 
                                <div class="">
                                    <h5>类型:</h5>
                                    <!-- <span class="receiver-content-type apileft" style="margin-right: 10px; font-size: 12px; color: #999; margin-top: 6px;">类型</span> -->
                                    <div class="receiver-content-anniu clearfloat" style="margin-left:0;">
                                        <v-ys-tags :tags="arapTypeTags" @tagsClick="btnClick" />
                                    </div>
                                </div>
                               
                            </div>
                            <div class="iffilter">
                                <div class="listshaixuan">
                                    <h5>结清状态:</h5>
                                    <div class="receiver-content-anniu clearfloat" style="margin-left:0;">
                                        <v-ys-tags :tags="arapStatusTags" @tagsClick="btnClick" />
                                    </div>
                                </div>
                            </div>
                       
                            <div>
                                <div class="iffilter" style="text-align: right;margin-bottom: 1rem;">
                                    <a-button  @click="closeShownbelow()">取消</a-button>
                                    <a-button type="primary" @click="Startquery()"> 确定</a-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-col>
                <a-col :span="1" style="margin-left:16px;height: 36px; line-height: 36px;min-width:40px;">
                    <span style="font-size: 12px; color: #999;">总览</span>
                </a-col>
                <a-col :span="18">
                    <div style="text-align: start; font-size: 12px; height: 36px; line-height: 36px;">
                        <span>共选择 {{arapDatas.length}} 条记录</span>
                        <span>共计（应收 {{total_in|currency2}} / 应付 {{total_out|currency2}} / 总和 {{total|currency2}}）</span>
                    </div>
                </a-col>
                <!-- <a-col :span="21" :order="2" class="clearfloat">
                    <a-row type="flex">
                        <a-col :span="9" class="clearfloat">
                            <span style="font-size: 12px; color: #999;">时间</span>
                            <a-range-picker  
                                :ranges="dataRangeSelect"
                                v-model="dateVal" 
                                @change="changeDatapick" 
                                format="YYYY-MM-DD"
                                :allowClear='false'
                                :disabledDate="disabledDate"
                                > 
                            </a-range-picker>
                        </a-col>
                        <a-col :span="4">
                            <div  class="clearfloat">
                                <span class="receiver-content-type apileft" style="margin-right: 10px; font-size: 12px; color: #999; margin-top: 6px;">类型</span>
                                <span class="receiver-content-anniu apileft" style="margin-left:0;">
                                    <v-ys-tags :tags="arapTypeTags" @tagsClick="btnClick" />
                                </span>
                            </div>
                        </a-col>
                        <a-col :span="5">
                            <div  class="clearfloat">
                                <span class="receiver-content-type apileft" style="margin-right: 10px;font-size: 12px; color: #999; margin-top: 6px;">结清状态</span>
                                <span class="receiver-content-anniu apiright" style="margin-left:0;">
                                    <v-ys-tags :tags="arapStatusTags" @tagsClick="btnClick" />
                                </span>
                            </div>
                        </a-col>
                    </a-row>
                </a-col> -->
            </a-row>
        </div>
        <v-row>
            <v-col span="24" style="margin-top: 16px;">
                <div id="arap">
                    <a-table :dataSource="dataSource" :columns="columns" stripe bordered>
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
                        <span slot="action" slot-scope="text, record, index">
                            <a-button type="primary" @click="showEditModal(record)">编辑</a-button>
                        </span>
                    </a-table>
                    <!-- <div v-else class="nodataimg" style="width:100%;">
                        <img src="../../assets/img/nodata.svg" alt="">
                        
                        <p>暂无..</p>
                    </div> -->
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import moment from 'moment';

import AraperModal from '../edit/AraperModal.vue';
// import YxTabDate from '../../components/YxTabDate.vue';

import {
    listArap,
    addArap,
    updateArap,
    deleteArap,
    listAraper
} from '../../models/arap.js';

export default {
    components: {
        AraperModal
    },
    data() {
        return {
            toggleRule2: false,
            dropdownisShow:false,
            ExportisShow:false,
            AccountisShow:false,
            araperStore: [],
            arpaerModalvisible: false,
            moment,
            today:moment(), //今天
            yesterday:moment().subtract(1, 'days'), //昨天
            fristWeeksDay:moment().startOf('week'), //本周一日期
            lastWeekEndDay:moment().subtract(1, 'weeks').endOf('week'), //上周末日期
            lastWeekDay:moment().subtract(1, 'weeks').startOf('week'), //上周开始日期
            fristMonthsDay:moment().startOf('month'),  //本月开始日期
            lastMothsEndDay:moment().subtract(1, 'months').endOf('month'), //上个月最后一天
            lastMothsDay:moment().subtract(1, 'months').startOf('month'),
            last3MonthsDay:moment().subtract(2, 'months').startOf('month'),
            last6MonthsDay:moment().subtract(5, 'months').startOf('month'),
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
            dateVal: [moment(), moment()],
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'), 
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
            selectArap: {
                id: '',
                araper: {
                    id: []
                },
                araptype: 1,
                amount: 0,
                plandate: moment(),
                remark: '',
                iscompleted: false,
            },
            arapDatas: [],
            formOptions: {
                type: [{value: 1, label: '应收'}, {value: 0, label: '应付'}],
                araper: [{
                    value: '添加应收应付款人',
                    label: '添加应收应付款人'
                }, {
                    value: '公司',
                    label: '公司',
                    children: []
                }, {
                    value: '个人',
                    label: '个人',
                    children: []
                }]
            },
            columns: [{
                title: '序号',
                width:'5%',
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
            }, {
                title: '操作',
                key: 'action',
                width: '19%',
                scopedSlots: { customRender: 'action' },
                className: 'tableAlignCenter'
            }],
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
        modalTitle() {
            return this.isEdit ? '编辑应收应付' : '记一笔应收应付';
        },
        dateValue() {
            if (this.isDay)
                return '时间：' + this.startDate + ' 至 ' + this.endDate;
            else
                return '时间：' + this.startDate;
        },
        addEnable() {
            return this.selectArap.araper.id.length == 2 && (this.selectArap.amount != 0) && (this.selectArap.plandate != '');
        },
        dataRangeSelect(){
            return {'今天': [this.today, this.today], '本周': [this.fristWeeksDay,this.today],'本月': [this.fristMonthsDay,this.today],'上月': [this.lastMothsDay,this.lastMothsEndDay] }
        },
    },
    mounted() {
        let me = this;
        listAraper({}).then(res => {
            if (res.status === 200 && res.data.code === 200) {
                for (let i = 0, l = res.data.data.length; i < l; i++) {
                    if (res.data.data[i].rtype.name == '公司') {
                        me.formOptions.araper[1].children.push({
                            value: res.data.data[i].id,
                            label: res.data.data[i].name
                        });
                    } else {
                        me.formOptions.araper[2].children.push({
                            value: res.data.data[i].id,
                            label: res.data.data[i].name
                        });
                    }
                }
            }
        });
        me.statusFilter()
    },
    methods: {
        Startquery(){
          this.statusFilter(this.atag, this.status);
          // this.searchInfo()
          this.dropdownisShow = false;
          this.toggleRule2 = false;
        },
        closeShownbelow(){
          this.dropdownisShow = false;
          this.toggleRule2 = false;
        },
        Timetoggleshow(){
          this.dropdownisShow = !this.dropdownisShow;
          // this.style.backgroundColor = 'blue';
          this.toggleRule2 = !this.toggleRule2;
          if(this.ExportisShow){
              this.ExportisShow = false
              this.toggleRule3 = false;
              this.toggleRule4 = false;
          }
           
        },

        Exporttoggle(){
          this.ExportisShow = !this.ExportisShow;
          this.toggleRule3 = !this.toggleRule3;
          if(this.dropdownisShow){
              this.dropdownisShow = false
              this.toggleRule2 = false
              this.toggleRule4 = false;
          }
        },


        handleAraperChange(val, opt) {
            if (val[0] == '添加应收应付款人') {
                this.arpaerModalvisible = true;
                this.selectArap.araper.id = this.araperStore;
            } else {
                this.araperStore = this.selectArap.araper.id;
            }
        },
        refreshAraper(res) {
            let me = this;
            if (res.rtype.name == '公司') {
                me.formOptions.araper[1].children.push({
                    value: res.id,
                    label: res.name
                });
            } else {
                me.formOptions.araper[2].children.push({
                    value: res.id,
                    label: res.name
                });
            }
            me.selectArap.araper.id = [res.rtype.name, res.id];
            this.arpaerModalvisible = false;
        },
        araperCancel() {
            this.arpaerModalvisible = false;
        },
        disabledDate(current) {
            return current && current > moment().endOf("day");
        }, 
        overShow(val){
            console.log('over:',val)
        },
        outShow(val){   
            console.log('out:',val)
        },
        initSelectArap() {
            this.selectArap = {
                id: '',
                araper: {
                    id: []
                },
                araptype: 1,
                amount: 0,
                plandate: moment(),
                remark: '',
                iscompleted: false,
            };
        },
        watchMoney() {
            if(this.selectArap.amount.toString().includes('.')) {
                let xsd=this.selectArap.amount.toString().split(".");
                if(xsd[1] && xsd[1].length >= 2){
                    this.newArap.value = xsd[0]+'.'+xsd[1].substring(0,2);
                }
            }
        },
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
            // this.statusFilter(this.atag, this.status);
        },
        // changedDateFormart(_startDate, _endDate, _endDate2, isDay) {
        changeDatapick(date,dateStr) {
            let _self = this;
            _self.startDate = dateStr[0]
            _self.endDate = dateStr[1] 
            // this.statusFilter(this.atag, this.status);
        },
        showAddModal() {
            TDAPP.onEvent("记一笔应收应付","顶部");
            if (!this.formOptions.araper) {
                this.$message.error('请先设置应收应付款人，然后再进行此操作');
            } else {
                this.isEdit = false;
                this.addVisible = true;
            }
        },
        showEditModal(record) {
            this.isEdit = true;
            this.addVisible = true;
            let _aid = record.araper.id;
            let _item = this.formOptions.araper[1].children.find(val => val.value == _aid);
            if (!_item) {
                _item = this.formOptions.araper[2].children.find(val => val.value == _aid);
                this.selectArap.araper.id = ['个人', _aid];
            } else {
                this.selectArap.araper.id = ['公司', _aid];
            }
            Object.keys(record).forEach(key => {
                if (key != 'araper') {
                    this.selectArap[key] = record[key];
                }
            });
            this.selectArap.plandate = moment(this.selectArap.plandate);
            this.selectArap.araptype = this.selectArap.araptype ? 1 : 0;
        },
        cancelArap() {
            this.addVisible = false;
            this.initSelectArap();
        },
        saveArap() {
            if (!(/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(this.selectArap.amount))) {
                this.$message.error('金额最多保留两位小数');
                return;
            }
            if (this.selectArap.remark.length > 50) {
                this.$message.error('备注不得多于50个汉字');
                return;
            }
            let me = this, _name = '';
            if (me.selectArap.araper.id[0] == '公司') {
                _name = me.formOptions.araper[1].children.find(val => val.value == me.selectArap.araper.id[1]).label;
            } else {
                _name = me.formOptions.araper[2].children.find(val => val.value == me.selectArap.araper.id[1]).label;
            }
            let _params = {
                araper: {
                    id: me.selectArap.araper.id[1],
                    name: _name
                },
                amount: parseFloat(me.selectArap.amount),
                araptype: me.selectArap.araptype ? true : false,
                plandate: moment(me.selectArap.plandate).format('YYYY-MM-DD'),
                remark: me.selectArap.remark,
                iscompleted: me.selectArap.iscompleted
            };
            if (me.isEdit) {
                _params.id = me.selectArap.id;
                updateArap(_params).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        me.$message.success('编辑成功');
                        let _item = me.arapDatas.find(val => val.id == _params.id);
                        Object.keys(_params).forEach(key => {
                            _item[key] = _params[key];
                        });
                        me.addVisible = false;
                        me.initSelectArap();
                    } else {
                        me.$message.error('编辑失败');
                    }
                });
            } else {
                addArap(_params).then(res => {
                    if (res.status === 200 && res.data.code === 200) {
                        me.$message.success('添加成功');
                        me.selectArap.araper = _params.araper;
                        me.selectArap.curdate = moment().format('YYYY-MM-DD');
                        me.arapDatas.push(res.data);
                        let _n_arap = me.arapDatas[me.arapDatas.length - 1];
                        _n_arap.curdate = moment(_n_arap.curdate).format('YYYY-MM-DD');
                        _n_arap.plandate = moment(_n_arap.plandate).format('YYYY-MM-DD');
                        if (_n_arap.araptype) {
                            _n_arap.arapIn = _n_arap.amount;
                        } else {
                            _n_arap.arapOut = _n_arap.amount;
                        }
                        me.addVisible = false;
                        me.initSelectArap();
                    } else {
                        me.$message.error('添加失败');
                    }
                });
            }
        },
        rmArap() {
            let me = this;
            deleteArap(me.selectArap.id).then(res => {
                if (res.status === 200 && res.data.code === 200) {
                    me.$message.success('删除成功');
                    me.arapDatas = me.arapDatas.filter(val => val.id != me.selectArap.id);
                    me.addVisible = false;
                    me.initSelectArap();
                } else {
                    me.$message.error('删除失败');
                }
            });
        },
        statusFilter(_atag = -1, _status = -1) {
            let me = this;
            let _params = {
                "start": me.startDate,
                "end": me.endDate
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
#arap{

}
#arap .ant-table table td:nth-of-type(1){
  text-align: center;
}
#arap .ant-table table td:nth-of-type(2){
  padding-left: 10px !important;
}
#arap .ant-table table td:nth-of-type(3){
  padding-left: 10px !important;
}
#arap .ant-table table td:nth-of-type(4){
  padding-left: 10px !important;
}
#arap .ant-table table td:nth-of-type(5){
  padding-left: 10px !important;
}
#arap .ant-table table td:nth-of-type(6){
  padding-left: 10px !important;
}
#arap .ant-table table td:nth-of-type(7){
  padding-left: 10px !important;
}
#arap .ant-table table td:nth-of-type(8){
  padding-left: 10px !important;
}
#arap .ant-table table td:nth-of-type(9){
  padding-left: 10px !important;
  text-align: center;

}





#arap .ant-table table th:nth-of-type(2){
  padding-left: 10px !important;
}
#arap .ant-table table th:nth-of-type(3){
  padding-left: 10px !important;
}
#arap .ant-table table th:nth-of-type(4){
  padding-left: 10px !important;
}
#arap .ant-table table th:nth-of-type(5){
  padding-left: 10px !important;
}
#arap .ant-table table th:nth-of-type(6){
  padding-left: 10px !important;
}
#arap .ant-table table th:nth-of-type(7){
  padding-left: 10px !important;
}
#arap .ant-table table th:nth-of-type(8){
  padding-left: 10px !important;
}
#arap .ant-table table th:nth-of-type(9){
  padding-left: 10px !important;
}
li[title="添加应收应付款人"]::before {
    content: '+';
    /* display: inline-table; */
    color:#fff;
    padding: 0px 6px 3px 5px;
    margin-right: 3px;
    border-radius: 10px;
    width:20px;
    height: 10px;
    background-color: #14b601;
}
#modalTitle{

}
/* .ant-cascader-menus-content .ant-cascader-menu li:nth-of-type(1)::before{
    content: '+';
    display: inline-table;
    color:#fff;
    padding: 0px 6px 3px 5px;
    margin-right: 3px;
    border-radius: 10px;
    width:20px;
    height: 10px;
    background-color: #14b601;
} */
</style>
