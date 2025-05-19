<template>
  <div class="tab-panel">
    <ul class="tab-menu">
      <li @click="changeTab('deal')" :class="{ active: selectedTab === 'deal' }">
        <a>실거래가</a>
      </li>
      <li @click="changeTab('repo')" :class="{ active: selectedTab === 'repo' }">
        <a>AI 레포트</a>
      </li>
    </ul>
    <div class="content">
      <component :is="selectedComponent" :dealsList="dealsList" />
    </div>
  </div>
</template>

<script>
import Deal from "./LatestDealPanel.vue";
import Repo from "./AiReportPanel.vue";
import "@/assets/css/TabBar.css";
import { markRaw } from "vue";

export default {
  name: "TabPage",

  components: { Deal, Repo },
  props: {
    dealsList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedTab: "deal",
      // selectedComponent: Deal,
      selectedComponent: markRaw(Deal),
    };
  },
  methods: {
    changeTab(tabName) {
      this.selectedTab = tabName;
      this.selectedComponent = tabName === "repo" ? markRaw(Repo) : markRaw(Deal);
    },
  },
};
</script>
