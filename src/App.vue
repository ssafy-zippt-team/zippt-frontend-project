<template>
  <div class="flex flex-col min-h-screen box-border">
    <!-- Header -->
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
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm">&copy; 2025 Zippt Team. All rights reserved.</p>
          <div class="mt-4 md:mt-0 flex space-x-6">
            <a href="#" class="hover:text-white">이용약관</a>
            <a href="#" class="hover:text-white">개인정보처리방침</a>
            <a href="#" class="hover:text-white">고객센터</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
