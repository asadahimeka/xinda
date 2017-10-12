<template>
    <div class="sett">
        <div class="sett1" v-if="$isPC">
            <a href="javascript:;" class="settin1 m" @click="zhszhxgmm1">账户设置</a>
            <a href="javascript:;" class="settin2" @click="zhszhxgmm2">修改密码</a>
        </div>
        <div class="setti" v-if="$isPC">
            <!--账户设置部分-->
            <div class="sett2">
                <span>修改头像：</span>
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="sett3">
                <span>姓名：</span><input class="input" type="text" name="" placeholder="请输入姓名" v-model="newname" @focus="focus"></div>
            <div class="sett4">
                <span>性别：</span>
                <input type="radio" name="sex" @click="sex=1" :checked="sex==1">&nbsp;男
                <input type="radio" style="margin-left:20px" name="sex" @click="sex=0" :checked="sex==0">&nbsp;女
            </div>
            <div class="sett3">
                <span>邮箱：</span><input class="input" type="text" placeholder="请输入邮箱地址" v-model="email" @focus="focus">
            </div>
            <div class="sett5">
                <span>所在地区：</span>
                <select name="" id="province" @change="ChaProvinceEl" v-model="provinceVal">
                    <option value="all" selected>省</option>
                    <option v-for="(province,i) in ProvinceAll" :value="province.item_code" :key="i">{{province.item_name}}</option>
                </select>
                <select name="" id="city" @change="ChaCityEl" v-model="cityVal">
                    <option value="all" selected>市</option>
                    <option v-for="(city,i) in CityAll" :value="city.item_code" :key="i">{{city.item_name}}</option>
                </select>
                <select name="" id="district" v-model="districtVal">
                    <option value="all" selected>区</option>
                    <option v-for="(district,i) in DistrictAll" :value="district.item_code" :key="i">{{district.item_name}}</option>
                </select>
            </div>
            <el-button :plain="true" @click="update">保存</el-button>
        </div>
        <!--账户设置部分-->
        <div class="password" v-if="$isPC">
            <!--修改密码部分-->
            <div>
                <span>旧密码：</span><input class="input" type="password" v-model="oldPSD"></div>
            <div>
                <span>新密码：</span><input class="input" type="password" v-model="firstPSD"></div>
            <div>
                <span>再次输入新密码：</span><input class="input" type="password" v-model="lastPSD"></div>
            <button @click="setNewPassword">保存</button>
        </div>
        <!--修改密码部分-->
        <div class="mobileALL" v-if="!$isPC">
            <div class="top">
                <div class="iconfont" @click="backHistory">
                    &#xe61f;
                </div>
                <div class="title">
                    账户设置
                </div>
            </div>
            <div class="totalset">
                <div class="firstTT">
                    <p>账户设置</p>
                    <div class="titleLINE"></div>
                </div>
                <div class="sett2">
                    <span>修改头像：</span>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="sett3">
                    <span>姓名：</span><input class="input" type="text" name="" placeholder="请输入姓名" v-model="newname" @focus="focus"></div>
                <div class="sett4">
                    <span>性别：</span>
                    <input type="radio" name="sex" @click="sex=1" :checked="sex==1">&nbsp;男
                    <input type="radio" style="margin-left:20px" name="sex" @click="sex=0" :checked="sex==0">&nbsp;女
                </div>
                <div class="sett3">
                    <span>邮箱：</span><input class="input" type="text" placeholder="请输入邮箱地址" v-model="email" @focus="focus">
                </div>
                <div class="sett5">
                    <span>所在地区：</span>
                    <select name="" id="province" @change="ChaProvinceEl" v-model="provinceVal">
                        <option value="all" selected>省</option>
                        <option v-for="(province,i) in ProvinceAll" :value="province.item_code" :key="i">{{province.item_name}}</option>
                    </select>
                    <select name="" id="city" @change="ChaCityEl" v-model="cityVal">
                        <option value="all" selected>市</option>
                        <option v-for="(city,i) in CityAll" :value="city.item_code" :key="i">{{city.item_name}}</option>
                    </select>
                    <select name="" id="district" v-model="districtVal">
                        <option value="all" selected>区</option>
                        <option v-for="(district,i) in DistrictAll" :value="district.item_code" :key="i">{{district.item_name}}</option>
                    </select>
                </div>
                <el-button :plain="true" @click="update">保存</el-button>
            </div>
            <div class="psdset">
                <div class="firstTT">
                    <p>密码修改</p>
                    <div class="titleLINE"></div>
                </div>
                <div class="line">
                    <span>旧密码：</span><input class="input" type="password" v-model="oldPSD">
                </div>
                <div class="line">
                    <span>新密码：</span><input class="input" type="password" v-model="firstPSD">
                </div>
                <div class="line">
                    <span>再次输入新密码：</span><input class="input" type="password" v-model="lastPSD">
                </div>
                <button @click="setNewPassword">保存</button>
            </div>
        </div>
        <!-- 手机端一体化 -->
    </div>
</template>

<script>
import md5 from 'js-md5'
export default {
    created() {
        this.$ajax.post('/xinda-api/member/info').then((userMsg) => {
            if (userMsg.data.status == 1) {
                // this.imageUrl = userMsg.data.data.headImg;
                this.newname = userMsg.data.data.name;
                this.sex = userMsg.data.data.gender;
                this.email = userMsg.data.data.email;
            } else {
                this.$message.warning(userMsg.data.msg);
            }
        }).catch((error) => {
            console.log('error', error);
        });
        this.getProvinceData();
    },
    data() {
        return {
            newname: '',//用户新设置用户名的value值
            sex: 1,//用户新设置的性别
            email: '',//用户新设置的电子邮箱
            oldPSD: '',//旧密码的value值
            firstPSD: '',//第一次输入新密码的value值
            lastPSD: '',//再一次输入新密码的value值
            // 下面是所有省市区三级联动用到的元素
            ProvinceAll: [],//所有的省元素
            provinceVal: 'all',//默认选中的省元素
            CityAll: [],//对应省元素的所有市元素
            cityVal: 'all',//默认选中的市元素
            DistrictAll: [],//对应区元素的所有区元素
            districtVal: 'all',//默认选中的区元素
            imageUrl: '',
        };
    },
    methods: {
        backHistory: function() {
            history.go(-1);
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$message.success('Upload avatar succeed.')
        },
        focus() {
            event.target.select();
        },
        zhszhxgmm1: function() {
            var setti = document.getElementsByClassName('setti')[0];
            var settin1 = document.getElementsByClassName('settin1')[0];
            var settin2 = document.getElementsByClassName('settin2')[0];
            var password = document.getElementsByClassName('password')[0];
            setti.style.display = 'block';
            password.style.display = 'none';
            settin1.style.color = "#2693d4";
            settin1.style.borderBottom = "1px solid #2693d4";
            settin2.style.color = "#333";
            settin2.style.borderBottom = "none";
        },
        zhszhxgmm2: function() {
            var setti = document.getElementsByClassName('setti')[0];
            var settin1 = document.getElementsByClassName('settin1')[0];
            var settin2 = document.getElementsByClassName('settin2')[0];
            var password = document.getElementsByClassName('password')[0];
            password.style.display = 'block';
            setti.style.display = 'none';
            settin2.style.color = "#2693d4";
            settin2.style.borderBottom = "1px solid #2693d4";
            settin1.style.color = "#333";
            settin1.style.borderBottom = "none";
        },
        // 错误信息提示
        open4(errorMsg) {
            this.$message.error(errorMsg);
        },
        // 成功信息提示
        open2(successMsg) {
            this.$message({
                message: successMsg,
                type: 'success'
            });
        },
        // 上传新个人信息
        update: function() {
            // 姓名校验
            var nametest = /[\u4e00-\u9fa5]{2,}/;
            if (!nametest.test(this.newname)) {
                this.open4('请输入正确的中文姓名');
                return false;
            };
            // 邮箱校验
            var emailtest = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+$)/;
            if (!emailtest.test(this.email)) {
                this.open4('请输入正确的邮箱');
                return false;
            };
            // 地区校验
            if (this.districtVal == 'all') {
                this.open4('请选择正确的个人地区信息');
                return false;
            };
            // 本地校验完成，上传到服务器进行校验
            var information = {
                headImg: this.imageUrl.substring(this.imageUrl.lastIndexOf('/'), this.imageUrl.length),
                name: this.newname,
                gender: this.sex,
                email: this.email,
                regionId: this.districtVal,
            }
            this.$ajax.post('/xinda-api/member/update-info', information, {}).then((info) => {
                if (info.data.status == 1) {
                    this.open2('信息更改成功');
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                } else {
                    this.open4(info.data.msg);
                }
            }).catch((error) => {
                console.log('error', error);
            })
        },
        // 两次密码对比
        comparise: function() {
            var testPassword = /^(\w){6,20}$/;
            if (!testPassword.test(this.firstPSD)) {
                this.open4('密码格式不正确');
                return false;
            }
            var y = this.firstPSD == this.lastPSD ? true : this.open4('两次密码输入不一致');
            return y;
        },
        // 上传新密码
        setNewPassword: function() {
            if (this.comparise()) {
                var pw = {
                    oldPwd: md5(this.oldPSD),
                    newPwd: md5(this.lastPSD),
                };
                this.$ajax.post('/xinda-api/sso/change-pwd', pw, {}).then((msg) => {
                    console.log(msg);
                    if (msg.data.status == 1) {
                        this.open2(msg.data.msg);
                    } else {
                        this.open4(msg.data.msg);
                    }
                }).catch((error) => {
                    console.log('error', error);
                })
            };
        },

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

<style lang="less" >
.el-radio__input.is-checked {
    width: 18px;
}

.el-button.is-plain:focus,
.el-button.is-plain:hover {
    background-color: coral;
    color: #fff;
    background: coral;
}

.el-radio__inner {
    width: 18px;
}

.sett {
    width: 930px;
    .password {
        display: none;
    }
    .setti>div {
        display: flex;
        align-items: center;
        span {
            width: 90px;
        }
    }
    .sett1 {
        height: 40px;
        width: 920px;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #ddd;
        margin: 25px 0;
        .m {
            color: #2693d4;
            border-bottom: 1px solid #2693d4;
            transition: all .3s ease-in-out;
        }
        a {
            display: inline-block;
            width: 80px;
            padding: 0 30px;
            color: #333;
            font-size: 18px;
            text-decoration: none;
        }
    }
    .sett2 {
        height: 120px;
        display: flex;
        align-items: center;
        img {
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
            border-radius: 50px;
            margin: 10 5px;
            overflow: hidden;
        }
    }
    .sett3 {
        height: 45px;
        margin: 20px 0;
    }
    .sett5 {
        select {
            width: 80px;
            height: 30px;
            margin-right: 10px;
        }
    }
    button {
        width: 100px;
        height: 40px;
        font-size: 18px;
        margin: 40px 0 0 100px;
        border-radius: 7px;
        color: seashell;
        border: 0;
        background: coral;
    }
    .input {
        width: 240px;
        height: 30px;
        font-size: 16px;
    }
    .password>div {
        margin-top: 20px;
        display: flex;
        align-items: center;
        span {
            width: 150px;
            font-size: 18px;
        }
    }
}

input {
    padding-left: 10px;
    color: #666;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 100%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    display: block;
}

@media screen and (max-width:768px) {
    .sett {
        width: 100%;
        height: 90vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #f2f2f2;
        overflow-y: auto;
        .sett3 {
            margin-top: .15rem;
        }
        .firstTT {
            margin-top: .2rem;
        }
        .titleLINE {
            margin-top: .1rem;
            width: 95%;
            height: .01rem;
            background-color: #2693d4;
            position: relative;
            &:before {
                content: '';
                width: 0;
                height: 0;
                border-left: .03rem solid transparent;
                border-right: .03rem solid transparent;
                border-bottom: .06rem solid #2693d4;
                position: absolute;
                top: -.05rem;
                left: .3rem;
            }
        }
        button {
            width: 1rem;
            margin: .3rem;
            height: .3rem;
            font-size: .15rem;
            background-color: #2693d4;
            padding: 0;
        }
        .top {
            width: 100%;
            border-bottom: .01rem solid #b1b1b1;
            height: .5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            .iconfont {
                position: absolute;
                top: 0;
                left: 0;
                width: .5rem;
                height: .5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .3rem;
            }
            .title {
                font-size: .2rem;
            }
        }
        .totalset {
            width: 100%;
            background-color: #fff;
            margin-top: .2rem;
            font-size: .15rem;
            border-bottom: .01rem solid #b1b1b1;
            border-top: .01rem solid #b1b1b1;
            padding-left: .2rem;
            box-sizing: border-box;
            input {
                width: 60%;
                margin-left: .35rem;
            }
            input[type="radio"] {
                width: .1rem;
            }
            select {
                width: 20%;
            }
        }
        .psdset {
            width: 100%;
            background-color: #fff;
            margin-top: .2rem;
            font-size: .15rem;
            border-bottom: .01rem solid #b1b1b1;
            border-top: .01rem solid #b1b1b1;
            padding-left: .2rem;
            box-sizing: border-box;
            div.line {
                width: 90%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: .6rem;
                margin-top: .01rem;
            }
            input {
                width: 55%; 
            }
        }
    }
}
</style>
