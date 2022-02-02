<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-02 22:31:40
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div>
    <button type="button" @click="handleClick(value + 1)">+</button>
    <span>{{ value }}</span>
    <button type="button" @click="handleClick(value - 1)">-</button>
  </div>
</template>

<script>
export default {
  name: "Number",
  props: ["value"],
  methods: {
    handleClick(newValue) {
        // this.value = newValue //属性不可改变
        this.$emit('input',newValue)
    },
  },
};
</script>

<style>
</style>
