<template>
    <div class="member-right" v-loading="loading">
        <div class="right1">
            <p>我的订单</p>
        </div>
        <div class="right2">
            <span style="margin-left:10px;">订单号：</span><input type="text" @keyup="handleSrch" v-model="srchNo" placeholder="请输入订单号" @focus="$event.target.select()">
            <button @click="search">搜索</button><br>
            <span>创建时间：</span>
            <div class="block">
                <el-date-picker v-model="startdate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" @change="dateChange">
                </el-date-picker>
            </div>
            至
            <div class="block">
                <el-date-picker v-model="enddate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" @change="dateChange">
                </el-date-picker>
            </div>
        </div>
        <div class="right3">
            <span style="width:300px;">商品名称</span>
            <span style="width:70px;">单价</span>
            <span style="width:70px;padding-left:12px;">数量</span>
            <span style="width:90px;padding-left:17px;">总金额</span>
            <span style="width:90px;padding-left:25px;">订单状态</span>
            <span>订单操作</span>
        </div>
        <el-alert v-if="!bolist.length" title="没有相关订单信息。" type="info" :closable="false" show-icon=""></el-alert>
        <template v-for="(item,i) in bolist" v-if="end>item.createTime">
            <div class="right4" :key="i">
                <p>订单号：
                    <span>{{item.businessNo}}</span>下单时间：
                    <span>{{fmtTime(item.createTime)}}</span>
                </p>
            </div>
            <div class="r5div" :key="item.id">
                <div class="wrap">
                    <div class="right5" v-for="item1 in soarr[i]" :key="item1.providerId">
                        <a href="" class="imgArticle"><img :src="img[item1.providerId]" alt=""></a>
                        <div style="width:250px;height:100px;">
                            <a href="" class="site">{{item1.providerName}}</a>
                            <span :title="item1.serviceInfo" style="display:block;line-height:30px;padding-bottom:20px;">{{item1.serviceName}}</span>
                        </div>
                        <p style="width:100px;height:100px;text-align:center;">￥
                            <span>{{fmtPrice(item1.unitPrice)}}</span>
                        </p>
                        <p style="width:80px;height:100px;;text-align:center;">
                            <span>{{item1.buyNum}}</span>
                        </p>
                        <p style="width:110px;height:100px;;text-align:center;border-left:1px solid #ddd;color:#2693d4">￥
                            <span>{{fmtPrice(item1.totalPrice)}}</span>
                        </p>
                        <p class="form" style="line-height:100px;">
                            <span>{{STATUS[item1.status]}}</span>
                        </p>
                    </div>
                </div>
                <div class="form form1" style="text-align:center;" v-if="item.status==1">
                    <a :href='"#/pay?bno="+item.businessNo' style="color:#fff">
                        <span style="display:inline-block;width:80px;height:35px;line-height:35px;border:1px solid #2693d4;border-radius:5px;background:#2693d4;color:#fff;">
                            付款
                        </span>
                    </a><br>
                    <span @click="delOrder(item.id,i)" style="display:inline-block;color:red;cursor:pointer;font-size:15px;">删除订单</span>
                </div>
                <div class="form form1" style="text-align:center;" v-if="item.status!=1">
                    <span @click="delOrder(item.id,i)" style="display:inline-block;color:red;cursor:pointer;font-size:15px;">删除订单</span>
                </div>
            </div>
        </template>

        <v-page :curInx="cur" :pageSize="pageSize" :pageChange="pageChange" :totalShow="true"></v-page>

    </div>
</template>

<script>
export default {
    created() {
        this.getBOrder();
    },
    data() {
        return {
            startdate: '',
            enddate: '',
            end: Date.now(),
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            srchNo: '',
            cur: 1,
            pageSize: 0,
            pdata: {
                businessNo: '',
                startTime: '',
                endTime: '',
                start: 0,
                limit: 8,
            },
            bolist: [],
            soarr: [],
            img: {
                'a7304eecbd7246b4b424874e0359eab0': 'http://115.182.107.203:8088/xinda/pic/2016/09/28/8c419db3f572418a80ff5a08397fb857',
                '9080f0c120a64eb3831d50ba93c33e78': 'http://115.182.107.203:8088/xinda/pic/2016/09/23/58152db2c9b940c385e442ffe12cfe20',
            },
            STATUS: {
                "1": "未付款",
                "2": "待接单",
                "3": "服务中",
                "4": "已完成待结算",
                "5": "结算申请中",
                "6": "已结算",
                "7": "异常订单"
            },
            loading: 1,
        };
    },
    methods: {
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
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
        pageChange(curPage) {
            this.cur = curPage;
            this.pdata.start = (curPage - 1) * this.pdata.limit;
            this.getBOrder();
        },
        handleSrch() {
            if (event.keyCode == 13) {
                this.search();
            }
        },
        dateChange() {
            if (!this.startdate && !this.enddate) {
                this.pdata.businessNo = '';
                this.pdata.startTime = '';
                this.pdata.endTime = '';
                this.end = Date.now();
                this.getBOrder();
            }
        },
        search() {
            if (this.srchNo || this.startdate || this.enddate) {
                this.pdata.businessNo = this.srchNo;
                this.pdata.startTime = !this.startdate ? '' : this.fmtTime(new Date(this.startdate)).substr(0, 10);
                // this.pdata.endTime = this.fmtTime(new Date(this.enddate)).substr(0, 10);;
                this.end = isNaN(Date.parse(this.enddate)) ? Date.now() : Date.parse(this.enddate);
                this.getBOrder();
            } else {
                this.$message.warning('请输入订单号或选择创建时间');
            }
        },
        getBOrder() {
            this.loading = true;
            this.ajax.post('/xinda-api/business-order/grid', this.pdata).then((res) => {
                // console.log('b', res);
                if (res.data.data) {
                    this.pageSize = res.data.pageSize;
                    this.bolist = res.data.data.sort((a, b) => b.createTime - a.createTime);
                    this.bolist.length ? 0 : this.loading = false;
                    this.soarr = [];
                    this.getsoarr();
                } else {
                    this.$message(res.data.msg);
                }
            }).catch(error => {
                if (error.response) {
                    if (error.response.status == 400) {
                        this.loading = false;
                        this.$message('请输入正确的订单号');
                    }
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('ERROR:', error.message);
                }
            });
        },
        getsoarr() {
            var bo = this.bolist;
            var len = bo.length;
            for (var i = 0; i < len; i++) {
                var bno = bo[i].businessNo;
                this.ajax.post('/xinda-api/service-order/grid', {
                    businessNo: bno,
                    startTime: '',
                    endTime: '',
                    start: 0,
                }).then((res) => {
                    // console.log('s', res);
                    if (res.data.data) {
                        this.soarr.push(res.data.data);
                        this.soarr = this.soarr.sort((a, b) => b[0].createTime - a[0].createTime);
                        setTimeout(() => this.loading = false, 100);
                    }
                })
            }
        },
        delOrder(id, i) {
            this.$confirm('确定删除该订单吗?', '信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                lockScroll: false,
            }).then(() => {
                this.ajax.post(
                    '/xinda-api/business-order/del',
                    { id }
                ).then((res) => {
                    console.log('del', res);
                    if (res.data.status == 1) {
                        this.bolist.splice(i, 1);
                        this.soarr.splice(i, 1);
                        // this.getBOrder();
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.warning(res.data.msg);
                    }
                }).catch(error => {
                    console.error(error);
                });
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' });
            });
        },

    },
    watch: {
        srchNo(val) {
            if (val == '') {
                this.pdata.businessNo = '';
                this.pdata.startTime = '';
                this.pdata.endTime = '';
                this.getBOrder();
            }
        }
    },
}
</script>

<style lang="less" scoped>
button {
    outline: none;
}

.member-right {
    width: 934px;
    display: inline-block;
    .right1 {
        width: 900px;
        height: 36px;
        border-bottom: 2px solid #ddd;
        margin: 25px 0;
        p {
            width: 85px;
            padding: 5px 15px;
            font-size: 20px;
            color: #2693d4;
            border-bottom: 2px solid #2693d4;
        }
    }
    .right2 {
        height: 100px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .block {
            width: 200px;
            margin: 0 10px;
            .el-input__inner {
                width: 200px;
            }
        }
        span {
            display: inline-block;
            width: 82px;
            height: 50px;
            line-height: 49px;
        }
        input {
            width: 270px;
            height: 32px;
            padding-left: 10px;
            font-size: 15px;
        }
        button {
            margin-left: 20px; // vertical-align: center;
            padding-bottom: 2px;
            width: 100px;
            height: 34px;
            font-size: 16px;
            color: #fff;
            background: #2693d4;
            border: 0;
            border-radius: 7px;
            margin-right: 420px;
        }
    }
    .right3 {
        height: 40px;
        line-height: 40px;
        background: #f7f7f7;
        font-weight: 600;
        font-size: 15px;
        span {
            display: inline-block;
            padding-left: 48px;
        }
    }
    .right4 {
        height: 40px;
        background: #f7f7f7;
        margin-top: 10px;
        border: 1px solid #ddd;
        p {
            display: block;
            padding-left: 20px;
            line-height: 40px;
            span {
                display: inline-block;
                width: 200px;
            }
        }
    }
    .right5 {
        width: 800px;
        border: 1px solid #ddd;
        border-right: 0;
        border-top: 0;
        display: flex;
        p {
            display: inline-block;
            height: 100px;
            text-align: center;
            line-height: 100px;
            margin: 0;
        }
        .imgArticle {
            display: inline-block;
            width: 80px;
            height: 58px;
            border: 1px solid #ddd;
            margin: 20px;
            display: flex;
            align-items: center;
            img {
                width: 100%;
            }
        }
        .site {
            display: block;
            margin-top: 10px;
            height: 40px;
            line-height: 40px;
            text-decoration: none;
            color: #000;
            font-size: 18px;
        }
        span {
            width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}

.r5div {
    display: flex;
}

.form {
    width: 145px;
    color: #2693d4;
    border-left: 1px solid #ddd;
    border-top: 0;
}

.form1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #ddd;
    border-top: 0;
}

.el-alert {
    width: 300px !important;
    margin: 70px auto 200px !important;
}

.page-bar {
    margin-top: 40px;
    text-align: center;
    button {
        margin: 0 !important;
    }
}
</style>
