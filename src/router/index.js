import Vue from 'vue'
import Router from 'vue-router'

import Contents from '../views/llContent.vue'
import Navigation from '../views/llNavigation.vue'
import ConsoleAdvertisement from '../views/llconsoleAdvertisement.vue'
import JoinUs from '../views/llJoinUs.vue'
import Logon from '../views/llLogon.vue'
import Register from '../views/llRegister.vue'
import ForPSD from '../views/llForgetPSD.vue'
import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-default/index.css'

import Shcart from '../views/yycart.vue'
import Pay from '../views/yypay.vue'
import PaySuccess from '../views/yypsucs.vue'
import PayFail from '../views/yypfail.vue'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
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
          path: '/shcart',
          name: 'shcart',
          component: Shcart
        },
        {
          path: '/pay',
          name: 'pay',
          component: Pay
        },
        {
          path: '/siharauseikou',
          name: 'paysuccess',
          component: PaySuccess
        },
        {
          path: '/siharausippai',
          name: 'payfail',
          component: PayFail
        }




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
    },
  ]
})
