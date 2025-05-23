<template>
  <div class="search-box-container">
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

const isApartment = ref(false);
const keyword = ref("");

// eslint-disable-next-line no-undef

function onSubmit() {
  if (isApartment.value) {
    alert("[아파트] " + keyword.value);
  } else {
    alert("[장소] " + keyword.value);
  }
}
</script>
