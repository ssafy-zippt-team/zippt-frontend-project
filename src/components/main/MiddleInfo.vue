<template>
  <div class="flex justify-between gap-8 w-full max-w-[1200px] mx-auto mb-16">
    <!-- 왼쪽 파란 박스 -->
    <div
      class="relative flex flex-col justify-between w-[48%] min-w-[340px] h-[312px] px-9 py-10 rounded-[14px] text-white bg-[#115C5E] overflow-hidden"
    >
      <div>
        <strong class="block leading-[32px] text-[22px] font-semibold">
          <em class="not-italic text-[32px] mr-1">아파트</em>·오피스텔·분양권
        </strong>
        <p class="mt-4 leading-[25px] text-[15px]">
          매매, 전세, 월세 매물을 시세 및 실거래가 정보와 함께<br />지도에서 쉽게 확인하세요!
        </p>
      </div>

      <!-- 매물 찾기 버튼 -->
      <div class="mt-8 flex">
        <router-link
          to="/map"
          class="group relative overflow-hidden mr-4 w-[11.2rem] h-[42px] border border-white/50 rounded bg-transparent text-white text-[17px] font-normal shadow-none flex items-center justify-center transition-colors duration-500 ease-in-out"
        >
          <span class="relative z-10 transition-colors duration-300 group-hover:text-[#115C5E]">매물 찾기</span>
          <span
            class="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
          ></span>
        </router-link>
      </div>

      <!-- SVG 아이콘 -->
      <svg
        class="absolute right-5 bottom-3 w-[200px] h-[200px] opacity-20"
        fill="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 10L12 3l9 7v10a2 2 0 01-2 2h-2v-6H7v6H5a2 2 0 01-2-2V10z" />
      </svg>
    </div>

    <!-- 오른쪽 흰색 박스 -->
    <div class="w-[48%] min-w-[340px] h-[312px] rounded-[14px] bg-white flex items-center justify-center shadow-sm">
      <div class="text-center">
        <h2 class="text-2xl font-semibold text-[#115C5E] mb-4">여기에 차트/그래프가 들어갑니다</h2>
        <p class="text-gray-600">그래프나 통계, 실거래가 등 데이터 시각화 영역으로 사용할 수 있습니다.</p>
      </div>
    </div>
  </div>
</template>
