<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-07 23:35:47
 * @LastEditors: your name
 * @Description: 
-->
<script setup>
import CheckEditor from "./components/CheckEditor.vue";
import { ref, computed } from "vue";
const tasks = ref([
  {
    id: 1,
    sell: true,
    title: "iphone12",
  },
  { id: 2, sell: false, title: "xiaomi" },
  { id: 3, sell: true, title: "huawei" },
  { id: 4, sell: true, title: "vivo" },
]);
const sells = computed(() => tasks.value.filter((it) => it.sell));
</script>

<template>
  <div class="list">
    <strong>编辑</strong>
    <div class="list">
      <CheckEditor
        v-for="item in tasks"
        :key="item.id"
        v-model="item.sell"
        v-model:title="item.title"
      />
    </div>
  </div>
  <div class="list">
    <strong>销售中:</strong>
    <div>
      <template v-for="(item, index) in sells">
        <span>{{ index + 1 }}.</span>
        <strong>{{ item.title }}</strong>
      </template>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 50px;
  width: 880px;
  margin: 50px auto;
}
.list {
  display: flex;
  margin: 1em 0;
  align-items: center;
}
strong {
  margin-right: 1em;
}
</style>
