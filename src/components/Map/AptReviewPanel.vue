<template>
  <div class="p-1">
    <!-- 1. 리뷰쓰기 -->
    <div class="mb-1">
      <!-- 로그인 O: 댓글 작성 UI -->
      <div v-if="true" class="p-1 rounded text-sm">
        <!-- 사용자명 -->
        <p class="font-bold mb-1">{{ userNickname }}</p>

        <!-- 댓글 입력창 -->
        <textarea
          v-model="commentText"
          class="w-full h-24 border rounded resize-none p-2 text-sm focus:outline-none focus:border-[#115C5E] focus:ring-1 focus:ring-[#115C5E]"
          placeholder="댓글을 입력하세요"
          maxlength="500"
        ></textarea>

        <!-- 하단: 글자 수 + 등록 버튼 -->
        <div class="flex justify-between items-center mt-2">
          <span class="text-xs text-gray-400">{{ commentText.length }}/500</span>
          <button
            class="!bg-[#115C5E] text-white text-8px px-4 py-1 rounded"
            :disabled="!commentText.trim()"
            @click="submitComment"
          >
            등록
          </button>
        </div>
      </div>

      <!-- 로그인 X: 입력 불가 -->
      <div v-else>
        <input
          type="text"
          class="w-full px-2 py-3 text-sm bg-gray-100 text-gray-400"
          placeholder="댓글을 작성하려면 로그인이 필요합니다"
          disabled
        />
      </div>
    </div>

    <!-- 2. 댓글 리스트 -->
    <div v-for="(comment, index) in comments" :key="index" class="mb-5 text-sm">
      <div class="flex items-center gap-3 mb-1">
        <span class="font-bold">{{ comment.memberName }}</span>
        <span class="text-xs text-gray-500">{{ formatDate(comment.updatedAt) }}</span>
        <span
          v-if="index < 3"
          class="bg-red-500 text-white text-[10px] px-1 rounded"
        >
          NEW
        </span>
      </div>
      <p class="mb-1">{{ comment.content }}</p>
    </div>

    <!-- 페이지네이션 -->
<div class="flex justify-center gap-2 mt-4">
  <button
    v-for="page in pageList"
    :key="page"
    @click="reload(page)"
    :class="[
      'px-3 py-1 border rounded text-sm transition',
      page === currentPage
        ? 'bg-[#115C5E] text-white font-bold border-[#115C5E]'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
    ]"
  >
    {{ page }}
  </button>
</div>
  </div>
</template>

<script setup>
import { ref, toRef, defineProps } from "vue";
import useReview from "@/composables/useReview";
import { postReview } from "@/api/reviewApi";

// 📌 Props로 aptSeq 받기
const props = defineProps({
  aptSeq: { type: String, required: true }
});
const aptSeqRef = toRef(props, "aptSeq");

// 📌 리뷰 데이터 로딩
const { comments, currentPage, pageList, reload } = useReview(aptSeqRef);


const userUuid = "63f912c8-2b04-11f0-a5b7-0242ac110002"; // ✅ 로그인된 사용자 임시로 넣음 UUID
const commentText = ref("");

// ✅ 댓글 등록 기능 구현
async function submitComment() {
  if (!commentText.value.trim()) {
    alert("댓글을 입력해주세요.");
    return;
  }

  try {
    await postReview({
      memberUuid: userUuid,
      aptSeq: aptSeqRef.value,
      content: commentText.value
    });
    commentText.value = "";
    await reload(); // 등록 후 리스트 갱신
  } catch (e) {
    alert("리뷰 등록 실패 😢");
    console.error("리뷰 등록 실패:", e);
  }
}

// 📌 날짜 포맷 함수
function formatDate(date) {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
</script>
