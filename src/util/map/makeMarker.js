// import { toRaw } from "vue";

// let overlays = [];

// /**
//  * 기존 CustomOverlay(HTML 마커) 모두 제거
//  */
// export function clearMarkers() {
//   if (!window.kakao?.maps) return;
//   overlays.forEach((ov) => {
//     if (ov && typeof ov.setMap === "function") {
//       try {
//         ov.setMap(null);
//       } catch (e) {
//         void e; // 빈 블록 방지
//       }
//     }
//   });
//   overlays = [];
// }

// /**
//  * aptList에 따라 CustomOverlay(HTML 마커)를 생성합니다.
//  */
// export function makeMarker({ mapInstance, aptList }) {
//   // 1) 이전 오버레이 삭제
//   clearMarkers();

//   // 2) mapInstance 에 Proxy가 아니라 원본 Kakao Map 객체를 꺼내기
//   const map = mapInstance && toRaw(mapInstance);
//   if (!window.kakao?.maps || !map) return [];

//   const { maps } = window.kakao;

//   // 3) 새로운 오버레이 생성
//   aptList.forEach((apt) => {
//     const position = new maps.LatLng(apt.latitude, apt.longitude);
//     const html = `
//       <div class="custom-marker">
//         <div class="bookmark"><strong>BookMark:</strong> ${apt.bookMarkCount}</div>
//         <div class="avg">매 ${apt.amountAvg.toLocaleString()}억</div>
//         <div class="max">max ${apt.amountMax}억</div>
//       </div>
//     `;
//     const overlay = new maps.CustomOverlay({
//       position,
//       content: html,
//       yAnchor: 1,
//       xAnchor: 0.5,
//       map,  // ← 반드시 toRaw 된 map을 넘김
//     });
//     overlays.push(overlay);
//   });

//   return overlays;
// }
// src/util/map/makeMarker.js
import { toRaw } from "vue";

let overlays = [];

/**
 * 이전 오버레이 모두 제거
 */
export function clearMarkers() {
  overlays.forEach((ov) => {
    try { ov.setMap(null); }
    catch (e) { void e; }
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

  const { maps} = window.kakao;
  overlays = aptList.map((apt) => {
    // 1) DOM 노드 생성
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML = `
      <div class="bookmark"><strong>BookMark:</strong> ${apt.bookMarkCount}</div>
      <div class="avg">매 ${apt.amountAvg.toLocaleString()}억</div>
      <div class="max">max ${apt.amountMax}억</div>
    `;
     // 꼭 켜 줘야 클릭이 됩니다
     el.style.pointerEvents = "auto";
     el.style.cursor        = "pointer";
 
     // 2) 클릭 핸들러 달기
     if (typeof onClick === "function") {
       el.addEventListener("click", e => {
        console.log("clicked");
         e.stopPropagation();    // 지도 이벤트 전파 막기
         onClick(apt);
       });
     }
 

    // 2) CustomOverlay 생성
    const overlay = new maps.CustomOverlay({
      position: new maps.LatLng(apt.latitude, apt.longitude),
      content: el,
      yAnchor: 1,
      xAnchor: 0.5,
      map,
    });


    return overlay;
  });

  return overlays;
}
