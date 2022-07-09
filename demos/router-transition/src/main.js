/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-09 21:00:55
 * @LastEditors: your name
 * @Description: 
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
