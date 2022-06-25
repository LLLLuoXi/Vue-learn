<!--
 * @Author: luoxi
 * @LastEditTime: 2022-06-26 02:21:28
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div>
    <slot name="loding" v-if="isLoading">默认加载中的效果...</slot>
    <slot name="error" v-else-if="error" :error="error">{{ error }}</slot>
    <slot name="default" v-else="content" :content="content">{{
      content
    }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    contentPromise: Promise,
  },
  data() {
    return {
      isLoading: true,
      content: null,
      error: null,
    };
  },
  async created() {
    try {
      this.content = await this.contentPromise;
      this.error = null;
    } catch (err) {
      this.error = err;
      this.content = null;
    } finally {
      this.isLoading = false;
    }
  },
  mounted() {
    console.log("this.$slots", this.$slots);
    console.log("this.$scopedSlots", this.$scopedSlots);
  },
};
</script>

<style></style>
