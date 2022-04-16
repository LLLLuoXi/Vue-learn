/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-16 23:27:59
 * @LastEditors: your name
 * @Description: 
 */
import Toast from "../components/Toast/test.vue"
import Vmodel from "../components/v-model/test.vue"
import TagsInput from "../components/TagsInput/test.vue"
import Carousel from "../components/Carousel/test.vue"
const routes = [
  { path: '/', component: Toast },
  { path: '/toast', component: Toast },
  { path: '/vmodel', component: Vmodel },
  { path: '/tagsInput', component: TagsInput },
  { path: '/carousel', component: Carousel },
]

export default routes