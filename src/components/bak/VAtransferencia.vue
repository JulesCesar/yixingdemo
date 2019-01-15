<template>
  <div class="content page-upload">
       
      <!-- 头部tab nav nav-tabs --> 
        <ul id="myTab" class="clearfix drawee-bq">
            <li class="active pullleft">
                <a href="#home1" class="glyphicon transferen-title" data-toggle="tab">现金流水</a>
            </li>
            <li class="pullleft">
                <a href="#home2" class="glyphicon transferen-title" data-toggle="tab">应收应付</a>
            </li>
        </ul>
        <div id="myTabContent" class="tab-cont-transfer"> 
          <div class="tab-pane fade in active" id="home1">
            <div class="myTab-text">
              1111
            </div>
            <!-- 选项卡里的选项卡现金流水 -->
            <div>
              <div class="tabs-onbox clearfix">  
                  <div class="tabs clearfix api-box">  
                      <div class="tabs-dic api-flex" v-for="(tab,index) in tabsName">  
                          <a href="#" class="tab-link" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>  
                      </div>  
                  </div>  
                  <div class="myTab-input clearfix">
                    <div class="clearfix pullleft">
                      <input type="text" placeholder="客户姓名" class="input-group pullleft">
                      <div class="input-group__append pullleft">
                        <button class="yx-button yx-button--default">
                          <i class="el-icon-search"> </i>
                        </button>
                      </div>
                    </div>
                    <div class="Aumentar clearfix pullright">
                        <span class="glyphicon glyphicon-plusday"></span>
                        <span class="Aumentar-text">新增客户</span>
                    </div>
                  </div> 
                  <div class="cards">  
                      <div class="tab-card" style="display: block;">
                        <div class="Servicios">
                              <table class="table table-striped tabs-center">
                              <caption class="clearfix table-boredrt">
                                <div class="pullleft"><p class="titletext">{{titletext}}</p></div></caption>
                              <thead class="comer-thead">
                                <tr class="Cuenta-color">
                                  <th v-for="ith in iths" >{{ith.thtext}}</th>
                                </tr>
                              </thead>
                              <tbody class="comerciales">
                                <tr class="comerciales-tr" v-for="item in myurltext">
                                  <td>{{item.name}}</td>
                                  <td>{{item.Cuenta}}</td>
                                  <td>{{item.Despues}}</td>
                                  <td>{{item.phone}}</td>
                                  <td>{{item.emaler}}</td>
                                  <td>{{item.desic}}</td>
                                  <td class="operacion">
                                    <div class="operaci-table">
                                      <!-- <div class="glyphicon glyphicon-arrow-up" v-on:click="shangBtn(index)" data-toggle="modal" data-target="#myModal"  >上移</div> -->
                                      <div class="glyphicon glyphicon-edit glyphicon-color"  @click="xiaBtn(item.id)">编辑</div>
                                      <div class="el-icon-circle-close glyphicon-color" @click="open2(item.id)">删除</div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                        </div>
                        <div>
                          说明：填写银行账户和银行卡后四位可以XX
                        </div>
                      </div>  
                      <div class="tab-card">伙伴</div>  
                      <div class="tab-card">员工</div>  
                  </div>  
              </div> 
              
            </div>
            
            <!-- 选项卡里的选项卡现金流水 -->
          </div>


           <div class="tab-pane fade" id="home2">
            <!-- 应付 -->
            222
           </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'va-tabsr',
  // todo 将来拓展
  data(){
    return{
      iths: [
          {thtext:'姓名'},
          {thtext:'银行账户'},
          {thtext:'银行卡后四位'},
          {thtext:'手机'},
          {thtext:'邮箱'},
          {thtext:'备注'},
          {thtext:'操作'},
      ],
      myurltext:[
        {name:'章三',Cuenta:'渣打银行',Despues:'1100',phone:'13800138000',emaler:'Xijinping@qq.com',desic:'秋后'},
        {name:'李四',Cuenta:'渣打银行',Despues:'1100',phone:'13800138000',emaler:'Xijinping@qq.com',desic:'秋后'},
        {name:'王五',Cuenta:'渣打银行',Despues:'1100',phone:'13800138000',emaler:'Xijinping@qq.com',desic:'秋后'},
        {name:'赵六',Cuenta:'渣打银行',Despues:'1100',phone:'13800138000',emaler:'Xijinping@qq.com',desic:'秋后'},
      ],
      tabsName: [{  
          name: "客户",  
          isActive: true  
      }, {  
          name: "伙伴",  
          isActive: false  
      }, {  
          name: "员工",  
          isActive: false  
      }], 
      active:false  
    }
  },
  methods: {  
      tabsSwitch: function(tabIndex) {  
          var tabCardCollection = document.querySelectorAll(".tab-card"),  
              len = tabCardCollection.length;  
          for(var i = 0; i < len; i++) {  
              tabCardCollection[i].style.display = "none";  
              this.tabsName[i].isActive = false;  
          }  
          this.tabsName[tabIndex].isActive = true;  
          tabCardCollection[tabIndex].style.display = "block";  
      }  
  }  
};
</script>
<style lang="css">
</style>
