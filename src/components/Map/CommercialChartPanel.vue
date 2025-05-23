<script setup>
// import { ref, onMounted,defineProps ,toRef} from "vue";
// import {defineProps ,toRef} from "vue";

// import useCommercial from "@/composables/useCommercial";

// 예시 중심 좌표 및 반경 설정 (props로 받을 수도 있음)
// const location = ref({
//   cx: 127.010034883981,
//   cy: 37.5775989043871,
//   radius: 1000,
// });

// const props = defineProps({
//   selectedCoords: {
//     type: Object,
//     required: true
//   }
// });

// const selectedCoords = toRef(props, "selectedCoords");
// console.log("📍 selectedCoords33:", selectedCoords.value);

import { defineProps, toRef, watchEffect } from "vue";

const props = defineProps({
  selectedCoords: {
    type: Object,
    required: true
  }
});

const selectedCoords = toRef(props, "selectedCoords");

watchEffect(() => {
  if (selectedCoords.value) {
    console.log("📍 selectedCoords33:", selectedCoords.value.lat, selectedCoords.value.lng);
  } else {
    console.warn("⚠️ selectedCoords가 아직 정의되지 않았습니다.");
  }
});

// 통계 정보 로딩
// const { categoryCountMap, loadStats } = useCommercial(location);
// console.log("상권 통계:", categoryCountMap);


// onMounted(() => {
//   loadStats();
// });
</script>

<template>
  <div class="commercial-chart-panel">
    <!-- TODO: Chart or Table to display categoryCountMap -->
  </div>
</template>

<style scoped>
.commercial-chart-panel {
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
