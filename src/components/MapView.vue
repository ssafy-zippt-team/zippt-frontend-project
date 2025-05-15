<template>
  <AddressSelector />
  <div ref="mapContainer" class="map"></div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import AddressSelector from "./AddressSelector.vue";
import useAddress from "../composables/useAddress";
import useMarkerController from "../composables/useMarkerController";
import { makeMap } from "../util/map/makeMap";

const mapContainer = ref(null);
const kakaoMap = ref(null);
const APP_KEY = process.env.VUE_APP_KAKAO_APPKEY;
const address = useAddress(kakaoMap);

// ① address 상태 공유
provide("address", address);

// kakaoMap ref 를 하위 컴포넌트 전역(scope)에 제공
provide("kakaoMap", kakaoMap);

onMounted(async () => {
  // 1. 맵 초기화
  kakaoMap.value = await makeMap({
    container: mapContainer,
    appKey: APP_KEY,
    center: { lat: 35.0936, lng: 128.8542 },
    level: 3,
    markers: [],
  });
});
// 2. 마커 컨트롤러 훅 등록
useMarkerController(kakaoMap, address);
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>
