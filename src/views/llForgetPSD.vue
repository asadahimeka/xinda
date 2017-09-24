<template>
    <div class="getPSDFrame">
        <div class="LineLogoPosition">
            <div class="LineLogo">
                <a href="/" class="logo">
                    <img src="../../static/images/QQ图片20170517185752.png" alt="">
                    <p>信达</p>
                </a>
                <div class="setget">
                    <!-- 这是一个分隔线 -->
                </div>
                <div class="forgetText">
                    忘记密码
                </div>
            </div>
        </div>
        <div class="mainBody">
            <div class="mes">
                <el-alert :title="stitle" type="success" :closable="false" v-if="stitle">
                </el-alert>
                <el-alert :title="etitle" type="error" :closable="false" v-if="etitle">
                </el-alert>
            </div>
            <div class="bodyLeft">
                <input type="number" placeholder="请输入手机号码" v-model="phone" @focus="cleanMsg" @blur="unkey" autofocus>
                <input type="text" placeholder="请输入图片验证码" v-model="imgCode" @focus="cleanMsg" @blur="unkey">
                <div class="verCode" @click="F5">
                    <!-- 这里是图片验证码 -->
                    <img :src="src" alt="">
                </div>
                <input type="text" placeholder="请输入短信验证码" v-model="msgTest" @focus="cleanMsg" @blur="unkey">
                <button class="getVer" @click="getMessage">{{getMessageBtn}}</button>
                <input type="password" placeholder="请输入新密码" v-model="fPSD" @focus="cleanMsg" @blur="unkey">
                <input type="password" placeholder="请再次确认密码" v-model="sPSD" @blur="contrast" @focus="cleanMsg">
                <button class="confirm" @click="modifyNow">
                    确认修改
                </button>
            </div>
            <div class="setget">
                <!-- 这是一个分隔线 -->
            </div>
            <div class="bodyRight">
                <div class="rememberPSD">
                    想起密码来了？
                </div>
                <div class="ToLogo">
                    <a href="/#/Logon">返回登录>></a>
                </div>
                <div class="getRight">
                    <img src="../../static/images/getRight.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5'
export default {
    data() {
        return {
            src: '/xinda-api/ajaxAuthcode',//图片验证码获取地址
            phone: '',//电话号码的Value值
            stitle: '',//成功信息的title值
            etitle: '',//错误信息的title值
            msgTest: '',//短信验证码的Value
            getMessageBtn: '点击获取',//点击获取按钮
            imgCode: '',//图片验证码的Value值
            fPSD: '',//第一次输入新密码的Value值
            sPSD: '',//第二次输入新密码的Value值
        }
    },
    methods: {
        F5: function() {//刷新验证码
            this.src = '/xinda-api/ajaxAuthcode?' + Math.random().toString().substr(2, 4);
        },
        testPhone: function() {//手机号本地校验
            var testphone = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!testphone.test(this.phone)) {
                this.etitle = '手机号输入有误！';
                this.F5();
                return 0;
            };
            return 1;
        },
        cleanMsg: function() {//清空提示信息
            this.stitle = '';
            this.etitle = '';
            onkeydown = (e) => {
                if (e.keyCode == 13) {
                    this.modifyNow();
                }
            };
        },
        getMessage: function(e) {//获取短信验证码
            if (this.testPhone()) {
                var message = {
                    cellphone: this.phone,
                    smsType: 2,
                    imgCode: this.imgCode
                };
                this.ajax.post('/xinda-api/register/sendsms', message, {}).then((fontMessage) => {
                    if (fontMessage.data.status == 1) {
                        this.etitle = '';
                        this.stitle = fontMessage.data.msg;
                        setTimeout(() => {
                            this.stitle = '';
                        }, 2000);
                        this.getMessageBtn = 59;
                        e.target.disabled = true;
                        e.target.style.backgroundColor = '#f1f1f1';
                        var timeLoop = setInterval(() => {
                            this.getMessageBtn -= 1;
                            if (this.getMessageBtn == 0) {
                                this.getMessageBtn = '点击获取';
                                e.target.disabled = false;
                                e.target.style.backgroundColor = '#fff';
                                this.F5();
                                clearInterval(timeLoop);
                            }
                        }, 1000)
                    } else {
                        this.etitle = fontMessage.data.msg;
                        this.F5();
                    }
                }).catch((error) => {
                    console.log('e', error);
                })
            };
        },
        contrast: function() {//密码本地对比
            onkeydown = (e) => {
                if (e.keyCode == 13) {
                    return false;
                }
            }
            return this.etitle = this.fPSD == this.sPSD ? '' : '两次密码输入不一致';
        },
        unkey: function() {
            onkeydown = (e) => {
                if (e.keyCode == 13) {
                    return false;
                }
            }
        },
        toLogon: function() {//返回登录界面
            this.$router.push('/Logon');
        },
        modifyNow: function() {//确认密码修改按钮
            if (this.contrast()) {
                return false;
            };
            var modifyPar = {
                cellphone: this.phone,
                smsType: 2,
                validCode: this.msgTest,
                password: md5(this.sPSD),
            };
            this.ajax.post('/xinda-api/register/findpas', modifyPar, {}).then((res) => {
                if (res.data.status == 1) {
                    this.stitle = res.data.msg;
                    //修改成功后返回登录页面,直接调用方法
                    setTimeout(() => {
                        this.toLogon();
                    }, 2000);
                } else {
                    this.etitle = res.data.msg;
                }
            }).catch((error) => {
                console.log('error', error);
            })
        }
    }
}
</script>

<style lang="less">
.getPSDFrame {
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .LineLogoPosition {
        width: 100%;
        height: 97px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        .LineLogo {
            width: 1200px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .logo {
                display: flex;
                align-items: center;
                margin-right: 38px;
                img {
                    margin-right: 12px;
                }
                p {
                    font-size: 30px;
                    color: black;
                    font-weight: 600;
                }
            }
            .setget {
                width: 1px;
                height: 47px;
                background-color: #cbcbcb;
                margin-right: 26px;
            }
            .forgetText {
                font-size: 18px;
                color: #2a2a2a;
                line-height: 18px;
            }
        }
    }
    .mainBody {
        width: 1200px;
        height: 435px;
        background-color: #fff;
        margin-top: 42px;
        margin-bottom: 176px;
        display: flex;
        align-items: center;
        position: relative;
        .mes {
            position: absolute;
            width: 300px;
            height: 30px;
            left: 50%;
            top: 5px;
            margin-left: -150px;
        }
        .bodyLeft {
            width: 599px;
            height: 100%;
            padding: 0 100px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: flex-start;
            box-sizing: border-box;
            align-content: flex-start;

            button {
                height: 36px;
                outline: none;
                color: #2693d4;
                border: 1px solid #2693d4;
                border-radius: 3px;
                box-sizing: border-box;
                background-color: #fff;
                margin-top: 19px;
            }
            input {
                height: 36px;
                outline: none;
                border: 1px solid #cbcbcb;
                border-radius: 3px;
                padding-left: 15px;
                box-sizing: border-box;
                margin-top: 19px;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none !important;
                margin: 0;
            }
            input[type="number"] {
                -moz-appearance: textfield;
                width: 283px;
                margin-top: 53px;
            }
            input[type=text] {
                width: 174px;
                margin-right: 9px;
            }
            .verCode {
                width: 85px;
                height: 36px;
                background-color: black;
                margin-top: 19px;
                margin-right: 15px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .getVer {
                width: 100px;
                font-size: 18px;
            }
            input[type=password] {
                width: 283px;
            }
            .confirm {
                width: 283px;
                font-size: 18px;
            }
        }
        .setget {
            width: 1px;
            height: 261px;
            background-color: #dadada;
        }
        .bodyRight {
            width: 599px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: flex-start;
            .rememberPSD {
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                margin-top: 53px;
            }
            .ToLogo {
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                margin-top: 23px;
            }
            .getRight {
                margin-top: 15px;
            }
        }
    }
}
</style>