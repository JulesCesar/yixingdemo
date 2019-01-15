<template>
    <div id="Stepbar">
        <div>

            <div class="stepshow" v-if="stepshow" @click="stepshow = !stepshow">
                <a-icon type="close-square-o" />
            </div> 
            <a-tabs defaultActiveKey="1" tabPosition="left" v-if="stepshow">
                <!-- <div @click="stepbarclick"><a-icon type="close-square-o" /></div> -->
                <a-tab-pane   key="1">
                    <span slot="tab">
                        <!-- <a-icon type="check-circle-o" /> -->
                        <!-- <a-icon type="check-circle" /> -->
                        <a-icon type="form" />
                        记录收支情况
                    </span>
                    <div>
                        <a-steps>
                            <a-step status="finish" title="记一笔日记账">
                                <a-icon type="edit" slot="icon"/>
                            </a-step>
                            <a-step status="finish" title="流水导入/导出">
                                <a-icon type="file-add" slot="icon"/>
                            </a-step>
                            <a-step status="finish" title="对接报销/API">
                                <a-icon type="team" slot="icon"/>
                            </a-step> 
                        </a-steps>
                    </div>
                    
                </a-tab-pane>
                <a-tab-pane  key="2">
                    <span slot="tab">
                        <!-- <a-icon type="check-circle-o" /> -->
                        <!-- <a-icon type="check-circle" /> -->
                        <a-icon type="pay-circle-o" />
                        现金流管理
                    </span> 
                    <div>
                        <a-steps>
                            <a-step status="finish" title="收支分类">
                                <a-icon type="appstore" slot="icon"/>
                            </a-step>
                            <a-step status="finish" title="收付款人管理">
                                <a-icon type="database" slot="icon"/>
                            </a-step>
                             <a-step status="finish" title="标签管理">
                                <a-icon type="tags-o" slot="icon"/>
                            </a-step>
                            <a-step status="finish" title="对账">
                                <a-icon type="schedule" slot="icon"/>
                            </a-step> 
                        </a-steps>
                    </div>
                    
                </a-tab-pane>
                <a-tab-pane key="3">
                    <span slot="tab">
                        <!-- <a-icon type="check-circle-o" /> -->
                        <a-icon type="exception" />
                        管理应收应付
                    </span> 
                    <div>
                        <a-steps>
                            <a-step status="finish" title="记一笔应收应付">
                                <a-icon type="form" slot="icon"/>
                            </a-step>
                            <a-step status="finish" title="应收应付款人管理">
                                <a-icon type="contacts" slot="icon"/>
                            </a-step> 
                            <!-- <a-step status="finish" title="布局demo">
                                <a-icon type="contacts" slot="icon"/>
                            </a-step> -->
                        </a-steps> 
                    </div>
                    
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
    
</template>
<script>
export default {
    data(){
        return {
            stepshow:true,
        }
    },
    methods:{
        stepbarclick(){
            this.stepshow = !this.stepshow
        }
    }
}
</script>


<style>
 #Stepbar{
     position: relative;
 }
 #Stepbar .ant-tabs-content{
    padding-top: 28px;
        /* width: 80%; */
        padding-right:22px;
}
#Stepbar .ant-steps-item-icon{
   width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 46px;

    font-size: 54px;
}
#Stepbar .ant-steps-item-icon, .ant-steps-item-content{
    vertical-align: middle !important;
}
#Stepbar .ant-steps-item-finish > .ant-steps-item-content > .ant-steps-item-title:after{
    background-color: #595d61;
}
#Stepbar .ant-steps-item-finish .ant-steps-item-icon{
    border-color: #3a3b3c;
}
#Stepbar .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon{
    color: #191a1b;
}
#Stepbar .ant-tabs-nav .ant-tabs-tab-active{
color: #040404;
}
#Stepbar .ant-tabs-nav .ant-tabs-tab:hover{
color: #040404;
}
#Stepbar .ant-tabs-ink-bar{
background-color: #040404;
}
#Stepbar .stepshow{
    width: 50px;
    height: 50px;
    font-size: 30px;
    color: #040404;
    position:absolute;
    top:0;
    right: 0;
    cursor:pointer;
    z-index: 2;
}
#Stepbar .stepshow:hover{
    color: #6f6c6c;
}
#Stepbar .ant-tabs{
    box-shadow: 0 1px 6px rgb(234, 232, 232);
    /* border: 1px solid #eae8e8; 
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);*/
    padding: 14px 0 14px 0;
    border-radius: 4px;
}
#Stepbar .ant-tabs:hover{
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
</style>

