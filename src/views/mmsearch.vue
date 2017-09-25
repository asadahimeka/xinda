<template>
    <div class="container">
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
            <!-- 排序 -->
            <div class="listheader">
                <ul v-for = "(sort,i) in Sort" :key="i">
                    <li><a :class="{active:i==sort}" @click="sorc(i,sort.sort)">{{sort.way}}&nbsp;<i class="iconfont">&#xe731;</i></a></li>
                </ul>
            </div>
            
            <!-- 产品列表 -->
            <div class="productlist" v-for="(productlist,i) in products" :key="i">
                <ul>
                    <li class="logo"><img :src="logoImg(productlist.providerImg)" alt=""></li>
                    <li><h4>{{productlist.serviceName}}</h4></li>
                    <li class="info">{{productlist.serviceInfo}}</li>
                    <li><span>{{productlist.providerName}}</span><span>{{productlist.regionName}}</span></li>
                </ul>
                <div>
                    <div class="price">￥{{productlist.price/100}}</div>
                    <button>立即购买</button>
                    <button>加入购物车</button>
                </div>
            </div>

            <!-- 店铺列表 -->
            <div class="providerlist">
                
            </div>

        </div>
         <!-- 分页 -->
        <!-- <v-page :curInx="cur" :pageSize="pageSize" :pageChange="pageChange" :totalShow="false"></v-page> -->

        
        

    </div>
</template>


<script>
export default{ 
    created() {
        
    },
    data(){
        return {

            Sort: [{
                sort: '',
                way: '默认排序',
                },{
                sort: 2,
                way: '价格升序',
                },{
                sort: 3,
                way: '价格降序',
                },
            ],
            productData: {
                start:0,
                limit:8,
                searchName:'',
                sort:''
            },
            products: [],

            providerData: {
                start:0,
                limit:8,
                searchName:'',
                sort:1,
            },
            providers: [],
        }
    },
    methods:{

        sort(i,sort) {
            this.sort = i;
            this.ajdata.sort = sort;
            this.getProducts();
        },
        getProducts() {
            this.ajax.post('/xinda-api/product/package/search-grid', this.productData).then( (data) => {
                this.products = data.data.data;
                console.log('产品:', this.products);
            })

        },
        logoImg(providerImg) {
           return providerImg.substr(0, 1) == '/' ? 'http://115.182.107.203:8088/xinda/pic' + providerImg : providerImg;
        },

    },   
    created(){
        this.getProducts();

    },
}

</script>

<style lang="less">
    .container {
        width: 1200px;
        margin: 0 auto;

        .content {
            float: left;
            width: 948px;
            height: auto;
            border: 1px solid #ccc;
        }
        // 右侧栏
        .sidebar {
            float: right;
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
                background-image: url(../assets/icon_cup.png);
            }
            .men {
                background-image: url(../assets/icon_men.png);
            }
            .shield {
                background-image: url(../assets/icon_shield.png);
            }
            .crown {
                background-image: url(../assets/icon_crown.png);
            }
            h3 {
                font-weight: 400;
                margin: 0 40px 20px 40px;
                padding-bottom: 5px;
                border-bottom: 1px solid #ccc;
            }
        }
    }

    // 内容
    .listheader {
        display: flex;
        background: #f7f7f7;
        border-bottom: 1px solid #ccc;
        text-align: center;
        font-size: 14px;

        ul,li {
            float: left;
            line-height: 40px;

            a {
                display: inline-block;
                width: 110px;
                height: 40px;
                color: #000;
                
            }
            a:hover,.active {
                color: #fff;
                background: #2594d4;
                cursor: pointer;
            }
        }
    }
    .productlist {
        clear: both;

        ul {
            margin: 15px;
            border-top: 1px solid #eee;

            li {
                float: left;
                font-size: 14px;
                width: 600px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .logo {
                width: 100px;
                height: 100px;
                text-align: center;
                line-height: 100px;
                margin-right: 15px;

                img {
                    width: 100%;
                    height: auto;
                }
            }
        h4 {
            margin: 10px 0;
            font-weight: 400;
            font-size: 16px;
        }
        .info {
            color: #666;
            margin-bottom: 10px;
        }
    }

</style>