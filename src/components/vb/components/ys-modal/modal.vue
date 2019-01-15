<template>
    <div class="modal">
              <div class="modal-header">
                    <v-row>
                        <v-col span="12"><h4>{{ modalTitle }}</h4></v-col>
                        <v-col span="12">
                            <div class="modal-footer">
                                <input class="btn blue" type="button" v-model="okBtn" @click="okHandle" />
                                <input class="btn" type="button" v-model="cancelBtn"  @click="cancelHandle" />
                            </div>
                        </v-col>
                    </v-row>
                  
                    
              </div>
              <div class="modal-content">
                  <div>
                      <slot name="modal-content">contents</slot>
                  </div>
              </div>
              <!-- <div class="modal-footer">
                <input class="btn blue" type="button" v-model="okBtn" @click="okHandle" />
                <input class="btn" type="button" v-model="cancelBtn"  @click="cancelHandle" />
              </div> -->
          </div>
</template>
<script  > 
    export default {
        name: 'YsModal',
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
                mousePosition: {},
            };
        },
        methods: {
            okHandle () {
                console.log("点击确定");
                this.$emit("on-ok"); 
            },
            cancelHandle () {
                console.log("点击取消");
                this.$emit("on-cancel");
            }
        },
    };
</script>
<style scoped>
.modal{
      width: 100%;
      height:100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, .3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, .5);
  }
  .modal-header {
      color: #fff;
      background: #f4f5f8;
      border-radius: 6px 6px 0 0;
      padding: 15px;
      border-bottom: 1px solid #f4f5f8;
  }
  .modal-content {
      padding: 15px 10px;
  }
  .modal-footer {
      /* padding: 15px; */
      text-align: right;
      /* border-top: 1px solid #e5e5e5; */
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
  #test {
    text-align: center;
    background: #39c;
    padding: 10px;
    width: 180px;
    color: #fff;
    margin: 0 auto;
    text-shadow: 0 1px 0 rgba(0,0,0,.3);
    background-image: -webkit-linear-gradient(-45deg, rgba(255,255,255,0), rgba(255,255,255,.1) 60%, rgba(255,255,255,0) 60%);
    background-image: -moz-linear-gradient(-45deg, rgba(255,255,255,0), rgba(255,255,255,.1) 60%, rgba(255,255,255,0) 60%);
    background-image: linear-gradient(-45deg, rgba(255,255,255,0), rgba(255,255,255,.1) 60%, rgba(255,255,255,0) 60%);
    border-radius: 5px;
    border: 1px solid #17a;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.3);
    font-weight: bold;
    
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;

    -webkit-animation-duration: 1s;
    -webkit-animation-delay: .2s;
    -webkit-animation-timing-function: ease;
    -webkit-animation-fill-mode: both;

    -moz-animation-duration: 1s;
    -moz-animation-delay: .2s;
    -moz-animation-timing-function: ease;
    -moz-animation-fill-mode: both;

    -ms-animation-duration: 1s;
    -ms-animation-delay: .2s;
    -ms-animation-timing-function: ease;
    -ms-animation-fill-mode: both;

    animation-duration: 1s;
    animation-delay: .2s;
    animation-timing-function: ease;
    animation-fill-mode: both;
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

