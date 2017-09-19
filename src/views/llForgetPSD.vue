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
            <div class="bodyLeft">
                <input type="number" placeholder="请输入手机号码">
                <input type="text" placeholder="请输入图片验证码">
                <div class="verCode">
                    <!-- 这里是图片验证码 -->
                </div>
                <input type="text" placeholder="请输入短信验证码">
                <button class="getVer">
                    点击获取
                </button>
                <input type="password" placeholder="请输入新密码">
                <input type="password" placeholder="请再次确认密码">
                <button class="confirm">
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
export default {

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
            input[type=text]{
                width: 174px;
                margin-right: 9px;
            }
            .verCode{
                width: 85px;
                height: 36px;
                background-color: black;
                margin-top: 19px;
                margin-right: 15px;
            }
            .getVer{
                width: 100px;
                font-size: 18px;
            }
            input[type=password]{
                width: 283px;
            }
            .confirm{
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
            .rememberPSD{
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                margin-top: 53px;
            }
            .ToLogo{
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                margin-top: 23px;
            }
            .getRight{
                margin-top: 15px;
            }
        }
    }
}
</style>