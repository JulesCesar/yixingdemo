<template>
    <div>
        <div class="container-narrow">
                <div class="masthead">
                    <ul class="nav nav-pills pull-right" data-step="6" data-intro="我是产品手册不明白的点我">
                    <!-- <li @click="tourCallback"> 第六个</li> -->
                    <li> 第六个</li>
                    
                    </ul>
                </div>
                <div class="masthead">
                    <ul class="nav nav-pills pull-right" data-step="5" data-intro="我是帮助 点我">
                    <li> 第五个</li>
                    
                    </ul>
                </div>
            <hr>
                <div class="jumbotron">
                    <h1 id="intro-farm" data-step="1" data-intro="我是第一个里面的tooltip!">第一个</h1>
                    <p class="lead" data-step="4" data-intro="哈哈哈哈哈哈">第四个</p>
                    <a class="btn btn-large btn-success" 
                        href="javascript:void(0);" 
                        >
                        Show me how
                    </a>
                    <!-- <a class="btn btn-large btn-success" 
                        href="javascript:void(0);" 
                        onclick="javascript:introJs().setOption('showProgress', true).start();">
                        Show me how
                    </a> -->
                </div>
            <hr>
                <div class="row-fluid marketing">
                    <div class="span6" data-step="2" data-intro="我是第二个里面的tooltip!" data-position='right'>
                        <h4>第二个 One</h4>
                        <p>第二个的content</p>

                        <h4>第二个 Two</h4>
                        <p>第二个的content</p>

                        <h4>第二个 Three</h4>
                        <p>第二个的content</p>
                    </div>

                    <div class="span6" data-step="3" data-intro="我是第三个里面的tooltip!"  data-position='left'>
                        <h4>第三个 One</h4>
                        <p>第三个的contyrns</p>

                        <h4>第三个 Two</h4>
                        <p>第三个的contyrns</p>

                        <h4>第三个 Three</h4>
                        <p>第三个的contyrns</p>
                    </div>
                </div>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    
    data(){
        return{
        }
    },

    mounted(){
        // setTimeout(() => {
        //     // introJs().start();
        //     let _guide = localStorage.getItem('guide');
        //     if (!_guide)  {
        //         introJs().start().onexit((() => {
        //             localStorage.setItem('guide', true);
        //         }))
        //     }
        // }, 1000);
    },
    methods: {
        
    }
}
</script>

<style>

</style>
