/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 12:18:02
 * @LastEditors: your name
 * @Description: 数据仓库模块
 */
import Vuex from 'vuex';
import Vue from 'vue';

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration)
    });
}
Vue.use(Vuex)
const store = new Vuex.Store({
    // 仓库配置对象
    state: {
        count: 0,
    },
    // 数据突变 有可能发生的变化 定义成方法
    mutations: {
        increase(state) {
            state.count++;
        },
        decrease(state) {
            state.count--
        },
        //  求幂
        // payload : 负荷
        power(state, payload) {
            state.count = state.count ** payload
        }
    },
    actions: {
        async asyncIncrease(ctx) {
            await delay(1000);
            ctx.commit('increase')
        },
        async asyncDecrease(ctx) {
            await delay(1000);
            ctx.commit('decrease')
            // setTimeout(() => {
            //     ctx.commit('decrease')
            // }, 1000);
        },
        async asyncPower(ctx, payload) {
            await delay(1000);
            ctx.commit('power', payload)
            // setTimeout(() => {
            //     ctx.commit('power', payload)
            // }, 1000);
        }
    }
})

window.store = store
export default store