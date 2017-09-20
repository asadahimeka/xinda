// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';
import qs from 'qs';

// axios全局配置
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data);
    return config;
}, function (error) {
    return Promise.reject(error);
});
Vue.prototype.ajax = axios;

Vue.use(VueAwesomeSwiper);
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  template: '<App/>',
  components: { App }
})
