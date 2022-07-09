/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-09 21:57:56
 * @LastEditors: your name
 * @Description: 
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/Layout.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/user/Profile.vue'),
      },
      {
        path: 'friend', // /user/friend
        name: 'friend',
        component: () => import(/* webpackChunkName: "friend" */ '../views/user/Friends.vue'),
      },
    ],
    meta: {
      index: 3
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫

router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.matched.length && from.matched.length) {
    const fromIndex = from.matched[0].meta.index;
    const toIndex = to.matched[0].meta.index;
    const direction = fromIndex > toIndex ? 'right' : 'left';
    store.commit("switchDirection/setDirection", direction)
  }
  next();
})

export default router
