<template>
  <div id="app">
    <Top v-if="isPC"></Top>
    <transition name="slide" mode="out-in" v-if="!isPC">
      <router-view></router-view>
    </transition>
    <transition name="el-zoom-in-center" mode="out-in" v-else>
      <router-view></router-view>
    </transition>
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
    Contents,
  },
  data() {
    return {
      load: true
    }
  },
  watch: {
    $route(val) {
      if (val) {
        this.$router.afterEach((to, from, next) => { window.scrollTo(0, 0); });
      }
    }
  },
  mounted() {
    this.$nextTick(function() { setTimeout(() => document.getElementById("loading").style.display = 'none', 0); });
  },
}
</script>

<style lang="less">
//ElementUI
// @import url("//unpkg.com/element-ui@1.4.4/lib/theme-default/index.css");
@import url("https://cdn.bootcss.com/element-ui/1.4.6/theme-default/index.css");
//Mint
// @import url("//unpkg.com/mint-ui/lib/style.css");
@import url("https://cdn.bootcss.com/mint-ui/2.2.9/style.min.css");

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

.clearfix {
  *zoom: 1;
}

.clearfix:before,
.clearfix:after {
  display: table;
  line-height: 0;
  content: "";
}

.clearfix:after {
  clear: both;
}

.mint-indicator-wrapper {
  width: 1rem;
  height: 1rem;
  z-index: 1;
}

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

.mint-spinner-snake {
  position: absolute;
  top: 30%;
  left: 30%;
}

.slide-enter-active {
  transition: all .4s ease-in-out;
  transform: translate3d(0, 0, 0);
}

.slide-enter {
  transform: translate3d(-100%, 0, 0);
}

.slide-leave-active {
  transition: all .4s ease-in-out;
  transform: translate3d(-100%, 0, 0);
}

.slide-leave {
  transform: translate3d(0, 0, 0);
}

@font-face {
  font-family: 'iconfont';  /* project id 414122 */
  src: url('//at.alicdn.com/t/font_414122_dwhp87s2ckutyb9.eot');
  src: url('//at.alicdn.com/t/font_414122_dwhp87s2ckutyb9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_414122_dwhp87s2ckutyb9.woff') format('woff'),
  url('//at.alicdn.com/t/font_414122_dwhp87s2ckutyb9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_414122_dwhp87s2ckutyb9.svg#iconfont') format('svg');
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

[v-cloak] {
  display: none;
}

@media screen and (max-width:767px) {
  html:root {
    font-size: 625%;
  }
  .mobileBG {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: #f2f2f2;
    z-index: -1;
  }
}
</style>
