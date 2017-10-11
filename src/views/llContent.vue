<template>
    <div class="content">
        <!-- 头部带logo的部分 -->
        <LineLogo v-if="isPC"></LineLogo>
        <!-- 主页中所有的导航部分，子导航直接使用position -->
        <Navigation v-if="isPC"></Navigation>
        <transition name="slide" mode="out-in" v-if="!isPC">
            <router-view></router-view>
        </transition>
        <transition name="el-zoom-in-center" mode="out-in" v-else>
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
