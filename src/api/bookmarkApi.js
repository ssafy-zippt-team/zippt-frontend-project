// src/api/bookmarkApi.js
import { api } from "@/api/authApi"
// 즐겨찾기 토글
export function toggleBookmark(memberUuid, aptSeq) {
  return api.patch(`/api/v1/bookmarks/toggle/${memberUuid}/${aptSeq}`);
    
}

// 즐겨찾기 여부 확인
export function checkBookmark(memberUuid, aptSeq) {
  return api.get("/api/v1/bookmarks/check", {
    params: { memberUuid, aptSeq }
  });
}

// 즐겨찾기 개수 조회
export function getBookmarkCount(aptSeq) {
  return api.get(`/api/v1/bookmarks/getBookmarkCnt/${aptSeq}`);
}

// 회원원의 즐겨찾기 조회
export function getBookmarkList(memberUuid) {
  return api.get(`/api/v1/bookmarks/list/${memberUuid}`);
}
