<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-08 22:07:06
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <LoadingButton @click="handleClick" />
</template>

<script>
import LoadingButton from "./LoadingButton.vue";
export default {
  components: {
    LoadingButton,
  },
  methods: {
    handleClick(count, callback) {
      console.log("父组件", count);
      setTimeout(() => {
        // 处理完成
        callback("请填写账号");
      }, 3000);
    },
  },
};
</script>

<style>
body {
  text-align: center;
}
</style>
