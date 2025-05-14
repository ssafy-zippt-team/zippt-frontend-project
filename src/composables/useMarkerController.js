// 시/구/동 선택(useAddress) → APT 리스트(fetch) → 마커 생성(makeMarker)
// 이 세 가지를 한 곳에 묶어주는 Composable
import { watch } from "vue";
import useAddress from "./useAddress";
import useAptListByDong from "./useAptListByDong";
import { makeMarker } from "../util/map/makeMarker";

export default function useMarkerController(kakaoMap) {
  const {
    selectedCity,
    selectedGu,     // sggCd
    selectedDong,   // umdCd
  } = useAddress(kakaoMap);

  const { aptList, loadAptList } = useAptListByDong();

  // 1) 동을 선택했을 때 API 호출
  watch(selectedDong, async (umdCd) => {
    if (!selectedGu.value || !umdCd) return;
    console.log("sggCD : ",selectedCity.value+selectedGu.value);
    await loadAptList(selectedCity.value+selectedGu.value, umdCd);
  });

  // 2) aptList 가 갱신되면 마커 생성
  watch(aptList, (list) => {
    if (!kakaoMap.value) return;
    makeMarker({
      mapInstance: kakaoMap.value,
      aptList:     list,
    });
  });
}


