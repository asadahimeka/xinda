<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;


}
a {text-decoration:none}
h1,h2,h3,h4,h5,h6,ul,li,p,a,img { margin:0; padding:0;}
ul, li {
  list-style: none;
}
.font14 {
  font-size: 14px;
}
// 图标
@font-face {
  font-family: 'iconfont';  /* project id 419014 */
  src: url('//at.alicdn.com/t/font_419014_225l6xg8tvnuq5mi.eot');
  src: url('//at.alicdn.com/t/font_419014_225l6xg8tvnuq5mi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_419014_225l6xg8tvnuq5mi.woff') format('woff'),
  url('//at.alicdn.com/t/font_419014_225l6xg8tvnuq5mi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_419014_225l6xg8tvnuq5mi.svg#iconfont') format('svg');
}
.iconfont{
  vertical-align: middle;
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

</style>
