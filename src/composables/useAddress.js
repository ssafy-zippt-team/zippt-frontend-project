// 기존 코드
// import { ref, computed, watch } from "vue";
// import { getCityList, getGuList, getDongList } from "../api/addressApi";

// export default function useAddress(kakaoMap) {
//   const cityList = ref([]);
//   const guList = ref([]);
//   const dongList = ref([]);
//   const selectedCity = ref("");
//   const selectedGu = ref("");
//   const selectedDong = ref("");
//   // computed 로 항상 최신 sggCd 생성
//   const sggCd = computed(() => {
//     if (!selectedCity.value || !selectedGu.value) return "";
//     return `${selectedCity.value}${selectedGu.value}`;
//   });

//   // debug: computed 가 언제 실행되는지 보려면 watch 추가
//   watch(sggCd, (newVal) => {
//     console.log("computed sggCd:", newVal);
//   });

//   const umdCd = computed(() => {
//     if (!selectedDong.value) return "";
//     return selectedDong.value;
//   });
//   watch(umdCd, (newVal) => {
//     console.log("computed umdCd:", newVal);
//   });

//   // 시/구/동 조회
//   async function loadCities() {
//     const { data } = await getCityList();
//     if (data.isSuccess) {
//       console.log("loadCities's success : ", data);
//       cityList.value = data.result;
//     }
//   }
//   async function loadGus() {
//     const { data } = await getGuList(selectedCity.value);
//     if (data.isSuccess) {
//       console.log("loadCities's success : ", data);
//       guList.value = data.result;
//     }
//   }
//   async function loadDongs() {
//     const { data } = await getDongList(selectedCity.value, selectedGu.value);
//     if (data.isSuccess) {
//       console.log("loadCities's success : ", data);
//       dongList.value = data.result;
//     }
//   }

//   // 선택 변경 시 → 지도 이동 + 다음 목록 호출
//   function geocodeAndMove(address, level) {
//     const geocoder = new window.kakao.maps.services.Geocoder();
//     geocoder.addressSearch(address, (res, status) => {
//       if (status === window.kakao.maps.services.Status.OK) {
//         const { y, x } = res[0];
//         const center = new window.kakao.maps.LatLng(y, x);
//         kakaoMap.value.setCenter(center);
//         kakaoMap.value.setLevel(level);
//       }
//     });
//   }

//   // val == seq
//   watch(selectedCity, (val) => {
//     selectedGu.value = "";
//     selectedDong.value = "";
//     guList.value = [];
//     dongList.value = [];
//     if (!val) return;
//     const cityName = cityList.value.find((c) => c.citySeq === val).cityName;
//     geocodeAndMove(cityName, 8);
//     loadGus();
//   });

//   watch(selectedGu, (val) => {
//     selectedDong.value = "";
//     dongList.value = [];
//     if (!val) return;
//     const cityName = cityList.value.find((c) => c.citySeq === selectedCity.value).cityName;
//     const guName = guList.value.find((g) => g.guSeq === val).guName;
//     geocodeAndMove(`${cityName} ${guName}`, 6);
//     loadDongs();
//   });

//   watch(selectedDong, (val) => {
//     if (!val) return;
//     const cityName = cityList.value.find((c) => c.citySeq === selectedCity.value).cityName;
//     const guName = guList.value.find((g) => g.guSeq === selectedGu.value).guName;
//     const dongName = dongList.value.find((d) => d.dongSeq === val).dongName;
//     geocodeAndMove(`${cityName} ${guName} ${dongName}`, 4);
//   });

//   return {
//     cityList,
//     guList,
//     dongList,
//     selectedCity,
//     selectedGu,
//     selectedDong,
//     sggCd,
//     umdCd,
//     loadCities,
//   };
// }

// prefetch를 이용해 '시' 선택시 구와 각 구에 대한 동 리스트까지 내려받아놓기
// 캐시 사용..
import { ref, computed, watch } from "vue";
import { getCityList, getGuList, getDongList } from "@/api/addressApi";

export default function useAddress(kakaoMap) {
  const cityList = ref([]);
  const guList = ref([]);
  const dongList = ref([]);
  const selectedCity = ref("");
  const selectedGu = ref("");
  const selectedDong = ref("");

  // 캐시 맵: key = citySeq, value = guList
  const guCache = new Map();
  // 캐시 맵: key = `${citySeq}_${guSeq}`, value = dongList
  const dongCache = new Map();

  const sggCd = computed(() => {
    if (!selectedCity.value || !selectedGu.value) return "";
    return `${selectedCity.value}${selectedGu.value}`;
  });
  const umdCd = computed(() => selectedDong.value || "");

  // 시 목록
  async function loadCities() {
    const { data } = await getCityList();
    if (data.isSuccess) {
      cityList.value = data.result;
    }
  }

  // 구 목록 + 동 프리패치
  async function loadGus() {
    const citySeq = selectedCity.value;
    if (!citySeq) return;

    // 1) 캐시에 있으면 바로 사용
    if (guCache.has(citySeq)) {
      guList.value = guCache.get(citySeq);
    } else {
      const { data } = await getGuList(citySeq);
      if (data.isSuccess) {
        guList.value = data.result;
        guCache.set(citySeq, data.result);
      }
    }

    // 2) 각 구에 대해 동 목록을 미리 불러와서 캐시
    for (const g of guList.value) {
      const key = `${citySeq}_${g.guSeq}`;
      if (!dongCache.has(key)) {
        getDongList(citySeq, g.guSeq).then(({ data }) => {
          if (data.isSuccess) dongCache.set(key, data.result);
        });
      }
    }
  }

  // 동 목록: 캐시 우선
  async function loadDongs() {
    const citySeq = selectedCity.value;
    const guSeq = selectedGu.value;
    if (!citySeq || !guSeq) return;

    const key = `${citySeq}_${guSeq}`;
    if (dongCache.has(key)) {
      dongList.value = dongCache.get(key);
    } else {
      const { data } = await getDongList(citySeq, guSeq);
      if (data.isSuccess) {
        dongList.value = data.result;
        dongCache.set(key, data.result);
      }
    }
  }

  function geocodeAndMove(address, level) {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (res, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { y, x } = res[0];
        const center = new window.kakao.maps.LatLng(y, x);
        kakaoMap.value.setCenter(center);
        kakaoMap.value.setLevel(level);
      }
    });
  }

  watch(selectedCity, (val) => {
    selectedGu.value = "";
    selectedDong.value = "";
    guList.value = [];
    dongList.value = [];
    if (!val) return;
    const cityName = cityList.value.find((c) => c.citySeq === val).cityName;
    geocodeAndMove(cityName, 8);
    loadGus();
  });

  watch(selectedGu, (val) => {
    selectedDong.value = "";
    dongList.value = [];
    if (!val) return;
    const cityName = cityList.value.find((c) => c.citySeq === selectedCity.value).cityName;
    const guName = guList.value.find((g) => g.guSeq === val).guName;
    geocodeAndMove(`${cityName} ${guName}`, 6);
    loadDongs();
  });

  watch(selectedDong, (val) => {
    if (!val) return;
    const cityName = cityList.value.find((c) => c.citySeq === selectedCity.value).cityName;
    const guName = guList.value.find((g) => g.guSeq === selectedGu.value).guName;
    const dongName = dongList.value.find((d) => d.dongSeq === val).dongName;
    geocodeAndMove(`${cityName} ${guName} ${dongName}`, 4);
  });

  return {
    cityList,
    guList,
    dongList,
    selectedCity,
    selectedGu,
    selectedDong,
    sggCd,
    umdCd,
    loadCities,
    loadGus,
    loadDongs,
  };
}
