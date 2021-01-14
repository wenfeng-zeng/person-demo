// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import utils from '@/utils/utils'
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.config.devtools = true
// import VConsole from 'vconsole';
// new VConsole()
Vue.prototype.$utils = utils
import VueAMap from 'vue-amap';
import particlesJS from 'particles.js'
Vue.use(ElementUI).use(Vant).use(particlesJS).use(VueAMap)
// import './wx'
/* eslint-disable no-new */
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '0bea50b4d93ba7cbb1325e705f2010da',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ElasticMarker', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
