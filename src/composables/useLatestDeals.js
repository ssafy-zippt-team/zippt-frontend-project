// src/composables/useLatestDeals.js
import { ref, watch } from 'vue';
import axios from 'axios';

/**
 * aptSeq에 따라 최신 실거래 하나와 전체 실거래 리스트를 가져오는 훅
 * @param {import('vue').Ref<string>} aptSeqRef
 */
export default function useLatestDeals(aptSeqRef) {
  const latestDeal    = ref(null);
  const allDeals      = ref([]);
  const isLoading     = ref(false);
  const loadError     = ref(null);

  watch(
    aptSeqRef,
    async (aptSeq) => {
      if (!aptSeq) return;
      isLoading.value = true;
      loadError.value = null;
      try {
        const { data } = await axios.get('/api/v1/deals/latest-list', {
          params: { aptSeq }
        });
        if (data.isSuccess && Array.isArray(data.result)) {
          allDeals.value   = data.result;
          latestDeal.value = data.result[0] || null;
        } else {
          allDeals.value   = [];
          latestDeal.value = null;
        }
      } catch (e) {
        loadError.value = e;
        latestDeal.value = null;
        allDeals.value   = [];
      } finally {
        isLoading.value = false;
      }
    },
    { immediate: true }
  );

  return { latestDeal, allDeals, isLoading, loadError };
}
