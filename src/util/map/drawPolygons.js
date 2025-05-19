import { toRaw } from 'vue';

/**
 * 지도에 GeoJSON 폴리곤을 그리되, 기본 상태는 숨겨져 있다가
 * 마우스 오버 시에만 보이도록 처리합니다.
 * @param {{ mapInstance: object, features: GeoJSON.Feature[], onClick?: function }} options
 * @returns {kakao.maps.Polygon[]}
 */
export function drawPolygons({ mapInstance, features, onClick }) {
  if (!window.kakao?.maps || !mapInstance) return [];
  const map = toRaw(mapInstance);
  const { maps } = window.kakao;
  const polygons = [];

  features.forEach(feature => {
    const { geometry } = feature;
    let rings = [];

    if (geometry.type === 'Polygon') {
      rings = [geometry.coordinates[0]];
    } else if (geometry.type === 'MultiPolygon') {
      rings = geometry.coordinates.map(polygon => polygon[0]);
    }

    rings.forEach(coordRing => {
      // coordRing: [ [lon, lat], ... ]
      const path = coordRing.map(([lon, lat]) => new maps.LatLng(lat, lon));

      // 초기에는 거의투명하게 보이지 않도록 설정
      const polygon = new maps.Polygon({
        path,
        strokeWeight: 0.01,
        strokeColor: '#0077FF',
        fillColor: '#A7C7E7',
        fillOpacity: 0.01,
        // clickable: true, // 필요시 추가(투명 상태여도 이벤트 수신)
      });
      polygon.setMap(map);

      // hover 시 보이기 위한 옵션
      const showOpt = { strokeWeight: 2, fillOpacity: 0.5 };
      // mouseout 시 숨김 옵션
      const hideOpt = { strokeWeight: 0.01, fillOpacity: 0.01 };

      maps.event.addListener(polygon, 'mouseover', () => {
        polygon.setOptions(showOpt);
      });
      maps.event.addListener(polygon, 'mouseout', () => {
        polygon.setOptions(hideOpt);
      });
      maps.event.addListener(polygon, 'click', () => {
        const bounds = new maps.LatLngBounds();
        path.forEach(latlng => bounds.extend(latlng));
        map.setBounds(bounds);
        if (typeof onClick === 'function') onClick(feature);
      });

      polygons.push(polygon);
    });
  });

  return polygons;
}
