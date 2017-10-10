<template>
    <div class="footer">
        <div class="computer" v-if="isPC">
            <div class="upaboutus">
                <div class="maintext">
                    <div class="aboutus">
                        <div class="title">
                            关于我们
                        </div>
                        <div class="contactus">
                            联系我们：contact@xinkeher.com <br> 公司地址：北京市朝阳区大望路soho现代城
                            <br> 官方客服电话：010-83421842
                        </div>
                    </div>
                    <div class="qrcode">
                        <img src="../../static/images/qrcode.png" alt="欢迎关注信达官方微信号">
                    </div>
                </div>
            </div>
            <div class="bottomcopyright">
                <div class="centercopyright">
                    ©Copyright 2016北京信达科技有限公司 京ICP备 16011621号
                </div>
            </div>
        </div>
        <div class="phone" v-if="!isPC">
            <div :class="{acta:$route.path=='/'}" @click="back">
                <div class="iconfont">
                    &#xe60e;
                </div>
                <div class="itext">
                    主页
                </div>
            </div>
            <div :class="{acta:$route.path=='/shoplist'}" @click="shop">
                <div class="iconfont">
                    &#xe605;
                </div>
                <div class="itext">
                    店铺
                </div>
            </div>
            <div :class="{acta:$route.path=='/shcart'}" @click="cart">
                <div class="iconfont">
                    &#xe64f;
                </div>
                <div class="itext">
                    购物车
                </div>
                <mt-badge size="small" color="#2693d4" v-if="getCartnum">{{getCartnum}}</mt-badge>
            </div>
            <div :class="{acta:$route.path=='/MemberCen'}" @click="mine">
                <div class="iconfont">
                    &#xe79c;
                </div>
                <div class="itext">
                    我的
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    created() {
        this.ajax.post('/xinda-api/cart/cart-num').then((res) => {
            if (res.data.data.cartNum) {
                this.cartAction(res.data.data.cartNum);
            }
        }).catch((error) => {
            console.error(error);
        });
    },
    methods: {
        ...mapActions(['cartAction']),
        back() {
            this.$router.push('/');
        },
        shop() {
            this.$router.push('/shoplist')
        },
        cart() {
            this.$router.push('/shcart')
        },
        mine() {
            this.$router.push('/MemberCen')
        }
    },
    computed: {
        ...mapGetters(['getCartnum']),
    },
    watch: {
        $route(_this) {
            if (_this) {
                this.ajax.post('/xinda-api/cart/cart-num').then((res) => {
                    if (res.data.data.cartNum) {
                        this.cartAction(res.data.data.cartNum);
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        }
    }
}
</script>

<style lang="less">
.footer {
    .upaboutus {
        width: 100%;
        height: 201px;
        background-color: #f8f8f8;
        display: flex;
        justify-content: center;
        .maintext {
            width: 1200px;
            height: 100%;
            display: flex;
            padding: 38px 24px;
            box-sizing: border-box;
            justify-content: space-between;
            .aboutus {
                width: 276px;
                height: 125px;
                font-family: '宋体';
                .title {
                    height: 15px;
                    font-size: 15px;
                    color: black;
                    line-height: 15px;
                }
                .contactus {
                    line-height: 25px;
                    padding-left: 3px;
                    font-size: 14px;
                    padding-top: 28px;
                }
            }
        }
    }
    .bottomcopyright {
        width: 100%;
        height: 45px;
        background-color: #cbcccc;
        display: flex;
        justify-content: center;
        .centercopyright {
            width: 1200px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
        }
    }
}

.phone {
    width: 100%;
    height: .5rem;
    background-color: #f5f6f8;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    box-shadow: 0 0 15px #000;
    >div {
        position: relative;
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #000;
        .iconfont {
            font-size: .3rem;
        }
        .itext {
            font-size: .1rem;
        }
    }
    .acta {
        color: #2792d6;
    }
}

.mint-badge {
    position: absolute;
    top: 0px;
    right: 21px;
}

@media screen and (max-width:768px) {
    .maintext {
        width: 100%;
    }
    .centercopyright {
        width: 100%;
    }
}
</style>