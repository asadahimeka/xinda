<template>
    <div>
        <div class="hello">
            <img src="../../static/images/404.gif" alt="">
            <div class="btn">
                <button>
                    <a href="/">返回首页</a>
                </button>
            </div>
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
    background: #fff;
}

.hello {
    width: 780px;
    height: 580px;
    margin: 0 auto;
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
        }
    }
}

@media screen and (max-width:768px) {
    .hello{
        width: 100%;
        height: auto;
    }
}
</style>
