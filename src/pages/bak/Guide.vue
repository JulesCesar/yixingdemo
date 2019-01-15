<template> 
    <div>
        <div v-show="loadingbox" class="loadingbox-uno">
            <div class="spinner-dots">
                <span class="dot1"></span>
                <span class="dot2"></span>
                <span class="dot3"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loadingbox:true
        }
    },
    beforeDestroy: function () {  
        let _self = this;  
        _self.loadingbox = false;
    }
}
</script>
