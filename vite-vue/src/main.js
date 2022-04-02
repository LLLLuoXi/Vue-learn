/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-31 22:44:17
 * @LastEditors: your name
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import "./styles/global.less"
import "./styles/tailwind.css"

createApp(App).use(router).mount('#app')
