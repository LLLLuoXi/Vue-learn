<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-02 22:35:28
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div>
    <!-- <Number :value="this.formData.age" @input="formData.age = $event" /> -->
    <!-- 等同于 -->
    <Number v-model="formData.age"/>
  </div>
</template>

<script>
import Number from "./index.vue";
export default {
  components: { Number },
  data() {
    return {
      formData: {
        age: 11,
      },
    };
  },
};
</script>

<style>
</style>
