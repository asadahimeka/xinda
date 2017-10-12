<template>
    <div class="service container">
        <div class="moduleTitle">
            <h3>
                <a :class="{active : show}" @click="clk1()">推荐服务商</a>
            </h3>
            <h3>
                <a :class="{active : !show}" @click="clk2()">推荐服务</a>
            </h3>
        </div>
        <div class="moduleBody">
            <template v-for="(list,i) in providerList">
                <a v-if="show" @click="enter(list.id)" :key="i">
                    <div><img :src="providerImg(list.providerImg)" alt=""></div>
                    <h3>{{list.providerName}}</h3>
                    <span>服务指数：8.9分</span>
                    <span>提供的服务:</span>
                    <template v-for="(prod,i) in list.products">
                        <p v-if="i<4" :key="i">{{prod}}</p>
                    </template>
                </a>
            </template>
            <template v-for="(list,i) in productList">
                <a :key="i" v-if="!show" @click="enter(list.id)">
                    <div><img :src="providerImg(list.providerImg)" alt=""></div>
                    <h3>{{list.serviceName}}</h3>
                    <h4>{{list.providerName}}</h4>
                    <div class="price">
                        <span>￥{{list.price/100}}</span>元</div>
                    <button>查看详情</button>
                </a>
            </template>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recommend: {},
            productList: {},
            providerList: {},
            show: true,
        };
    },
    methods: {
        clk1() {
            this.show = true;
            this.getProvider();
        },
        clk2() {
            this.show = false;
            this.getProduct();
        },
        getProduct() {
            this.$ajax.post('/xinda-api/recommend/list', {}).then((data) => {
                this.productList = data.data.data.product;
                // console.log('product', this.productList);
            })
        },
        getProvider() {
            this.$ajax.post('/xinda-api/recommend/list', {}).then((data) => {
                this.providerList = data.data.data.provider;
                // console.log('provider', this.providerList);
                for (var i = 0; i < this.providerList.length; i++) {
                    this.providerList[i].products = this.providerList[i].products.split(',');
                }
            })
        },
        enter(id) {
            if (this.show) {
                this.$router.push({
                    path: '/shop',
                    query: { id },
                })
            } else {
                this.$router.push({
                    path: '/shdetail',
                    query: { sid: id },
                })
            }

        },
        providerImg(providerImg) {
            return providerImg.substr(0, 1) == '/' ? 'http://115.182.107.203:8088/xinda/pic' + providerImg : providerImg;
        },
    },
    created() {
        this.getProvider();
        this.getProduct();
    },

}

</script>

<style lang="less" scoped>
.container {
    width: 1200px;
    margin: 0 auto;
}

.moduleTitle {
    height: 38px;
    border-bottom: 2px solid #2693d4;
    line-height: 38px;
    margin: 20px 0;

    h3 {
        float: left;
        margin-right: 30px;
        font-weight: 400;
        cursor: pointer;

        a {
            color: #000;
        }
        .active,
        a:hover,
        a:active {
            color: #2693d4;
        }
    }
}

.moduleBody {
    overflow: hidden;

    a {
        display: inline-block;
        margin: 3px;
        margin-right: 16px;
        padding: 15px;
        width: 250px;
        height: 380px;
        border: 1px solid #ccc;
        overflow: hidden;
        color: #000;
        line-height: 2;
        text-align: center;
        cursor: pointer;
        transition: all .3s ease-in-out;
        &:hover {
            box-shadow: 0 0 5px #2693d4;
            border: 1px solid #2693d4;
        }
        &>div {
            margin: 5px 0;
            width: 250px;
            height: 148px;
            border: 1px solid #ccc;
            vertical-align: middle;
            line-height: 148px;

            img {
                vertical-align: middle;
            }
        }
        h3,
        h4 {
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
        span {
            display: block;
            text-align: left;
        }
        p {
            float: left;
            margin: 5px 0;
            padding: 0 5px;
            width: 110px;
            height: 40px;
            background: #eee;
            line-height: 40px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;

            &:nth-child(2n) {
                margin-left: 5px;
            }
        }
    }
    > :last-child {
        margin: 3px;
    }
    .price {
        margin: 10px auto;
        height: auto;
        font-size: 18px;
        border: none;
        line-height: 50px;
        span {
            display: inline-block;
            margin-right: 10px;
            color: #2693d4;
            font-size: 24px;
        }
    }
    button {
        line-height: unset;
        width: 140px;
        height: 40px;
        border: 1px solid #2693d4;
        background: none;
        border-radius: 10px;
        font-size: 16px;
        color: #2693d4;
        cursor: pointer;
    }
}
</style>
