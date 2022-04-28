<!--
 * @Author: luoxi
 * @LastEditTime: 2022-04-28 21:53:56
 * @LastEditors: your name
 * @Description: 
-->
# mvc模式模拟vue核心库视图绑定和更新渲染
  ## mvc
  - model 做了数据管理 init做了对数据的劫持监听，当你get、 set的时候干什么。在set的时候render view
- view中做了模板保存组织模板 render逻辑 没传更改数据的时候 初始化，替换双括号的字符串，append到el中，如果有跟更新数据，只更改对应节点的textContent
- controller 事件触发管理
  
## 缺陷
横向切割可以，把关注点分离。但横向切割不行。驱动不明显，分散到各个层里，并不能成为为一个驱动管理的集合。