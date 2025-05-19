// src/util/map/fetchBoundary.js
import axios from 'axios';

/**
 * @param {'sido'|'sigungu'} type
 * @returns {Promise<GeoJSON.Feature[]>}
 */
export async function fetchBoundary(type) {
  // 프로젝트 public 폴더 등에 미리 /data/sido.geojson, /data/sigungu.geojson으로 두고 요청
  const url = type === 'sido'
    ? '/data/sidoSimple.geojson'
    : '/data/sigunguSimple.geojson';
  const { data } = await axios.get(url);
  return data.features;
}
