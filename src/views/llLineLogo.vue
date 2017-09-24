<template>
    <div class="_outer">
        <div class="_inner">
            <a class="logo_backhome" href="/">
                <div class="logo">
                    <img src="../../static/images/QQ图片20170517185752.png" alt="">
                </div>
                <div class="companyName">信达</div>
            </a>
            <div class="changeCity">
                <p class="finalCity">北京市</p>
                <a href="javascript:void(0)" @click="changeCity">[切换城市]</a>
            </div>
            <div class="searchFrame">
                <div class="interfaceForSearch">
                    <a class="interfaceActive" href="">产品</a>
                    <div class="partingLine"></div>
                    <a href="">服务商</a>
                </div>
                <div class="inputSearch">
                    <input type="text" class="search_input" placeholder="搜索您需要的服务或服务商">
                    <button class="search_button">&#xe600;</button>
                </div>
                <div class="pushService">
                    <p>热门服务：</p>
                    <a href="">社保开户</a>
                    <a href="">公司注册</a>
                </div>
            </div>
            <div class="callUs">
                <i class="iconphone">&#xe655;</i>
                <p class="phoneNumber">010-83421842</p>
            </div>
        </div>
        <div class="changeCityInner">
            <div class="title">
                <div class="titleText">
                    城市选择
                </div>
                <div class="warningText">
                    尊敬的用户您好：请选择准确的地址方便我们为您提供更精确的服务
                </div>
            </div>
            <div class="allCity">
                <div v-for="item in items" @click="endCity" :key="item.id">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    data(){
        return {
            items:'',
        }
    },
    methods: {
        changeCity: function() {
            var chooseCity = document.querySelector('.changeCityInner');
            var displayState = chooseCity.style.display;
            if(displayState == ''||displayState == 'none'){
                chooseCity.style.display = 'block';
            }
            this.ajax.post('http://115.182.107.203:8088/xinda/xinda-api/common/open-region').then((data)=>{
                this.items = data.data.data;
            }).catch(function(error){
                console.log('error',error);
            })
        },
        endCity:function(e){
            var finalCity = document.querySelector('.finalCity');
            var changeCityInner = document.querySelector('.changeCityInner');
            finalCity.innerHTML = e.target.innerHTML;
            changeCityInner.style.display = 'none';
        }
    }
}
</script>

<style lang="less">
._outer {
    width: 100%;
    height: 108px;
    padding-top: 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    ._inner {
        width: 1200px;
        height: 100%;
        display: flex;
        .logo_backhome {
            width: 124px;
            height: 83px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 28px;
            .companyName {
                line-height: 30px;
                font-size: 30px;
                color: black;
                font-family: '黑体';
                font-weight: 900;
            }
        }
        .changeCity {
            width: 80px;
            height: 100%;
            display: flex;
            align-content: center;
            align-items: center;
            flex-wrap: wrap;
            // justify-content: center;
            font-size: 14px;
            margin-right: 96px;
        }
        .searchFrame {
            width: 587px;
            height: 83px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-right: 109px;
            .interfaceForSearch {
                width: 87px;
                height: 14px;
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                line-height: 14px;
                margin-bottom: 5px;
                a {
                    color: #2a2a2a;
                }
                a.interfaceActive {
                    color: #2693d4;
                }
                .partingLine {
                    width: 1px;
                    height: 15px;
                    margin-top: -1px;
                    background-color: #2693d4;
                }
            }
            .inputSearch {
                width: 586px;
                height: 41px;
                display: flex;
                .search_input {
                    width: 485px;
                    height: 41px;
                    border: 2px solid #2693d4;
                    box-sizing: border-box;
                    font-size: 14px;
                    padding-left: 10px;
                    outline: none;
                    margin-left: 1px;
                }
                .search_button {
                    width: 101px;
                    height: 41px;
                    background-color: #2693d4;
                    border: none;
                    outline: none;
                    color: white;
                    font-family: "iconfont" !important;
                    font-size: 17px;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-stroke-width: 0.2px;
                    -moz-osx-font-smoothing: grayscale;
                }
            }
            .pushService {
                width: 587px;
                height: 23px;
                padding-left: 14px;
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #c7c7c7;
                a {
                    color: #c7c7c7;
                    margin-right: 14px;
                }
            }
        }
        .callUs {
            width: 179px;
            height: 68px;
            display: flex;
            align-items: center;
            .iconphone {
                font-family: "iconfont" !important;
                font-size: 44px;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
                -moz-osx-font-smoothing: grayscale;
                margin-right: 2px;
                color: #2693d4;
            }
            .phoneNumber {
                line-height: 16px;
                font-size: 16px;
                font-weight: 600;
                color: #a3a3a3;
            }
        }
    }
}
.changeCityInner {
    width: 986px;
    height: 241px;
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -493px;
    margin-top: -120.5px;
    border: 1px outset #bcbcbc;
    z-index: 3;
    display: none;
    .title {
        width: 100%;
        height: 109px;
        border-bottom: 1px solid #c4e5e6;
        background-color: #63c2c7;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        div {
            width: 100%;
            text-align: center;
            color: white;
        }
        .titleText {
            font-size: 24px;
        }
        .warningText {
            font-size: 15px;
        }
    }
    .allCity {
        width: 100%;
        height: 131px;
        background-color: #f7f7f7;
        padding: 48px 98px;
        box-sizing: border-box;
        div {
            width: 98px;
            height: 33px;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #5bbabf;
            box-sizing: border-box;
            user-select: none;
            cursor: pointer;
        }
    }
}
</style>