import Vue from 'vue'
import Router from 'vue-router'

import Contents from '../views/llContent.vue'
import ConsoleAdvertisement from '../views/index_cnt/llconsoleAdvertisement.vue'
import JoinUs from '../views/llJoinUs.vue'
import Logon from '../views/reg_login/llLogon.vue'
import Register from '../views/reg_login/llRegister.vue'
import ForPSD from '../views/reg_login/llForgetPSD.vue'

import Shcart from '../views/cart_pay/yycart.vue'
import Pay from '../views/cart_pay/yypay.vue'
import PaySuccess from '../views/cart_pay/yypsucs.vue'
import PayFail from '../views/cart_pay/yypfail.vue'
import PayBridge from '../views/cart_pay/yypaybrg.vue'
import Nfd from '../views/nfd.vue'

import Financial from '../views/goods_shop/xxfiscal.vue'
import Shdetail from '../views/goods_shop/xxspdetail.vue'

import mmShopList from '../views/goods_shop/mmShopList.vue'
import mmShop from '../views/goods_shop/mmShop.vue'
import mmsearch from '../views/goods_shop/mmsearch.vue'

import MemberCen from '../views/member_center/ffmember-center.vue'
import Order from '../views/member_center/ffmember-first.vue'
import Evaluate from '../views/member_center/ffmember-second.vue'
import Uerset from '../views/member_center/ffmember-third.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Contents,
      children: [
        {//首页
          path: 'ConsoleAdvertisement',
          component: ConsoleAdvertisement,
          alias: '/',
        }, {//加入我们
          path: 'JoinUs',
          component: JoinUs
        }, {//购物车
          path: 'shcart',
          name: 'shcart',
          component: Shcart
        }, {//支付页面
          path: 'pay',
          name: 'pay',
          component: Pay
        }, {//支付成功
          path: 'siharauseikou',
          name: 'paysuccess',
          component: PaySuccess
        }, {//支付失败
          path: 'siharausippai',
          name: 'payfail',
          component: PayFail
        }, {//商品列表
          path: 'slist',
          name: 'srvlist',
          component: Financial
        }, {//商品详情
          path: 'shdetail',
          name: 'shdetail',
          component: Shdetail
        }, {//店铺列表
          path: 'shoplist',
          name: 'mmShopList',
          component: mmShopList,
        }, {//店铺详情
          path: 'shop',
          name: 'mmShop',
          component: mmShop
        }, {//搜索页面
          path: 'search',
          name: 'mmsearch',
          component: mmsearch
        }, {//会员中心
          path: 'MemberCen',
          component: MemberCen,
          children: [
            {//订单列表
              path: 'Order',
              component: Order,
              alias: '/MemberCen'
            }, {//评价列表
              path: 'Evaluate',
              component: Evaluate,
            }, {//用户设置
              path: 'Uerset',
              component: Uerset
            }
          ]
        }
      ]
    }, {//登录页面
      path: '/Logon',
      component: Logon,
    }, {//注册页面
      path: '/Register',
      component: Register
    }, {//忘记密码
      path: '/ForPSD',
      component: ForPSD
    }, {//支付加载
      path: '/paybridge',
      name: 'paybdg',
      component: PayBridge
    },
    {//404
      path: '/*',
      component: Nfd
    },
  ]
})
