<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 18:13:28
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-item">
      <label>账号：</label>
      <input type="text" v-model="loginId" />
    </div>
    <div class="form-item">
      <label>密码：</label>
      <input type="password" autocomplete="new-password" v-model="loginPwd" />
    </div>
    <div class="form-item">
      <label></label>
      <button :disabled="$store.state.loginUser.loading">
        {{ $store.state.loginUser.loading ? "loading..." : "登录" }}
      </button>
    </div>
  </form>
</template>
<script>
/**
 * {
 *  loading(){
 *    return this.$store.state.loginUser.loading
 *  },
 *  user(){
 *    return this.$store.state.loginUser.user
 *  }
 * }
 *
 *  */

export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
    };
  },
  methods: {
    async handleSubmit() {
      const resp = await this.$store.dispatch("loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (resp) {
        this.$router.push("/");
      } else {
        alert("账号密码错误");
      }
    },
  },
};
</script>
<style scoped>
.form-item {
  margin: 1em auto;
  width: 300px;
  display: flex;
  align-items: center;
}
.form-item input {
  height: 26px;
  font-size: 14px;
  flex: 1 1 auto;
}
.form-item label {
  width: 70px;
}
.form-item button {
  flex: 1 1 auto;
  background: #50936c;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  height: 35px;
  font-size: 16px;
}
</style>
