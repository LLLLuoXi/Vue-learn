<!--
 * @Author: luoxi
 * @LastEditTime: 2022-04-22 22:21:10
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/vModel">vModel</router-link> |
      <router-link to="/listeners1">listeners1</router-link>|
      <router-link to="/listeners2">listeners2</router-link>|
      <router-link to="/shareData">share-data</router-link>
    </nav>
    <testA @click="handleClick" />
    <router-view />
  </div>
</template>
<script>
import testA from "./components/testA.vue";
export default {
  components: { testA },
  methods: {
    handleClick() {
      console.log("xxxxx");
    },
  },
};
</script>

