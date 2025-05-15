<template>
  <div v-if="apt" class="apt-detail-panel">
    <div class="apt-detail-header">
      <h3>{{ apt.aptNm || '정보 없음' }}</h3>
      <button class="apt-detail-close" @click="emit('close')">×</button>
    </div>
    <div class="apt-detail-body">
      <p v-if="apt.jibun"><strong>지번:</strong> {{ apt.jibun }}</p>
      <p v-if="apt.roadNm"><strong>도로명:</strong> {{ apt.roadNm }}</p>
      <p v-if="apt.buildYear != null"><strong>준공년도:</strong> {{ apt.buildYear }}년</p>
      <p v-if="apt.bookMarkCount != null"><strong>북마크:</strong> {{ apt.bookMarkCount }}</p>
      <p v-if="apt.amountAvg != null">
        <strong>평균가:</strong> {{ formattedAvg }}억
      </p>
      <img
        v-if="apt.imgUrl"
        :src="apt.imgUrl"
        alt="아파트 이미지"
        class="apt-detail-img"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRef, computed } from "vue";
import "../assets/AptDetailPanel.css";

const props = defineProps({
  apt: Object,
});
const apt = toRef(props, "apt");

const emit = defineEmits(["close"]);

// amountAvg가 null/undefined면 빈 문자열, 아니면 포맷팅
const formattedAvg = computed(() => {
  const val = apt.value.amountAvg;
  return val != null ? val.toLocaleString() : "";
});
</script>

<style scoped>
/* 기존 CSS를 여기 남기거나 외부 파일에서 불러오시면 됩니다 */
</style>
