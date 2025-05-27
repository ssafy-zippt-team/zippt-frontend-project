import { api } from "@/api/authApi";

export function checkPassword(password) {
  console.log("password : ", password);
  return api.post("/api/v1/checkPassword", password);
}
