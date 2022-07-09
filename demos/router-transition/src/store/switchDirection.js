/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-09 21:24:49
 * @LastEditors: your name
 * @Description: 
 */

export default {
    namespaced: true,
    state: {
        direction: 'left'
    },
    mutations: {
        setDirection(state, payload) {
            state.direction = payload
        }
    }
}