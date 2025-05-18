import { toRaw } from "vue";
import Swal from "sweetalert2"; 
import { getMapBounds } from "../util/map/getMapBounds";
import { makeMarker } from "../util/map/makeMarker";
import { getAroundHouses } from "../api/housesApi";

// export default function useViewHouses(kakaoMap, { onMarkerClick, selectedDong } = {}) {
export default function useViewHouses(kakaoMap, { onMarkerClick} = {}) {
  let overlays = [];
  let isUpdating = false;

  function clearAllMarkers() {
    overlays.forEach((ov) => {
      try { ov.setMap(null); }
      catch (e) { void e; }
    });
    overlays = [];
  }

  async function updateMarkersByView() {
    const map = kakaoMap.value && toRaw(kakaoMap.value);
    if (!map || isUpdating) return;
    isUpdating = true;

    // ★ 얼럿 띄우기
    
    try {
      const level = map.getLevel();
      
      // 동이 안 선택됐고 줌 레벨이 높으면 마커만 지우고 끝
      // if (!selectedDong?.value || level >= 4) {
      if (level >= 5) {
        clearAllMarkers();
        return;
      }
      
      Swal.fire({
        title: "로딩 중…",
        html: "잠시만 기다려주세요.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      
      clearAllMarkers();
      const { minLat, maxLat, minLng, maxLng } = getMapBounds(map);
      const { data } = await getAroundHouses(minLat, maxLat, minLng, maxLng);
      if (data.isSuccess) {
        overlays = makeMarker({
          mapInstance: map,
          aptList:     data.result,
          onClick:     onMarkerClick,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      // ★ 무조건 얼럿 닫기
      Swal.close();
      isUpdating = false;
    }
  }

  function bindIdle() {
    if (!kakaoMap.value) return;
    window.kakao.maps.event.addListener(
      kakaoMap.value,
      "idle",
      updateMarkersByView
    );
  }

  return { updateMarkersByView, bindIdle };
}

