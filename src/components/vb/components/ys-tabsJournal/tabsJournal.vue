<template>
    <div class="TabsJournal">
        日记账
    </div>
</template>
<script  > 
    export default {
        // name: 'YsModal',
        name: 'YsTabsJournal',
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
            };
        },
        methods: {
            
        },
    };
</script>
<style scoped>
.TabsJournal{
    width: 100%;
    height: 200px;
    border: 1px solid #ccc;
}
</style>

