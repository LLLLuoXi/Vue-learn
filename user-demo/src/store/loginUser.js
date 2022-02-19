/*
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 18:14:59
 * @LastEditors: your name
 * @Description: module loginUser
 */
import * as userApi from '../api/user'
export default {
    // 开启命名空间 commit(模块名字/mutations)
    namespaced: true,
    state: {
        loading: false,
        user: null,
        test:1
    },
    getters: {
        status(state) {
            if (state.loading) {
                return "loading"
            } else if (state.user) {
                return "login"
            } else {
                return "unlogin"
            }
        }
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        async login(ctx, payload) {
            //    ctx.commit("loginUser/setLoading",true);
            ctx.commit("setLoading", true);
            const resp = await userApi.login(payload.loginId, payload.loginPwd)
            ctx.commit("setUser", resp)
            ctx.commit("setLoading", false);
            return resp;
        },
        async whoAmI(ctx) {
            ctx.commit("setLoading", true);
            const resp = await userApi.whoAmI()
            ctx.commit("setUser", resp)
            ctx.commit("setLoading", false);
        },
        async loginOut(ctx) {
            ctx.commit("setLoading", true);
            await userApi.loginOut()
            ctx.commit("setUser", null)
            ctx.commit("setLoading", false);
        },
    },
}