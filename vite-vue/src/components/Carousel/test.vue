<!--
 * @Author: luoxi
 * @LastEditTime: 2022-04-16 23:26:55
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="app-container">
    <Carousel :slides="slides" controls indicators />
  </div>
</template>
<script>
import Carousel from "./index.vue";
export default {
  data: () => ({
    slides: [
      "https://picsum.photos/id/1000/900/400",
      "https://picsum.photos/id/1001/900/400",
      "https://picsum.photos/id/1002/900/400",
      "https://picsum.photos/id/1003/900/400",
    ],
  }),
  components: { Carousel },
};
</script>

<style></style>