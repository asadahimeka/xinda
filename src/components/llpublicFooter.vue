<template>
    <div class="footer">
        <div class="upaboutus">
            <div class="maintext">
                <div class="aboutus">
                    <div class="title">
                        关于我们
                    </div>
                    <div class="contactus">
                        联系我们：contact@xinkeher.com <br>
                        公司地址：北京市朝阳区大望路soho现代城<br>
                        官方客服电话：010-83421842
                    </div>
                </div>
                <div class="qrcode">
                    <img src="../../static/images/qrcode.png" alt="欢迎关注信达官方微信号">
                </div>
            </div>
        </div>
        <div class="bottomcopyright">
            <div class="centercopyright">
                ©Copyright 2016北京信达科技有限公司 京ICP备 16011621号
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less">
.footer {
    width: 100%;
    height: 246px;
    .upaboutus {
        width: 100%;
        height: 201px;
        background-color: #f8f8f8;
        display: flex;
        justify-content: center;
        .maintext {
            width: 1200px;
            height: 100%;
            display: flex;
            padding: 38px 24px;
            box-sizing: border-box;
            justify-content: space-between;
            .aboutus {
                width: 276px;
                height: 125px;
                font-family: '宋体';
                .title{
                    height: 15px;
                    font-size: 15px;
                    color: black;
                    line-height: 15px;
                }
                .contactus{
                    line-height: 25px;
                    padding-left: 3px;
                    font-size: 14px;
                    padding-top: 28px;
                }
            }
        }
    }
    .bottomcopyright {
        width: 100%;
        height: 45px;
        background-color: #cbcccc;
        display: flex;
        justify-content: center;
        .centercopyright{
            width: 1200px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
        }
    }
}
</style>