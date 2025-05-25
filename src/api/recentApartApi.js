
import { api } from "@/api/authApi"

export function getRecentViewHouseList() {
  console.log("api" , api.defaults.headers);
  return api.get(`/api/v1/cache/recent-view-houses`);
    
}

export function addRecentViewHouse(aptData) {
  return api.post("/api/v1/cache/recent-view-houses", aptData);
}


