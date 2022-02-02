/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-02 21:54:15
 * @LastEditors: your name
 * @Description: 
 */
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
