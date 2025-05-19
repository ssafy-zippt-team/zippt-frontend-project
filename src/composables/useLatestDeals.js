// import { ref, watch } from "vue";
// import { getLatestList } from "@/api/dealsApi";

// export default function useLatestDeals(aptSeqRef) {
//   const dealsList = ref([]);
//   const loadError = ref("");

//   // aptSeqRef 가 바뀔 때마다 API 호출
//   watch(
//     aptSeqRef,
//     async (newSeq) => {
//       if (!newSeq) {
//         dealsList.value = [];
//         return;
//       }
//       try {
//         console.log("aptSeqRef : ", aptSeqRef);
//         // ① 반드시 await
//         const { data } = await getLatestList(newSeq);
//         if (data.isSuccess && Array.isArray(data.result)) {
//           dealsList.value = data.result;
//         } else {
//           dealsList.value = [];
//         }
//       } catch (e) {
//         loadError.value = e.message || String(e);
//         dealsList.value = [];
//       }
//     },
//     { immediate: true } // 마운트 시에도 즉시 호출
//   );

//   return { dealsList, loadError };
// }

// src/composables/useLatestDeals.js
import { ref } from "vue";
import { getLatestList } from "@/api/dealsApi";

export default function useLatestDeals() {
  const dealsList = ref([]);
  const loadError = ref("");

  // 💥 async load 함수 직접 노출
  async function loadLatest(aptSeq) {
    if (!aptSeq) {
      dealsList.value = [];
      return;
    }
    try {
      const { data } = await getLatestList(aptSeq);
      dealsList.value = data.isSuccess && Array.isArray(data.result) ? data.result : [];
    } catch (e) {
      loadError.value = e.message || String(e);
      dealsList.value = [];
    }
  }

  return { dealsList, loadError, loadLatest };
}
