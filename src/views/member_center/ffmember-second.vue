<template>
    <div>
        <div class='appraisal'>
            <div class=" appraisal1">
                <p>我的评价</p>
            </div>
            <div class="appraisal2">
                <a href="javascript:void(0);" class="unvalud1" id="u" @click="weipingjia">未评价</a>
                <a href="javascript:void(0);" class="unvalud2" @click="yipingjia">已评价</a>
            </div>
            <el-alert v-if="!evlist.length" title="暂无数据" type="info" :closable="false" show-icon></el-alert>
            <div class="unvalued unval" v-for="(item,i) in evlist" :key="i">
                <div class="unvalue1">
                    <div class="imgwrap"><img :src="dealSrc(item.providerImg)" alt="NO IMG"></div>
                </div>
                <div class="unvalue2">
                    <h4>{{item.providerName}}</h4>
                    <p>服务单号：{{item.serviceNo}}</p>
                    <p>购买内容：
                        <span>{{item.serviceInfo}}</span>
                    </p>
                </div>
                <div class="unvalue3">购买时间：
                    <span>{{fmtTime(item.buyTime)}}</span>
                </div>
                <div class="unvalue4" v-if="toEvaShow">
                    <a @click="topingjia(item)" href="javascript:;">去评价</a>
                </div>
                <div class="unvalue4 u5" v-if="!toEvaShow">
                    <a @click="topingjia" href="javascript:;">已评价</a>
                </div>
            </div>
            <v-page :curInx="cur" :pageSize="pageSize" :pageChange="pageChange" :totalShow="true"></v-page>
        </div>
        <div class="toEvaluate">
            <div class="to1">
                <p>评价</p>
            </div>
            <div class="to2" style="height:70px;">
                <p>服务单号：
                    <span>{{sno}}</span>
                </p>
                <p>购买内容：
                    <span>{{cnt}}</span>
                </p>
                <p>购买时间：
                    <span>{{ctime}}</span>
                </p>
            </div>
            <div class="to3">
                <span>评价：</span>
                <input type="radio" style="margin-left:30px;" name="sex">好评
                <input type="radio" style="margin-left:20px;" name="sex">中评
                <input type="radio" style="margin-left:20px;" name="sex">差评
            </div>
            <div class="to4">
                <span style="margin-right:30px;">评分：</span>
                <el-rate v-model="value3" show-text></el-rate>
            </div>
            <div style="width:700px;display:flex;">
                <span style="width:100px;">感受：</span>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea3"></el-input>
            </div>
            <button>提交</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value3: null,
            textarea3: '',
            toEvaShow: 1,
            evlist: [{
                "buyTime": 1477615209000,
                "id": "4aad53183c144544b4e482a91353ad22",
                "providerId": "a7304eecbd7246b4b424874e0359eab0",
                "providerImg": "/2016/09/28/8c419db3f572418a80ff5a08397fb857",
                "providerName": "云智慧咨询服务有限公司",
                "serviceInfo": "代理记账",
                "serviceNo": "B1623060102",
                "status": 2
            }],
            cur: 1,
            pageSize: 1,
            pdata: {
                start: 0,
                limit: 6,
                status: 2,
            },
            sno:'',
            cnt:'',
            ctime:'',
        }
    },
    created() {
        // this.getEv();
    },
    methods: {
        weipingjia: function() {
            var unvalud1 = document.getElementsByClassName('unvalud1')[0];
            var unvalud2 = document.getElementsByClassName('unvalud2')[0];
            unvalud1.style.background = "#2693d4";
            unvalud1.style.color = "#fff";
            unvalud2.style.background = "#e9e9e9";
            unvalud2.style.color = "#000";
            this.toEvaShow = 1;
            this.pdata.status = 1;
        },
        yipingjia: function() {
            var unvalud1 = document.getElementsByClassName('unvalud1')[0];
            var unvalud2 = document.getElementsByClassName('unvalud2')[0];
            unvalud2.style.background = "#2693d4";
            unvalud2.style.color = "#fff";
            unvalud1.style.background = "#e9e9e9";
            unvalud1.style.color = "#000";
            this.toEvaShow = 0;
            this.pdata.status = 2;
        },
        topingjia: function(item) {
            this.sno = item.serviceNo;
            this.cnt = item.serviceInfo;
            this.ctime = item.buyTime;
            var appraisal = document.getElementsByClassName('appraisal')[0];
            var toEvaluate = document.getElementsByClassName('toEvaluate')[0];
            toEvaluate.style.display = "block";
            appraisal.style.display = "none";
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
            return /^\/[^/]/.test(src) ? "http://115.182.107.203:8088/xinda/pic" + src : src;
        },
        pageChange(curPage) {
            this.cur = curPage;
            this.pdata.start = (curPage - 1) * this.pdata.limit;
        },
        getEv() {
            /* //Error: Request failed with status code 404
            this.ajax.post(
            '/xinda/xinda-api/service/judge/grid', pdata).then(res => {
                console.log(res);
                this.evlist = res.data.data;
            }).catch(err => {
                console.log(err);
            });
            */
        },
    }

}
</script>

<style lang="less" scoped>
.toEvaluate {
    display: none;
    width: 930px;
    font-size: 18px;
    .to1 {
        width: 900px;
        height: 36px;
        border-bottom: 2px solid #ddd;
        margin: 25px 0;
        p {
            width: 55px;
            padding: 5px 15px;
            font-size: 20px;
            color: #2693d4;
            border-bottom: 2px solid #2693d4;
        }
    }
    .to2 {
        width: 800px;
        p {
            display: inline-block;
            width: 260px;
        }
    }
    .to4 {
        height: 80px;
        display: flex;
        align-items: center;
    }

    button {
        width: 130px;
        height: 45px;
        font-size: 18px;
        margin: 40px 0 0 500px;
        border-radius: 7px;
        color: seashell;
        border: 0;
        background: coral;
    }
}

.appraisal {
    width: 930px;
    .appraisal1 {
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
    .appraisal2 {
        width: 928px;
        height: 45px;
        background: #e9e9e9;
        line-height: 45px;
        border: 1px solid #ccc;
        a {
            display: inline-block;
            width: 55px;
            padding: 0 20px;
            color: #333;
            border-right: #333;
            text-decoration: none;
            &:hover {
                background: #2693d4;
            }
        }
    }
    .unvalued {
        display: flex;
        height: 150px;
        border: 1px solid #ccc;
        border-top: 0; // display: none;
        .unvalue1 {
            width: 130px;
            .imgwrap {
                width: 100px;
                height: 100px;
                border: 1px solid #ddd;
                margin: 25px 15px;
                img {
                    width: 100%;
                }
            }
        }
        .unvalue2 {
            width: 250px;
            overflow: hidden;
            line-height: 35px;
            h4 {
                margin-top: 25px;
            }
        }
        .unvalue3 {
            width: 400px;
            line-height: 150px;
        }
        .unvalue4 {
            line-height: 150px;
            a {
                color: #2693d4;
                font-size: 18px;
                text-decoration: none;
                border: 1px solid #2693d4;
                padding: 7px 15px;
                border-radius: 5px;
            }
        }
    }
    #u {
        background: #2693d4;
        color: #fff;
    }
}

.u5 {
    a {
        color: #fff !important;
        border: 0 !important;
        background: #d6d6d6;
    }
}

.page-bar {
    margin-top: 50px;
    text-align: center;
}

.el-alert {
    width: 300px;
    margin: 70px auto;
}
</style>
