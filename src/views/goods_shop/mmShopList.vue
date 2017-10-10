<template>
    <div class="shoplist container">
        <!-- 面包屑导航 -->
        <div class="Breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>公司工商</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 条件筛选 -->
        <div class="shopsifting">
            <div>
                <div class="siftingHeader">服务区域</div>
                <v-distpicker class="sate" @selected="onSelected" :placeholders="placeholders"></v-distpicker>
            </div>
            <div>
                <div class="siftingHeader">产品类型</div>
                <ul class="produclist font14" v-for="(item,i) in prodType" :key="i">
                    <li>
                        <a :class="{active:i==proi}" @click="proc(i,item.code)">{{item.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="Shopboxtitle font14">
            <ul v-for="(item,i) in shopSort" :key="i">
                <li>
                    <a :class="{active:i==sori}" @click="sorc(i,item.sort)">{{item.name}}&nbsp;
                        <i class="iconfont">&#xe731;</i>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 内容区 -->
        <div class="Shopboxbody font14" v-loading="loading">
            <div class="none" v-if="!shopinfo.length">
                <el-alert title="所选地区暂未开通服务" type="info" :closable="false" show-icon></el-alert>
            </div>

            <template v-for="info in shopinfo">
                <div class="shopBox" :key="info.id">
                    <div class="boxleft">
                        <div><img :src="imgurl(info.providerImg)"></div>
                        <div><img src="../../assets/icon_gold.png">&nbsp;&nbsp;金牌服务商</div>
                    </div>
                    <div class="boxright">
                        <div>{{info.providerName}}</div>
                        <div>信誉&nbsp;&nbsp;
                            <i class="iconfont redicon">&#xe60d;</i>
                            <i class="iconfont redicon">&#xe60d;</i>
                            <i class="iconfont redicon">&#xe60d;</i>
                            <i class="iconfont redicon">&#xe60d;</i>
                            <i class="iconfont blackicon">&#xe60d;</i>
                        </div>
                        <div>{{info.regionName}}</div>
                        <div>累计服务客户次数:{{info.orderNum}}
                            <span class="line">|</span>好评率:{{rate(info.goodJudge,info.totalJudge)}}</div>
                        <ul v-for="(product,i) in info.productTypes" :key="i">
                            <li>{{product}}</li>
                        </ul>
                        <a @click="enter(info.id)">进入店铺</a>
                    </div>
                </div>
            </template>

        </div>
        <!-- 分页 -->
        <v-page :curInx="cur" :pageSize="pageSize" :pageChange="pageChange" :totalShow="false"></v-page>

    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            shopinfo: [],
            isActive: false,
            prodType: [{
                code: '',
                name: '所有',
            }, {
                code: '10',
                name: '专利申请',
            }, {
                code: '9',
                name: '版权保护',
            }, {
                code: '8',
                name: '商标注册',
            }, {
                code: '1',
                name: '代理记账',
            }, {
                code: '6',
                name: '企业社保',
            }, {
                code: '5',
                name: '公司变更',
            }, {
                code: '2',
                name: '税务代办',
            }, {
                code: '7',
                name: '个人社保',
            }, {
                code: '4',
                name: '公司注册',
            }, {
                code: '3',
                name: '审计报告',
            },
            ],
            shopSort: [{
                sort: 1,
                name: '综合排序',
            }, {
                sort: 2,
                name: '价格',
            }, {
                sort: 3,
                name: '接单数',
            },
            ],
            ajdata: {
                start: 0,
                limit: 8,
                productTypeCode: '',
                regionId: '',
                sort: '',
            },
            proi: 0,
            sori: 0,
            placeholders: {
                province: '--- 省 ---',
                city: '--- 市 ---',
                area: '--- 区 ---',
            },
            cur: 1,
            pageSize: 0,
        }
    },
    methods: {
        pageChange(curPage) {
            this.cur = curPage;
            this.ajdata.start = (curPage - 1) * this.ajdata.limit;
            this.loading = true;
            this.getShop();
        },
        onSelected(data) {
            console.log(data);
            if (data) {
                this.ajdata.regionId = data.area.code;
                console.log(this.ajdata.regionId);
                this.loading = true;
                this.getShop();
            }else {
                console.log('VDistpicker Error');
            }
        },
        getShop() {
            this.ajax.post('xinda-api/provider/grid', this.ajdata, {}).then((data) => {
                this.shopinfo = data.data.data;
                // console.log(this.shopinfo);
                this.pageSize = data.data.pageSize;

                for (var i = 0; i < this.shopinfo.length; i++) {
                    this.shopinfo[i].productTypes = this.shopinfo[i].productTypes.split(',');
                }
                this.loading = false;

            }).catch((error) => {
                console.log('axios error', error);
            });
        },
        rate(goodJudge, totalJudge) {
            var rate;
            totalJudge == 0 ? rate = '暂无评价' : rate = Math.round(goodJudge / totalJudge * 10000) / 100 + "%";
            return rate;

        },
        enter(id) {
            this.$router.push({
                path: '/shop',
                query: { id },
            })
        },
        imgurl(providerImg) {
            var imgurl;
            imgurl = providerImg.substr(0, 1) == '/' ? 'http://115.182.107.203:8088/xinda/pic' + providerImg : providerImg;
            return imgurl;
        },
        proc(i, code) {
            this.proi = i;
            this.ajdata.productTypeCode = code;
            this.getShop();
        },
        sorc(i, sort) {
            this.sori = i;
            this.ajdata.sort = sort;
            this.getShop();
        },
    },
    created() {
        this.getShop();

    },

}
</script>

<style lang="less">
// 三级联动
.sate {
    select {
        float: left;
        margin-left: 10px;
        margin-top: 5px;
        padding: 0;
        padding-left: 25px;
        width: 120px;
        height: 30px;
        font-size: 14px;
    }
}
</style>

<style lang="less" scoped>
// 图标
.redicon {
    color: #f00;
}

.blackicon {
    color: #000;
}

.container {
    width: 1200px;
    margin: 0 auto;
} // 面包屑导航
.Breadcrumb {
    margin: 25px 0 5px 0;
} // 条件筛选
.shopsifting {
    text-align: center;
    background: #f7f7f7;
    border-top: 1px solid #ccc;
    margin-bottom: 25px;

    &>div {
        height: 40px;
        border: 1px solid #ccc;
        border-top: none;

        .siftingHeader {
            float: left;
            line-height: 40px;
            width: 100px;
            border-right: 1px solid #ccc;
        }
    }
    ul,
    li {
        float: left;
        line-height: 40px;
        a {
            display: inline-block;
            margin-left: 10px;
            margin-right: 5px;
            line-height: 25px;
            width: 80px;
            height: 25px;
            border-radius: 5px;
            cursor: pointer;
            transition: all .3s ease-in-out;
        }
        a:hover,
        .active {
            color: #fff;
            background: #2594d4;
        }
    }
} // 内容区
.Shopboxtitle {
    background: #f7f7f7;
    border: 1px solid #ccc;
    height: 40px;
    text-align: center;

    ul,
    li {
        float: left;
        line-height: 40px;

        a {
            display: inline-block;
            width: 110px;
            height: 100%;
            color: #000;
        }
        a:hover,
        .active {
            color: #fff;
            background: #2594d4;
            cursor: pointer;
        }
    }
}

.Shopboxbody {
    border: 1px solid #ccc;
    overflow: hidden;
    border-top: none;
    width: 1198px;

    .shopBox {
        float: left;
        margin: 13px;
        padding-top: 25px;
        width: 570px;
        height: 250px;
        border: 1px solid #ccc;
        transition: all .3s ease-in-out;

        &:hover {
            box-shadow: 0px 0px 5px #2594d4;
        }

        .boxleft {
            float: left;
            margin: 0 35px;
            width: 180px;
            text-align: center;
            div {
                margin-top: 60px;

                img {
                    vertical-align: middle;
                }
            }
            > :nth-child(1) {
                height: 55px;
                line-height: 55px;
                font-size: 30px;
                font-weight: 700;
            }
            > :nth-child(2) {

                height: 35px;
                line-height: 35px;
            }
        }
        .boxright {
            position: relative;
            float: left;
            text-align: left;
            width: 300px;
            height: 250px;

            div {
                margin-bottom: 10px;
            }
            .line {
                padding-left: 15px;
                padding-right: 25px;
            }
            ul li {
                float: left;
                width: 70px;
                height: 25px;
                margin-top: 5px;
                margin-right: 5px;
                background: #2594d4;
                border-radius: 5px;
                color: #fff;
                line-height: 25px;
                text-align: center;
            }
            a {
                position: absolute;
                bottom: 20px;
                display: inline-block;
                margin-top: 40px;
                padding: 10px 20px;
                background: #ff5b1b;
                color: #fff;
                border-radius: 5px;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
}

// 提示框
.none {
    width: 1200px;
    height: 200px;
    padding-top: 100px;
    text-align: center;
}

.el-alert {
    width: 500px;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;

    .el-alert__title {
        font-size: 16px;
    }
}

.el-alert--info {
    background-color: #2594d4;
} // 分页
.page-bar {
    margin: 10px auto;
    width: fit-content;
}

@media screen and (max-with: 1200px) {}
</style>
