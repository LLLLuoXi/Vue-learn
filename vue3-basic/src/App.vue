<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-12 23:53:09
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <h1 v-if="loading">Loading...</h1>
  <img :src="result.message" v-if="loaded" />
  <modal :isOpen="modalIsOpen" @close-modal="onModalClose">dwdwwdwd</modal>
  <button @click="openModal">Open modal</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { watch } from "@vue/runtime-core";
import useURLLoader from "./hooks/useURLLoader";
import modal from "./components/modal.vue";
interface DogResult {
  message: string;
  status: string;
}
export default defineComponent({
  components: { modal },
  name: "App",
  setup() {
    const { result, loading, loaded } = useURLLoader<DogResult>(
      "https://dog.ceo/api/breeds/image/random"
    );
    watch(result, () => {
      if (result.value) {
        console.log("value:", result.value.message);
      }
    });

    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };

    return { result, loading, loaded, modalIsOpen, openModal, onModalClose };
  },
});
</script>
<style></style>
