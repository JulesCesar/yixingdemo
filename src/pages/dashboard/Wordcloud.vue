<template> 
  <div id="demomodel" class="newguide">
    
      <a-modal :visible="upFileModalVisible" title="流水分析" @cancel="handleCancelUp">
          <template slot="footer">
              <a-button @click="handleCancelUp">取消</a-button>
          </template>
          <up-file-modal @refreshWord="refreshWord" :account-datas="accountDatas" />
      </a-modal>
      <a-row>
          <a-col :span="24">
              <a-card title="流水账画像" :bordered="false">
                  <a-button slot="extra" type="primary" @click="clickUploadFile">流水分析</a-button>
                  <div style="padding-left:20px;">
                      <!-- <h3 style="margin-bottom:10px;">内容说明</h3> -->
                      <p style="margin-bottom:10px;">*&nbsp;根据流水账的摘要信息分析得出，探索流水信息的实相<span v-if="currentUser.companyinfo.num_moneyflow_data==0" style="color: #1890ff;">（以下为示例画像）</span></p>
                  </div>
                  <div id="mountNode"></div>
              </a-card>
          </a-col>
      </a-row>
    <!-- <a-row>
      <a-col :span="24" style="text-align: left; ">
        <div class="Introduction">
          <div id="mountNode"></div>
        </div>
      </a-col>
    </a-row> -->
  </div>
</template>

<script>
import { listWord } from '../../models/word';
import { mapGetters,mapActions } from "vuex";
import currency from 'currency.js'
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import UpFileModal from '../edit/UpFileModal.vue';
import { setEvent } from "../../models/pages"

export default {
    components: {
        UpFileModal
    },
    props: {
        accountDatas: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            upFileModalVisible: false,
            cydata:[
                {"name":"水果款","num":138,},
                {"name":"康证报销","num":1316,},
                {"name":"下学期学费","num":32,},
                {"name":"扫码手续费","num":2,},
                {"name":"王燕萍费用报销","num":207,},
                {"name":"洪惠明差旅费报销","num":19,},
                {"name":"蔬菜款","num":600,},
                {"name":"面包款","num":16,},
                {"name":"猪肉款","num":4,},
                {"name":"空调款","num":11,},
                {"name":"培训来回车费","num":123,},
                {"name":"开票软件服务费（税控年费)","num":14,},
                {"name":"短信费","num":15,},
                {"name":"政府拨款","num":2,},
                {"name":"闽DE1995校车今年份还贷","num":92,},
                {"name":"粮油款","num":8,},
                {"name":"电费","num":9,},
                {"name":"公司内部转账","num":34,},
                {"name":"住宿费","num":42,},
                {"name":"唯品会结算","num":22,},
                {"name":"进货尾款","num":33,},
                {"name":"天猫平台结算","num":15,},
                {"name":"京东平台结算","num":2,},
                {"name":"办公室耗材","num":22,},
                {"name":"人均报销","num":45,},
                {"name":"运营支出","num":1,},
                {"name":"设备维修","num":3,},
                {"name":"广告费用","num":9,},
                {"name":"送礼款打点","num":4846,},  
            ],
        };
    },
    computed: {
        ...mapGetters(['currentUser'])
    },
  mounted() {
      function getTextAttrs(cfg) {
        return _.assign({}, {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic'
        }, cfg.style);
      }
      // 给point注册一个词云的shape
      G2.Shape.registerShape('point', 'cloud', {
        drawShape: function drawShape(cfg, container) {
          var attrs = getTextAttrs(cfg);
          return container.addShape('text', {
            attrs: _.assign(attrs, {
              x: cfg.x,
              y: cfg.y
            })
          });
        }
      });
      let _self = this;
      listWord().then(res => {
          if (res.data.code == 200) {
              // _self.renderChart(res.data.data);
              // _self.renderChart(_self.cydata);
              if(res.data.data.length != 0){
              // if(res.data.data==[]){
                _self.renderChart(res.data.data)
              }else{
                _self.renderChart(_self.cydata);
              }
          }
      });
  },
  methods: {
     
    renderChart(cydata){
        let _chart_dom = document.getElementById('mountNode');
        _chart_dom.innerHTML = '';
        cydata.map(item => {
            item['名称'] = item.name,
            item['出现频次'] = item.num;
        })
        let dv = new DataSet.View().source(cydata);
        let range = dv.range('num');
        let min = range[0];
        let max = range[1];
        max++;
        dv.transform({
          type: 'tag-cloud',
          fields: ['name', 'num'],
          size: [window.innerWidth, 400],
          font: 'Verdana',
          padding: 0,
          timeInterval: 5000, // max execute time
          rotate: function rotate() {
            let random = ~~(Math.random() * 4) % 4;
            if (random == 2) {
              random = 0;
            }
            return random * 90; // 0, 90, 270
          },
          fontSize: function fontSize(d) {
            if (d.num) {
              return (d.num - min) / (max - min) * (80 - 24) + 24;
            }
            return 0;
          }
        });
        let chart = new G2.Chart({
          container: 'mountNode',

        forceFit: true,
          width: window.innerWidth,
        //   height: window.innerHeight,
            height: 400,
          padding: 0
        });
        chart.source(dv, {
          x: {
            nice: false
          },
          y: {
            nice: false
          }
        });
        chart.legend(false);
        chart.axis(false);
        chart.tooltip({
          showTitle: false
        });
        chart.coord().reflect();
        chart.point().position('x*y').color('name').shape('cloud').tooltip('名称*出现频次');
        chart.render();
    }, 
    clickUploadFile() {
      setEvent({
          "keyname": "dashboard_wordcloud",
          "keyvalue":"词云上传文件按钮"
      }),
      this.upFileModalVisible = true;
    },
    handleCancelUp() {
        this.upFileModalVisible = false;
    },
    refreshWord() {
        let _self = this;
        _self.upFileModalVisible = false;
        listWord().then(res => {
            if (res.data.code == 200) {
                _self.renderChart(res.data.data);
            }
      });
    }
  }
};
</script>
<style>
</style>