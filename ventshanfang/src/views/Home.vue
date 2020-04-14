<template>
  <div class="home">
    <router-view/>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/history" name="history" icon="home-o">历史</van-tabbar-item>
      <van-tabbar-item to="/collect" name="collect" icon="search">收藏</van-tabbar-item>
      <van-tabbar-item to='/mine' name="mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { Notify } from 'vant';
  export default {
    name: 'history',
    data() {
      return {
        active: 'history'
      }
    },
    methods: {

    },
  }
</script>