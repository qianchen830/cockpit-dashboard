<template>
  <div>
    <TitleComponent>
      <!--      资产类型-->
      <el-tooltip placement="right-start" effect="light" class="tooltip-style">
        <div slot="content">非经营性资产：{{ nonOperationalBuildArea }}</div>
        <span>经营性资产类型</span>
      </el-tooltip>
    </TitleComponent>
    <div class="flex_style_pie">
      <div style="position: relative;">
        <div id="pieOne"></div>
        <img src="@/assets/pieonebg.png" alt="" class="pieonebg">
        <img src="@/assets/dyn/dyn-pie1.webp" alt="" class="pieonebg">
        <img src="@/assets/pieoneicon.png" alt="" class="pieoneicon">
      </div>
      <div class="right_text">
        <div v-for="(item, index) in optionOne" :key="index" class="pieText">
          <div class="dot">
            <div class="dot_big" :style="{ backgroundColor: item.itemStyle.color }"></div>
            <div class="dot_small" :style="{ backgroundColor: item.itemStyle.color }"></div>
          </div>

          <div class="pieTextname">{{ item.name }}</div>
          <div class="pieTextnum">{{ item.proportion + '%' }}</div>
        </div>
      </div>
    </div>
    <TitleComponent style="margin-top: 10px;">当年总收入及组成</TitleComponent>
    <div class="flex_money">
      <div style="margin-right: 16px;">总收入</div>
      <div v-for="(item, index) in [...money]" :key="index" class="numbg">{{ item }}</div>
      <div style="margin-left: 16px;">万元</div>
    </div>
    <div class="flex_style_pie">
      <div style="position: relative;">
        <div id="pieTwo"></div>
        <img src="@/assets/pietwobg.png" alt="" class="pietwobg">
        <img src="@/assets/dyn/dyn-pie2.webp" alt="" class="pietwobg">
      </div>
      <div class="right_text">
        <div v-for="(item, index) in optionTwo" :key="index" class="pieText">
          <div class="dot">
            <div class="dot_big" :style="{ backgroundColor: item.itemStyle.color }"></div>
            <div class="dot_small" :style="{ backgroundColor: item.itemStyle.color }"></div>
          </div>

          <div class="pieTextname" style="margin: 0 14px;">{{ item.name }}</div>
          <div class="pieTextnum">{{ item.value }}</div>
          <div class="pieTextnums">{{ item.proportion + '%' }}</div>
        </div>
      </div>
    </div>

    <TitleComponent style="margin-top: 70px;">当年出租面积分析</TitleComponent>
    <div class="areabg">
      <div v-for="(item, index) in areadata" :key="index" :class="'area' + index" @click="opClick(item)">
        <div class="areaname">{{ item.name }}</div>
        <div class="areanum">{{ item.num }}<span> m²</span></div>
      </div>
    </div>

  </div>
</template>

<script>
import {getPie3D, bindListen} from '@/views/largeSizeScreen/components/3DPie'
import request from '../../../../api/request'
import {getUnconditionalData} from '@/api';
import {openCosmicListPage} from "@/utils/openUtils";

export default {
  data() {
    return {
      optionOne: [],
      money: '2000',
      colorList: ["#84D6FB", "#F2F6FB", "#9BF179", "#F2A43A", "#3567F5", "#2455a4", "#41b7ac"],
      optionTwo: [
        {
          name: '办公租金',//名称
          value: 22,//值
          proportion: 22,//百分比
          itemStyle: {//颜色
            color: '#18C8FF'
          }
        }, {
          name: '合同收入',
          value: 4,
          proportion: 4,
          itemStyle: {
            color: '#1880FF',
          }
        }, {
          name: '商业收入',
          value: 8,
          proportion: 8,
          itemStyle: {
            color: '#FB9500'
          }
        }, {
          name: '住宅租金',
          value: 6,
          proportion: 6,
          itemStyle: {
            color: '#84FB67'
          }
        }, {
          name: '其他收入',
          value: 66,
          proportion: 66,
          itemStyle: {
            color: '#EEF4FF'
          }
        },
      ],
      areadata: [
        {
          name: '净增加面积',
          num: '56',
          openType: '1'
        },
        {
          name: '新增加面积',
          num: '12',
          openType: '2'
        },
        {
          name: '退租面积总数',
          num: '56',
          openType: '3'
        }
      ],
      //非经营性资产建筑面积
      nonOperationalBuildArea: 0,
    }
  },
  mounted() {
    this.getAssetsCalss();
    this.getArea();
    this.getTotal();
    this.getNonOperationalContent();
  },
  methods: {
    opClick(item) {
      openCosmicListPage("cqkd_release_contract", item.openType, {})
      //NumberOfRentalCustomersOpen(item)
    },
    getAssetsCalss() {
      getUnconditionalData("get_assets_class").then(data => {
        if (data.code == 200) {
          let list = []
          let total = 0
          for (const index in data.data) {
            total += +data.data[index].total
          }
          for (const key in data.data) {
            let value = +(+data.data[key].total / total * 100).toFixed(2);
            if (+key + 1 == data.data.length) {
              let total = 0
              for (const index in list) {
                total += +list[index].value
              }
              value = +(100 - total).toFixed(2)
            }
            let name = data.data[key].name
            /*if (name == "ZCFL-000001") {
              name = "商铺"
            } else if (name == "ZCFL-000002") {
              name = "住宅"
            } else if (name == "ZCFL-000003") {
              name = "公寓"
            } else if (name == "ZCFL-000004") {
              name = "写字楼"
            } else if (name == "ZCFL-000005") {
              name = "停车场"
            } else if (name == "ZCFL-000006") {
              name = "广告位"
            } else if (name == "ZCFL-001001") {
              name = "其他"
            }*/
            const itemStyle = {
              color: key <= 6 ? this.colorList[key] : '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
            }
            const result = {
              value: value,
              name: name,
              proportion: value,
              itemStyle: itemStyle
            }
            list.push(result)
          }
          this.optionOne = list
          this.init()
        }
      })
    },
    getTotal() {
      request({
        url: `/kapi/v2/cqkd/cqkd_assets/getCurYearTotalIncomeCompose?openApiSign=${process.env.VUE_APP_API_OPEN_SIGN}`,
        method: 'post',
      }).then(data => {
        if (data.code == 200) {
          this.money = (data.data.total / 10000).toFixed(0)
          let list = []
          for (const index in data.data.composeList) {
            let object = {
              name: '办公租金',//名称
              value: 22,//值
              proportion: 22,//百分比
              itemStyle: {//颜色
                color: index <= 6 ? this.colorList[index] : '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
              }
            }
            object.name = data.data.composeList[index].name
            let value = +(+data.data.composeList[index].amt / data.data.total * 100).toFixed(2)
            if (index + 1 == data.data.composeList.length) {
              let total = 0
              for (const index in list) {
                total += +list[index].value
              }
              value = 100 - total
            }
            object.value = +(+data.data.composeList[index].amt / 10000).toFixed(2)
            object.proportion = value
            list.push(object)
          }
          this.optionTwo = list
          let pieTwo_Chart = this.$echarts.init(document.getElementById('pieTwo'));
          pieTwo_Chart.setOption(
              getPie3D(this.optionTwo, 0.75)
          );
          bindListen(pieTwo_Chart, getPie3D(this.optionTwo, 0.75))
        }
      })
    },
    async getArea() {
      // 新租
      await getUnconditionalData("get_newly_leased_area").then(data => {
        if (data.code == 200) {
          this.areadata[1].num = data.data.total != null ? data.data.total : 0
        }
      })
      // 退租
      await getUnconditionalData("get_resignation_area").then(data => {
        if (data.code == 200) {
          this.areadata[2].num = data.data.total != null ? data.data.total : 0
        }
      })
      // 净增加
      this.areadata[0].num = +(this.areadata[1].num - this.areadata[2].num).toFixed(2)
    },
    init() {
      let pieOne_Chart = this.$echarts.init(document.getElementById('pieOne'));
      pieOne_Chart.setOption(
          getPie3D(this.optionOne, 0.85)
      );
      bindListen(pieOne_Chart, getPie3D(this.optionOne, 0.85))

      let pieTwo_Chart = this.$echarts.init(document.getElementById('pieTwo'));
      pieTwo_Chart.setOption(
          getPie3D(this.optionTwo, 0.75)
      );
      bindListen(pieTwo_Chart, getPie3D(this.optionTwo, 0.75))
    },
    /**
     * 获取非经营性资产建筑面积合计
     */
    getNonOperationalContent() {
      getUnconditionalData("get_assets_building_area").then(data => {
        if (data.code == 200) {
          let res = data.data;
          let total = res.total;
          this.nonOperationalBuildArea = total;
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
#pieOne {
  width: 190px;
  height: 190px;
  z-index: 99;
}

#pieTwo {
  width: 190px;
  height: 190px;
  z-index: 99;
}

.flex_style_pie {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 32px;
}

.pieonebg {
  position: absolute;
  top: 46px;
  left: 2px;
  width: 190px;
  height: 126px;
}

.pietwobg {
  position: absolute;
  top: 68%;
  left: 50%;
  width: 234px;
  height: 215px;
  transform: translate(-50%, -50%);

}

.pieoneicon {
  position: absolute;
  top: 52%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
}

.right_text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .pieText {
    display: flex;
    align-items: center;
    color: #FFFFFF;
    letter-spacing: 2px;

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
      font-size: 12px;
      font-weight: 600;
      color: #B6CEF0;
      margin-left: 8px;
    }
  }
}

.flex_money {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  color: #FFFFFF;
  letter-spacing: 2px;
  margin-top: 20px;

  .numbg {
    width: 38px;
    height: 40px;
    line-height: 40px;
    background: url('@/assets/smallbg.png') repeat;
    background-size: 100% 100%;
    text-align: center;
    margin: 0 1px;
    font-size: 28px;
    padding-left: 3px;
    box-sizing: border-box;
  }
}

.areabg {
  width: 330px;
  height: 238px;
  background: url('@/assets/areabg.png') repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
  color: #FFFFFF;
  font-weight: 600;
  letter-spacing: 1px;

  .areaname {
    font-size: 18px;
  }

  .areanum {
    font-size: 26px;
    font-weight: 500;

    span {
      font-size: 16px;
    }
  }

  .area0 {
    position: absolute;
    top: 34px;
    left: 0;
    cursor: pointer;
  }

  .area1 {
    position: absolute;
    top: 30px;
    right: 0;
    cursor: pointer;
  }

  .area2 {
    position: absolute;
    bottom: 0px;
    left: 110px;
    cursor: pointer;
  }
}

</style>