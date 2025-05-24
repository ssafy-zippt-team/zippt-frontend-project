import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // HttpOnly 쿠키 자동 포함
});

export async function refreshToken() {
  // const { data } = await api.post('/api/v1/refresh');
  // return data.result.accessToken;
  return api.post('/api/v1/refresh');
}

export function logout(){
  return api.post("/api/v1/logout");
}
