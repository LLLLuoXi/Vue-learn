/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 09:24:32
 * @LastEditors: your name
 * @Description: 
 */

// import Home from "../views/Home.vue"
// import About from "../views/About.vue"
import { getAsyncPage } from "../utils"

const Home = getAsyncPage("../views/Home.vue")
const About = getAsyncPage("../views/About.vue")

export default [
    { path: '/', component: Home },
    { path: '/about', component: About }
]