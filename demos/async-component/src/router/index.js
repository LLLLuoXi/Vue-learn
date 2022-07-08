/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 08:46:31
 * @LastEditors: your name
 * @Description: 
 */

import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

export default createRouter({
    // mode: 'history'
    history: createWebHistory(),
    routes
})