<template>
    <div class="container" v-if="isPC">
        <!-- 右侧栏 -->
        <div class="sidebar">
            <div class="icons cup"></div>
            <h3>平台担保</h3>
            <div class="icons men"></div>
            <h3>优质服务</h3>
            <div class="icons shield"></div>
            <h3>过程监督</h3>
            <div class="icons crown"></div>
            <h3>增值服务</h3>

        </div>
        <!-- 内容区 -->
        <div class="content">
            <!-- 产品列表 -->
            <div v-if="ispr==0">
                <div class="wrap" v-loading="loading">
                    <div class="listheader">
                        <ul v-for="(sort,i) in Sort" :key="i">
                            <li>
                                <a :class="{active:i==sorti}" @click="sortType(i,sort.sort)">{{sort.way}}&nbsp;
                                    <i class="iconfont">&#xe731;</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="none" v-if="!products.length">
                        <img src="../../../static/images/none.png" alt="">
                        <p>Sorry！没有符合搜索的内容 o(╥﹏╥)o</p>
                    </div>
                    <div class="productlist" v-for="(productlist,i) in products" :key="i">
                        <ul class="listbox">
                            <li class="logo">
                                <a :href='"#/shdetail?sid="+productlist.id'><img :src="logoImg(productlist.providerImg)" alt=""></a>
                            </li>
                            <li>
                                <a :href='"#/shdetail?sid="+productlist.id'>
                                    <h4>{{productlist.serviceName}}</h4>
                                </a>
                            </li>
                            <li class="info">{{productlist.serviceInfo}}</li>
                            <li>
                                <a :href='"#/shop?id="+productlist.providerId'>
                                    <span>{{productlist.providerName}}</span>
                                </a>
                                <span>{{productlist.regionName}}</span>
                            </li>
                        </ul>
                        <div>
                            <div class="price">
                                <P>￥{{productlist.price/100}}</P>
                                <button @click="buy(productlist)">立即购买</button>
                                <button @click="addCart(productlist)">加入购物车</button>
                            </div>

                        </div>
                    </div>
                </div>
                <v-page :curInx="cur" :pageSize="pageSize" :pageChange="productPage" :totalShow="true"></v-page>
            </div>

            <!-- 店铺列表 -->
            <div v-if="ispr==1">
                <div class="wrap">
                    <div class="kong">
                    </div>
                    <div class="none" v-if="!providers.length">
                        <img src="../../../static/images/none.png" alt="">
                        <p>Sorry！没有符合搜索的内容 o(╥﹏╥)o</p>
                    </div>
                    <div class="providerlist" v-for="(providerinfo,i) in providers" :key="i">
                        <ul class="listbox">
                            <li class="logo"><img :src="logoImg(providerinfo.providerImg)" alt=""></li>
                            <li>
                                <h4>{{providerinfo.providerName}}</h4>
                            </li>
                            <li class="info">
                                <div><img src="../../assets/icon_gold.png">&nbsp;&nbsp;金牌服务商</div>
                                {{providerinfo.productTypes}}

                            </li>
                            <li>
                                <span>累计服务客户次数：{{providerinfo.orderNum}}</span>
                                <span>好评率:{{rate(providerinfo.goodJudge,providerinfo.totalJudge)}}</span>
                                <span>{{providerinfo.regionName}}</span>
                            </li>
                        </ul>
                        <div>
                            <a class="enter" :href='"#/shop?id="+providerinfo.id'>进入店铺</a>
                        </div>
                    </div>
                </div>
                <v-page :curInx="cur" :pageSize="pageSize" :pageChange="providerPage" :totalShow="false"></v-page>
            </div>
        </div>

    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            loading: true,
            sorti: 0,
            Sort: [{
                sort: '',
                way: '默认排序',
            }, {
                sort: 2,
                way: '价格升序',
            }, {
                sort: 3,
                way: '价格降序',
            },
            ],
            productData: {
                start: 0,
                limit: 8,
                searchName: '',
                sort: ''
            },
            products: [],

            providerData: {
                start: 0,
                limit: 8,
                searchName: '',
                sort: '',
            },
            providers: [],
            cur: 1,
            pageSize: 0,
            ispr: 0,
        }
    },
    created() {
        // console.log(this.$route.query);
        this.getSearchRes();
    },
    computed: {
        ...mapGetters(['getCartnum'])
    },
    watch: {
        $route(val) {
            if (val) {
                this.getSearchRes();
            }
        }
    },
    methods: {
        ...mapActions(['cartAction']),
        getSearchRes() {
            this.ispr = this.$route.query.ispr;
            if (this.ispr == 0) {
                this.productData.searchName = this.$route.query.sn
                this.loading = true;
                this.getProducts();
            } else if (this.ispr == 1) {
                this.providerData.searchName = this.$route.query.sn
                this.loading = true;
                this.getProviders();
            }
        },
        sortType(i, sort) {
            this.sorti = i;
            this.productData.sort = sort;
            this.getProducts();
        },
        getProducts() {
            this.ajax.post('xinda-api/product/package/search-grid', this.productData, {}).then((data) => {
                this.products = data.data.data;
                this.pageSize = data.data.pageSize;
                this.loading = false;
                // console.log(data);
                // console.log('产品:', this.products);
            }).catch((error) => {
                console.log('axios error', error);
            });
        },
        getProviders() {
            this.ajax.post('/xinda-api/provider/search-grid', this.providerData, {}).then((data) => {
                // console.log(data);
                this.providers = data.data.data;
                this.pageSize = data.data.pageSize;
                this.loading = false;
                // console.log('服务商:', this.providers);
            }).catch((error) => {
                console.log('axios error', error);
            });
        },
        logoImg(providerImg) {
            return providerImg.substr(0, 1) == '/' ? 'http://115.182.107.203:8088/xinda/pic' + providerImg : providerImg;
        },
        rate(goodJudge, totalJudge) {
            var rate;
            totalJudge == 0 ? rate = '暂无评价' : rate = Math.round(goodJudge / totalJudge * 10000) / 100 + "%";
            return rate;

        },
        productPage(curPage) {
            this.cur = curPage;
            this.productData.start = (curPage - 1) * this.productData.limit;
            this.getProducts();
            window.scrollTo(0, 170);
        },
        providerPage(curPage) {
            this.cur = curPage;
            this.providerData.start = (curPage - 1) * this.providerData.limit;
            this.getPrviders();
            window.scrollTo(0, 380);
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
        buy(item) {
            this.ajax.post('/xinda-api/sso/login-info').then((userMsg) => {
                if (userMsg.data.status == 0) {
                    this.open('提示', '未登录，请先登录', '跳转至登录界面', '/Logon', { redirect: this.$route.fullPath });
                } else {
                    this.buyNow(item);
                }
            }).catch((error) => {
                console.log('error', error);
            });
        },
        buyNow(item) {
            this.ajax.post(
                '/xinda-api/cart/add',
                { id: item.id, num: 1 },
            ).then(res => {
                if (res.data.status == 1) {
                    this.ajax.post(
                        '/xinda-api/cart/submit'
                    ).then(res => {
                        if (res.data.status == 1) {
                            this.$router.push({ path: '/pay', query: { bno: res.data.data } })
                        } else {
                            this.$message.warning(res.data.msg);
                        }
                    }).catch(res => {
                        console.log('Axios: ', res);
                    });
                } else {
                    this.$message({ type: 'warning', message: res.data.msg, duration: 1000 });
                }
            }).catch(res => {
                console.log('Axios: ', res);
            });
        },
        addCart(item) {
            this.ajax.post(
                '/xinda-api/cart/add',
                { id: item.id, num: 1 },
            ).then(res => {
                if (res.data.status == 1) {
                    this.$message({ type: 'success', message: res.data.msg, duration: 1000 });
                    this.ajax.post('/xinda-api/cart/cart-num').then(res => {
                        if (res.data.status == 1) {
                            this.cartAction(res.data.data.cartNum);
                        } else {
                            this.$message({ type: 'warning', message: res.data.msg, duration: 1000 });
                        }
                    });
                } else {
                    this.$message({ type: 'warning', message: res.data.msg, duration: 1000 });
                }
            }).catch(res => {
                console.log('Axios: ', res);
            });
        },

    },
}

</script>

<style lang="less" scoped>
.container {
    width: 1200px;
    margin: 0 auto;

    .content {
        float: left;
        padding: 10px 0;
        width: 948px;
        height: auto; // border: 1px solid #ccc;
    }
    .wrap {
        border: 1px solid #ccc;
    } // 右侧栏
    .sidebar {
        float: right;
        margin: 10px 0;
        width: 238px;
        height: auto;
        border: 1px solid #ccc;
        text-align: center;

        .icons {
            margin: 15px auto;
            width: 94px;
            height: 94px;
            background-color: #f9f9f9;
            background-position: 50% 50%;
            background-repeat: no-repeat;
            border-radius: 100%;
        }
        .cup {
            background-image: url(../../assets/icon_cup.png);
        }
        .men {
            background-image: url(../../assets/icon_men.png);
        }
        .shield {
            background-image: url(../../assets/icon_shield.png);
        }
        .crown {
            background-image: url(../../assets/icon_crown.png);
        }
        h3 {
            font-weight: 400;
            margin: 0 40px 20px 40px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ccc;
        }
    }
} // 内容
.listheader {
    display: flex;
    background: #f7f7f7;
    border-bottom: 1px solid #ccc;
    text-align: center;
    font-size: 14px;
    overflow: hidden;

    &>ul,
    li {
        float: left;
        line-height: 40px;

        a {
            display: inline-block;
            width: 110px;
            height: 40px;
            color: #000;
            cursor: pointer;
        }
        a:hover,
        .active {
            color: #fff;
            background: #2594d4;
            cursor: pointer;
        }
    }
}

.productlist,
.providerlist {
    clear: both;
    position: relative;
    overflow: hidden;

    ul {
        margin: 15px;
        border-top: 1px solid #eee;

        li {
            float: left;
            font-size: 14px;
            width: 580px;
            overflow: hidden;
            text-overflow: ellipsis; // white-space: nowrap;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;

            a {
                color: #000;

                 :hover {
                    color: #2594d4;
                }
            }

            img {
                vertical-align: middle;
                height: 20px;
            }

            &> :nth-child(2),
             :nth-child(3) {
                padding-left: 30px;
            }
        }
    }
    .logo {
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        margin: 10px;
        margin-left: 0;

        img {
            max-width: 100%;
            height: auto;
        }
    }
    h4 {
        margin: 10px 0;
        font-weight: 400;
        font-size: 16px;
        color: #2594d4;
    }
    .info {
        color: #666;
        margin-bottom: 10px;
        height: 40px;
    }
    .price {
        position: absolute;
        right: 10px;
        font-size: 30px;
        color: #f00;
        text-align: center;
        margin-bottom: 10px;
    }
    button {
        margin-left: 5px;
        width: 90px;
        height: 30px;
        background: #2594d4;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .enter {
        position: absolute;
        right: 15px;
        display: inline-block;
        margin-top: 25px;
        padding: 10px 20px;
        background: #ff5b1b;
        color: #fff;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
    }
}

.page-bar {
    margin: 10px auto;
    width: fit-content;
}

.hidden {
    display: none;
}

.none {
    width: 100%;
    height: 515px;
    padding-top: 100px;
    text-align: center;

    p {
        margin-top: 20px;
    }
}

.kong {
    height: 40px;
}
</style>