<template>
  <div class="address-selector-container">
    <!-- 시 -->
    <div class="address-selector-group">
      <div class="address-selector-wrapper">
        <select v-model="selectedCity" @focus="loadCities" class="address-selector-select">
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
        <select v-model="selectedGu" :disabled="!selectedCity" class="address-selector-select">
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
        <select v-model="selectedDong" :disabled="!selectedGu" class="address-selector-select">
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
import "../assets/css/AddressSelector.css";

const address = inject("address");

const { cityList, guList, dongList, selectedCity, selectedGu, selectedDong, loadCities } = address;
// 화면 로드 시(컴포넌트 마운트 시) 바로 시 목록 호출
onMounted(() => {
  loadCities();
});
</script>
