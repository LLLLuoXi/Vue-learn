<!--
 * @Author: luoxi
 * @LastEditTime: 2022-06-26 02:25:34
 * @LastEditors: your name
 * @Description: 
-->
- [scoped-slots-demo](#scoped-slots-demo)
  - [🍊 原理](#-原理)
  - [🍋 `this.$slots`和 `this.$scopedSlots`](#-thisslots和-thisscopedslots)
# scoped-slots-demo

## 🍊 原理
父组件 `App.vue`
```js
<template>
  <div id="app">
   <template v-slot:default="datas">
        <ul>
          <li v-for="item in datas.content" :key="item.id">
            商品名:{{ item.name }} 库存:{{ item.stock }}
          </li>
        </ul>
    </template>
  </div>
</template>
```
子组件 `AsyncContent.vue`
```js
<template>
  <div>
    <slot name="loding" v-if="isLoading">默认加载中的效果...</slot>
    <slot name="error" v-else-if="error" v-bind:error="error">{{ error }}</slot>
    <slot name="default" v-else="content" v-bind:content="content">{{
      content
    }}</slot>
  </div>
</template>

<script>
export default {
  // ...
  data() {
    return {
      isLoading: true,
      content: null,
      error: null,
    };
  },
  // ....
};
</script>

```

作用域插槽不是直接生成的，而是作为一个函数调用，上面的代码相当于把`<template v-slot:default="datas"> </template>`里的代码变成一个函数。

```js
default:function(datas){
// 返回vnode
}
```
这个default函数会传到子组件，子组件会调用这个`default()`函数，得到vnode进行渲染，同时把一个对象`{}`传过去，也就是`default({content:content})`。
本质是个函数，所以可以对参数进行结构。
父组件 `App.vue`
```js
<template>
  <div id="app">
   <template v-slot:default="{content}">
        <ul>
          <li v-for="item in content" :key="item.id">
            商品名:{{ item.name }} 库存:{{ item.stock }}
          </li>
        </ul>
    </template>
  </div>
</template>
```
当然`v-bind`可以缩写为`：`，所以自组件`AsyncContent.vue`可以改为：

```js
<template>
  <div>
    <slot name="loding" v-if="isLoading">默认加载中的效果...</slot>
    <slot name="error" v-else-if="error" :error="error">{{ error }}</slot>
    <slot name="default" v-else="content" :content="content">{{
      content
    }}</slot>
  </div>
</template>

<script>
export default {
  // ...
  data() {
    return {
      isLoading: true,
      content: null,
      error: null,
    };
  },
  // ....
};
</script>

```
最终详细代码可以看
- [App.vue](./src/App.vue) 
- [AsyncContent.vue](./src//components/AsyncContent.vue)  

## 🍋 `this.$slots`和 `this.$scopedSlots`

- `this.$slots`记录的是普通插槽，记录了普通插槽返回的vnode数组。
- `this.$scopedSlots`记录的是所有的插槽，可以把所有的插槽都理解为作用域插槽，每个插槽是一个函数，调用的结果就是一个vnode的数组。