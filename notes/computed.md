<!--
 * @Author: luoxi
 * @LastEditTime: 2022-06-30 21:36:18
 * @LastEditors: your name
 * @Description: 
-->

# computed

## 🔓 对methods的处理
循环比遍历`methods`里的每一个属性，把方法放到vue实例中，用`bind`方法把`this`绑定为当前组件实例后复制其引用到组件实例。
```js
function Vue(options) { 
  var methods = options.method
  Object.entries(methods).forEach(([methodName, fn]) => {
  this[methodName] = fn.bind(this)
})
```

## 🔒 对computed的处理
时机：当组件触发生命周期函数`beforeCreate`后，对computed进行处理。
- 遍历配置中的`computed`的属性，为每一个属性创建一个`watcher`对象，并传入`computed`配置中的`getter`函数，`getter`函数执行过程中会收集依赖。
  ```js
  // 计算属性的Watcher
  this._computedWatchers:{
    fullName:Watcher {vm:Vue,deep:false,lazy:true,dirty:true,value:undefined,......}
  }
   // render函数的Watcher
   this._watcher:{
    lazy:false,
    dirty:false,
  }
  ```
  
 
- 但和`render`函数不一样的是，为计算属性创建的`Watcher`不会立即执行，因为考虑到计算属性是否会被渲染函数使用，如果没有使用，就不会立即执行。因此，在创建`Watcher`的时候，使用了`lazy:true`,可以让`Watcher`不会立即执行。
- 使用了`lazy:true`之后, `Watcher`内部保存这`value`和`dirty`来实现缓存。
    - `value`:保存`Watcher`运行的结果，受`lazy`的影响，最开始时为`undefined`。
    - `dirty`:指示当前的`value`是否已经过时，也就是是否是脏值，受`lazy`的影响，最开始时为`true`。
模板上没用到计算属性没执行的时候
  ```js
  // 计算属性的Watcher
  this._computedWatchers:{
    fullName:Watcher {lazy:true,dirty:true,value:undefined,......}
  }
  ```
- `Watcher`创建好后，会使用代理模式，将计算属性挂载到组件实例上。
- 当读取计算属性时，vue会检查其对象的`Watcher`是否是脏值，如果是，则运行函数，计算依赖，并得到对应的值，保存在`Watcher`的`value`中，**然后设置dirty为false**，然后返回。如果dirty为false，则直接返回watcher的value
- 巧妙的是，在依赖收集时，**被依赖的数据不仅会收集到计算属性的Watcher，还会收集到组件的Watcher**。
- 当计算属性的依赖数据变化时，会先触发计算属性的Watcher执行，此时，它**只需设置dirty为true**即可，不做任何处理。但由于依赖的数据之前也被组件的Watcher收集到了，所以会导致组件重新渲染，而重新渲染又出发了计算属性的getter方法，此时`dirty为true`，因此计算属性会重新运行`getter进行运算`。
```js
// 计算属性 fullName
Object.defineProperty(vm,"fullName",{
    get(){
        // 运行watcher
        if(watcher.dirty){
            // ....
        }
    }
})
```

而对于计算属性的`setter`，当设置计算属性时，直接运行`setter`即可。