<template>
  <div v-if="recentSearches.length" class="flex flex-row items-center w-full max-w-[1200px] mx-auto mb-6">
    <h2 class="self-start text-lg font-semibold mb-2 px-4">최근검색어</h2>
    <div class="flex flex-wrap flex-initial gap-5 mb-2">
      <template v-for="(word, idx) in recentSearches" :key="idx">
        <span
          class="flex items-center bg-slate-200 text-gray-500 text-sm px-3 py-1 rounded-full cursor-pointer"
          @click="wordClick(word)"
        >
          {{ word }}
          <button @click="removeSearch(word)" class="ml-1 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-gray-500 hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      </template>
      <!-- <div v-if="!recentSearches.length" class="text-gray-400 text-sm">
        검색 이력이 없습니다.
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import { getSearched, deleteSearchedWord } from "@/api/cacheForSearch";

const recentSearches = ref([]);
// 초기 로드
async function fetchRecent() {
  try {
    const { data } = await getSearched();
    if (data.isSuccess && Array.isArray(data.result)) {
      recentSearches.value = data.result.map((o) => o.searchWord);
    }
  } catch (e) {
    console.error("최근 검색어 조회 실패", e);
  }
}

const emit = defineEmits(["selectedWord"]);

function wordClick(word) {
  emit("selectedWord", word);
}

onMounted(fetchRecent);

// 삭제 후 재조회
async function removeSearch(word) {
  try {
    await deleteSearchedWord(word);
    // 삭제가 성공하면 다시 리스트를 가져옵니다
    await fetchRecent();
  } catch (e) {
    console.error("최근 검색어 삭제 실패", e);
  }
}
</script>
