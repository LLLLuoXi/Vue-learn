<!--
 * @Author: luoxi
 * @LastEditTime: 2022-04-16 23:39:18
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <button @click="$emit('prev')" class="carousel-controls left">Prev</button>
  <button @click="$emit('next')" class="carousel-controls right">Next</button>
</template>

<script>
export default {
  emits: ["prev", "next"],
};
</script>

<style lang="less" scoped>
.carousel-controls {
  border: none;
  background: rgba(0, 0, 0, 0.5);
  padding: 0px 3px;
  position: absolute;
  height: 50px;
  height: 70px;
  top: calc(50% - 25px);
  color: #f3f3f3;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  &.left {
    left: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  &.right {
    right: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>
