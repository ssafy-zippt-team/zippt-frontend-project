<template>
  <div class="flex flex-col items-center w-full mb-6 mt-10">
    <h1 class="text-[32px] font-normal text-[#23272E] text-center">
      어떤 <span class="font-bold">매물</span>을 <span class="font-bold">찾고</span> 계시나요?
    </h1>
  </div>
  <div class="w-[1300px] pb-[30px]">
    <form
      @submit.prevent="onSearch"
      class="w-full max-w-2xl mx-auto relative flex items-center"
      style="margin-top: 40px"
    >
      <div class="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <span class="mb-1 text-[14px] font-semibold text-[#115C5E] select-none">
          {{ isApartment ? "아파트" : "장소" }}
        </span>
        <ToggleSwitch v-model="isApartment" />
      </div>
      <input
        :placeholder="isApartment ? '아파트명 또는 단지명을 입력하세요' : '역명 또는 단지명을 입력하세요'"
        v-model="keyword"
        type="text"
        class="w-full pl-24 pr-16 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#115C5E] bg-white text-gray-800 placeholder:text-gray-400 text-[16px] shadow"
        autocomplete="off"
      />
      <button
        type="submit"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#115C5E] flex items-center justify-center hover:bg-[#187879] transition"
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
</template>

<script setup>
import { ref } from "vue";
import ToggleSwitch from "@/components/main/ToggleSwitch.vue";
import { useRouter } from "vue-router";

const isApartment = ref(false);
const keyword = ref("");
const router = useRouter();

// function onSubmit() {
//   if (isApartment.value) {
//     alert("[아파트] " + keyword.value);
//   } else {
//     alert("[장소] " + keyword.value);
//   }
// }
// const emit = defineEmits(["search"]);

function onSearch() {
  const term = keyword.value.trim();
  if (!term) return;
  router.push({
    path: "/map",
    query: {
      term,
      isApartment: isApartment.value ? "1" : "0",
    },
  });
}
</script>
