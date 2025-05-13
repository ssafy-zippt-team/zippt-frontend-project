<template>
  <div ref="mapContainer" class="map"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getInfo } from "../util/map/Coordi";
import { makeMap } from "../util/map/makeMap";

const mapContainer = ref(null);
const APP_KEY = process.env.VUE_APP_KAKAO_APPKEY;

// 마커 데이터
const positions = [
  { title: "카카오", lat: 33.450705, lng: 126.570677 },
  { title: "생태연못", lat: 33.450936, lng: 126.569477 },
  { title: "텃밭", lat: 33.450879, lng: 126.56994 },
  { title: "근린공원", lat: 33.451393, lng: 126.570738 },
];

onMounted(async () => {
  try {
    const kakaoMap = await makeMap({
      container: mapContainer,
      appKey: APP_KEY,
      center: { lat: 33.450701, lng: 126.570667 },
      level: 3,
      markers: positions,
    });
    // 좌표정보 콘솔에 찍어보기
    console.log("지도 정보:", getInfo(kakaoMap));
    console.log("맵 생성 완료:", kakaoMap.getCenter(), kakaoMap.getLevel());

    // 마우스 드래그로 인한 중심좌표 변경 트래킹
    window.kakao.maps.event.addListener(kakaoMap, "dragend", function () {
      const latlng = kakaoMap.getCenter();

      let message = "변경된 지도 중심좌표는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";

      console.log(message);
    });
  } catch (err) {
    console.error(err);
  }
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>
