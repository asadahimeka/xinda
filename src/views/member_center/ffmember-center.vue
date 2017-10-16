<template>
    <div id="member-center">
        <div class="member-left" v-if="$isPC">
            <div style="width:242px;height:20px;color:#696969;margin:10px;">首页 / 个人中心</div>
            <div class="member-user">
                <div class="via">
                    <a>
                        <img src="../../assets/userheader.png" v-if="!headimg" alt="GET IMG FAILED">
                        <img :src="dealSrc(headimg)" v-else alt="GET IMG FAILED">
                    </a>
                </div>
                <p class="phone-number">{{username}}</p>
            </div>
            <div class="action">
                <div :class="{act:$route.path=='/MemberCen/Order'}">
                    <a href="#/MemberCen/Order" class="myOrder">我的订单</a>
                </div>
                <div :class="{act:$route.path=='/MemberCen/Evaluate'}">
                    <a href="#/MemberCen/Evaluate" class="userComment">用户评价</a>
                </div>
                <div :class="{act:$route.path=='/MemberCen/Uerset'}">
                    <a href="#/MemberCen/Uerset" class="accountSetup">账户设置</a>
                </div>
            </div>
        </div>
        <div class="memberCenterMobile" v-if="!$isPC">
            <div class="memberHead">
                <img src="../../assets/userheader.png" v-if="!headimg" alt="GET IMG FAILED">
                <img :src="dealSrc(headimg)" v-else alt="GET IMG FAILED">
            </div>
            <div class="memberName">
                {{username}}
            </div>
            <a class="myOrder" href="#/MemberCen/Order">
                <div class="iconfont">
                    &#xe698;
                </div>
                <div class="orderT">
                    我的订单
                </div>
                <div class="iconfont">
                    &#xe61c;
                </div>
            </a>
            <a class="memset" href="#/MemberCen/Uerset">
                <div class="iconfont">
                    &#xe609;
                </div>
                <div class="setT">
                    账户设置
                </div>
                <div class="iconfont">
                    &#xe61c;
                </div>
            </a>
            <button @click="exit">
                退出登录
            </button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Toast } from 'mint-ui';
export default {
    created() {
        this.$isPC ? this.$router.push('/MemberCen/Order') : 0;
        this.$ajax.post(this.$baseUrl+'/xinda-api/member/info').then((userMsg) => {
            if (userMsg.data.status == 1) {
                this.username = userMsg.data.data.name;
                // this.headimg = userMsg.data.data.headImg;
            } else {
                this.$message.warning(userMsg.data.msg);
            }
        }).catch((error) => {
            console.log('error', error);
        });
    },
    data() {
        return {
            username: '',
            headimg: '',
            ia: -1,
        }
    },
    methods: {
        ...mapActions(['userAction', 'cartAction', 'exAction']),
        dealSrc(src) {
            return /^\/[^/]/.test(src) ? "http://115.182.107.203:8088/xinda/pic" + src : src;
        },
        exit: function() {
            this.$ajax.post(this.$baseUrl+'/xinda-api/sso/logout').then((out) => {
                this.exAction(0);
                this.cartAction(0);
                Toast({
                    message: out.data.msg,
                    position: 'bottom',
                    duration: 5000
                });
            }).catch((error) => {
                console.error(error);
            })
        },
    },
    computed: {
        ...mapGetters(['getExUser']),
    },
    watch: {
        getExUser(val) {
            if (val == 0) {
                this.$router.push('/');
            }
        },
    }
}
</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}

#member-center {
    width: 1200px;
    margin: 20px auto;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    .member-left {
        width: 242px;
        height: 530px;
        .member-user {
            width: 242px;
            height: 142px;
            margin: 4px 0 10px;
            background: #e9e9e9;
            overflow: hidden;
            .phone-number {
                width: 110px;
                margin: 0 auto;
                text-align: center;
            }
            .via {
                width: 95px;
                height: 95px;
                margin: 7px auto;
                border-radius: 50px;
            }
        }
        .action {
            width: 242px;
            height: 375px;
            background: #e9e9e9;
            a {
                display: block;
                width: 242px;
                height: 50px;
                line-height: 50px;
                margin: 0 auto;
                text-decoration: none;
                text-align: center;
                color: #696969;
                font-size: 18px;
            }
            .myOrder {
                background: url("../../assets/images/dingdan.png") no-repeat 50px 13px;
            }
            .userComment {
                background: url("../../assets/images/useevaluationr.png") no-repeat 50px 15px;
            }
            .accountSetup {
                background: url("../../assets/images/set.png") no-repeat 47px 12.5px;
            }
        }
    }
}


.act {
    background: #d7d7d7;
}

@media screen and (max-width: 768px) {
    #member-center {
        width: 100%;
        height: 100vh;
        margin: 0;
        background-color: #f2f2f2;
        padding-top: 1rem;
        box-sizing: border-box;
        display: flex;
        .memberCenterMobile {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            .memberHead {
                display: flex;
                img {
                    width: 100%;
                }
            }
            .memberName {
                font-size: .2rem;
                margin-top: .1rem;
            }
            .myOrder {
                width: 70%;
                background-color: rgb(233, 233, 233);
                font-size: .15rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 .1rem;
                box-sizing: border-box;
                line-height: .3rem;
                margin-top: .3rem;
                color: black;
                text-decoration: none;
                .iconfont {
                    font-size: .2rem;
                }
                .orderT {
                    margin-right: 50%;
                }
            }
            .memset {
                width: 70%;
                background-color: rgb(233, 233, 233);
                font-size: .15rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 .1rem;
                box-sizing: border-box;
                line-height: .3rem;
                margin-top: .2rem;
                color: black;
                text-decoration: none;
                .iconfont {
                    font-size: .2rem;
                }
                .setT {
                    margin-right: 50%;
                }
            }
            button {
                margin-top: .3rem;
                width: 70%;
                height: 5vh;
                background-color: #2693d4;
                border: none;
                color: white;
                outline: none;
            }
        }
    }
}
</style>
<style lang="less">
@media screen and (max-width: 767px) {
    #member-center {
        width: 100% !important;
        margin: 0 !important;
        >div {
            width: 100%;
        }
    }
}
</style>

