<template>
  <div v-if="selectedApt" class="apt-detail-panel">
    <div class="apt-detail-header">
      <div class="apt-detail-top">
        <h1>[{{ selectedApt.umdNm || "정보 없음" }}]</h1>
        <h3>{{ selectedApt.aptNm || "정보 없음" }}</h3>
        <button class="apt-detail-close" @click="emit('close')">×</button>
      </div>
    </div>

    <div class="apt-detail-body">
      <div class="scroll-body">
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

        <div class="p-1">
  <h2 class="text-[12px] font-bold mb-1">유사한 아파트 추천</h2>
  <p class="text-[8px] text-gray-500 mb-1">
    지금 보시는 아파트와 비슷한 아파트도 둘러보세요
  </p>

<div class="grid grid-cols-2 gap-2">
  <div
    v-for="(item, idx) in similarItems"
    :key="idx"
    class="border rounded overflow-hidden shadow"
  >
    <div>
    <img
      :src="item.imgUrl
        ? `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${item.imgUrl}`
        : `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${selectedApt.imgUrl}`"
      alt="유사 아파트 이미지"
      class="w-full h-20 object-cover"
    />
    </div>
     <div class="h-12 flex items-center justify-center text-center px-1">
      <p class="text-[10px] font-bold text-gray-600">{{ item.aptNm }}</p>
      <p
        v-if="!item.imgUrl"
        class="text-[10px] text-red-400 italic"
      >
        이미지 준비중...
      </p>
    </div>
  </div>
</div>
</div>
      </div>

      <div class="fixed-tabbar">
        <TabBarView
          :deals-list="dealsList"
          :current-page="currentPage"
          :is-last-page="isLastPage"
          :apt-seq="selectedApt.aptSeq"
          :selected-coords="selectedCoords" 
          @go-page="(page) => emit('go-page', page)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRef, computed } from "vue";
import TabBarView from "./TabBarView.vue";
import errorImage from "@/assets/img/imgError.jpg";
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
  similarItems: {
    type: Array,
    default: () => [],
  },
  aptSeq: String,
  selectedCoords: {
    type: Object,
    required: true,
  }
});

const selectedCoords = toRef(props, "selectedCoords");
console.log("📍 selectedCoords:", selectedCoords.value);

const selectedApt = toRef(props, "selectedApt");
const dealsList = toRef(props, "dealsList");
const currentPage = toRef(props, "currentPage");
const isLastPage = toRef(props, "isLastPage");
const similarItems = toRef(props, "similarItems");
const emit = defineEmits(["close", "go-page"]);

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
