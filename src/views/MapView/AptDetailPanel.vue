<template>
  <div v-if="apt" class="apt-detail-panel">
    <!-- 헤더: 아파트명 + 간단 메타 (세대수·층수·면적) -->
    <div class="apt-detail-header">
      <div class="apt-detail-top">
        <h1>[{{ apt.dongNm || "정보 없음" }}]</h1><h3> {{ apt.aptNm || "정보 없음" }}</h3>
        <button class="apt-detail-close" @click="emit('close')">×</button>
      </div>
    </div>

    <div class="apt-detail-body">
      <div class="apt-detail-body-top">
        <table>
          <tbody>
            <tr v-if="apt.roadNm">
              <th>도로명</th>
              <td>{{ apt.roadNm }}</td>
            </tr>
            <tr v-if="apt.buildYear">
              <th>준공년도</th>
              <td>{{ apt.buildYear }}</td>
            </tr>
            <tr v-if="apt.jibun">
              <th>지번</th>
              <td>{{ apt.jibun }}</td>
            </tr>
            <tr>
              <th>평균 실거래가</th>
              <td>{{ formattedAvg }}억</td>
            </tr>
            <tr>
              <th>매매가</th>
              <td>{{ formattedMin }}억 ~ {{ formattedMax }}억</td>
            </tr>
          </tbody>
        </table>
      </div>

      <img
        :src="apt.imgUrl 
                ? `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${apt.imgUrl}` 
                : errorImage"
        alt="아파트 이미지"
        class="apt-detail-img"
      />
      <tabBarView :dealsList="dealsList" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRef, computed } from "vue";
import tabBarView from "./tabBarView.vue";
import errorImage from '@/assets/img/imgError.jpg'
import "@/assets/css/AptDetailPanel.css";


const props = defineProps({
  apt: Object,
  dealsList: {
    type: Array,
    default: () => [],
  },
});
const apt = toRef(props, "apt");
const dealsList = toRef(props, "dealsList");

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
