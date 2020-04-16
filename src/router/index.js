import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/demo',
    component: () => import(/* webpackChunkName: "demo" */ '../views/Demo.vue'),
    children: [
      {
        path: '',
        name: 'DemoHome',
        component: () =>
          import(/* webpackChunkName: "demo-home" */ '../views/demo/Home.vue')
      },
      {
        path: 'body-pix',
        name: 'BodyPix',
        component: () =>
          import(/* webpackChunkName: "bodypix" */ '../views/demo/BodyPix.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
