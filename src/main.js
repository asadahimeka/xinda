// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import qs from 'qs';

import { Alert, Loading, MessageBox, Message } from 'element-ui'
import { Toast, Indicator, Badge } from 'mint-ui'
import VPage from './components/v-page'

//ElementUI
Vue.use(Alert)
Vue.use(Loading.directive)
//MintUI
Vue.component(Badge.name, Badge)
//Pagination
Vue.component('v-page', VPage);

//axios config
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data);
    return config;
}, function (error) {
    return Promise.reject(error);
});

Object.defineProperties(Vue.prototype, {
    '$ajax': { value: axios },
    '$baseUrl': { value: 'http://115.182.107.203:8088/xinda' },
    '$isPC': { value: /Android|iPhone|iPod|BlackBerry|SymbianOS|webOS/i.test(navigator.userAgent) ? false : true },
    '$loading': { value: Loading.service },
    '$msgbox': { value: MessageBox },
    '$alert': { value: MessageBox.alert },
    '$confirm': { value: MessageBox.confirm },
    '$prompt': { value: MessageBox.prompt },
    '$message': { value: Message },
    '$toast': { value: Toast },
    '$indicator': { value: Indicator },
    '$errImg': { value: () => event.target.src = "static/images/error.png" },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});