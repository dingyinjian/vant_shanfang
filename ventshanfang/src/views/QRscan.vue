<template>
  <div class="container">
    <van-nav-bar title="二维码" left-arrow @click-left="pageBack()" @click-right="getimage">
      <template #right>
        <van-icon name="photo-o" size="18" />
      </template>
    </van-nav-bar>
    <div class="tent">
      <div class="code-bg">
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>
<script>
  // import { QRScanner } from '@ionic-native/qr-scanner';
  // import { Panel, Icon } from "vant";
  // import { toast } from "../facade"
  // import { Buffer } from 'buffer/';
  import jsqr from "jsqr";
  import jimp from 'jimp';
  export default {
    data() {
      return {
        imgSrc: ''
      };
    },
    created() {
      window.QRScanner.destroy();
      window.QRScanner.prepare(this.search)
    },
    beforeRouteLeave(to, from, next) {
      window.QRScanner.hide();
      window.QRScanner.destroy();
      next()
    },
    methods: {
      getimage() {
        window.navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: window.Camera.DestinationType.DATA_URL,
          sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY
        });

        function onSuccess(imageData) {
          console.log(imageData)
          const img = Uint8ClampedArray.from(atob(imageData))
          console.log(img);
          // const decodedData = Buffer.from(imageData,'base64');
          // console.log(decodedData)
          // jimp.read(decodedData, function (err,img) {
          //   if(err){
          //     console.log(err);
          //     return;
          //   }
          //   console.log(img.bitmap)
          //   const data = jsqr(Uint8ClampedArray.from(img.bitmap.data),img.bitmap.width,img.bitmap.height);
          //   console.log(data);
          // })
        }
        // function onSuccess(imageUrl) {
        //   console.log(imageUrl)
        // }
        function onFail(message) {
          alert('失败: ' + message);
        }
      },

      async test(url) {
        const img = await jimp.read(url);
        console.log(111)
        console.log(img)
        const code = jsqr(img.bitmap.data, img.bitmap.width, img.bitmap.height)
        console.log(222)
        console.log(code)
      },

      //扫描二维码
      search(err, status) {
        if (err) {
          console.log('调用二维码扫描插件失败', err)
        }
        if (status.authorized) {
          window.QRScanner.show(() => {
            window.QRScanner.scan((err, contents) => {
              if (err) {
                this.$toast(err);
              } else {
                this.$toast(contents)
                window.QRScanner.hide();
                window.QRScanner.destroy();
                this.$router.go(-1);
              }
            });
          });
        } else if (status.denied) {
          this.nativeService.alert('没有权限', null, '没有摄像头权限，请前往设置中开启', () => {
            window.QRScanner.openSettings();
          });
        } else {
          this.nativeService.alert('没有权限', null, '没有摄像头权限，请前往设置中开启', () => {
            window.QRScanner.openSettings();
          });
        }
      },

      //打开相册
      openPhoto() {
        window.ImagePicker.getPictures(results => {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
          }
        }, error => {
          console.log('Error: ' + error);
        }, {
          maximumImagesCount: 10,
          width: 800
        });
      },
      //页面返回
      pageBack() {
        console.log('1111');
        window.QRScanner.hide();
        window.QRScanner.destroy();
        this.$router.go(-1);
      }
    }

  };
</script>
<style>
  /* #app{
    background-color:#000;
} */
</style>
<style scoped>
  .app {
    background-color: transparent;
  }

  .container {
    /* border: solid rgba(0, 0, 0, 0.5); */
    width: 100%;
    height: 100%;
  }

  .tent {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 5px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .code-bg {

    position: relative;

    height: 225px;
    width: 225px;

    margin: 0px auto;
    /*此处为了居中*/

    text-align: center;

    background: url(../assets/bg.png) center top no-repeat;

  }

  .code-bg img {

    position: absolute;

    top: 10px;
    left: 20px;

    z-index: 1;

    height: 160px;
    width: 160px;

  }

  .line {

    position: absolute;

    top: 5px;
    left: 0px;

    z-index: 2;

    height: 3px;
    width: 100%;

    background: url(../assets/line.png) no-repeat;

    /*动画效果*/

    animation: myScan 2s infinite alternate;

    -webkit-animation: myScan 2s infinite alternate;

  }

  @keyframes myScan {
    from {
      top: 0px;
    }

    to {
      top: 2250px;
    }
  }

  @-webkit-keyframes myScan {
    from {
      top: 0px;
    }

    to {
      top: 220px;
    }
  }
</style>