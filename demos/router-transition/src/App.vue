<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-09 21:06:30
 * @LastEditors: your name
 * @Description: 
-->

<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/user">User</router-link>
    </nav>
    <transition :name="direction">
      <RouterView></RouterView>
    </transition>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$store.state);
  },
  computed: {
    direction() {
      return this.$store.state.switchDirection.direction;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.left-leave-active {
  transition: all 0.6s;
  transform: translateX(-50%);
  opacity: 0;
  position: absolute;
  width: 100%;
  left: 0;
}

.left-enter {
  transform: translateX(50%);
}

.left-enter-active {
  transition: all 0.6s;
}

.right-leave-active {
  transition: all 0.6s;
  transform: translateX(50%);
  opacity: 0;
  position: absolute;
  width: 100%;
  left: 0;
}

.right-enter {
  transform: translateX(-50%);
}

.right-enter-active {
  transition: all 0.6s;
}
</style>
