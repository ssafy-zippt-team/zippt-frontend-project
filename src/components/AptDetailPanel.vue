 
<template>
  <div v-if="apt" class="apt-detail-panel">
    <!-- 헤더: 아파트명 + 간단 메타 (세대수·층수·면적) -->
    <div class="apt-detail-header">
      <div class="apt-detail-top">
        <h3>{{ apt.aptNm || "정보 없음" }}</h3>
        <button class="apt-detail-close" @click="emit('close')">×</button>
      </div>
    </div>
    <div class="apt-detail-prices">
      <div class="recent-sale">
        <div class="label">평균 실거래가</div>
        <div class="price avg-price">{{ formattedAvg }}억</div>
      </div>

      <div class="range-sale">
        <div class="label">매매가</div>
        <div class="price range-price">{{ formattedMin }}억 ~ {{ formattedMax }}억</div>
      </div>
    </div>

    <div class="apt-detail-body">
      <p v-if="apt.jibun"><strong>지번:</strong> {{ apt.jibun }}</p>
      <p v-if="apt.roadNm"><strong>도로명:</strong> {{ apt.roadNm }}</p>
      <p v-if="apt.buildYear != null"><strong>준공년도:</strong> {{ apt.buildYear }}년</p>
      <p v-if="apt.bookMarkCount != null"><strong>북마크:</strong> {{ apt.bookMarkCount }}</p>
      <img
        v-if="apt.imgUrl"
        :src="`https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${apt.imgUrl}`"
        alt="아파트 이미지"
        class="apt-detail-img"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRef, computed } from "vue";
import "../assets/css/AptDetailPanel.css";

const props = defineProps({
  apt: Object,
});
const apt = toRef(props, "apt");

const emit = defineEmits(["close"]);

// amountAvg가 null/undefined면 빈 문자열, 아니면 포맷팅
const formattedAvg = computed(() => {
  const v = apt.value.amountAvg;
  return v != null ? v.toLocaleString() : "";
});
const formattedMax = computed(() => {
  const v = apt.value.amountMax;
  return v != null ? v.toLocaleString() : "";
});
const formattedMin = computed(() => {
  const v = apt.value.amountMin;
  return v != null ? v.toLocaleString() : "";
});
</script>