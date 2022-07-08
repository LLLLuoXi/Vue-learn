<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 09:40:44
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div class="container">
    <div class="block">
      <h2>区域1</h2>
      <p>
        <button @click="modalVisible = true">打开朦层</button>
      </p>
      <Teleport to="body">
        <Modal v-if="modalVisible">
          <button @click="modalVisible = false">关闭朦层</button>
        </Modal>
      </Teleport>
    </div>
    <div class="block mid">
      <h2>区域2</h2>
    </div>
    <div class="block big"><Block3 /></div>
    <div class="block big"><h2>区域4</h2></div>
    <div class="block mid">
      <h2><Block5 /></h2>
    </div>
    <div class="block"><h2>区域6</h2></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAsyncComponent } from "../utils";
import Modal from "../components/Modal.vue";

const Block3 = getAsyncComponent("../components/Block3.vue");
const Block5 = getAsyncComponent("../components/Block5.vue");

const modalVisible = ref(false);
</script>

<style scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}
.block {
  width: 200px;
  margin: 15px;
  height: 250px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mid {
  width: 300px;
}
.big {
  width: 400px;
}
</style>
