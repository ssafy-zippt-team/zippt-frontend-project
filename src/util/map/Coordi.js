// 지도의 중심 좌표와 레벨을 얻어옴

// Named export 로 내보내기
export function getInfo(kakaoMap) {
  // 지도의 현재 중심좌표를 얻어옵니다
  const center = kakaoMap.getCenter();
  // 지도의 현재 레벨을 얻어옵니다
  const level = kakaoMap.getLevel();
  // 지도타입을 얻어옵니다
  const mapTypeId = kakaoMap.getMapTypeId();
  // 지도의 현재 영역을 얻어옵니다
  const bounds = kakaoMap.getBounds();
  // 영역의 남서쪽 좌표를 얻어옵니다
  const swLatLng = bounds.getSouthWest();
  // 영역의 북동쪽 좌표를 얻어옵니다
  const neLatLng = bounds.getNorthEast();
  // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
  //   let boundsStr = bounds.toString();

  let message = `지도 중심좌표는 위도 ${center.getLat()},
  경도 ${center.getLng()} 이고 지도 레벨은 ${level} 입니다.
  지도 타입은 ${mapTypeId} 이고
  남서쪽 좌표는 ${swLatLng.getLat()}, ${swLatLng.getLng()},
  북동쪽 좌표는 ${neLatLng.getLat()}, ${neLatLng.getLng()} 입니다.`;

  return message;
}
