<template>
  <div class="search-box-container">
    <!-- <div class="search-box-changebutton">
      <button :class="['mode-btn', mode === 'place' ? 'mode-btn--active' : '']" @click="setMode('place')">장소</button>
      <button :class="['mode-btn', mode === 'apt' ? 'mode-btn--active' : '']" @click="setMode('apt')">아파트</button>
    </div>
    <div class="search-box-input-wrapper">
      <input
        v-model="query"
        @focus="isFocused = true"
        @blur="onBlur"
        @keyup.enter="onSearch"
        :placeholder="placeholder"
        type="text"
        class="search-box-input"
      />
      <button @click="onSearch" class="search-box-button">
        <component :is="query ? SendIcon : SearchIcon" class="w-5 h-5" />
      </button>
    </div>

    <transition name="fade">
      <ul v-if="isFocused && suggestions.length" class="search-box-list">
        <li v-for="item in suggestions" :key="item.id" @mousedown.prevent="select(item.label)" class="search-box-item">
          <span class="text-sm">{{ item.label }}</span>
          <span class="text-gray-400 text-sm">🔍</span>
        </li>
      </ul>
    </transition> -->
    <div class="search-box-container">
      <form @submit.prevent="onSubmit">
        <div class="search-box-toggle">
          <span class="search-box-toggle-title">
            {{ isApartment ? "아파트" : "장소" }}
          </span>
          <ToggleSwitch v-model="isApartment" />
        </div>
        <input
          :placeholder="isApartment ? '아파트명 또는 단지명을 입력하세요' : '역명 또는 단지명을 입력하세요'"
          v-model="keyword"
          type="text"
          class="w-full pl-16 pr-10 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#115C5E] bg-white text-gray-800 placeholder:text-gray-400 text-[14px] shadow"
          autocomplete="off"
        />
        <button
          type="submit"
          class="search-box-button absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#115C5E] flex items-center justify-center hover:bg-[#187879] transition"
          style="box-shadow: 0 2px 8px rgba(17, 92, 94, 0.1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import useDebounce from "@/composables/useDebounce";
// import useSearchHistory from "@/composables/useSearchHistory";
import ToggleSwitch from "@/components/main/ToggleSwitch.vue";
import "@/assets/css/SearchBox.css";
// import { Search as SearchIcon, Send as SendIcon } from "lucide-vue-next";

const isApartment = ref(false);
const keyword = ref("");

// no-undef 경고 무시
// eslint-disable-next-line no-undef
// const emit = defineEmits(["search"]);

// const query = ref("");
// const debounced = useDebounce(query, 200);
// const isFocused = ref(false);

// 모드: 'place' | 'apt'
// const mode = ref("place");

// localStorage 히스토리 훅
// const { history, add } = useSearchHistory();

// placeholder
// const placeholder = computed(() => (mode.value === "place" ? "장소를 입력해주세요" : "아파트를 입력해주세요"));

// 제안 목록: 입력 비어있으면 전체 history, 아니면 부분 일치 필터
// const suggestions = computed(() => {
//   const q = debounced.value.trim().toLowerCase();
//   const wrap = (label, idx) => ({ id: `h-${idx}`, label });
//   if (!q) {
//     return history.value.map((h, i) => wrap(h, i));
//   }
//   return history.value.filter((h) => h.toLowerCase().includes(q)).map((h, i) => wrap(h, i));
// });

// function setMode(m) {
//   mode.value = m;
//   // 입력란 비우고 다시 포커스
//   query.value = "";
//   isFocused.value = false;
// }

// function onSearch() {
//   const term = query.value.trim();
//   if (!term) return;
//   add(term); // 히스토리 저장
//   // emit("search", term);
//   emit("search", { term, mode: mode.value });
//   isFocused.value = false;
// }

// function select(label) {
//   query.value = label;
//   onSearch();
// }

// function onBlur() {
//   setTimeout(() => {
//     isFocused.value = false;
//   }, 150);
// }

function onSubmit() {
  if (isApartment.value) {
    alert("[아파트] " + keyword.value);
  } else {
    alert("[장소] " + keyword.value);
  }
}
</script>
