<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-02 00:01:46
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="item-container">
    <div class="item" v-for="n in 5000"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.item-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item {
  width: 5px;
  height: 3px;
  background: #ccc;
  margin: 0.1em;
}
</style>
