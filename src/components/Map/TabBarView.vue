<template>
  <div class="tab-panel">
   <!-- 탭 메뉴 wrapper -->
<div
      class="overflow-x-auto scrollbar-hide border-b"
      ref="tabScrollRef"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
    >
  <ul class="flex text-sm min-w-max">
    <li
      @click="changeTab('CommercialChartPanel')"
      :class="[
        'inline-block px-4 py-2 cursor-pointer',
        selectedTab === 'CommercialChartPanel' ? 'border-b-2 border-black text-black' : 'text-gray-400'
      ]"
    >
      상권정보
    </li>
    <li
      @click="changeTab('deal')"
      :class="[
        'inline-block px-4 py-2 cursor-pointer',
        selectedTab === 'deal' ? 'border-b-2 border-black text-black' : 'text-gray-400'
      ]"
    >
      실거래가
    </li>
    <li
      @click="changeTab('repo')"
      :class="[
        'inline-block px-4 py-2 cursor-pointer',
        selectedTab === 'repo' ? 'border-b-2 border-black text-black' : 'text-gray-400'
      ]"
    >
      AI 레포트
    </li>
    <li
      @click="changeTab('review')"
      :class="[
        'inline-block px-4 py-2 cursor-pointer',
        selectedTab === 'review' ? 'border-b-2 border-black text-black' : 'text-gray-400'
      ]"
    >
      리뷰
    </li>
    
    <!-- 필요시 탭 계속 추가 가능 -->
  </ul>
</div>
    <div class="content">
      <DealPanel
        v-if="selectedTab === 'deal'"
        :deals-list="dealsList"
        :current-page="currentPage"
        :is-last-page="isLastPage"
        @go-page="$emit('go-page', $event)"
      />
      <AiReportPanel v-else-if="selectedTab === 'repo'" />
      <AptReviewPanel v-else-if="selectedTab === 'review'" :apt-seq="aptSeq" /> <!-- 리뷰 탭 -->
      <CommercialChartPanel v-else-if="selectedTab === 'CommercialChartPanel'" :selected-coords="selectedCoords"/> <!-- 리뷰 탭 -->

    </div>
  </div>
</template>

<script setup>
import { ref, toRef, defineProps } from "vue";
import DealPanel from "./LatestDealPanel.vue";
import AiReportPanel from "./AiReportPanel.vue";
import AptReviewPanel from "./AptReviewPanel.vue"; 
import CommercialChartPanel from "./CommercialChartPanel.vue";
import "@/assets/css/TabBar.css";
// import { markRaw } from "vue";

const props = defineProps({
  dealsList: { type: Array, default: () => [] },
  currentPage: { type: Number, required: true },
  isLastPage: { type: Boolean, required: true },
  aptSeq: { type: String, required: true },
  selectedCoords: {
    type: Object,
    required: true,
  }
});



const dealsList = toRef(props, "dealsList");
console.log("tabBarView dealsList : ", dealsList.value);
const currentPage = toRef(props, "currentPage");
const isLastPage = toRef(props, "isLastPage");


const selectedTab = ref("CommercialChartPanel");
function changeTab(tab) {
  selectedTab.value = tab;
}

const tabScrollRef = ref(null);
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

function startDrag(e) {
  isDragging = true;
  startX = e.pageX - tabScrollRef.value.offsetLeft;
  scrollLeft = tabScrollRef.value.scrollLeft;
}

function onDrag(e) {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - tabScrollRef.value.offsetLeft;
  const walk = (x - startX) * 1.5; // 스크롤 속도
  tabScrollRef.value.scrollLeft = scrollLeft - walk;
}

function stopDrag() {
  isDragging = false;
}

</script>

<style scoped>
/* 스크롤바 감추기 (Tailwind 3+) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
