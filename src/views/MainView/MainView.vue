<template>
  <div class="min-h-screen bg-[#f7f9fa]">
    <div class="container mx-auto px-4 py-2 flex flex-col items-center justify-center">
      <SearchBar />
      <!-- 앞으로 추가할 다른 컴포넌트들도 여기에 -->
      <!-- <SearchedList v-if="loggedIn"/> -->
      <MiddleInfo />
      <BottomInfo />
    </div>
  </div>
</template>

<script setup>
import SearchBar from "@/components/main/SearchBar.vue";
// import SearchedList from "@/components/main/SearchedList.vue"
import MiddleInfo from "@/components/main/MiddleInfo.vue";
import BottomInfo from "@/components/main/BottomInfo.vue";
// import { loggedIn } from "@/util/auth/auth";
</script>
