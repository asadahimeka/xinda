<template>
    <div>
        <!-- WEB端 -->
        <div class="shoplist">
            <div class="Shopboxtitle">
                <ul>
                    <li :class="{active:i==sori}" v-for="(item,i) in shopSort" :key="i">
                        <a @click="sorc(i,item.sort)">{{item.name}}</a>
                    </li>
                </ul>
            </div>
            <!-- 内容区 -->
            <div class="Shopboxbody">
                <template v-for="info in shopinfo">
                    <div class="shopBox" :key="info.id" @click="enter(info.id)">
                        <div class="boxleft" >
                            <img :src="imgurl(info.providerImg)">
                        </div>
                        <div class="boxright">
                            <div>{{info.providerName}}</div>
                            <div>{{info.regionName}}</div>
                            <div>累计服务客户次数:
                                <span>{{info.orderNum}}</span><br>好评率:
                                <span>{{rate(info.goodJudge,info.totalJudge)}}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- 分页 -->
            <!-- <v-page :curInx="cur" :pageSize="pageSize" :pageChange="pageChange" :totalShow="false"></v-page> -->

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            shopinfo: [],
            isActive: false,
            shopSort: [{
                sort: 1,
                name: '默认排序',
            }, {
                sort: 3,
                name: '销量',
            },
            ],
            ajdata: {
                start: 0,
                limit: 8,
                sort: '',
            },
            sori: 0,
            cur: 1,
            pageSize: 0,
        }
    },
    methods: {
        pageChange(curPage) {
            this.cur = curPage;
            this.ajdata.start = (curPage - 1) * this.ajdata.limit;
            this.$indicator.open();
            this.getShop();
        },
        getShop() {
            this.$indicator.open();
            this.ajax.post('/xinda-api/provider/grid', this.ajdata, {}).then((data) => {
                this.shopinfo = data.data.data;
                // console.log(this.shopinfo);
                this.pageSize = data.data.pageSize;
                this.$indicator.close();

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
                path: '/shopweb',
                query: { id },
            })
        },
        imgurl(providerImg) {
            var imgurl;
            imgurl = providerImg.substr(0, 1) == '/' ? 'http://115.182.107.203:8088/xinda/pic' + providerImg : providerImg;
            return imgurl;
        },
        sorc(i, sort) {
            this.sori = i;
            this.ajdata.sort = sort;
            this.getShop();
        },
    },
    created() {
        this.isPC ? this.$router.push('/shoplist') : 0;
        this.getShop();
    },
}
</script>


<style lang="less" scoped>
// 内容区
.Shopboxtitle {
    text-align: center;
    font-size: .16rem;

    ul {
        margin: .3rem auto;
        width: 2rem;
        
        &> :nth-child(1) {
            border-top-left-radius: .1rem;
            border-bottom-left-radius: .1rem;
            border-right: none;
        }
        &> :nth-child(2) {
            border-top-right-radius: .1rem;
            border-bottom-right-radius: .1rem;
            border-left: none;
        }
    }


    li {
        float: left;
        line-height: .4rem;
        width: .98rem;
        border: 1px solid #ccc;
    }
    
    
    .active {
        color: #fff;
        background: #2594d4; // border-top-left-radius: .1rem;
        // border-bottom-left-radius: .1rem;
        border: 1px solid #2594d4;
    }
}

.Shopboxbody {
    overflow: hidden;
    margin: 0 auto;
    width: 90%;

    .shopBox {
        padding: .2rem 0;
        border-bottom: 1px solid #ccc;
        overflow: hidden;
        font-size: .13rem;

        .boxleft {
            float: left;
            margin-right: .2rem;
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
            text-align: left;
            line-height: 1.5;

            div {
                margin-bottom: .06rem;
            }
            &> :nth-child(1) {
                font-size: .16rem;
                font-weight: 700;
            }
            span {
                color: #F00;
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
</style>
