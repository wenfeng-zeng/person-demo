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
import particlesJS from 'particles.js'
Vue.use(ElementUI).use(Vant).use(particlesJS)
// import './wx'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
