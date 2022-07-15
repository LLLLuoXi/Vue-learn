<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-15 18:03:42
 * @LastEditors: your name
 * @Description: 
-->
# recycle-scroller-demo
RecycleScroller 是一个只呈现可见项目的虚拟滚动条。当用户滚动时，RecycleScroller 会重用所有组件和 DOM 节点以保持最佳性能。

## 总体思路
- 只显示可看见的部分。监听滚动条的变化，当滚动条变化的时候重新设置可视的区域。
- `scoller`固定高度且有滚动条。
- `recycle-scroller-wrapper` 是相对定位，其里面的子项设置绝对定位，但`recycle-scroller-wrapper`是未知的。取决于传进来的子项。所以前提是`item`子项的高度固定。
- 截取原始数据生成渲染池`pool`。记录需要渲染数据的信息。`{item:原始数据，position:该数据对应的偏移位置}`
- 计算出每个子项的位置，也就是相对顶部的偏移量。`(i * this.itemSize)`
- 根据滚动高度计算需要截取数据的开始索引和结束索引,可知上面有哪些不可见的元素，隐藏了多少，开始索引就是多少。其需要向下取整。结束索引通过滑动的高度加上容器的高度除以子项的高度即可，需要向上取整。
- 子项的偏移量需要确定开始索引的偏移量就可以了。开始索引乘以item的高度
- 滑动太快的话，会出现白板。需要多显示一些数据。渲染时间和脚本执行时间变少了。


## 参考实现
- 🎭 [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
