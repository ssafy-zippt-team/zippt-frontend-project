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
      <div class="bookmark-container">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="heart-icon"
             viewBox="0 0 24 24"
             fill="#ff5a5a"
             stroke="#ff5a5a"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
             width="16" height="16"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3
                   c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5
                   c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        <span class="bookmark-count">${apt.bookMarkCount}</span>
      </div>
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

    return overlay;
  });

  return overlays;
}
