<template>
  
  <SearchBox @search="onKeywordSearch" />

  <AddressSelector />
  <div class="absolute top-28 right-4 bg-white rounded-md shadow-md flex flex-col overflow-hidden z-10">
      <button
        @click="showList"
        class="w-10 h-10 flex items-center justify-center border-b border-gray-200 hover:bg-gray-100"
        >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#115C5E"><path d="M80-160v-160h160v160H80Zm240 0v-160h560v160H320ZM80-400v-160h160v160H80Zm240 0v-160h560v160H320ZM80-640v-160h160v160H80Zm240 0v-160h560v160H320Z"/></svg>
      </button>
      <button
        @click="zoomIn"
        class="w-10 h-10 flex items-center justify-center border-b border-gray-200 hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="30px" fill="#115C5E"><path d="M432.12-431.88H174.15v-96.44h257.97v-258.91h96.43v258.91h257.68v96.44H528.55v257.3h-96.43v-257.3Z"/></svg>
      </button>
      <button
        @click="zoomOut"
        class="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#115C5E"><path d="M174.15-431.88v-96.44h612.08v96.44H174.15Z"/></svg>
      </button>
  </div>

  <div ref="mapContainer" class="map">
    <AptListPanel
      v-if="showListView && aptListRef.length"
      :apt-list="aptListRef"
      @select-apt="loadDetail"
      class="absolute top-0 left-0 h-full"
    />
    <AptDetailPanel
      :selected-apt="selectedApt"
      :deals-list="dealsList"
      :current-page="currentPage"
      :is-last-page="isLastPage"
      :similar-items="similarItems"
      :apt-seq="selectedApt?.aptSeq"
      :selected-coords="selectedCoords"
      :load-detail="loadDetail"
      :kakao-map="kakaoMap"
      @close="clearDetail"
      @go-page="handlePage"
      :style="{ left: (showListView && aptListRef.length) ? '240px' : '0px' }"
    />
    <BottomInfo
       :load-detail="loadDetail"
      :kakao-map="kakaoMap"
    />
  </div>
  
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import { useRoute } from "vue-router";
import SearchBox from "@/components/Map/SearchBox.vue";
import AddressSelector from "@/components/Map/AddressSelector.vue";
import AptListPanel from "@/components/Map/AptListPanel.vue";
import AptDetailPanel from "@/components/Map/AptDetailPanel.vue";
import BottomInfo from "@/components/main/BottomInfo.vue"
import useAddress from "@/composables/useAddress";
import { makeMap } from "@/util/map/makeMap";
import useViewHouses from "@/composables/useViewHouses";
import useAptDetail from "@/composables/useAptDetail";
import useSearchLocation from "@/composables/useSearchLocation";
import { fetchBoundary } from "@/util/map/fetchBoundary";
import { drawPolygons } from "@/util/map/drawPolygons";
import useSimilarApt from "@/composables/useSimilarApt";
import { warning } from "@/util/alert/warningAlert";

const mapContainer = ref(null);
const kakaoMap = ref(null);
const APP_KEY = process.env.VUE_APP_KAKAO_APPKEY;
const address = useAddress(kakaoMap);
const showListView = ref(false);
const route = useRoute();


const { cityList, selectedCity, selectedGu, selectedDong } = address;

// ① address 상태 공유
provide("address", address);

// 검색 훅
const { searchLocation } = useSearchLocation(kakaoMap);
// const { showSimilarApts } = useSimilarApt();


// kakaoMap ref 를 하위 컴포넌트 전역(scope)에 제공
provide("kakaoMap", kakaoMap);


// --- Apt 상세 조회 훅 ---
const { selectedApt, 
  dealsList, 
  currentPage, 
  isLastPage, 
  loadDetail, 
  clearDetail, 
  loadLatest,
  similarItems, 
  selectedCoords } = useAptDetail();
  
const { showSimilarApts } = useSimilarApt(loadDetail);


function handlePage(page) {
  console.log("selectedApt.aptSeq : ", selectedApt.value.aptSeq);
  if (!selectedApt || !selectedApt.value.aptSeq) return;
  loadLatest(selectedApt.value.aptSeq, page);
}
provide("selectedApt", selectedApt);
provide("dealsList", dealsList);
provide("currentPage", currentPage);
provide("isLastPage", isLastPage);

// --- 지도 + 오버레이(마커) 관리 훅 ---
// const { updateMarkersByView, bindIdle } = useViewHouses(kakaoMap, {
const { aptListRef, updateMarkersByView } = useViewHouses(kakaoMap, {
  onMarkerClick: (apt) => loadDetail(apt),
  selectedDong: address.selectedDong,
});

let boundaryPolygons = [];
let lastType = null;
function getType(level) {
  if (level >= 12) return "sido";
  if (level >= 9) return "sigungu";
  if (level >= 5) return "dong";
  // 4렙 이하 폴리곤 제거 및 미생성
  return "delete";
}

/** 경계(폴리곤) 갱신 */
async function updateBoundaries() {
  const mapInst = kakaoMap.value;
  if (!mapInst) return;

  // 1) 레벨 기준 경계 피처 로드
  const level = mapInst.getLevel();

  const type = getType(level);
  // ── 여기가 2) 불필요한 재렌더링 방지 지점 ──
  if (type === lastType) return;

  lastType = type;

  const features = await fetchBoundary(level);

  // 2) 기존 폴리곤 제거
  boundaryPolygons.forEach((poly) => poly.setMap(null));
  boundaryPolygons = [];

  if (lastType === "delete") return;

  // 3) 새 폴리곤 그리기
  boundaryPolygons = drawPolygons({
    mapInstance: mapInst,
    features,
    onClick: async (feature) => {
      console.log(feature.properties);
      const level = mapInst.getLevel();
      const props = feature.properties;

      // ─── 1) 시도 단계 (level ≥ 12) ───────────────────────
      if (level >= 12) {
        // province name 필드(예: CTP_KOR_NM 혹은 sidonm)를 확인해서 city 세팅
        const cityName = props.CTP_KOR_NM || props.sidonm;
        const city = cityList.value.find((c) => c.cityName === cityName);
        if (city) {
          selectedCity.value = city.citySeq;
          selectedGu.value = "";
          selectedDong.value = "";
        }
        return;
      }

      // ─── 2) 시군구 단계 (9 ≤ level ≤ 11) ───────────────
      if (level >= 9) {
        // 1) 시 세팅
        const cityName = props.CTP_KOR_NM || props.sidonm;
        const city = cityList.value.find((c) => c.cityName === cityName);
        if (!city) return;
        selectedCity.value = city.citySeq;
      }
    },
  });
}

onMounted(async () => {
   console.log("🧪 mapContainer:", mapContainer.value); // null이면 문제
  // 1. 맵 초기화
  kakaoMap.value = await makeMap({
    container: mapContainer,
    appKey: APP_KEY,
    center: { lat: 36.4687, lng: 127.9099 },
    level: 12,
    markers: [],
  });
  const mapInst = kakaoMap.value;
   

 
  if (!kakaoMap.value) {
    console.error("❌ kakaoMap 생성 실패!");
    return;
  }

  console.log("✅ kakaoMap 생성됨:", kakaoMap.value);
  
  // 2) 초기 경계 그리기
  await updateBoundaries();

  // 3) 줌/이동(idle) 때마다
  window.kakao.maps.event.addListener(mapInst, "idle", () => {
    updateMarkersByView();
    updateBoundaries();
    // const level = mapInst.getLevel();
    // if (level <= 4) {
    //   // 2) 기존 폴리곤 제거
    //   boundaryPolygons.forEach((poly) => poly.setMap(null));
    //   boundaryPolygons = [];
    // }
  });

  



  // // 3) 초기 한 번 호출
  // updateMarkersByView();

  // // 4) idle 이벤트 바인딩 → 드래그/줌/리사이즈 시마다 호출
  // bindIdle();

  const { term, isApartment } = route.query;
  if (term) {
    // isApartment는 "1" 또는 "0"
    await onKeywordSearch({
      term: String(term),
      isApartment: isApartment === "1",
    });
  }

  const stored = localStorage.getItem('selectedRecentApt');
  if (stored) {
    console.log("stored: " , stored);
    const apt = JSON.parse(stored);
    localStorage.removeItem('selectedRecentApt');

    kakaoMap.value.setCenter(new window.kakao.maps.LatLng(apt.latitude, apt.longitude));
    // kakaoMap.value.setCenter(new window.kakao.maps.LatLng(36.4687, 127.9099));

    kakaoMap.value.setLevel(4);

    loadDetail(apt); // 자동 상세패널 열기
  }

});
function zoomIn() {
  if (!kakaoMap.value) return;
  kakaoMap.value.setLevel(kakaoMap.value.getLevel() - 1);
}

// 축소 함수
function zoomOut() {
  if (!kakaoMap.value) return;
  kakaoMap.value.setLevel(kakaoMap.value.getLevel() + 1);
}

// 리스트패널 view/hide
function showList() {
  showListView.value = !showListView.value
}

async function onKeywordSearch({ term, isApartment }) {
  // 빈 입력 무시
  if (!term) return;

  if (!isApartment) {
    try {
      await searchLocation(term, 4);
      updateMarkersByView();
    } catch (err) {
      warning(err.message);
    }
  } else {
    await showSimilarApts(term, kakaoMap.value);
  }
}
</script>

<style scoped>
.map {
  @apply relative;
  width: 100%;
  height: 800px;
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 300,
  'GRAD' 0,
  'opsz' 24
}
</style>
