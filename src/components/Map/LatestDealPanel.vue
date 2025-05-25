<template>
  <div class="latest-deal-panel">
    <ul v-if="dealsList && dealsList.length" class="deal-list">
      <li v-for="(deal, idx) in dealsList" :key="idx" class="deal-item">
        <div class="deal-info">
          <p><strong>거래일:</strong> {{ deal.dealDate }}</p>
          <p><strong>층수:</strong> {{ deal.floor }}</p>
          <p><strong>전용면적:</strong> {{ deal.excluUseAr }}</p>
        </div>
        <div class="deal-amount">{{ deal.dealAmount }}만 원</div>
      </li>
    </ul>
    <div v-else class="no-data">실거래 정보가 없습니다.</div>

    <!-- 블록 단위 페이지네이션 -->
    <div class="deal-pagination">
      <!-- 이전 블록 -->
      <button @click="prevBlock" :disabled="blockStart === 1">‹</button>

      <!-- 페이지 숫자 -->
      <button
        v-for="p in pages"
        :key="p"
        @click="goPage(p)"
        :class="[p === currentPage ? 'bg-[#115C5E] text-white' : 'hover:bg-gray-200']"
      >
        {{ p }}
      </button>

      <!-- 다음 블록 -->
      <button @click="nextBlock" :disabled="isLastPage && currentPage <= lastInBlock">›</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRef, computed, ref, defineEmits, watch } from "vue";
import "@/assets/css/DealPanel.css";

const props = defineProps({
  dealsList: {
    type: Array,
    default: () => [],
  },
  currentPage: {
    type: Number,
    required: true,
  },
  isLastPage: {
    type: Boolean,
    required: true,
  },
});
const dealsList = toRef(props, "dealsList");
const currentPage = toRef(props, "currentPage");
const isLastPage = toRef(props, "isLastPage");

// 블록 크기, 시작 페이지
const blockSize = 5;
const blockStart = ref(1);

// 이 블록의 마지막 페이지 번호
const lastInBlock = computed(() => blockStart.value + blockSize - 1);

// 현재 블록에 보여줄 페이지 배열
const pages = computed(() => {
  const arr = [];
  for (let i = 0; i < blockSize; i++) {
    arr.push(blockStart.value + i);
  }
  return arr;
});

// 이벤트
const emit = defineEmits(["prev-page", "next-page", "go-page"]);

// 숫자 클릭
function goPage(page) {
  emit("go-page", page);
}

// 이전 블록: start-5, 바로 그 페이지 로드
function prevBlock() {
  if (blockStart.value > 1) {
    blockStart.value -= blockSize;
    emit("go-page", blockStart.value);
  }
}

// 다음 블록: start+5, 바로 그 페이지 로드
function nextBlock() {
  blockStart.value += blockSize;
  emit("go-page", blockStart.value);
}

// 만약 외부에서 currentPage 가 이 블록 범위를 벗어나면 자동으로 블록 이동
watch(currentPage, (cp) => {
  if (cp < blockStart.value) {
    blockStart.value = Math.floor((cp - 1) / blockSize) * blockSize + 1;
  } else if (cp > lastInBlock.value) {
    blockStart.value = Math.floor((cp - 1) / blockSize) * blockSize + 1;
  }
});
</script>
