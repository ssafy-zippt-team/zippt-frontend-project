// /**
//  * aptList에 따라 마커를 생성합니다.
//  * 기존 마커는 먼저 clearMarkers()로 지워집니다.
//  *
//  * @param {{ mapInstance: kakao.maps.Map, aptList: Array<{latitude, longitude, aptSeq, amountAvg}> }} options
//  */

// // 마커와 인포윈도우를 생성하는 유틸 함수
// export function makeMarker({ mapInstance, aptList }) {
//   // 이전 마커 제거
//   // clearMarkers();

//   if (!window.kakao?.maps || !mapInstance) return [];

//   const { maps } = window.kakao;
//   const markers = [];

//   aptList.forEach((apt) => {
//     const position = new maps.LatLng(apt.latitude, apt.longitude);
//     console.log(mapInstance);
//     const marker = new maps.Marker({
//       position,
//       map: mapInstance,
//       title: apt.aptSeq,
//       content: "<div>content Test</div>",
//     });

//     const infowindow = new maps.InfoWindow({
//       content: `
//           <div style="padding:5px">
//             <strong>AptSeq:</strong> ${apt.aptSeq}<br/>
//             <strong>평균가:</strong> ${apt.amountAvg.toLocaleString()}억 원
//           </div>
//         `,
//     });

//     maps.event.addListener(marker, "mouseover", () => infowindow.open(mapInstance, marker));
//     maps.event.addListener(marker, "mouseout", () => infowindow.close());
//   });

//   return markers;
// }
// src/util/map/makeMarker.js

// 보관할 배열들
let overlays = [];

/**
 * 기존 오버레이(CustomOverlay) 모두 제거
//  */
// export function clearMarkers() {
//   if (!window.kakao?.maps) return;
//   overlays.forEach((ov) => {
//     try {
//       ov.setMap(null);
//     } catch {}
//   });
//   overlays = [];
// }

/**
 * aptList에 따라 CustomOverlay(HTML 마커)를 생성합니다.
 */
export function makeMarker({ mapInstance, aptList }) {
  // clearMarkers();
  if (!window.kakao?.maps || !mapInstance) return [];

  const { maps } = window.kakao;

  aptList.forEach((apt) => {
    const position = new maps.LatLng(apt.latitude, apt.longitude);

    // 1) 커스텀 HTML: Tailwind나 인라인 스타일로 꾸밀 수 있습니다.
    // const html = `
    //   <div class="custom-marker bg-indigo-600 text-white text-sm rounded-lg p-2 shadow-lg">
    //     <div class="font-bold">매 ${apt.amountAvg.toLocaleString()}억</div>
    //     <div class="text-xs">${apt.area}㎡</div>
    //   </div>
    // `;
    const html = `
    <div class="custom-marker">
    <div class="bookmark"><strong>BookMark:</strong> ${apt.bookMarkCount}</div>
    <div class="avg">매 ${apt.amountAvg.toLocaleString()}억</div>
    <div class="max">max ${apt.amountMax}억</div>
    </div>
    `;

    // 2) CustomOverlay 객체 생성
    const overlay = new maps.CustomOverlay({
      position,
      content: html,
      yAnchor: 1, // 1이면 content 하단이 좌표에 닿습니다
      xAnchor: 0.5, // 0.5면 content 중앙이 좌표에 닿습니다
      map: mapInstance,
    });

    overlays.push(overlay);
  });

  return overlays;
}
