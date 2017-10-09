<template>
    <div class="setbg" :style="'width:'+bw+'px;height:'+bh+'px'">
        <div class="hello">
            <img src="../../static/images/404.gif" alt="404 NOT FOUND">
            <div class="btn">
                <button>
                    <a href="/#/">返回首页</a>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'nfd',
    data() {
        return {
            bw: window.screen.availWidth,
            bh: window.screen.availHeight,
        }
    }
}
</script>

<style lang="less">
.setbg {
    padding-top: 30px;
    padding-bottom: 30px;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}

.hello {
    width: 780px;
    margin: 0px auto;
    img {
        width: 100%;
    }
}

.btn {
    width: 115px;
    height: 40px;
    margin: -8% auto;
    button {
        width: 115px;
        height: 40px;
        border: 0;
        border-radius: 5px;
        background: #4ea9c0;
        a {
            text-decoration: none;
            color: #fff;
            font-size: .22rem;
        }
    }
}

@media screen and (max-width:768px) {
    .hello {
        width: 100%;
        height: auto;
    }
}
</style>
