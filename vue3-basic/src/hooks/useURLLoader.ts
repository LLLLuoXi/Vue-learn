import { ref } from 'vue';
import axios from 'axios';

function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null);
  const loading = ref(true);
  const loaded = ref(false);
  const error = ref(null);

  axios
    .get(url)
    .then((rawData) => {
      console.log('rawData', rawData);
      loading.value = false;
      loaded.value = true;
      result.value = rawData.data;
    })
    .catch((err) => {
      error.value = err;
      loading.value = false;
    });

  return {
    result,
    loading,
    loaded,
    error,
  };
}

export default useURLLoader;
