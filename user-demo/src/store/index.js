/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 18:14:39
 * @LastEditors: your name
 * @Description: store
 */
import Vuex from "vuex";
import Vue from "vue";
import counter from "./counter"
import loginUser from "./loginUser"
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    counter,
    loginUser
  },
  strict: true, // 开启严格模式后，只允许通过mutation改变状态
});

// 方便测试
window.store = store;

export default store;
