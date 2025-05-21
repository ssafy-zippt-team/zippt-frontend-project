import { ref } from "vue";
import Swal from "sweetalert2";
import { getHouseDetail } from "@/api/housesApi";
import useLatestDeals from "@/composables/useLatestDeals";

export default function useAptDetail() {
  const selectedApt = ref(null);
  const { dealsList, loadLatest } = useLatestDeals();

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
      const { data } = await getHouseDetail(overlayApt.aptSeq);
      console.log("useAptDetail's data : ", data);
      if (data.isSuccess) {
        // merge the detail result with the overlay’s price fields
        selectedApt.value = {
          ...data.result,
          // pull in the three fields you already had
          umdNm: overlayApt.umdNm,
          aptNm: overlayApt.aptNm,
          imgUrl: overlayApt.imgUrl,
          amountAvg: overlayApt.amountAvg,
          amountMax: overlayApt.amountMax,
          amountMin: overlayApt.amountMin,
        };
      }
      // ② 실거래 정보 로드
      console.log("useAptDetails aptSeq : ", overlayApt.aptSeq);
      await loadLatest(overlayApt.aptSeq);
      console.log("useAptDetails dealsList : ", dealsList.value);
    } catch (e) {
      console.error("apt detail load failed", e);
      selectedApt.value = null;
    } finally {
      // ★ 무조건 얼럿 닫기
      Swal.close();
    }
  }

  // 패널 닫기
  function clearDetail() {
    selectedApt.value = null;
  }

  // return { selectedApt, loadDetail, clearDetail };
  return { selectedApt, dealsList, loadDetail, clearDetail };
}
