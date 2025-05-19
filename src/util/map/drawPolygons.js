// src/util/map/drawPolygons.js
import { toRaw } from 'vue';

export function drawPolygons({ mapInstance, features, onClick }) {
  if (!window.kakao?.maps || !mapInstance) return [];
  const map = toRaw(mapInstance);
  const { maps } = window.kakao;

  const polygons = features.map((feature) => {
    // GeoJSON 좌표계: [ [ [lon, lat], … ] ]  
    const coords = feature.geometry.coordinates[0];
    const path = coords.map(([lon, lat]) => new maps.LatLng(lat, lon));

    const polygon = new maps.Polygon({
      path,
      strokeWeight: 2,
      strokeColor: '#0077FF',
      fillColor: '#A7C7E7',
      fillOpacity: 0.5,
    });
    polygon.setMap(map);

    // hover시 스타일 바꾸기
    const hoverOpt = { fillColor: '#E0EDF8', fillOpacity: 0.7 };
    const outOpt   = { fillColor: '#A7C7E7', fillOpacity: 0.5 };
    maps.event.addListener(polygon, 'mouseover', () => polygon.setOptions(hoverOpt));
    maps.event.addListener(polygon, 'mouseout',  () => polygon.setOptions(outOpt));

    // 클릭 시—영역에 맞춰 지도를 이동
    maps.event.addListener(polygon, 'click', () => {
      const bounds = new maps.LatLngBounds();
      path.forEach((latlng) => bounds.extend(latlng));
      map.setBounds(bounds);
      if (typeof onClick === 'function') {
        onClick(feature);
      }
    });

    return polygon;
  });

  return polygons;
}
