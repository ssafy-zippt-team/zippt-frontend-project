import { toRaw } from "vue";
import { getMapBounds } from "../util/map/getMapBounds";
import { makeMarker } from "../util/map/makeMarker";
import { getAroundHouses } from "../api/housesApi";

export default function useViewHouses(kakaoMap, { onMarkerClick, selectedDong } = {}) {
  let overlays = [];
  let isUpdating = false;

  function clearAllMarkers() {
    overlays.forEach((ov) => {
      try {
        ov.setMap(null);
      } catch (e) {
        void e;
      }
    });
    overlays = [];
  }

  async function updateMarkersByView() {
    const map = kakaoMap.value && toRaw(kakaoMap.value);
    if (!map || isUpdating) return;
    isUpdating = true;

    const level = map.getLevel();
    if (!selectedDong?.value && level >= 4) {
      clearAllMarkers();
      isUpdating = false;
      return;
    }

    clearAllMarkers();
    const { minLat, maxLat, minLng, maxLng } = getMapBounds(map);

    try {
      const { data } = await getAroundHouses(minLat, maxLat, minLng, maxLng);
      if (data.isSuccess) {
        // onClick 콜백을 넘겨줍니다
        overlays = makeMarker({
          mapInstance: map,
          aptList: data.result,
          onClick: onMarkerClick,
        });
      }
    } catch (err) {
      console.error(err);
    }

    isUpdating = false;
  }

  function bindIdle() {
    if (!kakaoMap.value) return;
    window.kakao.maps.event.addListener(kakaoMap.value, "idle", updateMarkersByView);
  }

  return { updateMarkersByView, bindIdle };
}
