<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 23:01:24
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="user-name">
    <span v-if="status === 'loading'">loading...</span>
    <template v-else-if="status === 'login'">
      <RouterLink to="/user">{{user.name}}</RouterLink>
      <a href="" @click.prevent="handleLoginOut">退出</a>
    </template>

    <RouterLink to="/login" v="else" exact-path>Login</RouterLink>
  </div>
</template>

<script>
import { mapGetters ,mapState} from "vuex";
export default {
  computed:{
    ...mapGetters("loginUser",["status"]),
    ...mapState("loginUser",["user"])

  },
  methods: {
    async handleLoginOut(){
      await this.$store.dispatch("loginUser/loginOut");
      this.$router.push("/login")
    }
  }
};
</script>

<style scoped>
.user-name {
  display: inline-block;
}
.user-name a,
.user-name span {
  margin-right: 15px;
}
</style>
