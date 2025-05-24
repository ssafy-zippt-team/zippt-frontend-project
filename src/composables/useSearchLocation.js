export default function useSearchLocation(kakaoMap) {
  async function searchLocation(keyword, level = 4) {
    if (!kakaoMap.value || !window.kakao?.maps) return;

    const ps = new window.kakao.maps.services.Places();

    return new Promise((resolve, reject) => {
      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK && data.length) {
          // 검색된 모든 장소 좌표를 LatLngBounds 에 담아서
          const bounds = new window.kakao.maps.LatLngBounds();
          data.forEach(place => {
            bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
          });
          const map = kakaoMap.value;
          // 지도를 그 범위에 맞춰 자동 이동/줌
          map.setBounds(bounds);
          map.setLevel(level);
          resolve(data);
        } else {
          reject(new Error('검색 결과가 없습니다.'));
        }
      });
    });
  }

  return { searchLocation };
}
