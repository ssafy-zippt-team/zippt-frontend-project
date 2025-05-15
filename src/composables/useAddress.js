import { ref, computed, watch } from "vue";
import { getCityList, getGuList, getDongList } from "../api/addressApi";

export default function useAddress(kakaoMap) {
  const cityList = ref([]);
  const guList = ref([]);
  const dongList = ref([]);
  const selectedCity = ref("");
  const selectedGu = ref("");
  const selectedDong = ref("");
  // computed 로 항상 최신 sggCd 생성
  const sggCd = computed(() => {
    if (!selectedCity.value || !selectedGu.value) return "";
    return `${selectedCity.value}${selectedGu.value}`;
  });

  // debug: computed 가 언제 실행되는지 보려면 watch 추가
  watch(sggCd, (newVal) => {
    console.log("computed sggCd:", newVal);
  });

  const umdCd = computed(() => {
    if (!selectedDong.value) return "";
    return selectedDong.value;
  });
  watch(umdCd, (newVal) => {
    console.log("computed umdCd:", newVal);
  });

  // 시/구/동 조회
  async function loadCities() {
    const { data } = await getCityList();
    if (data.isSuccess) {
      console.log("loadCities's success : ", data);
      cityList.value = data.result;
    }
  }
  async function loadGus() {
    const { data } = await getGuList(selectedCity.value);
    if (data.isSuccess) {
      console.log("loadCities's success : ", data);
      guList.value = data.result;
    }
  }
  async function loadDongs() {
    const { data } = await getDongList(selectedCity.value, selectedGu.value);
    if (data.isSuccess) {
      console.log("loadCities's success : ", data);
      dongList.value = data.result;
    }
  }

  // 선택 변경 시 → 지도 이동 + 다음 목록 호출
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

  // val == seq
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
  };
}
