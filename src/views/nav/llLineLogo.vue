<template>
    <div class="_outer">
        <div class="_inner">
            <a class="logo_backhome" href="/#/">
                <div class="logo">
                    <img src="../../../static/images/QQ图片20170517185752.png" alt="">
                </div>
                <div class="companyName">信达</div>
            </a>
            <div class="changeCity">
                <p class="finalCity">北京市</p>
                <a href="javascript:void(0)" @click="changeCity">[切换城市]</a>
            </div>
            <div class="searchFrame">
                <div class="interfaceForSearch">
                    <a :class="{interfaceActive:TTT}" @click="bbb" href="javascript:;">产品</a>
                    <div class="partingLine"></div>
                    <a :class="{interfaceActive:!TTT}" @click="BBB" href="javascript:;">服务商</a>
                </div>
                <div class="inputSearch">
                    <input type="text" class="search_input" placeholder="搜索您需要的服务或服务商" v-model="searchKey" @input="search" @focus="search" @blur="skShow=0" @keydown.down.prevent="selectDown" @keydown.up.prevent="selectUp" @keypress="toSearch($event)">
                    <input type="hidden" v-model="srhid">
                    <a :href='"/#/search?sn="+searchKey+"&ispr="+ispr'>
                        <button class="search_button">&#xe600;</button>
                    </a>
                    <div class="srhtip" v-if="skShow">
                        <div class="sres" v-for="(item,index) in result" :class="{sel:index==now}" @mousedown="toDtl(item.id)" :key="index">
                            <span :title="item.serviceInfo" v-if="!ispr">{{item.serviceName}}</span>
                            <span class="rg" :title="item.serviceInfo" v-if="!ispr">{{item.serviceInfo}}</span>
                            <span :title="item.providerInfo" v-if="ispr">{{item.providerName}}</span>
                            <span class="rg" :title="item.providerInfo" v-if="ispr">{{item.regionName}}</span>
                        </div>
                    </div>
                </div>
                <div class="pushService">
                    <p>热门服务：</p>
                    <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=6&pid=5e0220d58f30436e92a8d0052b4b8203">社保开户</a>
                    <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=19b94314bc1a4b078d2402f8727c388b">公司注册</a>
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
import _ from 'lodash'; //引入lodash
let sources = [];//请求canceltoken列表
export default {
    data() {
        return {
            items: '',
            TTT: true,
            searchKey: '', //查询条件
            result: [],//查询结果
            now: -1,
            url: '',
            ispr: 0,
            skShow: 0,
            srhid: '',
            motoSk: '',
        }
    },
    methods: {
        changeCity: function() {
            var chooseCity = document.querySelector('.changeCityInner');
            var displayState = chooseCity.style.display;
            if (displayState == '' || displayState == 'none') {
                chooseCity.style.display = 'block';
            }
            this.ajax.post('/xinda-api/common/open-region').then((data) => {
                this.items = data.data.data;
            }).catch(function(error) {
                console.log('error', error);
            })
        },
        endCity: function(e) {
            var finalCity = document.querySelector('.finalCity');
            var changeCityInner = document.querySelector('.changeCityInner');
            finalCity.innerHTML = e.target.innerHTML;
            changeCityInner.style.display = 'none';
        },
        bbb: function() {
            this.TTT = true;
            this.ispr = 0;
        },
        BBB: function() {
            this.TTT = false;
            this.ispr = 1;
        },
        toSearch: function(e) {
            this.skShow = 0;
            if (e.keyCode == 13) {
                if (this.srhid) {
                    this.searchKey = '';
                    !this.ispr
                        ? this.$router.push({ path: '/shdetail', query: { sid: this.srhid } })
                        : this.$router.push({ path: '/shop', query: { id: this.srhid } });
                    this.srhid = '';
                } else {
                    this.$router.push({ path: "/search", query: { sn: this.searchKey, ispr: this.ispr } });
                }
            }
        },
        toDtl(id) {
            this.searchKey = '';
            !this.ispr
                ? this.$router.push({ path: '/shdetail', query: { sid: id } })
                : this.$router.push({ path: '/shop', query: { id } });
        },
        selectDown() {
            this.now == -1 ? this.motoSk = this.searchKey : 0;
            this.now++;
            if (this.now == this.result.length) {
                this.searchKey = this.motoSk;
                this.now = -1;
            }
            if (this.now > -1) {
                this.srhid = this.result[this.now].id;
                !this.ispr
                    ? this.searchKey = this.result[this.now].serviceName
                    : this.searchKey = this.result[this.now].providerName;
            }
        },
        selectUp() {
            this.now--;
            this.now == -1 ? this.searchKey = this.motoSk : 0;
            if (this.now == -2) {
                this.motoSk = this.searchKey;
                this.now = this.result.length - 1;
            }
            if (this.now > -1) {
                this.srhid = this.result[this.now].id;
                !this.ispr
                    ? this.searchKey = this.result[this.now].serviceName
                    : this.searchKey = this.result[this.now].providerName;
            }
        },
        //使用_.debounce控制搜索的触发频率
        //准备搜索
        search: _.debounce(
            function() {
                let that = this;
                //删除已经结束的请求
                _.remove(sources, function(n) {
                    return n.source === null;
                });
                //取消还未结束的请求
                sources.forEach(function(item) {
                    if (item !== null && item.source !== null && item.status === 1) {
                        item.status = 0;
                        item.source.cancel('取消上一个')
                    }
                });
                //创建新的请求cancelToken,并设置状态请求中
                var sc = {
                    source: that.ajax.CancelToken.source(),
                    status: 1 //状态1：请求中，0:取消中
                };
                //这个对象加入数组中
                sources.push(sc);
                //开始搜索数据
                that.now = -1;
                if (!that.ispr) {
                    that.url = '/xinda-api/product/package/search-grid';
                } else {
                    that.url = '/xinda-api/provider/search-grid';
                }
                if (that.searchKey == '') {
                    that.skShow = 0;
                } else {
                    that.skShow = 1;
                    that.ajax.post(that.url,
                        {
                            start: 0,
                            limit: 8,
                            searchName: that.searchKey,
                            sort: '',
                        },
                        { cancelToken: sc.source.token }
                    ).then(function(res) {
                        //请求成功
                        sc.source = null; //置空请求canceltoken
                        //TODO这里处理搜索结果
                        that.result = res.data.data;
                    }).catch(function(thrown) {
                        //请求失败
                        sc.source = null; //置空请求canceltoken
                        //For Test
                        if (that.ajax.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            //handle error
                        }
                    });
                }
            }, 200 //空闲时间间隔设置200ms
        ),
    },
    watch: {
        searchKey(val) {
            if (val == '') {
                this.skShow = 0;
            }
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
            flex-wrap: wrap; // justify-content: center;
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
                position: relative;
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
    z-index: 10010;
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

.srhtip {
    z-index: 11000;
    position: absolute;
    top: 41px;
    left: 1px;
    width: 481px;
    border: 1px solid #2693d4;
    border-top: 0;
    background: #fff;
}

.sres {
    width: 479px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    span {
        display: inline-block;
        width: 42%;
        height: 100%;
        margin-left: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .rg {
        font-size: 14px;
        color: #555;
    }
    &:hover {
        background-color: #ccc;
        .rg {
            color: #fafafa;
        }
    }
}

.sel {
    background-color: #ccc;
    .rg {
        color: #fafafa;
    }
}

@media screen and (max-width: 1200px){
    ._outer{
        justify-content: flex-start;
    }
}
</style>