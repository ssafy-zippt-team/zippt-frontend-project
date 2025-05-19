import axios from 'axios';

/**
 * 지도 레벨에 따라 경계 GeoJSON을 불러옵니다.
 * @param {number} level kakaoMap.getLevel()
 * @returns {Promise<GeoJSON.Feature[]>}
 */
export async function fetchBoundary(level) {
  // 1) Zoomed out: level >= 12 → 시도 경계
  if (level >= 12) {
    const { data } = await axios.get('/data/sidoSimple.geojson');
    return data.features;
  }
  // 2) 중간 Zoom: 9 ≤ level ≤ 11 → 시군구 경계
  if (level >= 9) {
    const { data } = await axios.get('/data/sigunguSimple.geojson');
    return data.features;
  }
  // 3) Zoomed in: level ≤ 8 → 시군구별 상세 GeoJSON
  const fileNames = [
    'busan.geojson',
    'chungbuk.geojson',
    'chungnam.geojson',
    'daegu.geojson',
    'daejun.geojson',
    'gangwondo.geojson',
    'gwangju.geojson',
    'gyungbuk.geojson',
    'gyungido.geojson',
    'gyungnam.geojson',
    'incheon.geojson',
    'jeju.geojson',
    'junbuk.geojson',
    'junnam.geojson',
    'sejong.geojson',
    'seoul.geojson',
    'ulsan.geojson',
  ];

  const arrays = await Promise.all(
    fileNames.map(name => {
      // 한글 파일명이 아니라면 encodeURI 불필요
      return axios
        .get(`/data/${name}`)
        .then(res => res.data.features)
        .catch(() => []); // 혹시 없는 파일이 있으면 빈 배열
    })
  );
  return arrays.flat();
}

