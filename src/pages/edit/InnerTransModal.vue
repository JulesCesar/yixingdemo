<template>
    <div>
        <a-modal :visible="visible" title="内部转账" @cancel="handleCancel">
            <template slot="footer">
                <a-button @click="handleCancel">取消</a-button>
                <a-button type="primary" @click="handleOk">确定</a-button>
            </template>

            <a-form>
                <a-form-item required label="时间" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-locale-provider :locale="zh_CN">
                        <a-date-picker :defaultValue="moment(rowObj.date)" @change="handleDateChange" :allowClear="false" style="width:100%;" />
                    </a-locale-provider>
                </a-form-item>
                <a-form-item required label="金额" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-input-number style="width: 100%;" v-model="rowObj.amount" />
                </a-form-item>
                <a-form-item required label="转出账户" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-select placeholder="选择转出账户" v-model="rowObj.account.id">
                        <a-select-opt-group v-for="item in accounts" :key="item.type" >
                            <span slot="label">{{item.type}}</span>
                            <a-select-option v-for="opt in item.options"
                                :value="opt.id" :key="opt.id">
                                {{opt.name}}
                            </a-select-option>
                        </a-select-opt-group>`
                    </a-select>
                </a-form-item>
                <a-form-item required label="转入账户" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-select placeholder="选择转入账户" v-model="rowObj.account2.id">
                        <a-select-opt-group v-for="item in accounts" :key="item.type" >
                            <span slot="label">{{item.type}}</span>
                            <a-select-option v-for="opt in item.options"
                                :value="opt.id" :key="opt.id">
                                {{opt.name}}
                            </a-select-option>
                        </a-select-opt-group>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import zh_CN from "vue-antd-ui/lib/locale-provider/zh_CN";
import moment from 'moment';

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        rowObj: {
            type: Object,
            default: () => {}
        },
        accounts: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            zh_CN,
            formLayout: {
                labelCol: {
                    span: 7
                },
                wrapperCol: {
                    span: 13,
                    offset: 1
                }
            }
        }
    },
    mounted() {
        console.log(this.rowObj)
    },
    methods: {
        moment,
        handleCancel() {
            this.$emit('innerCancel');
        },
        handleOk() {
            this.$emit('innerOk');
        },
        handleDateChange(val, dateStr) {
            this.rowObj.date = dateStr;
        }
    }
}
</script>
