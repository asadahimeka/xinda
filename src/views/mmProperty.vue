<template>
    <div class="property container">
        <div class="moduleTitle">
            <h3>知识产权</h3>
        </div>
        <div class="moduleBodyB">
            <div>
                <div>
                    <h3>知识产权</h3>
                    <ul>
                        <li>|&nbsp;商标注册</li>
                        <li>|&nbsp;版权保护</li>
                        <li>|&nbsp;专利申请</li>
                    </ul>
                </div>
                <a href="javascript:;"><img src="../../static/images/property_03.jpg" alt=""></a>
            </div>
            <div>
                <div>
                    <h3>商标注册</h3>
                    <p>急速申报，办理简单</p>
                    <h2>￥1000
                        <span>/次</span>
                    </h2>
                </div>
                <a href="javascript:;"><img src="../../static/images/property_05.jpg" alt=""></a>
            </div>
            <div>
                <div>
                    <h3>版权专利</h3>
                    <p>快速提交，全程跟踪</p>
                    <h2>￥1000
                        <span>/次</span>
                    </h2>
                </div>
                <a href="javascript:;"><img src="../../static/images/property_07.jpg" alt=""></a>
            </div>
            <div>
                <div>
                    <h3>著作权</h3>
                    <p>专业顾问，经验丰富，快速响应，顺利拿证！</p>
                    <h2>￥1000
                        <span>/次</span>
                    </h2>
                </div>
                <a href="javascript:;"><img src="../../static/images/property_11.jpg" alt=""></a>
            </div>
        </div>
        <div class="propertyFooter">
            <div>
                <img src="../assets/icon_certification.png" alt="">
                <h2>资质认证<br>
                    <span>服务商100%实名认证</span>
                </h2>
            </div>
            <div>
                <img src="../assets/icon_pay.png" alt="">
                <h2>支付安全<br>
                    <span>明码标价支付</span>
                </h2>
            </div>
            <div>
                <img src="../assets/icon_compensation.png" alt="">
                <h2>保险赔付<br>
                    <span>出现问题保险赔付</span>
                </h2>
            </div>
            <div>
                <img src="../assets/icon_aftersale.png" alt="">
                <h2>售后无忧<br>
                    <span>客服经理全程跟进</span>
                </h2>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped lang="less">
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
        font-weight: 400;
    }
}

.moduleBodyB {
    overflow: hidden;
    >div {
        position: relative;
        float: left;
        margin-top: 20px;
        overflow: hidden;
    }
    > :nth-child(1) div {
        position: absolute;
        top: 30px;
        left: 30px;

        h3,
        ul {
            float: left;
            color: #2693d4;

            li {
                line-height: 30px;
                padding-left: 30px;
            }
        }
        h3 {
            line-height: 90px;
            font-weight: 400;
        }
    }
    > :not(:first-child) {
        margin-left: 22px;
        >div {
            position: absolute;
            right: 40px;
            bottom: 40px;
            line-height: 30px;

            h3,
            h2 {
                font-weight: 400;
            }
            p {
                font-size: 14px;
                color: #666;
            }
            span {
                font-size: 18px;
            }
            h2 {
                color: #2693d4;
            }
        }
    }
}

.propertyFooter {
    clear: both;
    margin: 40px 0;
    background: #eee;
    height: 154px;
    width: 100%;

    >div {
        float: left;
        margin: 40px;

        img {
            vertical-align: bottom;
        }
        h2 {
            display: inline-block;
            margin-left: 20px;
            font-weight: 400;
            color: #666;
            span {
                font-size: 18px;
            }
        }
    }
}
</style>
