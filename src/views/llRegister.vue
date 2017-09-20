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
                <input type="number" placeholder="请输入手机号码" v-model="phone" @focus="noError">
                <input type="text" placeholder="请输入图片验证码" v-model="imgCode" @focus="noError">
                <div class="verCode">
                    <!-- 这里是验证码图片 -->
                    <img :src="src" alt="" @click="F5">
                </div>
                <input type="text" class="VerCode" placeholder="请输入短信验证码" @focus="noError">
                <button class="clickGet" @click="getMessage">{{getMessageBtn}}</button>
                <div class="area">
                    <select name="" id="province" @change="ChaProvinceEl" v-model="provinceVal">
                        <option value="all" selected>省</option>
                        <option v-for="province in ProvinceAll" :value="province.item_code">{{province.item_name}}</option>
                    </select>
                    <select name="" id="city" @change="ChaCityEl" v-model="cityVal">
                        <option value="all" selected>市</option>
                        <option v-for="city in CityAll" :value="city.item_code">{{city.item_name}}</option>
                    </select>
                    <select name="" id="district" v-model="districtVal">
                        <option value="all" selected>区</option>
                        <option v-for="district in DistrictAll" :value="district.item_code">{{district.item_name}}</option>
                    </select>
                </div>
                <input type="password" placeholder="请设置密码" v-model="PSD" @focus="noError">
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
// import qs from 'qs'
export default {
    created() {
        this.getProvinceData();
    },
    data() {
        return {
            errormsg: '',//显示错误信息
            phone: '',//绑定手机号的Value值
            imgCode: '',//图片验证码的Value值
            PSD: '',
            getMessageBtn: '点击获取',
            src: '/xinda-api/ajaxAuthcode',
            //下面是省市区三级联动的所有应用元素👇
            ProvinceAll: [],//所有的省元素
            provinceVal: 'all',//默认选中的省元素
            CityAll: [],//对应省元素的所有市元素
            cityVal: 'all',//默认选中的市元素
            DistrictAll: [],//对应区元素的所有区元素
            districtVal: 'all',//默认选中的区元素
        }
    },
    methods: {
        noError: function() {
            this.errormsg = '';
        },
        getMessage: function(e) {
            //点击获取短信验证码
            if (this.testPhone()) {
                var message = {
                    cellphone: this.phone,
                    smsType: 1,
                    imgCode: this.imgCode
                };
                this.ajax.post('/xinda-api/register/sendsms', message, {}).then((fontMessage) => {
                    console.log(fontMessage);
                    if (fontMessage.data.status == 1) {
                        this.errormsg = '';
                        e.target.disabled = true;
                        e.target.style.backgroundColor = '#f5f5f5';
                        this.getMessageBtn = 59;
                        var timeLoop = setInterval(() => {
                            this.getMessageBtn -= 1;
                            if (this.getMessageBtn == 0) {
                                this.getMessageBtn = '点击获取';
                                e.target.disabled = false;
                                e.target.style.backgroundColor = '#fff';
                            }
                        }, 1000)
                    } else {
                        this.errormsg = fontMessage.data.msg;
                        this.F5();
                    }
                }).catch((error) => {
                    console.log('e', error);
                })
            };
        },
        F5: function() {//刷新验证码
            // console.log(e.target);
            this.src = '/xinda-api/ajaxAuthcode?' + Math.random().toString().substr(2, 4);
        },
        testPhone: function() {
            // 手机号本地校验正则
            var testPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!testPhone.test(this.phone)) {
                this.errormsg = '手机号输入不正确！';
                return false;
            };
            return true;
        },
        testPassword: function() {
            // 密码本地校验正则
            var testPassword = /^(\w){6,20}$/;
            if (!testPassword.test(this.PSD)) {
                this.errormsg = '密码不符合规范！'
                return false;
            };
        },
        registeNow: function() {
            this.testPhone();
            this.testPassword();
        },
        //👇👇👇👇👇👇👇👇👇👇👇👇省市区三级联动 纯手写源生js👇👇👇👇👇👇👇👇👇👇👇👇👇
        //获取省市区的select元素
        // var provinceEl = document.getElementById("province");
        // var cityEl = document.getElementById("city");
        // var districtEl = document.getElementById("district");
        //获取省元素
        getProvinceData: function() {
            for (var i = 0; i < cityJson.length; i++) {
                if (cityJson[i].item_code.substr(2, 2) == "00") {
                    this.ProvinceAll.push(cityJson[i]);
                }
            }
        },
        //添加省元素 ---→ 通过v-for遍历数组添加省元素

        //根据省元素 添加/删除 市 元素
        ChaProvinceEl: function() {
            this.cityVal = 'all';
            this.districtVal = 'all';
            if (this.provinceVal == "all") {
                this.deleteCity();
                this.deleteDistrict();
            } else {
                this.deleteCity();
                this.deleteDistrict();
                var cityData = this.getCityDataByP(this.provinceVal);
            }
        },
        //根据省份获取城市元素
        getCityDataByP: function(code) {
            var prev = code.substr(0, 2);
            for (var i = 0; i < cityJson.length; i++) {
                var ic = cityJson[i].item_code;
                if (ic.indexOf(prev) == 0 && ic.substr(4, 2) == "00" && ic.substr(2, 2) != "00") {
                    this.CityAll.push(cityJson[i]);
                }
            }
            // console.log(this.CityAll)
        },
        //根据市元素 添加/删除 区元素
        ChaCityEl: function() {
            this.districtVal = 'all';
            if (this.value == "all") {
                this.deleteDistrict();
            } else {
                this.deleteDistrict();
                var districtData = this.getdistrictByC(this.cityVal);
            }
        },
        //根据城市获取区元素
        getdistrictByC: function(sode) {
            var prev = sode.substr(0, 2);
            var cit = sode.substr(2, 2);
            for (var i = 0; i < cityJson.length; i++) {
                var ic = cityJson[i].item_code;
                if (ic.indexOf(prev) == 0 && ic.indexOf(cit) == 2 && ic.substr(4, 2) != "00") {
                    this.DistrictAll.push(cityJson[i]);
                }
            }
        },
        //删除市元素
        deleteCity: function() {
            this.CityAll = [];
        },
        //删除区元素
        deleteDistrict: function() {
            this.DistrictAll = [];
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
                    font-size: 16px;
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
