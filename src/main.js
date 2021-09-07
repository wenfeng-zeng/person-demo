// import Vue from 'vue'
import App from './App'
console.log(VueRouter);
import routes from './router'
const router = new VueRouter({
  routes
})
import store from './store/store'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import utils from '@/utils/utils'
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.$utils = utils
import particlesJS from 'particles.js'
// Vue.use(ElementUI).use(particlesJS).use(VueAMap)
Vue.use(particlesJS)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
