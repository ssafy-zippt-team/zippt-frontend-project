<template>
  <div class="tab-panel">
    <ul class="tab-menu">
      <li @click="changeTab('deal')" :class="['px-4 py-2 cursor-pointer', selectedTab === 'deal' ? 'active' : '']">
        <a>실거래가</a>
      </li>
      <li @click="changeTab('repo')" :class="['px-4 py-2 cursor-pointer', selectedTab === 'repo' ? 'active' : '']">
        <a>AI 레포트</a>
      </li>
    </ul>
    <div class="content">
      <DealPanel
        v-if="selectedTab === 'deal'"
        :deals-list="dealsList"
        :current-page="currentPage"
        :is-last-page="isLastPage"
        @prev-page="$emit('prev-page')"
        @next-page="$emit('next-page')"
      />
      <AiReportPanel v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, toRef, defineProps } from "vue";
import DealPanel from "./LatestDealPanel.vue";
import AiReportPanel from "./AiReportPanel.vue";
import "@/assets/css/TabBar.css";
// import { markRaw } from "vue";

const props = defineProps({
  dealsList: { type: Array, default: () => [] },
  currentPage: { type: Number, required: true },
  isLastPage: { type: Boolean, required: true },
});

const dealsList = toRef(props, "dealsList");
console.log("tabBarView dealsList : ", dealsList.value);
const currentPage = toRef(props, "currentPage");
const isLastPage = toRef(props, "isLastPage");

const selectedTab = ref("deal");
function changeTab(tab) {
  selectedTab.value = tab;
}

// export default {
//   name: "TabPage",

//   components: { Deal, Repo },
//   props: {
//     dealsList: {
//       type: Array,
//       default: () => [],
//     },
//   },
//   data() {
//     return {
//       selectedTab: "deal",
//       // selectedComponent: Deal,
//       selectedComponent: markRaw(Deal),
//     };
//   },
//   methods: {
//     changeTab(tabName) {
//       this.selectedTab = tabName;
//       this.selectedComponent = tabName === "repo" ? markRaw(Repo) : markRaw(Deal);
//     },
//   },
// };
</script>
