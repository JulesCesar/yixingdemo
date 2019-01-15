<template>
    <div id="tabsclassif" class="tabsclassif">
        <!-- modal -->
        <ftype-modal :atage-datas.sync="fTypeDates" :addvisible="addVisible" @atagemodalcancel="ftypeCancel" @ftypeSaved="ftypeSaved" :is-ftype-modify="isFtypeModify" />
        <!-- end modal -->
        

        <div>
            <a-row type="flex" style="margin-left:22px;">
                <a-col :span="2" :order="1" class="clearfloat">
                    <div class="Modifybutton apileft"  @click="addShowModel">添加分类</div>
                </a-col>
                <a-col :span="20" :order="2" class="clearfloat">
                    <span class="receiver-content-type apileft">类型:</span>
                    <span class="receiver-content-anniu apileft">
                        <v-ys-tags :tags="ftypeFlags" @tagsClick="onCheckType" />
                    </span>
                </a-col>
                
            </a-row>
        </div>
       
        <a-table 
            style="margin-right:24px;" 
            :columns="columns" 
            :dataSource="dataSources"  
            bordered 
            :pagination="false"
            rowKey='id' 
            :indentSize='indentSize'
            v-if="dataSources.length"
            >
            <!-- <template slot="title" slot-scope="currentPageData">
                类目
            </template> -->
            <template slot="flag" slot-scope="text">
                {{text==1 ? '收入' : '支出'}} 
            </template>
            <!-- 父级编辑保存 -->
            <template slot="operation" slot-scope="text, record, index">
                <div class='editable-row-operations'>
                    <div style="text-align: center;">
                        <span v-show="!record.children">
                            <v-popconfirm  title="确定删除吗?"  @confirm="() => delAtype(record)">
                                <!-- <a style="margin-right:10px; color:red;" >删除</a> -->
                                <span class="deletIcon">
                                    <a-tooltip>
                                        <template slot='title'>
                                            删除
                                        </template>
                                        <a-icon type="delete"  style="font-size:12px;color:#fff;"/>
                                    </a-tooltip>
                                </span>
                            </v-popconfirm>
                            
                            <span class="editIcon">
                                <a-icon type="edit" @click="() => editShowModel(record)"  style="color:#fff;" /> 
                            </span>
                        </span>
                    </div>
                </div>
            </template>
        </a-table>
        <div v-else class="nodataimg" style="width:100%;">
            <img src="../../assets/img/nodata.svg" alt="">
            
            <p>暂无..</p>
        </div>
    </div>
</template>
<script>
import {
    deleteAtage,
    modifyAtage,
    insertAtage
} from '../../models/moneyFlow.js';

import {
    listFtype,
    addFtype,
    updateFtype,
    deleteFtype
} from '../../models/moneyFlow';

import FtypeModal from '../edit/FtypeModal.vue';

export default {
    components: {
        FtypeModal
    },
    props: {
        fTypeDates: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isFtypeModify: false,
            ftypeFlags: [
                {
                    id: 0,
                    name: "支出",
                    flag:false,
                    isActive: true
                },
                {
                    id: 1,
                    name: "收入",
                    flag:true,
                    isActive: true
                }
            ],
            atageDatas: [],
            columns:[
                {
                    title: '细目',
                    dataIndex: 'name',
                    key: 1,
                    width: '40%',
                    scopedSlots: { customRender: 'name' },
                }, 
                {
                    title: '分类',
                    dataIndex: 'flag',
                    key: 2,
                    width: '25%',
                    scopedSlots: { customRender: 'flag' },
                }, 
                {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 3,
                    width: '25%',
                    scopedSlots: { customRender: 'remark' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: '10%',
                    key: 4,
                    scopedSlots: { customRender: 'operation' },
                }
            ],
            addVisible:false,
            indentSize:40, 
        }
    }, 
    computed:{
        dataSources(){
            let _self = this
            let _flags = _self.ftypeFlags.filter(val=>val.isActive).map(val=>val.flag)
            // let _fdata = _self.atageDatas.filter(val=>val.parrentid==0 && _flags.includes(val.flag))
            let _fdata = _self.fTypeDates.filter(val=>val.parrentid==0 && _flags.includes(val.flag))
            _fdata.forEach(fval => { 
                // fval.children= _self.atageDatas.filter(val=>val.parrentid == fval.id) 
                fval.children= _self.fTypeDates.filter(val=>val.parrentid == fval.id) 
            });
            return _fdata
        },
        rowstr(){
            return this.dataSources.map(val=>val.id)
        }
    },
    mounted() {
        // let _self = this;
        // listFtype({}).then(res => {
        //     if (res.status === 200 && res.data.code === 200) {
        //         _self.atageDatas = res.data.data;
        //     } else {
        //         _self.$message.error('Loading Failed.');
        //     }
        // })
    },
    methods: {
        onCheckType(value) {
            let _tag  =  value.tags[value.clickTagId] 
            _tag.isActive = ! _tag.isActive; 
         },
        addShowModel() {
            this.$bus.$emit('updateFtype', '');
            this.addVisible = true;
        },
        ftypeCancel() {
            this.addVisible = false;
        },
        ftypeSaved(new_ftype) {
            // let _item = this.atageDatas.find(val => val.id == new_ftype.id);
            let _item = this.fTypeDates.find(val => val.id == new_ftype.id);
            if (_item != undefined) {
                Object.keys(_item).forEach(key => {
                    _item[key] = new_ftype[key];
                });
            } else {
                // this.atageDatas.unshift(new_ftype);
                this.fTypeDates.unshift(new_ftype);
            }
            this.addVisible = false;
        },
        // 删除
        delAtype(row) {
            let _self = this;
            deleteFtype(row.id).then(res=>{
                if (res.status === 200 && res.data.code === 200) {
                    // _self.atageDatas = _self.atageDatas.filter(val => val.id != row.id);
                    _self.fTypeDates = _self.fTypeDates.filter(val => val.id != row.id);
                    this.$message.success("删除成功");
                } else if (res.data.code == 60003) {
                    _self.$error({
                        title: '系统提示',
                        content: res.data.desc + '，不可删除！'
                    })
                } else {
                    this.$message.error("删除失败");
                }
            });
        },

        editShowModel(row) {
            this.isFtypeModify = true;
            this.addVisible = true;
            this.$bus.$emit('updateFtype', row);
        }
    },
};
</script>
<style>
    .tabsclassif{
        padding-bottom: 20px;
        background-color: #fff;
    }
    #tabsclassif .ant-table-content .ant-table-body .ant-table-thead tr th:nth-of-type(1) span{
        padding-left: 8px !important;
    }
    #tabsclassif .ant-table-content .ant-table-body .ant-table-thead tr th:nth-of-type(2) span{
        padding-left: 8px !important;
    }
    #tabsclassif .ant-table-content .ant-table-body .ant-table-thead tr th:nth-of-type(3){
        /* padding-left: 8px !important; */
        text-align: center;
    }
     #tabsclassif .ant-table-content .ant-table-body .ant-table-tbody tr td{
        padding-left: 8px !important;
    }

</style>

