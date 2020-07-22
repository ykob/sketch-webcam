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
        path: 'fireball',
        name: 'Fireball',
        component: () =>
          import(
            /* webpackChunkName: "fireball" */ '../views/demo/Fireball.vue'
          ),
        meta: {
          description:
            'You can use a spell "Fireball" by bringing your palms close together.'
        }
      },
      {
        path: 'glasses',
        name: 'Glasses',
        component: () =>
          import(/* webpackChunkName: "glasses" */ '../views/demo/Glasses.vue'),
        meta: {
          description:
            'You can use a spell "Fireball" by bringing your palms close together.'
        }
      },
      {
        path: 'body-pix',
        name: 'BodyPix',
        component: () =>
          import(/* webpackChunkName: "bodypix" */ '../views/demo/BodyPix.vue'),
        meta: {
          description:
            'You can use a spell "Fireball" by bringing your palms close together.'
        }
      },
      {
        path: 'facemesh',
        name: 'Facemesh',
        component: () =>
          import(
            /* webpackChunkName: "facemesh" */ '../views/demo/Facemesh.vue'
          ),
        meta: {
          description:
            'You can use a spell "Fireball" by bringing your palms close together.'
        }
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
