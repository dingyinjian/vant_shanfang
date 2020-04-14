<template>
  <div class="history">
    <div class="top">
      <van-nav-bar title="闪防云" right-text="拨号" @click-right="show=true;" />

    </div>

    <van-dialog v-model="show" title="拨号方式" show-cancel-button cancelButtonColor='red' :showConfirmButton='false'>
      <van-list>
        <van-cell title="手动拨号" icon="records" @click="show=false;manual=true" />
        <van-cell title="扫码拨号" icon="scan" @click="$router.push({path:'/qrscan'})" />
      </van-list>
    </van-dialog>
    <div class="qrcode-scan-div">
      <!-- <div class="text">对准二维码到框内即可扫描</div> -->
      <div class="arrow"></div>
      <div class="line"></div>
      <div class="lighting" ng-click="lighting()">
        <i class="icon" ng-class="{'ion-ios-lightbulb':isLighting,'ion-ios-lightbulb-outline':!isLighting}"></i>
      </div>
    </div>
    <van-dialog v-model="manual" title="手动拨号" show-cancel-button cancelButtonColor='red' :before-close="beforeClose">
      <van-list>
        <van-field v-model="pathUrl" placeholder="请输入地址" />
      </van-list>
    </van-dialog>
    <div class="footer">
      <van-swipe-cell v-for="(item,index) in dataList" :key="index">
        <van-cell :border="true" :title="item" />
        <template #right>
          <van-button square type="primary" text="连接" @click="$router.push({path:'/connect',query:{name:item}})" />
          <van-button square type="info" text="收藏" @click="collect" />
          <van-button square type="danger" text="删除" @click="del" />
        </template>
      </van-swipe-cell>
    </div>

  </div>
</template>

<script>
  // import { Notify } from 'vant';
  export default {
    name: 'history',
    data() {
      return {
        active: 'history',
        dataList: ['sfc://www.baidu.com', 'sfc://www.baidu1.com', 'sfc://www.baidu2.com'],
        show: false,
        manual: false,
        pathUrl: ''
      }
    },
    methods: {
      onClickRight() {},
      collect() {
        console.log('收藏')
      },
      del() {
        this.$dialog.confirm({
          message: '确认删除？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          console.log(this.pathUrl)
          done();
        } else {
          done();
        }
      },

    },
  }
</script>
<style scoped>
  .footer {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-bottom);
    padding-bottom: constant(safe-area-inset-bottom);
    /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom);
  }

  .top {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-bottom);
    padding-bottom: constant(safe-area-inset-bottom);
    /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>