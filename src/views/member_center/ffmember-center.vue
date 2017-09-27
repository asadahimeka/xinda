<template>
    <div id="member-center">
        <div class="member-left">
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
                <div :class="{act:$route.path=='/MemberCen'}">
                    <a href="/#/MemberCen" class="myOrder">我的订单</a>
                </div>
                <div :class="{act:$route.path=='/MemberCen/Evaluate'}">
                    <a href="/#/MemberCen/Evaluate" class="userComment">用户评价</a>
                </div>
                <div :class="{act:$route.path=='/MemberCen/Uerset'}">
                    <a href="/#/MemberCen/Uerset" class="accountSetup">账户设置</a>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    created() {
        this.ajax.post('/xinda-api/member/info').then((userMsg) => {
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
        dealSrc(src) {
            return /^\/[^/]/.test(src) ? "http://115.182.107.203:8088/xinda/pic" + src : src;
        },
    },
    computed: {
        ...mapGetters(['getExUser']),
    },
    watch: {
        getExUser(val) {
            if (val == 0) {
                this.$router.push('/#/');
            }
        }
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
                background: url("../../../static/images/dingdan.png") no-repeat 50px 13px;
            }
            .userComment {
                background: url("../../../static/images/useevaluationr.png") no-repeat 50px 15px;
            }
            .accountSetup {
                background: url("../../../static/images/set.png") no-repeat 47px 12.5px;
            }
        }
    }
}

.act {
    background: #d7d7d7;
}
</style>
