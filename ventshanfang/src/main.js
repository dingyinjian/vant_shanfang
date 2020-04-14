import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Dialog } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);

Vue.config.productionTip = false
Vue.use(Dialog);
Vue.use(Vant);

/* eslint-disable no-new */
// document.addEventListener('deviceready', function () {
//   new Vue({
//     el: '#app',
//     router,
//     components: { App },
//     template: '<App/>'
//   })
//   window.navigator.splashscreen.hide()
// }, false)
document.addEventListener("deviceready",function(){
  new Vue({
    router,
    render: function (h) { return h(App) }
  }).$mount('#app')
}, false);

// new Vue({
//   router,
//   render: function (h) { return h(App) }
// }).$mount('#app')
