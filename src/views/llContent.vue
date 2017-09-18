<template>
    <div class="content">
        <!-- 头部带logo的部分 -->
        <LineLogo></LineLogo>
        <!-- 主页中所有的导航部分，子导航直接使用position -->
        <Navigation></Navigation>
        <router-view></router-view>
    </div>
</template>

<script>
import LineLogo from './llLineLogo'
import Navigation from './llNavigation'
export default {
    components: {
        LineLogo,
        Navigation
    }
}
</script>

<style lang="less">

</style>
