import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error);
};

export const router = new VueRouter({
  // mode:'hash',
  base: process.env.BASE_URL,
  routes:[
    {path:'/',name:'home',component:()=>import('../views/Home.vue'),
    redirect:'/history',
    children:[
      {path:'/history',name:'history',component:()=>import('../views/History.vue')},
      {path:'/collect',name:'collect',component:()=>import('../views/Collect.vue')},
      {path:'/mine',name:'mine',component:()=>import('../views/Mine.vue')},
      {path:'/connect',name:'connect',component:()=>import('../views/Connect.vue')},
      {path:'/qrscan',name:'qrscan',component:()=>import('../views/QRscan.vue')},
    ]
  },
    
  ]
})


