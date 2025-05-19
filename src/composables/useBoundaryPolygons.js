// src/composables/useBoundaryPolygons.js
import { ref } from 'vue';
import { fetchBoundary } from '@/util/map/fetchBoundary';
import { drawPolygons  } from '@/util/map/drawPolygons';

export default function useBoundaryPolygons(kakaoMap) {
  const polygons = ref([]);

  /**
   * @param {'sido'|'sigungu'} type
   * @param {(feature: GeoJSON.Feature)=>void} onPolygonClick
   */
  async function loadBoundaries(type, onPolygonClick) {
    if (!kakaoMap.value) return;
    const features = await fetchBoundary(type);
    polygons.value = drawPolygons({
      mapInstance: kakaoMap.value,
      features,
      onClick: onPolygonClick,
    });
  }

  return { polygons, loadBoundaries };
}
