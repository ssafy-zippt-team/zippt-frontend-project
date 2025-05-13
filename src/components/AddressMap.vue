<template>
  <!-- ② 주소 선택 UI -->
  <AddressSelector />
  <!-- ① 맵 컨테이너 먼저 렌더링 -->
  <div ref="mapContainer" class="map"></div>
  
</template>
  
  <script setup>
  import { ref, onMounted, provide } from "vue";
  import AddressSelector from "./AddressSelector.vue";
  import { makeMap } from "../util/map/makeMap";
  
  const mapContainer = ref(null);
  const kakaoMap     = ref(null);
  const APP_KEY      = process.env.VUE_APP_KAKAO_APPKEY;
  
  // kakaoMap ref 를 하위 컴포넌트 전역(scope)에 제공
  provide("kakaoMap", kakaoMap);
  
  onMounted(async () => {
    kakaoMap.value = await makeMap({
      container: mapContainer,
      appKey:      APP_KEY,
      center:      { lat: 33.450701, lng: 126.570667 },
      level:       3,
      markers:     [],
    });
  });
</script>
  
<style scoped>
  .map {
    width: 100%;
    height: 800px;
  }
</style>


