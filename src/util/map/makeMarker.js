import { toRaw } from "vue";

let overlays = [];

/**
 * 이전 오버레이 모두 제거
 */
export function clearMarkers() {
  overlays.forEach((ov) => {
    try {
      ov.setMap(null);
    } catch (e) {
      void e;
    }
  });
  overlays = [];
}

/**
 * @param {{ mapInstance: kakao.maps.Map, aptList: Array, onClick?: (apt)=>void }} options
 */
export function makeMarker({ mapInstance, aptList, onClick }) {
  clearMarkers();

  // Vue Proxy 제거
  const map = mapInstance && toRaw(mapInstance);
  if (!window.kakao?.maps || !map) return [];

  const { maps } = window.kakao;
  overlays = aptList.map((apt) => {
    // 1) DOM 노드 생성
    const el = document.createElement("div");
    el.className = "custom-marker";
    // 2) 내부 마크업
    el.innerHTML = `
      <div class="price-container">
        <div class="avg">${apt.amountAvg.toLocaleString()}억</div>
        <div class="max">최대 ${apt.amountMax}억</div>
        <div hidden>${apt.amountMin}</div>
      </div>
    `;
    // 꼭 켜 줘야 클릭이 됩니다
    el.style.pointerEvents = "auto";
    el.style.cursor = "pointer";

    // 2) 클릭 핸들러 달기
    if (typeof onClick === "function") {
      el.addEventListener("click", (e) => {
        console.log("clicked");
        e.stopPropagation(); // 지도 이벤트 전파 막기
        onClick(apt);
      });
    }

    // 2) CustomOverlay 생성
    const overlay = new maps.CustomOverlay({
      position: new maps.LatLng(apt.latitude, apt.longitude),
      content: el,
      yAnchor: 0.1,
      xAnchor: 0.1,
      map,
    });
    console.log("overlay : " + overlay);
    return overlay;
  });

  return overlays;
}
