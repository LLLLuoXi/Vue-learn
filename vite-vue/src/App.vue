<!--
 * @Author: luoxi
 * @LastEditTime: 2022-04-16 23:34:10
 * @LastEditors: your name
 * @Description: 
-->


<template>
  <div class="container my-0 mx-auto h-screen">
    <div class="felx p-8 rounded-xl shadow-md">
      <router-link to="/toast" class="btn">toast</router-link>
      <router-link to="/vmodel" class="btn">vmodel</router-link>
      <router-link to="/tagsInput" class="btn">tagsInput</router-link>
      <router-link to="/carousel" class="btn">carousel</router-link>
    </div>
    <div class="view p-8 rounded-xl shadow-md">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Number from "./components/v-model/index.vue";
import Toast from "./components/Toast/index.vue";
import Carousel from "./components/Carousel/index.vue";
export default {
  components: { Number, Toast, Carousel },
  data() {
    return {
      formData: {
        age: 11,
      },
    };
  },
};
</script>

<style scoped>
</style>
