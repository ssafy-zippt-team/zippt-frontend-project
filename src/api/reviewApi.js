import { api } from "@/util/auth/auth"

/**
 * aptSeq로 리뷰 정보 조회
 */
export function getReview(aptSeq, page = 1) {
  return api.get(`/api/v1/reviews/${aptSeq}`, {
    params: { page }
  });
}

export function postReview({ memberUuid, aptSeq, content }) {
  return api.post(`/api/v1/reviews/reviewInsert`, null, {
    params: { memberUuid, aptSeq, content },
  });
}

