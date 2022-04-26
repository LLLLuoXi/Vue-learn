<!--
 * @Author: luoxi
 * @LastEditTime: 2022-04-26 22:44:25
 * @LastEditors: your name
 * @Description: 
-->
- [🏗️ 创建vue实例流程](#️-创建vue实例流程)
- [🔃 重渲染流程](#-重渲染流程)

new Vue之后，发生的流程，以及数据改变之后发生的流程。

## 🏗️ 创建vue实例流程
创建vue实例和创建组件的流程基本一致。
1. 首先做一些初始化的操作，主要是设置一些私有属性到实例中，比如以`_` `$`开头的变量。
2. **运行生命周期函数`beforeCreate`。**
3. 进入到注入流程：处理属性、`computed`,`methods`、`data`,`provide`,`inject`,最后使用代理挂载到实例中。
伪代码：
```js
function Vue(options) {
  var data = options.data()
  // 变成响应式数据,对象会递归处理，数组的话要改变它的原型链
  observe(data)
  // 实现 this.a 把属性挂载到实例中
  Object.defineProperty(this, 'a', {
    get() {
      return data.a
    },
    set(val) {
      data.a = val
    }
  })
  // 对computed也做类似的处理，属性挂载到_props,也是响应式对象，
  // 对method的处理 是method 指向this
  var methods = options.method
  Object.entries(methods).forEach(([methodName, fn]) => {
    this[methodName] = fn.bind(this)
  })
}
```
4. **运行生命周期勾子函数``created``**
5. 生成``render``函数：如果有配置，直接使用配置的``render``，如果没有，就使用运行时编译器，把模板编译成``render``。
6.  **运行生命周期勾子函数``beforeMount``**
7.  进入渲染流程。创建一个``watcher``,传入一个函数``updateComponent``,该函数会运行``render``，把得到的vnode在传入``_update``函数执行。
    - 在执行``render``函数的过程中，会收集所有依赖，将来依赖变化的时候会重新运行``updateComponent``函数
    - 在执行``_update``函数的过程中，会触发patch函数进行新旧两棵树对比，``_vnode = vnode``获得新的虚拟节点，由于目前没有旧树，所以直接为当前的虚拟dom树的每一个普通节点生成``elm``属性，就是真实dom。
    - 如果遇到创建一个组件的vnode,则会进入到组件实例化流程，和创建vue实例流程基本相同，最终会把创建好的组件实例挂载到vnode的``componentInstance``属性中，将来复用。

```js
function Vue(options) {
  // other code...
  var updateComponent = () => {
    // 执行_update过程中，触发patch函数
    this._update(this._render())
  }
  new Wathcer(updateComponent)
}
```
8.  **运行生命周期钩子函数``mounted``**。

比如App组件中有A组件，A组件里有B组件。
监听他们所有的生命周期函数，首次渲染的结果会是这样：
```js
vue实例 beforeCreate
vue实例 created
vue实例 beforeMount
App beforeCreate
App created
App beforeMount
A beforeCreate
A created
A beforeMount
B beforeCreate
B created
B beforeMount
B mounted
A mounted
App mounted
vue实例 mounted
```
当vue实例走到``beforeMount``阶段渲染App的时候，会在``updateComponent``中等待，进入App组件的实例话，进入App的生命周期，等App以及子组件的生命周期走完，才完成自身的渲染流程。


## 🔃 重渲染流程
1. 数据变化后，所有依赖数据的``Watcher``会重新运行，这里仅仅考虑``updateComponent``的``Watcher``。
2. 为了避免多个依赖数据同事发生改变后背多次执行，``Watcher``会被调度器放到``nextTick``中运行，也就是微队列中，
3. **运行生命周期钩子函数``beforeUpdate``**。
4. ``updateComponent``函数重新执行。
   - 运行``render``函数的过程中，会去掉之前的依赖，重新收集所有依赖，将来依赖变化的时候会重新运行``updateComponent``，
   - 在执行``_update``中，触发``patch``函数，新旧两棵树进行对比，以尽量最小量的更新原则处理，普通的html节点的对比会导致真实节点被创建、删除、移动、更新，组件的节点的对比导致组件被创建、删除、移动、更新。
   - 当新组建需要创建时，进入组件实例化流程。
   - 当旧组件需要删除时，会调用旧组件的``$destroy``删除组件，首先会触发**生命周期钩子函数``beforeDestory``**,然后递归调用子组件的``$destroy``，然后触发自身的**生命周期钩子函数``destoryed``**,
   - 当组件属性更新时，相当于组件的``updateComponent``重新运行，重新进入重渲染流程。

5. 运行**生命周期钩子函数``updated``**。

比如App组件通过``props``把``count``传给A组件，A组件又把``count``传给B组件，B组件在组件内用到这个``count``，当``count``变化时。
监听他们所有的生命周期函数，重渲染的结果会是这样：
```js
App beforeUpdate
A beforeUpdate
B beforeUpdate
B updated
A updated
App updated
```

App组件通过``v-if``把A组件和B组件都隐藏时
监听他们所有的生命周期函数，重渲染的结果会是这样：
```js
App beforeUpdate
A beforeDestroy
B beforeDestroy
B destroyed
A destroyed
App updated
```
[图解](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)


