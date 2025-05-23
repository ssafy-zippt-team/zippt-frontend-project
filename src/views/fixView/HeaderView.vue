<template>
  <header class="bg-white shadow sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <div class="flex items-center">
        <!-- 로고 클릭 시 홈으로 이동 -->
        <router-link to="/" class="h-16 w-44 flex items-center">
          <img src="@/assets/img/zipptLogo.png" alt="Zippt Logo" class="w-full h-full object-contain" />
        </router-link>
      </div>
      <nav class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-700 hover:text-[#115C5E] font-medium text-base transition">홈</a>
        <a href="#" class="text-gray-700 hover:text-[#115C5E] font-medium text-base transition">서비스</a>
        <a href="#" class="text-gray-700 hover:text-[#115C5E] font-medium text-base transition">프로젝트</a>
        <a href="#" class="text-gray-700 hover:text-[#115C5E] font-medium text-base transition">문의</a>
      </nav>
      <div>
        <!-- 로그인 전 -->
        <div v-if="!loggedIn" class="flex items-center space-x-4">
          <!-- 기존 단순 텍스트 버튼 대신 스타일 추가 -->
          <button
            @click="$router.push('/login')"
            class="h-9 px-4 border border-gray-200 text-gray-800 rounded-full font-medium transition hover:bg-gray-100"
          >
            로그인
          </button>
          <button
            @click="$router.push('/signup')"
            class="h-9 px-4 bg-[#115C5E] text-white rounded-full font-medium transition hover:bg-teal-900"
          >
            회원가입
          </button>
        </div>

        <!-- 로그인 후 -->
        <div v-else class="flex items-center space-x-4">
          <span class="text-gray-700 font-semibold">{{ username }}님</span>
          <button
            @click="logoutAndReload"
            class="h-9 px-4 border border-gray-200 text-gray-800 rounded-full font-medium transition hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<!-- <script>
import { ref, onMounted } from "vue";
import { isLoggedIn, getUsername, logout } from "@/util/auth/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const loggedIn = ref(false);
    const username = ref("");

    // 마운트 직후, 서비스 상태 반영
    onMounted(() => {
      loggedIn.value = isLoggedIn();
      username.value = getUsername();
    });

    const logoutAndReload = async () => {
      // 1) 백엔드에도 호출하고
      await logout();
      // 2) 현재 페이지 새로고침
      router.go(0);
    };

    return { loggedIn, username, logoutAndReload };
  },
};
</script> -->

<script setup>
import { loggedIn } from "@/util/auth/auth";
import { getUsername, logout } from "@/util/auth/auth";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = computed(() => getUsername());

function logoutAndReload() {
  logout().then(() => router.go(0));
}
</script>
