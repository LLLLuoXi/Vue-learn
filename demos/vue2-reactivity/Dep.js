/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-16 20:51:45
 * @LastEditors: your name
 * @Description: 
 */

// Dep
function Dep() {
    // 元素不可重复
    this.subscribes = new Set();
}

Dep.prototype.depend = function () {
    if (activeUpdate) {
        // 将其记录到依赖数组中
        this.subscribes.add(activeUpdate)
    }
}

Dep.prototype.notify = function () {
    this.subscribes.forEach(fn => fn())
}

// 当前正在收集厉害的函数
let activeUpdate = null

/**
 * 自动运行指定的函数
 * @param {*} fn 
 */
function autorun(fn) {
    function updateWrapper() {
        activeUpdate = updateWrapper
        // fn运行期间activeUpdate 一定有值
        fn()
        activeUpdate = null
    }
    updateWrapper()
}


module.exports = { Dep, autorun }