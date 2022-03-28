/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-28 19:09:20
 * @LastEditors: your name
 * @Description: 
 */
import Toast from "../components/Toast/test.vue"
import Vmodel from "../components/v-model/test.vue"
import TagsInput from "../components/TagsInput/test.vue"
const routes = [
  { path: '/', component: Toast },
  { path: '/toast', component: Toast },
  { path: '/vmodel', component: Vmodel },
  { path: '/tagsInput', component: TagsInput },
]

export default routes