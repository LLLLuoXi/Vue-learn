/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 21:40:37
 * @LastEditors: your name
 * @Description: 
 */

import { createStore, createLogger } from "vuex";
import loginUser from './loginUser'

export default createStore({
    modules: {
        loginUser
    },
    plugins: [createLogger()],
})