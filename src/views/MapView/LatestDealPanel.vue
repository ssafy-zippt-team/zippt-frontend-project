<template>
  <div class="latest-deal-panel">
    <ul v-if="dealsList && dealsList.length" class="deal-list max-h-[130px] overflow-y-auto">
      <li
        v-for="(deal, idx) in dealsList"
        :key="idx"
        class="deal-item flex justify-between py-2 border-b last:border-none"
      >
        <div class="deal-info">
          <p><strong>거래일:</strong> {{ deal.dealDate }}</p>
          <p><strong>층수:</strong> {{ deal.floor }}</p>
          <p><strong>전용면적:</strong> {{ deal.excluUseAr }}</p>
        </div>
        <div class="deal-amount self-center">{{ deal.dealAmount }}만 원</div>
      </li>
    </ul>
    <div v-else class="no-data text-gray-500 text-sm">실거래 정보가 없습니다.</div>
    <div class="deal-pagination flex justify-center items-center space-x-2 mt-2">
      <button
        @click="$emit('prev-page')"
        :disabled="currentPage <= 1"
        class="px-2 py-1 border rounded disabled:opacity-50"
      >
        이전
      </button>
      <span class="text-sm">{{ currentPage }} 페이지</span>
      <button @click="$emit('next-page')" :disabled="isLastPage" class="px-2 py-1 border rounded disabled:opacity-50">
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRef } from "vue";
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
</script>
