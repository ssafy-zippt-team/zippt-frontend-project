// import axios from "axios";

// const api = axios.create({
//   // baseURL: "http://localhost:8080/api/v1/deals",
//   baseURL: "/api/v1/deals",
//   timeout: 25000,
// });
import { api } from "@/util/auth/auth"

/**
 * 아파트 seq로 거래내역 조회
 */
export function getLatestList(aptSeq, page = 1, size = 10) {
  console.log("api call : ", aptSeq, page, size);
  return api.get(`/api/v1/deals/list/${aptSeq}`, {
    params: { page, size },
  });
  // return api.get(`/list/${encodeURIComponent(aptSeq)}`, {
  //   params: { page, size },
  // });
}


/**
 * 당해 광역시별 평균 매매가 조회 (amountStatResponseList)
 */
export function getAvgPriceStat() {
  return api.get("/api/v1/deals/amountStatResponseList");
}

/**
 * 당해 광역시별 매매 거래량 조회 (amountStatCntResponseList)
 */
export function getDealCountStat() {
  return api.get("/api/v1/deals/amountStatCntResponseList");
}
