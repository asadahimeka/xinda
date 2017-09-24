<template>
    <div class="setbg">
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
    name: 'nfd',
    data() {
        return {

        }
    },
    created() {
        setTimeout(() => {
            this.mmp();
        }, 0);
    },
    methods: {
        mmp: function() {
            var bw = window.screen.availWidth,
                bh = window.screen.availHeight,
                box = document.querySelector('.setbg');
            box.style.width = bw + 'px';
            box.style.height = bh + 'px';
        }
    }
}
</script>

<style lang="less">
// .publicheader,
// .footer {
//     display: none;
// }
.setbg {
    padding-top: 80px;
    padding-bottom: 30px;
    background: #F1F4F8;
    position: fixed;
    top: 0;
    left: 0;
}

.hello {
    width: 1000px;
    height: 460px;
    overflow: hidden;
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
