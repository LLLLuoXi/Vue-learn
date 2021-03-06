/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 10:57:51
 * @LastEditors: your name
 * @Description: 路由配置 route
 */

import Home from '../views/Home.vue' // 引入 Home页面组件

export default [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/vModel',
        name: 'vModel',
        component: () => import('../components/Vmodel/test.vue')
    },
    {
        path: '/listeners1',
        name: 'listeners',
        component: () => import('../views/listeners/one/App.vue')
    },
    {
        path: '/listeners2',
        name: 'listeners',
        component: () => import('../views/listeners/two/App.vue')
    },
    {
        path: '/shareData',
        name: 'shareData',
        component: () => import('../views/share-data/index.vue')
    }
]