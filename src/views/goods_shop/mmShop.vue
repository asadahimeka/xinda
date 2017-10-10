<template>
    <div class="shop container">
        <!-- 店鋪信息 -->
        <div class="shopHeader">
            <div><img :src="logoImg(shopinfo.providerImg)" alt="logo"></div>
            <div>
                <h1>{{shopinfo.name}}</h1>
                <span>{{shopinfo.regionName}}</span>
            </div>
        </div>
        <!-- 左侧栏 -->
        <div class="shopLeft">
            <h2>公司介绍</h2>
            <p>{{shopinfo.providerInfo}}</p>
            <div>
                <div><img src="../../assets/icon_vouch.png" alt="">平台担保</div>
                <div><img src="../../assets/icon_service.png" alt="">优质服务</div>
                <div><img src="../../assets/icon_supervise.png" alt="">过程监督</div>
                <div><img src="../../assets/icon_money.png" alt="">增值服务</div>
            </div>
        </div>
        <!-- 内容区 -->
        <div class="shopRight">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane class="product" label="服务产品" name="first">
                    <h1>服务内容</h1>
                    <!-- 产品列表 -->
                    <div v-for="(content,i) in contentList" class="contentbox" :key="i">
                        <h3>{{content.serviceName}}</h3>
                        <div class="line"> </div>
                        <p>{{content.serviceInfo}}</p>
                        <p>销量：{{content.buyNum}}</p>
                        <p class="price">￥ {{content.price/100}}</p>
                        <span>原价：{{content.marketPrice/100}}</span>
                        <a :href='"#/shdetail?sid="+content.id'>查看详情>>></a>
                    </div>
                    <!-- 分页 -->
                </el-tab-pane>
                <el-tab-pane label="客服" name="second">
                    <div class="servicebox">
                        <span>工作时间：{{shopinfo.workTime}}</span><br>
                        <span>QQ咨询：
                            <a :href="'tencent://message/?uin='+shopinfo.qq" class="Qicon"><img src="../../assets/icon_qq.png" alt=""></a>
                        </span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="资质证书" name="third">
                    <div class="license"><img :src="businessImg(shopinfo.businessCertPath)" alt="暂无信息"></div>
                </el-tab-pane>
            </el-tabs>
            <v-page v-show="pageshow" :curInx="cur" :pageSize="pageSize" :pageChange="pageChange" :totalShow="false"></v-page>

        </div>
    </div>
</template>

<script>
export default {
    created() {
        var canshu = {
            id: this.$route.query.id,
        };
        this.ajax.post('xinda-api/provider/detail', canshu, {}).then((data) => {
            this.shopinfo = data.data.data;
            this.getServCont();
        }).catch((error) => {
            console.error('axios error', error);
        });

    },
    data() {
        return {
            shopinfo: { providerImg: '', businessCertPath: '' },
            activeName: 'first',
            pageSize: 0,
            start: 0,
            limit: 6,
            cur: 1,
            contentList: [],
            pageshow: true,
        };
    },
    methods: {
        logoImg(providerImg) {
            return providerImg.substr(0, 1) == '/' ? 'http://115.182.107.203:8088/xinda/pic' + providerImg : providerImg;
        },
        businessImg(businessCertPath) {
            return businessCertPath.substr(0, 1) == '/' ? 'http://115.182.107.203:8088/xinda/pic' + businessCertPath : businessCertPath;
        },
        handleClick(tab, event) {
            this.pageshow = tab.index != 0 ? false : true;
        },
        pageChange(curPage) {
            this.cur = curPage;
            this.start = (curPage - 1) * this.limit;
            this.getServCont();
        },
        getServCont() {
            var canshu1 = {
                start: this.start,
                limit: this.limit,
                providerId: this.$route.query.id,
            };
            this.ajax.post('xinda-api/product/package/grid', canshu1, {}).then((data) => {
                this.contentList = data.data.data;
                // console.log(data.data.data);
                this.pageSize = data.data.pageSize;
            }).catch((error) => {
                console.log('axios error', error);
            });
        }
    }
};


</script>

<style lang="less" scoped>
.container {
    width: 1200px;
    margin: 0 auto;
}

&>div {
    float: left;
}

.shopHeader {
    margin-top: 20px;
    margin-bottom: 25px;
    padding-top: 40px;
    padding-left: 60px;
    height: 140px;
    border: 1px solid #ccc;
    > :nth-child(1) {
        float: left;
        width: 80px;
        height: 80px; // border-radius: 100%;
        overflow: hidden;
        line-height: 80px;
        img {
            max-width: 100%;
            height: auto;
            vertical-align: middle;
        }
    }
    > :nth-child(2) {
        float: left;
        margin-left: 30px;
        text-align: left;
    }
    h1 {
        margin: 5px 0;
    }
}

.shopLeft {
    float: left;
    width: 298px;
    height: 583px;
    border: 1px solid #ccc;
    font-size: 14px;
    color: #333;
    margin-bottom: 100px;
    h2 {
        margin-top: 20px;
        margin-left: 30px;
        font-weight: 400;
    }
    p {
        margin: 30px;
        line-height: 2;
    }
    >div {
        margin-top: 55px;
        height: 250px;
        border-top: 1px solid #ccc;
        >div {
            float: left;
            margin-top: 35px;
            margin-left: 60px;
            text-align: center;
            width: 60px;
            height: 75px;
            img {
                margin-bottom: 5px;
                width: 50px;
                height: 50px;
            }
        }
    }
}

.shopRight {
    position: relative;
    float: right;
    width: 878px;
    height: 583px;
    border: 1px solid #ccc;
    h1 {
        text-align: center;
        padding-top: 10px;
        padding-bottom: 30px;
        color: #2595d0;
        border-bottom: 1px solid #ccc;
    }
    .contentbox {
        float: left;
        margin-left: 18px;
        margin-top: 20px;
        padding: 15px;
        width: 235px;
        height: 160px;
        border: 1px solid #ccc;
        transition: all .3s ease-in-out;
        &:hover {
            // transform: translateY(-5px);
            box-shadow: 0px 0px 5px #2594d4;
        }
        h3 {
            margin-bottom: 10px;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .line {
            position: relative;
            width: 6px;
            height: 6px;
            border-radius: 100%;
            background: #2595d0;
        }
        .line:before {
            content: '';
            position: absolute;
            top: 3px;
            height: 1px;
            width: 180px;
            background: -webkit-linear-gradient(left, rgba(37, 149, 208, 1), rgba(37, 149, 208, 0));
            /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, rgba(37, 149, 208, 1), rgba(37, 149, 208, 0));
            /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, rgba(37, 149, 208, 1), rgba(37, 149, 208, 0));
            /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, rgba(37, 149, 208, 1), rgba(37, 149, 208, 0));
            /* 标准的语法（必须放在最后） */
        }
        p,
        span,
        a {
            margin-top: 5px;
            font-size: 14px;
            overflow: hidden;
        }
        p {
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        .price {
            margin: 0;
            font-size: 45px;
            font-weight: 700;
            color: #2595d0;
        }
        span {
            text-decoration: line-through;
        }
        a {
            padding-left: 60px;
            color: #2595d0;
        }
    }
    .product {
        position: relative;
        padding-bottom: 100px;
    }
    .servicebox {
        margin-top: 10px;
        margin-left: 30px;
        font-size: 21px;
        font-weight: 700;
        line-height: 40px;
        span {
            display: inline-block;
            height: 40px;
        }
        a img {
            vertical-align: text-bottom;
            height: 40px;
            width: 40px;
        }
    }
    .license {
        margin: 10px auto;
        max-width: 400px;
        height: 400px;
        img {
            height: 400px;
            width: auto;
        }
    } // 分页
    .page-bar {
        position: absolute; // width: fit-content;
        top: 600px;
        left: 220px;
    }
}

.el-tabs__content {
    overflow: visible;
}
</style>
