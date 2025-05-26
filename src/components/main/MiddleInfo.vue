<template>
  <div class="flex justify-between gap-8 w-full max-w-[1200px] mx-auto mb-16">
    <!-- 왼쪽 파란 박스 -->
    <div
      class="relative flex flex-col justify-between w-[48%] min-w-[340px] h-[312px] px-9 py-10 rounded-[14px] text-white bg-[#115C5E] overflow-hidden"
    >
      <div>
        <strong class="block leading-[32px] text-[22px] font-semibold">
          <em class="not-italic text-[32px] mr-1">아파트</em>·오피스텔·빌라
        </strong>
        <p class="mt-4 leading-[25px] text-[15px]">
          전국의 아파트 매매 정보를 지도에서 쉽게 확인하세요 !<br />
          거래내역, 리뷰, 상권정보를 참고한 AI의 요약 및 평가 기능도 사용해보세요.
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

    <!-- 오른쪽 흰색 박스(그래프 자리) -->
    <div
      class="w-[48%] min-w-[340px] h-[312px] rounded-[14px] bg-white flex flex-col items-center justify-start shadow-sm pt-4"
    >
      <h2 class="text-2xl font-semibold text-[#115C5E] mb-2">{{ currentYear }}년 광역시별 매물 통계</h2>
      <div class="w-full h-full">
        <Chart :data="chartData" :options="chartOptions" style="height: 100%; width: 100%" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "vue-chartjs";
import { getAvgPriceStat, getDealCountStat } from "@/api/dealsApi";

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
const currentYear = new Date().getFullYear();

const chartData = ref({
  labels: [],
  datasets: [],
});

const chartOptions = {
  responsive: true,
  layout: {
    padding: {
      top: 10,
      bottom: 20,
      left: 10,
      right: 10,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y1: {
      type: "linear",
      position: "left",
      align: "start",
      title: {
        display: true,
        text: "매매가 (억)",
      },
      ticks: {
        callback: (value) => `${(value / 10000).toFixed(1)}억`,
      },
    },
    y2: {
      type: "linear",
      position: "right",
      align: "start",
      title: {
        display: true,
        text: "거래 건수 (건)",
      },
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        callback: (value) => `${value.toLocaleString()}건`,
      },
    },
  },
};

const regionMap = {
  seoul: "서울",
  busan: "부산",
  ulsan: "울산",
  daegu: "대구",
  incheon: "인천",
  gwangju: "광주",
  daejeon: "대전",
};

onMounted(async () => {
  try {
    const [avgRes, cntRes] = await Promise.all([getAvgPriceStat(), getDealCountStat()]);

    const regions = Object.keys(avgRes.data.result).map((code) => regionMap[code] || code);
    const avgValues = Object.values(avgRes.data.result);
    const cntValues = Object.values(cntRes.data.result);

    chartData.value = {
      labels: regions,
      datasets: [
        {
          type: "bar",
          label: "평균 매매가 (억)",
          data: avgValues,
          backgroundColor: "rgba(75,192,192,0.6)",
          yAxisID: "y1",
        },
        {
          type: "line",
          label: "거래 건수 (건)",
          data: cntValues,
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderWidth: 2,
          tension: 0.3,
          yAxisID: "y2",
        },
      ],
    };
  } catch (err) {
    console.error("차트 데이터 로딩 실패:", err);
  }
});
</script>

<style scoped></style>
