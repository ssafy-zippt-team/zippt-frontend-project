<template>
  <div class="apt-list-panel">
    <ul>
      <li v-for="apt in aptList" :key="apt.aptSeq" @click="$emit('select-apt', apt)" class="apt-card">
        <img
          :src="apt.imgUrl ? `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${apt.imgUrl}` : errorImage"
          alt="thumb"
        />
        <div class="flex-1">
          <h3>{{ apt.aptNm }}</h3>
          <p class="apt-list-panel-price">매매</p>
          <p>{{ formatAmount(apt.amountAvg) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, toRef } from "vue";
import errorImage from "@/assets/img/imgError.jpg";
import "@/assets/css/AptListPanel.css";

// defineProps 로 props 객체를 받고
const props = defineProps({
  aptList: {
    type: Array,
    default: () => [],
  },
});

// toRef 로 개별 prop 을 반응형 참조로 꺼냅니다.
// (toRefs 를 쓰면 여러 개를 한 번에 꺼낼 수도 있어요)
const aptList = toRef(props, "aptList");

function formatAmount(v) {
  if (v == null || isNaN(v)) return "";
  const intPart = Math.floor(v);
  const decimalHundreds = Math.round((v - intPart) * 100);
  const manWon = decimalHundreds * 100;
  return `${intPart}억 ${manWon.toLocaleString()}만원`;
}
</script>
