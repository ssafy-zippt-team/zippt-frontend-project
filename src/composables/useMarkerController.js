// 시/구/동 선택(useAddress) → APT 리스트(fetch) → 마커 생성(makeMarker)
// 이 세 가지를 한 곳에 묶어주는 Composable
import { watch } from "vue";
import useAptListByDong from "./useAptListByDong";
import { makeMarker } from "../util/map/makeMarker";

export default function useMarkerController(kakaoMap, address) {
  const { sggCd, umdCd } = address;
  const { aptList, loadAptList } = useAptListByDong();

  // sggCd, umdCd 가 모두 유효해질 때 호출
  // 한번 호출 후 sggCd & umdCd 초기화 필요
  // 다른 시&구에 동일한 DongCd가 있어 다른시의 아파트리스트도 호출됨
  watch(
    () => [sggCd.value, umdCd.value],
    async ([newSgg, newUmd]) => {
      if (!newSgg || !newUmd) return;
      console.log("loadAptList with", newSgg, newUmd);
      await loadAptList(newSgg, newUmd);
    }
  );

  watch(aptList, (list) => {
    if (!kakaoMap.value) return;
    makeMarker({ mapInstance: kakaoMap.value, aptList: list });
  });
}
