<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-02 00:18:26
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div id="app">
    <div class="block" v-for="n in 100" v-if="defer(n)">
      <heavy-comp></heavy-comp>
    </div>
  </div>
</template>

<script>
import HeavyComp from "./components/HeavyComp.vue";
import defer from "./mixins/defer";
export default {
  name: "App",
  components: { HeavyComp },
  mixins: [defer(100)],
};
</script>

<style>
#app {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
}
.block {
  border: 3px solid red;
}
</style>
