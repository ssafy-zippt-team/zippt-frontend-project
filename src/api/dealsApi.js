import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080/api/v1/deals",
  baseURL: "/api/v1/deals",
  timeout: 25000,
});

/**
 * 아파트 seq로 거래내역 조회
 */
export function getLatestList(aptSeq, page = 1, size = 10) {
  console.log("api call : ", aptSeq, page, size);
  return api.get(`/list/${aptSeq}`, {
    params: { page, size },
  });
  // return api.get(`/list/${encodeURIComponent(aptSeq)}`, {
  //   params: { page, size },
  // });
}
