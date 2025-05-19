<template>
  <div class="search-box-container">
    <div class="search-box-input-wrapper">
      <input
        v-model="query"
        @focus="isFocused = true"
        @blur="onBlur"
        @keyup.enter="onSearch"
        type="text"
        placeholder="장소를 입력하세요"
        class="search-box-input"
      />
      <!-- <button
        @click="onSearch"
        type="button"
        class="search-box-button"
      >
        <span class="text-gray-400 text-sm">🔍</span>
      </button> -->
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

// localStorage 히스토리 훅
const { history, add } = useSearchHistory();

// 제안 목록: 입력 비어있으면 전체 history, 아니면 부분 일치 필터
const suggestions = computed(() => {
  const q = debounced.value.trim().toLowerCase();
  const wrap = (label, idx) => ({ id: `h-${idx}`, label });
  if (!q) {
    return history.value.map((h, i) => wrap(h, i));
  }
  return history.value.filter((h) => h.toLowerCase().includes(q)).map((h, i) => wrap(h, i));
});

function onSearch() {
  const term = query.value.trim();
  if (!term) return;
  add(term); // 히스토리 저장
  emit("search", term);
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
