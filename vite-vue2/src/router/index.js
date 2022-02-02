/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-02 22:40:10
 * @LastEditors: your name
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 注册路由插件
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

export default router