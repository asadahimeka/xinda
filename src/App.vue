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
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  font-size: '宋体';
}

li {
  list-style-type: none;
}

select {
  outline: none;
}

@font-face {
  font-family: 'iconfont';
  /* project id 414122 */
  src: url('//at.alicdn.com/t/font_414122_40spcttfjv6de7b9.eot');
  src: url('//at.alicdn.com/t/font_414122_40spcttfjv6de7b9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_414122_40spcttfjv6de7b9.woff') format('woff'),
  url('//at.alicdn.com/t/font_414122_40spcttfjv6de7b9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_414122_40spcttfjv6de7b9.svg#iconfont') format('svg');
}
</style>
