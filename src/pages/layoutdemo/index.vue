<template> 
  <div id="layoutdemo">
    
    <div class="layouant-layout">
      <div class="layouant-layout-header layouheader">Header</div> 
      <!-- <div class="layouant-layout layouant-layout-has-sider">
        <div class="layouant-layout-sider" style="flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;">
          <div class="layouant-layout-sider-children">Sider</div>
        </div> 
        <div class="layouant-layout-content">Content</div>
        <div class="layouant-layout-sider" style="flex: 0 0 200px; max-width: 200px; min-width: 200px; width: 200px;">
          <div class="layouant-layout-sider-children">Sider</div>
        </div>
      </div>  -->
      <div class="layouant-flexbox layouant-flex-row">
        <div class="layouant-flexbox-item flex-demo layouslider" style=" flex: 1 1 auto; order: 0;">
          1
        </div> 
        <div class="layouant-flexbox-item flex-demo layoucontent" span="300" style="margin-left: 8px; flex: 4 1 auto; order: 0;">
          Content
        </div> 
        <div class="layouant-flexbox-item flex-demo layouslider" style="margin-left: 8px; flex: 1 1 auto; order: 0;">
          1
        </div>
      </div> 
      <div class="layouant-layout">
        <div class="layouant-layout-content">Content</div>
      </div> 
      <div class="layouant-layout-footer layoufooter">Footer</div>
    </div>
  </div>
</template>

<script>

import { mapGetters,mapActions } from "vuex";

export default {
  data() {
    
    return {
     
         
    };
  },
  mounted() {
  },
  methods: {
    
    
  },
  computed: {
    
  },
};
</script>
<style>
.layouheader{
  background-color: #73d13d !important;
}
.layouslider{
  background-color: #d9f7be !important;
}
.layoucontent{
  background-color: #b7eb8f !important;
}
.layoufooter{
  background-color: #f6ffed !important;
}
#layoutdemo .layouant-layout {
  display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    background: #f0f2f5;

        display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    background: #f0f2f5;
}
.layouant-layout, .layouant-layout * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.layouant-layout-header {
    background: #ccc;
    padding: 0 50px;
    height: 64px;
    line-height: 64px;
}
.layouant-layout-header, .layouant-layout-footer {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}

.layouant-layout.layouant-layout-has-sider {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
}
.layouant-layout-sider {
    -webkit-transition: all .2s;
    transition: all .2s;
    position: relative;
    background: #ccc;
    min-width: 0;
}
.layouant-layout-sider-children {
    height: 100%;
    padding-top: 0.1px;
    margin-top: -0.1px;
}
.layouant-layout.layouant-layout-has-sider > .layouant-layout, .layouant-layout.layouant-layout-has-sider > .layouant-layout-content {
    overflow-x: hidden;
}
.layouant-layout-content {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
}
.layouant-layout-footer {
    background: #f0f2f5;
    padding: 24px 50px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
}

.layouant-layout-header, .layouant-layout-footer {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}

.layouant-flex-row {
    box-direction: row;
    box-orient: horizontal;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
}

.code-examples-content {
    border-radius: 0 0 2px 0;
    padding: 14px 24px 24px;
    margin: 0;
}
.layouant-flex-row {
    box-direction: row;
    box-orient: horizontal;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
}
.layouant-flexbox {
    width: 100%;
    text-align: left;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    box-align: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.layouant-flexbox .layouant-flexbox-item {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    min-width: 20px;
    width: 0;
}
.flex-demo {
    height: 32px;
    background-color: #e0e0e0;
    text-align: center;
    line-height: 32px;
}
.layouant-flex-col {
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}
</style>