/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 17:02:19
 * @LastEditors: your name
 * @Description: 
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// store.dispatch("loginUser/whoAmI");
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
