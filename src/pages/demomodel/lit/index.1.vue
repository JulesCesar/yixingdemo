<template> 
  <div> 
    <!-- modal -->
    <input type="button" class="btn blue" value="click" v-if="isHide" @click="isHide=!isHide">
        <transition  name="fade">
          <v-ys-modal
            v-if="!isHide"
            modal-title="model" 
            ok-btn="yes"  
            cancel-btn="close"
            @on-ok="ok"
            @on-cancel="cancel"
          >
            <div slot="modal-content">
                <div class="box-tabs">  
                  <ul class="tabs-all-options clearfix">  
                      <li v-for="(tab,index) in tabsName">  
                          <a href="#" class="tab-link" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>  
                      
                      </li>  
                  </ul>  
                  <div class="cards-content">  
                      <div class="tab-card" style="display: block;">1</div>  
                      <div class="tab-card">2</div>  
                      <div class="tab-card">3</div>
                      <div class="tab-card">4</div>  
                      <div class="tab-card">5</div>   
                  </div>  
                </div>
            </div>
          </v-ys-modal>
        </transition>
    <template>
    <!-- <a-table :rowSelection="rowSelection" :loading="loading" :columns="columns" :dataSource="data" size="small">
      <a slot="name" slot-scope="text" href="#">{{text}}</a>
      <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record, index">
        <div>

          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class='editable-row-operations'>
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table> -->
  </template>
  <!-- 原地编辑 -->

 
  <template>
    <div class='editable-cell'>
      <div v-if="editable" class='editable-cell-input-wrapper'>
        <a-input
          :value="value"
          @change="handleChange"
          @pressEnter="check"
        /><a-icon
          type='check'
          class='editable-cell-icon-check'
          @click="check"
        />
      </div>
      <div v-else class='editable-cell-text-wrapper'>
        {{value || ' '}}
        <a-icon type='edit' class='editable-cell-icon' @click="edit" />
      </div>
    </div>
  </template>
  <a-table :columns="columns" :dataSource="data" :scroll="{ x: 1500, y: 300 }">
    <!-- <a slot="action" slot-scope="text" href="#">action</a> -->
    <div>111</div>
  </a-table>

  <a-range-picker
      :disabledDate="disabledDate"
      :showTime="{
        hideDisabledOptions: true, 
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
      }"
      format="YYYY-MM-DD"
    />

  </div>
</template>

<script>
// import EditableCell from 'EditableCell'
import moment from 'moment';
const columns = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export default {
  props: {
    text: String,
  },
  data() {
    this.cacheData = data.map(item => ({ ...item }))
    return {
      data,
      columns,
      value: this.text,
      editable: false,
      data,
      columns,
      isHide: true,
      loading: false,
      tabsName: [
        {  
          name: "估计",  
          isActive: true  
        }, 
        {  
          name: "活动",  
          isActive: false  
        }, 
        {  
          name: "tres",  
          isActive: false  
        },
        {  
          name: "cuatro",  
          isActive: false  
        },
        {  
          name: "cenco",  
          isActive: false  
        }
      ],  
      active: false  
    };
  },

  methods: {
    
    // range(start, end) {
    //   const result = [];
    //   for (let i = start; i < end; i++) {
    //     result.push(i);
    //   }
    //   return result;
    // },
    moment,
    disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    },

    // disabledDateTime() {
    //   return {
    //     disabledHours: () => this.range(0, 24).splice(4, 20),
    //     disabledMinutes: () => this.range(30, 60),
    //     disabledSeconds: () => [55, 56],
    //   };
    // },

    // disabledRangeTime(_, type) {
    //   if (type === 'start') {
    //     return {
    //       disabledHours: () => this.range(0, 60).splice(4, 20),
    //       disabledMinutes: () => this.range(30, 60),
    //       disabledSeconds: () => [55, 56],
    //     };
    //   }
    //   return {
    //     disabledHours: () => this.range(0, 60).splice(20, 4),
    //     disabledMinutes: () => this.range(0, 31),
    //     disabledSeconds: () => [55, 56],
    //   };
    // },











    // 铅笔编辑
    handleChange (e) {
      const value = e.target.value
      this.value = value
    },
    check () {
      this.editable = false
      this.$emit('change', this.value)
    },
    edit () {
      this.editable = true
    },
    // modal
    ok (){
        // alert("我是确定tost");
        this.isHide = !this.isHide;
    },
    cancel (){
      // alert("我是取消tost");
        this.isHide = !this.isHide;
    },
    // tabs
    tabsSwitch: function(tabIndex) {  
        var tabCardCollection = document.querySelectorAll(".tab-card"),  
            len = tabCardCollection.length;  

        for(var i = 0; i < len; i++) {  
            tabCardCollection[i].style.display = "none";  
            this.tabsName[i].isActive = false;  
        }  
        this.tabsName[tabIndex].isActive = true;  
        tabCardCollection[tabIndex].style.display = "block";  
    },


    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }
        }),
      }
    }
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
  .box-tabs {  
      width: 90%;  
      /* height: 200px;   */
      margin: 0 auto;  
      position: relative;
      /* border: 1px solid #000;   */
  }  
  .tabs-all-options li {  
      float: left;  
      margin-right: 2px;  
      list-style: none;  
      transition: all  .6s  ease-in;
      -moz-transition: all  .6s  ease-in;
      -webkit-transition: all  .6s  ease-in;
      background-color: pink;
      position: relative;
  }
  .tabs-all-options li:hover {  
    border-bottom:10px solid rgba(0, 0, 0, 0.25);
    transform:translateY(-10px);
  }
  
  .tabs-all-options li:nth-of-type(1){  
      background-color: #21abf6;
  } 
  .tabs-all-options li:nth-of-type(2){  
      background-color: #0077c5;
  } 
  .tabs-all-options li:nth-of-type(3){  
      background-color: #ff8000;
  } 
  .tabs-all-options li:nth-of-type(4){  
      background-color: #b8bcc4;
  } 
  .tabs-all-options li:nth-of-type(5){  
      background-color: #7ece00;
  }  
  .tabs-all-options .tab-link {  
      display: block;  
      width: 160px;  
      height: 49px;  
      text-align: center;  
      line-height: 49px;  
      color: #fff;  
      text-decoration: none;  
    color: #fff;
    cursor: pointer;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFW…FUeNpiYGBg4GVAAErYFBtAfcNGvTbqtVGvjXqNAjZAgAEAEPYFfUaJz74AAAAASUVORK5CYII=);
  }  

  .tabs-all-options .tab-link.active {  
      background-color: #999;
      border-top: 1px solid #000;
      transition: .3s;  
  }  
  .cards-content {
      margin-top: 20px;  
      float: left; 
      width: 100%;
      background-color: #f4f4f4;
      height: 100px; 
      position: absolute;
      top: 40px;
      left: 0;
  }  
  .cards-content .tab-card {  
      display: none;  
  }  
  .clearfix:after {  
      content: "";  
      display: block;  
      height: 0;  
      clear: both;  
  }  
  .clearfix {  
      zoom: 1;  
  } 





  .btn {
    border: 1px solid #d1d1d1;
    border-radius: 3px;
    background-color: #f7f7f7;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#f7f7f7),
  to(#f2f2f2));
    background: -moz-gradient(linear, 0 0, 0 100%, from(#f7f7f7),
  to(#f2f2f2));
    background: -o-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    background: -ms-gradient(linear, 0 0, 0 100%, from(#f7f7f7), to(#f2f2f2));
    height: 28px;
    padding: 0 20px;
    cursor: pointer;
    line-height: 28px;
    display: inline-block;
    color: #666666;
    margin-right: 5px;
    outline: none;
  }
  .blue {
      border: 1px solid #f4f5f8;
      background-color: #f4f5f8;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(#5a98de),
    to(#5a98de));
      background: -moz-gradient(linear, 0 0, 0 100%, from(#5a98de),
    to(#5a98de));
      background: -o-gradient(linear, 0 0, 0 100%, from(#5a98de), to(#5a98de));
      background: -ms-gradient(linear, 0 0, 0 100%, from(#5a98de), to(#5a98de));
      color: #FFFFFF;
  }   
  .fade-enter-active, .fade-leave-active {
    transition: all ease .4s;
    transform:translate(0, 10px);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transition: all ease .4s;
    transform:translate(0, -800px);
  }

</style>
