/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-09 21:20:18
 * @LastEditors: your name
 * @Description: 
 */

import Vue from 'vue'
import Vuex from 'vuex';
import switchDirection from './switchDirection'

Vue.use(Vuex)

const store = new Vuex.Store({
    namespaced: true,
    modules: {
        switchDirection
    }
})

export default store;