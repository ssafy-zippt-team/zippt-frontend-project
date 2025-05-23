import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/reviews",
  //baseURL: "/api/v1/houses",
  timeout: 20000,
});

/**
 * aptSeq로 리뷰 정보 조회
 */
export function getReview(aptSeq, page = 1) {
  return api.get(`/${aptSeq}`, {
    params: { page }
  });
}

export function postReview({ memberUuid, aptSeq, content }) {
  return api.post(`/reviewInsert`, null, {
    params: { memberUuid, aptSeq, content },
  });
}

