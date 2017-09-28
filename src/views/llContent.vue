<template>
    <div class="content">
        <!-- 头部带logo的部分 -->
        <LineLogo></LineLogo>
        <!-- 主页中所有的导航部分，子导航直接使用position -->
        <Navigation></Navigation>
        <transition name="el-zoom-in-center">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import LineLogo from './nav/llLineLogo'
import Navigation from './nav/llNavigation'
export default {
    components: {
        LineLogo,
        Navigation
    }
}
</script>

<style lang="less">

</style>
