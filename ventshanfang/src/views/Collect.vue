<template>
  <div class="collect">
    <van-nav-bar title="闪防云" />
    <van-swipe-cell v-for="(item,index) in dataList" :key="index">
      <van-cell :border="true" :title="item" />
      <template #right>
        <van-button square type="primary" text="连接" @click="$router.push({path:'/connect',query:{name:item}})"/>
        <van-button square type="danger" text="删除" @click="del" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
  // import { Notify } from 'vant';
  export default {
    name: 'collect',
    data() {
      return {
        dataList: ['sfc://www.baidu.com', 'sfc://www.baidu1.com', 'sfc://www.baidu2.com'],
      }
    },
    methods: {
      del() {
       this.$dialog.confirm({
          message: '确认删除？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
      },
    },
  }
</script>