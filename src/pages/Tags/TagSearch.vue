<template>
    <div>
        <a-row>
            <a-col :span="12">
                <span>打标签时间：</span>
                <a-locale-provider :locale="zh_CN">
                    <a-range-picker v-model="dateRange" :disabledDate="disabledDate" />
                </a-locale-provider>
            </a-col>
            <a-col :span="8">
                <span>选择标签：</span>
                <a-cascader expandTrigger="hover" style="" placeholder="选择标签" :options="tagOptions" @change="selectTagChange" v-model="tagCascader" />
            </a-col>
            <a-col :span="4">
                <a-button type="primary" @click="handleSearchTag" style="float: right;">查询</a-button>
            </a-col>
        </a-row>
        <a-row v-if="selectedTags.length" style="margin: 12px 0;">
            <a-col :span="24">
                <span>已选标签：</span>
                <a-tag color="#3296fa" v-for="tag in selectedTags" :key="tag.id" closable @afterClose="() => handleRemoveTag(tag)">{{tag.name}}</a-tag>
            </a-col>
        </a-row>
        <a-row style="margin-top: 16px;">
            <a-col :span="24">
                <div v-if="isLoading" class="nodataimg">
                    <a-spin size="large" />
                </div>
                <a-table v-else :columns="columns" :dataSource="dataSource" bordered style="text-align: center;">
                    <span slot="income" slot-scope="text, record, index">
                        {{text | inOut}}
                    </span>
                    <span slot="expense" slot-scope="text, record, index">
                        {{text | inOut}}
                    </span>
                    <span slot="sum" slot-scope="text, record, index">
                        {{text | currency2}}
                    </span>
                </a-table>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import {
    listTag,
    searchReceiver
} from '../../models/tag';

import moment from 'moment';
import zh_CN from 'vue-antd-ui/lib/locale-provider/zh_CN';

export default {
    data() {
        return {
            zh_CN,
            isLoading: true,
            selectedTags: [],
            tagDatas: [],
            tagCascader: [],
            dateRange: [],
            receiverDatas: [],
            columns: [
                {
                    title: '标签名称',
                    dataIndex: 'tagName',
                    key: 'tagName',
                    align: 'center',
                },
                {
                    title: '收付款人',
                    dataIndex: 'receiver',
                    key: 'receiver',
                    align: 'center'
                },
                {
                    title: '流入',
                    dataIndex: 'income',
                    key: 'income',
                    align: 'center',
                    scopedSlots: { customRender: 'income' }
                },
                {
                    title: '流出',
                    dataIndex: 'expense',
                    key: 'expense',
                    align: 'center',
                    scopedSlots: { customRender: 'expense' }
                },
                {
                    title: '盈余',
                    dataIndex: 'sum',
                    key: 'sum',
                    align: 'center',
                    scopedSlots: { customRender: 'sum' }
                }
            ]
        }
    },
    computed: {
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
                // 已选的二级标签不可重复选择
                _cTags.map(ct => {
                    ct.disabled = false; // 清除不可选状态
                });
                _cTags.map(ct => {
                    if (this.selectedTags.some(st => st.id == ct.id)) {
                        ct.disabled = true;
                    }
                });
            });
            return _pTags;
        },
        dataSource() {
            // let _datas = [];
            // for (let i = 0, l = this.receiverDatas.length; i < l; i++) {
            //     for (let j = 0, m = this.receiverDatas[i].tags.length; j < m; j++) {
            //         _datas.push({
            //             receiver: this.receiverDatas[i].name,
            //             tagName: this.receiverDatas[i].tags[j].name,
            //             tagDate: this.receiverDatas[i].tags[j].udate
            //         });
            //     }
            // }
            // return _datas;
            let _datas = [];
            this.receiverDatas.forEach(rd => {
                rd.tags.forEach(tag => {
                    if (_datas.length == 0) {
                        _datas.push({
                            tagName: tag.name,
                            receiver: [rd]
                        });
                    } else {
                        if (!_datas.some(val => val.tagName == tag.name)) {
                            _datas.push({
                                tagName: tag.name,
                                receiver: [rd]
                            });
                        } else {
                            _datas.find(d => d.tagName == tag.name).receiver.push(rd);
                        }
                    }
                });
            });
            let _rslt = [];
            _datas.forEach(data => {
                let _in = 0;
                let _out = 0;
                data.receiver.map(rc => {
                    _in += rc.income;
                    _out += rc.expense;
                });
                _rslt.push({
                    tagName: data.tagName,
                    receiver: data.receiver.map(rc => rc.name).join(', '),
                    income: _in,
                    expense: _out
                });
            });
            _rslt.map(rs => {
                rs.sum = rs.income + rs.expense;
            });
            return _rslt;
        }
    },
    created() {
        this.$bus.$on('initTagSearch', () => {
            this.initTagSearch();
        })
    },
    mounted() {
        this.initTagSearch();
    },
    methods: {
        initTagSearch() {
            let _self = this;
            listTag().then(res => {
                if (res.data.code == 200) {
                    _self.tagDatas = res.data.data;
                }
            });
            searchReceiver({}).then(res => {
                if (res.data.code == 200) {
                    _self.receiverDatas = res.data.data;
                    _self.isLoading = false;
                }
            });
        },
        disabledDate(current) {
            return current && current > moment().endOf("day");
        },
        selectTagChange(val, opt) {
            // 只显示二级标签
            this.selectedTags.push(opt[1]);
            this.tagCascader = [];
        },
        handleRemoveTag(removedTag) {
            this.selectedTags = this.selectedTags.filter(st => st != removedTag);
        },
        // 点击查询按钮
        handleSearchTag() {
            let _self = this;
            _self.isLoading = true;
            let _params = {
                tagids: _self.selectedTags.map(st => st.id)
            };
            if (_self.dateRange.length != 0) {
                _params.start = moment(_self.dateRange[0]).format('YYYY-MM-DD');
                _params.end = moment(_self.dateRange[1]).format('YYYY-MM-DD');
            }
            searchReceiver(_params).then(res => {
                if (res.data.code == 200) {
                    _self.isLoading = false;
                    // 去除未选择标签的收付款人
                    res.data.data.forEach(rd => {
                        rd.tags.forEach(tag => {
                            if (this.selectedTags.length != 0 && !this.selectedTags.map(st => st.id).includes(tag.id)) {
                                rd.tags = rd.tags.filter(t => t.id != tag.id);
                            }
                        });
                    });
                    _self.receiverDatas = res.data.data;
                }
            })
        }
    }
}
</script>
