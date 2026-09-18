<template>
  <div class="flex_direction">
    <div class="title_style">
      <div v-for="(item, index) in titlelist" :key="index" class="title_style_item" @click="openClick(item)">
        <img :src="item.imgurl" class="img_style" alt="">
        <div class="text">
          <div>{{ item.name }}</div>
          <div>{{ item.num }}</div>
        </div>
      </div>
    </div>

    <div class="demo_style">
      <div v-for="(item, index) in demolist" :key="index" class="demo_item" @click="topages(item)"
           :style="'top:'+item.y+'px;'+'left:'+item.x+ 'px;'">
                <span>
                    {{ item.name }}
                </span>
      </div>
    </div>


    <div class="flex_bottom">

      <div class="flex_left">
        <div class="titlebg2">
          <div class="text">
            <!--            对接客户概览-->
            客户情况
          </div>
        </div>

        <div class="tab_flex">
          <div :class="tabindex == 0 ? 'tab_item_active' : 'tab_item'" @click="changetab(0)">招商意向客户数量
          </div>
          <div :class="tabindex == 1 ? 'tab_item_active' : 'tab_item'" @click="changetab(1)">客户来源
          </div>
        </div>

        <div v-show="tabindex == 0" id="line"></div>

        <div v-show="tabindex == 1" class="pie_flex">
          <div style="position: relative;">
            <div id="pie"></div>
            <img src="@/assets/piebg3.png" alt="" class="piebg3">
          </div>
          <div class="pie_flex_list">
            <div v-for="(item, index) in optionpie" :key="index" class="pieText">
              <div class="dot">
                <div class="dot_big" :style="{ backgroundColor: item.itemStyle.color }"></div>
                <div class="dot_small" :style="{ backgroundColor: item.itemStyle.color }"></div>
              </div>

              <div class="pieTextname">{{ item.name }}</div>
              <div class="pieTextnums">{{ item.value }}<span>家</span></div>
            </div>
          </div>
        </div>

      </div>
      <div class="flex_right">
        <div class="titlebg3">
          <div class="text">
            近3年的实收总额/万
          </div>
        </div>
        <div id="bar_money"></div>
      </div>
    </div>

  </div>
</template>

<script>
import {getUnconditionalData} from '@/api';
import * as echarts from 'echarts'; //引入echarts 绘图工具
import request from '../../../../api/request'
import {openCosmicListPage} from "@/utils/openUtils";

export default {
  data() {
    return {
      colorList: ["#84D6FB", "#F2F6FB", "#9BF179", "#F2A43A", "#3567F5", "#2455a4", "#41b7ac"],
      titlelist: [
        {
          name: '资产总量/万',
          num: '100',
          imgurl: require('@/assets/iconimg.png'),
          formId: "cqkd_assetcard",
          openType: "1"
        },
        {
          name: '在租客户数',
          num: '100',
          imgurl: require('@/assets/iconimg1.png'),
          formId: "cqkd_ht",
          openType: "1"
        },
        {
          name: '在租合同数',
          num: '100',
          imgurl: require('@/assets/iconimg2.png'),
          formId: "cqkd_ht",
          openType: "2"
        },
        {
          name: '合同到期数',
          num: '100',
          imgurl: require('@/assets/iconimg3.png'),
          formId: "cqkd_ht",
          openType: "3"
        },
        {
          name: '欠租金额',
          num: '100',
          imgurl: require('@/assets/iconimg4.png'),
          formId: "cqkd_zqzd",
          openType: "1"
        }
      ],
      linedata: {
        datax: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        datay: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      demolist: [
        {
          name: '项目1'
        }, {
          name: '项目2'
        }, {
          name: '项目3'
        }, {
          name: '项目4'
        }, {
          name: '项目5'
        }, {
          name: '项目6'
        }, {
          name: '项目7'
        }
      ],
      tabindex: 0,
      optionpie: [],
      bardata: {
        datax: ['2023年', '2024年', '2025年'],
        datay: ['50', '80', '100'],
        maxdata: [0, 0, 0],//最大值,保持与数据个数一致
      },
    }
  },
  mounted() {
    this.getTest()
  },
  methods: {
    openClick(item) {
      console.log("item====", item);
      openCosmicListPage(item.formId, item.openType, {});
      //NumberOfRentalCustomersOpen(item)
    },
    getTest() {
      // 查询驾驶舱项目展示
      getUnconditionalData("get_project_presentation").then(data => {
        if (data.code == 200) {
          this.demolist = data.data

        }
      })
      // 查询资产总数
      getUnconditionalData("get_asset_count").then(data => {
        if (data.code == 200) {
          this.titlelist[0].num = data.data.cnt != null ? +(+data.data.cnt / 10000).toFixed(2) : 0
        }
      })
      // 在租客户数
      getUnconditionalData("get_ht_soe_customer").then(data => {
        if (data.code == 200) {
          this.titlelist[1].num = data.data.total != null ? data.data.total : 0
        }
      })
      // 在租合同总数
      getUnconditionalData("get_ht_soe_total").then(data => {
        if (data.code == 200) {
          this.titlelist[2].num = data.data.total != null ? data.data.total : 0
        }
      })
      // 查询合同到期数
      getUnconditionalData("get_ht_soe_become_due").then(data => {
        if (data.code == 200) {
          this.titlelist[3].num = data.data.total != null ? data.data.total : 0
        }
      })
      // 欠租金额
      getUnconditionalData("get_rent_arrears").then(data => {
        if (data.code == 200) {
          this.titlelist[4].num = data.data.total != null ? (data.data.total / 10000).toFixed(2) : 0
        }
      })
      // 对接意向客户数量
      getUnconditionalData("get_investment_date").then(data => {
        if (data.code == 200) {
          let list = []
          for (let index = 0; index < 12; index++) {
            list[index] = 0
            for (let n in data.data) {
              let money = data.data[n].month
              if (money == index + 1) {
                list[index] = +data.data[n].total
              }
            }
          }
          this.linedata.datay = list
          this.init()
        }
      })
      // 获取客户来源
      getUnconditionalData("get_new_continue_ht").then(data => {
        let ids = []
        if (data.code == 200) {
          for (let index in data.data) {
            ids.push(data.data[index].id)
          }
          let idString = ""
          idString += ids.flatMap(item => item)
          request({
            url: `/kapi/v2/cqkd/cqkd_assets/commonIntApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
            method: 'post',
            data: {
              "int_code": "get_customer_source",
              "filter": {
                "fid": idString
              }
            }
          }).then(data => {
            let list = []
            for (let index in data.data) {
              let objectDemo = {
                name: 'A类客户',//名称
                value: 80,//值
                itemStyle: {//颜色
                  color: '#18C8FF',
                }
              }
              let name = data.data[index].name
              /*if (name == "cqkd_related_org") {
                name = "关联单位"
              } else if (name == "cqkd_cus_src_agent") {
                name = "中介"
              } else if (name == "cqkd_cus_src_self") {
                name = "自主招商"
              } else if (name == "cqkd_cus_src_other") {
                name = "其他"
              } else if (name == "bos_org") {
                name = "部门推荐"
              } else if (name == "") {
                name = "待维护"
              }*/
              if (name === "A") {
                name = "职能部门推荐";
              } else if (name === "B") {
                name = "中介推荐";
              } else if (name === "C") {
                name = "自主招商";
              } else if (name === "D") {
                name = "关联单位";
              } else if (name === "E") {
                name = "其他";
              } else if (name === "F") {
                name = "公开招租";
              } else if (name === "G") {
                name = "移交客户";
              } else {
                name = "待维护"
              }
              objectDemo.name = name
              objectDemo.value = +data.data[index].total
              objectDemo.itemStyle.color = index <= 6 ? this.colorList[index] : '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
              list.push(objectDemo)
            }
            //数据排序
            console.log("客户来源数据：", list);
            let newList = list.sort(function (a, b) {
              return b.value - a.value;
            });
            console.log("客户来源数据排序后：", newList);
            this.optionpie = newList
            this.initpie()
          })
        }
      })
      request({
        url: `/kapi/v2/cqkd/cqkd_assets/getNearYearTotalIncomeCompose?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post'
      }).then(data => {
        console.log("近3年：", data);
        let y = []
        let num = []
        for (const index in data.data) {
          const row = data.data[index];
          const year = row.year;
          let money = row.total;
          if (year === 2023) {
            //数据特殊处理：需要减去2023年数据减去18240万元再进行展示，展示数据22909
            const subMoney = 182400000;
            if (money > subMoney) {
              money = money - subMoney;
            }
          }
          y.push(year + "年")
          num.push((money / 10000).toFixed(2))
        }
        this.bardata.datax = y
        this.bardata.datay = num
        // this.bardata.maxdata =
        this.initbar()
      })
    },
    init() {
      let line_Chart = this.$echarts.init(document.getElementById('line'));
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '4%',
          right: '2%',
          bottom: '0',
          top: '16%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.linedata.datax,
            axisLabel: {
              textStyle: {
                color: "#FFFFFF",
              }
            },
            axisTick: {
              show: false,
            },
          },

        ],
        yAxis: [
          {
            type: 'value',
            // 网格
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgb(174, 193, 232, 0.25)',
                type: 'dashed' // 设置分割线为虚线
              }
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 2,
              color: '#6AF8EE',
            },
            showSymbol: false,
            areaStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(57,243,159,0.4)'
                },
                {
                  offset: 1,
                  color: 'rgb(57,243,159,0)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: this.linedata.datay
          },
        ]
      };

      option && line_Chart.setOption(option);
    },
    initpie() {
      let pie_Chart = this.$echarts.init(document.getElementById('pie'));
      let seriesData = this.optionpie.map((item, index) => {
        return {
          ...item,
          actValue: item.value,
          label: {
            show: false,
          },
        };
      });

      let option = this.getPie3D(seriesData, 0);// 可做为调整内环大小 0为实心圆饼图，大于0 小于1 为圆环
      option && pie_Chart.setOption(option);

    },
    initbar() {

      let bar_Chart = this.$echarts.init(document.getElementById('bar_money'));

      // 绘制左侧面
      const CubeLeft = this.$echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          // 会canvas的应该都能看得懂，shape是从custom传入的
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x, shape.y];
          const c1 = [shape.x - 14, shape.y - 14];
          const c2 = [xAxisPoint[0] - 14, xAxisPoint[1] - 14];
          const c3 = [xAxisPoint[0], xAxisPoint[1]];
          ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
        },
      });

      // 绘制右侧面
      const CubeRight = this.$echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x, shape.y];
          const c2 = [xAxisPoint[0], xAxisPoint[1]];
          const c3 = [xAxisPoint[0] + 16, xAxisPoint[1] - 8];
          const c4 = [shape.x + 16, shape.y - 8];
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
        },
      });
      // 绘制顶面
      const CubeTop = this.$echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x, shape.y];
          const c2 = [shape.x + 16, shape.y - 8];
          const c3 = [shape.x + 3, shape.y - 20];
          const c4 = [shape.x - 14, shape.y - 14];
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
        },
      });

      // 注册三个面图形
      this.$echarts.graphic.registerShape('CubeLeft', CubeLeft);
      this.$echarts.graphic.registerShape('CubeRight', CubeRight);
      this.$echarts.graphic.registerShape('CubeTop', CubeTop);
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '0',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.bardata.datax,
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#FFFFFF",
            }
          },
        },
        yAxis: {
          type: 'value',
          // 网格
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgb(174, 193, 232, 0.25)',
              type: 'dashed' // 设置分割线为虚线
            }
          },
          axisLabel: {
            //坐标轴字体颜色
            textStyle: {
              color: '#7E899A',
            },
          },
        },
        series: [
          /*{
            type: 'custom',
            renderItem: function (params, api) {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: 'group',
                children: [
                  {
                    type: 'CubeLeft',
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {

                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(0, 147, 221, 0.2)',


                        },
                        {
                          offset: 1,
                          color: 'rgba(0, 88, 255, 0.1)',

                        },
                      ]),
                    },
                  },
                  {
                    type: 'CubeRight',
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(0, 147, 221, 0.1)',


                        },
                        {
                          offset: 1,
                          color: 'rgba(0, 88, 255, 0.1)',


                        },
                      ]),
                    },
                  },
                  {
                    type: 'CubeTop',
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(143, 231, 255, 0.1)',


                        },
                        {
                          offset: 1,
                          color: 'rgba(0, 132, 255, 0.1)',
                        },
                      ]),
                    },
                  },
                ],
              };
            },
            data: this.bardata.maxdata,
          },*/
          {
            type: 'custom',
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              var color =
                  api.value(1) > 10000
                      ? 'red'
                      : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#5cc4eb',
                        },
                        {
                          offset: 0.8,
                          color: '#21658c',
                        },
                      ]);
              return {
                type: 'group',
                children: [
                  {
                    type: 'CubeLeft',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {

                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(2,138,215)',


                        },
                        {
                          offset: 1,
                          color: 'rgba(8,51,110)',

                        },
                      ]),
                    },
                  },
                  {
                    type: 'CubeRight',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(2,138,215)',


                        },
                        {
                          offset: 1,
                          color: 'rgba(8,51,110)',

                        },
                      ]),
                    },
                  },
                  {
                    type: 'CubeTop',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(0,137,230)',


                        },
                        {
                          offset: 1,
                          color: 'rgba(1,178,246)',

                        },
                      ]),
                    },
                  },
                ],
              };
            },

            data: this.bardata.datay,
          },
          /*{
            type: 'bar',
            itemStyle: {
              color: 'transparent',
            },
            data: this.bardata.maxdata,

          },*/
        ],
      };


      option && bar_Chart.setOption(option);

    },
    topages(item) {
      this.$router.push(`/HomeView?project=${item.id}&projectName=${item.name}`)
    },
    changetab(val) {
      this.tabindex = val
    },
    // 生成扇形的曲面参数方程，
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      const midRatio = (startRatio + endRatio) / 2;
      const startRadian = startRatio * Math.PI * 2;
      const endRadian = endRatio * Math.PI * 2;
      const midRadian = midRatio * Math.PI * 2;
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }
      k = typeof k !== 'undefined' ? k : 1 / 3;
      const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      // 鼠标滑过时外环放大大小
      const hoverRate = isHovered ? 1.05 : 1;
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },

        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },

        x: function (u, v) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y: function (u, v) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u);
          }
          return Math.sin(v) > 0 ? 60 : -1;
        },
      };
    },
    // 生成模拟 3D 饼图的配置项
    getPie3D(pieData, internalDiameterRatio) {
      const series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      const legendData = [];
      const k =
          typeof internalDiameterRatio !== 'undefined'
              ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
              : 1 / 3;
      for (let i = 0; i < pieData.length; i += 1) {
        sumValue += pieData[i].value;
        const seriesItem = {
          name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
          type: 'surface',
          parametric: true,
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k,
          },
        };
        if (typeof pieData[i].itemStyle !== 'undefined') {
          const {itemStyle} = pieData[i];
          typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
          typeof pieData[i].itemStyle.opacity !== 'undefined'
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null;

          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }
      for (let i = 0; i < series.length; i += 1) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = this.getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            true,
            false,
            k,
            10//在此处传入饼图初始高度h
        );
        startValue = endValue;
        legendData.push(series[i].name);
      }

      series.push({
        name: 'pie2d',
        type: 'pie',
        // label: {
        //     color: '#ffffff',
        //     opacity: 1,
        //     fontStyle: 'normal',
        //     fontSize: 12,
        //     fontFamily: 'Microsoft YaHei',
        //     formatter: (params) => {
        //         return `${params.data.name}\n${params.data.value}\n${((params.data.value / _.sumBy(pieData, 'value')) * 100).toFixed(2)}%`
        //     }
        // },
        // labelLine: {
        //     length: 60,
        // },
        startAngle: -30, //起始角度，支持范围[0, 360]。
        clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['40%', '60%'],
        center: ['50%', '50%'],
        data: pieData,
        itemStyle: {
          opacity: 0,
        },
      });


      // 准备待返回的配置项，把准备好的series 传入。
      const option = {
        title: {
          show: false,
        },
        legend: {
          show: false,
        },
        xAxis3D: {
          min: -1,
          max: 1,
        },
        yAxis3D: {
          min: -1,
          max: 1,
        },
        zAxis3D: {
          min: -1,
          max: 1,
        },
        grid3D: {
          show: false,
          top: '0',
          boxHeight: 1,//修改立体饼图的高度
          viewControl: {
            // 3d效果可以放大、旋转等，
            alpha: 30,//饼图翻转的程度
            beta: 30,
            rotateSensitivity: 1,
            zoomSensitivity: 0,
            panSensitivity: 0,
            autoRotate: false,//是否自动旋转
            distance: 300,//距离越小看到的饼图越大
          },

        },
        series,
      };
      return option;
    }

  }
};
</script>

<style lang="scss" scoped>
.flex_direction {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title_style {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;

  .title_style_item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 8px;
    background: rgba(0, 245, 255, 0.05);
    border: 1px solid rgba(0, 245, 255, 0.15);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 245, 255, 0.1);
      border-color: rgba(0, 245, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 245, 255, 0.2);
    }

    .img_style {
      width: 80px;
      height: 80px;
      filter: drop-shadow(0 0 8px rgba(0, 245, 255, 0.4));
    }

    .text {
      color: #FFFFFF;
      letter-spacing: 2px;

      :nth-child(1) {
        font-size: 18px;
        color: #B8C5D6;
      }

      :nth-child(2) {
        font-size: 24px;
        font-weight: 600;
        color: #00F5FF;
        text-shadow: 0 0 10px rgba(0, 245, 255, 0.6);
      }
    }
  }
}

#line {
  width: 100%;
  height: 200px;
  filter: drop-shadow(0 0 10px rgba(0, 245, 255, 0.2));
}

.flex_bottom {
  display: flex;
  justify-content: space-between;
  gap: 60px;

  .flex_left {
    width: 520px;
  }

  .flex_right {
    flex: 1;
  }
}

.tab_flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;

  .tab_item {
    width: 164px;
    height: 36px;
    line-height: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #AFB6C5;
    background: rgba(10, 40, 70, 0.4);
    border: 1px solid rgba(0, 245, 255, 0.2);
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 2px;
    transition: all 0.3s ease;

    &:hover {
      color: #00F5FF;
      border-color: rgba(0, 245, 255, 0.4);
      background: rgba(0, 245, 255, 0.1);
    }
  }

  .tab_item_active {
    width: 164px;
    height: 36px;
    line-height: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #00F5FF;
    background: rgba(0, 245, 255, 0.15);
    border: 1px solid #00F5FF;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 1px;
    box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
  }
}

.titlebg2 {
  width: 100%;
  height: 40px;
  background: url('@/assets/titlebg2.png') repeat;
  background-size: 100% 100%;
  overflow: hidden;

  .text {
    font-weight: 600;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 2px;
    margin-left: 40px;
    margin-top: 2px;
  }
}

.titlebg3 {
  width: 100%;
  height: 40px;
  background: url('@/assets/titlebg3.png') repeat;
  background-size: 100% 100%;
  overflow: hidden;

  .text {
    font-weight: 600;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 2px;
    margin-left: 40px;
    margin-top: 2px;
  }
}

.demo_style {
  flex: 1;
  position: relative;

  .demo_item {
    position: absolute;
    width: 159px;
    height: 68px;
    //background: url('@/assets/demobg.png') repeat;
    background: url('@/assets/dyn/dyn-point.webp') repeat;
    background-size: 100% 100%;
    font-weight: 600;
    font-size: 10px;
    color: #FFFFFF;
    text-shadow: 1px 1px 0px #031113;
    letter-spacing: 1px;
    cursor: pointer;

    span {
      position: absolute;
      top: 2px;
      left: 68px;
    }
  }

  .demo_item0 {
    top: 230px;
    left: 170px;
  }

  .demo_item1 {
    top: 230px;
    left: 320px;
  }

  .demo_item2 {
    top: 306px;
    left: 344px;
  }

  .demo_item3 {
    top: 196px;
    left: 544px;
  }

  .demo_item4 {
    top: 260px;
    left: 644px;
  }

  .demo_item5 {
    top: 188px;
    left: 688px;
  }

  .demo_item6 {
    top: 210px;
    left: 750px;
  }
}

.pie_flex {
  display: flex;
  align-items: center;
  justify-content: center;


  #pie {
    width: 200px;
    height: 200px;
    z-index: 99;
  }

  .pie_flex_list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;

    .pieText {
      display: flex;
      align-items: center;
      color: #FFFFFF;
      letter-spacing: 2px;
      margin: 10px 0;

      .dot {
        position: relative;
        width: 10px;
        height: 10px;

        .dot_big {
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          filter: blur(4px);
        }

        .dot_small {
          position: absolute;
          top: 1px;
          left: 1px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          z-index: 99;
        }
      }

      .pieTextname {
        font-size: 14px;
        margin: 0 30px 0 12px;
        color: #AAB1B6;
      }

      .pieTextnum {
        font-size: 14px;
        font-weight: 600;
      }

      .pieTextnums {
        font-size: 14px;
        font-weight: 600;
        color: #FFFFFF;

        span {
          font-weight: 400;

          margin-left: 4px;
          font-size: 12px;
          color: #B6CEF0;
        }
      }
    }
  }
}

#bar_money {
  width: 100%;
  height: 240px;
  margin-top: 14px;
  filter: drop-shadow(0 0 10px rgba(0, 245, 255, 0.2));
}

.piebg3 {
  width: 230px;
  height: 133px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>