<template>
   <div class="box-tabs">  
        <ul class="tabs-all-options clearfix">  
            <li v-for="(tab,index) in tabsName">  
                <a href="#" class="tab-link" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">{{tab.name}}</a>  
            
            </li>  
        </ul>  
        <div class="cards-content">  
            <div class="tab-card" style="display: block;">1</div>  
            <div class="tab-card">2</div>  
            <div class="tab-card">3</div>
            <div class="tab-card">4</div>  
            <div class="tab-card">5</div>   
        </div>  
    </div>
</template>
<script  > 
    export default {
        name: 'YsTabsoptions',
        props: { 
            tabsNameclick: {//点击的taba
              type: String,
              default: ''
            },
        },
        data() {
            return {
                tabsName: [
                    {  
                    name: "估计",  
                    isActive: true  
                    }, 
                    {  
                    name: "活动",  
                    isActive: false  
                    }, 
                    {  
                    name: "tres",  
                    isActive: false  
                    },
                    {  
                    name: "cuatro",  
                    isActive: false  
                    },
                    {  
                    name: "cenco",  
                    isActive: false  
                    }
                ],  
                active: false 
            };
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
        },
    };
</script>
<style scoped>
.box-tabs {  
      width: 90%;  
      /* height: 200px;   */
      margin: 0 auto;  
      position: relative;
      /* border: 1px solid #000;   */
  }  
  .tabs-all-options li {  
      float: left;  
      margin-right: 2px;  
      list-style: none;  
      transition: all  .6s  ease-in;
      -moz-transition: all  .6s  ease-in;
      -webkit-transition: all  .6s  ease-in;
      background-color: pink;
      position: relative;
  }
  .tabs-all-options li:hover {  
    border-bottom:10px solid rgba(0, 0, 0, 0.25);
    transform:translateY(-10px);
  }
  
  .tabs-all-options li:nth-of-type(1){  
      background-color: #21abf6;
  } 
  .tabs-all-options li:nth-of-type(2){  
      background-color: #0077c5;
  } 
  .tabs-all-options li:nth-of-type(3){  
      background-color: #ff8000;
  } 
  .tabs-all-options li:nth-of-type(4){  
      background-color: #b8bcc4;
  } 
  .tabs-all-options li:nth-of-type(5){  
      background-color: #7ece00;
  }  
  .tabs-all-options .tab-link {  
      display: block;  
      width: 160px;  
      height: 49px;  
      text-align: center;  
      line-height: 49px;  
      color: #fff;  
      text-decoration: none;  
    color: #fff;
    cursor: pointer;
    
  }  

  .tabs-all-options .tab-link.active {  
      background-color: #999;
      border-top: 1px solid #000;
      transition: .3s;  
  }  
  .cards-content {
      margin-top: 20px;  
      float: left; 
      width: 100%;
      background-color: #f4f4f4;
      height: 100px; 
      position: absolute;
      top: 40px;
      left: 0;
  }  
  .cards-content .tab-card {  
      display: none;  
  }  
  .clearfix:after {  
      content: "";  
      display: block;  
      height: 0;  
      clear: both;  
  }  
  .clearfix {  
      zoom: 1;  
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

