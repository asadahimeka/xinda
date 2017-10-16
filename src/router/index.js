import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import c from '../components'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: c.Contents,
      children: [
        {//首页
          path: 'ConsoleAdvertisement',
          component: c.ConsoleAdvertisement,
          alias: '/',
          meta: { pageTitle: '信达_首页' }
        }, {//加入我们
          path: 'JoinUs',
          component: c.JoinUs,
          meta: { pageTitle: '信达_加盟我们' }
        }, {//购物车
          path: 'shcart',
          name: 'shcart',
          component: c.Shcart,
          meta: { pageTitle: '信达_购物车' }
        }, {//支付页面
          path: 'pay',
          name: 'pay',
          component: c.Pay,
          meta: { pageTitle: '信达_支付' }
        }, {//支付成功
          path: 'siharauseikou',
          name: 'paysuccess',
          component: c.PaySuccess,
          meta: { pageTitle: '信达_支付成功' }
        }, {//支付失败
          path: 'siharausippai',
          name: 'payfail',
          component: c.PayFail,
          meta: { pageTitle: '信达_支付失败' }
        }, {//商品列表
          path: 'slist',
          name: 'srvlist',
          component: c.Financial,
          meta: { pageTitle: '信达_商品列表' }
        }, {//商品详情
          path: 'shdetail',
          name: 'shdetail',
          component: c.Shdetail,
          meta: { pageTitle: '信达_商品详情' }
        }, {//店铺列表
          path: 'shoplist',
          name: 'mmShopList',
          component: c.mmShopList,
          meta: { pageTitle: '信达_店铺列表' }
        }, {//店铺列表web
          path: 'shoplistweb',
          name: 'mmShopListweb',
          component: c.mmShopListweb,
          meta: { pageTitle: '信达_店铺列表' }
        }, {//店铺详情
          path: 'shop',
          name: 'mmShop',
          component: c.mmShop,
          meta: { pageTitle: '信达_店铺详情' }
        }, {//店铺详情web
          path: 'shopweb',
          name: 'mmShopweb',
          component: c.mmShopweb,
          meta: { pageTitle: '信达_店铺详情' }
        }, {//搜索页面
          path: 'search',
          name: 'mmsearch',
          component: c.mmsearch,
          meta: { pageTitle: '信达_搜索' }
        }, {//会员中心
          path: 'MemberCen',
          component: c.MemberCen,
          meta: {
            pageTitle: '信达_会员中心',
            requireAuth: true,  // 需要登录
          },
          children: [
            {//订单列表
              path: 'Order',
              component: c.Order,
              // alias: '/MemberCen',
              meta: { pageTitle: '信达_会员中心' }
            }, {//评价列表
              path: 'Evaluate',
              component: c.Evaluate,
              meta: { pageTitle: '信达_用户评价' }
            }, {//用户设置
              path: 'Uerset',
              component: c.Uerset,
              meta: { pageTitle: '信达_用户设置' }
            }
          ]
        }, {
          path: 'MobileNav',
          component: c.MobileNav
        }
      ]
    }, {//登录页面
      path: '/Logon',
      component: c.Logon,
      meta: { pageTitle: '信达_登录' }
    }, {//注册页面
      path: '/Register',
      component: c.Register,
      meta: { pageTitle: '信达_注册' }
    }, {//忘记密码
      path: '/ForPSD',
      component: c.ForPSD,
      meta: { pageTitle: '信达_忘记密码' }
    }, {//支付加载
      path: '/paybridge',
      name: 'paybdg',
      component: c.PayBridge
    },
    {//404
      path: '*',
      component: c.Nfd,
      meta: { pageTitle: '404' }
    },
  ]
})

router.beforeEach((to, from, next) => {
  to.meta.pageTitle ? document.title = to.meta.pageTitle : 0;
  if (to.matched.some(r => r.meta.requireAuth)) {
    axios.post(this.$baseUrl+'/xinda-api/sso/login-info').then((userMsg) => {
      if (userMsg.data.status == 1) {
        next();
      } else {
        next({ path: '/Logon', query: { redirect: to.fullPath } });
      }
    });
  } else {
    next();
  }
})

export default router;
