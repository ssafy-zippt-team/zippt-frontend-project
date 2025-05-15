<template>
  <AddressSelector />
  <div ref="mapContainer" class="map">
    <AptDetailPanel
      :apt="selectedApt"
      @close="clearDetail"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import AddressSelector from "./AddressSelector.vue";
import AptDetailPanel   from "./AptDetailPanel.vue";
import useAddress from "../composables/useAddress";
// import useMarkerController from "../composables/useMarkerController";
import { makeMap } from "../util/map/makeMap";
import useViewHouses    from "../composables/useViewHouses";
import useAptDetail     from "../composables/useAptDetail";

const mapContainer = ref(null);
const kakaoMap = ref(null);
const APP_KEY = process.env.VUE_APP_KAKAO_APPKEY;
const address = useAddress(kakaoMap);

// ① address 상태 공유
provide("address", address);

// kakaoMap ref 를 하위 컴포넌트 전역(scope)에 제공
provide("kakaoMap", kakaoMap);

// --- Apt 상세 조회 훅 ---
const { selectedApt, loadDetail, clearDetail } = useAptDetail();

// --- 지도 + 오버레이(마커) 관리 훅 ---
// onMarkerClick 콜백으로 바로 loadDetail 호출
const { updateMarkersByView, bindIdle } = useViewHouses(kakaoMap, {
  onMarkerClick: apt => loadDetail(apt.aptSeq)
});

onMounted(async () => {
  // 1. 맵 초기화
  kakaoMap.value = await makeMap({
    container: mapContainer,
    appKey: APP_KEY,
    center: { lat: 35.0936, lng: 128.8542 },
    level: 3,
    markers: [],
  });
  // 3) 초기 한 번 호출
  updateMarkersByView();
  
  // 4) idle 이벤트 바인딩 → 드래그/줌/리사이즈 시마다 호출
  bindIdle();
});
// 2. 마커 컨트롤러 훅 등록
// useMarkerController(kakaoMap, address);

</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>

