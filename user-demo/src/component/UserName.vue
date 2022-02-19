<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 18:02:26
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="user-name">
    <span>loading...</span>
    <template>
      <!-- <router-link>user </router-link> -->
      <RouterLink to="/user">user</RouterLink>
      <a href="">退出</a>
    </template>

    <!-- <router-link>Login</router-link> -->
    <RouterLink to="/login">Login</RouterLink>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.user-name {
  display: inline-block;
}
.user-name a,
.user-name span {
  margin-right: 15px;
}
</style>
