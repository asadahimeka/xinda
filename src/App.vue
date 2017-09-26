<template>
  <div id="app">
    <Top></Top>
    <router-view></router-view>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Top from './components/llpublicHeader'
import Contents from './views/llContent'
import Bottom from './components/llpublicFooter'
export default {
  name: 'app',
  components: {
    Top,
    Bottom,
    Contents
  },
  watch: {
    // $route(val) {
    //   if (val) {
    //     this.$router.afterEach((to, from, next) => { window.scrollTo(0, 0); });
    //   }
    // }
  }
}
</script>

<style lang="less">
@import url("//unpkg.com/element-ui@1.4.4/lib/theme-default/index.css");

* {
  padding: 0;
  margin: 0;
  font-size: '宋体';
}

li {
  list-style-type: none;
}

.font14 {
  font-size: 14px;
}

select {
  outline: none;
}

@font-face {
  font-family: 'iconfont';
  /* project id 414122 */
  src: url('//at.alicdn.com/t/font_414122_5ktithybhjjor.eot');
  src: url('//at.alicdn.com/t/font_414122_5ktithybhjjor.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_414122_5ktithybhjjor.woff') format('woff'),
  url('//at.alicdn.com/t/font_414122_5ktithybhjjor.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_414122_5ktithybhjjor.svg#iconfont') format('svg');
}

.iconfont {
  vertical-align: middle;
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
