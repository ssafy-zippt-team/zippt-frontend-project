<template>
  <div class="address-selector-container">
    <!-- 시 -->
    <div class="address-selector-group">
      <div class="address-selector-wrapper">
        <select v-model="selectedCity" @focus="loadCities" class="address-selector-select custom-select">
          <option disabled value="">시/도</option>
          <option v-for="c in cityList" :key="c.citySeq" :value="c.citySeq">
            {{ c.cityName }}
          </option>
        </select>
        <svg class="address-selector-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- 구 -->
    <div class="address-selector-group">
      <div class="address-selector-wrapper">
        <select v-model="selectedGu" :disabled="!selectedCity" class="address-selector-select custom-select">
          <option disabled value="">시/군/구</option>
          <option v-for="g in guList" :key="g.guSeq" :value="g.guSeq">
            {{ g.guName }}
          </option>
        </select>
        <svg class="address-selector-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- 동 -->
    <div class="address-selector-group">
      <div class="address-selector-wrapper">
        <select v-model="selectedDong" :disabled="!selectedGu" class="address-selector-select custom-select">
          <option disabled value="">읍/면/동</option>
          <option v-for="d in dongList" :key="d.dongSeq" :value="d.dongSeq">
            {{ d.dongName }}
          </option>
        </select>
        <svg class="address-selector-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from "vue";
import "@/assets/css/AddressSelector.css";

const address = inject("address");
const { cityList, guList, dongList, selectedCity, selectedGu, selectedDong, loadCities } = address;

onMounted(() => {
  loadCities();
});
</script>

<style scoped>
.custom-select {
  @apply bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm
         focus:outline-none focus:ring-2 focus:ring-[#115C5E] focus:border-[#115C5E] transition;
  height: 2.5rem;
  padding-left: 0.75rem;
  padding-right: 2rem;
  font-size: 0.875rem;
}

.custom-select option:hover {
  background-color: #1a7d7f;
  color: #ffffff;
}
</style>
