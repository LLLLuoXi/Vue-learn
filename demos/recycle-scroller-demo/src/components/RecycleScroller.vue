<!--
 * @Author: luoxi
 * @LastEditTime: 2022-07-15 17:35:46
 * @LastEditors: your name
 * @Description: 
-->
<!-- 前提：高度固定 -->
<template>
  <div class="recycle-scroller-container" ref="container" @scroll="setPool">
    <div class="recycle-scroller-wrapper" :style="{ height: `${totalSize}px` }">
      <div
        class="recycle-scroller-item"
        v-for="poolItem in pool"
        :key="poolItem.item[keyField]"
        :style="{ transform: `translateY(${poolItem.position}px)` }"
      >
        <slot :item="poolItem.item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
const prev = 10;
const nextV = 10;
export default {
  props: {
    // 数据的数组
    items: {
      type: Array,
      default: () => [],
    },
    // 每条数据的高度
    itemSize: {
      type: Number,
      default: 0,
    },
    // item数组中，每个对象拿一个属性代表唯一且稳定的编号
    keyField: {
      type: String,
      default: "id",
    },
  },
  data() {
    return {
      // {item:原始数据，position:该数据对应的偏移位置}
      // 渲染池，保存当前需要渲染的数据
      pool: [],
    };
  },
  mounted() {
    this.setPool();
  },
  computed: {
    // 总高度
    totalSize() {
      return this.items.length * this.itemSize;
    },
  },
  methods: {
    setPool() {
      const scrollTop = this.$refs.container.scrollTop;
      const height = this.$refs.container.clientHeight;
      let startIndex = Math.floor(scrollTop / this.itemSize);
      // 防止出现滑动过快出现白屏，向前多渲染10个，向后多渲染十个。
      startIndex -= prev;
      if (startIndex < 0) {
        startIndex = 0;
      }
      let endIndex = Math.ceil((scrollTop + height) / this.itemSize);
      endIndex += nextV;
      const startPos = startIndex * this.itemSize;

      this.pool = this.items.slice(startIndex, endIndex).map((it, i) => ({
        item: it,
        position: startPos + i * this.itemSize,
      }));
    },
  },
};
</script>

<style>
.recycle-scroller-container {
  overflow: auto;
}
.recycle-scroller-wrapper {
  position: relative;
}
.recycle-scroller-item {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
</style>
