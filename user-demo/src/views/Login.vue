<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 23:00:13
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
      <button :disabled="loading">
        {{ loading ? "loading..." : "登录" }}
      </button>
    </div>
  </form>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      loginId: "",
      loginPwd: "",
    };
  },
  computed: {
    // ...mapState({
    //   loading: (state) => state.loginUser.loading,
    // }),
    ...mapState("loginUser", ["loading"]),
  },
  methods: {
    async handleSubmit() {
      const resp = await this.$store.dispatch("loginUser/login", {
        loginId: this.loginId,
        loginPwd: this.loginPwd,
      });
      if (resp) {
        const path = this.$route.query.returnurl || "/";
        this.$router.push(path);
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
