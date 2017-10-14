// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import qs from 'qs';
import VueAwesomeSwiper from 'vue-awesome-swiper'

//swiper
Vue.use(VueAwesomeSwiper);

// import ElementUI from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { Input, Button, DatePicker, Breadcrumb, BreadcrumbItem, Tabs, TabPane, Alert, Icon, Upload, Progress, Rate, Steps, Step, Loading, MessageBox, Message, Notification } from 'element-ui'

// Vue.use(ElementUI);
Vue.use(Input)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Loading.directive)
Vue.use(CollapseTransition)

// import MintUI from 'mint-ui'
import Msgbox from "mint-ui/lib/message-box";
import { Toast, Indicator, Badge } from 'mint-ui'

// Vue.use(MintUI);
Vue.component(Badge.name, Badge)

//地區選擇插件
const VDistpicker = () => import('v-distpicker');
Vue.component('v-distpicker', VDistpicker);

//分页插件
const VPage = () => import('./components/v-page');
Vue.component('v-page', VPage);

// axios全局配置
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data);
    return config;
}, function (error) {
    return Promise.reject(error);
});

Object.defineProperties(Vue.prototype, {
    '$ajax': { value: axios },
    '$isPC': { value: /Android|iPhone|iPod|BlackBerry|SymbianOS|webOS/i.test(navigator.userAgent) ? false : true },
    '$loading': { value: Loading.service },
    '$msgbox': { value: MessageBox },
    '$alert': { value: MessageBox.alert },
    '$confirm': { value: MessageBox.confirm },
    '$prompt': { value: MessageBox.prompt },
    '$notify': { value: Notification },
    '$message': { value: Message },
    '$toast': { value: Toast },
    '$indicator': { value: Indicator },
    '$messagebox': { value: Msgbox },
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