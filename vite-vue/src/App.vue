<!--
 * @Author: luoxi
 * @LastEditTime: 2022-03-24 21:40:37
 * @LastEditors: your name
 * @Description: 
-->


<template>
  <!-- <Number :value="this.formData.age" /> -->
  <Toast />
</template>
<script>
import Number from "./components/v-model/index.vue";
import Toast from "./components/Toast/index.vue";
export default {
  components: { Number, Toast },
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
