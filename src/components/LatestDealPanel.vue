<template>
  <div class="latest-deal-panel">
    <div v-if="isLoading" class="loading">불러오는 중…</div>
    <div v-else-if="latestDeal">
      <p><strong>거래일:</strong> {{ latestDeal.dealDate }}</p>
      <p><strong>층수:</strong> {{ latestDeal.floor }}</p>
      <p><strong>전용면적:</strong> {{ latestDeal.exclusUseAr }}</p>
      <p><strong>거래금액:</strong> {{ latestDeal.dealAmount }}만 원</p>
    </div>
    <div v-else class="no-data">실거래 정보가 없습니다.</div>
  </div>
</template>

<script setup>
 import { defineProps, toRef } from 'vue';

 // defineProps로 받은 props를 toRef로 풀어 써야 template에서 사용 가능합니다.
 const props       = defineProps({
   latestDeal: Object,
   isLoading:  Boolean,
 });
 const latestDeal  = toRef(props, 'latestDeal');
 const isLoading   = toRef(props, 'isLoading');
</script>

<style scoped>
.latest-deal-panel { padding: 0.75rem 1rem; }
.loading,
.no-data {
  color: #888;
  font-size: 0.9rem;
}
.latest-deal-panel p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}
</style>
