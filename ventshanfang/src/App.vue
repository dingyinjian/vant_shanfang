<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-bottom); */
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); 
}

.van-nav-bar__left, .van-nav-bar__right{
  top: 20px;
}
.van-nav-bar{
    padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  height: 50px!important;
  line-height: 50px!important;
  background-color: #1989fa!important;
}
.van-nav-bar__title{
  color: #ffffff!important;
}
.van-nav-bar .van-icon{
  color:#ffffff!important;
}
.van-nav-bar__text{
  color: #ffffff!important;
}

</style>
