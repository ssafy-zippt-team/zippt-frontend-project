<template>
  <div class="search-box-container">
    <div class="search-box-changebutton">
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
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import useDebounce from "@/composables/useDebounce";
import useSearchHistory from "@/composables/useSearchHistory";
import "@/assets/css/SearchBox.css";
import { Search as SearchIcon, Send as SendIcon } from "lucide-vue-next";

// no-undef 경고 무시
// eslint-disable-next-line no-undef
const emit = defineEmits(["search"]);

const query = ref("");
const debounced = useDebounce(query, 200);
const isFocused = ref(false);

// 모드: 'place' | 'apt'
const mode = ref("place");

// localStorage 히스토리 훅
const { history, add } = useSearchHistory();

// placeholder
const placeholder = computed(() => (mode.value === "place" ? "장소를 입력해주세요" : "아파트를 입력해주세요"));

// 제안 목록: 입력 비어있으면 전체 history, 아니면 부분 일치 필터
const suggestions = computed(() => {
  const q = debounced.value.trim().toLowerCase();
  const wrap = (label, idx) => ({ id: `h-${idx}`, label });
  if (!q) {
    return history.value.map((h, i) => wrap(h, i));
  }
  return history.value.filter((h) => h.toLowerCase().includes(q)).map((h, i) => wrap(h, i));
});

function setMode(m) {
  mode.value = m;
  // 입력란 비우고 다시 포커스
  query.value = "";
  isFocused.value = false;
}

function onSearch() {
  const term = query.value.trim();
  if (!term) return;
  add(term); // 히스토리 저장
  // emit("search", term);
  emit("search", { term, mode: mode.value });
  isFocused.value = false;
}

function select(label) {
  query.value = label;
  onSearch();
}

function onBlur() {
  setTimeout(() => {
    isFocused.value = false;
  }, 150);
}
</script>
