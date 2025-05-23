import { ref } from "vue";
import { getCommercialStats } from "@/api/commercialApi";

export default function useCommercial() {
  const stats = ref({});
  const isLoading = ref(false);
  const error = ref(null);

  async function loadStats({ cx, cy, radius = 1000 }) {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await getCommercialStats({ cx, cy, radius });
      if (data.isSuccess && data.result && data.result.categoryCountMap) {
        stats.value = data.result.categoryCountMap;
      } else {
        stats.value = {};
      }
    } catch (err) {
      error.value = err;
      stats.value = {};
    } finally {
      isLoading.value = false;
    }
  }

  return {
    stats,
    isLoading,
    error,
    loadStats,
  };
}
