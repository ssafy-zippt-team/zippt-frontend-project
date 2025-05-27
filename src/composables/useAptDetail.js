import { ref } from "vue";
import Swal from "sweetalert2";
import { getHouseDetail, getSimilarHouse } from "@/api/housesApi";
import useLatestDeals from "@/composables/useLatestDeals";

export default function useAptDetail() {
  const selectedApt = ref(null);            // 선택된 아파트 정보
  const similarItems = ref([]);             // ✅ 추천 매물 리스트
  const selectedCoords = ref(null); // 좌표값


  const {
    dealsList,
    currentPage,
    isLastPage,
    loadLatest,
    nextPage,
    prevPage,
  } = useLatestDeals();

  // 상세 정보 로드
  async function loadDetail(overlayApt) {
    if (!overlayApt?.aptSeq) return;
    try {
      Swal.fire({
        title: "로딩 중…",
        html: "잠시만 기다려주세요.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // ① 아파트 상세 정보 요청
      const { data } = await getHouseDetail(overlayApt.aptSeq);
      console.log("useAptDetail's data : ", data);
      console.log("useAptDetail's amount : ", data.result);

      

      if (data.isSuccess) {
        selectedApt.value = {
          ...data.result,
          aptSeq: overlayApt.aptSeq,
          umdNm: overlayApt.umdNm,
          aptNm: overlayApt.aptNm,
          imgUrl: overlayApt.imgUrl,
          // amountAvg: overlayApt.amountAvg,
          // amountMax: overlayApt.amountMax,
          // amountMin: overlayApt.amountMin,
        };
      }
      // loadDetail 내에서 저장됨
      selectedCoords.value = {
        lat: overlayApt.latitude,
        lng: overlayApt.longitude,
      };

      console.log("useAptDetails aptSeq : ", selectedCoords.value.lat);

      // ② 실거래 정보 로드
      console.log("useAptDetails aptSeq : ", overlayApt.aptSeq);
      await loadLatest(overlayApt.aptSeq, 1);

      // ③ 유사 매물 불러오기
      // const { data: similarData } = await getSimilarHouse(overlayApt.aptSeq);
      // console.log("✅ 유사 매물 API 응답:", similarData.result);

      try {
  const { data: similarData } = await getSimilarHouse(overlayApt.aptSeq);
  console.log("✅ 유사 매물 API 응답:", similarData.result);

  if (similarData.isSuccess && Array.isArray(similarData.result)) {
    similarItems.value = similarData.result;
    console.log("similarItems : ", similarItems.value);
  } else {
    similarItems.value = [];
  }
} catch (e) {
  console.warn("❗ 유사 아파트 추천 요청 실패 (404 포함 가능):", e);
  similarItems.value = [];
}

    
    } catch (e) {
      console.error("apt detail load failed", e);
      selectedApt.value = null;
      similarItems.value = [];
    } finally {
      Swal.close(); // ★ 무조건 얼럿 닫기
    }
  }


  return {
    selectedApt,
    dealsList,
    loadDetail,
    currentPage,
    isLastPage,
    nextPage,
    prevPage,
    loadLatest,
    similarItems,  // ✅ 유사 매물 리스트 리턴
    selectedCoords,
  };
}
