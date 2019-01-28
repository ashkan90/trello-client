import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate').then(() => {
          next('/boards');
        }).catch(() => {
          next('/login');
        });
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "view-[request]" */ './views/Signup.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "view-[request]" */ './views/Login.vue'),
    },
    {
      path: '/boards',
      name: 'boards',
      component: () => import(/* webpackChunkName: "view-[request]" */ './views/Boards.vue'),
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate').then(() => {
          next();
        }).catch(() => {
          next('/login');
        });
      },
    },
  ],
});
