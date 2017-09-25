// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
// ajax
import Qs from 'qs'
// 三级联动
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);

import VPage from './components/v-page'
Vue.component('v-page', VPage);

/* axios 全局配置 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://115.182.107.203:8088/xinda/xinda-api';

axios.interceptors.request.use((config) => {
  config.method == 'post' ? config.data = Qs.stringify(config.data) : '';
  return config;
}, function (error) {
  return Promise.reject(error);
});

Vue.prototype.ajax = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});


