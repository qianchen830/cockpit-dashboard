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
      <div class="block">
        <el-cascader
            v-model="streetValue"
            :options="streetOptions"
            @change="streetChange"
            placeholder="街道"
        ></el-cascader>
      </div>
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
    <baidu-map
        class="map"
        :center="center"
        :zoom="zoom"
        @ready="initMap"
        :scroll-wheel-zoom="true"
    >
      <!-- <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type> -->
      <bm-map-type anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <bm-panorama></bm-panorama>
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <bm-marker
          :center="center"
          :dragging="true"
          animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
            :content="content"
            :offset="{ width: -95, height: 30 }"
        ></bm-label>
        <bm-context-menu>
          <bm-context-menu-item
              :callback="getPosition"
              text="获取坐标"
          ></bm-context-menu-item>
        </bm-context-menu>
      </bm-marker>
      <!--    //遍历地点坐标-->
      <!--      <bm-marker
              id="maplist"
              v-for="(item, index) in regionPoints"
              :key="index"
              :icon="{url: 'data:image/png;base64,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', size: {width: 50, height: 72}}"
              :position="{ lng: item.lng, lat: item.lat }"
              :dragging="false"
              @zoomend="updateZoom"
              @click="markerClick"
              @mouseover="changeshow"
              @mouseout="changenotshow"
            >
              <bm-label :content="item.name" :labelStyle="{background: 'none', color: '#fff', border: 'none'}" :offset="{width: getWidthSize(item.name), height: getHeightSize(item.name)}"/>
            </bm-marker>-->
      <!--    //遍历行政区划-->
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
            <span>实时资源面积</span>
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
            <span>实时资源数据</span>
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
                ><i class="iconfont icon-rent icon"></i
                >本年：资源出租情况（房间）
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
                ><i class="iconfont icon-amount icon"></i
                >本年：租金情况（房间）
                </span>
                <div class="row align-end text-underline">
                  <span class="num">0.00</span><span></span>
                </div>
                <span class="desc">平均租金单价(元/个/月)</span>
              </div>
            </div>
            <div>
              <div class="block collect">
                <span class="title"
                ><i class="iconfont icon-shoujiao icon"></i>收缴情况
                </span>
                <div class="row align-center">
                  <span class="num">0.00</span><span class="num">%</span>
                </div>
                <span class="desc">收缴率</span>
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
  name: "Map",
  props: {
    markerdata: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    HelloWorld,
  },
  watch: {
    // zoom(newZoom) {
    //   this.draw(newZoom);
    // },
  },
  data() {
    return {
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
      //地址搜索
      address: "",
      //街道选择器
      streetValue: "",
      streetOptions: [
        {
          value: "chongqing",
          label: "重庆市",
          children: [
            {
              value: "shapingba",
              label: "沙坪坝",
              children: [
                {
                  value: "pianqu1",
                  label: "片区1",
                  children: [
                    {
                      value: "jiedao1",
                      label: "街道1",
                    },
                    {
                      value: "jiedao2",
                      label: "街道2",
                    },
                  ],
                },
                {
                  value: "pianqu2",
                  label: "片区2",
                },
              ],
            },
            {
              value: "jiangbeiqu",
              label: "江北",
            },
            {
              value: "yubeiqu",
              label: "渝北",
            },
          ],
        },
      ],
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
          id: "1",
          name: "沙坪坝",
          lng: 106.461016,
          lat: 29.549204,
          color: "white"
        },
        {
          id: "2",
          name: "九龙坡",
          lng: 106.511231,
          lat: 29.508933,
          color: "white",
        },
        {
          id: "3",
          name: "渝北",
          lng: 106.640209,
          lat: 29.728316,
          color: "white",
        },
        {
          id: "4",
          name: "江北",
          lng: 106.578118,
          lat: 29.614842,
          color: "white",
        },
      ],
      //第二层级-街道点
      street: [
        {
          id: "123",
          name: "小龙坎街道",
          lng: 106.474873,
          lat: 29.559756,
        },
        {
          id: "456",
          name: "沙坪坝街道",
          lng: 106.45452,
          lat: 29.585423,
        },
      ],
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

  methods: {
    streetChange(value) {
      console.log(value);
    },
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
      var myIcon = new BMap.Icon("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAABACAYAAABRPoQBAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAANqADAAQAAAABAAAAQAAAAACF0TvLAAASP0lEQVRoBbVaaZBdxXXu5S5vljeLRsxIGpCEAAsZF1lYYoMFkiHgQDAGByGbsCiQH0kqVU658iex4xinyD//SSVxMC6nUoBk8KZCttlsgcsuNhkMRthIAlkEaSQN0sy8N8u7S3fnO31vP915c9/MaEm/uvec233O6XNOnz7dt9/l7P+jPPnd5UynlzLOL2DM9KOLfmYAuegQjE1oZsYEZ2NM8w+Av7FCdb526Kabps+kKvxMCav88LurEqGuVdpcyjkbNuakJCtm2Fsw/GWmK8+wM2Dk6Ru2fesKJsXnGOPrMSqcYUiYxkWwpFCHZHO7jtE2KTX/npLdT7AbbohKRCyqqp38hZl3PtbN6noLl+Iao43guSEGRhFOsKy4tnb0rl0IMy6YeDS9cdOTZXIWqjs1wxB2Qqf/CO8uM/A/x48gFYcTtKVlBOca7savnJ9L9rM1rPpv+05y9E7aMG/H1itSxj/PDatkmpMIpxxh8xt6su1ZH+xdFgQPsOtvPZo/LwhOyjC5Y9utyrB7nCkk3eEnJaiglnNJNl7t5SEm6gEPvtT408+8W2Bvi7aZ4nPpvR99+0oNo7LMQO00idxEcpDqW4trK6fnuQyCRdxJMXk7loVqw0Rf7N3xCC0fC5ZFGRb+aNt5Spm/I2lZ2sugS4EOWkNt1oARBF0GcbBEHbcsEMxwmGCHL3OEk00Q19I6E/9wya5dfomoWVULGkYeSlLzRSgZNJV1SjuFHYRoLLy2ELQ4lHTQTkXLC5JchiUHTjBnbUIryMnO6ZGB1752cM/f2rZ5bgsaVld8C+J7oK0MNzkI4kK4NqHF8ehgWxnFhhZ5tsnV4YEUxmq5wd++9dIiWys+r2GV729dzQW/WiMqiNAS57gNfYoWKg4Wcaoru4o0wJ0Ci5VPulBRxtxlaEPQpji5pc2xYHdqlTGTQCfUQWJyApqKFepse04gAO0FOU2YyxQ5dHIdtPxoc5DoHC8W8tX+jm1XZ61z706vOS3B97at48ZcZoUWWh0DQbo04sxBwikOHSziVGevvB0pAgOaxZiD1M0c+Xkd2WcvkkM4QaXvuO2xxyQe5xRvTk1eYYTemKHUOY24UyKrJeFUrFFocwpltcW7420XNXPlZzIzGQ538qlfYZ1iNRra3qnXoerNYo+EO/rWevImRsspnEFH7OAcJlQ4g61XLUHm4cwxbpQymI0a8WQ0mdKZDOqDLo2fg0XctSuVXm67ablR+5wSfn/beai0mVDn6ZYgXbaTHDpmB0mQwwkWcWqjUqxzNEVYpLEMWaA4v9gq+KFQuJ0uhQqLun5m1acivsytM5ZgHkNmMdIDaG0hiMs6JodF3Mkv1hVx125fG8BPsIi7dky24U56dWoppYZxLVa20J14JIWpEMwVdtAqhiYHicx1QLCIUxuVYl0Rz1pxb+nP1ru6nChJ1Rx9y5MHp1f5puh5kTnKwF5Kyc3J1srt2hwj+cnVEa3D27WXyNMC+raUUsOMmkvY5FtMx6RsXtyLI0Eq5GxXl9XgXqBv4nmdo23HT7lWGLNENYVliPPL7GqMGDG4BO2gJXJKEMRl23Lo6Bwso4dpuSEUEvTuRiWDjs9B22LXRnII3uQKuGUjTvSNLcTiRgwvkU2DXScOtr4ouoh1sPUNmuqJd3Y71WUSW+VRC9XlLrN02VM5vZWjtVMPfFlpGuAqCELwcRJe9svbm+ROIsEi3iSwSmZcmXmkZvFybRlHUQbhpIODRZzqXD3n4njGfeJeahjneswxLgRJFNG4go2pRQnSZTvPoaNzMCOkmEaxMUU4+G3Wy4zPaNuHKrVzYcZIRLGUJg8EbdMDBp3AI1AyV6DIDdy1EaSCM8VZsJW/lT6jbn9v5W+lJHk4y1ycYYLzgzr3vPOug62Cybu2rZ3hNF0tTR4cDs/p7RuyqyPhDm+2u7q8Z3IgteWOJNyX4ftp3uxA3pt7zCDOHl6BG/DSk4+Sg2guZqYi3pTgBpagxXFzsDWXWybbmBNj12gzXwZL5ecGW+OAw/9HZj792f9t9p8jpYY1brlrL+J2HGZAqSzWLQSeZaEMuszmYKvwRT3nKfyEfHDZfjAouQAHy+QJw14prS+r5BwJn/FdixLdotgsZ5Q4xhnQhKSAk2GVcWYQxGXbckh468XMy5at5VY6YpYmVc9bJWnAbKbKgD1CsoOIWz4Pm9AynuatKLOIl4hFojp+5Vmr57yLEWlbw5LN976OA683rDxrXInksipHa40HwclCGijiIVjES+RAv0ef27ixNW+AcR7DqJFr/j8E5y3UIRXXscNt5SncFikP8/rgp0znT9r10HbEiCHafPcerGAvtGM+M/WLtKSlM3A9/PimTa173ybVvIYRVeB730RE1E4MiRuadpC4nLKEL1Qo3qi0iz1qmy0P6+xL6e33/IJa2pUFDZu89a6jXPJ/xYKIWC4q0U6kU6Kd4S31NkGgjmBpsiB6KhkfTs4ODLLOr2V17e8LGkas8Z/ds1tq9fXSjlsWzKx/LLqZHlnPTjd6cni79oyj9I59fy0MvK++v2nTTClBoXJRhhF9tPnep7nRP8gUKyhutzggIGi3OWhzkHYa1pACfbGubCcyx1HES5eJsb4+QBFU0L8t6mKrLUFrg7/1m39pOL8JhyhZE7mG0EW7qEWi483FWTmuzpLaDmJkwa/SEtTC3fbxpA0jSTDuXryS3Fwmlc47yGZ77gEChzs/lPEU6+by8yj0xP1Tm7b8uki3EH5KhpHQyqPf2IJ9/S3Ouc7hC3XYOsDz8WNn0cB1f7z5vtLdxXx9nbJhJNR/9KG7IeAzTrmyjlybM3whw5rtnM8wyb8Sb/qLt8rkLlR3WoaRcH/rQ3diy3xbO8VbFVjI0IweRjHx5fhzW37byr/Y59M2jDoKHnnwDmTC2wmnc3j6U5VgWWmOSLORVCDaTBXM3Wnhiy9Hm+59u0lyCsgZMYz6DR55aDN0wxc6Tkln2GzFW9vpLYT+yiWIzDclmPyn6I4te0/BllksZ8wwa9yjD27CkcKf45QdI5YFp8MJUsn+MSlr51M4Wv9SdOd9+yzhad5OyzCEjeUf2PfjqtH8YpWmK9OR+kY1Hl0F90sblVmMgc5kluGdATrbDRRoNNcmxZatxpf3Puyd1f3LejT+OvvwbVN23O0L76lZeFKGkSGcPS7Yr/xqfyVcryNzUZqqARYn/XjFSWAIDoxwrlRrrNHTjXV4Bv2JLuhcsFnyc1FsUmLZ3/OiCLw684yHuSpNICYC4Y2qqniD/zZ9afzGG3FMAQ+dhKEnem32OBe5aPdjQXSgmx87V13HEv7hpKFX8DiOjRERrcDQ3+Nc9RjFcelB3uEdVR/UP8oSU8Hfqd3C43Wd6F4khXGT6j7uSYK9IpTH8fowIqqVAyw1qZBsFLJmdKqVkPhbX7LQVHzfr8gRrtTry73op6Td7os2xXO1nF0zr2FLt2+vrhoebrzTMfonRqvL9VQqdZSMa8VjdNvNkuR8ptiQ6PAOqCjpDKud4ypJ63omHkVoTqnJmXUmTq6Cr2mo3HBRnzh1Ew3RFfxQVoJI9oQ9LNYXwEVHdBSv4dKfNErVDPf2gzIWng5FRfbLriCWHfJ5/mb8cjAs1KFL23+8WWrYJbv+y6/WP2R+1Ts9zAJ2p5qMO9OZ5IiJ9BRL9Wpe8fvw2V2/V6n8LBqtTwYDlbUQdDCdSX9nZsxxfBk3JVKexIFKVT25Wpj0jvz0ESkEAclZTXvh1zp8Dgf4vgp0lXcEA0Eo12imlqpaulcOhOfhk8FqdGRqpfG8F+GJCfTb7XXy5V7VG9PH2INwgvjCNbeM/TOOrmePVzaxZ9XRPOp4ctuq6kf6vehY8ldqMhpVM+kRPRkv415Y87r9s/1lHW83dh+ls4YgPLdPely8OzUS7/O4mvZq9RUe/jiE95ciMXRiWgQRMxfF2lxBHUmk9IpgO7gRH2A2Ys2So0rwA3EYHlUy7OoY6lir02h141CNez2Vd4LVfWuig3WWjk5tNJVwh6xwDxGyzK8GS1hHx3/0H5SHLtswmjzOZ79Nzzri3rBzp9f97PZ1Z5/fu2d0TN2vavERNZ2M6BmTwtG+18XHggGfN946theKfcxI86p/VvdQOhW/01U7+odIHZfj7ZYzlUxiZKYwMg3w1SuG/9wTZh++nBv0Gd/LtU4MDEaa7OdxOiw9sb4STyvuT7+QVJe+GVTk8uRgfVRNRFdA2DcqS4IbZhrqOypKha6ZZSwR76c6hgB+b9fo9Fe2P+3N+XIgT8HZoI0ODoq/v/bm3ceYd1s6GSuE0aieVmsxcQcR97/kHGMhvUmsqAmd9DC4OhmfGQ3fH38AI3MLwtFHIq9jSo0jG45xw8eEEMe15GNSy92BkTsRi4eoDsFznGjwPEEvkHBHyIy83T808i96ZOY9SoGQZcyEX0e0RpDVQARM4A061WkyBYePxpOJN3Jp96dunkh/00kfWBfKLMP2vfebjRSvphGdx5J0AkmiYYT4HfPEXnwtksDP0zpJu7s/MojUzt+BcWv07qPXwwkr+PLuQd0b9phOP1BhIDUmoQ6EAkwxQinHxLMXcKqjNoVPT1QopQ79ikYCMUOdQ1gDh+MDx/8YnxSdg9HfEa4UV6jaDD4x0gljnsJ8ew+jfA2+GJo2KRJMZC6gQx0lgu6CXWxWKJ5zfudz2bKf/5EmFRNR/PvM8w6S99RMNJPUxAj3oqsrfzB0eGr/xIvs2NSFyUzawQ+l07y7soQvCfsxIuMmTkdVrCe00A1uOhKZKHuipHwpMbcCjEdF+H4fC8QglogeNYEPnA5PY2eFeYmU37Wu7zlZDf9o5tCUp+rqEFcmNgLfHmMvaUL/p9jC4Gs8ZFvDBX2d84SIZ51YzTLs8P7GR4eeempXFOj9PDAXIM0Gygtfgu8vxJfab3LFVFqbnuBpkMqqGuha0XEjO7dvD99/tE9/EA+aeoMlk5wW6Q4u5VnM50uE7xnj4TufirTRIVL81ZBgJafUE0+hf6yBDK/9GA4Z8kQMdL1qVvWPqlp0fXRw6oipJ4fhmoZdLfDPJaTfhm32M6LCQ+nLHh7I13aGYSe+swLNiTIn3Xc888RKUdWR1+V9IT3eOKKn00N6Jh3GnuM97NqPMYEVmfvceNwLQtHFOr0e6ZteqLtWxskqJIsQ3sRc0HXED9KOwSKOtGEwq2gL5tE2DF9seH7FdPgdTKkeqNODOTWtAvmuZnKPipNxpJ66SuMGOZPUxahCrr7OBOHz2Jt0yW5/OOgL+hu1yn/y6enB6etuxn8NJ8ocw1bv/FZlXPcMmeHqWSyKNqeT6YiaTA+z6Xit4mwfV2kkRPABZgecjZThMSkFxhcbBOHJDkRGL1bxs6H8Usl0J4IHIcN82p1Qt7SFQvZMEYox5tEURIymzHsfM7uG6RfpyI9Y2kiRdTGmZBMmotGf0D5/BQ7rFh2cy85wmVcNBs2U+smSqOe5/Rs2RKTKCbNK1jHXGD71g5uq51R2JSb9GzOJ7W1DHzIz8bieij6G9eTnIk5/DzuDVzAKEeMwGfsrJj2JbxPwdQJOLqCZBG4jzQl1kOYr7GPawyjSP+OYzBqRgP0XnEUX5GEqptEmFnjPIvSqXkgLtOxDJA1jOxnINP33eEz3Tl5/a+mxAdxRXtTD2/asu3h9dNTvGqosq+zHZ1wf5xWK7OA9iV25ZkmE6JrhqfprqP9rTOr1CLIRODlAGDRQjw90MOUxOiWXgi8UaBRGCrLYMuwLp3lqbjKSH8FY3YKsOeoF4m2vIj1sCjq87nAl5tOHeOi/moyqFy5RPXv2XHvD4XLt5xmxIgNlnR8PVK72h/zBpJbeKgP1LpJvDekW2U9NY8samVhXtUzGeGQ+oT32ikz0lYbL1+GCNQhDKGCquNYgcLcjFD+L/1e/xWN1nwn4f/NErzeh96JE9kBGYSKsBNxX3cjGSxDevVi5lmKH8ovoaPL0zCc/faA17Iq6OnzOHHMN7SB9Qf0mO7rST/Tn/U52OK6bq7zQvJZEaZ8UYh9SeYydPK1zCYIqpRDDXMqSBwmlEKVQw5qAKMAMRSbyeIi4DbDorfakSbSR58hQ7oGzpkxS+Xbt49fsXYwxRZ1P2rAiM+HQmQ/tf2mwcfzYZm+g83A0Mnl30Cd2RsfUzX5VvJhO6osxEO+oxKzCxmzAr+pnseG6NuiVT8c1vSHok0+ndXWhrMrneCoa2BI/M3rRjW1DrLX/ds//B+C/4GFqIU5fAAAAAElFTkSuQmCC", new BMap.Size(50, 72));
      var than = this;
      //区
      for (var i = 0; i < this.regionPoints.length; i++) {
        const temp = this.regionPoints[i];
        const tPoint = new BMap.Point(temp.lng, temp.lat);
        const tMarker = new BMap.Marker(tPoint,{icon:myIcon});
        tMarker.addEventListener("click", function (e) {
          than.markerClick(e);
        });
        let top = 15;
        let fontLength = temp.name.length
        if(fontLength>3){
          top = 5;
        }
        var label = new BMap.Label('<div style="width: 45px;white-space: pre-wrap;text-align: center;">'+temp.name+'</div>', {
          offset: new BMap.Size(4, top)
        });
        label.setStyle({
          background: 'none', color: '#fff', border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
        });
        const center = new BMap.Point(this.center.lng, this.center.lat);

        tMarker.setLabel(label);//显示文字
        this.map.setCenter(center);
        this.map.addOverlay(tMarker);
      }

    },
    getWidthSize(v){

    },
    getHeightSize(v){

    },
    getPosition(e) {},
    changeshow(e) {
      this.showmap = true; //使false变为true显示
      new this.BMap.Geocoder().getLocation(e.point, (res) => {
        console.log(res.addressComponents.district, "result.addressComponents");
        this.currentDistrict = [];
        //获取当前位置的经纬度
        this.currentDistrict.push({
          lng: e.point.lng,
          lat: e.point.lat,
          name: res.addressComponents.district,
        });
      });
    },
    changenotshow() {
      this.showmap = false;
    },
    updateZoom(e) {
      this.zoom = e.target.getZoom();
      console.log("当前所在的层级" + this.zoom);
    },

    initMarker(){

    },

    //设置第一层点击监听事件
    markerClick(e) {
      //自动获取当前的zoom值
      var view = parseInt(this.map.getZoom());
      this.map.clearOverlays();
      //根据当前层级进行地点的增删
      // 创建小车图标
      var myIcon = new BMap.Icon("data:image/png;base64,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", new BMap.Size(50, 72));
      var than = this;
      if (view >= 10 && view <= 11) {
        //区
        for (var i = 0; i < this.street.length; i++) {
          const temp = this.street[i];
          const tPoint = new BMap.Point(temp.lng, temp.lat);
          const tMarker = new BMap.Marker(tPoint,{icon:myIcon});
          tMarker.addEventListener("click", function (e) {
            than.markerClick(e);
          });

          let top = 15;
          let fontLength = temp.name.length
          if(fontLength>3){
            top = 5;
          }
          var label = new BMap.Label('<div style="width: 45px;white-space: pre-wrap;text-align: center;">'+temp.name+'</div>', {
            offset: new BMap.Size(4, top)
          });
          label.setStyle({
            background: 'none', color: '#fff', border: 'none'//只要对label样式进行设置就可达到在标注图标上显示数字的效果
          });
          tMarker.setLabel(label);//显示文字

          this.map.setZoom(12);
          this.map.setCenter(e.point);
          this.map.addOverlay(tMarker);
        }
      } else if (view >= 12 && view <= 15) {
        //街道
        this.map.setZoom(16);
        this.map.setCenter(e.point);
      } else if (view == 16) {
        //项目
        this.map.setZoom(17);
        this.map.setCenter(e.point);
      } else if (view >= 17 && view <= 21) {
        //资产
        this.map.setZoom(21);
        this.map.setCenter(e.point);
        //展示街景
      } else {
        console.log("view:else");
      }
    },

    method() {},
  },
};
</script>

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
</style>
