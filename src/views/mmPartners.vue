<template>
    <div class="partners container">
        <div class="moduleTitle">
            <h3>知识产权</h3>
        </div>
        <div class="moduleBody">
            <a href="javascript:;"><img src="../../static/images/partner_03.gif" alt=""></a>
            <a href="javascript:;"><img src="../../static/images/partner_05.jpg" alt=""></a>
            <a href="javascript:;"><img src="../../static/images/partner_08.gif" alt=""></a>
            <a href="javascript:;"><img src="../../static/images/partner_10.gif" alt=""></a>
            <a href="javascript:;"><img src="../../static/images/partner_12.gif" alt=""></a>
            <a href="javascript:;"><img src="../../static/images/partner_14.gif" alt=""></a>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less">
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
    .moduleBody {
        
        a {
            display: inline-block;
            border: 1px solid #ccc;
            border-left: none;
            width: 200px;
            height: 145px;
            display: table-cell; 
            vertical-align: middle;
            text-align: center;
        }
        & > :first-child {
            border-left: 1px solid #ccc;
        }
    }

</style>
