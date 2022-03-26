<!--
 * @Author: luoxi
 * @LastEditTime: 2022-03-26 22:51:38
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="app-container">
    <div class="btns-area">
      <button @click="openSuccess">show toast</button>
      <button @click="openError">show toast</button>
      <button @click="openWarning">show toast</button>
    </div>
    <Toast
      :message="toast.message"
      :show="showToast"
      @hide="showToast = false"
      :type="toast.type"
      :position="toast.position"
    />
  </div>
</template>
<script>
import Toast from "./index.vue";
export default {
  data() {
    return {
      showToast: false,
      toast: {
        message: "message has been sent",
        type: "success",
        position: "top-left",
      },
    };
  },
  methods: {
    openSuccess() {
      this.showToast = true;
      this.toast.message = "message has been sent";
      this.toast.type = "success";
      this.toast.position = "top-left";
    },
    openError() {
      this.showToast = true;
      this.toast.message = "found error";
      this.toast.type = "error";
      this.toast.position = "top-right";
    },
    openWarning() {
      this.showToast = true;
      this.toast.message = "Warning";
      this.toast.type = "warning";
      this.toast.position = "bottom-right";
    },
  },

  components: { Toast },
};
</script>

<style scoped lang="less">
.app-container {
  .btns-area {
    text-align: center;
    width: 80%;
    margin: 0 auto;
  }
}
</style>
