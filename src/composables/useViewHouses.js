// import { toRaw, ref }        from "vue";
// import { getMapBounds } from "../util/map/getMapBounds";
// import { makeMarker }   from "../util/map/makeMarker";
// import { getAroundHouses } from "../api/housesApi";

// export default function useViewHouses(kakaoMap) {
//   const markersRef = ref([]);
//   // let markers    = [];
//   let isUpdating = false;

//   // function clearAllMarkers() {
//   //   markers.forEach((m) => {
//   //     try {
//   //       m.setMap(null);
//   //     } catch (e) {
//   //       void e; // ESLint no-empty 회피
//   //     }
//   //   });
//   //   markers = [];
//   // }
//   function clearAllMarkers() {
//     markersRef.value.forEach((ov) => {
//       try {
//         ov.setMap(null);
//       } catch (e) { void e; }
//     });
//     markersRef.value = [];
//   }

//   async function updateMarkersByView() {
//     // Proxy 대신 원본 객체를 꺼내서 사용
//     const map = kakaoMap.value && toRaw(kakaoMap.value);
//     if (!map || isUpdating) return;
//     isUpdating = true;

//     const level = map.getLevel();
//     if (level >= 6) {
//       clearAllMarkers();
//       isUpdating = false;
//       return;
//     }

//     clearAllMarkers();
//     const { minLat, maxLat, minLng, maxLng } = getMapBounds(map);

//     try {
//       // 분리된 함수 호출
//       const { data } = await getAroundHouses(
//         minLat, maxLat, minLng, maxLng
//       );
//       if (data.isSuccess) {
//         // markers = makeMarker({
//         //   mapInstance: map,
//         //   aptList:     data.result,
//         // });
//         markersRef.value = makeMarker({
//           mapInstance: map,
//           aptList:     data.result,
//         });
//       }
//     } catch (err) {
//       console.error("useViewHouses ▶ API 에러", err);
//     }

//     isUpdating = false;
//   }

// function bindIdle() {
//     if (!kakaoMap.value) return;
//     window.kakao.maps.event.addListener(
//       kakaoMap.value,
//       "idle",
//       updateMarkersByView
//     );
//   }

//   return {
//     markersRef,
//     updateMarkersByView,
//     bindIdle,
//   };
// }

// src/composables/useViewHouses.js
import { toRaw }        from "vue";
import { getMapBounds } from "../util/map/getMapBounds";
import { makeMarker }   from "../util/map/makeMarker";
import { getAroundHouses } from "../api/housesApi";

export default function useViewHouses(kakaoMap, { onMarkerClick } = {}) {
  let overlays = [];
  let isUpdating = false;

  function clearAllMarkers() {
    overlays.forEach(ov => {
      try { ov.setMap(null); } catch (e) { void e; }
    });
    overlays = [];
  }

  async function updateMarkersByView() {
    const map = kakaoMap.value && toRaw(kakaoMap.value);
    if (!map || isUpdating) return;
    isUpdating = true;

    const level = map.getLevel();
    if (level >= 6) {
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
          aptList:     data.result,
          onClick:     onMarkerClick,
        });
      }
    } catch (err) {
      console.error(err);
    }

    isUpdating = false;
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
