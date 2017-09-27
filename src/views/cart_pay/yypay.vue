<template>
    <div class="pay">
        <div>首页/
            <span>支付</span>
        </div>
        <div class="tpc money-color">订单详情</div>

        <el-alert v-if="gfail" title="Get data failed." type="error" show-icon></el-alert>

        <div class="b-order" v-if="!orderlist.length" v-loading="loading">
            <el-alert title="No order information." type="error" :closable="false" show-icon></el-alert>
        </div>
        <div class="b-order" v-if="orderlist.length" v-loading="loading">
            <div class="odr-tit">
                <div class="tit-item1">订单编号：
                    <!-- TODO -->
                    <a class="money-color">{{order.businessNo}}</a>
                </div>
                <div class="tit-item2">创建时间：{{fmtTime(order.createTime)}}</div>
                <div class="tit-item3">
                    <div>订单总额：
                        <b class="money-color">￥{{fmtPrice(order.totalPrice)}}</b>元</div>
                    <div class="red-tri" @click="tri=!tri">订单明细
                        <i class="tri-dn" v-if="tri"></i>
                        <i class="tri-up" v-if="!tri"></i>
                    </div>
                </div>
            </div>

            <!-- <transition name="slide"> -->
            <el-collapse-transition>
            <!-- <transition name="el-zoom-in-top"> -->
                <div class="odr-list" v-show="!tri">
                    <div v-for="item in orderlist" class="odr-dtl" :key="item.id">
                        <div>服务名称：
                            <!-- TODO -->
                            <a :title="item.serviceName+':'+item.serviceInfo" :href="'#/shdetail?sid='+item.serviceId" target="_blank">{{item.serviceName}}</a>
                        </div>
                        <div>单价：
                            <b class="money-color">￥{{fmtPrice(item.unitPrice)}}</b>元</div>
                        <div>数量：
                            <b class="money-color">{{item.buyNum}}</b>
                        </div>
                        <div>服务总额：
                            <b class="money-color">￥{{fmtPrice(item.totalPrice)}}</b>元</div>
                    </div>
                </div>
            <!-- </transition> -->
            </el-collapse-transition>
            <!-- </transition> -->
        </div>

        <div class="tpc money-color">支付方式</div>
        <p class="pay-tit">非网银支付</p>
        <div class="pay-way" :class="{'pay-way-act':isAct[0]}">
            <input type="radio" name="pay" @click="payNo='china-pay'" @focus="isAct.splice(0,1,true)" @blur="isAct.splice(0,1,false)">
            <span class="upay"></span>
        </div>
        <p class="pay-tit">平台支付</p>
        <div class="pay-way" :class="{'pay-way-act':isAct[1]}">
            <input type="radio" name="pay" @click="payNo='weixin-pay'" @focus="isAct.splice(1,1,true)" @blur="isAct.splice(1,1,false)">
            <span class="wxpay">微信支付</span>
        </div>
        <div class="pay-way" :class="{'pay-way-act':isAct[2]}">
            <input type="radio" name="pay" @click="payNo='ali-pay'" @focus="isAct.splice(2,1,true)" @blur="isAct.splice(2,1,false)">
            <span class="alipay">快捷支付</span>
        </div>
        <p class="pay-tit">自助转账
            <span>因限额不能支付时，建议使用自助转账</span>
        </p>
        <div class="pay-way pay-bank" :class="{'pay-way-act':isAct[3]}">
            <input type="radio" name="pay" @click="payNo='bank'" @focus="isAct.splice(3,1,true)" @blur="isAct.splice(3,1,false)">
            <span class="bankpay"></span>
            <div class="bankinfo">
                <p>
                    <span>开户账号：</span>110916853310605</p>
                <p>
                    <span>开户名：</span>北京爱蓝领网络科技有限公司</p>
                <p>
                    <span>开户行：</span>招商银行股份有限公司北京东三环支行</p>
            </div>
        </div>
        <p class="red">注：转账时请你将订单编号备注在付款信息里；转账完成时，请通知客服。</p>

        <div class="btm">
            <div class="amount">金额总计
                <b class="money-color">&nbsp;￥&nbsp;{{fmtPrice(order.totalPrice)}}</b>
            </div>
            <button class="balance" @click="submit(payNo,order.businessNo)" :disabled="order.businessNo==undefined">去结算</button>
        </div>

        <div class="pay-fb" v-show="fbShow">
            <div class="fb-tit">支付反馈
                <span @click="closeFb">×</span>
            </div>
            <div class="fb-msg">
                <p>
                    请您在新打开的页面上完成订单付款
                    <span>根据您的支付完成情况，选择下步操作</span>
                </p>
                <button>
                    <a :href="'#/siharauseikou?bno='+order.businessNo">已完成支付</a>
                </button>
                <button>
                    <a :href="'#/siharausippai?bno='+order.businessNo">支付遇到问题</a>
                </button>
                <a @click="closeFb">返回重新选择支付方式</a>
            </div>
        </div>

        <div class="pay-fb pay-wx-fb" v-show="wxfbShow">
            <div class="fb-tit">微信支付
                <span @click="closeFb">×</span>
            </div>
            <div class="fb-msg">
                <div class="qrimg">
                    <img :src="codeUrl" alt="Load QR Code failed.">
                </div>
                <p>请您使用微信扫一扫&nbsp;进行扫码支付</p>
                <button>
                    <a :href="'#/siharauseikou?bno='+order.businessNo">已完成支付</a>
                </button>
                <button>
                    <a :href="'#/siharausippai?bno='+order.businessNo">支付遇到问题</a>
                </button>
                <a @click="closeFb">返回重新选择支付方式</a>
            </div>
        </div>

    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'pay',
    data() {
        return {
            loading: true,
            gfail: false,
            tri: true,
            payNo: '',
            isAct: [0, 0, 0, 0],
            order: {
                "createTime": 0,
                "totalPrice": 0,
            },
            orderlist: [],
            fbShow: false,
            wxfbShow: false,
            codeUrl: '',
        }
    },
    methods: {
        ...mapActions(['cartAction']),
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        fmtTime(msec) {
            var date = new Date(msec);
            var year = date.getFullYear();
            var mouth = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
            var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
            var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
            var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
            return year + '-' + mouth + '-' + day + ' ' + hour + ':' + min + ':' + sec;
        },
        getOrder() {
            this.ajax.post(
                '/xinda-api/business-order/detail',
                { businessNo: this.$route.query.bno },
            ).then(res => {
                if (res.data.status == 1) {
                    if (res.data.data.businessOrder.status == 1) {
                        this.order = res.data.data.businessOrder;
                        this.orderlist = res.data.data.serviceOrderList;
                        this.loading = false;
                    } else {
                        this.$message({ type: 'warning', message: '订单已支付或取消', duration: 2000 });
                        this.$router.push('/');
                    }
                } else if (res.data.status == -999) {
                    this.$message({ type: "warning", message: res.data.msg, duration: 1000 });
                    this.$router.push('/Logon');
                } else if (!res.data.data) {
                    this.$message({ type: "warning", message: res.data.msg, duration: 1000 });
                    this.$router.push('/');
                }
            }).catch(res => {
                this.loading = false;
                this.gfail = true;
                console.log('Axios: ', res);
            });

        },
        submit(payNo, businessNo) {
            if (!payNo) {
                this.$alert('请选择支付方式！', '提示');
            } else if (payNo == 'bank') {
                this.$alert('转账时请你将订单编号备注在付款信息里；转账完成时，请通知客服。', '进行线下转账');
            } else {
                this.ajax.post(
                    '/xinda-api/pay/' + payNo,
                    { businessNo },
                ).then(res => {
                    console.log(res);
                    if (payNo == 'weixin-pay') {
                        this.wxfbShow = true;
                        this.codeUrl = res.data.data;
                    } else {
                        this.fbShow = true;
                        sessionStorage.setItem('payuri', res.data);
                        window.open('#/paybridge');
                    }
                }).catch(res => {
                    console.log('Axios: ', res);
                });
            }
        },
        closeFb() {
            this.fbShow = this.wxfbShow = false;
        },
        toDetail(path, id) {
            this.$router.push({
                path,
                query: { id },
            });
            this.$router.afterEach((to, from, next) => {
                window.scrollTo(0, 0);
            });
        },
    },
    created() {
        window.scrollTo(0, 0);
        this.cartAction(0);
        this.getOrder();
    },
    watch: {
        $route(val) {
            if (val) {
                this.$router.afterEach((to, from, next) => { window.scrollTo(0, 0); });
            }
        }
    }
}
</script>

<style lang="less" scoped>

@gwidth: 1200px;
@mcolor: #2693d4;
@borclr: #b6b6b6;
@redclr: #fa6463;

body {
    margin: 0;
}

.tpc {
    height: 40px;
    margin-top: 10px;
    line-height: 40px;
    border-bottom: 1px solid @borclr;
}

.pay {
    width: @gwidth;
    margin: 0 auto;
    padding-top: 20px;
    font-size: 14px;
    .b-order {
        width: @gwidth;
        margin-top: 35px;
        margin-bottom: 45px;
        overflow: hidden;
        .odr-tit {
            position: relative;
            border: 1px solid @borclr;
            background: #f7f7f7;
            z-index: 2;
            a {
                text-decoration: none;
                cursor: pointer;
            }
            .tit-item1,
            .tit-item2,
            .tit-item3 {
                display: inline-block;
                width: 355px;
                height: 70px;
                line-height: 70px;
                padding-left: 40px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .tit-item2 {
                width: 337px;
                padding-left: 60px;
            }
            .tit-item3 {
                width: 257px;
                padding-left: 140px;
            }
            .red-tri {
                position: absolute;
                bottom: 8px;
                right: 164px;
                height: 20px;
                line-height: 20px;
                color: @redclr;
                cursor: pointer;
                .tri-dn,
                .tri-up {
                    position: absolute;
                    top: 7px;
                    right: -15px;
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                }
                .tri-dn {
                    border-top: 5px solid red;
                }
                .tri-up {
                    border-bottom: 5px solid red;
                }
            }
        }
    }

    .odr-dtl {
        border: 1px solid @borclr;
        border-top: 0;
        background: #f7f7f7;
        z-index: 1;
        div {
            display: inline-block;
            width: 256px;
            height: 70px;
            line-height: 70px;
            padding-left: 40px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        a {
            text-decoration: none;
            cursor: pointer;
        }
    }
}

.pay-tit {
    margin: 30px 0;
    font-size: 15px;
    span {
        margin-left: 20px;
        color: #666;
        font-size: 12px;
    }
}

.pay-way {
    display: inline-block;
    width: 205px;
    height: 50px;
    margin-right: 5px;
    line-height: 50px;
    border: 1px solid @borclr;
    input {
        margin-top: 20px;
        margin-left: 5px;
        vertical-align: top;
    }
    .upay,
    .wxpay,
    .alipay,
    .bankpay {
        display: inline-block;
        width: 125px;
        height: 50px;
        text-align: right;
        margin-left: 18px;
    }
    .upay {
        width: 161px;
        background: url("../../assets/unipay.svg") no-repeat;
    }
    .wxpay {
        background: url("../../assets/wx.svg") no-repeat;
    }
    .alipay {
        background: url("../../assets/alipay.svg") no-repeat;
    }
    .bankpay {
        width: 123px;
        height: 85px;
        margin-left: 10px;
        margin-top: -30px;
        background: url("../../assets/zs.svg") no-repeat;
    }
}

.red {
    color: red;
}

.pay-bank {
    width: 430px;
    height: 70px;
    font-size: 12px;
    input {
        margin-top: 30px;
    }
    .bankinfo {
        float: right;
        margin: 11px 10px 0 5px;
        p {
            margin: 0;
            padding: 0;
            line-height: 15px;
            span {
                color: #666;
            }
        }
    }
}

.pay-way-act {
    border: 1px solid @redclr;
}

.btm {
    float: right;
    margin: 85px 150px 160px 0;
    .amount {
        margin-bottom: 10px;
        b {
            font-size: 18px;
        }
    }
    .balance {
        float: right;
        width: 100px;
        height: 30px;
        line-height: 25px;
        border: 1px solid @mcolor;
        border-radius: 5px;
        color: @mcolor;
        background: #fff;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }
}

.slide-enter-active {
    transition: all .3s ease-in-out;
    transform: translate3d(0, 0, 0);
}

.slide-enter {
    transform: translate3d(0, -100%, 0);
}

.slide-leave-active {
    transition: all .3s ease-in-out;
    transform: translate3d(0, -100%, 0);
}

.slide-leave {
    transform: translate3d(0, 0, 0);
}

.pay-fb {
    z-index: 10001;
    position: fixed;
    top: 25%;
    left: 32%;
    width: 475px;
    height: 290px;
    border-right: 2px solid @borclr;
    border-bottom: 2px solid @borclr;
    background: #fff;
    .fb-tit {
        height: 50px;
        padding-left: 25px;
        line-height: 50px;
        font-size: 18px;
        background: #f8f8f8;
        span {
            float: right;
            margin-right: 25px;
            font-size: 35px;
            font-weight: 500;
            cursor: pointer;
        }
    }
    .fb-msg {
        padding: 30px 75px 40px;
        p {
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 20px;
            span {
                display: block;
                margin-top: 20px;
                font-size: 16px;
                color: #666;
            }
        }
        button {
            width: 150px;
            height: 35px;
            margin-right: 10px;
            margin-bottom: 30px;
            background: #fff;
            border: 1px solid @mcolor;
            border-radius: 5px;
            color: @mcolor;
            font-size: 16px;
            a {
                text-decoration: none;
            }
        }
        a {
            display: block;
            font-size: 16px;
            color: @mcolor;
            cursor: pointer;
        }
    }
}

.pay-wx-fb {
    top: 15%;
    left: 37%;
    width: 335px;
    height: 380px;
    .fb-msg {
        padding: 15px 40px 25px;
        .qrimg {
            width: 190px;
            height: 190px;
            margin: 0 auto;
            img {
                width: 190px;
                height: 190px;
            }
        }
        p {
            margin-top: 5px;
            margin-bottom: 10px;
            font-size: 16px;
        }
        button {
            width: 115px;
            height: 35px;
            margin-bottom: 15px;
            font-size: 14px;
        }
        a {
            font-size: 14px;
        }
    }
}

.money-color {
    color: @mcolor;
}

.el-alert {
    width: 300px;
    margin: 40px auto;
}

.el-alert__content {
    padding: 0 20px;
}
</style>
