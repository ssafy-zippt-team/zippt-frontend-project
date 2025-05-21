import { ref } from "vue";
import { getLatestList } from "@/api/dealsApi";

export default function useLatestDeals() {
  const dealsList = ref([]);
  const loadError = ref("");
  const currentPage = ref(1);
  const pageSize = ref(10);
  const isLastPage = ref(false);

  // aptSeq와 (선택) page를 넘겨서 불러옵니
  async function loadLatest(aptSeq, page = 1) {
    console.log("loadLatest aptSeq : ", aptSeq);
    if (!aptSeq) {
      dealsList.value = [];
      return;
    }
    try {
      const { data } = await getLatestList(aptSeq, page, pageSize.value);
      console.log("loadLatest data : ", data);
      if (Array.isArray(data.dtoList)) {
        dealsList.value = data.dtoList;
        console.log("loadLatest dealsList : ", dealsList.value);
        currentPage.value = data.pageRequestDTO?.page || page;
        isLastPage.value = data.dtoList.length < pageSize.value;
      } else {
        dealsList.value = [];
        isLastPage.value = true;
      }
    } catch (e) {
      loadError.value = e.message || String(e);
      dealsList.value = [];
      isLastPage.value = true;
    }
  }

  function nextPage(aptSeq) {
    if (!isLastPage.value) {
      loadLatest(aptSeq, currentPage.value + 1);
    }
  }

  function prevPage(aptSeq) {
    if (currentPage.value > 1) {
      loadLatest(aptSeq, currentPage.value - 1);
    }
  }

  return {
    dealsList,
    loadError,
    currentPage,
    isLastPage,
    loadLatest,
    nextPage,
    prevPage,
  };
}
