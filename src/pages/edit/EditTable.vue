<template>
    <div id="edittables">
        <!-- {{rowObjChange}} -->
      <!-- modal -->
        <account-modal :insertvisible="accountInsertvisible" @accountmodalcancel="accountModalCancel" @accountInserted="refreshAccounts"/>
        <receiver-modal :insertvisible="receiverInsertvisible" @receivermodalcancel="receiverModalCancel" @receiverInserted="refreshReceivers"/>
        <ftype-modal :addvisible="atageVisible" @atagemodalcancel="fTypeModalCancel" :atage-datas.sync="fTypeDates" @ftypeSaved="refreshFtype"/>
        <!-- <a-modal title="系统提示" v-model="editConfirmVisible" @ok="editConfirmOk" okText="Save" cancelText="cancel"> -->
      <!-- end modal --> 

        <!--@click="start" <span class="nuewSpanclick" @click="filterMoneyflow()"> 刷新  </span> -->


    <a-table bordered class="yx-table-hover" 
        rowKey='id'
        :rowSelection="rowSelection"
        :scroll="getTableScroll" 
        :style="{height: scrollHeight - 300 + 'px',}" 
        :columns="columns" 
        :dataSource="tableSources" 
        :rowClassName ='setRowClass' 
        :pagination="!isClickEditRow"   
         @change="headerChange">
        <!-- title的红色星号 -->
            <span slot="customTitle"> <i style="color:red;">*</i>&nbsp;&nbsp; 时间</span>
            <span slot="customAccount"> <i style="color:red;">*</i>&nbsp;&nbsp; 账户</span>
            <span slot="customSummary"> <i style="color:red;">*</i>&nbsp;&nbsp; 摘要</span>
            <span slot="customReceiver" v-if="!rowObj.istransfer"> <i style="color:red;">*</i>&nbsp;&nbsp; 收付款人</span>
            <!-- 内部转账非必填 -->
            <span slot="customReceiver" v-else>收付款人</span>
            <span slot="customInFlow"> <i style="color:red;">*</i>&nbsp;&nbsp; 流入</span>
            <span slot="customOutFlow"> <i style="color:red;">*</i>&nbsp;&nbsp; 流出</span>
        <!-- 序号 -->
        <span slot="indexKey" slot-scope="text,record,index" >
            <span v-if="record.id"  >
                {{index+1}}
            </span>
            <template v-else  >
             <span > {{index+1}}  </span>
            </template>
        </span>
        <!-- 日期 -->
        <span  slot="date" slot-scope="text,record,index" >
            <template  v-if="record.isEditRow">
                <a-locale-provider :locale="zh_CN">
                <a-date-picker 
                    :defaultValue="moment(rowObj.date)"
                    :allowClear='false'
                    @change="onDateChange"  
                    :disabledDate="disabledDate"
                    style="width:100%;"
                />
                </a-locale-provider>
            </template>
            <template  v-else>  
                <span class="nuewSpanclick"  @click="editRowClick(record, index)">{{text.substring(0, 10)}}</span>
            </template>   
        </span>
        <!-- 摘要   -->
        <span  slot="remark" slot-scope="text, record,index" > 
            <a-tooltip  v-if="record.isEditRow"   v-model="remarkTooltipVisible">
                <template slot='title' > 
                不超过30个字
                </template>
                <a-input  placeholder="输入摘要" v-model="rowObj.remark" :maxlength="30" style="border:none !important; width: 100%;"/> 
            </a-tooltip> 
            <template  v-else > 
                <span  class="nuewSpanclick" @click="editRowClick(record, index)">
                <a-tooltip >
                    {{text || '' |desc}}
                </a-tooltip> 
                </span>
            </template>   
            </span>
        <!-- 帐户 -->
        <!-- 错误提示类名：ErrorMessage  class="selectRowStyle" id="selectRowStyle" -->
        <span  slot="account" slot-scope="text, record,index" id="selectRowStyle"> 
            <a-select v-if="record.isEditRow" 
                showSearch
                placeholder="选择您的账户"  
                @change="onAccountChange"  
                v-model="rowObj.account.id"
                :filterOption="filterOption" 
                style="width:100%;border: none;"
                > 
                <a-select-option style="border: none;" value="addAccount">
                    <div @click="clickAddAccount">
                        <span class="addReceiverIcon" style="">
                        +
                        </span>
                        增加帐户
                    </div>
                </a-select-option> 
    <!-- :get-popup-container="getPopupContainer" -->
                <a-select-opt-group  v-for="item in accounts" :key="item.type" >
                    <span slot="label">{{item.type}}</span>
                    <a-select-option  v-for="opt in item.options"
                        :value="opt.id" :key="opt.id" >
                        {{opt.name}}
                    </a-select-option> 
                </a-select-opt-group> 

            </a-select>
            <template  v-else > 
                <span  class="nuewSpanclick" @click="editRowClick(record, index)">
                {{text ? text.name : ''}}
                </span>
            </template>   
        </span >
        <!-- 收付款人 -->
        <span  slot="receiver" slot-scope="text, record,index" class="handleSelect"> 
            <a-select v-if="record.isEditRow" 
                showSearch
                placeholder="选择收付款人"
                v-model="rowObj.receiver.id"
                optionFilterProp="children"
                :filterOption="filterOption"
                    style="width:100%;"> 
                <a-select-option value="addReceiver" style="width:100%;">
                    <!-- <b style="color:red;" > + 增加收付款人 </b> -->
                    <div @click="clickAddReceiver">
                        <span class="addReceiverIcon" style="">
                        +
                        </span>
                        增加收付款人
                    </div>
                </a-select-option> 

                <a-select-opt-group  v-for="item in receivers" :key="item.type" >
                    <span slot="label">
                        <a-icon type="item.type=='个人' ？ 'user' : 'folder'"/>
                        {{item.type}}
                    </span>
                    <a-select-option  v-for="opt in  item.options"  :value="opt.id"  :key="opt.id">
                        {{opt.name}}
                    </a-select-option> 
                </a-select-opt-group> 

            </a-select>
            <template  v-else > 
                <span  class="nuewSpanclick" @click="editRowClick(record, index)">
                {{text ? text.name : ''}}
                </span>
            </template>   
        </span > 
        <!-- 流入 流出 -->
        <span  slot="inFlow" slot-scope="text, record,index" class="handleSelect" > 
            <!-- {{rowObj.inFlow}} -->
            <!-- <a-input-number  
                style="width:90%;" 
                :min="0" :max="100000000"  
                v-model='rowObj.inFlow'
                @change="onInflowChange"/> -->

                <a-input v-if="record.isEditRow "
                style="width:90%;" 
                :value="rowObj.inFlow"
                @change="onInflowChange" 
                placeholder="流入"
                maxLength="20"
                
                /> 
            <template  v-else > 
                <span class="nuewSpanclick"  @click="editRowClick(record, index)" >
                {{ text| inOut}}
                </span>
            </template>   
        </span>

  <!-- v-model="rowObj.amount"   -->

        <span  slot="outFlow" slot-scope="text, record,index"  class="handleSelect"> 
            <!-- <a-input-number 
            :min="0" :max="100000000"  
            v-model ='rowObj.outFlow'
            @change="onOutflowChange"/> -->

             <a-input  v-if="record.isEditRow" 
                style="width:90%;" 
                :value="rowObj.outFlow"
                @change="onOutflowChange" 
                placeholder="流出"
                maxLength="20" 
                />

            <template  v-else > 
                <span class="nuewSpanclick" @click="editRowClick(record, index)">
                {{ text | inOut}}
                </span>
            </template>   
        </span>
    
        <!-- 内部转账 -->
        <span  slot="istransfer" slot-scope="text, record,index"  class="handleSelect"  
            style="width:100%;display: inline-block;text-align: center;">
            <!-- <a-button type="primary" v-if="record.isEditRow" @click="changeInterTransfer(text,index)">{{text == -1 ? '否' : '是'}}</a-button> -->
            <template v-if="record.isEditRow">
                <a 
                v-if="record.isEditRow" 
                @click="changeInterTransfer(text, record, index)" 
                class="button-3dmax button-box"
                :class="{'button-royal': rowObj.istransfer, 'button-pill': !rowObj.istransfer, 'button-action': !rowObj.istransfer}"
                >
                {{rowObj.istransfer ? '是' : '否' }}
                </a>
            <!-- </div> -->
            </template>          
            <template  v-else > 
                <div>
                    <span class="nuewSpanclick" @click="editRowClick(record, index)">
                    {{text ? '是' : '否' }}
                    </span>
                </div>
                
            </template>   
        </span>
        <!-- 分类 -->
        <span  slot="ftype" slot-scope="text, record,index"  class="handleSelect"> 
            <a-select v-if="record.isEditRow" 
                showSearch
                placeholder="选择分类"
                optionFilterProp="children"
                style="width:100%;" 
                :filterOption="filterOption"
                v-model="rowObj.ftype.id" 
                >
                <a-select-option value="addFtype">
                   <div @click="clickAddFtype">
                    <span class="addReceiverIcon" style="">+</span>
                    增加分类
                   </div>
                </a-select-option>

                <a-select-opt-group  v-for="item in fTypes" :key="item.type" >
                    <span slot="label"><a-icon type="user"/>{{item.type}}</span>
                    <a-select-option  v-for="opt in item.options"  :value="opt.id"  :key="opt.id">
                        {{opt.name}}
                    </a-select-option> 
                </a-select-opt-group> 
            </a-select>
            
            <template  v-else > 
            <span class="nuewSpanclick" @click="editRowClick(record, index)">
                {{text && text.name ? (record.amount < 0 ? '支 - ' : '收 - ') + text.name : ''}}
            </span>
            </template>     
        </span >
        <!-- 操作 -->
        <span slot="action" slot-scope="text, record,index">
            <a-spin :spinning="inSave" v-if="record.isEditRow">
                <span  style="width:100%;display:inline-block;text-align: center;">  
                 <a  @click="() => saveRowClick(record,index)" class="button-3dmax  button-primary button-rounded">保存</a>&nbsp;&nbsp;&nbsp;

                 <a-popconfirm v-if ="rowObjChange"  title='是否取消修改?'  
                     @visibleChange="handleCancelEditPop"
                    okText='确定' cancelText="取消"  
                    @confirm="() => cancelEidtRow(record,index)"  >
                    <a class="button-3dmax  button-caution button-box">取消</a>
                 </a-popconfirm>   
                  <a  v-else  class="button-3dmax  button-caution button-box" @click='cancelEidtRow(record,index)'>取消</a>

                
                </span>
            </a-spin>
            <span v-else>  
                <a-tooltip v-if="isClickEditRow">
                    <template slot='title'>
                        添加一行
                    </template>
                    <!-- <a-icon type="plus-circle" /> -->
                    <span class="addIcon" style="">
                        <a-icon type="plus" @click="addRowClick(index)" style="font-size:12px;color:#fff;"/>
                    </span>
                </a-tooltip>
                 

                <a-tooltip v-else>
                    <template slot='title'>
                        编辑
                    </template> 
                    <span class="editIcon" style="">
                        <a-icon type="edit"  @click=" editButtonClick(record,index)"  style="color:#fff;" /> 
                    </span> 
                </a-tooltip> 
                
                <a-divider type="vertical" />

                <span class="deletIcon" style="" v-if="!record.id"> 
                     <a-icon type="delete"  style="font-size:12px;color:#fff;" @click="delRowClick(record,index)"/>
                </span>
                
                <a-popconfirm title="确定删除？"  v-else
                okText='确定' cancelText="取消"  
                @confirm="() => delRowClick(record,index)">
                    <span class="deletIcon" style=""> 
                        <a-icon type="delete"  style="font-size:12px;color:#fff;"/>
                    </span>
                </a-popconfirm> 
            </span>
        </span>
        </a-table>
    </div>
</template>

<script>
import moment from "moment";
import ReceiverModal from './ReceiverModal.vue'
import AccountModal from './AccountModal.vue'
import FtypeModal from './FtypeModal.vue'
import zh_CN from "vue-antd-ui/lib/locale-provider/zh_CN";
import aTable from "../mixins/aTable.js";


export default {
  mixins: [aTable],
  props: {
    moneyflowDatas: {
      type: Array,
      default: () => []
    },
    isClickEditRow:{
        type:Boolean,
        default: false
    },
    rowSelection:{
      type: Object,
      default: () => null
    }
  },
  data() {
    return { 
      scrollHeight: window.innerHeight, 
      zh_CN,
    } 
  },
 components: {
    ReceiverModal,
    AccountModal,
    FtypeModal
  },
  computed: {
    getTableScroll() {
      return { y: this.scrollHeight - 340 };
    }
  },
  mounted() {
    let _self = this;
    window.addEventListener("resize",()=>{
      _self.scrollHeight = window.innerHeight;
    });
  },
  methods: { 
    getPopupContainer() {
      return document.getElementById("recordingTable");
    },
    disabledDate(current) {
      return current && current > moment().endOf("day");
    }, 
    addRowClick(index) {
       this.$emit('addRowClick',index);
    },



    start () {
        console.log('我是删除')
    }
  }
};
</script>
