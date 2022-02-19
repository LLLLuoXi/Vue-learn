/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 11:31:52
 * @LastEditors: your name
 * @Description: 
 */
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
