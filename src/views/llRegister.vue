<template>
    <div class="Register">
        <div class="lineLogo">
            <div class="LinePosition">
                <a href="/" class="Logo">
                    <img src="../../static/images/QQ图片20170517185752.png" alt="">
                    <p>信达</p>
                </a>
                <div class="setget">
                    <!-- 这是一条分隔线 -->
                </div>
                <div class="wel">
                    欢迎注册
                </div>
            </div>
        </div>
        <div class="mainBody">
            <div class="registerLeft">
                <input type="number" placeholder="请输入手机号码" v-model="phone">
                <input type="text" placeholder="请输入验证码" v-model="imgCode">
                <div class="verCode">
                    <!-- 这里是验证码图片 -->
                    <img src="/xinda-api/ajaxAuthcode" @click="F5">
                </div>
                <input type="text" class="VerCode" placeholder="请输入短信验证码">
                <button class="clickGet" @click="getMessage">点击获取</button>
                <div class="area">
                    <select name="" id="province">
                        <option value="all" selected>省</option>
                    </select>
                    <select name="" id="city">
                        <option value="all" selected>市</option>
                    </select>
                    <select name="" id="district">
                        <option value="all" selected>区</option>
                    </select>
                </div>
                <input type="password" placeholder="请设置密码">
                <div class="error">
                    <!-- 这里显示错误信息 -->
                    {{errormsg}}
                </div>
                <button class="registerNow" @click="registeNow">立即注册</button>
                <div class="agreement">
                    <p>注册即同意遵守</p>
                    <a>《服务协议》</a>
                </div>
            </div>
            <div class="setget">
                <!-- 这是一个用来间隔的div -->
            </div>
            <div class="registerRight">
                <p>已有帐号？</p>
                <p>
                    <a href="/#/Logon">立即登录>></a>
                </p>
                <div class="getRight">
                    <img src="../../static/images/getRight.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    created() {

    },
    data() {
        return {
            errormsg: '',
            imgVer: '',
            phone: '',
            imgCode: '',
        }
    },
    methods: {
        registeNow: function() {
            // 手机号本地校验
            var testPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!testPhone.test(this.phone)) {
                this.errormsg = '手机号输入不正确！';
                return false;
            }
        },
        getMessage: function() {//此处验证码无法输入正确*************************************************************************
            this.registeNow();
            var message = qs.stringify({
                cellphone: this.phone,
                smsType: 1,
                imgCode: this.imgCode
            });
            this.ajax.post('/xinda-api/register/sendsms', message, {}).then((fontMessage) => {
                console.log('F', fontMessage);
            }).catch((error) => {
                console.log('e', error);
            })
        },
        F5:function(e){
            // console.log(e.target);
            e.target.src = '/xinda-api/ajaxAuthcode';
        }
    }
}
</script>

<style lang="less">
.Register {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f5f5f5;
    .lineLogo {
        width: 100%;
        height: 97px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        .LinePosition {
            width: 1200px;
            height: 100%;
            display: flex;
            align-items: center;
            .Logo {
                margin-right: 12px;
                display: flex;
                align-items: center;
                margin-right: 38px;
                user-select: none;
                p {
                    font-size: 30px;
                    font-weight: 600;
                    color: black;
                }
            }
            .setget {
                width: 1px;
                height: 47px;
                background-color: #b4b4b4;
                margin-right: 26px;
            }
            .wel {
                font-size: 18px;
                color: #2a2a2a;
            }
        }
    }
    .mainBody {
        width: 1200px;
        height: 435px;
        display: flex;
        background-color: #fff;
        margin-top: 42px;
        margin-bottom: 176px;
        align-items: center;
        .registerLeft {
            width: 599px;
            height: 435px;
            padding: 0 100px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            box-sizing: border-box;
            align-content: flex-start;
            input {
                padding: 0 15px;
                outline: none;
            }
            button {
                outline: none;
                color: #2693d4;
                border: 1px solid #2693d4;
                border-radius: 3px;
                box-sizing: border-box;
                background-color: #fff;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none !important;
                margin: 0;
            }
            input[type="number"] {
                -moz-appearance: textfield;
            }
            input[type=number] {
                width: 283px;
                height: 36px;
                border: 1px solid #cbcbcb;
                border-radius: 3px;
                box-sizing: border-box;
                margin-top: 53px;
            }
            input[type=text] {
                width: 174px;
                height: 36px;
                border: 1px solid #cbcbcb;
                border-radius: 3px;
                box-sizing: border-box;
                margin-top: 19px;
                margin-right: 9px;
            }
            .verCode {
                width: 85px;
                height: 36px;
                background-color: #000;
                margin-top: 19px;
                margin-right: 15px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .clickGet {
                //获取验证码按钮
                width: 100px;
                height: 36px;
                margin-top: 19px;
                font-size: 16px;
            }
            .area {
                width: 283px;
                height: 36px;
                margin-top: 21px;
                display: flex;
                justify-content: space-between;
                select {
                    width: 80px;
                    height: 36px;
                    font-size: 18px;
                    padding-left: 10px;
                    box-sizing: border-box;
                }
            }
            input[type=password] {
                width: 283px;
                height: 36px;
                border: 1px solid #cbcbcb;
                border-radius: 3px;
                box-sizing: border-box;
                margin-top: 25px;
            }
            .error {
                width: 283px;
                height: 26px;
                font-size: 12px;
                color: red;
                line-height: 36px;
                padding-left: 15px;
                box-sizing: border-box;
            }
            .registerNow {
                width: 283px;
                height: 36px;
                font-size: 16px;
            }
            .agreement {
                width: 283px;
                display: flex;
                justify-content: center;
                line-height: 36px;
                font-size: 14px;
            }
        }
        .setget {
            width: 1px;
            height: 261px;
            background-color: #b4b4b4;
        }
        .registerRight {
            width: 599px;
            height: 435px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: flex-start;
            p {
                width: 100%;
                height: 18px;
                font-size: 18px;
                line-height: 18px;
                margin-top: 53px;
                display: flex;
                justify-content: center;
                &:nth-child(2) {
                    margin-top: 23px;
                }
            }
            .getRight {
                margin-top: 15px;
            }
        }
    }
}
</style>
