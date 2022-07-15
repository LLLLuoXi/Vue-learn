<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-15 16:58:47
 * @LastEditors: your name
 * @Description: 
-->

<template>
  <div id="app">
    <!-- <div class="scroller">
      <ListItem v-for="item in items" :key="item.id" :item="item"></ListItem>
    </div> -->
    <RecycleScroller
      class="scroller"
      :items="items"
      :itemSize="54"
      v-slot="{ item }"
    >
      <ListItem :item="item"></ListItem>
    </RecycleScroller>
  </div>
</template>

<script>
import ListItem from "./components/ListItem.vue";
import RecycleScroller from "./components/RecycleScroller.vue";
let items = [];
for (let i = 0; i < 10000; i++) {
  items.push({
    id: i + 1,
    count: i + 1,
  });
}

export default {
  name: "App",
  components: {
    ListItem,
    RecycleScroller,
  },
  data() {
    return {
      items,
    };
  },
};
</script>

<style>
.scroller {
  width: 500px;
  height: 500px;
  margin: 100px auto;
}
</style>
