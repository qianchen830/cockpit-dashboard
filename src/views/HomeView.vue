<template>
  <div class="page main">
    <!-------------------------------------    搜索区域      --------------------------------------->
    <div class="query">
      <div class="home-btn" @click="toHomePage()"></div>
      <el-select v-model="companyValue" filterable popper-class="index_query-theme-popper_wOt1e"
                 placeholder="请选择公司"
                 @change="changeSelect('street')" clearable>
        <el-option v-for="item in companyOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="streetValue" filterable popper-class="index_query-theme-popper_wOt1e" placeholder="街道"
                 @change="changeSelect('street')" clearable>
        <el-option v-for="item in streetOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="itemValue" filterable popper-class="index_query-theme-popper_wOt1e" placeholder="项目"
                 @change="changeSelect('street')" :disabled="streetValue.length === 0" clearable>
        <el-option v-for="item in itemOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <!------资产状态------->
      <el-select v-model="zcStatusValue" popper-class="index_query-theme-popper_wOt1e" placeholder="资产状态"
                 @change="changeSelect('street')" multiple>
        <el-option v-for="item in zcStatusOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <!------资产用途------->
      <el-select v-model="natureValue" popper-class="index_query-theme-popper_wOt1e" placeholder="资产用途"
                 @change="changeSelect('street')" multiple>
        <el-option v-for="item in natureOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <!------面积------->
      <!--      <el-select v-model="areaValue" popper-class="index_query-theme-popper_wOt1e" placeholder="面积"
                       @change="changeSelect('street')" clearable>
              <el-option v-for="item in areaOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>-->
      <!------价位------->
      <!--      <el-select v-model="priceValue" popper-class="index_query-theme-popper_wOt1e" placeholder="价位"
                       @change="changeSelect('street')" clearable>
              <el-option v-for="item in priceOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>-->
      <!------资产经济性质------->
      <el-select v-model="ecoNatureValue" popper-class="index_query-theme-popper_wOt1e" placeholder="经营性质"
                 @change="changeSelect('street')" clearable>
        <el-option v-for="item in ecoNatureOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <!------价位------->
      <el-select v-model="evaluatePriceValue" popper-class="index_query-theme-popper_wOt1e" placeholder="评估单价"
                 @change="changeSelect('street')" clearable>
        <el-option v-for="item in evaluatePriceOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>


      <div class="space"></div>
      <div class="search">
        <el-input v-model="address" placeholder="地址搜索" @change="changeSelect('street')" clearable></el-input>
      </div>
    </div>
    <!-------------------------------------    百度地图      --------------------------------------->
    <el-dialog :visible.sync="panorama" style="margin-top: -100px" width="90%" append-to-body :title="infoWindow.title"
               :destroy-on-close="false">
      <div id="panorama" style="width: 100%; height: 700px"></div>
    </el-dialog>
    <baidu-map class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" @ready="initMap">
      <!-- 全景图标
      <bm-panorama
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :offset="{ width: 25, height: 230 }"
      ></bm-panorama>
      -->
      <!-- 缩放控件 -->
      <!--      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>-->

      <!-- 资产信息弹窗 -->
      <bm-info-window :title="infoWindow.title" :position="infoWindow.position" :show="infoWindow.show"
                      @close="infoWindowClose()">
        <div style="color: #fff; font-size: 16px;width: 720px;height: 400px;">
          <div style="
              margin-top: 5px;
              height: 2px;
              width: 100%;
              background-color: #1981e1 !important;
            "></div>
          <div class="asset-container">
            <div class="asset-info" v-if="infoWindow.makerType==='aseet'">
              <div style="margin-top: 10px; font-size: 18px">
                资产用途：{{ infoWindow.assetStructureName }}
              </div>
              <div style="margin-top: 10px; font-size: 18px">
                资产状态：{{ infoWindow.status }}
              </div>
              <div style="margin-top: 10px; font-size: 18px">
                建筑面积：{{ infoWindow.area }}㎡
              </div>
              <div style="margin-top: 10px; font-size: 18px">
                租金单价：{{ infoWindow.price | funit }}
              </div>
              <div style="margin-top: 10px; font-size: 18px">
                年租金收入：{{ infoWindow.yearRentAmt | funit }}
              </div>
              <div style="margin-top: 10px; font-size: 18px" v-show="infoWindow.isBulkAsset">
                税收收入：{{ infoWindow.bulkAssetAmt | funit }}
              </div>
              <div style="margin-top: 10px; font-size: 18px">
                是否抵押：{{ infoWindow.mortgageStatus }}
              </div>
              <div style="margin-top: 10px; font-size: 18px">
                权证：{{ infoWindow.haveWarrant ? "有" : "无" }}
              </div>
              <div :class="infoWindow.address ? 'asset-address asset-address-box' : 'asset-address'"
                   :title="infoWindow.address">
                详细地址：{{ infoWindow.address }}
              </div>
              <!--                            <div class="asset-btn" @click="initPanorama(infoWindow.position)">
                                            查看全景
                                          </div>-->
              <div class="asset-btn" style="left: 35px; margin-left: 20px" @click="toDetailPage(infoWindow)">
                资产详情
              </div>
            </div>

            <div class="asset-info" v-if="infoWindow.makerType==='project'">
              <!--              <div style="margin-top: 10px; font-size: 18px">
                              商业总价值：{{ infoWindow.projectInfo.cqkd_syzjz }}
                            </div>-->
              <div style="margin-top: 10px; font-size: 18px">
                项目总价值：{{ infoWindow.projectInfo.bookValue }}万
              </div>
              <!--              <div style="margin-top: 10px; font-size: 18px">
                              项目总面积：{{ infoWindow.projectInfo.cqkd_xmzmj }}
                            </div>
                            <div style="margin-top: 10px; font-size: 18px">
                              商业总面积：{{ infoWindow.projectInfo.cqkd_syzmj }}
                            </div>
                            <div style="margin-top: 10px; font-size: 18px">
                              入驻人数：{{ infoWindow.projectInfo.cqkd_rzrs }}
                            </div>
                            <div style="margin-top: 10px; font-size: 18px">
                              周边单价：{{ infoWindow.projectInfo.cqkd_zbdj }}
                            </div>
                            <div style="margin-top: 10px; font-size: 18px">
                              住宅套数：{{ infoWindow.projectInfo.cqkd_zzts }}
                            </div>-->
              <div style="margin-top: 10px; font-size: 18px">

              </div>
              <div :class="infoWindow.projectInfo.cqkd_xmdz ? 'asset-address asset-address-box' : 'asset-address'"
                   :title="infoWindow.projectInfo.cqkd_xmdz">
                详细地址：{{ infoWindow.projectInfo.cqkd_xmdz }}
              </div>
              <!--                            <div class="asset-btn" @click="initPanorama(infoWindow.position)">
                                            查看全景
                                          </div>-->
              <div class="asset-btn" style="left: 35px; margin-left: 20px" @click="toDetailPage(infoWindow)">
                项目详情
              </div>
            </div>


            <div class="asset-image" style="width: 70%; height: 400px;" v-if="infoWindow.makerType==='aseet'">
              <img v-if="infoWindow.imageUrl"
                   :src="infoWindow.imageUrl" style="
                  width: 100%;
                  height: 100%;
                "/>
              <div v-else
                   style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 14px;">
                暂无图片
              </div>
            </div>

            <div class="asset-image" style="width: 70%; height: 400px;" v-if="infoWindow.makerType==='project'">
              <img v-if="infoWindow.projectInfo.imageAddress"
                   :src="infoWindow.projectInfo.imageAddress+'&'+infoWindow.projectInfo.accessToken" style="
                  width: 100%;
                  height: 100%;
                "/>
              <div v-else
                   style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 14px;">
                暂无图片
              </div>
            </div>


          </div>
        </div>
      </bm-info-window>
      <!--遍历行政区划-->
      <bm-boundary v-if="showmap" v-for="(item, index) in currentDistrict" :key="index" :name="item.name"
                   :strokeWeight="3" fill-opacity="0.1" stroke-style="dashed" :fillOpacity="0.2" :fillColor="item.color"
                   :clicking="true">
      </bm-boundary>
    </baidu-map>
    <!--左上角信息展示区-->
    <div class="data-view data-view mode-2 hasRight">
      <div class="data-view-left2-mini">
        <div class="drawer">
          <div>
            <div>
              <div class="block rent">
                <span class="title"><i class="iconfont icon-rent icon"></i>总面积
                </span>
                <div class="row align-center">
                  <span class="num">{{ leftTotalData.area | farea }}</span>
                </div>
                <span class="desc">面积(㎡)</span>
              </div>
            </div>
            <div>
              <div class="block rent">
                <span class="title"><i class="iconfont icon-unrent icon"></i>闲置面积
                </span>
                <div class="row align-center">
                  <span class="num">{{ leftTotalData.leaveArea | farea }}</span>
                </div>
                <span class="desc">面积(㎡)</span>
              </div>
            </div>
            <!--            <div>-->
            <!--              <div class="block collect">-->
            <!--                <span class="title"><i class="iconfont icon-yingyanditu icon"></i>实时资产数量-->
            <!--                </span>-->
            <!--                <div class="row align-center">-->
            <!--                  <span class="num" style="color: yellow">{{-->
            <!--                    leftTotalData.totalNums-->
            <!--                  }}</span>-->
            <!--                </div>-->
            <!--                <span class="desc">数量(个)</span>-->
            <!--              </div>-->
            <!--            </div>-->
            <div>
              <div class="block amount">
                <span class="title"><i class="iconfont icon-amount icon"></i>当年租赁收入
                </span>
                <div class="row align-center">
                  <span class="num" style="color: #f56c6c">{{
                      (leftTotalData.price / 10000) | fmoney
                    }}</span><span></span>
                </div>
                <span class="desc">收入(万元)</span>
              </div>
            </div>

            <div>
              <div class="block amount">
                <span class="title"><i class="iconfont icon-amount icon"></i>收入类型
                </span>
                <div class="graph-view" style="margin-top: 0; width: 250px; height: inherit;" ref="chart4">图表4</div>
              </div>
            </div>


          </div>
        </div>

        <!--        <div class="newbox">&ndash;&gt;-->
        <!--          <div class="newtitle">&ndash;&gt;-->
        <!--            <h4 style="margin-left: 10px">收入类型</h4>-->
        <!--          </div>-->
        <!--          <div class="graph-view"  style="margin-top: 0"  ref="chart4">图表4</div>-->
        <!--        </div>-->


        <!--        <div class="newbox">-->
        <!--          <div class="newtitle">-->
        <!--            <h4 style="margin-left: 10px">租赁收入</h4>-->
        <!--          </div>-->
        <!--          <div class="tab_flex">-->
        <!--            <div :class="tablinedefault == 0 ? 'tab_item_active' : 'tab_item'" @click="changetabline(0)">应收同比</div>-->
        <!--            <div :class="tablinedefault == 1 ? 'tab_item_active' : 'tab_item'" @click="changetabline(1)">实收同比</div>-->
        <!--          </div>-->
        <!--          <div class="graph-view" style="margin-top: 0" ref="chart2">图表2</div>-->
        <!--        </div>-->


      </div>

      <!--右上角信息区-->
      <div class="data-view-right">
        <div class="toggle" @click="isShow()">
          <div></div>
        </div>
        <div class="graph" v-show="changeShow">
          <div class="box">
            <!--            <div class="row justify-between title">-->
            <!--              <h4 style="margin-left: 10px">资产状态</h4>-->
            <!--            </div>-->
            <!--            <div class="graph-view" ref="chart1">图表1</div>-->
            <div class="row justify-between title">
              <h4 style="margin-left: 10px">客户类别Top5</h4>
            </div>
            <div style="position: relative;overflow: hidden;">
              <div class="top_item" :class="'top_item' + index" v-for="(item, index) in customerTopList" :key="index">
                <div class="top_item_name">
                  <div>TOP{{ index + 1 }}</div>
                  <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.name }}</div>
                  <div>{{ item.value }}</div>
                </div>
                <div :class="'top_item_bg' + index"></div>
              </div>
              <img src="@/assets/topimg.png" alt="" class="topimg_style">
            </div>
          </div>
          <div class="box flex_column" style="cursor: pointer;">
            <div class="row justify-between title">
              <h4 style="margin-left: 10px">合同到期预警</h4>
            </div>
            <div class="chart_style" ref="chart3">图表3</div>
          </div>
          <div class="newbox flex_column">
            <div class="newtitle">
              <h4 style="margin-left: 10px">租赁收入</h4>
            </div>
            <div class="tab_flex">
              <div :class="tablinedefault == 0 ? 'tab_item_active' : 'tab_item'" @click="changetabline(0)">应收同比
              </div>
              <div :class="tablinedefault == 1 ? 'tab_item_active' : 'tab_item'" @click="changetabline(1)">实收同比
              </div>
            </div>
            <div class="chart_style" style="margin-top: 0" ref="chart2">图表2</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import * as api from "@/api";
import {isNotBlank} from "@/utils/string";
import {funit} from "@/filters";
import request from "@/api/request";
import {openCosmicFormPage, openCosmicListPage} from "@/utils/openUtils";
import {getAssetProjectList, getProAssetBookValue} from "@/api";
import iconImage from "@/img/Screen/icon.png";

export default {
  data() {
    return {
      panorama: false,
      center: {
        // 经纬度
        lng: 106.462406,
        lat: 29.557143,
      },
      changeShow: true,
      markerType: null,
      markerId: null,
      zoom: 15, // 地图展示级别、
      minZoom: 11,
      BMap: null, // 百度地图对象
      map: null, // 百度地图实例
      installationAddress: "重庆市沙坪坝区教院路25号",
      content: undefined,
      infoWindow: {
        show: false,
        position: {},
        id: "",
        title: "",
        zcType: "",
        address: "",
        area: 0,
        status: "",
        imageUrl: "",
        price: 0,
        yearRentAmt: 0,
        isBulkAsset: false,
        bulkAssetAmt: 0,
        mortgageStatus: '否',
        projectInfo: {},
        makerType: '',
      },
      openClickObject: null,
      point: {},
      //地址搜索
      address: "",
      //街道选择器
      streetValue: "",
      streetOptions: [],
      itemValue: "",
      itemOptions: [],
      streetOptionsSelect: [],
      iconOption: {
        default: {
          color: "#2F70F7",
          icon: require("../img/Screen/icon1.png"),
        },
        全部出租: {
          color: "#2F70F7",
          icon: require("../img/Screen/icon3.png"),
        },
        部分出租: {
          color: "#2F70F7",
          icon: require("../img/Screen/icon2.png"),
        },
        空置: {
          color: "#2F70F7",
          icon: require("../img/Screen/icon1.png"),
        },
      },
      //面积
      areaValue: null,
      areaOptions: [],
      //价位
      priceValue: null,
      priceOptions: [],
      //资产经济性质
      ecoNatureValue: null,
      ecoNatureOptions: [],
      //评估价位
      evaluatePriceValue: null,
      evaluatePriceOptions: [],
      //资产状态
      zcStatusValue: [],
      zcStatusOptions: [],
      //资产性质
      natureValue: [],
      natureOptions: [],
      //行政区域下拉框
      regionValue: "",
      regionOptions: [],
      //公司下拉框
      companyValue: "",
      companyOptions: [],
      //第一层级-区域-点
      regionPoints: [],
      //第二层级-街道点
      street: [],
      //项目点
      project: [],
      //第四层级-资产点
      property: [],
      markerList: [],
      markerStoreList: [],
      message: "点击或长按此处",
      showmap: false,
      // 地图初始化信息
      loading: false,
      // phone: '13452857747',
      phone: '590862d48fd9b14e8ae5705baf183e09',
      totalData: {},
      defaultId: null,
      defaultMarkerType: "region",
      currentDistrict: [],
      leftTotalData: {
        area: 0,
        leaveArea: 0,
        price: 0,
        totalNums: 0,
      },
      appToken: "",
      accessToken: "",
      mousePoint: null,
      idempotent: false,
      tokenTimer: null,
      customerTopList: [],
      incomeDetail: [],
      tablinedefault: 0,
      option: [['product', '去年', '今年'],
        ['1月', 50, 60],
        ['4月', 60, 70],
        ['6月', 70, 80],
        ['8月', 80, 90],
        ['10月', 90, 100],
        ['12月', 100, 110],],
    };
  },
  mounted() {
    this.getStreetSelectData()
    this.getSelectData()
    this.initToken()
    this.tokenTimer = setInterval(() => {
      this.initToken()
    }, 1000 * 60 * 60)
  },
  methods: {
    isShow() {
      this.changeShow = !this.changeShow;
    },
    //初始化地图
    initMap({BMap, map}) {
      this.BMap = BMap;
      this.map = map;
      //自定义地图主题样式
      this.map.setMapStyleV2({
        styleId: "a7ae1e91aeaa352867f7bbe9e6cd6fa6",
      });
      this.map.getContainer().style.background =
          "-webkit-linear-gradient(top, transparent 59px, #11264f 60px),-webkit-linear-gradient(left, transparent 59px, #11264f 60px)";
      this.map.getContainer().style.backgroundColor = "#091220ff";
      this.map.getContainer().style.backgroundSize = "60px 60px";
      // TODO 设置地图最小可缩放比例
      this.map.setMinZoom(this.minZoom);
      // 地图缩放结束时触发
      this.map.addEventListener("zoomend", this.changeZoom);
      this.map.addEventListener("mousemove", this.handlerMapMouseMove);
      this.map.addEventListener("dragend", this.initMarker);
      // TODO 页面刚加载时，显示沙坪坝区域下的所有街道
      this.getMarkerInof(this.defaultMarkerType, this.defaultId);
    },
    //显示行政区划边界
    changeshow(tPoint) {
      this.showmap = true; //使false变为true显示
      new this.BMap.Geocoder().getLocation(tPoint, (res) => {
        this.currentDistrict = [];
        //获取当前位置的经纬度
        this.currentDistrict.push({
          lng: tPoint.lng,
          lat: tPoint.lat,
          name: res.addressComponents.district,
        });
      });
    },
    changetabline(val) {
      this.tablinedefault = val
      if (val == 0) {
        this.getYearReceivableCompare()
      } else {
        this.getYearReceiptsCompare()
      }
    },
    async getYearReceiptsCompare() {
      let data = await api.getYearReceiptsCompare(this.itemValue)
      let listTotal = [['product', '今年', '去年']]
      for (const index in data.data) {
        let list = []
        list.push(data.data[index].month + "月")
        list.push(+(+data.data[index].curTotal / 10000).toFixed(2))
        list.push(+(+data.data[index].lastTotal / 10000).toFixed(2))
        listTotal.push(list)
      }
      this.option = listTotal
      this.initCompare()
    },
    async getYearReceivableCompare() {
      let data = await api.getYearReceivableCompare(this.itemValue)

      let listTotal = [['product', '今年', '去年']]
      for (const index in data.data) {
        let list = []
        list.push(data.data[index].month + "月")
        list.push(+(+data.data[index].curTotal / 10000).toFixed(2))
        list.push(+(+data.data[index].lastTotal / 10000).toFixed(2))
        listTotal.push(list)
      }
      this.option = listTotal
      this.initCompare()
    },

    initCompare() {
      let bar_Chart = this.$echarts.init(this.$refs.chart2);
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
        dataset: {
          source: this.option
        },
        xAxis: {
          type: 'category', axisLabel: {
            textStyle: {
              color: "#FFFFFF",
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
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(37, 161, 255, 1)'},
                {offset: 1, color: 'rgba(0, 148, 255, 0.20)'},
              ]),
              borderRadius: [4, 4, 4, 4]
            },
            barWidth: 8

          },
          {
            type: 'bar',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: 'rgba(0, 188, 154, 1)'},
                {offset: 1, color: 'rgba(1, 222, 182, 0.20)'},
              ]),
              borderRadius: [4, 4, 4, 4]
            },
            barWidth: 8
          }
        ]
      };

      option && bar_Chart.setOption(option);

    },
    //移除行政区划边界
    changenotshow() {
      this.showmap = false;
    },
    //通过缩放触发 - 根据当前层级设置显示内容
    changeZoom() {
      let view = parseInt(this.map.getZoom());
      // if (view <= 16) {
      //   // 清除查询数据
      //   this.clearQueryData();
      // }
      // 清空标注
      this.map.clearOverlays();
      this.markerStoreList = [];
      console.log("zoom:" + view);
      // 是否含有查询条件
      if (JSON.stringify(this.queryData) !== "{}") {
        this.getMarkerInof("street");
      } else {
        let markerId = this.markerId;
        let markerType = this.markerType;
        //根据当前层级进行地点的增删
        if (!markerType) {
          markerType = view <= 16 ? 'region' : 'street'
          if (!markerId && view > 16) {
            // 获取当前距离鼠标最近的街道id
            this.markerList.sort((a, b) => {
              let t1 = this.map.getDistance(this.mousePoint, new BMap.Point(a.lng, a.lat))
              let t2 = this.map.getDistance(this.mousePoint, new BMap.Point(b.lng, b.lat))
              return t1 - t2
            })
            let item = this.markerList[0];
            markerId = item.id
          }
        }
        this.getMarkerInof(markerType, markerId);
        this.markerId = null;
        this.markerType = null;
      }
    },
    toHomePage() {
      this.$router.push({
        path: '/'
      })
    },
    /**
     * 标注点击事件
     * 1.通过点击事件触发-设置下一级缩放
     * 2.通过标注id和标注类型获取标注列表
     * 3.根据层级，设置缩放层级
     * @param e
     */
    markerClick(e) {
      let lng = e.currentTarget.point.lng;
      let lat = e.currentTarget.point.lat;
      this.map.setCenter(new BMap.Point(lng, lat));
      let markerId = e.currentTarget.markerId;
      let markerType = e.currentTarget.markerType;
      this.markerId = markerId;
      this.markerType = markerType;
      var view = parseInt(this.map.getZoom());
      if (view <= 16) {
        this.map.setZoom(17);
      }
    },
    /**
     * 全景图
     * */
    initPanorama(item) {
      const point = new BMap.Point(item.lng, item.lat);
      var than = this;
      var panoramaService = new BMap.PanoramaService();
      panoramaService.getPanoramaByLocation(point, function (res) {
        if (res != null) {
          than.panorama = true;
          than.openPanorama(point);
        } else {
          than.$alert("当前资产无全景图！", "提示", {
            confirmButtonText: "确定",
          });
        }
      });
    },
    openPanorama(point) {
      // 全景图
      setTimeout(function () {
        var panoramaObj = new BMap.Panorama("panorama"); //获取实例对象
        panoramaObj.setPosition(point); //根据经纬度获取全景
      }, 300);
    },
    /**
     * 添加标注点
     * @param itemList
     */
    initMarker() {
      // 是否含有查询条件
      let hasQuery = JSON.stringify(this.queryData) !== "{}";
      var than = this;
      let zoom = this.map.getZoom();
      // 遍历数据列表，在地图上进行标点
      // TODO 优化打点速度
      for (var i = 0; i < this.markerList.length; i++) {
        const temp = this.markerList[i];
        // 排除无效经纬度
        if (temp.lng < 1 || temp.lat < 1) {
          continue;
        }
        const tPoint = new BMap.Point(temp.lng, temp.lat);
        // 排除非可视区域的标点
        if (!this.map.getBounds().containsPoint(tPoint)) {
          continue;
        }
        // 排除已渲染的标点
        if (this.markerStoreList.find((x) => x.markerId === temp.id)) {
          continue;
        }
        // 创建一个标点
        let tMarker = new BMap.Marker(tPoint);
        let iconImage = require("../img/Screen/icon.png");
        let icon = new BMap.Icon(iconImage, new BMap.Size(50, 72));
        if (zoom > 16 || hasQuery) {
          iconImage = this.iconOption.default.icon;
          if (temp.type === "aseet" && this.iconOption[temp.allStatus]) {
            //iconImage = this.iconOption[temp.allStatus].icon;
          }
          icon = new BMap.Icon(iconImage, new BMap.Size(50, 72));
        }
        // 设置图标
        tMarker.setIcon(icon);
        var label = null;
        if (zoom > 16 || hasQuery) {
          // 设置项目或资产的标签样式
          // 添加文字lebel
          let name = temp.name.split('').slice(0, 6).join('')
          let funit = Vue.filter('funit')
          let template = `<div style="height: 25px;
                            width: 140px;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            ">
                                <span style="
                                height: 22px;
                                font-size: 14px;
                                overflow: hidden;
                                ">${name}</span>
<!--                                <i style="display: inline-block;-->
<!--                                border-left: 2px solid #fff;-->
<!--                                width: 2px;-->
<!--                                height: 15px;-->
<!--                                border-left: 2px solid #fff;"></i> -->
<!--                                <span style="border-radius: 10px;-->
<!--                                  background-color: #fff;-->
<!--                                  color: #2F70F7;-->
<!--                                  padding: 0 7px;-->
<!--                                  margin: 5px 0;-->
<!--                                  float: right;">${funit(temp.actualPrice)}</span>-->
                          </div>`
          label = new BMap.Label(template, {
            offset: new BMap.Size(0, 0),
          });
          // 设置lebel样式
          // TODO 根据资产状态，显示不同的标签颜色
          let label_color = this.iconOption.default.color;
          label.setStyle({
            color: "#fff",
            backgroundColor: label_color,
            borderRadius: "10px",
            fontSize: "14px",
            border: "0",
            transform: "translateX(-30%)",
          });
          tMarker.setTitle(temp.name);
        } else {
          // 设置区域或街道的标签样式
          //文字偏移量
          let top = 15;
          let fontLength = temp.name.length;
          if (fontLength > 3) {
            top = 5;
          }
          //添加文字lebel
          label = new BMap.Label(
              '<div style="width: 45px;white-space: pre-wrap;text-align: center;">' +
              temp.name +
              "</div>",
              {
                offset: new BMap.Size(4, top),
              }
          );
          //设置lebel样式
          label.setStyle({
            background: "none",
            color: "#fff",
            border: "none", //只要对label样式进行设置就可达到在标注图标上显示数字的效果
          });
        }
        tMarker.setLabel(label);

        // 16级以上，代表是资产，点击事件不在下钻，改为打开全景图
        if (zoom > 16 || hasQuery) {
          //绑定全景事件
          // tMarker.addEventListener("click", function (e) {
          //   than.initPanorama(tPoint);
          // });
          label.addEventListener("click", function (e) {
            than.infoWindowOpen(temp);
          });
          tMarker.addEventListener("click", function (e) {
            than.infoWindowOpen(temp);
          });
          // 解决重叠
          let _this = this;
          tMarker.addEventListener("mouseover", function (e) {
            this.getLabel().setStyle({
              backgroundColor: "#f56c6c",
            });
            this.setTop(true);
          });
          tMarker.addEventListener("mouseout", function (e) {
            this.getLabel().setStyle({
              backgroundColor: _this.iconOption.default.color,
            });
            this.setTop(false);
          });

        } else {
          //绑定下钻事件
          tMarker.addEventListener("click", function (e) {
            than.markerClick(e);
          });
          //绑定下钻事件
          label.addEventListener("click", function (e) {
            than.markerClick(e);
          });
        }
        //zoom:10 代表是区级,区级需要绑定行政区划
        if (zoom <= 12 && !hasQuery) {
          tMarker.addEventListener("mouseover", function (e) {
            than.changeshow(tPoint);
          });
          tMarker.addEventListener("mouseout", function (e) {
            than.changenotshow(tPoint);
          });
        }

        //标注自定义字段-markerId
        tMarker.markerId = temp.id;
        //标注自定义字段-markerType
        tMarker.markerType = temp.type;
        //设置中心点
        // this.map.setCenter(tPoint);
        //打点
        this.map.addOverlay(tMarker);
        this.markerStoreList.push(tMarker);
      }
    },
    /**
     * 此处根据标注id和标注类型在，在通过接口获取标注信息
     * @param markerId
     * @param markerType
     */
    async getMarkerInof(markerType, markerId = null) {
      if (!markerType && !markerId) {
        return;
      }
      if (this.idempotent) {
        return;
      }
      this.idempotent = true
      if (markerId && markerType === "street") this.streetValue = markerId
      if (JSON.stringify(this.queryData) === "{}" && this.map.getZoom() > 16) {
        markerType = "region"
        this.map.setZoom(15)
        this.map.setCenter(new BMap.Point(this.center.lng, this.center.lat));
      }
      if (markerType === "region") {
        // 获取街道列表数据
        let {data} = await api.getStreetList(this.phone, markerId);
        this.totalData = data;
        this.markerList = data.streetList;
        this.initMarker();
      } else if (markerType === "street") {
        // 获取资产列表数据
        /*let {data} = await api.getAssetList(
            this.phone,
            markerId,
            this.queryData
        );*/
        let {data} = await api.getAssetProjectList(
            this.phone,
            markerId,
            this.queryData
        );
        let curYearTotalIncomeCompose = await api.getCurYearTotalIncomeCompose(this.itemValue);
        this.leftTotalData.price = curYearTotalIncomeCompose.data.total
        this.incomeDetail = curYearTotalIncomeCompose.data.composeList
        this.changetabline(this.tablinedefault)
        let res = await api.getAssetTotal(this.phone, markerId, this.queryData);
        this.totalData = res.data;
        this.markerList = data.assets;
        this.initMarker();
      }

      if (this.markerList.length > 0 && markerType === "street" || this.defaultId) {
        this.defaultId = null
        // 距离当前地图中心点越近越靠前
        this.markerList.sort((a, b) => {
          let t1 = this.map.getDistance(this.map.getCenter(), new BMap.Point(a.lng, a.lat))
          let t2 = this.map.getDistance(this.map.getCenter(), new BMap.Point(b.lng, b.lat))
          return t1 - t2
        })
        // 设置地图的中心点
        let item = this.markerList[0];
        if (item.lng > 1 && item.lat > 1) {
          this.map.setCenter(new BMap.Point(item.lng, item.lat));
          this.initMarker();
        }
      }
      this.idempotent = false
      // this.map.enableScrollWheelZoom();
    },
    changeSelect(markerType) {
      if (!this.streetValue) this.itemValue = ''
      this.map.setZoom(17);
      //清空标注
      this.map.clearOverlays();
      this.markerStoreList = [];
      this.getMarkerInof(markerType);
    },
    /**
     * 关闭 资产信息弹窗
     * */
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    /**
     * 设置资产信息弹窗的显示数据，
     * 并打开弹窗
     * */
    async infoWindowOpen(item) {
      console.log("点位弹窗：", item);
      this.infoWindow.id = item.id;
      this.infoWindow.title = item.name;
      this.infoWindow.status = item.allStatus;
      this.infoWindow.price = item.actualPrice;
      this.infoWindow.position = {lng: item.lng, lat: item.lat};
      const makerType = item.type;
      this.infoWindow.makerType = makerType;
      if (makerType === "aseet") {
        //资产
        // 查询资产详情
        api.getAssetDetail(item.id).then(({data}) => {
          this.infoWindow.assetStructureName = data.assetStructureName;
          this.infoWindow.area = data.area;
          this.infoWindow.address = data.address;
          let suffix = "access_token=" + this.accessToken;
          let imageUrl = "";
          if (isNotBlank(data.imageAddress)) {
            let newImage = '/img/' + data.imageAddress.split('/').slice(3).join('/');
            if (data.imageAddress.indexOf("?") !== -1) {
              imageUrl = data.imageAddress + "&" + suffix;
            } else {
              imageUrl = data.imageAddress + "?" + suffix;
            }
          }
          console.log("完整图片地址：", imageUrl);
          this.infoWindow.imageUrl = imageUrl;
          this.infoWindow.haveWarrant = data.haveWarrant;
          this.infoWindow.yearRentAmt = data.yearRentAmt;
          this.infoWindow.isBulkAsset = data.isBulkAsset;
          this.infoWindow.bulkAssetAmt = data.bulkAssetAmt;
          this.infoWindow.mortgageStatus = data.mortgageStatus;
          this.$nextTick(() => {
            this.infoWindow.show = true;
          })
        })
      } else if (makerType === "project") {
        //项目
        await api.getProjectDetail(item.id).then(({data}) => {
          console.log("项目信息:", data);
          let suffix = "access_token=" + this.accessToken;
          this.infoWindow.projectInfo = data;
          this.infoWindow.projectInfo.accessToken = suffix;
          //取出项目关联的财务入账价值
          this.infoWindow.projectInfo.bookValue = 0;
        })
        await getProAssetBookValue(item.id).then(res => {
          console.log("财务入账价值：", res);
          let data_ = res.data;
          if (data_) {
            this.infoWindow.projectInfo.bookValue = data_.bookValue;
          }
        });
        this.$nextTick(() => {
          this.infoWindow.show = true;
        })
      }
    },
    async getStreetSelectData() {
      let {data} = await api.getStreetSelectData();
      this.streetOptions = data;
    },
    /**
     * 获取页面顶部，选项数据
     */
    async getSelectData() {
      let {data} = await api.getSelectData(this.phone);
      this.regionOptions = data.regions;
      this.companyOptions = data.companys;
      this.natureOptions = data.assetStructures;
      this.zcStatusOptions = data.assetRentalStatus;
      this.areaOptions = data.areas;
      this.priceOptions = data.prices;
      this.evaluatePriceOptions = data.evaluatePrices;
      this.ecoNatureOptions = data.ecoNatures;
    },
    /**
     * 获取页面顶部，项目选项数据
     * @returns {Promise<void>}
     */
    async getItemSelectData() {
      if (this.itemOptions.length === 1 && this.$route.query.project === this.itemOptions[0].id) {
        return;
      }
      let data = await api.getItemSelectData(this.streetValue);
      this.itemOptions = data.data;
    },
    toDetailPage(item) {
      if (!item) {
        return;
      }
      /*let url = `${process.env.VUE_APP_ASSET_CARD_URL}/accessTokenLogin.do?access_token=${this.accessToken}&redirect=${process.env.VUE_APP_ASSET_CARD_URL}/index.html?formId=cqkd_assetcard&operationStatus=view&pkId=${assetId}`;
      window.open(url);*/
      const id = item.id;
      const makerType = item.makerType;
      if (makerType === "aseet") {
        //资产
        openCosmicFormPage("cqkd_assetcard", id, {});
      } else if (makerType === "project") {
        //项目：跳转到资产卡片列表
        //openCosmicFormPage("cqkd_xiangmu", id, {});
        openCosmicListPage("cqkd_assetcard", "2", {proId: id});
      }
    },
    /**
     * 渲染-图表1
     * */
    renderChart1(data) {

      let colorArray = [
        ["#275E7E", "#62DEE5"],
        ["#6D8460", "#E4D72D"],
        ["#1C304A", "#AAE95A"],
        ["#843900", "#f58220"],
        ["#07215C", "#165FB0"]
      ]

      if (!Array.isArray(data)) {
        console.error('Invalid data format for assetCustomerIndustry');
        return;
      }

      const seriesData = data.map((item, index, array) => (
              {
                value: item.value, name: item.name, itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      {offset: 0, color: colorArray[index][0]},
                      {offset: 0.5, color: colorArray[index][1]},
                    ]),
                  },
                }
              }
          )
      )

      let hire = {
        value: data.hireNums,
        name: "出租",
        itemStyle: {
          normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {offset: 0, color: "#275E7E"},
              {offset: 0.5, color: "#62DEE5"},
            ]),
          },
        },
      };
      let use = {
        value: data.useNums,
        name: "自用",
        itemStyle: {
          normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {offset: 0, color: "#6D8460"},
              {offset: 0.5, color: "#E4D72D"},
            ]),
          },
        },
      };
      let lend = {
        value: data.lendNums,
        name: "出借",
        itemStyle: {
          normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {offset: 0, color: "#1C304A"},
              {offset: 0.5, color: "#AAE95A"},
            ]),
          },
        },
      };
      let leave = {
        value: data.leaveNums,
        name: "空置",
        itemStyle: {
          normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {offset: 0, color: "#843900"},
              {offset: 0.5, color: "#f58220"},
            ]),
          },
        },
      };
      let other = {
        value: data.otherNums,
        name: "其他",
        itemStyle: {
          normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {offset: 0, color: "#07215C"},
              {offset: 0.5, color: "#165FB0"},
            ]),
          },
        },
      };

      let chart = this.$echarts.init(this.$refs.chart1);
      let option = {
        legend: {
          icon: "circle",
          // left: "-2%",
          // bottom: "-10%",
          // padding: 10,
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        series: [
          {
            type: "pie",
            top: "10%",
            left: "5%",
            radius: ["40%", "70%"],
            avoidLabelOverlap: true,
            label: {
              show: true,
              formatter: "{b}\n{d}%",
              color: "#fff",
            },
            data: seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
    /**
     * 渲染-图表2
     * */
    renderChart2(retIncList) {
      // 封装数据
      let xAxisData = [];
      let receivable = []; // 应收入
      let actual = []; // 实际收入
      for (let i = 0; i < retIncList.length; i++) {
        let item = retIncList[i];
        xAxisData.push(`${item.month}月`);
        receivable.push((item.amount / 10000).toFixed(2));
        actual.push((item["actual_amount"] / 10000).toFixed(2));
      }

      let chart = this.$echarts.init(this.$refs.chart2);
      let option = {
        tooltip: {
          trigger: "item",
          position: "center",
          formatter: function (params) {
            let html = `<div>
                            <div>${params.name
            } 应收<span style="font-weight: 700;padding-left: 20px">${receivable[params.dataIndex]
            }</span></div>
                            <div>${params.name
            } 实收<span style="font-weight: 700;padding-left: 20px">${actual[params.dataIndex]
            }</span></div>
                        </div>`;
            return html;
          },
          // extraCssText:'padding:0;margin:0',
        },
        grid: {
          top: "18%",
          left: "15%",
          bottom: "23%",
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {
            // interval: 0,
            rotate: "45",
            color: "#fff",
            fontSize: 12,
          },
        },
        yAxis: {
          name: "单位(万元)",
          nameTextStyle: {
            color: "#fff",
          },
          type: "value",
          axisLabel: {
            color: "#fff",
            fontSize: 12,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#999d9c",
            },
          },
        },
        legend: {
          show: true,
          // top:'-1%',
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "应收",
            // data: [820, 932, 901, 934, 345, 456, 780, 345, 890, 450, 890, 751],
            data: receivable,
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#29e5e5",
            },
          },
          {
            name: "实收",
            // data: [350, 678, 456, 609, 300, 421, 300, 230, 810, 310, 590, 670],
            data: actual,
            type: "line",
            smooth: true,
            lineStyle: {
              color: "yellow",
            },
          },
        ],
      };
      chart.setOption(option);
    },
    /**
     * 渲染-图表3
     * */
    renderChart3(expireConDisList) {
      // 封装数据
      let xAxisData = [];
      let seriesData = [];
      for (let i = 0; i < expireConDisList.length; i++) {
        let item = expireConDisList[i];
        xAxisData.push(item.type);
        seriesData.push(item.nums);
      }

      let chart = this.$echarts.init(this.$refs.chart3);
      let option = {
        tooltip: {
          trigger: "item",
        },
        grid: {
          top: "20%",
          left: "15%",
          bottom: "30%",
        },
        xAxis: {
          type: "category",
          // data: ["1-3个月", "3到6个月", "6-12个月", "12月以上"],
          data: xAxisData,
          axisLabel: {
            // interval: 0,
            rotate: "45",
            color: "#fff",
            fontSize: 10,
            // lineStyle: {
            //   color: '#163a5f',
            //   width: 2
            // }
          },
        },
        yAxis: {
          // name: '单位(万元)',
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#999d9c",
            },
          },
          axisLabel: {
            color: "#fff",
            fontSize: 10,
          },
        },
        series: [
          {
            // data: [120, 200, 150, 80],
            data: seriesData,
            type: "bar",
            barWidth: 25,
            itemStyle: {
              color: {
                type: "linear",
                x: 0, //右
                y: 0, //下
                x2: 0, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0.1,
                    color: "#0f5da3", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#8bb0ef", // 100% 处的颜色
                  },
                ],
              },
              barBorderRadius: [20, 20, 0, 0],
            },
            label: {
              show: true,
              position: "top",
              distance: 0,
              color: "#fff",
              fontSize: 18,
              formatter: "{c}",
            },
          },
        ],
      };
      chart.setOption(option);
      chart.on('click', (params) => {
        if (params.componentType === 'series') {
          var dataIndex = params.dataIndex;
          console.log("dataIndex:", dataIndex);
          switch (dataIndex) {
            case 0:
              this.openClick(0, 3)
              break;
            case 1:
              this.openClick(3, 6)
              break;
            case 2:
              this.openClick(6, 12)
              break;
            case 3:
              this.openClick(12, 999999999)
              break;
          }
        }
      });
    },
    openClick(startMonth, endMonth) {
      let item = {
        areaId: "",
        assetStatus: "",
        assetStructureId: "",
        companyId: "",
        itemId: "",
        keyWord: "",
        phone: "",
        priceId: "",
        streetId: "",
        startMonth: "",
        endMonth: ""
      }
      item.phone = this.phone
      item.startMonth = startMonth
      item.endMonth = endMonth
      item.areaId = this.queryData.areaId
      item.assetStatus = this.queryData.assetStatus
      item.assetStructureId = this.queryData.assetStructureId
      item.companyId = this.queryData.companyId
      item.itemId = this.queryData.itemId
      item.keyWord = this.queryData.keyWord
      item.priceId = this.queryData.priceId
      item.streetId = this.queryData.streetId
      console.log("item===", item);
      openCosmicListPage("cqkd_ht", "4", item);
      //NumberOfRentalCustomersOpen(item)
    },
    /**
     * 渲染-饼图4（收入构成）
     */
    renderChart4(composeList) {
      const chart = this.$echarts.init(this.$refs.chart4);


      // 处理数据
      const seriesData = composeList.map(item => ({
        name: item.name,
        value: item.amt
      }));

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}元 (占比{d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'center',
        //   textStyle: {
        //     color: '#fff'
        //   },
        //   data: seriesData.map(item => item.name)
        // },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          // label: {
          //   show: true,
          //   position: 'outside',
          //   formatter: '{b|{b}}\n{c|{c}元} {d|{d}%}',
          //   rich: {
          //     b: { fontSize: 14, fontWeight: 'bold' },
          //     c: { fontSize: 12 },
          //     d: { fontSize: 12 }
          //   }
          // },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          data: seriesData.sort((a, b) => b.value - a.value),
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          }
        }]
      };

      chart.setOption(option);
    },
    /**
     * 清除头部选项数据
     * */
    clearQueryData() {
      this.companyValue = "";
      this.regionValue = "";
      this.streetValue = "";
      this.zcStatusValue = [];
      this.natureValue = [];
      this.areaValue = "";
      this.priceValue = "";
      this.address = "";
      this.evaluatePriceValue = "";
      this.ecoNatureValue = "";
    },
    async initToken() {
      let res = await api.getAppToken();
      this.apptoken = res.data.app_token;
      let res2 = await api.getAccessToken(this.phone, this.apptoken);
      console.log("res2==", res2);
      if (res2 && res2.status) {
        this.accessToken = res2.data.access_token;
      }
    },
    handlerMapMouseMove(e) {
      this.mousePoint = e.point
    }
  },
  computed: {
    /**
     * 封装查询条件
     */
    queryData() {
      let condition = {};
      isNotBlank(this.companyValue) &&
      (condition.companyId = this.companyValue);
      isNotBlank(this.streetValue) && (condition.streetId = this.streetValue);
      isNotBlank(this.itemValue) && (condition.itemId = this.itemValue);
      this.zcStatusValue.length > 0 &&
      (condition.assetStatus = this.zcStatusValue);
      this.natureValue.length > 0 &&
      (condition.assetStructureId = this.natureValue);
      isNotBlank(this.areaValue) && (condition.areaId = this.areaValue);
      isNotBlank(this.priceValue) && (condition.priceId = this.priceValue);
      isNotBlank(this.address) && (condition.keyWord = this.address);
      isNotBlank(this.ecoNatureValue) && (condition.ecoNatureId = this.ecoNatureValue);
      isNotBlank(this.evaluatePriceValue) && (condition.evaluatePriceId = this.evaluatePriceValue);
      return condition;
    },
  },
  watch: {
    streetValue: {
      handler: function (newVal, oldVal) {
        if (newVal !== "") {
          this.itemOptions = [];
          this.itemValue = "";
          this.getItemSelectData();
        }
      },
    },
    /**
     * 监听 接口返回的数据
     */
    totalData: {
      immediate: true,
      deep: true,
      handler: function (newVal, oldVal) {
        this.$nextTick(() => {
          if (newVal && JSON.stringify(newVal) !== "{}") {
            // 封装左侧信息展示区数据
            this.leftTotalData.area = newVal.area;
            // 租赁收入
            // console.log(newVal.retIncList);
            // let amount = 0
            // newVal.retIncList.forEach(item => {
            //   let b1 = item.year == new Date().getFullYear()
            //   let b2 = item.month >= 0 && item.month <= new Date().getMonth() + 1
            //   if (b1 && b2) amount += item.amount
            // }) 
            // this.leftTotalData.price = newVal.rentIncomeAmt;
            this.leftTotalData.totalNums = newVal.nums;
            this.leftTotalData.leaveArea = newVal.leaveNums;


            let data = {
              hireNums: newVal.hireNums,
              useNums: newVal.useNums,
              lendNums: newVal.lendNums,
              leaveNums: newVal.leaveNums,
              otherNums: newVal.otherNums,
            };

            this.customerTopList = newVal.assetCustomerIndustry
            // 渲染资产状态分布图表
            // this.renderChart1(data);
            // this.renderChart1(newVal.assetCustomerIndustry)
            // 渲染租赁收入图表
            // this.renderChart2(newVal.retIncList);
            // 渲染合同到期分布
            this.renderChart3(newVal.expireConDisList);
          }
        });
      },
    },
    incomeDetail: {
      immediate: true,
      deep: true,
      handler: function (newVal, oldVal) {
        this.$nextTick(() => {
          if (newVal && JSON.stringify(newVal) !== "[]") {
            console.log(newVal)
            this.renderChart4(newVal)
          }
        })
      }
    },
    itemValue: {
      handler: function (newVal, oldVal) {
        if (newVal !== "") {
          this.changetabline(this.tablinedefault)
        }
      },
    },
    /**
     * 监听路由参数
     */
    "$route.query": {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        if (JSON.stringify(newVal) === "{}") {
          return;
        }
        if (newVal.streetId) {
          this.defaultId = newVal.streetId;
          this.zoom = 17;
          this.defaultMarkerType = "street";
        }
        if (newVal.phone) {
          this.phone = newVal.phone;
        }
        if (newVal.project) {
          this.itemValue = newVal.project;
          this.zoom = 17;
          this.defaultMarkerType = "street";
        }
        if (newVal.project && newVal.projectName) {
          this.itemOptions.push({name: newVal.projectName, id: newVal.project});
        }

      },
    },
  },
  beforeDestroy() {
    if (this.tokenTimer) clearInterval(this.tokenTimer)
  }
};
</script>

<style>
.el-dialog {
  /* background: rgba(0, 0, 0, .2) !important; */
  background: rgba(0, 0, 0, 0.2) !important;
  border: rgb(8, 255, 243) 1px solid;
  backdrop-filter: blur(3px);
}

.el-dialog__title {
  color: rgb(255, 255, 255) !important;
  font-weight: 900;
}

.el-dialog__header {
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  box-shadow: 0 0 1.5vw rgb(97, 255, 255) inset;
  background: linear-gradient(#74ffef, #74ffef) left top,
  linear-gradient(#3deeda, #3deeda) left top,
  linear-gradient(#3deeda, #3deeda) right top,
  linear-gradient(#3deeda, #3deeda) right top;
  /* linear-gradient(#3deeda, #3deeda) left bottom,
  linear-gradient(#3deeda, #3deeda) left bottom,
  linear-gradient(#3deeda, #3deeda) right bottom,
  linear-gradient(#3deeda, #3deeda) right bottom; */
  background-repeat: no-repeat;
  background-size: 2px 20px, 20px 2px;
}

.el-dialog__body {
  padding: 20px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  text-align: left;
  box-shadow: 0 0 1.5vw rgb(57, 255, 255) inset;
  background: linear-gradient(#3deeda, #3deeda) left bottom,
  linear-gradient(#3deeda, #3deeda) left bottom,
  linear-gradient(#3deeda, #3deeda) right bottom,
  linear-gradient(#3deeda, #3deeda) right bottom;
  background-repeat: no-repeat;
  background-size: 2px 20px, 20px 2px;
}

.el-form-item__content {
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0.5vw rgb(57, 255, 255);
  background-repeat: no-repeat;
  border-radius: 10px;
}

.planTitle {
  padding: 0 0 0 20px;
  color: #8ae3e9;
  font-size: 18px;
  font-weight: 600;
}

.planContent {
  color: #e6feff;
  font-size: 16px;
}
</style>
<style>
/*地图标题 infoWindow*/
.BMap_bubble_title {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  background: transparent !important;
  background-color: rgb(9 9 36);
}

.BMap_pop .BMap_top {
  background: rgb(9 9 36) !important;
  border: 0 !important;
}

.BMap_pop .BMap_center {
  border: 0 !important;
  background: rgb(9 9 36) !important;
}

.BMap_pop .BMap_bottom {
  border: 0 !important;
  background: rgb(9 9 36) !important;
}

.BMap_pop div:nth-child(3) {
  background: rgb(9 9 36) !important;
}

.BMap_pop > div:nth-child(3) div {
  border-radius: 7px;
  background: rgb(9 9 36) !important;
  /*border: 0 !important;*/
}

.BMap_pop > div:nth-child(1) {
  border-radius: 7px 0 0 0;
  background: rgb(9 9 36) !important;
  border: 0 !important;
}

.BMap_pop > div:nth-child(1) div {
  background: rgb(9 9 36) !important;
}

.BMap_pop > div:nth-child(5) {
  border-radius: 0 0 0 7px;
  background: rgb(9 9 36) !important;
  border: 0 !important;
}

.BMap_pop > div:nth-child(5) div {
  border-radius: 7px;
  background: rgb(9 9 36) !important;
}

.BMap_pop > div:nth-child(7) {
  background: rgb(9 9 36) !important;
}

.BMap_pop > div:nth-child(7) div {
  border-radius: 7px;
  background: rgb(9 9 36) !important;
}

.BMap_pop > div:nth-child(8) div {
  /*border-radius:7px;*/
  background: rgb(9 9 36) !important;
}

/*窗体阴影*/
.BMap_shadow div:nth-child(5) img {
  background: rgb(9 9 36) !important;
  margin-left: -1100px !important;
}

.BMap_shadow div:nth-child(4) {
  background: rgb(9 9 36) !important;
  width: 262px !important;
}

/*下面箭头替换为自己本地修改过的*/
img[src="http://api0.map.bdimg.com/images/iw3.png"] {
  content: url("../img/Screen/arrow1.png");
}

img[src="https://api.map.baidu.com/images/iw3.png"] {
  margin-top: -692px !important;
  filter: alpha(opacity=70);
  content: url("../img/Screen/arrow1.png");
}

.asset-btn-group {
  margin-top: 5px;
}

.asset-info {
  width: 30% !important;
  /*position: relative;*/
}

.asset-btn {
  position: absolute;
  float: left;
  padding: 5px;
  width: 80px;
  margin-right: 10px;
  line-height: 28px;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  border-radius: 7px;
  background-color: #0096ff;
  cursor: pointer;
  bottom: 0;
}

.asset-address {
  margin-top: 10px;
  font-size: 18px;
  margin-bottom: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  word-break: break-all;
}

.asset-address-box {
  height: 72px;
  width: 216px;
}

.asset-container {
  display: flex;
  justify-content: space-between;
  max-height: inherit;
  width: 100%;
  /*flex-flow: wrap;*/
  /*flex-direction: column;*/
}

.asset-container .asset-image {
  margin-top: 10px;
  /* height: 100px; */
  width: 100px;
}

.tab_flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

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
  margin-top: 15px;
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

.topimg_style {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 70px;
  height: 70px;
}
</style>

<style scoped>
@import "@/css/map2.css";

/* 隐藏百度图片Logo */
/deep/ .BMap_cpyCtrl {
  display: none;
}

/* 隐藏文字信息 */
/*
/deep/ .anchorBL {
  display: none;
}
*/
/* 修改dialog背景色 */
/deep/ .el-dialog {
  background-color: #f5f5f5;
  border: 0;
}

/* ===================== 炫酷科技风增强 ===================== */

/* 左侧统计卡片：玻璃拟态 + 霓虹描边 + 顶部流光 */
.data-view-left2-mini .drawer .block {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 245, 255, 0.10), rgba(10, 40, 70, 0.45));
  border: 1px solid rgba(0, 245, 255, 0.22);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  overflow: hidden;
  transition: all 0.3s ease;
}

.data-view-left2-mini .drawer .block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f5ff, transparent);
  background-size: 200% 100%;
  animation: hvShimmer 3s linear infinite;
}

.data-view-left2-mini .drawer .block:hover {
  border-color: rgba(0, 245, 255, 0.5);
  box-shadow: 0 10px 30px rgba(0, 245, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@keyframes hvShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 数值霓虹发光 */
.data-view-left2-mini .drawer .block .num {
  text-shadow: 0 0 10px rgba(41, 229, 229, 0.7), 0 0 24px rgba(41, 229, 229, 0.35);
}

/* 右侧图表面板：玻璃质感 + 扫描线 */
.data-view-right .graph {
  background-image: linear-gradient(160deg, rgba(10, 30, 55, 0.72), rgba(6, 16, 34, 0.85));
  border: 1px solid rgba(0, 245, 255, 0.18);
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), 0 0 24px rgba(0, 245, 255, 0.06);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.data-view-right .graph::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 5%, #00f5ff 50%, transparent 95%);
  opacity: 0;
  animation: hvScanline 5s linear infinite;
  pointer-events: none;
}

@keyframes hvScanline {
  0% { transform: translateY(0); opacity: 0; }
  8% { opacity: 0.7; }
  92% { opacity: 0.7; }
  100% { transform: translateY(86vh); opacity: 0; }
}

/* 右侧各卡片：霓虹边框 + 悬停发光 */
.data-view-right .graph .box {
  border: 1px solid rgba(0, 245, 255, 0.14);
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.data-view-right .graph .box:hover {
  border-color: rgba(0, 245, 255, 0.4);
  box-shadow: 0 0 18px rgba(0, 245, 255, 0.12);
}

/* TOP5 条目悬停微动效 */
.data-view-right .graph .top_item {
  transition: all 0.25s ease;
}

.data-view-right .graph .top_item:hover {
  transform: translateX(-4px);
  filter: drop-shadow(0 0 6px rgba(0, 245, 255, 0.35));
}

/* 顶部查询栏：玻璃科技感 */
.query {
  background: linear-gradient(180deg, rgba(8, 20, 40, 0.88), rgba(8, 20, 40, 0.72));
  border-bottom: 1px solid rgba(0, 245, 255, 0.18);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 245, 255, 0.05);
  backdrop-filter: blur(12px);
}

/* 地图暗角 + 边缘青色光晕 */
.map {
  position: relative;
}

.map::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 55%, rgba(2, 12, 27, 0.5) 100%);
  box-shadow: inset 0 0 120px rgba(0, 245, 255, 0.05);
  z-index: 500;
}
</style>
