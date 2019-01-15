<template>
    <div class="modal">
        <div class="modal-header">
            <div class="modal-footer">
                应收付款人
            </div>
        </div>
    </div>
</template>
<script  > 
    export default {
        name: 'YsTabsPayer',
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
.modal{
      width: 100%;
      height:30vh;
    
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, .3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, .5);
  }

</style>

