<template>
    <div class="publicheader">
        <div class="computer">
            <div class="exitMessage">
            </div>
            <div class="headerframe">
                <div class="header unLog" v-if="!getExUser">
                    <div class="headerleft">
                        <div class="wel">欢迎来到信达！</div>
                        <a href="javascript:;" class="login" @click="toLogin">登录</a>
                        <a href="#/Register" class="register">快速注册</a>
                    </div>
                    <div class="headerright">
                        <div class="cart">
                            <a href="#/shcart">
                                <i class="iconcart">&#xe604;</i>
                            </a>
                            <a href="#/shcart">
                                <!-- 点击下面的a标签进入购物车 -->
                                <p>&nbsp;购物车
                                    <span>{{getCartnum}}</span>&nbsp;件</p>
                            </a>
                        </div>
                        <a href="#/shoplist">服务商入口</a>
                    </div>
                </div>
                <div class="header enLog" v-if="getExUser">
                    <div class="headerleft">
                        <a href="#/MemberCen">
                            {{getUserName}}
                        </a>
                        <p>欢迎来到信达!</p>
                        <a href="javascript:void(0);" @click="exit">
                            【退出】
                        </a>
                    </div>
                    <div class="headerright">
                        <div class="cart">
                            <a href="#/shcart">
                                <i class="iconcart">&#xe604;</i>
                            </a>
                            <a href="#/shcart">
                                <p>&nbsp;购物车
                                    <span>{{getCartnum}}</span>&nbsp;件</p>
                            </a>
                        </div>
                        <div class="myOrder">
                            <i class="iconOrder">
                                &#xe698;
                            </i>
                            <a href="#/MemberCen">我的订单</a>
                        </div>
                        <a href="#/shoplist">服务商入口</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    created() {
        this.$ajax.post('/xinda-api/sso/login-info').then((user) => {
            if (user.data.data) {
                this.userAction(user.data.data.name);
                this.exAction(1);
            }
        }).catch((error) => {
            console.error(error);
        });
        this.$ajax.post('/xinda-api/cart/cart-num').then((res) => {
            if (res.data.data.cartNum) {
                this.cartAction(res.data.data.cartNum);
            }
        }).catch((error) => {
            console.error(error);
        });
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['userAction', 'cartAction', 'exAction']),
        exit: function() {
            this.$ajax.post('/xinda-api/sso/logout').then((out) => {
                this.exAction(0);
                this.cartAction(0);
                if (this.$route.path == '/shcart') {
                    window.location.reload();
                }
            }).catch((error) => {
                console.error(error);
            })
        },
        toLogin() {
            this.$router.push({ path: '/Logon', query: { redirect: this.$route.fullPath } });
        },
    },
    computed: {
        ...mapGetters(['getUserName', 'getCartnum', 'getExUser']),
    },
    watch: {
        $route(_this) {
            if (_this) {
                this.$ajax.post('/xinda-api/cart/cart-num').then((res) => {
                        if (res.data.data.cartNum) {
                        this.cartAction(res.data.data.cartNum);
                    }
                }).catch((error) => {
                    console.error(error);
                });
                this.$ajax.post('/xinda-api/sso/login-info').then((user) => {
                        if (user.data.data) {
                        this.userAction(user.data.data.name);
                        this.exAction(1);
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
a {
    text-decoration: none;
    color: #2693d4;
}

.exitMessage {
    position: absolute;
}

.headerframe {
    width: 100%;
    height: 35px;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    .header {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #f2f2f2;
        .headerleft {
            height: 35px;
            display: flex;
            justify-content: space-between;
            &>div,
            &>a {
                height: 35px;
                display: flex;
                align-items: center;
                font-size: 14px;
                margin-right: 10px;
            }
            &>div {
                color: #2a2a2a;
            }
            p {
                line-height: 35px;
                font-size: 14px;
            }
        }
        .headerright {
            height: 35px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            line-height: 14px;
            .cart {
                height: 35px;
                display: flex;
                align-items: center;
                margin-right: 10px;
                .iconcart {
                    color: #000;
                    font-family: "iconfont" !important;
                    font-size: 17px;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-stroke-width: 0.2px;
                    -moz-osx-font-smoothing: grayscale;
                }
                p {
                    color: #000;
                    span {
                        color: #2693D4;
                    }
                }
            }
        }
    }
    .enLog {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        .iconOrder {
            font-family: "iconfont" !important;
            font-size: 17px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -webkit-text-stroke-width: 0.2px;
            -moz-osx-font-smoothing: grayscale;
        }
        .headerleft>a {
            margin-right: 10px;
        }
        .myOrder>a {
            margin-right: 10px;
        }
    }
}

.phonehead {
    width: 100%;
    height: 1rem;
    display: flex;
}


//下面是手机端的页面样式
@media screen and (max-width:1200px) {
    .headerframe {
        width: 1200px;
    }
}
</style>
