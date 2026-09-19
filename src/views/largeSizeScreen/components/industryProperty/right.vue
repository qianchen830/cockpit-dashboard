<template>
  <div>
    <TitleComponent>年租金、租赁面积top5</TitleComponent>
    <div class="tab_flex">
      <div :class="tabdefault == 0 ? 'tab_item_active' : 'tab_item'" @click="changetab(0)">年租金</div>
      <div :class="tabdefault == 1 ? 'tab_item_active' : 'tab_item'" @click="changetab(1)">租赁面积</div>
    </div>

    <div v-if="tabdefault == 0" style="position: relative;overflow: hidden;">
      <div class="top_item" :class="'top_item' + index" v-for="(item, index) in toplist" :key="index">
        <el-tooltip placement="left" disabled>
          <div slot="content" style="line-height: 1.5;">
            合同编码：{{ customerRankingDetails[index].name }}<br/>
            合同名称：{{ customerRankingDetails[index].number }}<br/>
            客户：{{ customerRankingDetails[index].customer }}<br/>
            租赁状态：{{ customerRankingDetails[index].state }}
          </div>
          <div class="top_item_name">
            <div>TOP{{ index + 1 }}</div>
            <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.name }}</div>
            <div>{{ (item.num / 10000).toFixed(2) }}万</div>
          </div>
        </el-tooltip>
        <div :class="'top_item_bg' + index"></div>
      </div>
      <img src="@/assets/topimg.png" alt="" class="topimg_style">
    </div>

    <div v-if="tabdefault == 1" style="position: relative;overflow: hidden;">
      <div class="top_item" :class="'top_item' + index" v-for="(item, index) in toplist" :key="index">
        <el-tooltip placement="left" disabled>
          <div slot="content" style="line-height: 1.5;">
            合同编码：{{ customerRankingDetails[index].name }}<br/>
            合同名称：{{ customerRankingDetails[index].number }}<br/>
            客户：{{ customerRankingDetails[index].customer }}<br/>
            租赁状态：{{ customerRankingDetails[index].state }}<br/>
            租赁面积：{{ customerRankingDetails[index].m }}m²
          </div>
          <div class="top_item_name">
            <div>TOP{{ index + 1 }}</div>
            <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.name }}</div>
            <div>{{ item.num }}m²</div>
          </div>
        </el-tooltip>
        <div :class="'top_item_bg' + index"></div>
      </div>
      <img src="@/assets/topimg.png" alt="" class="topimg_style">
    </div>

    <TitleComponent style="margin-top: 28px;">租金收入同比/万</TitleComponent>
    <div class="tab_flex">
      <div :class="tablinedefault == 0 ? 'tab_item_active' : 'tab_item'" @click="changetabline(0)">应收同比</div>
      <div :class="tablinedefault == 1 ? 'tab_item_active' : 'tab_item'" @click="changetabline(1)">实收同比</div>
    </div>

    <div id="bar"></div>
    <TitleComponent style="margin-top: 20px;">内部质效分析
      <span class="cus-input">
                <el-select v-model="projectObject" placeholder="请选择项目">
                    <el-option v-for="item in projectList" :key="item.fid" :label="item.fname" :value="item.fid">
                    </el-option>
                </el-select>
            </span>
    </TitleComponent>
    <div class="demo_name">
      {{ projectName }}
    </div>

    <div class="demo_flex">
      <img src="@/assets/arrowsleft.png" alt="" class="arrowsimg" @click="next(0)">
      <div class="demobg">
        <div>
          <div v-for="(item, index) in demolist.slice(0, 2)" :key="index" class="demo_item">
            <div>{{ item.name }}</div>
            <div style="display: flex;flex-direction: row;">
              <div class="demo_num">{{ item.value }}</div>
              <img v-if="index > 0 && !imgStateTwo" src="@/assets/redarrows.png" alt="" class="redarrow">
              <img v-if="index > 0 && imgStateTwo" src="@/assets/rise.png" alt="" class="redarrowTwo"
                   style="width: 16px;height: 16px;transform: rotateX(180deg);">
            </div>
          </div>
        </div>
        <div>
          <div v-for="(item, index) in demolist.slice(2, 4)" :key="index" class="demo_item">
            <div>{{ item.name }}</div>
            <div class="demo_num">
                            <span>
                                {{ item.value }}
                            </span>
              <img v-if="index > 0 && !imgState" src="@/assets/redarrows.png" alt="" class="redarrow">
              <img v-if="index > 0 && imgState" src="@/assets/rise.png" alt="" class="redarrowTwo">
            </div>
          </div>
        </div>
      </div>
      <img src="@/assets/arrowsright.png" alt="" class="arrowsimg" @click="next(1)">

    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'; //引入echarts 绘图工具
import {getUnconditionalData} from '@/api';
import request from '../../../../api/request'

export default {
  data() {
    return {
      tabdefault: 0,
      tablinedefault: 0,
      test: true,
      projectObject: "",
      projectName: "",
      imgState: false,
      imgStateTwo: false,
      colorList: ["#84D6FB", "#F2F6FB", "#9BF179", "#F2A43A", "#3567F5", "#2455a4", "#41b7ac"],
      number: 0,
      option: [['product', '去年', '今年'],
        ['1月', 50, 60],
        ['4月', 60, 70],
        ['6月', 70, 80],
        ['8月', 80, 90],
        ['10月', 90, 100],
        ['12月', 100, 110],],
      customerRankingDetails: [
        {
          number: null,
          name: null,
          customer: null,
          state: null,
          m: null
        },
        {
          number: null,
          name: null,
          customer: null,
          state: null,
          m: null
        }, {
          number: null,
          name: null,
          customer: null,
          state: null,
          m: null
        }, {
          number: null,
          name: null,
          customer: null,
          state: null,
          m: null
        }, {
          number: null,
          name: null,
          customer: null,
          state: null,
          m: null
        }],
      toplist: [
        {
          name: '双鸭山市鸿城矿业有限公司',
          num: '120',
        },
        {
          name: '双鸭山市鸿城公司',
          num: '120',
        }, {
          name: '双鸭山市鸿城公司',
          num: '120',
        }, {
          name: '双鸭山市鸿城公司',
          num: '120',
        }, {
          name: '双鸭山市鸿城公司',
          num: '120',
        }
      ],
      demolist: [
        {
          name: '租金单价',
          value: '0元/m²',
        },
        {
          name: '本项目平均租金单价',
          value: '0元/m²',
        },
        {
          name: '出租率',
          value: '0%',
        },
        {
          name: '本项目平均出租率',
          value: '0%',
          imgurl: false,
        }
      ],
      projectList: [],
      externalProject: [],
      oneValue: 0,
      twoValue: 0,
      threeValue: 0,
      fourValue: 0
    }
  },
  mounted() {
    this.get_customer_ranking()
    this.getYearReceivableCompare()
    this.getProject()
  },
  watch: {
    async projectObject(one, two) {
      this.number = 0;
      console.log("项目列表", this.projectList);
      await request({
        url: `/kapi/v2/cqkd/cqkd_assets/getInnerQualityAnalysis?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
        data: {
          "proId": one
        }
      }).then(data => {
        //判断如果是企业天地、复星国际则写死租金单价
        let rentalPrice = data.data.rentalPrice;
        if (this.projectList) {
          let matchProInfo = this.projectList.filter(x => x.fid === one);
          console.log("项目信息：", matchProInfo);
          if (matchProInfo) {
            const proInfo = matchProInfo[0];
            const proName = proInfo.fname;
            if (proName === "企业天地") {
              rentalPrice = 65.28;
            } else if (proName === "复星国际中心") {
              rentalPrice = 67.81;
            }
          }
        }

        this.demolist[1].value = rentalPrice + "元/m²"
        this.demolist[3].value = +(+data.data.rentRate * 100).toFixed(2) + "%"
        this.oneValue = data.data.rentRate
        this.threeValue = +data.data.rentalPrice
      })
      await getUnconditionalData("get_external").then(data => {
        this.externalProject = data.data;
        if (this.externalProject && this.externalProject.length > 0) {
          this.demolist[0].name = data.data[0].qname + "租金单价"
          this.demolist[0].value = +data.data[0].jprice + "元/m²"
          this.demolist[2].name = data.data[0].qname + "出租率"
          this.demolist[2].value = +(+data.data[0].qlv * 100).toFixed(2) + "%"
          this.twoValue = data.data[0].qlv
          this.fourValue = +data.data[0].jprice
        }
      });
      this.imgState = +this.oneValue > +this.twoValue
      this.imgStateTwo = +this.threeValue > +this.fourValue;
      //console.log("projectList===",this.projectList);
      for (const index in this.projectList) {
        if (this.projectList[index].fid === one) {
          this.projectName = this.projectList[index].fname
        }
      }
      //特殊处理=不同项目默认展示哪个外部数据
      console.log("当前项目名称：", this.projectName);
      console.log("当前项目ID：", one);
      //默认企业天地展示大石化片区，复星国际展示解放碑片区
      /*if (this.externalProject && this.externalProject.length > 0) {
        if (this.projectName === "企业天地" || this.projectName === "复星国际中心") {
          let defaultQName = "大石化片区";
          if (this.projectName === "企业天地") {
            defaultQName = "大石化片区";
          } else if (this.projectName === "复星国际中心") {
            defaultQName = "解放碑片区";
            //defaultQName = "江北片区";
          }
          //判断是否存在大石化片区
          let curIndex = -1;
          let newExternalProject = this.externalProject.filter((item, index, array) => {
            if (item.qname === defaultQName) {
              if (curIndex === -1) {
                curIndex = index;
              }
              return item;
            }
          });
          if (newExternalProject && newExternalProject.length > 0) {
            const defaultData = newExternalProject[0];
            this.demolist[0].name = defaultData.qname + "租金单价"
            this.demolist[0].value = +defaultData.jprice + "元/m²"
            this.demolist[2].name = defaultData.qname + "出租率"
            this.demolist[2].value = +(+defaultData.qlv * 100).toFixed(2) + "%"
            this.twoValue = defaultData.qlv
            this.fourValue = +defaultData.jprice
            this.number = curIndex;
          }
          console.log("this.externalProject：", this.externalProject);
          console.log("this.newExternalProject：", newExternalProject);
          console.log("this.curIndex：", curIndex);
        }
      }*/
      //2025-07-15增加内部质效分析关联项目
      console.log("this.externalProject:", this.externalProject);
      let curIndex = -1;
      let newExternalProject = this.externalProject.filter((item, index, array) => {
        let baseDataIds = item.baseDataIds;
        if (baseDataIds && baseDataIds.indexOf(one) !== -1) {
          if (curIndex === -1) {
            curIndex = index;
          }
          return item;
        }
      });
      if (newExternalProject && newExternalProject.length > 0) {
        const defaultData = newExternalProject[0];
        this.demolist[0].name = defaultData.qname + "租金单价"
        this.demolist[0].value = +defaultData.jprice + "元/m²"
        this.demolist[2].name = defaultData.qname + "出租率"
        this.demolist[2].value = +(+defaultData.qlv * 100).toFixed(2) + "%"
        this.twoValue = defaultData.qlv
        this.fourValue = +defaultData.jprice
        this.number = curIndex;
      }
      console.log("this.externalProject：", this.externalProject);
      console.log("this.newExternalProject：", newExternalProject);
      console.log("this.curIndex：", curIndex);
    }
  },
  methods: {
    next(item) {
      console.log("this.number：", this.number);
      if (!this.externalProject || this.externalProject.length === 0) {
        return;
      }
      if (item === 1) {
        //向右
        this.number += 1
        if (this.number === this.externalProject.length) {
          this.number = 0
        }
        this.demolist[0].name = this.externalProject[this.number].qname + "租金单价"
        this.demolist[0].value = +this.externalProject[this.number].jprice + "元/m²"
        this.demolist[2].name = this.externalProject[this.number].qname + "出租率"
        this.demolist[2].value = +(+this.externalProject[this.number].qlv * 100).toFixed(2) + "%"
        this.oneValue = +this.externalProject[this.number].qlv
        this.imgState = +this.oneValue <= +this.twoValue
        this.threeValue = +this.externalProject[this.number].jprice
        this.imgStateTwo = this.threeValue <= this.fourValue
      } else {
        //向左
        this.number -= 1
        if (this.number < 0) {
          this.number = +this.externalProject.length - 1
        }
        this.demolist[0].name = this.externalProject[this.number].qname + "租金单价"
        this.demolist[0].value = +this.externalProject[this.number].jprice + "元/m²"
        this.demolist[2].name = this.externalProject[this.number].qname + "出租率"
        this.demolist[2].value = +(+this.externalProject[this.number].qlv * 100).toFixed(2) + "%"
        this.oneValue = +this.externalProject[this.number].qlv
        this.imgState = +this.oneValue <= +this.twoValue
        this.threeValue = +this.externalProject[this.number].jprice
        this.imgStateTwo = this.threeValue <= this.fourValue
      }
    },
    clickProject(item) {
      console.log(item);
    },
    getProject() {
      getUnconditionalData("get_project").then(data => {
        if (data.code == 200) {
          this.projectList = data.data
          for (let index in data.data) {
            if (data.data[index].fname == "企业天地") {
              this.projectObject = data.data[index].fid
            }
          }
        }
      })
    },
    // 应收
    getYearReceivableCompare() {
      request({
        url: `/kapi/v2/cqkd/cqkd_assets/getYearReceivableCompare?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
      }).then(data => {
        let listTotal = [['product', '今年', '去年']]
        for (const index in data.data) {
          let list = []
          list.push(data.data[index].month + "月")
          list.push(+(+data.data[index].curTotal / 10000).toFixed(2))
          list.push(+(+data.data[index].lastTotal / 10000).toFixed(2))
          listTotal.push(list)
        }
        this.option = listTotal
        this.init()
      })
    },
    // 实收
    getYearReceiptsCompare() {
      request({
        url: `/kapi/v2/cqkd/cqkd_assets/getYearReceiptsCompare?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
      }).then(data => {
        let listTotal = [['product', '今年', '去年']]
        for (const index in data.data) {
          let list = []
          list.push(data.data[index].month + "月")
          list.push(+(+data.data[index].curTotal / 10000).toFixed(2))
          list.push(+(+data.data[index].lastTotal / 10000).toFixed(2))
          listTotal.push(list)
        }
        this.option = listTotal
        this.init()
      })
    },
    // 租金TOP 5 年租金 详细信息
    get_customer_ranking() {
      getUnconditionalData("get_customer_ranking").then(data => {
        if (data.code == 200) {
          this.toplist = data.data
          /*for (let index in data.data) {
              request({
                  url: `/kapi/v2/cqkd/cqkd_assets/commonIntApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
                  method: 'post',
                  data: {
                      "int_code": "get_customer_ranking_details",
                      "filter": {
                          "fid": data.data[index].fid
                      }
                  }
              }).then(data => {
                  this.customerRankingDetails[index].name = data.data.name
                  this.customerRankingDetails[index].number = data.data.number
                  this.customerRankingDetails[index].customer = data.data.customer
                  let state = "";
                  if (data.data.state == 0) {
                      state = "新租"
                  } else if (data.data.state == 1) {
                      state = "续租"
                  } else if (data.data.state == 2) {
                      state = "已续租"
                  } else if (data.data.state == 3) {
                      state = "已退租"
                  } else if (data.data.state == 4) {
                      state = "退租中"
                  } else if (data.data.state == 5) {
                      state = "续租中"
                  } else if (data.data.state == 6) {
                      state = "变更中"
                  } else if (data.data.state == 7) {
                      state = "已变更"
                  }
                  this.customerRankingDetails[index].state = state
              })
          }*/
        }
      })
    },
    get_rental_area() {
      getUnconditionalData("get_rental_area").then(data => {
        if (data.code == 200) {
          this.toplist = data.data
          /*for (let index in data.data) {
              request({
                  url: `/kapi/v2/cqkd/cqkd_assets/commonIntApi?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
                  method: 'post',
                  data: {
                      "int_code": "get_customer_ranking_details",
                      "filter": {
                          "fid": data.data[index].fid
                      }
                  }
              }).then(data => {
                  this.customerRankingDetails[index].name = data.data.name
                  this.customerRankingDetails[index].number = data.data.number
                  this.customerRankingDetails[index].customer = data.data.customer
                  this.customerRankingDetails[index].m = this.toplist[index].num
                  let state = "";
                  if (data.data.state == 0) {
                      state = "新租"
                  } else if (data.data.state == 1) {
                      state = "续租"
                  } else if (data.data.state == 2) {
                      state = "已续租"
                  } else if (data.data.state == 3) {
                      state = "已退租"
                  } else if (data.data.state == 4) {
                      state = "退租中"
                  } else if (data.data.state == 5) {
                      state = "续租中"
                  } else if (data.data.state == 6) {
                      state = "变更中"
                  } else if (data.data.state == 7) {
                      state = "已变更"
                  }
                  this.customerRankingDetails[index].state = state
              })
          }*/
        }
      })
    },
    changetab(val) {
      this.tabdefault = val
      if (val == 0) {
        this.get_customer_ranking()
      } else {
        this.get_rental_area()
      }
    },
    changetabline(val) {
      this.tablinedefault = val
      if (val == 0) {
        this.getYearReceivableCompare()
      } else {
        this.getYearReceiptsCompare()
      }
    },
    init() {
      let bar_Chart = this.$echarts.init(document.getElementById('bar'));
      let option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(9, 18, 32, 0.92)',
          borderColor: 'rgba(0, 245, 255, 0.35)',
          borderWidth: 1,
          textStyle: { color: '#fff' },
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(0, 245, 255, 0.6)',
              type: 'dashed'
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
        dataset: {
          source: this.option
        },
        xAxis: {
          type: 'category', axisLabel: {
            textStyle: {
              color: "#B6CEF0",
            }
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          // 网格
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgb(174, 193, 232, 0.25)',
              type: 'dashed' // 设置分割线为虚线
            }
          }
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(0, 245, 255, 1)'},
                {offset: 1, color: 'rgba(0, 148, 255, 0.20)'},
              ]),
              borderRadius: [4, 4, 4, 4],
              shadowBlur: 6,
              shadowColor: 'rgba(0, 245, 255, 0.4)'
            },
            barWidth: 8

          },
          {
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(78, 205, 196, 1)'},
                {offset: 1, color: 'rgba(1, 222, 182, 0.20)'},
              ]),
              borderRadius: [4, 4, 4, 4]
            },
            barWidth: 8
          }
        ]
      };

      option && bar_Chart.setOption(option);

    }
  }
};
</script>

<style lang="scss" scoped>
.cus-input {
  width: 100px;
  display: inline-block;
  margin-left: 110px;

  ::v-deep input {
    background-color: #13293d !important;
  }

}

.tab_flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  .tab_item {
    width: 164px;
    height: 36px;
    line-height: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #AFB6C5;
    background: url('@/assets/tabbg.png') repeat;
    background-size: 100% 100%;
    cursor: pointer;
    letter-spacing: 2px;
  }

  .tab_item_active {
    width: 164px;
    height: 36px;
    line-height: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
    background: url('@/assets/tabbgs.png') repeat;
    background-size: 100% 100%;
    cursor: pointer;
    letter-spacing: 1px;

  }
}

.top_item {
  color: #FFFFFF;
  font-size: 14px;
  margin-top: 24px;
  margin-left: auto;

  .top_item_name {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 2px;

    :nth-child(1) {
      font-weight: 600;
      margin-right: 10px;
      margin-left: 10px;
      letter-spacing: 1px;
    }

    :nth-child(2) {
      flex: 1;
    }

  }

  .top_item_bg0 {
    width: 100%;
    height: 6px;
    background: url('@/assets/topbg.png') repeat;
    background-size: 100% 100%;
    margin-left: auto;

  }

  .top_item_bg1 {
    width: 100%;
    height: 6px;
    background: url('@/assets/topbg1.png') repeat;
    background-size: 100% 100%;
  }

  .top_item_bg2 {
    width: 100%;
    height: 6px;
    background: url('@/assets/topbg2.png') repeat;
    background-size: 100% 100%;
  }

  .top_item_bg3 {
    width: 100%;
    height: 6px;
    background: url('@/assets/topbg3.png') repeat;
    background-size: 100% 100%;
  }

  .top_item_bg4 {
    width: 100%;
    height: 6px;
    background: url('@/assets/topbg3.png') repeat;
    background-size: 100% 100%;
  }
}

.top_item0 {
  width: 338px;
}

.top_item1 {
  width: 305px;
}

.top_item2 {
  width: 255px;
}

.top_item3 {
  width: 240px;
}

.top_item4 {
  width: 240px;
}

// Add glow effects for TOP items
:deep(.top_item) {
  transition: all 0.3s ease;
  &:hover {
    transform: translateX(4px);
    filter: drop-shadow(0 0 8px rgba(0, 245, 255, 0.4));
  }
}

.topimg_style {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 150px;
  height: 144px;
}

#bar {
  width: 405px;
  height: 180px;
  filter: drop-shadow(0 0 8px rgba(0, 245, 255, 0.2));
}

.demo_name {
  font-weight: 600;
  font-size: 18px;
  color: #00F5FF;
  margin-top: 2px;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.6);
  letter-spacing: 2px;
}

.demo_flex {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .demobg {
    width: 317px;
    height: 227px;
    background: url('@/assets/dyn/dyn-qushi.webp') repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(0, 245, 255, 0.2);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);

    .demo_item {
      font-size: 14px;
      text-align: center;
      margin-top: 24px;
      letter-spacing: 1px;
      padding: 8px;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(0, 245, 255, 0.1);
      }

      :nth-child(1) {
        color: #B6CEF0;
      }

      .demo_num {
        color: #00F5FF;
        margin-top: 4px;
        font-weight: 600;
        text-shadow: 0 0 8px rgba(0, 245, 255, 0.6);

        span {
          color: #FFFFFF;
        }

        .redarrow {
          width: 16px;
          height: 16px;
        }

        .redarrowTwo {
          width: 16px;
          height: 16px;
          transform: rotateX(180deg);
        }
      }
    }
  }

  .arrowsimg {
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: all 0.3s ease;
    filter: drop-shadow(0 0 4px rgba(0, 245, 255, 0.4));
    
    &:hover {
      transform: scale(1.1);
      filter: drop-shadow(0 0 8px rgba(0, 245, 255, 0.6));
    }
  }
}
</style>