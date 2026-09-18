import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map-v3'; //引入百度地图
import * as echarts from 'echarts'; //引入echarts 绘图工具
import 'echarts-gl';
Vue.prototype.$echarts = echarts;

import 'amfe-flexible'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);


import '@/css/app.css';
import * as filters from '@/filters'

process.env.VUE_APP_MOCK ? require('@/mock') : undefined
import { VueJsonp } from 'vue-jsonp';

Vue.use(VueJsonp);

//引入百度地图全局变量
Vue.use(BaiduMap, {
  ak: 'WSkEiRUVGv6HjNGHCiKFfId5E6njHRxa'
});

import TitleComponent from '@/views/largeSizeScreen/components/TitleComponent.vue'

// 注册全局组件
Vue.component('TitleComponent', TitleComponent);

Vue.use(ElementUI, { size: 'small' });

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
