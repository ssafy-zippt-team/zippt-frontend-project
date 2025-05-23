<script setup>
import { toRef, ref, watchEffect, defineProps } from "vue"
import { getCommercialStats } from "@/api/commercialApi"
import { Pie } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, ArcElement)

// props 선언
const props = defineProps({
  selectedCoords: {
    type: Object,
    required: false
  }
})
const coords = toRef(props, "selectedCoords")

// 차트 데이터 상태
const chartData = ref({
  labels: [],
  datasets: [{
    label: "업종별 상권 수",
    data: [],
    backgroundColor: []
  }]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "상권 업종 통계"
    },
    legend: {
      position: "bottom"
    }
  }
}

// coords 변경 감지 후 API 호출
watchEffect(async () => {
  if (!coords.value || !coords.value.lat || !coords.value.lng) return

  try {
    const { data } = await getCommercialStats({
      cx: coords.value.lng,
      cy: coords.value.lat,
      radius: 1000
    })

    const map = data.result.categoryCountMap
    const labels = Object.keys(map)
    const values = Object.values(map)
    const colors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`)

    chartData.value = {
      labels,
      datasets: [{
        label: "업종별 상권 수",
        data: values,
        backgroundColor: colors
      }]
    }
  } catch (err) {
    console.error("❌ 상권 통계 조회 실패", err)
  }
})
</script>

<template>
  <div class="commercial-chart-panel">
    <div class="chart-container">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
.commercial-chart-panel {
  padding: 1rem;
  /* background-color: #f9f9f9; */
  /* border: 1px solid #ddd; */
  border-radius: 8px;
}

.chart-container {
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
}
</style>
