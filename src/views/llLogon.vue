<template>
    <div class="logonFrame">
        <div class="logoLine">
            <div class="autoLine">
                <a href="/">
                    <img src="../../static/images/QQ图片20170517185752.png" alt="">
                    <p>信达</p>
                </a>
                <div class="getset">
                    <!-- 分隔 -->
                </div>
                <div class="wel">
                    欢迎登陆
                </div>
            </div>
        </div>
        <div class="mainBody">
            <div class="inLogon">
                <input type="number" placeholder="请输入手机号">
                <input type="password" placeholder="请输入密码">
                <input type="text" placeholder="请输入验证码">
                <div class="verCode" style="background-color:black">
                    <!-- 这里是验证码图片 -->
                </div>
                <div class="getPSD">
                    <a href="">忘记密码？</a>
                </div>
                <button>立即登录</button>
            </div>
            <div class="getset">
                <!-- 又仅仅是一条分隔线 -->
            </div>
            <div class="returnRegister">
                <div class="question">
                    还没有帐号？
                </div>
                <div class="Toregister">
                    <a href="" class="ToRegister">
                        立即注册>>
                    </a>
                </div>
                <div class="getRight">
                    <img src="../../static/images/getRight.png">
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
            .question{
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                color: black;
                margin-top: 43px;
            }
            .Toregister{
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                margin-top: 23px;
            }
            .getRight{
                margin-top: 20px;
            }
        }
    }
}
</style>