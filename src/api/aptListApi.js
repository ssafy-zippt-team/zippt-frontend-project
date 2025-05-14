import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/houses",
  timeout: 5000,
});

export function getAptListByDong(sggCd, umdCd){
  return api.get("/dong/apt-list", {
    params: { sggCd, umdCd }
  });
}