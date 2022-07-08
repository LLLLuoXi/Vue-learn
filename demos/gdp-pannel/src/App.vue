<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 18:11:43
 * @LastEditors: your name
 * @Description: 
-->
<script setup>
import { ref } from "vue";
import data from "./api/gdp.json";
import Bar1 from "./components/Bar1.vue";
import Bar2 from "./components/Bar2.vue";
const gdp = ref([]);
gdp.value = data;
// gdp.value = await fetch("/api/gdp.json").then((resp) => resp.json());
</script>

<template>
  <h1>GDP PANNEL</h1>
  <div class="container">
    <Bar1 :gdp="gdp" />
    <Bar2 :gdp="gdp" />
  </div>
  <div class="controls">
    <div class="item" v-for="item in gdp" :key="item.country">
      <label>{{ item.country }}</label>
      <input type="number" step="0.001" min="0" v-model="item.value" />
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.controls {
  margin: 1em;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.item {
  margin: 1em;
}
.item label {
  margin: 0 1em;
}
.item input {
  height: 26px;
  font-size: 14px;
}
h1 {
  text-align: center;
}
</style>
