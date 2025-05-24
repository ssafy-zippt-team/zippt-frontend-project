// import axios from "axios";

// const api = axios.create({
//   // baseURL: "http://localhost:8080/api/v1/addresses",
//   baseURL: "/api/v1/addresses",
//   timeout: 20000,
// });
import { api } from "@/util/auth/auth"

export function getCityList() {
  return api.get("/api/v1/addresses/getCitylist");
}
export function getGuList(citySeq) {
  return api.get(`/api/v1/addresses/getGulist/${citySeq}`);
}
export function getDongList(citySeq, guSeq) {
  return api.get(`/api/v1/addresses/getDonglist/${citySeq}/${guSeq}`);
}
