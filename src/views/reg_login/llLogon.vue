<template>
    <div class="logonFrame">
        <div class="logoLine">
            <div class="autoLine">
                <a href="/#">
                    <img src="../../../static/images/QQ图片20170517185752.png" alt="">
                    <p>信达</p>
                </a>
                <div class="getset">
                    <!-- 分隔 -->
                </div>
                <div class="wel">
                    欢迎登录
                </div>
            </div>
        </div>
        <div class="mainBody">
            <div class="inLogon">
                <input type="number" placeholder="请输入手机号" v-model="phone" @focus="thisFocus" autofocus>
                <input type="password" placeholder="请输入密码" v-model="password" @focus="thisFocus">
                <input type="text" placeholder="请输入验证码" v-model="imgtest" @focus="thisFocus">
                <div class="verCode" style="background-color:black">
                    <!-- 这里是验证码图片 -->
                    <img :src="src" alt="" @click="F5">
                </div>
                <div class="getPSD">
                    <a href="/ForPSD">忘记密码？</a>
                </div>
                <button @click="logonNow">立即登录</button>
            </div>
            <div class="getset">
                <!-- 又仅仅是一条分隔线 -->
            </div>
            <div class="returnRegister">
                <div class="question">
                    还没有帐号？
                </div>
                <div class="Toregister">
                    <a href="#/Register" class="ToRegister">
                        立即注册>>
                    </a>
                </div>
                <div class="getRight">
                    <img src="../../../static/images/getRight.png">
                </div>
            </div>
            <el-alert :title="successMsg" type="success" show-icon :closable="false" class="success" v-if="successRe">
            </el-alert>
            <el-alert :title="failMsg" type="error" show-icon :closable="false" class="fail" v-if="failRe&&!successRe">
            </el-alert>
        </div>
    </div>
</template>

<script>
import MD5 from 'js-md5';
import { mapActions } from 'vuex';
export default {
    created() {
        this.ajax.post('/xinda-api/sso/login-info').then((user) => {
            if (user.data.status == 1) {
                this.$message({ type: 'warning', message: '您已登录！', duration: 1000 });
                this.$router.push('/')
            }
        }).catch((error) => {
            console.log(error);
        })
        onkeydown = (e) => {
            if (e.keyCode == 13) {
                this.logonNow();
            }
        }
    },
    data() {
        return {
            phone: '',
            password: '',
            imgtest: '',
            successMsg: '1',
            failMsg: '2',
            successRe: false,
            failRe: false,
            src: '/xinda-api/ajaxAuthcode',
        }
    },
    methods: {
        ...mapActions(['userAction', 'cartAction','exAction']),
        F5: function() {//刷新验证码
            this.src = '/xinda-api/ajaxAuthcode?' + Math.random().toString().substr(2, 4);
        },
        thisFocus: function() {
            this.failMsg = '';
            this.successMsg = '';
            this.successRe = false;
            this.failRe = false;
        },
        logonNow: function() {
            // 手机号码验证
            var testPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!testPhone.test(this.phone)) {
                this.failMsg = '手机号输入错误！';
                this.failRe = true;
                this.F5();
                return false;
            } else {
                var logPar = {
                    loginId: this.phone,
                    password: MD5(this.password),
                    imgCode: this.imgtest,
                }
                if (this.password && this.imgtest) {
                    this.ajax.post('/xinda-api/sso/login', logPar).then((reData) => {
                        if (reData.data.status == 1) {
                            this.successMsg = reData.data.msg;
                            this.successRe = true;
                            setTimeout(() => {
                                this.userAction(this.phone);
                                this.exAction(1);
                                if (this.$route.query.redirect) {
                                    this.$router.push(this.$route.query.redirect);
                                } else {
                                    this.$router.push('/');
                                }
                            }, 1500);
                        } else {
                            this.failMsg = reData.data.msg;
                            this.failRe = true;
                            this.F5();
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    this.failMsg = '请输入密码或验证码！';
                    this.failRe = true;
                    this.F5();
                }
            }
        }
    },

}
</script>

<style lang="less">
.logonFrame {
    background-color: #f5f5f5;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .logoLine {
        width: 100%;
        height: 97px;
        background-color: #fff;
        .autoLine {
            width: 1200px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            a {
                display: flex;
                align-items: center;
                font-size: 30px;
                color: black;
                font-weight: 600;
                user-select: none;
                margin-right: 38px;
                img {
                    margin-right: 12px;
                }
            }
            .getset {
                width: 1px;
                height: 47px;
                background-color: #b4b4b4;
                margin-right: 26px;
            }
            .wel {
                font-size: 18px;
                color: #2a2a2a;
                line-height: 18px;
            }
        }
    }
    .mainBody {
        width: 1200px;
        height: 436px;
        margin: 52px 0;
        background-color: #fff;
        display: flex;
        align-items: center;
        position: relative;
        .inLogon {
            width: 599px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: flex-start;
            padding: 0 100px;
            box-sizing: border-box;
            input {
                padding: 0 15px;
            }
            input[type=number] {
                width: 283px;
                height: 36px;
                margin-top: 53px;
                border: 1px solid #cbcbcb;
                border-radius: 3px;
                box-sizing: border-box;
                outline: none;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none !important;
                margin: 0;
            }
            input[type="number"] {
                -moz-appearance: textfield;
            }
            input[type=password] {
                width: 283px;
                height: 36px;
                margin-top: 24px;
                border: 1px solid #cbcbcb;
                border-radius: 3px;
                box-sizing: border-box;
                outline: none;
            }
            input[type=text] {
                width: 174px;
                height: 36px;
                margin-top: 24px;
                margin-right: 9px;
                border: 1px solid #cbcbcb;
                border-radius: 3px;
                box-sizing: border-box;
                outline: none;
            }
            .verCode {
                width: 85px;
                height: 36px;
                margin-top: 24px;
                margin-right: 15px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .getPSD {
                width: 283px;
                height: 36px;
                margin-top: 24px;
                display: flex;
                justify-content: flex-end;
            }
            button {
                width: 283px;
                height: 36px;
                margin-top: 24px;
                border: 1px solid #2693d4;
                border-radius: 3px;
                box-sizing: border-box;
                outline: none;
                background-color: #fff;
                font-size: 18px;
                color: #2693d4;
            }
        }
        .getset {
            width: 1px;
            height: 261px;
            background-color: #b4b4b4;
        }
        .returnRegister {
            width: 599px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: flex-start;
            .question {
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                color: black;
                margin-top: 43px;
            }
            .Toregister {
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                margin-top: 23px;
            }
            .getRight {
                margin-top: 20px;
            }
        }
        .success,
        .fail {
            position: absolute;
            width: 300px;
            height: 30px;
            left: 50%;
            top: 10px;
            margin-left: -150px;
        }
    }
}
</style>