import { ref } from "vue";
import { getAptListByDong } from "../api/aptListApi";

export default function useAptListByDong() {
  // 1) reactive 상태
  const aptList = ref([]);

  // 2) 동 기준 APT 리스트 로드 함수
  const loadAptList = async (sggCd, umdCd) => {
    try {
      const { data } = await getAptListByDong(sggCd, umdCd);
      if (data.isSuccess) {
        aptList.value = data.result;
      } else {
        console.warn("APT 리스트 조회 실패:", data.message);
        aptList.value = [];
      }
    } catch (err) {
      console.error("APT 리스트 API 에러:", err);
      aptList.value = [];
    }
    return aptList.value;
  };

  return {
    aptList,
    loadAptList,
  };
}
