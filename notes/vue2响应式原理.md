# vue2响应式原理
- [vue2响应式原理](#vue2响应式原理)
  - [Observer](#observer)
  - [Dep](#dep)
  - [Watcher](#watcher)
  - [Scheduler](#scheduler)
  - [总体流程](#总体流程)

**响应式数据的最终目标**，是数据变化了会自动去运行一些函数，比如当对象本身或者对象属性发生变化，会运行一些函数，常见的就是render函数。

在具体实现上，vue用到了**几个核心部件**：

1. Observer
2. Dep
3. Watcher
4. Scheduler

## Observer

Observer要实现的目标非常简单，就是把一个普通的对象转换为响应式的对象。

为了实现这一点，Observer把对象的每个属性通过`Object.defineProperty`转换为带有`getter`和`setter`的属性，这样一来，当访问或设置属性时，`vue`就有机会做一些别的事情。

![observer.png](https://s2.loli.net/2022/03/24/1AZR2T3Jhbwqgsj.png)

Observer是vue内部的构造器，我们可以通过Vue提供的静态方法`Vue.observable( object )`间接的使用该功能。

在组件生命周期中，这件事发生在`beforeCreate`之后，`created`之前。

具体实现上，它会递归遍历对象的所有属性，以完成深度的属性转换。

由于遍历时只能遍历到对象的当前属性，因此无法监测到将来动态增加或删除的属性，因此`vue`提供了`$set`和`$delete`两个实例方法，让开发者通过这两个实例方法对已有响应式对象添加或删除属性。

对于数组的处理：vue在数组的原型链上添加了一个vue自定义的对象，使得数组的隐式原型指向这个对象，然后再指向Array.prototype。使得vue可以监听可能改变数组内容的方法。``push pop shifirt sort  splice unshift reverse``。

```js
arr.__proto__ === vue自定义对象
vue自定义对象.__proto__ === Arrary.prototype
```

![监听数组.png](https://s2.loli.net/2022/03/24/jMz1LykItim6uEA.png)

总之，Observer的目标，就是要让一个对象，它属性的读取、赋值，内部数组的变化都要能够被vue感知到。

## Dep

这里有两个问题没解决，就是读取属性时要做什么事，而属性变化时要做什么事，这个问题需要依靠Dep来解决。

Dep的含义是`Dependency`，表示依赖的意思。

`Vue`会为响应式**对象中的每个属性**、**对象本身**、**数组本身**创建一个`Dep`实例，每个`Dep`实例都有能力做以下两件事：

- 记录依赖：是谁在用我
- 派发更新：我变了，我要通知那些用到我的人

比如运行`render`函数中，读取了响应式数据，触发了`getter`函数，这时会把`render`函数记录在`dep`实例中，这些有`dep`实例的数据才可以后续进行响应式更新。但有个特殊情况，也就是给一个对象`obj`添加属性一个`a`属性时候`this.$(this.obj,"a",123)`，尽管`obj.a`没有dep实例，但是触发了`obj`的dep实例记录的render。所以Vue建议尽量不用`$set`和`$delete`方法，会影响效率。即使不用`obj.a`属性，也要先定义出来把它变成响应式数据。


当读取响应式对象的某个属性时，运行``getter``函数时，它会进行依赖收集：有人用到了我

当改变某个属性时，运行``setter``函数,它会派发更新：那些用我的人听好了，我变了

![dep.png](https://s2.loli.net/2022/03/24/CQ2g5aqGRF3MkY7.png)

## Watcher

这里又出现一个问题，就是Dep如何知道是谁在用我？

要解决这个问题，需要依靠另一个东西，就是Watcher。

当某个函数执行的过程中，用到了响应式数据，响应式数据是无法知道是哪个函数在用自己的

因此，vue通过一种巧妙的办法来解决这个问题

我们不要直接执行函数，而是把函数交给一个叫做watcher的东西去执行，watcher是一个对象，每个这样的函数执行时都应该创建一个watcher，通过watcher去执行

watcher会设置一个全局变量，让全局变量记录当前负责执行的watcher等于自己，然后再去执行函数，在函数的执行过程中，如果发生了依赖记录`dep.depend()`，那么`Dep`就会把这个全局变量记录下来，表示：有一个watcher用到了我这个属性
```js
window.currentWatcher = this 
// 接下来再执行render函数
render（） 
// render()中如果触发率getter
get（）{dep.depend()}，
//在这个函数里会检查这个全局变量，记录谁（某一个watcher）在用我。
window.currentWatcher  = null
```
`depend()`函数
```js
class Dep {
  constructor() {
      this.subs = []
  }
  // ................
  addSub(sub) {
      this.subs.push(sub)
  }
  depend() {
      if (window.currentWatcher) {
        // 把当前正在读取数据的Watcher收集到Dep中
          this.addSub(window.currentWatcher)
      }
  }
}

```

当Dep进行派发更新时，它会通知之前记录的所有watcher：我变了

![watcher.png](https://s2.loli.net/2022/03/24/v1b6ofemQKy5atP.png)

每一个`vue`组件实例，都至少对应一个`watcher`，`vm._watcher`该`watcher`中记录了该组件的`render`函数。

`watcher`首先会把`render`函数运行一次以收集依赖，于是那些在render中用到的响应式数据就会记录这个watcher。监听`render`函数的执行过程，执行过程中用到了哪些响应式数据，就把这个watcher作为依赖收集进来。

当数据变化时，dep就会通知该watcher，而watcher将重新运行render函数，从而让界面重新渲染同时重新记录当前的依赖。

## Scheduler

现在还剩下最后一个问题，就是Dep通知watcher之后，如果watcher执行重运行对应的函数，就有可能导致函数频繁运行，从而导致效率低下

试想，如果一个交给watcher的函数，它里面用到了属性a、b、c、d，那么a、b、c、d属性都会记录依赖，于是下面的代码将触发4次更新：

```js
state.a = "new data";
state.b = "new data";
state.c = "new data";
state.d = "new data";

// 上面四句代码会交给同一个watcher
```

这样显然是不合适的，因此，watcher收到派发更新的通知后，实际上不是立即执行对应函数，而是把自己交给一个叫调度器的东西

调度器维护一个执行队列，该队列同一个watcher仅会存在一次，队列中的watcher不是立即执行，它会通过一个叫做`nextTick`的工具方法，把这些需要执行的watcher放入到事件循环的微队列中，nextTick的具体做法是通过`Promise`完成的
```js
Promise.resolve().then(fn)
```

> nextTick 通过 `this.$nextTick` 暴露给开发者
>
> nextTick 的具体处理方式见：https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97

也就是说，当响应式数据变化时，`render`函数的执行是异步的，并且在微队列中
就是将watch全部添加到queue中，由第一次执行时异步挂起。同步任务执行之后，异步任务进行执行，从queue中取出循环执行。

## 总体流程

![总体流程.png](https://s2.loli.net/2022/03/24/Jf834OQeVK9GCb2.png)

首先，原始对象交给``Observer``变成一个具有``getter``和``setter``的响应式对象。当render函数执行，不是立即执行，而是交给``watcher``执行，``watcher``通过设置一个全局变量然后再去运行render函数，执行过程中用到了响应式对象里的一些属性，触发getter吧这些属性收集进来，记录了这些属性用到了``watcher``。有一天当数据发生了改变，``setter``函数会执行，通知``watcher``变化，``watcher``也不是立即执行render，不然就会重复执行很多次，而是把自己交给scheduler调度器，调度器吧``watcher``添加到队列中等待执行，会把队列的执行过程(``exexc watchers``)交给nextTick,等待同步代码执行结束后执行。重新运行watcher，重新收集依赖运行render函数，循环往复。

