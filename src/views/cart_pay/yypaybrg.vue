<template>
    <div class="bri">
        <img src="../../assets/images/loading.gif" alt="">
    </div>
</template>

<script>
export default {
    name: 'paybrg',
    created() {
        !this.$isPC ? this.$router.push('/') : 0;
        document.write(sessionStorage.getItem('payuri'));
    }
}
</script>

<style lang="less">
body {
    background: #fff;
}

.bri {
    width: 800px;
    height: 600px;
    margin: 0 auto;
    img {
        width: 100%;
    }
}
</style>
