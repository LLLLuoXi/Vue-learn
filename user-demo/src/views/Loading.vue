<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 22:54:53
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <h1>正在登录中...</h1>
</template>

<script>
export default {
  created() {
    this.unWatch = this.$watch(
      () => this.$store.getters["loginUser/status"],
      (status) => {
        console.log("状态为：", status);
        if (status !== "loading") {
          this.$router
            .push(this.$route.query.returnurl ?? "/home")
            .catch(() => {});
        }
      },
      { immediate: true }
    );
  },
  destroy() {
    this.unWatch();
  },
};
</script>

<style></style>
