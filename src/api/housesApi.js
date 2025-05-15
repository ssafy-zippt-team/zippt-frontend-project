import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080/api/v1/houses",
  baseURL: "/api/v1/houses",
  timeout: 5000,
});

/**
 * 현재 뷰 경계값(minLat, maxLat, minLng, maxLng)으로
 * 주변 아파트(이름만 예시) 리스트를 조회
 */
export function getAroundHouses(minLat, maxLat, minLng, maxLng) {
  return api.get("/around", {
    params: { minLat, maxLat, minLng, maxLng },
  });
}

/**
 * 구·동 코드(sggCd, umdCd) 로 아파트 리스트 조회
 */
export function getAptListByDong(sggCd, umdCd) {
  return api.get("/dong/apt-list", {
    params: { sggCd, umdCd },
  });
}
/**
 * aptSeq로 아파트 정보 조회
 */
export function getHouseDetail(aptSeq){
  return api.get(`/${aptSeq}`);
}
