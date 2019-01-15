<template>
    <div class="tabsclassif">
        <div>
            <div> 
                <a-tabs defaultActiveKey="1" :tabPosition="tabPosition">
                    <a-tab-pane tab="收入" key="1">
                        <template>
                            <a-table 
                                style="margin-right:24px;" 
                                :columns="columns" 
                                :dataSource="data" 
                                :rowSelection="rowSelection" 
                                bordered 
                                rowKey='id' 
                                :pagination='pagination'
                                :defaultExpandAllRows='defaultExpandAllRows'
                                :indentSize='indentSize'
                                >
                                <template slot="title" slot-scope="currentPageData">
                                    收支类目
                                </template>
                                <!-- 父级编辑保存 -->
                                <template slot="operation" slot-scope="text, record, index">
                                    <div class='editable-row-operations'>
                                        <div>
                                            <span>
                                                <a style="margin-right:10px; color:red;" v-show="!record.children" @click="() => del(record,index)">删除</a>
                                                <a  v-show="!record.children" @click="() => edit(record)">编辑</a>
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </a-table>
                        </template>
                    </a-tab-pane>
                    <a-tab-pane tab="支出" key="2">
                        <template>
                            111
                        </template>
                    </a-tab-pane>
                </a-tabs>
                <!-- 编辑 -->
                 <a-modal
                    title="编辑"
                    v-model="visible"
                    @ok="handleOk"
                    okText="确认编辑"
                    cancelText="取消"
                >
                    <!-- <a-input placeholder="Basic usage" v-model="editObj.key"/> -->
                    <span>名字:</span><a-input placeholder="Basic usage" v-model="editObj.name"/>
                    
                </a-modal>

                <!-- 新建 -->
                <a-modal
                    title="新建"
                    v-model="addvisible"
                    @ok="addModel"
                    okText="保存"
                    cancelText="取消"
                >
                    <a-cascader size="large" :options="foptions" @change="onChange" />
                    <span>名字:</span><a-input placeholder="Basic usage" v-model="newPerson.name"/>
             
                </a-modal>
                <div style="margin-left:100px;margin-top:20px;">
                    <a-button type="primary" @click="showModel">添加</a-button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script  > 

// import {
//     searchMoneyflows,
//     searchAtage,
//     deleteAtage,
//     modifyAtage
// } from '../../../../models/moneyFlow.js';
    const columns = [
        {
            title: '收入细目',
            dataIndex: 'name',
            key: 1,
            width: '45%',
            scopedSlots: { customRender: 'name' },
        }, {
            title: '收入分类',
            dataIndex: 'age',
            key: 2,
            width: '25%',
            // scopedSlots: { customRender: 'age' },
        }, 
       
        {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            key: 4,
            scopedSlots: { customRender: 'operation' },
        }
    ];

    const data = [
        {
            id: 1,
            name: '父分类1.',
            age: 60,
            address: 'uno',
            id: 1,
            name: '11',
            parrentid: 0,
            flag: 0,
            children: [{
                id: 11,
                name: '子分类1-1',
                age: 42,
                address: 'uno-1',
            },{
                id: 12,
                name: '子分类1-1',
                age: 42,
                address: 'uno-1',
            },
            {
                id: 13,
                name: '子分类1-1',
                age: 42,
                address: 'uno-1',
            }],
        }, 
        
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    export default {
        name: 'YsTabsClassif',
        props: { 
            modalTitle: {
              type: String,
              default: '标题'
            },
            okBtn: {
                type: String,
                default: 'yes'
            },
            cancelBtn: {
                type: String,
                default: 'close'
            }
        },
        data() {
            return {
                tabPosition: 'left',
                dataSource1: [],
                data,
                columns,
                rowSelection,
                visible:false,
                addvisible:false,
                pagination:false,
                editObj:{},
                newPerson:{}, 

                selectedFatherId:null,
                defaultExpandAllRows:true,
                indentSize:40,
            }
            
        },
        computed:{
            foptions(){ 
                if(this.data.length){
                    let _options =[]
                    this.data.forEach(val=>{
                        _options.push({'key':val.id,'value':val.id.toString(),'label':val.name})
                    })
                    return  _options
                }else{
                    return [{value: '222',label: 'Zheji22ang'}, {value: '11',label: '22'} ]
                } 
            } 
        },
        mounted(){
            let _self = this;
                _self.dataA();
              
        },
        methods: {
            //searcdata
            dataA(){
                searchAtage({}).then(res => {
                    let _self = this
                    let _data = res.data
                    if (_data.code == 200) {
                        console.log(_data);
                        let _fdata = _data.data.filter(val=>!val.parrentid)
                       
                        _fdata.forEach(fval => {
                            fval.children= _data.data.filter(val=>val.parrentid == fval.id)
                        });
                        _self.data = _fdata
                       
                        console.dir(_fdata);
                    }
                })
            },
            // selectdata
            selectDataA(){
                let _self = this
                // _self.foptions =[]
                
                 
            },
            onChange(value) {
                debugger
                let _self = this
                _self.selectedFatherId = value[0] // this.data.filter(val=> val.id == value)
                console.log(value);
            },
            // 新建model----插入
            addModel(){
                debugger
                let _self = this
                _self.addvisible = false
                let _options =[]

                let _id = this.data[this.data.length-1].id + 1
                this.data.forEach(val=>{
                    if(val.id == _self.selectedFatherId){
                        val.children.push({'parrentid':val.id,'id':_id,'name':_self.newPerson.name})
                    }
                })
                
            },
            showModel(){
                let _self = this
                _self.addvisible = true
                _self.selectDataA();
            },
            //编辑model---提交
            handleOk(e) {
                this.visible = false
                let name = this.data.name;
                let age = this.data.age;
                let address = this.data.address
                
            },
            edit (row,index) {
                debugger
                this.editObj = row
                this.visible = true
            },
            del (row,index) {
                debugger
                const newData = [...this.data]
                newData.map(item => {
                    let foo = item.children[index]
                     if(foo){
                         debugger
                         if(foo.id==row.id){
                             item.children.splice(index,1)
                         }
                     }
                })
                //this.data = newData.filter(item => item.key !== row.key)
            },
            callback (val) {
                console.log(val)
            },





        },
    };
</script>
<style scoped>
.tabsclassif{
    padding-top:20px;
    padding-bottom: 20px;
      width: 100%;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, .3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, .5);
  }

</style>

