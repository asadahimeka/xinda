<template>
    <div class="res">
        <div>首页/
            <span>支付</span>
        </div>
        <div class="tpc money-color">支付成功</div>
        <div class="resdtl">
            <div class="smile"></div>
            <div class="dtl">
                <h1>支付成功&nbsp;!</h1>
                <h2>我们将尽快确认您的（订单号：{{bno}}）付款信息。</h2>
                <p>如有问题，请联系客服：
                    <b>010-83421842</b>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'paysucs',
    data() {
        return { bno: '' }
    },
    created() {
        window.scrollTo(0, 0);
        this.bno = this.$route.query.bno;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@gwidth: 1200px;
@mcolor: #2693d4;
@borclr: #b6b6b6;
@bgclr: #f7f7f7;

body {
    margin: 0;
}

.res {
    width: @gwidth;
    margin: 0 auto;
    padding-top: 20px;
    font-size: 14px;
    .resdtl {
        height: 230px;
        background: @bgclr;
        margin-top: 10px;
        margin-bottom: 200px;
        padding: 120px 190px;
    }
    .smile {
        float: left;
        width: 150px;
        height: 150px;
        margin-right: 75px;
        background: url("../assets/smile.svg") no-repeat;
    }
    .dtl {
        h1 {
            font-weight: 500;
            color: @mcolor;
        }
        h2 {
            font-weight: 500;
        }
        p {
            font-size: 16px;
            b {
                font-size: 28px;
                font-weight: 500;
            }
        }
    }
}

.tpc {
    height: 40px;
    margin-top: 10px;
    line-height: 40px;
    border-bottom: 1px solid @borclr;
}

.money-color {
    color: @mcolor;
}
</style>
