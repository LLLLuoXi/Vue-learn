<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-13 23:41:02
 * @LastEditors: your name
 * @Description: 
-->
# eventBus
- 提供监听某个事件的接口
- 提供取消监听的接口
- 触发事件的接口（可以传递数据）
- 触发事件后会自动通知监听者
  
![eventBus.png](https://s2.loli.net/2022/02/13/rMz7qm3nIADZc5b.png)
- 首先一个组件或者一个普通的js模块触发了一个事件（event1），就可以往事件总线上去扔一个事件，并传入相关的数据（data）.之后数据总线会把数据（data）传给所有的监听者，并让监听者运行它们各自的方法。

实现代码：
```js
const listeners = {}
export default {
    // 监听一个事件
    $on(eventName, handler) {
        if (!listeners[eventName]) {
            listeners[eventName] = new Set()
        }
        listeners[eventName].add(handler)
    },
    // 取消监听
    $off(eventName, handler) {
        if (!listeners[eventName]) {
            return
        }
        listeners[eventName].delete(handler)
    },
    // 触发事件
    $emit(eventName, ...args) {
        if (!listeners[eventName]) {
            return
        }
        for (const handler of listeners[eventName]) {
            handler(...args)
        }
    }
}
```
vue中vue实例或者组件实例内置了实例成员`$on`、`$off`和`$emit`，可以直接导出实例应用
```js
import Vue from 'vue'
const app = new Vue({})
```