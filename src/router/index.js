import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

// ElementUI插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// 模块组件
import mmShopList from '../views/mmShopList.vue'
import mmShop from '../views/mmShop.vue'
import mmProperty from '../views/mmProperty.vue'
import mmPartners from '../views/mmPartners.vue'
import mmService from '../views/mmService.vue'
import mmsearch from '../views/mmsearch.vue'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/shoplist',
      name: 'mmShopList',
      component: mmShopList,
    },
    {
      path: '/shop',
      name: 'mmShop',
      component: mmShop
    },
    {
      path: '/property',
      name: 'mmProperty',
      component: mmProperty
    },
    {
      path: '/partners',
      name: 'mmPartners',
      component: mmPartners
    },
    {
      path: '/service',
      name: 'mmService',
      component: mmService
    },
    {
      path: '/search',
      name: 'mmsearch',
      component: mmsearch
    },
    
  ]
});


