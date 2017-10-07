<template>
  <div id="app">
    <Top v-if="isPC()"></Top>
    <router-view></router-view>
    <Bottom v-if="isPC()"></Bottom>
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
    $route(val) {
      if (val) {
        this.$router.afterEach((to, from, next) => { window.scrollTo(0, 0); });
      }
    }
  }
}
</script>

<style lang="less">
//ElementUI
@import url("//unpkg.com/element-ui@1.4.4/lib/theme-default/index.css");
//Mint
@import url("//unpkg.com/mint-ui/lib/style.css");

.el-message {
  top: 25%;
  background: rgba(0, 0, 0, .7);
  color: #fff;
  p {
    color: #fff;
    text-align: center;
  }
  .el-message__img {
    opacity: .9;
  }
}

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
  src: url('//at.alicdn.com/t/font_414122_8w7oft2e0qjdzpvi.eot');
  src: url('//at.alicdn.com/t/font_414122_8w7oft2e0qjdzpvi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_414122_8w7oft2e0qjdzpvi.woff') format('woff'),
  url('//at.alicdn.com/t/font_414122_8w7oft2e0qjdzpvi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_414122_8w7oft2e0qjdzpvi.svg#iconfont') format('svg');
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

@media screen and (max-width:768px) {
  html:root {
    font-size: 625%;
  }
}
</style>
