/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-16 20:55:05
 * @LastEditors: your name
 * @Description: 
 */

const { Dep } = require('./Dep')
/**
 * 判断一个值是否是一个普通对象
 * @param {*} obj 
 */
function isObject(val) {
    return val !== null && !Array.isArray(val) && typeof val === 'object';
}

const observer = function (obj) {
    if (!isObject(obj)) {
        return;
    }

    Object.keys(obj).forEach(key => {
        let dep = new Dep();
        let internalValue = obj[key];
        observer(internalValue);
        Object.defineProperty(obj, key, {
            get() {
                // console.log(`get ${key}:${internalValue}`)
                dep.depend() // 看一下是哪个函数用到了我这个数据，将函数记录下来
                return internalValue;
            },
            set(val) {
                observer(val);
                internalValue = val;
                // console.log(`set ${key}:${val}`)
                dep.notify(); // 通知所有用到我这个属性的函数，全部重新运行。

            }
        })
    })
}

module.exports.observer = observer;