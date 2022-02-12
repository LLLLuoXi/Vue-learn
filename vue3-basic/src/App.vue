<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-12 22:46:52
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <h1 v-if="loading">Loading...</h1>
  <img :src="result.message" v-if="loaded" />
</template>

<script lang="ts">
import { defineComponent} from "vue";
import { watch } from '@vue/runtime-core';
import useURLLoader from './hooks/useURLLoader';
interface DogResult {
  message: string;
  status: string;
}
export default defineComponent({
  name: 'App',
  setup() {
    const { result, loading, loaded } = useURLLoader<DogResult>(
      'https://dog.ceo/api/breeds/image/random'
    );
    watch(result, () => {
      if (result.value) {
        console.log('value:', result.value.message);
      }
    });

    return { result, loading, loaded };
  },
})
</script>
<style></style>
