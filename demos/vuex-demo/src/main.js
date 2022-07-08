/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 21:56:37
 * @LastEditors: your name
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')

store.dispatch("loginUser/whoAmI");