<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-12 23:53:45
 * @LastEditors: your name
 * @Description: Modal Component
-->
<template>
  <teleport to="#modal">
    <div id="modal" v-if="isOpen">
      <h2><slot>this is a modal</slot></h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits:{
      'close-modal':null
  },
  setup(props,context){
      const buttonClick =()=>{
          context.emit('close-modal');
      }

      return { buttonClick}
      

  }
});
</script>

<style scoped>
#modal {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background-color: width;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
