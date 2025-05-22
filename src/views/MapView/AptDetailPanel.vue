<template>
  <div v-if="selectedApt" class="apt-detail-panel">
    <!-- 헤더: 아파트명 + 간단 메타 (세대수·층수·면적) -->
    <div class="apt-detail-header">
      <div class="apt-detail-top">
        <h1>[{{ selectedApt.umdNm || "정보 없음" }}]</h1>
        <h3>{{ selectedApt.aptNm || "정보 없음" }}</h3>
        <button class="apt-detail-close" @click="emit('close')">×</button>
      </div>
    </div>

    <div class="apt-detail-body">
      <div class="apt-detail-body-top">
        <table>
          <tbody>
            <tr v-if="selectedApt.roadNm">
              <th>도로명</th>
              <td>{{ selectedApt.roadNm }}</td>
            </tr>
            <tr v-if="selectedApt.buildYear">
              <th>준공년도</th>
              <td>{{ selectedApt.buildYear }}</td>
            </tr>
            <tr v-if="selectedApt.jibun">
              <th>지번</th>
              <td>{{ selectedApt.jibun }}</td>
            </tr>
            <tr>
              <th>평균 매매가</th>
              <td>{{ formattedAvg(selectedApt.amountAvg) }}</td>
            </tr>
            <tr>
              <th>매매가</th>
              <td>{{ formattedMin }}억 ~ {{ formattedMax }}억</td>
            </tr>
          </tbody>
        </table>
      </div>

      <img
        :src="
          selectedApt.imgUrl
            ? `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${selectedApt.imgUrl}`
            : errorImage
        "
        alt="아파트 이미지"
        class="apt-detail-img"
      />
      <TabBarView
        :deals-list="dealsList"
        :current-page="currentPage"
        :is-last-page="isLastPage"
        @go-page="(page) => emit('go-page', page)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRef, computed } from "vue";
import TabBarView from "./TabBarView.vue";
import errorImage from "@/assets/img/imgError.jpg";
// import useLatestDeals from '@/composables/useLatestDeals'
import "@/assets/css/AptDetailPanel.css";

const props = defineProps({
  selectedApt: Object,
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
const selectedApt = toRef(props, "selectedApt");
const dealsList = toRef(props, "dealsList");
const currentPage = toRef(props, "currentPage");
const isLastPage = toRef(props, "isLastPage");

// const emit = defineEmits(["close"]);
const emit = defineEmits(["close", "go-page"]);

console.log("selectedApt ? : ", selectedApt);

// amountAvg가 null/undefined면 빈 문자열, 아니면 포맷팅
function formattedAvg(v) {
  if (v == null || isNaN(v)) return "";
  const intPart = Math.floor(v);
  const decimalHundreds = Math.round((v - intPart) * 100);
  const manWon = decimalHundreds * 100;
  return `${intPart}억 ${manWon.toLocaleString()}만원`;
}
const formattedMax = computed(() => {
  const v = selectedApt.value.amountMax;
  return v != null ? v.toLocaleString() : "";
});
const formattedMin = computed(() => {
  const v = selectedApt.value.amountMin;
  return v != null ? v.toLocaleString() : "";
});
</script>
