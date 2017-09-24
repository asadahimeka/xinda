<template>
    <div>
        <div class="hello">
            <img src="../../static/images/404.gif" alt="">
        </div>
        <div class="btn">
            <button>
                <a href="/">返回首页</a>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'nfd'
}
</script>

<style lang="less" >
.publicheader,
.footer {
    display: none;
}

body {
    background: #F1F4F8;
}

.hello {
    width: 1000px;
    height: 460px;
    overflow: hidden;
    margin: 40px auto;
    img {
        width: 100%;
    }
}

.btn {
    width: 115px;
    height: 40px;
    margin: 0 auto;
    button {
        width: 115px;
        height: 40px;
        border: 0;
        border-radius: 5px;
        background: #01b39b;
        a {
            text-decoration: none;
            color: #fff;
        }
    }
}
</style>
