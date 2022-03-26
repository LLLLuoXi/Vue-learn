<!--
 * @Author: luoxi
 * @LastEditTime: 2022-03-26 23:15:22
 * @LastEditors: your name
 * @Description: 
-->


<template>
  <div class="app-container">
    <div class="links">
      <router-link to="/toast" class="link">toast</router-link>
      <router-link to="/vmodel" class="link">vmodel</router-link>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
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

<style lang="less" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  .link {
    display: inline-block;
    margin: 50px 10px;
    padding: 5px 12px;
    border: 1px solid;
    border-radius: 10px;
    text-align: center;
    transition: all 0.3s;
    &:hover {
      background-color: darken(#999, 10%);
    }
  }
  .view {
    margin: 50px auto;
  }
}
</style>
