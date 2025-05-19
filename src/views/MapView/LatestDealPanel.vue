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
        <div class="deal-amount self-center">{{ deal.dealAmount }}만 원 </div>
      </li>
    </ul>
    <div v-else class="no-data text-gray-500 text-sm">실거래 정보가 없습니다.</div>
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
});
const dealsList = toRef(props, "dealsList");
</script>