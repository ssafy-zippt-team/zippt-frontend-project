import Swal from "sweetalert2";
import { getSimilarAptToName } from "@/api/housesApi";

export default function useSimilarApt(){

    async function showSimilarApts(term, kakaoMap) {
    // 1) 로딩 표시
    Swal.fire({
      title: "로딩 중…",
      html: "잠시만 기다려주세요.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { data } = await getSimilarAptToName(term);
      Swal.close();

      const list = Array.isArray(data.result) ? data.result : [];
      if (!list.length) {
        await Swal.fire("검색 결과가 없습니다.");
        return;
      }

      // 최대 4개만
      const candidates = list.slice(0, 4);

      // 2) HTML 카드 생성
      const cardsHtml = candidates
        .map(
          (apt, idx) => `
        <div class="apt-card" data-idx="${idx}"
             style="
               cursor:pointer;
               display:inline-block;
               margin:8px;
               text-align:center;
             ">
          <img
            src="${apt.imgUrl || 'https://via.placeholder.com/100'}"
            alt="${apt.aptNm}"
            style="
              width:100px;
              height:100px;
              object-fit:cover;
              border-radius:4px;
              margin-bottom:4px;
            "
          />
          <div style="font-size:0.9rem;">${apt.aptNm}</div>
        </div>
      `
        )
        .join("");

      // 3) 선택 모달 띄우기
      await Swal.fire({
        title: "유사 아파트를 선택하세요",
        html: `<div style="white-space:nowrap;">${cardsHtml}</div>`,
        showCancelButton: true,
        showConfirmButton: false,
        width: "auto",
        didOpen: () => {
          const container = Swal.getHtmlContainer();
          container
            .querySelectorAll(".apt-card")
            .forEach((card) =>
              card.addEventListener("click", () => {
                const idx = Number(card.dataset.idx);
                const apt = candidates[idx];
                // 지도 중심 이동
                kakaoMap.setCenter(
                  new window.kakao.maps.LatLng(apt.latitude, apt.longitude)
                );
                Swal.close();
              })
            );
        },
      });
    } catch (e) {
      Swal.close();
      console.warn("❗ 유사 아파트 추천 요청 실패:", e);
      await Swal.fire("아파트 검색에 실패했습니다.");
    }
  }

  return { showSimilarApts };
}