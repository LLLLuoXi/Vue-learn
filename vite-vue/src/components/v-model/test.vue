<!--
 * @Author: luoxi
 * @LastEditTime: 2022-03-26 23:07:24
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div>
    <Number :value="this.formData.age" />
    <!-- sdwdwdwdw -->
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
