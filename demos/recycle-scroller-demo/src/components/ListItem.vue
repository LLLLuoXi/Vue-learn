<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 22:36:56
 * @LastEditors: your name
 * @Description: 
-->

<template>
  <div class="list-item">
    <span>id{{ item.id }}</span>
    <span>name{{ item.name }}</span>
    <span>age{{ item.age }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.list-item {
  text-align: center;
  height: 54px;
  padding: 1em;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
</style>
