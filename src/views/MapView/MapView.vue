<template>
  <SearchBox @search="onKeywordSearch" />

  <AddressSelector />

  <div ref="mapContainer" class="map">
    <AptDetailPanel :apt="selectedApt" :deals-list="dealsList" @close="clearDetail" />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import SearchBox from "./SearchBox.vue";
import AddressSelector from "./AddressSelector.vue";
import AptDetailPanel from "./AptDetailPanel.vue";
import useAddress from "@/composables/useAddress";
import { makeMap } from "@/util/map/makeMap";
import useViewHouses from "@/composables/useViewHouses";
import useAptDetail from "@/composables/useAptDetail";
import useSearchLocation from "@/composables/useSearchLocation";
import { fetchBoundary } from '@/util/map/fetchBoundary';
import { drawPolygons }   from '@/util/map/drawPolygons';

const mapContainer = ref(null);
const kakaoMap = ref(null);
const APP_KEY = process.env.VUE_APP_KAKAO_APPKEY;
const address = useAddress(kakaoMap);

// ① address 상태 공유
provide("address", address);

// 검색 훅
const { search } = useSearchLocation(kakaoMap);

// kakaoMap ref 를 하위 컴포넌트 전역(scope)에 제공
provide("kakaoMap", kakaoMap);

// --- Apt 상세 조회 훅 ---
const { selectedApt, dealsList, loadDetail, clearDetail } = useAptDetail();
provide("dealsList", dealsList);

// --- 지도 + 오버레이(마커) 관리 훅 ---
// const { updateMarkersByView, bindIdle } = useViewHouses(kakaoMap, {
const { updateMarkersByView } = useViewHouses(kakaoMap, {
  onMarkerClick: (apt) => loadDetail(apt),
  selectedDong: address.selectedDong,
});

let boundaryPolygons = [];

/** 경계(폴리곤) 갱신 */
async function updateBoundaries() {
  const mapInst = kakaoMap.value;
  if (!mapInst) return;

  // 1) 레벨 기준 경계 피처 로드
  const level    = mapInst.getLevel();
  const features = await fetchBoundary(level);

  // 2) 기존 폴리곤 제거
  boundaryPolygons.forEach(poly => poly.setMap(null));
  boundaryPolygons = [];

  // 3) 새 폴리곤 그리기
  boundaryPolygons = drawPolygons({
    mapInstance: mapInst,
    features,
    onClick: feature => {
      console.log('클릭된 feature:', feature.properties);
      // 필요 시 address.selectedDong.value = ...
    },
  });
}

onMounted(async () => {
  // 1. 맵 초기화
  kakaoMap.value = await makeMap({
    container: mapContainer,
    appKey: APP_KEY,
    center: { lat: 36.4687, lng: 127.9099 },
    level: 12,
    markers: [],
  });
  const mapInst = kakaoMap.value;

  // 2) 초기 경계 그리기
  await updateBoundaries();

  // 3) 줌/이동(idle) 때마다
  window.kakao.maps.event.addListener(mapInst, 'idle', () => {
    updateMarkersByView();
    updateBoundaries();
  });

  // // 3) 초기 한 번 호출
  // updateMarkersByView();

  // // 4) idle 이벤트 바인딩 → 드래그/줌/리사이즈 시마다 호출
  // bindIdle();
});

// 검색어로 위치 이동 + 마커 갱신
async function onKeywordSearch(keyword) {
  try {
    // ① 검색 → center & level 변경
    await search(keyword, 4);
    // ② 마커 갱신
    updateMarkersByView();
  } catch (err) {
    alert(err.message);
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>
