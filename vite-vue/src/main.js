/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-26 23:13:55
 * @LastEditors: your name
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./styles/global.less"

createApp(App).use(router).mount('#app')
