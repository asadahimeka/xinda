<template>
    <div class="publicheader">
        <div class="exitMessage">

        </div>
        <div class="headerframe">
            <!-- <div class="header unLog" v-if="!getUserName"> -->
            <div class="header unLog" v-if="!user">                
                <div class="headerleft">
                    <div class="wel">欢迎来到信达！</div>
                    <a href="/#/Logon" class="login">登录</a>
                    <a href="/#/Register" class="register">快速注册</a>
                </div>
                <div class="headerright">
                    <div class="cart">
                        <i class="iconcart">&#xe604;</i>
                        <!-- 点击下面的a标签进入购物车 -->
                        <!-- <i class="iconcart icon-cart"></i> -->
                        <p>&nbsp;购物车
                            <a href="/#/shcart">{{getCartnum}}</a>&nbsp;件</p>
                    </div>
                    <a href="">服务商入口</a>
                </div>
            </div>
            <!-- <div class="header enLog" v-if="getUserName"> -->
            <div class="header enLog" v-if="user">
                <div class="headerleft">
                    <a href="javascript:void(0);">
                        <!-- 这里是已经登录的用户手机号 -->
                        <!-- {{getUserName}} -->
                        {{user}}
                    </a>
                    <p>欢迎来到信达!</p>
                    <a href="javascript:void(0);" @click="exit">
                        【退出】
                    </a>
                </div>
                <div class="headerright">
                    <div class="cart">
                        <i class="iconcart">&#xe604;</i>
                        <p>购物车
                            <a href="/#/shcart">0</a>件</p>
                    </div>
                    <div class="myOrder">
                        <i class="iconOrder">
                            &#xe698;
                        </i>
                        <a href="">我的订单</a>
                    </div>
                    <a href="">服务商入口</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    created() {
        this.ajax.post('/xinda-api/sso/login-info').then((user) => {
            if (user.data.data) {
                this.userAction(user.data.data.name);
            }
        }).catch((error) => {
            console.log(error);
        });

    },
    data() {
        return {
            
        }
    },
    methods: {
        exit: function() {
            this.ajax.post('/xinda-api/sso/ logout').then((out) => {
                sessionStorage.removeItem('user');
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            })
        },
        ...mapActions(['userAction']),
    },
    computed: {
        ...mapGetters(['getUserName', 'getCartnum']),
        user(){
            return sessionStorage.getItem('user');
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
                    font-family: "iconfont" !important;
                    font-size: 17px;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-stroke-width: 0.2px;
                    -moz-osx-font-smoothing: grayscale;
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




//下面是手机端的页面样式
@media screen and (max-width:1200px) {}
</style>
