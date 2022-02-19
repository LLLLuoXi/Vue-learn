<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 12:16:40
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="block">
    <p>the number is</p>
    <h1>{{ $store.state.count }}</h1>
    <p>
      <button @click="handleDecrease">减少</button>
      <button @click="handleAsyncIncrease">异步增加</button>
    </p>
  </div>
</template>

<script>
export default {
  created() {
    console.log("this.$store.states.count ", this.$store.state.count);
  },
  methods: {
    handleDecrease() {
      this.$store.commit("decrease");
    },
    handleAsyncIncrease() {
      // this.$store.dispatch("asyncIncrease");
      this.$store.dispatch("asyncIncrease").then(() => console.log("完成"));
    },
  },
};
</script>
