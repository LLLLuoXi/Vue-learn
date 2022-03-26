/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-26 23:06:33
 * @LastEditors: your name
 * @Description: 
 */
import Toast from "../components/Toast/test.vue"
import Vmodel from "../components/v-model/test.vue"
const routes = [
  { path: '/', component: Toast },
  { path: '/toast', component: Toast },
  { path: '/vmodel', component: Vmodel }
]

export default routes