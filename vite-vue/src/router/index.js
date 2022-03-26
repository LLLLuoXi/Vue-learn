/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-26 22:38:50
 * @LastEditors: your name
 * @Description: 
 */
import { createWebHistory, createRouter } from 'vue-router'
import routes from './route'

const history = createWebHistory()

const router = new createRouter({
  history,
  routes
})


export default router