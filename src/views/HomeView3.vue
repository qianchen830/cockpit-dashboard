<template>
  <div class="page main">
    <!-------------------------------------    搜索区域      --------------------------------------->
    <div class="query">
      <div class="home-btn"></div>
      <el-select v-model="companyValue" placeholder="请选择公司">
        <el-option
            v-for="item in companyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <!------行政区域------->
      <el-select v-model="regionValue" placeholder="行政区域">
        <el-option
            v-for="item in regionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <!--街道-->
      <!-- <div class="block">
        <el-cascader
          v-model="streetValue"
          :options="streetOptions"
          @change="streetChange"
          placeholder="街道"
        ></el-cascader>
      </div> -->
      <el-select v-model="streetValue" placeholder="街道">
        <el-option
            v-for="item in streetOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <!------资产状态------->
      <el-select v-model="zcStatusValue" placeholder="资产状态">
        <el-option
            v-for="item in zcStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <!------资产性质------->
      <el-select v-model="natureValue" placeholder="资产性质">
        <el-option
            v-for="item in natureOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <!------面积------->
      <el-select v-model="areaValue" placeholder="面积">
        <el-option
            v-for="item in areaOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <!------价位------->
      <el-select v-model="priceValue" placeholder="价位">
        <el-option
            v-for="item in priceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="space"></div>
      <div class="search">
        <el-input v-model="address" placeholder="地址搜索"></el-input>
      </div>
    </div>
    <!-------------------------------------    百度地图      --------------------------------------->
    <el-dialog
        :visible.sync="panorama"
        style="margin-top: -100px"
        width="90%"
        append-to-body
        title="全景查看"
        :destroy-on-close="true"
    >
      <div id="panorama" style="width: 100%; height: 700px"></div>
    </el-dialog>

    <baidu-map
        class="map"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="initMap"
    >
      <bm-panorama
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :offset="{ width: 25, height: 230 }"
      ></bm-panorama>
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>

      <bm-boundary
          v-if="showmap"
          v-for="(item, index) in currentDistrict"
          :key="index"
          :name="item.name"
          :strokeWeight="3"
          fill-opacity="0.1"
          stroke-style="dashed"
          :fillOpacity="0.2"
          :fillColor="item.color"
          :clicking="true"
      >
      </bm-boundary>

      <bm-info-window
          :title="infoWindow.title"
          :position="infoWindow.position"
          :show="infoWindow.show"
          @close="infoWindowClose()"
      >
        <div style="color: #fff; font-size: 16px">
          <div
              style="
              margin-top: 5px;
              height: 2px;
              width: 100%;
              background-color: #1981e1 !important;
            "
          ></div>
          <div style="margin-top: 10px">资产类型：{{ infoWindow.zcType }}</div>
          <div style="margin-top: 5px">资产状态：{{ infoWindow.status }}</div>
          <div style="margin-top: 5px">详细地址：{{ infoWindow.adderrs }}</div>
          <div style="margin-top: 5px">
            <div
                style="
                width: 65px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                float: right;
                margin-top: 10px;
                background-color: #687488 !important;
                font-size: 14px;
                cursor: pointer;
              "
                @click="initPanorama(infoWindow.position)"
            >
              查看全景
            </div>
          </div>
        </div>
      </bm-info-window>
    </baidu-map>
    <!--左上角信息展示区-->
    <div class="data-view data-view mode-2 hasRight">
      <ul class="board">
        <li class="row justify-between align-stretch">
          <div class="column align-top justify-between mr-35">
            <div>
              <span class="count-up blue text-underline">4,618</span>
              <span class="fz-12 white">㎡</span>
            </div>
            <span>实时资产面积</span>
          </div>
          <div class="column align-top justify-between">
            <div>
              <span class="mr-5">同比</span>
              <span class="pink triangle">0.00%</span>
            </div>
            <div>
              <span class="mr-5">环比</span>
              <span class="pink triangle">0.00%</span>
            </div>
          </div>
        </li>
        <li class="row justify-between align-stretch">
          <div class="column align-top justify-between mr-35">
            <div>
              <span class="count-up blue text-underline">25</span>
            </div>
            <span>实时资产数量</span>
          </div>
          <div class="column align-top justify-between">
            <div>
              <span class="mr-5">同比</span
              ><span class="pink triangle">0.00%</span>
            </div>
            <div>
              <span class="mr-5">环比</span
              ><span class="pink triangle">0.00%</span>
            </div>
          </div>
        </li>
      </ul>

      <!--又上角信息区-->
      <div class="data-view-right-mini">
        <div class="drawer">
          <div>
            <div>
              <div class="block rent">
                <span class="title"
                ><i class="iconfont icon-rent icon"></i>本年：资产出租情况
                </span>
                <div class="row align-center">
                  <span class="num">0.00</span><span class="num">%</span>
                </div>
                <span class="desc">出租率</span>
              </div>
            </div>
            <div>
              <div class="block amount">
                <span class="title"
                ><i class="iconfont icon-amount icon"></i>本年：平均租金单价
                </span>
                <div class="row align-end text-underline">
                  <span class="num">0.00</span><span></span>
                </div>
                <span class="desc">均价(元/个/月)</span>
              </div>
            </div>
            <div>
              <div class="block collect">
                <span class="title"
                ><i class="iconfont icon-shoujiao icon"></i>本年：收入情况
                </span>
                <div class="row align-center">
                  <span class="num">1000</span><span class="num">万</span>
                </div>
                <span class="desc">租赁收入</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {
      panorama: false,
      center: {
        // 经纬度
        lng: 106.559012,
        lat: 29.570001,
      },
      zoom: 10, // 地图展示级别、
      BMap: null, // 百度地图对象
      map: null, // 百度地图实例
      installationAddress: "重庆市沙坪坝区教院路25号",
      content: undefined,
      marker: [],
      infoWindow: {
        show: false,
        position: {},
        title: "",
        zcType: "",
        adderrs: "",
      },
      point: {},
      //地址搜索
      address: "",
      //街道选择器
      streetValue: "",
      streetOptions: [
        {
          value: "shapingba",
          label: "沙坪坝",
        },
        {
          value: "xiaolongkan",
          label: "小龙坎",
        },
      ],
      label_color_zc: "rgb(0,150,255)",
      label_color_dz: "rgb(89,234,80)",
      //面积
      areaValue: "",
      areaOptions: [
        {
          value: "area1",
          label: "100㎡以下",
        },
        {
          value: "area2",
          label: "100㎡~200㎡",
        },
        {
          value: "area3",
          label: "200㎡~300㎡",
        },
        {
          value: "area4",
          label: "300㎡~500㎡",
        },
      ],
      //价位
      priceValue: "",
      priceOptions: [
        {
          value: "price1",
          label: "50元/㎡/月以下",
        },
        {
          value: "price2",
          label: "50~80元/㎡/月",
        },
        {
          value: "price3",
          label: "80~120元/㎡/月",
        },
        {
          value: "price4",
          label: "120~150元/㎡/月",
        },
        {
          value: "price5",
          label: "150~200元/㎡/月",
        },
        {
          value: "price6",
          label: "200元/㎡/月以上",
        },
      ],
      //资产状态
      zcStatusValue: "",
      zcStatusOptions: [
        {
          value: "status1",
          label: "闲置",
        },
        {
          value: "status2",
          label: "已租",
        },
      ],
      //资产性质
      natureValue: "",
      natureOptions: [
        {
          value: "nature1",
          label: "资产性质1",
        },
        {
          value: "nature2",
          label: "资产性质2",
        },
      ],
      //行政区域下拉框
      regionValue: "",
      regionOptions: [
        {
          value: "region1",
          label: "江北",
        },
        {
          value: "region2",
          label: "渝北",
        },
        {
          value: "region3",
          label: "沙坪坝",
        },
        {
          value: "region4",
          label: "南岸",
        },
      ],
      //公司下拉框
      companyValue: "",
      companyOptions: [
        {
          value: "company1",
          label: "公司1",
        },
        {
          value: "company2",
          label: "公司2",
        },
        {
          value: "company3",
          label: "公司3",
        },
        {
          value: "company4",
          label: "公司4",
        },
      ],
      //遍历行政区划
      currentDistrict: [{}],
      //第一层级-区域-点
      regionPoints: [
        {
          id: "shapingba",
          type: "quyu",
          name: "沙坪坝",
          lng: 106.410128,
          lat: 29.649487,
          color: "white",
        },
        {
          id: "jiulongpo",
          type: "quyu",
          name: "九龙坡",
          lng: 106.331737,
          lat: 29.528445,
          color: "white",
        },
        {
          id: "yubei",
          type: "quyu",
          name: "渝北",
          lng: 106.640209,
          lat: 29.728316,
          color: "white",
        },
        {
          id: "jiangbei",
          type: "quyu",
          name: "江北",
          lng: 106.744154,
          lat: 29.666058,
          color: "white",
        },
      ],
      //第二层级-街道点
      street: [
        {
          id: "xiaolongkanjiedao",
          type: "jiedao",
          name: "小龙坎",
          lng: 106.474873,
          lat: 29.559756,
        },
        {
          id: "shapingbajiedao",
          type: "jiedao",
          name: "沙坪坝",
          lng: 106.45452,
          lat: 29.585423,
        },
      ],
      //项目点
      project: [
        {
          id: "Axm",
          type: "xm",
          name: "A项目",
          lng: 106.45652,
          lat: 29.585223,
        },
        {
          id: "Bxm",
          type: "xm",
          name: "B项目",
          lng: 106.45452,
          lat: 29.585423,
        },
      ],
      //第四层级-资产点
      property: [
        {
          id: "Adc",
          type: "zc",
          name: "A地产",
          lng: 106.45752,
          lat: 29.585323,
          status: "在租",
          zcType: "xxxx类型",
          adderrs: "重庆市九龙坡区石桥铺渝高C座",
        },
        {
          id: "Blp",
          type: "zc",
          name: "B楼盘",
          lng: 106.45452,
          lat: 29.585423,
          status: "待租",
          zcType: "xxxx类型",
          adderrs: "重庆市九龙坡区石桥铺",
        },
      ],
      markerList: [],
      message: "点击或长按此处",
      showmap: false,
      // 地图初始化信息
      loading: false,
      styleJson: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: {
            color: "#57afacff",
          },
        },
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: {
            color: "#1a3547ff",
          },
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: {
            color: "#15223bff",
          },
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: {
            color: "#e9eeed00",
          },
        },
        {
          featureType: "land",
          elementType: "all",
          stylers: {
            color: "#101b2eff",
          },
        },
        {
          featureType: "building",
          elementType: "geometry",
          stylers: {
            color: "#273d64ff",
          },
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: {
            color: "#185790ff",
          },
        },
      ],
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    streetChange(value) {},
    //初始化地图
    initMap({ BMap, map }) {
      var that = this;
      this.BMap = BMap;
      this.map = map;
      let mapStyle = { styleJson: this.styleJson }; //自定义地图主题样式
      this.map.setMapStyle(mapStyle);
      this.zoom = 10;
      // that
      //   .$jsonp(
      //     `https://api.map.baidu.com/geocoding/v3/?address=${this.installationAddress}&output=json&ak=WSkEiRUVGv6HjNGHCiKFfId5E6njHRxa&callback=showLocation`
      //   )
      //   .then((res) => {
      //     this.center.lng = res.result.location.lng;
      //     this.center.lat = res.result.location.lat;
      //     this.content = this.installationAddress;
      //   });
      //默认层级
      this.map.setZoom(this.zoom);
      this.map.addEventListener("zoomend", function (e) {
        that.changeZoom();
      });
      //初始化区级标注
      this.getMarkerInof("", "all");
      this.initMarker(this.markerList);
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
    //移除行政区划边界
    changenotshow() {
      this.showmap = false;
    },
    //通过缩放触发 - 根据当前层级设置显示内容
    changeZoom() {
      //清空标注
      this.map.clearOverlays();
      //自动获取当前的zoom值
      var view = parseInt(this.map.getZoom());
      //根据当前层级进行地点的增删
      //区域
      if (view <= 10) {
        this.getMarkerInof("", "all");
        //街道
      } else if (view >= 11 && view <= 12) {
        this.getMarkerInof("", "quyu");
        //项目
      } else if (view >= 13 && view <= 15) {
        this.getMarkerInof("", "jiedao");
        //资产
      } else if (view >= 16 && view <= 21) {
        this.getMarkerInof("", "xm");
      }
      //根据加载标注
      this.initMarker(this.markerList);
    },
    /**
     * 标注点击事件
     * 1.通过点击事件触发-设置下一级缩放
     * 2.通过标注id和标注类型获取标注列表
     * 3.根据层级，设置缩放层级
     * @param e
     */
    markerClick(e) {
      let markerId = e.currentTarget.markerId;
      let markerType = e.currentTarget.markerType;
      this.getMarkerInof(markerId, markerType);
      //自动获取当前的zoom值
      var view = parseInt(this.map.getZoom());
      //根据当前层级进行地点的增删
      if (view <= 10) {
        this.map.setZoom(11);
      } else if (view >= 11 && view <= 12) {
        this.map.setZoom(13);
        //街道
      } else if (view >= 13 && view <= 15) {
        this.map.setZoom(16);
        //项目
      } else if (view >= 16 && view <= 21) {
        this.map.setZoom(17);
        //资产
      }
    },
    //全景图
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
    initMarker(itemList) {
      // 创建标注图标
      var myIcon = new BMap.Icon(
          "data:image/png;base64,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",
          new BMap.Size(50, 72)
      );
      var than = this;
      let zoom = this.map.getZoom();
      //循环添加标注
      for (var i = 0; i < itemList.length; i++) {
        const temp = itemList[i];
        const tPoint = new BMap.Point(temp.lng, temp.lat);
        let tMarker = null;

        let label_color = this.label_color_zc;
        if (temp.status == "待租") {
          label_color = this.label_color_dz;
        }
        //街道以上显示图标，街道已下显示名称
        if (zoom <= 12) {
          tMarker = new BMap.Marker(tPoint, { icon: myIcon });
        } else {
          var myIcon2 = new BMap.Icon(
              "data:image/png;base64,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",
              new BMap.Size(20, 30)
          );
          tMarker = new BMap.Marker(tPoint, { icon: myIcon2 });
        }
        var label = null;
        if (zoom >= 13) {
          //添加文字lebel
          label = new BMap.Label(temp.name, {
            offset: new BMap.Size(0, 0),
          });
          //设置lebel样式
          label.setStyle({
            color: "#fff",
            backgroundColor: label_color,
            borderRadius: "10px",
            padding: "0 10px",
            fontSize: "14px",
            lineHeight: "20px",
            border: "0",
            transform: "translateX(-50%)",
          });
          //显示文字
          tMarker.setLabel(label);
        } else {
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
          //显示文字
          tMarker.setLabel(label);
        }

        //16级以上，代表是资产，点击事件不在下钻，改为打开全景图
        if (zoom >= 16 && zoom <= 21) {
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
        if (zoom <= 10) {
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
        this.map.setCenter(tPoint);
        //打点
        this.map.addOverlay(tMarker);
      }
    },
    initInfoWindow(marker) {},
    /**
     * 此处根据标注id和标注类型在，在通过接口获取标注信息
     * @param markerId
     * @param markerType
     */
    getMarkerInof(markerId, markerType) {
      //通过接口获取数据
      //模拟接口数据
      if (markerType == "all") {
        this.markerList = this.regionPoints;
      } else if (markerType == "quyu") {
        this.markerList = this.street;
      } else if (markerType == "jiedao") {
        this.markerList = this.project;
      } else if (markerType == "xm") {
        this.markerList = this.property;
      }
    },
    infoWindowClose(e) {
      this.infoWindow.show = false;
    },
    infoWindowOpen(item) {
      this.infoWindow.title = item.name;
      this.infoWindow.status = item.status;
      this.infoWindow.zcType = item.zcType;
      this.infoWindow.adderrs = item.adderrs;
      this.infoWindow.position = { lng: item.lng, lat: item.lat };
      this.infoWindow.show = false;
      this.infoWindow.show = true;
    },
    clear() {
      this.infoWindow.contents = "";
    },
  },
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
  font-size: 18px;
  /*font-weight: bold;*/
  text-align: left;
  background: transparent !important;
}

.BMap_pop .BMap_top {
  background: #3f4358 !important;
  border: 0 !important;
}
.BMap_pop .BMap_center {
  border: 0 !important;
  background: #3f4358 !important;
}
.BMap_pop .BMap_bottom {
  border: 0 !important;
  background: #3f4358 !important;
}

.BMap_pop div:nth-child(3) {
  background: transparent !important;
}
.BMap_pop div:nth-child(3) div {
  border-radius: 7px;
  background: #3f4358 !important;
  border: 0 !important;
}
.BMap_pop div:nth-child(1) {
  border-radius: 7px 0 0 0;
  background: transparent !important;
  border: 0 !important;
}
.BMap_pop div:nth-child(1) div {
  background: #3f4358 !important;
}
.BMap_pop div:nth-child(5) {
  border-radius: 0 0 0 7px;
  background: transparent !important;
  border: 0 !important;
}
.BMap_pop div:nth-child(5) div {
  border-radius: 7px;
  background: #3f4358 !important;
}
.BMap_pop div:nth-child(7) {
  background: transparent !important;
}
.BMap_pop div:nth-child(7) div {
  border-radius: 7px;
  background: #3f4358 !important;
}

.BMap_pop div:nth-child(8) div {
  /*border-radius:7px;*/
  background: #3f4358 !important;
}
/*窗体阴影*/
.BMap_shadow div:nth-child(5) img {
  margin-left: -1100px !important;
}

.BMap_shadow div:nth-child(4) {
  width: 262px !important;
}
/*下面箭头替换为自己本地修改过的*/
img[src="http://api0.map.bdimg.com/images/iw3.png"]
{
  content: url("../img/Screen/arrow.png");
}
img[src="https://api.map.baidu.com/images/iw3.png"]
{
  margin-top: -692px !important;
  filter: alpha(opacity=70);
  content: url("../img/Screen/arrow.png");
}
</style>

<style scoped>
@import "@/css/map2.css";
/* 隐藏百度图片Logo */
/deep/ .BMap_cpyCtrl {
  display: none;
}

/* 隐藏文字信息 */
/deep/ .anchorBL {
  display: none;
}
/* 修改dialog背景色 */
/deep/ .el-dialog {
  background-color: #f5f5f5;
  border: 0;
}
</style>
