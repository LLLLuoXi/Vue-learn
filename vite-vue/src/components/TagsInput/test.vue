<!--
 * @Author: luoxi
 * @LastEditTime: 2022-03-28 19:11:02
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <TagsInput :selectedTags="jsFrameworks" />
</template>

<script>
import TagsInput from "./index.vue";
export default {
  components: {
    TagsInput,
  },
  data: () => ({
    jsFrameworks: ["vue", "react", "angular", "svelte"],
  }),
};
</script>

<style>
</style>