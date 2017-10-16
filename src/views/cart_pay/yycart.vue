<template>
    <div>
        <div class="spcart" v-if="$isPC">
            <div class="yytop">首页/
                <span>购物车</span>
            </div>
            <div class="tpc money-color">全部商品
                <span class="shnum">（{{cartlist.length}}）</span>
            </div>
            <table v-loading="loading0" border="0" class="cartlist" cellspacing="0">
                <tr class="caption">
                    <td class="com">公司</td>
                    <td>服务商品</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>金额</td>
                    <td>操作</td>
                </tr>
                <template v-for="item in cartlist">
                    <tr class="shopname" :key="item.serviceId">
                        <!-- TODO -->
                        <td :title="item.providerName" @click="toDetail('/',item.providerId)">
                            店铺：
                            <a :href='"#/shop?id="+item.providerId'>{{item.providerName}}</a>
                        </td>
                    </tr>
                    <tr class="cartitem" :key="item.serviceId">
                        <!-- TODO toDetail, img:src -->
                        <td class="shoplogo">
                            <a :href='"#/shop?id="+item.providerId'>
                                <img :src="dealSrc(item.providerImg)" alt="shop img not found">
                            </a>
                        </td>
                        <td class="srvname" :title="item.serviceName" @click="toDetail('/shdetail',item.serviceId)">{{item.serviceName}}</td>
                        <td>￥{{fmtPrice(item.unitPrice)+'&nbsp;'+dealUnit(item.unit)}}</td>
                        <td>
                            <button class="min" @click="item.buyNum=clkMin(item.buyNum)" :disabled="item.buyNum==1">-</button>
                            <input type="text" class="shnum" v-model="item.buyNum" @change="item.buyNum=cartChange(item.buyNum)" @focus="focus" v-numberonly>
                            <button class="pls" @click="item.buyNum=clkPls(item.buyNum)">+</button>
                        </td>
                        <td>
                            <b class="money-color">￥{{priceChange(item)}}</b>
                        </td>
                        <td class="del" @click="del(item)">删除</td>
                    </tr>
                </template>
            </table>
            <el-alert v-if="gfail01" title="Get data failed." type="error" show-icon></el-alert>
            <div v-if="!cartlist.length" class="loading emp">
                <img src="../../assets/cart.jpg" alt=""><br>
                <span>购物车空空如也，去首页逛逛吧！</span><br>
                <button>
                    <a href="#/">去首页</a>
                </button>
            </div>

            <div v-if="cartlist.length" class="btm">
                <div class="amount">金额总计
                    <b class="money-color">&nbsp;￥&nbsp;{{calcTotal()}}</b>
                </div>
                <div class="fr">
                    <!-- TODO -->
                    <a href="javascript:;" class="balance" @click="conti">继续购物</a>
                    <a href="javascript:;" class="balance" @click="submit">去结算</a>
                </div>
            </div>

            <div class="rec-srv">
                <div class="tpc money-color">热门服务</div>
                <el-alert v-if="gfail" title="Get data failed." type="error" show-icon></el-alert>
                <div v-loading="loading" v-if="loading" class="loading">
                    <p>Loading...</p>
                </div>
                <!-- TODO -->
                <div v-for="item in srvlist" class="srv-card" @click="toDetail('/shdetail',item.id)" v-bind:key="item.id">
                    <h2 :title="item.serviceName">{{item.serviceName}}</h2>
                    <!-- TODO -->
                    <span></span>
                    <i></i>
                    <p :title="item.serviceInfo" class="srv-gmy">{{item.serviceInfo}}</p>
                    <p>销量：{{item.buyNum}}</p>
                    <p>
                        <b>&nbsp;￥&nbsp;&nbsp;{{fmtPrice(item.price)}}</b>
                    </p>
                    <p>
                        <s>原价：￥{{fmtPrice(item.marketPrice)}}</s>
                        <a :href='"#/shdetail?sid="+item.id'>查看详情>>></a>
                    </p>
                </div>
            </div>
        </div>

        <div class="m-cart" v-if="!$isPC">
            <div class="bgcol">
                <!-- 这个是背景颜色铺满效果 -->
            </div>
            <div class="cartnum" v-if="cartlist.length">
                <i class="el-icon-arrow-left" @click="back"></i>&nbsp;&nbsp; 购物车内共有
                <span>{{cartlist.length}}</span>&nbsp;件商品
                <a href="#/">
                    <i class="iconfont">&#xe60e;</i>
                </a>
            </div>
            <div class="cartlist" v-if="cartlist.length">
                <div class="cartitem" v-for="(item,index) in cartlist" :key="item.serviceId">
                    <div class="shopname">
                        <a :href='"#/shop?id="+item.providerId'>{{item.providerName}}</a>
                    </div>
                    <div class="itemcnt">
                        <div class="shoplogo">
                            <a :href='"#/shop?id="+item.providerId'>
                                <img :src="dealSrc(item.providerImg)" alt="shop img not found">
                            </a>
                        </div>
                        <div class="srv">
                            <div class="srvname" :title="item.serviceName" @click="toDetail('/shdetail',item.serviceId)">{{item.serviceName}}</div>
                            <div class="uprice">
                                <span>￥&nbsp;{{priceChange(item)}}</span>&nbsp;&nbsp;元
                            </div>
                            <div class="uprice">购买数量：
                                <div class="ib">
                                    <button class="min" @click="item.buyNum=clkMin(item.buyNum)" :disabled="item.buyNum==1">
                                        <i class="el-icon-minus"></i>
                                    </button>
                                    <input type="text" class="shnum" v-model="item.buyNum" @change="item.buyNum=cartChange(item.buyNum)" v-numberonly>
                                    <button class="pls" @click="item.buyNum=clkPls(item.buyNum)">
                                        <i class="el-icon-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="uprice">
                                <i class="iconfont">&#xe603;</i>
                                {{rglist[index]}}
                            </div>
                        </div>
                        <div class="del" @click="del(item)">删除&nbsp;&nbsp;</div>
                    </div>
                </div>
                <div class="totalct uprice">共
                    <span>{{cartlist.length}}</span>&nbsp;件商品&nbsp;&nbsp;小计：
                    <span>￥{{calcTotal()}}</span>
                </div>
            </div>
            <div v-if="gfail01" class="load">Get data failed.</div>
            <div v-if="!cartlist.length" class="load" :class="{bgf8:!cartlist.length}" :style="'height:'+(sah-.6)+'rem'">
                <img src="../../assets/cart.jpg" alt=""><br>
                <span>购物车空空如也，去首页逛逛吧！</span><br>
                <button>
                    <a href="#/">去首页</a>
                </button>
            </div>
        </div>
        <div class="ks" v-if="!$isPC&&cartlist.length&&kshow">
            <div class="count">
                合计：
                <span>￥{{calcTotal()}}</span>
            </div>
            <div class="topay" @click="submit">
                去结算
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { MessageBox } from "mint-ui";
export default {
    name: 'shcart',
    data() {
        return {
            pichost: "http://115.182.107.203:8088/xinda/pic",
            loading0: true,
            loading: true,
            gfail01: false,
            gfail: false,
            cartlist: [],
            srvlist: [],
            rglist: [],
            kshow: 0,
            sah: window.innerHeight * 0.01,
        }
    },
    created() {
        window.scrollTo(0, 0);
        this.getCart();
        this.$isPC ? this.getRecmd() : 0;
    },
    methods: {
        ...mapActions(['cartAction']),
        back() {
            window.history.back();
        },
        dealSrc(src) {
            return /^\/[^/]/.test(src) ? this.pichost + src : src;
        },
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        dealUnit(u) {
            return u ? u.substr(u.indexOf(':') + 1).replace(/[?\s]+/g, '') : '元';
        },
        dealRegion(r) {
            return r.toString().substr(r.indexOf('-') + 1)
        },
        clkMin(num) {
            return num = parseInt(num) < 2 ? 1 : parseInt(num) - 1;
        },
        clkPls(num) {
            return num = parseInt(num) + 1;
        },
        focus() {
            event.target.select();
        },
        cartChange(num) {
            return num = parseInt(num) || 1;
        },
        priceChange(item) {
            item.totalPrice = item.unitPrice * item.buyNum;
            return this.fmtPrice(item.totalPrice);
        },
        getRegion() {
            this.rglist = [];
            this.cartlist.forEach(function(ele) {
                this.$ajax.post(
                    this.$baseUrl+'/xinda-api/provider/detail',
                    { id: ele.providerId }
                ).then(res => {
                    if (res.data.status == 1) {
                        this.rglist.push(this.dealRegion(res.data.data.regionName));
                    } else {
                        this.$toast(res.data.msg);
                    }
                }).catch(res => {
                    console.error('Axios: ', res);
                });
            }, this);
        },
        getRecmd() {
            this.$ajax.post(
                this.$baseUrl+'/xinda-api/recommend/list'
            ).then(res => {
                if (res.data.status == 1) {
                    this.srvlist = res.data.data.product;
                    this.loading = false;
                } else {
                    this.$message({ type: 'warning', message: res.data.msg });
                    this.gfail = true;
                }
            }).catch(res => {
                this.loading = false;
                this.gfail = true;
                console.error('Axios: ', res);
            });
        },
        getCart() {
            !this.$isPC ? this.$indicator.open() : 0;
            this.$ajax.post(
                this.$baseUrl+'/xinda-api/cart/list'
            ).then(res => {
                if (res.data.status == 1) {
                    this.cartlist = res.data.data;
                    this.loading0 = false;
                    this.cartAction(this.cartlist.length);
                    if (!this.$isPC) {
                        this.getRegion();
                        setTimeout(() => {
                            this.kshow = 1;
                            this.$indicator.close();
                        }, 300);
                    }
                } else {
                    this.$isPC
                        ? this.$message({ type: 'warning', message: res.data.msg })
                        : this.$toast(res.data.msg);
                    this.gfail01 = true;
                    !this.$isPC ? this.$indicator.close() : 0;
                }
            }).catch(res => {
                this.loading0 = false;
                this.gfail01 = true;
                !this.$isPC ? this.$indicator.close() : 0;
                console.error('Axios: ', res);
            });
        },
        calcTotal() {
            var list = this.cartlist;
            var total = 0;
            for (var i = 0; i < list.length; i++) {
                total += list[i].totalPrice;
            }
            return this.fmtPrice(total);
        },
        conti() {
            for (let i = 0; i < this.cartlist.length; i++) {
                this.$ajax.post(
                    this.$baseUrl+'/xinda-api/cart/set',
                    {
                        id: this.cartlist[i].serviceId,
                        num: this.cartlist[i].buyNum,
                    }
                ).then(res => {
                    if (res.data.status == -1) {
                        this.$message({ type: 'error', message: res.data.msg, duration: 1000 });
                    } else if (i == this.cartlist.length - 1) {
                        //TODO
                        this.$router.push('/');
                    }
                }).catch(res => {
                    console.error('Axios: ', res);
                });
            }
        },
        submit() {
            for (let i = 0; i < this.cartlist.length; i++) {
                this.$ajax.post(
                    this.$baseUrl+'/xinda-api/cart/set',
                    {
                        id: this.cartlist[i].serviceId,
                        num: this.cartlist[i].buyNum,
                    }
                ).then(res => {
                    if (res.data.status == -1) {
                        if (this.$isPC) {
                            this.$message({ type: 'error', message: res.data.msg, duration: 1000 });
                        } else {
                            this.$toast(res.data.msg);
                        }
                    } else if (i == this.cartlist.length - 1) {
                        this.$ajax.post(
                            this.$baseUrl+'/xinda-api/cart/submit'
                        ).then(res => {
                            if (res.data.status == -1) {
                                if (this.$isPC) {
                                    this.open('提示', '未登录，请先登录', '跳转至登录界面', '/Logon', { redirect: this.$route.fullPath });
                                }
                                else {
                                    MessageBox.alert('未登录，请先登录').then(action => {
                                        this.$toast({ message: '跳转至登录界面', duration: 1000 });
                                        this.$router.push({ path: '/Logon', query: { redirect: this.$route.fullPath } });
                                    });
                                }
                            } else if (res.data.status == 1) {
                                this.cartAction(0);
                                if (this.$isPC) {
                                    this.$router.push({ path: '/pay', query: { bno: res.data.data } })
                                } else {
                                    //TODO
                                    this.$toast('目前仅支持微信支付,请在微信浏览器打开');
                                    this.$router.push('/MemberCen');
                                }
                            }
                        }).catch(res => {
                            console.error('Axios: ', res);
                        });
                    }
                }).catch(res => {
                    console.error('Axios: ', res);
                });
            }
        },
        open(title, content, msg, path, query) {
            this.$alert(content, title, {
                confirmButtonText: '确定',
                lockScroll: false,
                callback: () => {
                    if (query) {
                        this.$message({ type: "info", message: msg, duration: 1000 });
                        setTimeout(() => this.$router.push({ path, query }), 1000);
                    } else {
                        this.$message({ type: "info", message: msg, duration: 1000 });
                        setTimeout(() => this.$router.push(path), 1000);
                    }
                }
            });
        },
        del(item) {
            if (!this.$isPC) {
                MessageBox.confirm('确定删除该产品吗?').then(action => {
                    this.delItem(item);
                }).catch(() => {

                });
            } else {
                this.$confirm('确定删除该产品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false
                }).then(() => {
                    this.delItem(item);
                }).catch(() => {
                    this.$message({ type: 'info', message: '已取消删除' });
                });
            }
        },
        delItem(item) {
            this.$ajax.post(
                this.$baseUrl+'/xinda-api/cart/del',
                { id: item.serviceId }
            ).then(res => {
                if (res.data.status == 1) {
                    let i = this.cartlist.indexOf(item);
                    this.cartlist.splice(i, 1);
                    //TODO
                    this.cartAction(this.cartlist.length);
                    this.$isPC
                        ? this.$message({ type: 'success', message: '删除成功!' })
                        : this.$toast('删除成功!');
                } else {
                    this.$isPC
                        ? this.$message({ type: 'error', message: res.data.msg })
                        : this.$toast(res.data.msg);
                }
            }).catch(res => {
                console.error('Axios: ', res);
            });
        },
        toDetail(path, id) {
            this.$router.push({ path, query: { sid: id } });
            this.$router.afterEach((to, from, next) => {
                window.scrollTo(0, 0);
            });
        }
    },
    directives: {
        numberonly: {
            bind: function(el) {
                el.handler = function() {
                    el.value = el.value.replace(/\D+/, '')
                }
                el.addEventListener('input', el.handler)
            },
            unbind: function(el) {
                el.removeEventListener('input', el.handler)
            }
        }
    },
}
</script>

<style lang="less" scoped>
@gwidth: 1200px;
@mcolor: #2693d4;
@borclr: #b6b6b6;

body {
    margin: 0;
}

a {
    color: #000;
    text-decoration: none;
}

.spcart {
    width: @gwidth;
    margin: 0 auto;
    padding-top: 20px;
    font-size: 14px;
    .tpc {
        height: 40px;
        line-height: 40px;
        padding-left: 60px;
        border-bottom: 1px solid @borclr;
    }
    .cartlist {
        width: @gwidth;
        table-layout: fixed;
        td {
            width: 17%;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .caption {
            height: 50px;
            line-height: 50px;
            .com {
                width: 21%;
                text-align: left;
                padding-left: 60px;
            }
        }
        .shopname {
            height: 50px;
            line-height: 50px;
            font-size: 13px;
            font-weight: 600;
            td {
                width: @gwidth;
                height: 50px;
                text-align: left;
                padding-left: 60px;
                cursor: pointer;
            }
        }
        .cartitem {
            height: 70px;
            background: #f7f7f7;
            border: 1px solid #eee;
            .shoplogo {
                text-align: left;
                padding-left: 60px;
            }
            .srvname {
                cursor: pointer;
            }
            .min,
            .pls {
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 22px;
                background: #f1f1f1;
                border: 1px solid #f6f6f6;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
            }
            .min {
                margin-right: -4px;
            }
            .pls {
                margin-left: -4px;
            }
            .shnum {
                width: 35px;
                height: 16px;
                border: 1px solid #f6f6f6;
                text-align: center;
            }
            .del:hover {
                color: red;
                cursor: pointer;
            }
        }
    }
    .amount {
        height: 50px;
        margin-right: 20px;
        line-height: 50px;
        text-align: right;
        b {
            font-size: 20px;
        }
    }
    .btm {
        float: right;
        margin-top: 20px;
        margin-bottom: 40px;
    }
    .balance {
        display: inline-block;
        width: 100px;
        height: 25px;
        line-height: 25px;
        border: 1px solid @mcolor;
        border-radius: 5px;
        color: @mcolor;
        text-align: center;
        text-decoration: none;
    }
    .rec-srv {
        width: @gwidth;
        float: right;
        .srv-card {
            float: left;
            width: 235px;
            padding: 15px;
            margin: 35px 16px 100px;
            border: 1px solid @borclr;
            transition: all .4s ease-in-out;

            &:hover {
                transform: translateY(-5px);
                box-shadow: 2px 2px 5px #2594d4;
            }

            p,
            h2 {
                margin: 5px 0;
                padding: 0;
            }
            h2 {
                margin-top: 0;
                font-weight: 500;
                cursor: pointer;
            }
            span {
                display: inline-block;
                width: 6px;
                height: 6px;
                vertical-align: middle;
                border-radius: 100%;
                background: @mcolor;
            }
            i {
                display: inline-block;
                width: 160px;
                height: 1px;
                margin-left: -4px;
                vertical-align: middle;
                background: linear-gradient(90deg, @mcolor, @mcolor, #fff);
            }
            b {
                font-size: 30px;
                color: @mcolor;
            }
            .srv-gmy,
            h2 {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            a {
                float: right;
                text-decoration: none;
                color: @mcolor;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.money-color {
    color: @mcolor;
}

.loading {
    width: @gwidth;
    height: 250px;
    margin-top: 30px;
    text-align: center;
    font-size: 25px;
    p {
        position: absolute;
        z-index: 10001;
        top: 0;
        left: 46%;
    }
    img {
        height: 250px;
    }
    span {
        text-align: center;
        font-size: 18px;
        color: @mcolor;
    }
    button {
        width: 200px;
        height: 50px;
        line-height: 50px;
        margin: 40px auto;
        font-size: 18px;
        background: @mcolor;
        border: 0;
        border-radius: 5px;
        a {
            color: #fff;
            text-decoration: none;
        }
    }
}

.emp {
    height: 400px;
    margin-top: 0;
    margin-bottom: 40px;
    background: #f8f8f8;
}

.el-alert {
    width: 300px;
    margin: 40px auto;
}

.bgf8 {
    background: #f8f8f8;
}

.m-cart {
    .cartnum {
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        color: #666;
        font-size: .16rem;
        background: #f6f6f6;
        i {
            margin-left: 5%;
        }
        i:last-child {
            float: right;
            margin-right: .3rem;
            font-size: .27rem;
        }
        span {
            color: red;
        }
    }
    .load {
        width: 100%;
        padding-top: .6rem;
        text-align: center;
        font-size: .16rem;
        img {
            width: 60%;
            margin-left: -5%;
        }
        span {
            text-align: center;
            font-size: .18rem;
            color: @mcolor;
        }
        button {
            width: 2rem;
            height: .5rem;
            line-height: .5rem;
            margin: .4rem auto;
            font-size: .18rem;
            background: @mcolor;
            border: 0;
            border-radius: .05rem;
            a {
                color: #fff;
                text-decoration: none;
            }
        }
    }
    .cartitem {
        margin-left: .16rem;
        border-bottom: 1px solid #dbdbdb;
    }
    .itemcnt {
        display: flex;
        >div {
            margin: 0 .05rem;
        }
    }
    .shopname {
        padding: .1rem 0;
        font-size: .16rem;
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .shoplogo {
        vertical-align: top;
        width: .85rem;
        height: .85rem;
        border: 1px solid #e3e3e3;
        text-align: center;
        img {
            width: 100%;
            vertical-align: top;
            margin-top: 20%;
        }
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }
    .srvname {
        margin-bottom: .1rem;
        font-size: .17rem;
        color: #111;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .uprice {
        margin-bottom: .1rem;
        line-height: .25rem;
        font-size: .12rem;
        color: #666;
        span {
            font-size: .18rem;
            font-weight: 600;
            color: red;
        }
    }
    .srv {
        vertical-align: top;
        width: 50%;
    }
    .del {
        vertical-align: top;
        width: 15%;
        padding-right: 5px;
        font-size: .15rem;

        color: red;
        text-align: right;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .min,
    .pls {
        display: inline-block;
        vertical-align: top;
        width: .3rem;
        height: .27rem;
        background: #ededed;
        border: 1px solid #d8d8d8;
        font-size: .2rem;
        font-weight: 600;
        outline: 0;
        cursor: pointer;
    }
    .min {
        margin-right: -.04rem;
    }
    .pls {
        margin-left: -.04rem;
    }
    .shnum {
        vertical-align: top;
        width: .35rem;
        height: .25rem;
        border: 0;
        border-top: 1px solid #d8d8d8;
        border-bottom: 1px solid #d8d8d8;
        text-align: center;
        outline: 0;
    }
    .totalct {
        text-align: right;
        margin: .1rem .4rem 1rem 0;
        font-size: .16rem;
    }
}

.ks {
    z-index: 1;
    display: flex;
    position: fixed; // bottom: .6rem;
    bottom: 0;
    width: 100%;
    height: .6rem;
    font-size: .2rem;
    background: #e5e5e5;
    .count {
        width: 70%;
        padding: .15rem;
        color: #111;
        span {
            color: red;
        }
    }
    .topay {
        width: 30%;
        height: 100%;
        line-height: 3;
        text-align: center;
        color: #fff;
        background: red;
    }
}

.ib {
    display: inline-block;
}

.bgcol {
    width: 100vh;
    height: 100vh;
    background-color: #f8f8f8;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>

