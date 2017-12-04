// const Contents = resolve => require(['../views/llContent.vue'], resolve);//两种方式不要同时使用
// const Contents = () => import('../views/llContent')
// const ConsoleAdvertisement = () => import('../views/index_cnt/llconsoleAdvertisement')
import Contents from '../views/llContent'
import ConsoleAdvertisement from '../views/index_cnt/llconsoleAdvertisement'

const JoinUs = () => import('../views/llJoinUs')
const Logon = () => import('../views/reg_login/llLogon')
const Register = () => import('../views/reg_login/llRegister')
const ForPSD = () => import('../views/reg_login/llForgetPSD')
const MobileNav = () => import('../views/nav/mobilenva')

const Shcart = () => import('../views/cart_pay/yycart')
const Pay = () => import('../views/cart_pay/yypay')
const PaySuccess = () => import('../views/cart_pay/yypsucs')
const PayFail = () => import('../views/cart_pay/yypfail')
const PayBridge = () => import('../views/cart_pay/yypaybrg')
const Nfd = () => import('../views/nfd')

const Financial = () => import('../views/goods_shop/xxfiscal')
const Shdetail = () => import('../views/goods_shop/xxspdetail')

const mmShopList = () => import('../views/goods_shop/mmShopList')
const mmShop = () => import('../views/goods_shop/mmShop')
const mmShopweb = () => import('../views/goods_shop/mmShopweb')
const mmsearch = () => import('../views/goods_shop/mmsearch')
const mmShopListweb = () => import('../views/goods_shop/mmShopListweb')

const MemberCen = () => import('../views/member_center/ffmember-center')
const Order = () => import('../views/member_center/ffmember-first')
const Evaluate = () => import('../views/member_center/ffmember-second')
const Uerset = () => import('../views/member_center/ffmember-third')

export default {
    Contents,
    ConsoleAdvertisement,
    JoinUs,
    Logon,
    Register,
    ForPSD,
    MobileNav,
    Shcart,
    Pay,
    PaySuccess,
    PayFail,
    PayBridge,
    Nfd,
    Financial,
    Shdetail,
    mmShopList,
    mmShop,
    mmShopweb,
    mmsearch,
    mmShopListweb,
    MemberCen,
    Order,
    Evaluate,
    Uerset
}