// import axios from "axios";
import { api } from "@/api/authApi"

export function getMypage(memberUuid) {
  console.log("getMypage 호출, memberUuid:", memberUuid);
  return api.get(`/api/v1/members/mypage/${memberUuid}`);
}

export function update(memberUuid, memberName, email, phoneNumber) {
   return api.patch("/api/v1/members/memberupdate", {
    params: { memberUuid, memberName, email, phoneNumber},
  });
}