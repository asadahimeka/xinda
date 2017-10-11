<template>
    <div class="xxindex">
        <div class="star" v-if="isPC" v-loading="ld">
            <p>明星产品推荐</p>
            <div class="starmenu">
                <el-alert v-if="err" title="Get data failed." type="error" show-icon></el-alert>
                <div class="starmenu_list" v-for="(item,i) in starlist" :key="i">
                    <a :href='"#/shdetail?sid="+item.id'>
                        <div class="smlistbg">
                            <div class="mnico"><img :src="starimg[i]" alt=""></div>
                            <b :title="item.serviceName">{{dealName(item.serviceName)}}</b>
                            <p :title="item.serviceInfo">{{dealInfo(item.serviceInfo)}}</p>
                            <p>
                                <span>{{fmtPrice(item.price)}}</span>{{item.unit}}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div class="startx" v-if="isPC" v-loading="ld">
            <p>初创企业必备</p>
            <div class="startxmenu">
                <el-alert v-if="err" title="Get data failed." type="error" show-icon></el-alert>
                <a v-for="(item,i) in relist" :href='"#/shdetail?sid="+item.id' :key="i">
                    <div class="startxx">
                        <img :src="relistimg+item.providerImg" alt="">
                        <b>{{item.serviceName}}</b>
                        <p class="intro" :title="item.serviceInfo">{{dealInfo(item.serviceInfo)}}</p>
                        <p>
                            <span>{{fmtPrice(item.price)}}</span>元</p>
                        <button class="startb">查看详情</button>
                    </div>
                </a>
            </div>
        </div>
        <div class="starty" v-if="!isPC">
            <p class="qyp">初创企业</p>
            <div class="startxmenu">
                <el-alert v-if="err" title="Get data failed." type="error" show-icon></el-alert>
                <a v-for="(item,i) in relist" :href='"#/shdetail?sid="+item.id' :key="i">
                    <div class="startyy">
                        <img :src="relistimg+item.providerImg" alt="">
                        <div>
                            <b>{{item.serviceName}}</b>
                            <p class="intro" :title="item.serviceInfo">{{dealInfo(item.serviceInfo)}}</p>
                            <p>
                                <span>{{fmtPrice(item.price)}}</span>元</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="bot">
                <img src="../../assets/logo.png" alt="">
                <b>信达</b>
            </div>
            <p class="botp">一站式企业交易中心</p>
        </div>
    </div>
</template> 

<script>
export default {
    name: 'xxindex',
    data() {
        return {
            relist: [],
            relistimg: 'http://115.182.107.203:8088/xinda/pic',
            starlist: [],
            starimg: [
                "../../../static/images/qianbao.svg",
                "../../../static/images/zhuce.svg",
                "../../../static/images/zhuce1.svg",
                "../../../static/images/zhuce1.svg",
            ],
            err: 0,
            ld: true,
        }
    },
    methods: {
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        dealName(name) {
            return name.substring(0, name.search(/[(（]/));
        },
        dealInfo(info) {
            return info.length > 33 ? info.substring(0, 32) + '...' : info;
        },
        getRecom() {
            // !this.isPC ? this.$indicator.open() : 0;   
            this.ld = true;         
            this.ajax.post('/xinda-api/recommend/list').then((res) => {
                if (res.data.status == 1) {
                    this.starlist = res.data.data.product;
                    this.relist = res.data.data.hq;
                    if (this.isPC) {
                        this.ld = false;
                    } else {
                        // this.$indicator.close();
                    }
                } else {
                    this.err = 1;
                    this.isPC
                        ? this.$message({ type: 'warning', message: res.data.msg })
                        : this.$toast(res.data.msg);
                }
            })
        }
    },
    created() {
        this.getRecom();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
}

@mcolor: #2693d4;

a {
    color: #000;
}

.star {
    margin-top: 53px;
    width: 1200px;
    height: 472px; // border: 1px solid red;
    margin-left: auto;
    margin-right: auto;
    .starmenu {
        height: auto;
        margin-top: 10px;
        border-top: 2px solid @mcolor;
        display: flex;
        justify-content: space-between;
        .starmenu_list {
            margin-top: 49px;
            padding: 10px;
            border: 1px solid #e8e8e8;
            text-align: center;
            cursor: pointer;
            transition: .4s ease-in-out;
            &:hover {
                box-shadow: 0px 0px 5px @mcolor;
                border: 1px solid @mcolor;
            }
            .smlistbg {
                width: 250px;
                height: 378px;
                background-color: #fafafa;
            }
            .mnico {
                display: inline-block;
                width: 125px;
                height: 125px;
                margin-top: 50px;
                border: 1px solid @mcolor;
                border-radius: 100%;
                img {
                    margin-top: 24px;
                }
            }
            b {
                display: block;
                text-align: center;
                margin-top: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            p {
                text-align: center;
                font-size: 14px;
                color: #7d7d7d;
                margin-top: 24px;
                span {
                    font-size: 23px;
                    color: #5badde;
                }
            }
            .starimg {
                width: 270px;
                height: 398px;
            }
        }
    }
}

.startx {
    margin-top: 53px;
    width: 1200px;
    height: 472px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    .startxmenu {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        border-top: 2px solid @mcolor;
        .startxx {
            width: 252px;
            height: 378px;
            margin-top: 50px;
            padding: 10px;
            border: 1px solid #e8e8e8;
            text-align: center;
            cursor: pointer;
            transition: .4s ease-in-out;
            &:hover {
                box-shadow: 0px 0px 5px @mcolor;
                border: 1px solid @mcolor;
            }
            img {
                height: 41px;
                margin-top: 50px;
            }
            b {
                display: block;
                margin-top: 50px;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .intro {
                font-size: 14px;
                margin-top: 16px;
                text-align: center;
                height: 65px;
                span {
                    font-size: 23px;
                    color: #5caedf;
                }
            }
            p {
                font-size: 14px;
                margin-top: 16px;
                text-align: center;
                span {
                    font-size: 23px;
                    color: #5caedf;
                }
            }
            .startb {
                width: 157px;
                height: 45px;
                color: @mcolor;
                background-color: white;
                border: 2px solid @mcolor;
                border-radius: 5px;
                margin-top: 10px;
            }
        }
    }
}

a {
    text-decoration: none;
}

.starty {
    font-size: .18rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    .qyp {
        margin-left: 0.23rem;
    }
    .startxmenu {
        // display: flex;
        justify-content: space-between;
        margin-top: 10px;
        border-top: 2px solid @mcolor;
        .startyy {
            display: flex;
            width: 100%;
            height: 100%;
            padding: 10px;
            border: 1px solid #e8e8e8;
            text-align: center;
            cursor: pointer;
            transition: .4s ease-in-out;
            box-sizing: border-box;
            &:hover {
                box-shadow: 0px 0px 5px @mcolor;
            }
            img {
                width: 25%;
                height: .41rem;
                margin-top: 30px;
                border: 1px solid #e3e3e3;
                padding-bottom: 30px;
                padding-top: 30px;
            }
            div {
                width: 70%;
                margin-left: 0.25rem;
                b {
                    display: block;
                    margin-top: 30px;
                    text-align: left;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .intro {
                    font-size: 14px;
                    margin-top: .05rem;
                    text-align: left;
                    span {
                        font-size: 23px;
                        color: #5caedf;
                    }
                }
                p {
                    font-size: 14px;
                    text-align: left;
                    margin-top: 0.10rem;
                    span {
                        font-size: .23rem;
                        color: red;
                    }
                }
                .startb {
                    width: 157px;
                    height: 45px;
                    color: @mcolor;
                    background-color: white;
                    border: 2px solid @mcolor;
                    border-radius: 5px;
                    margin-top: 10px;
                }
            }
        }
    }
    .bot {
        width: 39%;
        margin: 0.26rem auto 0;
        img {
            vertical-align: middle;
        }
        b {
            font-size: 0.29rem; // display: block;
            // margin-top: -0.05rem;
            vertical-align: middle; // margin-left: 0.6rem;
        }
    }
    .botp {
        width: 45%;
        margin: 0.17rem auto 1rem;
    }
}

.el-alert {
    width: 300px;
    margin: 50px auto;
}
</style>
