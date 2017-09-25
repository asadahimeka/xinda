import Vue from 'vue'
import Router from 'vue-router'

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
import Contents from '../views/llContent.vue'
import ConsoleAdvertisement from '../views/llconsoleAdvertisement.vue'
import JoinUs from '../views/llJoinUs.vue'
import Logon from '../views/llLogon.vue'
import Register from '../views/llRegister.vue'
import ForPSD from '../views/llForgetPSD.vue'

import Shcart from '../views/yycart.vue'
import Pay from '../views/yypay.vue'
import PaySuccess from '../views/yypsucs.vue'
import PayFail from '../views/yypfail.vue'
import PayBridge from '../views/yypaybrg.vue'
import Nfd from '../views/nfd.vue'

import Financial from '../views/xxfiscal.vue'
import Shdetail from '../views/xxspdetail.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
<<<<<<< HEAD
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
    
=======
      path: '/',
      component: Contents,
      children: [
        {
          path: 'ConsoleAdvertisement',
          component: ConsoleAdvertisement,
          alias: '/',
        }, {
          path: 'JoinUs',
          component: JoinUs
        }, {
          path: 'shcart',
          name: 'shcart',
          component: Shcart
        },{
          path: 'pay',
          name: 'pay',
          component: Pay
        },{
          path: 'siharauseikou',
          name: 'paysuccess',
          component: PaySuccess
        },{
          path: 'siharausippai',
          name: 'payfail',
          component: PayFail
        },{
          path: 'slist',
          name: 'srvlist',
          component: Financial
        },{
          path: 'shdetail',
          name: 'shdetail',
          component: Shdetail
        },


      ]
    }, {
      path: '/Logon',
      component: Logon,
    }, {
      path: '/Register',
      component: Register
    }, {
      path: '/ForPSD',
      component: ForPSD
    }, {
      path: '/paybridge',
      name: 'paybdg',
      component: PayBridge
    },



    {
      path: '/*',
      component: Nfd
    },
>>>>>>> a5c4867f2f29bc4bb7133685947870f69f221698
  ]
});


