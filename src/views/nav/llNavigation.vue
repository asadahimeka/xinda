<template>
    <div class="navigation">
        <div class="mainNavigation">
            <ul>
                <li class="mainA">
                    <a href="/#/" :class="{acta:$route.path=='/'}">全部产品</a>
                    <div class="allNavigation" v-show="show">
                        <div class="finance">
                            <i class="navigationLogo">
                                &#xe653;
                            </i>
                            <div class="textRight">
                                <div class="titleRight">
                                    财税服务
                                </div>
                                <div class="textDetail">
                                    <p>代理记账</p>
                                    <p>税务代办</p>
                                    <p>审计报告</p>
                                </div>
                            </div>
                            <div class="financeDetails">
                                <p class="dai">代理记账 > |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=1&pid=8a82f52b674543e298d2e5f685946e6e">小规模记账</a> |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=1&pid=928c89c65b274178a46f002c5bcf9864">一般纳税人记账</a>
                                </p>
                                <p class="dai">税务代办 > |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=2&pid=1cf4fc9e80834b2494bef9fc999f845b">国税地税报道</a> |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=2&pid=7ae864d998bf4b8ab97ea18288dbc369">代开增值税专用发票</a> |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=2&pid=acde4ec4825f43f39342961a1ff9dd0a">税控代办及票种核定</a> |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=2&pid=afb4d36c54ff48029d43fc34a19111fb">所得税汇算清缴</a> |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=2&pid=cfb4c2142ba04954a3e6270024620745">一般纳税人资质申办</a>
                                </p>
                                <p class="dai">审计报告 > |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=3&pid=0ed787f42fe94b30b85e6a88f56e4614">验资报告</a> |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=3&pid=2cc17cc0fb7e4b79b3d961cdcb57c260">财务审计报告</a> |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=3&pid=9b60bc9ebdf54859966ca1eaa877c4d0">税审报告</a> |
                                    <a href="/#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=3&pid=b82125214bff49ebac7e9e7acd8dec9d">企业注销清算报告</a>
                                </p>
                            </div>
                        </div>
                        <div class="companyBusiness">
                            <i class="navigationLogo">
                                <img src="../../assets/gongsigongshang.png" alt="">
                            </i>
                            <div class="textRight">
                                <div class="titleRight">
                                    公司工商
                                </div>
                                <div class="textDetail">
                                    <p>公司注册</p>
                                    <p>公司变更</p>
                                </div>
                            </div>
                            <div class="companyBusinessDetails">
                                <div class="line1">
                                    <p class="dai">公司注册 > </p>
                                    <p> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=19b94314bc1a4b078d2402f8727c388b">分公司注册</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=19f52275bf774d38ae6dc96c81dcf2cd">公司注册地址</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=6fd1bf6cf5a147968ca342c33626fb6a">合伙企业注册</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=72cbc9d5732d492ebd431cabc80a4840">外商独资公司注册</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=93026392f62e42dcb1f7a6e140f96c2f">VIE架构</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=9deb846c49694ca8a69d6948e04f2e1d">股份公司注册</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=a7237d735f444e57b09d53bb18567f66">有限责任公司注册</a>
                                        <nobr> |
                                            <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=d7647889da64468e9978c5f6a8ae3d68">一般纳税人注册地址</a>
                                        </nobr>
                                    </p>
                                </div>
                                <div class="line2">
                                    <p class="dai">公司变更 > </p>
                                    <p>
                                        |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=5&pid=5ab7d02b940540a79379b8ca6f24af0e">公司股权变更</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=5&pid=6ad3e083801f4815b2419e7053f08415">公司名称变更</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=5&pid=a0df846e1b6c4bc0b9106805fa9c1aeb">公司注册地址变更</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=5&pid=d320982aee19443da1d216c22db559ea">内资公司注销</a> |
                                        <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=5&pid=f3481297d9de48c2a4d013f779f5e211">法人、高管或注册资本变更</a>
                                        <nobr> |
                                            <a href="/#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=5&pid=f4b5b231c5f545bf8541a3789ce1e699">公司经营范围变更</a>
                                        </nobr>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="knowledge">
                            <i class="navigationLogo">
                                <img src="../../assets/knowledge.png" alt="">
                            </i>
                            <div class="textRight">
                                <div class="titleRight">
                                    知识产权
                                </div>
                                <div class="textDetail">
                                    <p>专利申请</p>
                                    <p>商标注册</p>
                                    <p>版权保护</p>
                                </div>
                            </div>
                            <div class="knowledgeDetails">
                                <div class="line1">
                                    <p class="dai">专利申请 ></p>
                                    <p>
                                        |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=24d919ba0eb545dd9a3132dfb87cf599">审查意见答复</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=2ba08199e9ec4c61a0a22d55a890eda7">外观专利减缓（共同申请）</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=408835bc17a24a1cb20053059abdcdd7">发明不减缓</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=4af61ed9862c4db4b4e2087786a30ae9">发明减缓（个人）</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=836d8a5b396848a089172206c066f543">实用新型专利减缓</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=9ae30be4eaf14e05a7c11b650fc70d84">专利申请复审</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=c314a2c202414e969af7d5b19e4eea72">外观设计专利（不减缓）</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=c7114c5dfaa34e46ab073fe6c1236a1d">办理实用新型检索报告</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=e0bfb8a7df9e4fc2a68492c2ffc837c0">实用新型专利</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=e405f436e3c24bfaa20593be362e9f8d">外观专利减缓</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=10&pid=f03b6ba0b8af4cec8b4020046ea92070">实用新型专科减缓（共同申请）</a>
                                    </p>
                                </div>
                                <div class="line2">
                                    <p class="dai">商标注册 > </p>
                                    <p>
                                        |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=8&pid=27d7cbf829c94b8394ca32d2fde751e8">LOGO设计+商标注册</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=8&pid=3fd272460b4944d7841c27d6a26561f9">商标变更</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=8&pid=67dfa91adbd34765bcc9a5d2c066fa31">商标续展</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=8&pid=6950c7d5cf3d44048c02cfb2043b1edf">商标驳回复审</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=8&pid=965345732b584836b1ffa6a082b83092">商标快速注册</a> |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=8&pid=af4f971af85a4792a9f9da96ecc4de4f">著名商标认定</a> |
                                    </p>
                                </div>
                                <div class="line3">
                                    <p class="dai">版权保护 > </p>
                                    <p>
                                        |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=9&pid=1655cf83dc97468c9a0210330a969772">电视剧作品登记</a>
                                        |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=9&pid=3d7f6517f24b4ece808d3814d0e7acec">美术著作权</a>
                                        |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=9&pid=424dc72161954d77a8a9cbaca8a84e64">软件著作权</a>
                                        |
                                        <a href="/#/slist?id=1eff122d06604fc1aadf9e7acefba21a&code=9&pid=6b1d2339f86f4f5a868e0c94b0331e3d">音乐作品</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="security">
                            <i class="navigationLogo">
                                &#xe601;
                            </i>
                            <div class="textRight">
                                <div class="titleRight">
                                    社保代理
                                </div>
                                <div class="textDetail">
                                    <p>企业社保</p>
                                    <p>个人社保</p>
                                </div>
                            </div>
                            <div class="securityDetails">
                                <div class="line1">
                                    <p class="dai">企业社保 > </p>
                                    <p>
                                        |
                                        <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=6&pid=0e46c4b27e2a41aab572e11837ea0c9f">社保/公积金账户注销</a>
                                        |
                                        <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=6&pid=5e0220d58f30436e92a8d0052b4b8203">社保开户</a>
                                        |
                                        <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=6&pid=a2454fc246d94039941030759f2874ff">社保公积金代缴</a>
                                        |
                                        <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=6&pid=e3e64bfd698240058817bdcfa494a0c1">公积金开户</a>
                                    </p>
                                </div>
                                <div class="line2">
                                    <p class="dai">个人社保 > </p>
                                    <p>
                                        |
                                        <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=7&pid=512733629de842a2a1b1481908d2b647">个人社保代理</a>
                                        |
                                        <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=7&pid=77cf4539f1a548adb3aecf630837ec11">个人代理社保和公积金</a>
                                        |
                                        <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=7&pid=7da16d6deed64033846f534b360e2c5e">新参保（个人）</a>
                                        |
                                        <a href="/#/slist?id=cc7eb9bbd40f4b0e9f31c8cbcb903a59&code=7&pid=958166f8d0304e35bc5c6b3b0625158c">个人代理公积金</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#/slist?id=2e110f0df53243c197fede52fba8e5d0&code=1&pid=8a82f52b674543e298d2e5f685946e6e" :class="{acta:$route.fullPath.indexOf('2e110f0df53243c197fede52fba8e5d0')>-1}">
                        财税服务
                    </a>
                </li>
                <li>
                    <a href="#/slist?id=5af629246fa34f6f8d49758c6a7b25f1&code=4&pid=19b94314bc1a4b078d2402f8727c388b" :class="{acta:$route.fullPath.indexOf('5af629246fa34f6f8d49758c6a7b25f1')>-1}">
                        公司工商
                    </a>
                </li>
                <li>
                    <a href="/#/JoinUs" :class="{acta:$route.path=='/JoinUs'}">加盟我们</a>
                </li>
                <li>
                    <a href="/#/shoplist" :class="{acta:$route.path=='/shoplist'}">店铺</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return { show: 0 }
    },
    created() {
        this.$route.path == '/' ? this.show = 1 : 0;
    },
    watch: {
        $route(val) {
            this.show = val.path == '/' ? 1 : 0;
        }
    },
}
</script>

<style lang="less">
.mainA {
    .allNavigation {
        z-index: 10002;
    }
    &:hover .allNavigation {
        display: block !important;
    }
}

.navigation {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #2693d4;
    display: flex;
    justify-content: center;
    a {
        color: #000;
    }
    .mainNavigation ul {
        width: 1200px;
        height: 100%;
        display: flex;
        li {
            display: flex;
            width: 200px;
            height: 100%;
            line-height: 3;
            justify-content: center;
            position: relative;
            .allNavigation {
                width: 200px;
                position: absolute;
                left: 0;
                top: 41px;
                background-color: rgba(0, 0, 0, .51);
                &>div {
                    position: relative;
                    padding: 17px 14px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    .navigationLogo {
                        font-family: "iconfont" !important;
                        font-size: 26px;
                        font-style: normal;
                        -webkit-font-smoothing: antialiased;
                        -webkit-text-stroke-width: 0.2px;
                        -moz-osx-font-smoothing: grayscale;
                        color: #fff;
                    }
                }
                .textRight {
                    width: 133px;
                    color: white;
                    user-select: none;
                    cursor: default;
                    .titleRight {
                        font-size: 16px;
                        line-height: 22px;
                        display: flex;
                        align-items: center;
                    }
                    .textDetail {
                        font-size: 14px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        line-height: 25px;
                        display: flex;
                        flex-wrap: wrap;
                        p {
                            margin-top: 5px;
                        }
                    }
                }
                .finance {
                    width: 200px;
                    height: 117px;
                    .financeDetails {
                        width: 1000px;
                        height: 117px;
                        position: absolute;
                        left: 200px;
                        top: 0;
                        background-color: rgba(0, 0, 0, .51);
                        flex-direction: column;
                        padding: 16px;
                        box-sizing: border-box;
                        justify-content: space-around;
                        color: white;
                        display: none;
                        font-size: 14px;
                        a {
                            color: white;
                        }
                    }
                    &:hover {
                        background-color: #2693d4;
                    }
                    &:hover .financeDetails {
                        display: flex;
                    }
                }
                .companyBusiness {
                    width: 200px;
                    height: 84px;
                    .companyBusinessDetails {
                        width: 1000px;
                        height: 84px;
                        position: absolute;
                        left: 200px;
                        top: 0;
                        background-color: rgba(0, 0, 0, .51);
                        flex-direction: column;
                        padding: 16px;
                        box-sizing: border-box;
                        justify-content: space-around;
                        color: white;
                        display: none;
                        font-size: 14px;
                        a {
                            width: 500px;
                            color: white;
                            white-space: nowrap;
                        }
                        .line1,
                        .line2 {
                            display: flex;
                            line-height: 20px;
                            p:first-child {
                                width: 85px;
                                min-width: 85px;
                            }
                        }
                    }
                    &:hover {
                        background-color: #2693d4;
                    }
                    &:hover .companyBusinessDetails {
                        display: flex;
                    }
                }
                .knowledge {
                    width: 200px;
                    height: 114px;
                    .knowledgeDetails {
                        width: 1000px;
                        height: 114px;
                        position: absolute;
                        left: 200px;
                        top: 0;
                        background-color: rgba(0, 0, 0, .51);
                        flex-direction: column;
                        padding: 16px;
                        box-sizing: border-box;
                        justify-content: space-around;
                        color: white;
                        display: none;
                        font-size: 14px;
                        a {
                            width: 500px;
                            color: white;
                            white-space: nowrap;
                        }
                        .line1,
                        .line2,
                        .line3 {
                            display: flex;
                            line-height: 20px;
                            p:first-child {
                                width: 85px;
                                min-width: 85px;
                            }
                        }
                    }
                    &:hover {
                        background-color: #2693d4;
                    }
                    &:hover .knowledgeDetails {
                        display: flex;
                    }
                }
                .security {
                    width: 200px;
                    height: 86px;
                    .securityDetails {
                        width: 1000px;
                        height: 86px;
                        position: absolute;
                        left: 200px;
                        top: 0;
                        background-color: rgba(0, 0, 0, .51);
                        flex-direction: column;
                        padding: 16px;
                        box-sizing: border-box;
                        justify-content: space-around;
                        color: white;
                        display: none;
                        font-size: 14px;
                        a {
                            width: 500px;
                            color: white;
                            white-space: nowrap;
                        }
                        .line1,
                        .line2,
                        .line3 {
                            display: flex;
                            line-height: 20px;
                            p:first-child {
                                width: 85px;
                                min-width: 85px;
                            }
                        }
                    }
                    &:hover {
                        background-color: #2693d4;
                    }
                    &:hover .securityDetails {
                        display: flex;
                    }
                }
            }
        }
        &>a {
            height: 100%;
            border-bottom: 3px solid transparent;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            font-size: 18px;
            &:hover {
                border-bottom: 3px solid #2693d4;
            }
        }
    }
}

.acta {
    display: inline-block;
    line-height: 2.5;
    letter-spacing: 1px;
    color: #2693d4 !important;
    border-bottom: 4px solid #2693d4;
}
.dai{color:#ddd;}
</style>