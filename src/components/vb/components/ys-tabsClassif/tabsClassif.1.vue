<template>
    <div class="tabsclassif">
        <div>
            <div> 
                <a-tabs defaultActiveKey="1" :tabPosition="tabPosition">
                    <a-tab-pane tab="收入" key="1">
                        <template>
                            <a-table :columns="columns" :dataSource="data" :rowSelection="rowSelection" bordered>
                                <!-- 父级编辑保存 -->
                                <template slot="operation" slot-scope="text, record, index">
                                    <div class='editable-row-operations'>
                                        <div>
                                            <span>
                                                <a style="margin-right:10px; color:red;" v-show="!record.children" @click="() => del(record.row)">删除</a>
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
                    <a-input placeholder="Basic usage" v-model="editObj.name"/>
                </a-modal>

                <!-- 新建 -->
                <a-modal
                    title="新建"
                    v-model="addvisible"
                    @ok="addModel"
                    okText="保存"
                    cancelText="取消"
                >
                    <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
                        <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
                    </a-select>
                
                    <a-input placeholder="Basic usage" v-model="newPerson.name"/>
                    <a-input placeholder="Basic usage" v-model="newPerson.age"/>
                    <a-input placeholder="Basic usage" v-model="newPerson.address"/>
                </a-modal>
                <a-button type="primary" @click="showModel">Primary</a-button>
            </div>
        </div>
    </div>
</template>
<script  > 

    import {
        searchMoneyflows,
        searchAtage,
        deleteAtage,
        modifyAtage
    } from '../../../../models/moneyFlow.js';
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            scopedSlots: { customRender: 'name' },
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '10%',
            // scopedSlots: { customRender: 'age' },
        }, 
        {
            title: 'Address',
            dataIndex: 'address',
            width: '20%',
            key: 'address',
            // scopedSlots: { customRender: 'address' },
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '20%',
            scopedSlots: { customRender: 'operation' },
        }
    ];
    const data = [
        {
            key: 2,
            name: '父分类1.',
            age: 60,
            address: 'uno',
            id: 1,
            name: '11',
            parrentid: 0,
            flag: 0,
            // children: [{
            //     key: 11,
            //     name: '子分类1-1',
            //     age: 42,
            //     address: 'uno-1',
            // },{
            //     key: 12,
            //     name: '子分类1-1',
            //     age: 42,
            //     address: 'uno-1',
            // },
            // {
            //     key: 13,
            //     name: '子分类1-1',
            //     age: 42,
            //     address: 'uno-1',
            // }],
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
    const provinceData = ['Zhejiang', 'Jiangsu'];
    const cityData = {
        Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
        Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
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
            this.cacheData = data.map(item => ({ ...item }))
            return {
                tabPosition: 'left',
                dataSource1: [],
                data,
                columns,
                rowSelection,
                visible:false,
                addvisible:false,
                editObj:{},
                newPerson:{},

                provinceData,
                cityData,
            };
        },
        mounted(){
            let _self = this;
                _self.dataA();
        },
        methods: {
            handleProvinceChange(value) {
                this.cities = cityData[value]
                this.secondCity = cityData[value][0]
            },
            dataA(){
                searchAtage({}).then(res => {
                    let _self = this
                    let _data = res.data
                    if (_data.code == 200) {
                        console.log(_data);
                        let _fdata = _data.data.filter(val=>!val.parrentid)
                        _self.data = _fdata
                        _fdata.forEach(fval => {
                            fval.children= _data.data.filter(val=>val.parrentid == fval.id)
                        });

                        console.dir(_fdata);
                        
                    }
                })
            },
            selectDataA(){
                searchAtage({}).then(res=> {
                    let _self = this
                    let _data = res.data
                    if(_data.code == 200){
                        //  _self.provinceData = _fdata.map(val=>{
                        //      let _v = _data.provinceData.filter(allval=>allval.parrentid == val.id)
                        //      val.key = val.id
                        //      if(_v.length){ 
                        //          return val.children = _v
                        //      }else{
                        //          return val
                        //      } 
                        //  })
                        let _fdata = _data.provinceData.filter(val=>!val.parrentid)
                        _self.provinceData = _fdata
                        _fdata.forEach(fval => {
                            fval.children= _data.provinceData.filter(val=>val.parrentid == fval.id)
                        });
                    }
                })
            },
            
            // 新建model----插入
            addModel(){
                this.addvisible = false
                 this.newPerson = {key: 1000,name:'阿三',age:50,address:'男',};
                this.data.push(this.newPerson)
            },
            showModel(){
                this.addvisible = true
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
                         if(foo.key==row.key){
                             item.children.splice(index,1)
                         }
                     }
                })
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

