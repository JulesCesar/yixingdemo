<template>
  <div>  
    <div  v-if="!isLoading">
        <!-- modal -->
        <account-modal :is-account-modify="isAccountModify" :insertvisible="accountInsertvisible" @accountmodalcancel="accountmodalcancel" @accountInserted="refreshAccounts"/>
        <v-row>
            <v-col
                span="24"
                style="height: 64px; padding-top: 8px;">
                <v-button type="primary" @click="showInsertModal" size="large">新增账户</v-button>
            </v-col>
        </v-row>

        <template v-for="at in accountTypes">
            <div :key="at" style="margin-bottom: 24px;">
                <a-row style="height: 48px; width: 100%; border-bottom: 1px solid #e9e9e9; line-height: 48px;">
                    <a-col :span="24">
                        <a-icon style="font-size:22px; transform: translateY(2px);" type="bank" v-show="at=='银行账户'"/>
                        <a-icon style="font-size:22px; transform: translateY(2px);" type="pay-circle" v-show="at=='现金账户'"/>
                        <a-icon style="font-size:22px; transform: translateY(2px);" type="alipay" v-show="at=='第三方支付平台'"/>
                        <a-icon style="font-size:22px; transform: translateY(2px);" type="credit-card" v-show="at=='信用卡'"/>
                        <span style="font-size: 14px; font-weight: 500; color: rgba(0, 0, 0, 0.85);">{{at}}</span>
                    </a-col>
                </a-row>
                <a-row style="padding: 0 24px;">
                    <a-col :span="24">
                        <yxcard2
                            v-for="acc in accounts"
                            v-if="acc.type == at"
                            :key='acc.id'
                            :id="acc.id"
                            :name="acc.name"
                            :type="acc.type"
                            :balance="acc.balance"
                            :dateStart="acc.startdate + ' '"
                            :dateEnd="acc.enddate + ' '"
                            :count="acc.rownum"
                            :click="showModifyModal">
                        </yxcard2>
                    </a-col>
                </a-row>
            </div>
        </template>
    </div>
    <div v-else>
        <div class="example" style="height:300px;">
            <a-spin size="large" />
        </div>
    </div>

</div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import {
  listAccount
} from "../../models/moneyFlow.js";

import Yxcard2 from "../../components/Yxcard2.vue";
import AccountModal from "../edit/AccountModal.vue";

export default {
    data() {
        return { 
            isLoading: true,
        isAccountModify: false,
        oldAccount: {},
        accountDatas: [], 
        accountInsertvisible: false, 
        };
    },
    computed: {
        accounts(){
            return this.accountDatas.map(val => {
                val.type = val.atype.name;
                //acc.value + acc.curincome + acc.curexpense
                return val;
            })
        },
        accountTypes() {
            let _tmp = [];
            this.accountDatas.map(item => {
                if (!_tmp.some(val => val == item.atype.name)) {
                    _tmp.push(item.atype.name);
                }
            });
            return _tmp;
        }
    },
    created() {
        this.$bus.$on('deleteAccountSuccess', (id) => {
        for(let i = 0, l = this.accountDatas.length; i < l; i++) {
            if (this.accountDatas[i].id == id) {
                this.accountDatas.splice(i, 1);
                break;
            }
        }
        });
        this.initAccouts();
    },
    methods: {  
        initAccouts() {
        // 账户查询信息 debugger;
        let _self = this
        listAccount({}).then(res => {  
            if (res.data.code == 200) {
            if (res.data.data.length) {
                _self.accountDatas = res.data.data;
                _self.isLoading = false;
            } 
            }
        });
        },
        showInsertModal() { 
            this.accountInsertvisible = true;  
        }, 
        showModifyModal(id){
            let _self = this;
            _self.isAccountModify = true;
            let _acc = _self.accountDatas.find(item => item.id == id);
            Object.keys(_acc).forEach(key => {
                _self.oldAccount[key] = _acc[key];
            });
            this.accountInsertvisible = true;
            this.$bus.$emit('updateaccount', _self.oldAccount);
        },
        accountmodalcancel(){
            this.accountInsertvisible = false; 
            this.isAccountModify = false;
            this.oldAccount = {};
            this.$bus.$emit('accountmodalinit');
        },
        refreshAccounts(new_account){
            let _item = this.accountDatas.find(item => item.id == new_account.id);
            if (_item) {
                Object.keys(new_account).forEach(key => {
                    _item[key] = new_account[key];
                });
            } else {
                this.accountDatas.push(new_account);
            }
            // this.initAccouts()
        }
    },
    components: {
        Yxcard2,
        AccountModal
    }
};
</script>

<style>
.accout-content-title {
  text-align: start;
  padding-top: 8px;
  font-size: 16px;
}
.import-row-title {
  font-size: 18px;
  text-align: start;
  margin-top: 0px;
}
.import-row {
  padding-top: 16px;
}
.import-row-title2 {
  padding-top: 8px;
  border-top: 1px solid #ddd;
}
.import-item-name {
  text-align: end;
  padding-top: 8px;
}
.import-row-goback {
  font-size: 16px;
}
.import-row-desc-a {
  /* padding-left: 0px;
  */
  padding-top: 10px;
}
.import-row-desc-a a {
  color: LightPink;
  text-decoration: underline;
}
.import-row-desc-a a:link {
  color: LightPink;
}
.import-icon {
  margin-left: 5px;
  margin-right: 10px;
  font-size: 16px;
  color: #1e90ff;
}

.ant-calendar-disabled-cell.ant-calendar-today .ant-calendar-date:before {
    content: " ";
    position: absolute;
    top: -3px !important;
    left: -2px !important;
    width: 24px;
    height: 24px;
    border: 1px solid #bcbcbc;
    border-radius: 2px;
    }
.example{
    text-align: center;
}
</style>
