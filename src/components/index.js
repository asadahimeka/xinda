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