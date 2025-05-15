import { ref } from "vue";
import { getHouseDetail } from "../api/housesApi";

export default function useAptDetail() {
  const selectedApt = ref(null);

  // aptSeq 로 상세 정보 로드
  async function loadDetail(aptSeq) {
    if (!aptSeq) return;
    try {
      const { data } = await getHouseDetail(aptSeq);
      if (data.isSuccess) {
        selectedApt.value = data.result;
      }
    } catch (e) {
      console.error("useAptDetail ▶ 조회 실패", e);
    }
  }

  // 패널 닫기
  function clearDetail() {
    selectedApt.value = null;
  }

  return { selectedApt, loadDetail, clearDetail };
}
