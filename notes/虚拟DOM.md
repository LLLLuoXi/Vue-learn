<!--
 * @Author: luoxi
 * @LastEditTime: 2022-06-27 22:35:55
 * @LastEditors: your name
 * @Description: 虚拟dom笔记
-->

- [虚拟dom](#虚拟dom)
  - [🤔 什么是虚拟dom？](#-什么是虚拟dom)
  - [🤔 为什么需要虚拟dom？](#-为什么需要虚拟dom)
  - [🤔 虚拟dom是如何转换为真实dom的？](#-虚拟dom是如何转换为真实dom的)
  - [🤔 模板和虚拟dom的关系](#-模板和虚拟dom的关系)
<aside>
💡 对vue虚拟dom的理解
</aside>
# 虚拟dom

## 🤔 什么是虚拟dom？

虚拟dom本质上就是一个普通的JS对象，用于描述视图的界面结构
```js
VNode {tag: 'div', data: {…}, children: Array(1), text: undefined, elm: div.hello, …}
```

在vue中，每个组件都有一个``render``函数，每个``render``函数都会返回一个虚拟dom树，这也就意味着每个组件都对应一棵虚拟DOM树

<!-- ![虚拟dom树](/assets/虚拟dom树.png) -->
![虚拟dom树.png](https://s2.loli.net/2022/01/30/MGjrXx1EJAdq8OU.png)

##  🤔 为什么需要虚拟dom？

在`vue`中，渲染视图会调用``render``函数，这种渲染不仅发生在组件创建时，同时发生在**视图依赖的数据**更新时。如果在渲染时，直接使用真实``DOM``，由于真实``DOM``的创建、更新、插入等操作会带来大量的性能损耗，还可能带来页面重排重绘。从而就会极大的降低渲染效率。


  💡 真实dom和虚拟dom性能对比：
```js
var times = 10000000;
console.time(`js object`);
for (var i = 0; i < times; i++) {
  var obj = {};
}
console.timeEnd("js object"); // 100.69189453125 ms
console.time(`dom object`);
for (var i = 0; i < times; i++) {
  var obj = document.createElement("div");
}
console.timeEnd("dom object"); // 3504.902099609375 ms
```
因此，``vue``在渲染时，使用虚拟dom来替代真实dom，主要为解决渲染效率的问题。
但是在组件第一次渲染的时候，或者组件只需要渲染一次，数据变化不需要重新的渲染，``vue``的效率是更加低的，因为它比直接操作真实dom还多了一步，就是生成虚拟dom。后续就不一样了，当一些复杂的节点,比如说一个父节点里面有多个子节点,当只是一个子节点的内容发生了改变,此时``虚拟DOM+Diff``算法可以精准找到DOM树变更的地方,减少DOM的操作(重排重绘)。

## 🤔 虚拟dom是如何转换为真实dom的？

在一个组件实例首次被渲染时，它先生成虚拟dom树，然后根据虚拟dom树通过**渲染器**来创建真实dom，并把真实dom挂载到页面中合适的位置，此时，每个虚拟dom便会对应一个真实的dom。
```js
// 渲染器工作原理
function renderer(vnode, container) {
        // 使用vnode.tag作为标签名穿件DOM元素
        const el = document.createElement(vnode.tag);
        // 遍历vnode.props将属性和事件添加到DOM元素
        for (const key in vnode.props) {
          if (/^on/.test(key)) {
            el.addEventListener(
              // onClick -> onclick
              key.substr(2).toLocaleLowerCase(),
              // 事件处理函数
              vnode.props[key]
            );
          }
        }
        // 处理chilren
        if (typeof vnode.chilren === "string") {
          // 文本节点
          el.appendChild(document.createTextNode(vnode.chilren));
        } else if (Array.isArray(vnode.chilren)) {
          // 递归调用randerer渲染子节点，container是当前el
          vnode.chilren.forEach((child) => renderer(child, el));
        }
        // 挂载
        container.appendChild(el);
      }

      const vnode = {
        tag: "div",
        props: {
          onClick: () => {
            alert("hello");
          },
        },
        chilren: "click me",
      };

      renderer(vnode, document.body);
```

如果一个组件受响应式数据变化的影响，需要重新渲染时，它仍然会重新调用render函数，创建出一个新的虚拟dom树，用新树和旧树对比，通过对比，vue会找到最小更新量，然后更新必要的虚拟dom节点，最后，这些更新过的虚拟节点，会去修改它们对应的真实dom(实际上是直接使用新树，抛弃旧树，然后只更新必要的真实dom)

这样一来，就保证了对真实dom达到最小的改动。

<!-- ![虚拟dom新旧树对比](/assets/虚拟dom新旧树对比.png) -->
![虚拟dom新旧树对比.png](https://s2.loli.net/2022/01/30/CIrKFdeSTxw73Ba.png)

##  🤔 模板和虚拟dom的关系

模板本质来说就是一个字符串，模板的存在，仅仅是为了让开发人员更加方便的书写界面代码。

vue框架中有一个``compile``模块，它主要负责将模板转换为`render`函数，而``render``函数调用后将得到虚拟dom。

编译的过程分三步：

1. **解析器**将模板字符串转换成为`AST`（抽象语法树：js树形结构来描述我们原始的代码）
2. **优化器**遍历AST标记静态节点。  
      - 那些没有使用任何遍历，比如纯文本节点，就是一个静态节点，它只会在首次渲染中进行解析，后续不需要重新渲染。
      - 优化器为静态节点打上标记后，之后的重新渲染，就不需要为有标记的节点创建新的vnode，而是直接复制之前已存在的vnode，而在vnode更新节点时就不会重新渲染它。
3. **代码生成器**将``AST``转换为``render``函数
      - 代码生成器会将模板生成一个`with`函数的代码字符串，最终导出到render函数中。

```js
const code = `with(this){console.log('hello')}`
const fn = new Function(code)
fn()
```


如果使用传统的引入方式(CND)，则编译时间发生在组件第一次加载时，这称之为**运行时编译(runtime only)**。

如果是在`vue-cli`的默认配置下，编译发生在打包时，这称之为**模板预编译（pre-compile）**。
可以在`vue-cli`配置文件中修改：
```js
module.exports = {
  runtimeCompiler: false, // 默认值是false
};
```
运行``npn run build``打包的时候给你编译好，打包结果了没有template模板字符串，已经全部被转换为```render```函数。
在vue中，同时有``render( )``和``<template></template>``的时候,先认``render( )``不认``<template></template>``，而``vue cli``中会有个打包过程，把``<template></template>``生成``render( )``覆盖掉配置中的``render( )``，打包结果里只有``render( )``。
```js
<template>
  <div class="hello" :a="msg" @click="msg = 'abc'">
    {{ msg }}
  </div>
</template>

<script>
export default {
  // ...
  props: {
    msg: String,
  },
  render(h) {
    return h(
      "div",
      {
        class: "hello",
        attrs: {
          a: this.msg,
        },
        on: {
          click: () => {
            this.msg = "abc";
          },
        },
      },
      this.msg
    );
  },
// ...

};
</script>
```

编译是一个极其耗费性能的操作，预编译可以有效的提高运行时的性能，而且，由于运行的时候已不需要编译，`vue-cli`在打包时会排除掉`vue`中的`compile`模块，以减少打包体积。



**vue最终运行的时候，最终需要的是render函数，而不是模板，因此，模板中的各种语法，在虚拟dom中都是不存在的，它们都会变成虚拟dom的配置。**
