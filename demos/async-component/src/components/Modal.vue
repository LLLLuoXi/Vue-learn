<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 09:33:45
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="modal">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
}
</style>
