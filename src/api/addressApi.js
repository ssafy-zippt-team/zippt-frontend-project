import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080/api/v1/addresses",
  baseURL: "/api/v1/addresses",
  timeout: 20000,
});

export function getCityList() {
  return api.get("/getCitylist");
}
export function getGuList(citySeq) {
  return api.get(`/getGulist/${citySeq}`);
}
export function getDongList(citySeq, guSeq) {
  return api.get(`/getDonglist/${citySeq}/${guSeq}`);
}
