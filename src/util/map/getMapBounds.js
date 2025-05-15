/**
 * kakao.maps.Map 인스턴스에서 현재 뷰의
 * SouthWest, NorthEast 좌표를 가져와
 * { minLat, maxLat, minLng, maxLng } 객체로 반환합니다.
 *
 * @param {kakao.maps.Map} mapInstance
 * @returns {{minLat: number, maxLat: number, minLng: number, maxLng: number}}
 */
export function getMapBounds(mapInstance) {
    const bounds = mapInstance.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
  
    return {
      minLat: sw.getLat(),
      minLng: sw.getLng(),
      maxLat: ne.getLat(),
      maxLng: ne.getLng(),
    };
  }
  