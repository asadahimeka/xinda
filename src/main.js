// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.ajax = axios;

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false;

// 全局配置
axios.defaults.baseURL = 'http://115.182.107.203:8088/xinda/xinda-api';



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
