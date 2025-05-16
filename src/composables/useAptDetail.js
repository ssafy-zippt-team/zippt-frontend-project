import { ref } from "vue";
import { getHouseDetail } from "../api/housesApi";

export default function useAptDetail() {
  const selectedApt = ref(null);

  // 상세 정보 로드
  async function loadDetail(overlayApt) {
    if (!overlayApt?.aptSeq) return;
    try {
      const { data } = await getHouseDetail(overlayApt.aptSeq);
      if (data.isSuccess) {
        // merge the detail result with the overlay’s price fields
        selectedApt.value = {
          ...data.result,
          // pull in the three fields you already had
          amountAvg: overlayApt.amountAvg,
          amountMax: overlayApt.amountMax,
          amountMin: overlayApt.amountMin,
        };
      }
    } catch (e) {
      console.error("apt detail load failed", e);
      selectedApt.value = null;
    }
  }

  // 패널 닫기
  function clearDetail() {
    selectedApt.value = null;
  }

  return { selectedApt, loadDetail, clearDetail };
}
