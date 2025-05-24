import { api } from "@/api/authApi"

/**
 * 현재 뷰 경계값(minLat, maxLat, minLng, maxLng)으로
 * 주변 아파트(이름만 예시) 리스트를 조회
 */
export function getAroundHouses(minLat, maxLat, minLng, maxLng) {
  return api.get("/api/v1/houses/around", {
    params: { minLat, maxLat, minLng, maxLng },
  });
}

/**
 * 구·동 코드(sggCd, umdCd) 로 아파트 리스트 조회
 */
export function getAptListByDong(sggCd, umdCd) {
  return api.get("/api/v1/houses/dong/apt-list", {
    params: { sggCd, umdCd },
  });
}
/**
 * aptSeq로 아파트 정보 조회
 */
export function getHouseDetail(aptSeq) {
  return api.get(`/api/v1/houses/${aptSeq}`);
}

/**
 * aptSeq로 유사 아파트 조회
 */
export function getSimilarHouse(aptSeq){
  return api.get(`/api/v1/houses/similar?aptSeq=${aptSeq}`);
}

/**
 * term으로 유사 매물 조회
 */

export function getSimilarAptToName(term) {
    return api.get("/api/v1/houses/search",{
        params: {term},
    });
}