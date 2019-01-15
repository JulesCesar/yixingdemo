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
              <!-- 选项卡 -->
              <v-ys-tabsoptions>
                
              </v-ys-tabsoptions>
            </div>
          </v-ys-modal>
        </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHide: true,
    };
  },

  methods: {
    // modal
    ok (){
        // alert("我是确定tost");
        this.isHide = !this.isHide;
    },
    cancel (){
      // alert("我是取消tost");
        this.isHide = !this.isHide;
    },
 
  },
};
</script>
<style>

</style>
