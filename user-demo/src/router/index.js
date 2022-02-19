/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 16:48:41
 * @LastEditors: your name
 * @Description: 
 */
import VueRouter from "vue-router";
import routes from "./routes";
import Vue from "vue";
import store from "../store";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
