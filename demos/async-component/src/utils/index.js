/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 09:30:35
 * @LastEditors: your name
 * @Description: 
 */

import { defineAsyncComponent, h } from "vue";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";
import "nprogress/nprogress.css"
import NProgress from "nprogress"

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50
})

export function delay(duration) {
    if (!duration) duration = random(1000, 5000)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration);
    })
}

export function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

export function getAsyncComponent(path) {
    return defineAsyncComponent({
        loader: async () => {
            await delay();
            if (Math.random() < 0.5) throw new TypeError("加载失败");
            return import(path);
        },
        // 当promise在pedding状态时，显示的组件
        loadingComponent: Loading,
        errorComponent: {
            render() {
                return h(Error, "出错了");
            },
        },
    });
}

export function getAsyncPage(path) {
    return defineAsyncComponent({
        loader: async () => {
            NProgress.start()
            await delay();
            const page = await import(path);
            NProgress.done();
            return page;
        },
        // 当promise在pedding状态时，显示的组件
        loadingComponent: Loading,
    });
}