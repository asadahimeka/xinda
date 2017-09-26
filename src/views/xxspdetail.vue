<template>
    <div class="spdetail" v-loading.fullscreen.lock="fsLoading" element-loading-text="加载中">
        <p>首页 /
            <span>{{type}}</span>
        </p>
        <div class="detail">
            <div class="detailimg"><img :src="dealSrc(prod.img)" alt=""></div>
            <div class="detail_div">
                <b>{{srv.serviceName}}</b>
                <p class="describe">{{srv.serviceInfo}}</p>
                <span class="mkprice">市场价：
                    <s>￥{{fmtPrice(prod.marketPrice)}}</s>
                </span>
                <p>价&nbsp;&nbsp;&nbsp;格：
                    <span>￥{{fmtPrice(srv.price)}}</span>&nbsp;{{dealUnit(srv.unit)}}</p>
                <div class="type">
                    <div class="tp">类型：</div>
                    <div class="tpdiv">
                        <div :class="{act:srv.code==item.code}" v-for="(item,i) in srvlist" :key="i" @click="changeType(item.id)">
                            {{item.serviceName}}
                        </div>
                    </div>
                </div>
                <span class="area">地区：{{region}}</span>
                <div class="buynum">
                    购买数量：
                    <button class="min" @click="clkMin" :disabled="buyNum==1">-</button>
                    <input type="text" class="shnum" v-model="buyNum" @change="cartChange" @focus="focus" v-numberonly>
                    <button class="pls" @click="clkPls">+</button>
                </div>
                <a href="javascript:;" class="buynow" @click="buyNow">立即购买</a>
                <a href="javascript:;" class="buycart" @click="addCart">加入购物车</a>
            </div>
            <div class="refer">
                <b>顶级服务商</b>
                <p>{{prvdr.name}}</p>
                <button @click="fbShow=1">马上咨询</button>
                <span>
                    <a href="">查看服务商</a>
                </span>
            </div>
        </div>
        <img src="../../static/images/u1225.png" alt="" class="hf">
        <div class="clickmenu">
            <div class="clserve" :class="{public:!index}" @click="index=0">
                服务内容
            </div>
            <div class="evalua" :class="{public:index}" @click="index=1">
                商品评价
            </div>
        </div>
        <el-alert v-if="!srv.serviceContent" title="数据为空，请稍后再试。" type="info" show-icon></el-alert>
        <div class="servenr" v-show="index == 0&&srv.serviceContent" v-html="srv.serviceContent"></div>
        <div class="appraise" v-show="index == 1">
            <div class="appraise_div">
                <div class="pj">
                    <span>{{rate[0]}}%</span>&nbsp;好评</div>
                <div class="assese">
                    好评（{{rate[0]}}%）
                    <el-progress :percentage="rate[0]"></el-progress>
                    中评（{{rate[1]}}%）
                    <el-progress :percentage="rate[1]"></el-progress>
                    差评（{{rate[2]}}%）
                    <el-progress :percentage="rate[2]"></el-progress>
                </div>
                <div class="effect">
                    <p>客户印象</p>
                    <p>暂无已添加的客户印象标签</p>
                </div>

            </div>

            <div class="totle">
                <div class="alltotel" :class="{cmo:jix==0}" @click="jix=0">
                    全部评价({{judgelist.length}})
                </div>
                <div class="alltotel" :class="{cmo:jix==1}" @click="jix=1">
                    好评({{judge.goodNum}})
                </div>
                <div class="alltotel" :class="{cmo:jix==2}" @click="jix=2">
                    中评({{judge.midNum}})
                </div>
                <div class="alltotel" :class="{cmo:jix==3}" @click="jix=3">
                    差评({{judge.badNum}})
                </div>
            </div>
            <div class="jdglist">
                <div class="tit">
                    <span class="jdg">评价</span>
                    <span>满意度</span>
                    <span>用户</span>
                </div>
                <el-alert v-if="!judgelist.length" title="数据为空，请稍后再试。" type="info" show-icon></el-alert>
                <div class="cont" v-for="j in judgelist" :key="j.id">
                    <div class="jdg">
                        <p class="jinfo">
                            {{j.memberPhone}}： {{j.serviceInfo}} <br>
                            <span>
                                ({{region}}) {{fmtTime(j.judgeTime)}}
                            </span>
                        </p>
                        <p>{{j.content}}</p>
                    </div>
                    <el-rate :value="parseInt(j.score)" disabled :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                    </el-rate>
                    <div>
                        <img :src="dealSrc(j.memberImg)" alt="">
                    </div>
                </div>
                <v-page :curInx="1" :pageSize="1" :totalShow="false"></v-page>
            </div>
        </div>

        <div class="pay-fb" v-if="fbShow">
            <div class="fb-tit">免费电话咨询
                <span @click="fbShow=0">×</span>
            </div>
            <div class="fb-msg" v-if="callShow">
                <el-steps :space="140" :active="1">
                    <el-step title="输入手机号码"></el-step>
                    <el-step title="您接听来电"></el-step>
                    <el-step title="被叫方接听"></el-step>
                    <el-step title="咨询结束"></el-step>
                </el-steps>
                <input class="pho" type="text" placeholder="请输入手机号" v-model="phone" v-numberonly><br>
                <input type="text" placeholder="请输入图形验证码" v-model="imgCode">
                <div class="verCode">
                    <img :src="src" alt="" @click="flushCode">
                </div><br>
                <input type="text" placeholder="请输入验证码" v-model="messageTest">
                <button class="getcode" @click="getMessage">{{getMessageBtn}}</button><br>
                <button class="start" @click="consult">
                    <a>开始免费咨询</a>
                </button>
                <a>本次电话咨询完全免费，我们将对您的号码严格保密，请放心使用。</a>
            </div>
            <div class="fb-msg" v-if="!callShow">
                <p class="tip">本次电话咨询完全免费，我们将对您的号码严格保密，请放心使用。</p>
                <p class="call">正在为您接通电话</p>
                <p class="call">请您注意接通来电</p>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'spdetail',
    data() {
        return {
            fsLoading: true,
            pichost: "http://115.182.107.203:8088/xinda/pic",
            index: 0,
            prod: {},
            buyNum: 1,
            region: '',
            srv: {},
            srvlist: [],
            type: '商品详情',
            prvdr:'',
            sid: this.$route.query.sid,
            src: '/xinda-api/ajaxAuthcode',//图片验证码获取地址
            phone: '',//绑定手机号的Value值
            imgCode: '',//图片验证码的Value值
            messageTest: '',//短信验证码的Value值
            getMessageBtn: '获取验证码',//点击获取按钮
            fbShow: 0,
            callShow: 1,
            judge: {
                goodNum: 1,
                midNum: 0,
                badNum: 0,
            },
            rate: [100, 0, 0],
            judgelist: [{
                "content": "服务很快",
                "id": "75edf7f7131a49a3ad60db78b6c1997b",
                "judgeTime": 1491104026000,
                "memberImg": "/2016/09/14/b2fdb49bcdfb4c7b8caf618188a0fa84",
                "memberName": "张三",
                "memberPhone": "188****0871",
                "score": "5",
                "serviceInfo": "价格包含养老、失业、医疗、工伤、生育，企业、个人缴纳费用1360元/月。服务费为50元／月。",
                "serviceRegion": "110105",
                "tags": null,
                "type": "1"
            }],
            jix: 0,
            region: '',
        }
    },
    created() {
        if (!this.$route.query.sid) {
            this.$router.push('/');
        } else {
            window.scrollTo(0, 0);
            this.getChoose();
            this.getDetail();
        }
    },
    methods: {
        ...mapActions(['cartAction']),
        fmtPrice(p) {
            p = (parseFloat(p) * 0.01).toFixed(2);
            return isNaN(p) ? 0 : p;
        },
        fmtTime(msec) {
            var date = new Date(msec);
            var year = date.getFullYear();
            var mouth = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
            var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
            var hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
            var min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
            return year + '-' + mouth + '-' + day + ' ' + hour + ':' + min + ':' + sec;
        },
        dealSrc(src) {
            return /^\/[^/]/.test(src) ? this.pichost + src : src;
        },
        dealUnit(u) {
            return u ? u.substr(u.indexOf(':') + 1).replace(/[?\s]+/g, '') : '元';
        },
        clkMin() {
            this.buyNum = parseInt(this.buyNum) < 2 ? 1 : parseInt(this.buyNum) - 1;
        },
        clkPls() {
            this.buyNum = parseInt(this.buyNum) + 1;
        },
        focus() {
            event.target.select();
        },
        cartChange() {
            this.buyNum = parseInt(this.buyNum) || 1;
        },
        changeType(id) {
            this.sid = id;
            this.getChoose();
            this.getDetail();
        },
        dealImg(h) {
            return h && h.replace(/src=\"/g, 'src=\"' + this.pichost);
        },
        getDetail() {
            this.ajax.post(
                '/xinda-api/product/package/detail',
                { sId: this.sid },
            ).then(res => {
                if (res.data.status == 1) {
                    this.prod = res.data.data.product;
                    this.prvdr = res.data.data.provider;
                    this.region = res.data.data.regionText;
                    this.srv = res.data.data.providerProduct;
                    this.srv.serviceContent = this.dealImg(this.srv.serviceContent);
                    this.srvlist = res.data.data.serviceList;
                    // this.getJudge();
                    // this.getJudgeList();
                    this.fsLoading = false;
                } else {
                    this.$message({ type: 'warning', message: res.data.msg });
                }
            }).catch(res => {
                console.log('Axios: ', res);
            });
        },
        getChoose() {
            this.ajax.post('/xinda-api/product/style/list').then((res) => {
                if (this.$route.query.tid && this.$route.query.code) {
                    if (res.data.status == 1) {
                        var types = res.data.data[this.$route.query.tid].itemList;
                        for (var key in types) {
                            if (types[key].code == this.$route.query.code) {
                                this.type = types[key].name;
                            }
                        }
                    } else {
                        this.$message({ type: 'warning', message: res.data.msg });
                    }
                }
            })
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
        buyNow() {
            this.ajax.post(
                '/xinda-api/cart/add',
                { id: this.srv.id, num: this.buyNum },
            ).then(res => {
                if (res.data.status == 1) {
                    this.ajax.post(
                        '/xinda-api/cart/submit'
                    ).then(res => {
                        if (res.data.status == -1) {
                            // TODO
                            sessionStorage.setItem('pathToLogin', this.$route.path);
                            this.open('提示', res.data.msg, "跳转至登录界面", '/Logon');
                        } else if (res.data.status == 1) {
                            //TODO
                            this.$router.push({ path: '/pay', query: { bno: res.data.data } })
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
        addCart() {
            this.ajax.post(
                '/xinda-api/cart/add',
                { id: this.srv.id, num: this.buyNum },
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
        flushCode() {//刷新验证码
            this.src = '/xinda-api/ajaxAuthcode?' + Math.random().toString().substr(2, 4);
        },
        getMessage(e) {
            //点击获取短信验证码
            if (this.testPhone()) {
                if (this.imgCode) {
                    this.ajax.post(
                        '/xinda-api/register/sendsms', {
                            cellphone: this.phone,
                            smsType: 1,
                            imgCode: this.imgCode,
                        }).then((fontMessage) => {
                            if (fontMessage.data.status == 1) {
                                this.$message.success(fontMessage.data.msg);
                                this.getMessageBtn = 59;
                                var timeLoop = setInterval(() => {
                                    this.getMessageBtn -= 1;
                                    if (this.getMessageBtn == 0) {
                                        this.getMessageBtn = '点击获取';
                                        e.target.disabled = false;
                                        e.target.style.backgroundColor = '#fff';
                                        clearInterval(timeLoop);
                                    }
                                }, 1000);
                            } else {
                                this.$message.error(fontMessage.data.msg);
                                this.flushCode();
                            }
                        }).catch((error) => {
                            console.log('e', error);
                        });
                } else {
                    this.$message.error('请填写验证码！');
                }
            }
        },
        testPhone() {
            if (!this.phone) {
                this.$message.error('请填写手机号码！');
                return false;
            } else {
                // 手机号本地校验正则
                var testPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!testPhone.test(this.phone)) {
                    this.$message.error('请输入正确的11位手机号码！');
                    return false;
                }
                return true;
            }
        },
        consult() {
            if (this.testPhone()) {
                if (this.messageTest) {
                    this.callShow = 0;
                } else {
                    this.$message.error('请填写验证码！');
                }
            }
        },
        getJudge() {
            this.ajax.post(
                'http://115.182.107.203:8088/xinda/xinda-api/product/judge/detail',
                { serviceId: this.srv.id },
            ).then(res => {
                if (res.data.status == 1) {
                    this.judge = res.data.data;
                    var sum = this.judge.goodNum + this.judge.midNum + this.judge.badNum;
                    if (sum) {
                        this.rate.push(this.judge.goodNum / sum * 100);
                        this.rate.push(this.judge.midNum / sum * 100);
                        this.rate.push(this.judge.badNum / sum * 100);
                    }
                } else {
                    this.$message(res.data.msg);
                }
            }).catch(res => {
                console.log('Axios: ', res);
            });
        },
        getJudgeList() {
            this.ajax.post(
                'http://115.182.107.203:8088/xinda/xinda-api/product/judge/grid', {
                    start: 0,
                    limit: 10,
                    serviceId: this.srv.id,
                    type: 1,
                }).then(res => {
                    this.judgelist = res.data.data;
                }).catch(res => {
                    console.log('Axios: ', res);
                });
        },
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

<style lang="less">
.spdetail {
    width: 1200px;
    margin: 25px auto;
    .detail {
        width: 100%;
        margin-top: 10px;
        display: flex;
        .detailimg {
            width: 525px;
            height: 393px;
            img {
                width: 100%;
            }
        }
        .detail_div {
            width: 395px;
            margin-left: 32px;
            margin-bottom: 30px;
            b {
                font-size: 23px;
            }
            .describe {
                font-size: 14px;
                margin-top: 22px;
            }
            .mkprice {
                display: block;
                margin-top: 38px;
                font-size: 14px;
            }
            p {
                margin-top: 7px;
                font-size: 14px;
                span {
                    font-size: 18px;
                    color: red;
                    font-weight: 600;
                }
            }
            .type {
                font-size: 14px;
                display: block;
                margin-top: 30px;
                .tp {
                    display: inline-block;
                    width: 45px;
                    margin-top: 6px;
                    vertical-align: top;
                }
                .tpdiv {
                    display: inline-block;
                    width: 330px;
                    div {
                        display: inline-block;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        padding: 7px 10px;
                        border: 1px solid #ccc;
                        cursor: pointer;
                    }
                    .act {
                        color: #2693d4;
                        border: 1px solid #2693d4;
                    }
                }
            }
            .area {
                display: block;
                margin-top: 25px;
            }
            .buynum {
                margin-top: 24px;
            }
            .buynow {
                font-size: 14px;
                background-color: #2693d4;
                color: white;
                width: 95px;
                height: 27px;
                margin-top: 20px;
                margin-left: 66px;
                display: block;
                text-align: center;
                line-height: 2;
                text-decoration: none;
                border-radius: 5px;
            }
            .buycart {
                font-size: 14px;
                border: 1px solid #2693d4;
                color: #2693d4;
                width: 95px;
                height: 25px;
                margin-top: -27px;
                margin-left: 175px;
                display: block;
                text-align: center;
                line-height: 25px;
                text-decoration: none;
                border-radius: 5px;
            }
            .min,
            .pls {
                display: inline-block;
                vertical-align: middle;
                width: 32px;
                height: 27px;
                background: #f1f1f1;
                border: 1px solid #f6f6f6;
                font-size: 15px;
                font-weight: 600;
                border: 1px solid #666;
                cursor: pointer;
            }
            .min {
                margin-right: -5px;
                border-right: 0;
            }
            .pls {
                margin-left: -4px;
                border-left: 0;
            }
            .shnum {
                width: 50px;
                height: 25px;
                border: 1px solid #666;
                text-align: center;
            }
        }
        .refer {
            width: 199px;
            height: 235px;
            border: 1px solid #2693d4;
            margin-left: 69px;
            text-align: center;
            b {
                display: block;
                font-size: 24px;
                margin-top: 23px;
            }
            p {
                font-size: 14px;
                margin: 21px 0;
            }
            button {
                display: block;
                margin-left: 50px;
                width: 90px;
                height: 30px;
                background-color: white;
                color: #74b2df;
                border: 1px solid #2693d4;
            }
            span {
                width: 100%;
                height: 76px;
                background-color: #bddef2;
                display: block;
                margin-top: 14px;
                a {
                    background-color: #2693d4;
                    color: white;
                    text-decoration: none;
                    display: inline-block;
                    line-height: 2;
                    border-radius: 5px;
                    width: 110px;
                    height: 30px;
                    margin-top: 25px;
                    font-size: 14px;
                }
            }
        }
    }
    .hf {
        width: 1200px;
        margin-top: 30px;
    }
    .clickmenu {
        width: 1200px;
        height: 41px;
        border: 1px solid #ccc;
        margin-top: 38px;
        background-color: #f7f7f7;
        display: flex;
        .clserve {
            width: 135px;
            height: 100%;
            text-align: center;
            line-height: 2.5;
            cursor: pointer;
        }
        .evalua {
            width: 135px;
            height: 100%;
            text-align: center;
            line-height: 2.5;
            cursor: pointer;
        }
        .public {
            position: relative;
            background-color: #2693d4;
            color: white;
            &:after {
                position: absolute;
                bottom: -7px;
                left: 40%;
                content: '';
                width: 0;
                height: 0;
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
                border-top: 7px solid #2693D4;
            }
        }
    }
    .servenr {
        width: 1160px;
        margin-bottom: 70px;
        padding: 20px;
        padding-bottom: 150px;
        border: 1px solid #ccc;
        border-top: 0;
    }
    .appraise {
        margin-bottom: 70px;
        border: 1px solid #ccc;
        border-top: 0;
        .appraise_div {
            display: flex;
            .pj {
                color: #2693d4;
                line-height: 3;
                margin-left: 70px;
                span {
                    font-size: 38px;
                }
            }
        }
        .assese {
            margin-left: 100px;
            margin-top: 18px;
            line-height: 27px;
        }
        .effect {
            margin-left: 345px;
            margin-top: 20px;
            height: 85px;
            padding-left: 30px;
            border-left: 1px solid #ccc;
        }
    }
    .totle {
        height: 50px;
        border: 1px solid #ccc;
        margin-top: 11px;
        display: flex;
        .alltotel {
            width: 120px;
            font-size: 17px;
            text-align: center;
            line-height: 3;
            cursor: pointer;
        }
        .cmo {
            background-color: #2693d4;
            color: white;
        }
    }
}

.el-progress {
    width: 170px;
    height: 20px;
    margin-top: -20px;
    margin-left: 120px;
}

.el-progress__text {
    display: none;
}

.pay-fb {
    z-index: 9;
    position: absolute;
    top: 20%;
    left: 25%;
    width: 675px; // height: 290px;
    border-right: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    background: #fff;
    .fb-tit {
        height: 50px;
        padding-left: 25px;
        line-height: 50px;
        font-size: 18px;
        background: #f8f8f8;
        span {
            float: right;
            margin-right: 25px;
            font-size: 35px;
            font-weight: 500;
            cursor: pointer;
        }
    }
    .fb-msg {
        padding: 30px 75px 40px;
        text-align: center;
        .start {
            width: 150px;
            height: 35px;
            margin-top: 30px;
            margin-bottom: 10px;
            background: #2693d4;
            border: 0;
            border-radius: 5px;
            font-size: 16px;
            a {
                color: #fff;
                text-decoration: none;
            }
        }
        a {
            display: block;
            font-size: 12px;
            color: #666;
        }
        input {
            width: 200px;
            height: 35px;
            margin: 10px 0;
            padding-left: 5px;
        }
        .getcode {
            width: 105px;
            height: 35px;
            margin-left: 10px;
            vertical-align: middle;
            border: 1px solid #D1D1D1;
            border-radius: 5px;
            color: #666;
            background: #F5F4F4;
        }
        .pho {
            width: 320px;
            margin-top: 20px;
        }
        .tip {
            margin-bottom: 50px;
        }
        .call {
            margin-bottom: 20px;
            font-size: 18px;
            color: #2693d4;
        }
    }
}

.verCode {
    display: inline-block;
    width: 105px;
    height: 35px;
    margin-left: 10px;
    vertical-align: middle;
    img {
        width: 100%;
        height: 100%;
    }
}

.jdg {
    width: 525px;
}

.jdglist {
    width: 100%;
    height: 300px;
    .tit {
        height: 50px;
        span {
            display: inline-block;
            width: 330px;
            line-height: 50px;
            text-align: center;
        }
        .jdg {
            width: 525px;
        }
    }
    .cont {
        border-top: 1px solid #ccc;
        div {
            display: inline-block;
            width: 320px;
            height: 165px;
            margin-top: 20px;
            vertical-align: top;
        }
        .jdg {
            width: 525px;
            p {
                padding: 10px;
            }
            .jinfo {
                color: #666;
            }
        }
    }
}

.el-rate {
    height: 105px !important;
    padding-top: 60px;
    text-align: center;
}

.el-steps {
    margin-left: 40px;
}

.el-alert {
    width: 300px;
    margin: 20px auto;
}
.page-bar{
    text-align: center;
}
</style>