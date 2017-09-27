<template>
    <div class="joinUsFrame">
        <div class="joinUsLogo">
            <img src="../../static/images/joinus1.png" alt="">
            <div class="Draw">
                加盟我们<br> 只做有价值的平台
            </div>
        </div>
        <div class="ToJoinIn">
            <div class="etitle">
                TO JOIN IN
            </div>
            <div class="chinatitle">
                服务商加盟
            </div>
            <div class="webAddress">
                www.xinda.com
            </div>
            <div class="ChineseIntroduce">
                信达提供先上精准营销方案、帮助服务商快捷、低成本的获取有效客户，为传统优质服务商插上互联网的翅膀，助力企业腾飞。
            </div>
            <div class="tojoininBanner">
                <img src="../../static/images/serverjoin.png" alt="">
            </div>
        </div>
        <div class="YouWillReceive">
            <div class="innerYouWillRecive">
                <div class="etitle">
                    YOU WILL RECEIVE
                </div>
                <div class="chinatitle">
                    你将获得
                </div>
                <div class="webAddress">
                    www.xinda.com
                </div>
                <div class="lineUp">
                    <div class="lineLeft">
                        <i class="fontTbig">&#xe6e6;</i>
                        <div class="reduce">
                            精准的线上曝光机会
                        </div>
                    </div>
                    <div class="lineRight">
                        <i class="fontTbig">
                            &#xe650;
                        </i>
                        <div class="reduce">
                            万亿市场份额
                        </div>
                    </div>
                </div>
                <div class="lineDown">
                    <div class="lineLeft">
                        <i class="fontTbig">&#xe602;</i>
                        <div class="reduce">
                            系统化的营销解决方案
                        </div>
                    </div>
                    <div class="lineRight">
                        <i class="fontTbig">
                            &#xe618;
                        </i>
                        <div class="reduce">
                            各种补贴优惠
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="Professional">
            <div class="etitle">
                PROFESSIONAL
            </div>
            <div class="chinatitle">
                哪些职业可以加盟
            </div>
            <div class="webAddress">
                www.xinda.com
            </div>
            <div class="JoinList">
                <div class="ListItem" @mouseover="listone($event)">
                    <div class="list">
                        <i class="listIcon">&#xe606;</i>
                    </div>
                    <p :class="{ active: isClass1 }">工商注册</p>
                    <p :class="{ active: isClass1 }">REGISTERED</p>
                </div>
                <div class="ListItem" @mouseover="listtwo">
                    <div class="list">
                        <i class="listIcon">&#xe680;</i>
                    </div>
                    <p :class="{ active:isClass2 }">财税服务</p>
                    <p :class="{ active:isClass2 }">SERVICE</p>
                </div>
                <div class="ListItem" @mouseover="listthree">
                    <div class="list">
                        <i class="listIcon">&#xe66a;</i>
                    </div>
                    <p :class="{ active:isClass3 }">知识产权</p>
                    <p :class="{ active:isClass3 }">INTELLECTUAL PROPERTY</p>
                </div>
                <div class="ListItem" @mouseover="listfour">
                    <div class="list">
                        <i class="listIcon">&#xe608;</i>
                    </div>
                    <p :class="{ active:isClass4 }">人力外包</p>
                    <p :class="{ active:isClass4 }">HR OUTSOURCING</p>
                </div>
            </div>
            <div class="detailed">
                <div class="question">
                    我们需要什么样的服务商？
                </div>
                <div class="answer answer1">
                    在公司注册、公司变更、资质审批等领域深耕多年，在业内享有一定的知名度，可以提供优质优价的服务；<br> 与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。
                </div>
                <div class="answer answer2">
                    在代理记账、审计验资等领域深耕多年，可以提供涉足各个行业优秀的才会人员；<br> 与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。
                </div>
                <div class="answer answer3">
                    在商标注册，版权专利，著作权等领域深耕多年，可以提供涉足各个行业优秀的才会人员；<br> 与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。
                </div>
                <div class="answer answer4">
                    在人事代理、企业社保、个人社保等领域升更多年，具有丰富的社保代理经验。
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isClass1: true,
            isClass2: false,
            isClass3: false,
            isClass4: false,
        }
    },
    methods: {
        listone: function(event) {
            this.isClass1 = true;
            this.isClass2 = false;
            this.isClass3 = false;
            this.isClass4 = false;
            var allanswer = document.querySelectorAll('.answer');
            var useanswer = document.querySelector('.answer1');
            for (let i = 0; i < allanswer.length; i++) {
                allanswer[i].style.display = 'none';
            }
            useanswer.style.display = 'block';
        },
        listtwo: function(e) {
            this.isClass1 = false;
            this.isClass2 = true;
            this.isClass3 = false;
            this.isClass4 = false;
            var allanswer = document.querySelectorAll('.answer');
            var useanswer = document.querySelector('.answer2');
            for (let i = 0; i < allanswer.length; i++) {
                allanswer[i].style.display = 'none';
            }
            useanswer.style.display = 'block';
        },
        listthree: function(e) {
            this.isClass1 = false;
            this.isClass2 = false;
            this.isClass3 = true;
            this.isClass4 = false;
            var allanswer = document.querySelectorAll('.answer');
            var useanswer = document.querySelector('.answer3');
            for (let i = 0; i < allanswer.length; i++) {
                allanswer[i].style.display = 'none';
            }
            useanswer.style.display = 'block';
        },
        listfour: function(e) {
            this.isClass1 = false;
            this.isClass2 = false;
            this.isClass3 = false;
            this.isClass4 = true;
            var allanswer = document.querySelectorAll('.answer');
            var useanswer = document.querySelector('.answer4');
            for (let i = 0; i < allanswer.length; i++) {
                allanswer[i].style.display = 'none';
            }
            useanswer.style.display = 'block';
        }
    }
}
</script>

<style lang="less">

.joinUsFrame {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .joinUsLogo {
        width: 100%;
        height: 396px;
        overflow: hidden;
        position: relative;
        img {
            display: block;
            margin: 0 auto;
        }
        .Draw {
            width: 1200px;
            height: 100%;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -600px;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 29px;
            color: #2a2a2a;
            line-height: 57px;
        }
    }
    .ToJoinIn {
        width: 1200px;
        height: 576px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
        div {
            width: 100%;
            text-align: center;
        }
        .etitle {
            line-height: 48px;
            font-size: 16px;
            color: #333;
            margin-top: 25px;
        }
        .chinatitle {
            width: 306px;
            height: 63px;
            background-image: url(../../static/images/linebg.png);
            font-size: 30px;
            color: #f00;
            line-height: 50px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
        }
        .webAddress {
            font-size: 14px;
        }
        .ChineseIntroduce {
            font-size: 20px;
            color: black;
            font-weight: 600;
        }
    }
    .YouWillReceive {
        width: 100%;
        height: 568px;
        background-color: #edf0f3;
        display: flex;
        justify-content: center;
        .innerYouWillRecive {
            width: 1200px;
            height: 568px;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            justify-content: center;
            &>div {
                width: 100%;
                text-align: center;
            }
            .etitle {
                font-size: 20px;
                color: #000;
                line-height: 88px;
            }
            .chinatitle {
                width: 306px;
                height: 63px;
                background-image: url(../../static/images/linebg.png);
                font-size: 30px;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                color: #f00;
                line-height: 50px;
            }
            .webAddress {
                font-size: 14px;
            }
            .lineUp {
                height: 77px;
                display: flex;
                justify-content: space-around;
            }
            .lineDown {
                height: 77px;
                display: flex;
                justify-content: space-around;
                margin-top: 113px;
            }
            .lineLeft {
                width: 260px;
                height: 77px;
                display: flex;
                justify-content: flex-start;
            }
            .lineRight {
                width: 260px;
                height: 77px;
                display: flex;
                justify-content: flex-start;
            }
            .fontTbig {
                font-family: "iconfont" !important;
                font-size: 77px;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
                -moz-osx-font-smoothing: grayscale;
                margin-right: 2px;
                line-height: 68px;
                color: #7d7d7d;
            }
            .reduce {
                display: flex;
                align-items: center;
                color: #232324;
                margin-left: 20px;
            }
        }
    }
    .Professional {
        width: 1200px;
        height: 697px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
        &>div {
            width: 100%;
            text-align: center;
        }
        .etitle {
            font-size: 20px;
            line-height: 88px;
        }
        .chinatitle {
            width: 323px;
            height: 63px;
            background-image: url(../../static/images/joinin.png);
            display: flex;
            align-items: flex-end;
            justify-content: center;
            font-size: 30px;
            color: #f00;
            margin-top: 26px;
        }
        .webAddresss {
            font-size: 14px;
        }
        .JoinList {
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            .ListItem {
                width: 205px;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                user-select: none;
                cursor: pointer;
                p {
                    width: 100%;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                }
                .list {
                    width: 139px;
                    height: 160px;
                    background-image: url(../../static/images/sixgod.png);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 18px;
                }
                .listIcon {
                    font-family: "iconfont" !important;
                    font-size: 70px;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-stroke-width: 0.2px;
                    -moz-osx-font-smoothing: grayscale;
                    color: #7d7d7d;
                    z-index: -1;
                }
                .active {
                    color: #2693d4;
                }
            }
        }
    }
    .detailed {
        width: 100%;
        margin-top: 40px;
        display: flex;
        flex-wrap: wrap;
        &>div {
            width: 100%;
            text-align: center;
        }
        .question {
            font-size: 20px;
            font-weight: 600;
            line-height: 68px;
        }
        .answer {
            display: none;
        }
        .answer1 {
            display: block;
        }
    }
}
</style>