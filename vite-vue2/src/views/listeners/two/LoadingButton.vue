<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-08 22:38:47
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div>
    <button @click="handleClick" :disabled="isLoading">
      {{ isLoading ? "loading" : "submit" }}
    </button>
    <div class="err">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0, // 点击的次数
      isLoading: false,
      error: "",
    };
  },
  methods: {
    async handleClick() {
      /*
       * 点击次数 +1
       * 错误消息清空
       * 为了防止重复点击，需要先将 isLoading 设置为 true
       * 通知父组件：「我被点击了」，并传递当前的点击次数
       * 等待父组件处理（有可能是异步的），将父组件处理的结果设置到 error
       */
      this.count++;
      this.error = "";
      this.isLoading = true;
      //判断父组件是否传递了事件处理函数click
      if (this.$listeners.click) {
        // const result = await this.$listeners.click(this.count);
        const err = await this.$listeners.click(this.count);
        this.isLoading = false;
        this.error = err;
      }
    },
  },
};
</script>

<style>
.err {
  color: #f40;
  font-size: 12px;
}
</style>
