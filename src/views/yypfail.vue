<template>
    <div class="res">
        <div>首页/
            <span>支付</span>
        </div>
        <div class="tpc money-color">支付失败</div>
        <div class="resdtl">
            <div class="smile"></div>
            <div class="dtl">
                <h1>支付失败&nbsp;!</h1>
                <h2>支付未成功：让我们再试一次吧！
                    <a :href="'#/pay?bno='+bno">返回支付页</a>
                </h2>
                <p>如有问题，请联系客服：
                    <b>010-83421842</b>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'payfail',
    data() {
        return { bno: '' }
    },
    created() {
        this.ajax.post(
            '/xinda-api/sso/login-info'
        ).then(res => {
            if (res.data.status == 0) {
                this.$message({ type: "warning", message: '请先登录！', duration: 2000 });
                this.$router.push('/Logon');
            } else {
                window.scrollTo(0, 0);
                this.bno = this.$route.query.bno;
            }
        }).catch(res => {
            console.log('Axios: ', res);
        });
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
        background: url("../assets/sad.svg") no-repeat;
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
        a {
            display: inline-block;
            width: 123px;
            height: 35px;
            line-height: 35px;
            margin-left: 10px;
            border: 1px solid @mcolor;
            border-radius: 5px;
            color: @mcolor;
            font-size: 16px;
            text-align: center;
            vertical-align: middle;
            text-decoration: none;
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
