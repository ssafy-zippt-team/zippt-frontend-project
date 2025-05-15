<template>
  <div class="controls">
    <select v-model="selectedCity" @focus="loadCities">
      <option disabled value="">시 선택</option>
      <option v-for="c in cityList" :key="c.citySeq" :value="c.citySeq">
        {{ c.cityName }}
      </option>
    </select>

    <select v-model="selectedGu" :disabled="!selectedCity">
      <option disabled value="">구 선택</option>
      <option v-for="g in guList" :key="g.guSeq" :value="g.guSeq">
        {{ g.guName }}
      </option>
    </select>

    <select v-model="selectedDong" :disabled="!selectedGu">
      <option disabled value="">동 선택</option>
      <option v-for="d in dongList" :key="d.dongSeq" :value="d.dongSeq">
        {{ d.dongName }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { inject, onMounted } from "vue";

const address = inject("address");

const { cityList, guList, dongList, selectedCity, selectedGu, selectedDong, loadCities } = address;
// 화면 로드 시(컴포넌트 마운트 시) 바로 시 목록 호출
onMounted(() => {
  loadCities();
});
</script>

<style scoped>
.controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
