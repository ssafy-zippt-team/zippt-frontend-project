<template>
  <div class="flex justify-between gap-8 w-full max-w-[1200px] mx-auto mb-16">
    <!-- 왼쪽: 최근 본 아파트 -->
    <div class="w-[48%] min-w-[340px] h-[340px] rounded-[14px] bg-white shadow flex flex-col p-8">
      <div class="border-b border-[#e7e7e7]">
        <h2 class="text-xl font-bold text-[#115C5E] mb-4">최근 본 아파트</h2>
      </div>
      <div class="flex-1 flex items-center justify-center text-gray-400">최근 본 아파트가 없습니다.</div>
      <!--
        최근 본 아파트 데이터가 있을 때 아래처럼 보여주면 됩니다.
        <ul>
          <li>아파트명1 ...</li>
          <li>아파트명2 ...</li>
        </ul>
        -->
    </div>

    <!-- 오른쪽: 오늘의 NEWS + 뉴스리스트 -->
    <div class="w-[48%] min-w-[340px] h-[340px] rounded-[14px] bg-white shadow flex flex-col p-8">
      <div class="border-b border-[#e7e7e7]">
        <h2 class="text-xl font-bold text-[#115C5E] mb-4">오늘의 NEWS</h2>
      </div>
      <div class="flex-1 overflow-y-auto pr-2">
        <ul class="space-y-5">
          <li v-for="item in newsItems" :key="item.link">
            <a
              :href="item.link"
              class="block text-base font-semibold text-[#23272E] hover:text-[#115C5E] transition"
              target="_blank"
              rel="noopener noreferrer"
              v-html="item.title"
            />
            <p class="text-gray-500 text-sm mt-1 line-clamp-2" v-html="item.description"></p>
            <span class="block text-xs text-gray-400 mt-1">{{ formatDate(item.pubDate) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// 네이버 뉴스 API에서 받아올 데이터
const newsItems = ref([]);

// 날짜 포맷 함수
function formatDate(pubDate) {
  // pubDate: "Fri, 23 May 2025 14:20:00 +0900"
  return new Date(pubDate).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

onMounted(() => {
  axios
    .get("/v1/search/news.json", {
      params: {
        query: "부동산",
        display: 5,
        sort: "date",
      },
      headers: {
        "X-Naver-Client-Id": process.env.VUE_APP_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.VUE_APP_NAVER_CLIENT_SECRET,
      },
    })
    .then((res) => {
      newsItems.value = res.data.items;
    })
    .catch((err) => {
      newsItems.value = [];
      console.error("네이버 뉴스 API 호출 에러:", err);
    });
});
</script>
