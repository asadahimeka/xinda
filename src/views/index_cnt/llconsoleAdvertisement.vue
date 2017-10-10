<template>
    <div>
        <div class="phead" v-if="!isPC">
            <div class="adrs">
                <div class="iconfont" v-html="state" @click="chad">

                </div>
                <div class="address" @click="chad">
                    {{address}}
                </div>
                <div class="alad" v-if="sh">
                    <div v-for="item in citylist" @click="chcy" :key="item.id">{{item.name}}</div>
                </div>
            </div>
            <div class="logo">
                <img src="../../assets/logo.png" alt="信达手机端">
                <div class="title">
                    信达
                </div>
            </div>
        </div>
        <swipeimg></swipeimg>
        <div class="nav" v-if="!isPC">
            <a class="chnav" href="/#/MobileNav?id=2e110f0df53243c197fede52fba8e5d0">
                <div class="iconfont wb1">
                    &#xe625;
                </div>
                <div class="nanav">
                    财税服务
                </div>
            </a>
            <a class="chnav" href="/#/MobileNav?id=5af629246fa34f6f8d49758c6a7b25f1">
                <div class="iconfont wb2">
                    &#xe647;
                </div>
                <div class="nanav">
                    开公司
                </div>
            </a>
            <a class="chnav" href="/#/MobileNav?id=5af629246fa34f6f8d49758c6a7b25f1">
                <div class="iconfont wb3">
                    &#xe607;
                </div>
                <div class="nanav">
                    公司变更
                </div>
            </a>
            <a class="chnav" href="/#/MobileNav?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59">
                <div class="iconfont wb4">
                    &#xe6b4;
                </div>
                <div class="nanav">
                    个人社保
                </div>
            </a>
            <a class="chnav" href="/#/MobileNav?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59">
                <div class="iconfont wb5">
                    &#xe71d;
                </div>
                <div class="nanav">
                    公司社保
                </div>
            </a>
            <a class="chnav" href="/#/MobileNav?id=1eff122d06604fc1aadf9e7acefba21a">
                <div class="iconfont wb6">
                    &#xe67a;
                </div>
                <div class="nanav">
                    知识产权
                </div>
            </a>
            <a class="chnav" href="/#/MobileNav?id=2e110f0df53243c197fede52fba8e5d0">
                <div class="iconfont wb7">
                    &#xe62f;
                </div>
                <div class="nanav">
                    全部服务
                </div>
            </a>
        </div>
        <!-- <xIndex></xIndex>
            <mmProperty></mmProperty>
            <mmService></mmService>
            <mmPartners></mmPartners> -->
    </div>
</template>

<script>  
import swipeimg from './swipe-img'
import xIndex from './xxindex'
import mmProperty from './mmProperty'
import mmService from './mmService'
import mmPartners from './mmPartners'

export default {
    created() {
        window.scrollTo(0, 0);
    },
    components: {
        swipeimg,
        xIndex,
        mmProperty,
        mmService,
        mmPartners,
    },
    data() {
        return {
            address: '北京市',
            state: '&#xe617;',
            sh: false,
            citylist: '',
        }
    },
    methods: {
        chad() {
            this.state = '&#xe79d;';
            this.ajax.post('/xinda-api/common/open-region').then((es) => {
                this.citylist = es.data.data;
                this.sh = true;
            }).catch((error) => {
                console.log(error);
            });
        },
        chcy(e) {
            this.state = '&#xe617;';
            this.address = e.target.innerHTML;
            this.sh = false;
        }
    }
}  
</script>  

<style lang="less">
.phead {
    width: 100%;
    height: .5rem;
    display: flex;
    align-items: center;
    padding-left: .1rem;
    box-sizing: border-box;
    position: relative;
    background-color: #fff;
    .adrs {
        display: flex;
        align-items: center;
        .iconfont {
            font-size: .01rem;
        }
        .address {
            font-size: .2rem;
        }
        .alad {
            position: absolute;
            top: .4rem;
            left: .1rem;
            width: .8rem;
            padding: .01rem 0;
            background-color: #fff;
            z-index: 10;
            border-radius: 0.03rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            &::before {
                content: '';
                border-left: .03rem solid transparent;
                border-right: .03rem solid transparent;
                border-bottom: .06rem solid white;
                position: absolute;
                top: -0.05rem;
                left: .38rem;
                z-index: 11;
                border-radius: .1rem;
            }
            >div {
                width: 100%;
                font-size: .2rem;
                text-align: center;
            }
        }
    }
    .logo {
        width: 1rem;
        height: 100%;
        position: absolute;
        left: 50%;
        margin-left: -.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            height: 100%;
        }
        .title {
            font-size: .24rem;
            font-weight: 600;
        }
    }
}

.nav {
    width: 100%;
    height: 1.6rem;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    .chnav {
        width: 25%;
        height: .8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        .iconfont {
            width: .5rem;
            height: .5rem;
            border-radius: .05rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .35rem;
            color: white;
            text-decoration: none;
        }
        .wb1 {
            background-color: #79c4fd;
        }
        .wb2 {
            background-color: #fd7879;
        }
        .wb3 {
            background-color: #ba73fd;
        }
        .wb4 {
            background-color: #79a0fb;
        }
        .wb5 {
            background-color: #fba479;
        }
        .wb6 {
            background-color: #53ff8f;
        }
        .wb7 {
            background-color: #727cff;
        }
        .nanav {
            font-size: .13rem;
            text-decoration: none;
            color: black;
        }
    }
}
</style>