import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/Commercials",
  timeout: 20000,
});

// 상권 통계 조회 (cx: 경도, cy: 위도, radius: 반경)
export function getCommercialStats({ cx, cy, radius }) {
  return api.get("/stat", {
    params: { cx, cy, radius },
  });
}