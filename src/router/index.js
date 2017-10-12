import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

const Contents = resolve => require(['../views/llContent'], resolve)
const ConsoleAdvertisement = resolve => require(['../views/index_cnt/llconsoleAdvertisement'], resolve)

const JoinUs = resolve => require(['../views/llJoinUs'], resolve)
const Logon = resolve => require(['../views/reg_login/llLogon'], resolve)
const Register = resolve => require(['../views/reg_login/llRegister'], resolve)
const ForPSD = resolve => require(['../views/reg_login/llForgetPSD'], resolve)
const MobileNav = resolve => require(['../views/nav/mobilenva'], resolve)

const Shcart = resolve => require(['../views/cart_pay/yycart'], resolve)
const Pay = resolve => require(['../views/cart_pay/yypay'], resolve)
const PaySuccess = resolve => require(['../views/cart_pay/yypsucs'], resolve)
const PayFail = resolve => require(['../views/cart_pay/yypfail'], resolve)
const PayBridge = resolve => require(['../views/cart_pay/yypaybrg'], resolve)
const Nfd = resolve => require(['../views/nfd'], resolve)

const Financial = resolve => require(['../views/goods_shop/xxfiscal'], resolve)
const Shdetail = resolve => require(['../views/goods_shop/xxspdetail'], resolve)

const mmShopList = resolve => require(['../views/goods_shop/mmShopList'], resolve)
const mmShop = resolve => require(['../views/goods_shop/mmShop'], resolve)
const mmShopweb = resolve => require(['../views/goods_shop/mmShopweb'], resolve)
const mmsearch = resolve => require(['../views/goods_shop/mmsearch'], resolve)
const mmShopListweb = resolve => require(['../views/goods_shop/mmShopListweb'], resolve)

const MemberCen = resolve => require(['../views/member_center/ffmember-center'], resolve)
const Order = resolve => require(['../views/member_center/ffmember-first'], resolve)
const Evaluate = resolve => require(['../views/member_center/ffmember-second'], resolve)
const Uerset = resolve => require(['../views/member_center/ffmember-third'], resolve)

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: Contents,
            children: [
                {//首页
                    path: 'ConsoleAdvertisement',
                    component: ConsoleAdvertisement,
                    alias: '/',
                    meta: { pageTitle: '信达_首页' }
                }, {//加入我们
                    path: 'JoinUs',
                    component: JoinUs,
                    meta: { pageTitle: '信达_加盟我们' }
                }, {//购物车
                    path: 'shcart',
                    name: 'shcart',
                    component: Shcart,
                    meta: { pageTitle: '信达_购物车' }
                }, {//支付页面
                    path: 'pay',
                    name: 'pay',
                    component: Pay,
                    meta: { pageTitle: '信达_支付' }
                }, {//支付成功
                    path: 'siharauseikou',
                    name: 'paysuccess',
                    component: PaySuccess,
                    meta: { pageTitle: '信达_支付成功' }
                }, {//支付失败
                    path: 'siharausippai',
                    name: 'payfail',
                    component: PayFail,
                    meta: { pageTitle: '信达_支付失败' }
                }, {//商品列表
                    path: 'slist',
                    name: 'srvlist',
                    component: Financial,
                    meta: { pageTitle: '信达_商品列表' }
                }, {//商品详情
                    path: 'shdetail',
                    name: 'shdetail',
                    component: Shdetail,
                    meta: { pageTitle: '信达_商品详情' }
                }, {//店铺列表
                    path: 'shoplist',
                    name: 'mmShopList',
                    component: mmShopList,
                    meta: { pageTitle: '信达_店铺列表' }
                }, {//店铺列表web
                    path: 'shoplistweb',
                    name: 'mmShopListweb',
                    component: mmShopListweb,
                    meta: { pageTitle: '信达_店铺列表' }
                }, {//店铺详情
                    path: 'shop',
                    name: 'mmShop',
                    component: mmShop,
                    meta: { pageTitle: '信达_店铺详情' }
                }, {//店铺详情web
                    path: 'shopweb',
                    name: 'mmShopweb',
                    component: mmShopweb,
                    meta: { pageTitle: '信达_店铺详情' }
                }, {//搜索页面
                    path: 'search',
                    name: 'mmsearch',
                    component: mmsearch,
                    meta: { pageTitle: '信达_搜索' }
                }, {//会员中心
                    path: 'MemberCen',
                    component: MemberCen,
                    meta: {
                        pageTitle: '信达_会员中心',
                        requireAuth: true,  // 需要登录
                    },
                    children: [
                        {//订单列表
                            path: 'Order',
                            component: Order,
                            // alias: '/MemberCen',
                            meta: { pageTitle: '信达_会员中心' }
                        }, {//评价列表
                            path: 'Evaluate',
                            component: Evaluate,
                            meta: { pageTitle: '信达_用户评价' }
                        }, {//用户设置
                            path: 'Uerset',
                            component: Uerset,
                            meta: { pageTitle: '信达_用户设置' }
                        }
                    ]
                }, {
                    path: 'MobileNav',
                    component: MobileNav
                }
            ]
        }, {//登录页面
            path: '/Logon',
            component: Logon,
            meta: { pageTitle: '信达_登录' }
        }, {//注册页面
            path: '/Register',
            component: Register,
            meta: { pageTitle: '信达_注册' }
        }, {//忘记密码
            path: '/ForPSD',
            component: ForPSD,
            meta: { pageTitle: '信达_忘记密码' }
        }, {//支付加载
            path: '/paybridge',
            name: 'paybdg',
            component: PayBridge
        },
        {//404
            path: '*',
            component: Nfd,
            meta: { pageTitle: '404' }
        },
    ]
})

router.beforeEach((to, from, next) => {
    to.meta.pageTitle ? document.title = to.meta.pageTitle : 0;
    if (to.matched.some(r => r.meta.requireAuth)) {
        axios.post('/xinda-api/sso/login-info').then((userMsg) => {
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
