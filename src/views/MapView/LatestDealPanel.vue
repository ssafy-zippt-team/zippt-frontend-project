<template>
  <!-- <div class="latest-deal-panel">
    <div v-if="dealsList">
      <p><strong>거래일:</strong> {{ dealsList.dealDate }}</p>
      <p><strong>층수:</strong> {{ dealsList.floor }}</p>
      <p><strong>전용면적:</strong> {{ dealsList.excluUseAr }}</p>
      <p><strong>거래금액:</strong> {{ dealsList.dealAmount }}만 원</p>
    </div>
    <div v-else class="no-data">실거래 정보가 없습니다.</div>
  </div> -->

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
  </div>
</template>

<script setup>
import { defineProps, toRef } from "vue";

// defineProps로 받은 props를 toRef로 풀어 써야 template에서 사용 가능합니다.
// const props = defineProps({
//   dealsList: Object,
// });
const props = defineProps({
  dealsList: {
    type: Array,
    default: () => [],
  },
});
const dealsList = toRef(props, "dealsList");
</script>

<style scoped>
.latest-deal-panel {
  padding: 0.75rem 1rem;
}
.loading,
.no-data {
  color: #888;
  font-size: 0.9rem;
}
.latest-deal-panel p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}
/* 리스트 컨테이너: 최대 높이 130px, 넘칠 때 스크롤 */
.deal-list {
  @apply max-h-[130px] overflow-y-auto divide-y divide-gray-200;
}

/* 각 항목: flex 레이아웃, 상하 간격, 구분선 */
.deal-item {
  @apply flex justify-between items-start py-2 px-4;
}

/* 마지막 항목은 구분선 없음 (divide-y 로 처리되므로 필요 없을 수도 있습니다) */
.deal-item:last-child {
  @apply border-b-0;
}

/* 거래 정보 텍스트 그룹 */
.deal-info p {
  @apply text-sm leading-tight;
  /* 상하 간격을 조금 주고 싶으면 margin bottom 추가 */
  margin-bottom: 0.125rem;
}

/* 금액 표시부: 오른쪽 정렬 */
.deal-amount {
  @apply text-sm font-medium text-right;
}

/* 데이터 없을 때 */
.no-data {
  @apply p-4 text-center text-gray-500 text-sm;
}
</style>
