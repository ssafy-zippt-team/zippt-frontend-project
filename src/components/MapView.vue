<template>
  <div ref="mapContainer" class="map"></div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import { makeMap } from "../util/map/makeMap";

const mapContainer = ref(null);
const kakaoMap     = ref(null);
const APP_KEY      = process.env.VUE_APP_KAKAO_APPKEY;

onMounted(async () => {
  kakaoMap.value = await makeMap({
    container: mapContainer,
    appKey:      APP_KEY,
    center:      { lat: 33.450701, lng: 126.570667 },
    level:       3,
    markers:     [],
  });
});

// AddressSelector 에서 사용할 수 있도록 provide
provide("kakaoMap", kakaoMap);
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>
