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
                <input type="number" placeholder="请输入手机号码">
                <input type="text" placeholder="请输入验证码">
                <div class="verCode">
                    <!-- 这里是验证码图片 -->
                </div>
                <input type="text" class="VerCode" placeholder="请输入短信验证码">
                <button class="clickGet">点击获取</button>
                <div class="area">
                    <select name="" id="">
                        <option value="all" selected>省</option>
                    </select>
                    <select name="" id="">
                        <option value="all" selected>市</option>
                    </select>
                    <select name="" id="">
                        <option value="all" selected>区</option>
                    </select>
                </div>
                <input type="password" placeholder="请设置密码">
                <button class="registerNow">立即注册</button>
                <div class="agreement">
                    <p>注册即同意遵守</p>
                    <a>《服务协议》</a>
                </div>
            </div>
            <div class="setget">
                <!-- 这是一个用来间隔的div -->
            </div>
            <div class="registerRight">

            </div>
        </div>
    </div>
</template>

<script>
export default {

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
            }
            .clickGet {
                //获取验证码按钮
                width: 100px;
                height: 36px;
                margin-top: 19px;
                font-size: 18px;
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
            .registerNow {
                width: 283px;
                height: 36px;
                margin-top: 26px;
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
        }
    }
}
</style>
