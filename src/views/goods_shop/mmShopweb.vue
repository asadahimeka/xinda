<template>
    <!-- WEB端 -->
    <div v-if="!isPC">

        <div class="webshop">
            <!-- 店鋪信息 -->
            <div><img :src="logoImg(shopinfo.providerImg)" alt="logo"></div>
            <h5>{{shopinfo.name}}</h5>
            <p>{{shopinfo.providerInfo}}</p>
        </div>
        <div class="webmoduleTitle">
            <h6>知识产权</h6>
        </div>

        <div class="Shopboxbody">
            <template v-for="(content,i) in contentList">
                <a :href='"#/shdetail?sid="+content.id' :key="content.id">
                    <div class="shopBox" :key="content.id">
                        <div class="boxleft">
                            <img :src="logoImg(content.providerImg)">
                        </div>
                        <div class="boxright">
                            <h3>{{content.serviceName}}</h3>
                            <p>{{content.serviceInfo}}</p>
                            <div class="address">
                                <i class="iconfont">&#xe603;</i>{{content.regionName}}</div>
                            <div class="price">
                                <span>￥{{content.price/100}}</span>元</div>

                        </div>
                    </div>
                </a>
            </template>
            <p class="all" v-show="all">已加载完所有产品</p>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        if (this.isPC) {
            this.$router.push({ path: '/shop', query: { id: this.$route.query.id } });
            window.location.reload();
        }
        var canshu = {
            id: this.$route.query.id,
        };
        this.ajax.post('/xinda-api/provider/detail', canshu, {}).then((data) => {
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
            start: 0,
            limit: 0,
            contentList: [],
            all: false,
            bkshow: false,
        };
    },
    methods: {
        logoImg(providerImg) {
            return providerImg.substr(0, 1) == '/' ? 'http://115.182.107.203:8088/xinda/pic' + providerImg : providerImg;
        },
        getServCont() {
            this.limit += 6;
            this.$indicator.open();
            var canshu1 = {
                start: this.start,
                limit: this.limit,
                providerId: this.$route.query.id,
            };
            this.ajax.post('/xinda-api/product/package/grid', canshu1, {}).then((data) => {
                this.contentList = data.data.data;
                this.$indicator.close();
                this.all = this.limit > this.contentList.length ? true : false;
            }).catch((error) => {
                console.log('axios error', error);
            });
        },
        scrollMethod() {
            const sumH = document.body.scrollHeight;
            const viewH = document.documentElement.clientHeight;
            const scrollH = document.body.scrollTop;
            if (viewH + scrollH === sumH && this.limit === this.contentList.length) {
                // if (this.$route.path.indexOf('shopweb'))
                    this.getServCont();
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.scrollMethod);
    },
};


</script>

<style lang="less">
// WEB端
.webshop {
    margin: 5%; // height: 1.5rem;
    text-align: center;
    font-size: .14rem;
    img {
        padding-top: .3rem;
        max-width: 100%;
    }
    h5 {
        padding: .1rem;
        font-size: .2rem;
    }
    p {
        padding: .2rem 0;
        text-align: left;
        line-height: 2;
    }
}

.webmoduleTitle {
    height: .38rem;
    border-bottom: 2px solid #2693d4;
    line-height: .38rem;
    margin: .2rem 0;

    h6 {
        padding-left: .2rem;
        font-size: .2rem;
        font-weight: 400;
    }
}

.Shopboxbody {
    overflow: hidden;
    margin: 0 auto 1rem;
    width: 90%;

    a {
        text-decoration: none;
        color: #000;
    }

    .shopBox {
        padding: .2rem 0;
        border-bottom: 1px solid #ccc;
        overflow: hidden;
        font-size: .13rem;

        .boxleft {
            float: left;
            margin-right: .12rem;
            width: .9rem;
            line-height: .9rem;
            height: 0.9rem;
            text-align: center;
            vertical-align: middle;
            border: 1px solid #ccc;

            img {
                max-width: 100%;
                vertical-align: middle;
            }
        }
        .boxright {
            position: relative;
            text-align: left;
            line-height: 1.5;
            font-size: .12rem;

            h3 {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            div {
                margin-bottom: .06rem;
            }
            &> :nth-child(1) {
                font-size: .16rem;
                font-weight: 700;
            }

            p {
                font-size: .13rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .address {
                margin: .12rem;
                font-size: .1rem; // max-width: 1.3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .price {
                position: absolute;
                right: 0;
                bottom: -.05rem;

                span {
                    font-size: .18rem;
                    color: #F00;
                }
            }
        }
    }
    .all {
        margin-top: 0.2rem;
        font-size: .16rem;
        color: #999;
        text-align: center;
    }
}
</style>
