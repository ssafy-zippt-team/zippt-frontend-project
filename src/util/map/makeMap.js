export function makeMap({
  container,
  appKey,
  center = { lat: 35.0936, lng: 128.8542 },
  level = 3,
  markers = [], // [{ title, lat, lng }]
}) {
  return new Promise((resolve, reject) => {
    if (!container.value) {
      return reject(new Error("Container is not ready"));
    }

    const loadSdk = () => {
      window.kakao.maps.load(() => {
        const { maps } = window.kakao;
        // 1) 맵 생성
        const kakaoMap = new maps.Map(container.value, {
          center: new maps.LatLng(center.lat, center.lng),
          level,
        });

        // 2) 마커 생성
        markers.forEach(({ title, lat, lng }) => {
          const marker = new maps.Marker({
            position: new maps.LatLng(lat, lng),
            map: kakaoMap,
            title,
          });
          const infowindow = new maps.InfoWindow({
            content: `<div style="padding:5px">${title}</div>`,
          });
          maps.event.addListener(marker, "mouseover", () => infowindow.open(kakaoMap, marker));
          maps.event.addListener(marker, "mouseout", () => infowindow.close());
        });

        resolve(kakaoMap);
      });
    };

    // 이미 로드된 경우
    if (window.kakao?.maps) {
      loadSdk();
      return;
    }
    // 스크립트 삽입
    const script = document.createElement("script");

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = loadSdk;
    script.onerror = () => reject(new Error("Kakao Maps SDK load error"));
    document.head.appendChild(script);
  });
}
