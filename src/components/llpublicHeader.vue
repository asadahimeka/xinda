<template>
    <div class="publicheader">
        <div class="headerframe">
            <div class="header">
                <div class="headerleft">
                    <div class="wel">欢迎来到信达！</div>
                    <a href="/#/Logon" class="login">{{msg}}</a>
                    <a href="" class="register">快速注册</a>
                </div>
                <div class="headerright">
                    <div class="cart">
                        <i class="iconcart">&#xe604;</i>
                       
                        <!-- 点击下面的a标签进入购物车 -->
                        <!-- <i class="iconcart icon-cart"></i> -->
                        <p>购物车<a href="">0</a>件</p>
                        <!-- 代码格式化的时候这里👆的代码要重新删成一行，不然会换行 -->
                    </div>
                    <a href="">服务商入口</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '登录'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

a {
    text-decoration: none;
    color: #2693d4;
}

.headerframe {
    width: 100%;
    height: 35px;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    .header {
        width: 1200px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        .headerleft {
            width: 214px;
            height: 35px;
            display: flex;
            justify-content: space-between;
            &>div,
            &>a {
                height: 35px;
                display: flex;
                align-items: center;
                font-size: 14px;
            }
            &>div {
                color: #2a2a2a;
            }
        }
        .headerright {
            width: 175px;
            height: 35px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            .cart {
                width: 90px;
                height: 35px;
                display: flex;
                align-items: center;
                .iconcart {
                    font-family: "iconfont" !important;
                    font-size: 17px;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-stroke-width: 0.2px;
                    -moz-osx-font-smoothing: grayscale;
                    margin-right: 2px;
                }
            }
        }
    }
}

//下面是手机端的页面样式
@media screen and (max-width:1200px) {}
</style>
