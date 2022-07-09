<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-09 22:04:54
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="user">
    <h1>This is an user page</h1>
    <div class="main">
      <nav>
        <router-link exact to="/user">profile</router-link> |
        <router-link to="/user/friend">friends</router-link>
      </nav>
      <div class="view">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
nav {
  float: left;
}
.main {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
nav {
  border-right: 1px dashed;
}

.view {
  margin-left: 300px;
}
</style>
