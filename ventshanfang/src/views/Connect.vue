<template>
  <div class="connect">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div style="padding:0 10px;">
      <h2 style="margin-bottom:0px;">闪防云</h2>
    </div>
    <div style="padding:0 10px;">
      <van-row>
        <van-col span="20">
          <span>{{label}}</span>
        </van-col>
        <van-col span="4" style="text-align:right;" @click="changeLike">
          <van-icon v-if="!like" name="like-o" />
          <van-icon v-else name="like" color="red" />
        </van-col>
      </van-row>
    </div>
    <div id="divfather">
      <div class="mydiv" @click="isOpen()">
        <img :src="linkImg" alt="">
        <img v-if="runBody" :src="arcImg" alt="" :style="{transform: left_transform}">
        <div style="text-align:center">{{msg}}</div>
      </div>
    </div>

    <div>

    </div>



  </div>
</template>

<script>
  import unlink from "../assets/unlink.png";
  import linked from "../assets/linked.png";
  import linking from "../assets/closearc.png"
  import unlinking from "../assets/openarc.png"
  import { delay } from '../facade'
  export default {
    name: 'connect',
    data() {
      return {
        label: '',
        like: false,
        rate: 30,
        currentRate: 0,
        left_transform: "",
        right_transform: "",
        circleBar_bg: "#fff",
        linkImg: unlink,
        arcImg: linking,
        isActive: "disconnected",
        percentValue: 0,
        runBody: false,
        msg: '点击连接'
      }
    },

    created() {
      this.label = this.$route.query.name ? `线路:${this.$route.query.name}` : ''
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      changeLike() {
        this.like = !this.like
        if (this.like) {
          this.$toast({
            message: '已收藏',
            icon: 'like-o',
            duration: 50000
          });
        } else {
          this.$toast({
            message: '已取消收藏',
          });
        }
      },
      connet() {
        if (this.rate < 100) {
          this.timer = setInterval(() => {
            this.rate += 10
          }, 100)
        }
      },
      async isOpen() {
        this.runBody = true;
        if (this.isActive == "disconnected") {
          this.msg = "连接中..."
          this.timer = setInterval(() => {
            this.percentValue = this.percentValue + 10;
            this.left_transform =
              "rotate(" + this.percentValue * 3.6 + "deg)";
          }, 100);
          await delay(2000);
          this.isActive = 'connected';
          clearInterval(this.timer);
          this.msg = "已连接"
          this.runBody = false;
          this.arcImg = unlinking;
          this.linkImg = linked;
        } else if (this.isActive == "connected") {
          this.msg = "断开中..."
          this.timer = setInterval(() => {
            this.percentValue = this.percentValue + 10;
            this.background_right = this.circleBar_bg;
            this.left_transform = "rotate(" + this.percentValue * 3.6 + "deg)";
          }, 100);
          await delay(2000);
          this.isActive = 'disconnected';
          clearInterval(this.timer);
          this.msg = "未连接"
          this.runBody = false;
          this.arcImg = linking;
          this.linkImg = unlink;
        }
      },


    },
  }
</script>
<style scoped>
  #divfather {
    /* margin-top: 50px;
    width: 100%; */
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  /*所有的后代都水平垂直居中，这样就是同心圆了*/
  .mydiv {
    margin: 0 auto;
    position: relative;
    height: 224px;
    width: 224px;
  }

  .mydiv img {
    position: absolute;
    ;
  }

  .mydiv div {
    position: absolute;
    bottom: 39px;
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }
</style>