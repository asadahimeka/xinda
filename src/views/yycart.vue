<template>
    <div class="spcart">
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
                    <td :title="item.providerName" @click="toDetail('/',item.providerId)">店铺：{{item.providerName}}</td>
                </tr>
                <tr class="cartitem" :key="item.serviceId">
                    <!-- TODO toDetail, img:src -->
                    <td class="shoplogo" @click="toDetail('/',item.providerId)"><img :src="pichost+item.providerImg" alt="shop img not found"></td>
                    <td class="srvname" @click="toDetail('/',item.serviceId)">{{item.serviceName}}</td>
                    <td>￥{{fmtPrice(item.unitPrice)+item.unit}}</td>
                    <td>
                        <button class="min" @click="item.buyNum=clkMin(item.buyNum)">-</button>
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
        <div v-if="!cartlist.length" class="loading emp">
            <img src="../assets/cart.jpg" alt=""><br>
            <span>购物车空空如也，去首页逛逛吧！</span><br>
            <button><a href="#/">去首页</a></button>
        </div>
        <el-alert v-if="gfail01" title="Get data failed." type="error" show-icon></el-alert>

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
            <div v-for="item in srvlist" class="srv-card" @click="toDetail('/',item.id)" v-bind:key="item.id">
                <h2 :title="item.serviceName">{{item.serviceName}}</h2>
                <!-- TODO -->
                <i></i>
                <p :title="item.serviceInfo" class="srv-gmy">{{item.serviceInfo}}</p>
                <p>销量：{{item.buyNum}}</p>
                <p>
                    <b>&nbsp;￥&nbsp;&nbsp;{{fmtPrice(item.price)}}</b>
                </p>
                <p>
                    <s>原价：￥{{fmtPrice(item.marketPrice)}}</s>
                    <a>查看详情>>></a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
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
        }
    },
    methods: {
        ...mapActions(['cartAction']),
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
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
        getCart() {
            this.ajax.post(
                '/xinda-api/cart/list'
            ).then(res => {
                if (res.data.status == 1) {
                    this.cartlist = res.data.data;
                    this.loading0 = false;
                } else {
                    this.gfail01 = true;
                }
            }).catch(res => {
                this.loading0 = false;
                this.gfail01 = true;
                console.log('Axios: ', res);
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
                this.ajax.post(
                    '/xinda-api/cart/set',
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
                    console.log('Axios: ', res);
                });
            }
        },
        submit() {
            for (let i = 0; i < this.cartlist.length; i++) {
                this.ajax.post(
                    '/xinda-api/cart/set',
                    {
                        id: this.cartlist[i].serviceId,
                        num: this.cartlist[i].buyNum,
                    }
                ).then(res => {
                    if (res.data.status == -1) {
                        this.$message({ type: 'error', message: res.data.msg, duration: 1000 });
                    } else if (i == this.cartlist.length - 1) {
                        this.ajax.post(
                            '/xinda-api/cart/submit'
                        ).then(res => {
                            if (res.data.status == -1) {
                                // TODO
                                this.open('提示', res.data.msg, "跳转至登录界面", '/Logon');
                            } else if (res.data.status == 1) {
                                //TODO
                                this.$router.push({ path: '/pay', query: { bno: res.data.data } })
                            }
                        }).catch(res => {
                            console.log('Axios: ', res);
                        });
                    }
                }).catch(res => {
                    console.log('Axios: ', res);
                });
            }
        },
        open(title, content, msg, url) {
            this.$alert(content, title, {
                confirmButtonText: '确定',
                lockScroll: false,
                callback: () => {
                    this.$message({ type: "info", message: msg, duration: 1000 });
                    setTimeout(() => this.$router.push(url), 1000);
                }
            });
        },
        del(item) {
            this.$confirm('确定删除该产品吗?', '信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                lockScroll: false
            }).then(() => {
                this.ajax.post(
                    '/xinda-api/cart/del',
                    { id: item.serviceId }
                ).then(res => {
                    if (res.data.status == 1) {
                        let i = this.cartlist.indexOf(item);
                        this.cartlist.splice(i, 1);
                        //TODO
                        // this.cartAction(this.cartlist.length);
                        this.$message({ type: 'success', message: '删除成功!' });
                    } else {
                        this.$message({ type: 'error', message: res.data.msg });
                    }
                }).catch(res => {
                    console.log('Axios: ', res);
                });
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        },
        toDetail(path, id) {
            this.$router.push({ path, query: { id } });
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
    created() {
        this.getCart();
        this.ajax.post(
            '/xinda-api/recommend/list'
        ).then(res => {
            if (res.data.status == 1) {
                this.srvlist = res.data.data.hq;
                this.loading = false;
            } else {
                this.gfail = true;
            }
        }).catch(res => {
            this.loading = false;
            this.gfail = true;
            console.log('Axios: ', res);
        });
    }
}
</script>

<style lang="less">
@import url("//unpkg.com/element-ui@1.4.4/lib/theme-default/index.css");

@gwidth: 1200px;
@mcolor: #2693d4;
@borclr: #b6b6b6;
.mainA {
    .allNavigation {
        display: none;
    }
    &:hover .allNavigation {
        display: block;
        z-index: 10002;
    }
}

body {
    margin: 0;
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
            p,
            h2 {
                margin: 5px 0;
                padding: 0;
            }
            h2 {
                margin-top: 0;
                font-weight: 500;
            }
            i {
                width: 235px;
                height: 10px;
                display: inline-block;
                background: url("../assets/line.jpg") no-repeat;
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
    img{
        width: 560px;
        height: 250px;
        margin: 0 auto;
    }
    span{
        text-align: center;
        font-size: 18px;
        color: @mcolor;
    }
    button{
        width: 200px;
        height: 50px;
        line-height: 50px;
        margin: 40px auto;
        font-size: 18px;
        background: @mcolor;
        border: 0;
        border-radius: 5px;
        a{
            color: #fff;
            text-decoration: none;
        }
    }
}

.emp{
    height: 400px;
    margin-top: 0;
    margin-bottom: 40px;
    background: #f8f8f8;
}

.el-alert {
    width: 300px;
    margin: 40px auto;
}
</style>
