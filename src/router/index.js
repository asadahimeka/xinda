import Vue from 'vue'
import Router from 'vue-router'
import Contents from '../views/llContent.vue'
import Navigation from '../views/llNavigation.vue'
import ConsoleAdvertisement from '../views/llconsoleAdvertisement.vue'
import JoinUs from '../views/llJoinUs.vue'
import Logon from '../views/llLogon.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Contents,
      redirect: '/ConsoleAdvertisement',
      children: [
        {
          path: 'ConsoleAdvertisement',
          component: ConsoleAdvertisement
        }, {
          path: 'JoinUs',
          component: JoinUs
        }
      ]
    },{
      path:'Logon',
      component:Logon,
    }
  ]
})
