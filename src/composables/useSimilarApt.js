import Swal from "sweetalert2";
import { getSimilarAptToName } from "@/api/housesApi";
import errorImage from '@/assets/img/imgError.jpg';

export default function useSimilarApt(loadDetail) {


  async function showSimilarApts(term, kakaoMap) {
    // 1) 스켈레톤 로더 모달 (width 키우고 그리드 갭 적용)
    Swal.fire({
      title: "검색한 이름과 비슷한 아파트 불러오는 중…",
      html: `
        <div class="flex flex-wrap justify-center gap-4 px-6 py-4">
          ${Array(4)
            .fill()
            .map(
              () => `<div class="w-28 h-36 bg-gray-200 rounded-lg animate-pulse"></div>`
            )
            .join("")}
        </div>
      `,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      width: '640px',
    });

    try {
      // 2) 실제 API 호출
      const { data } = await getSimilarAptToName(term);
      const list = Array.isArray(data.result) ? data.result : [];

      if (!list.length) {
        Swal.close();
        await Swal.fire("검색 결과가 없습니다.");
        return;
      }

      const candidates = list.slice(0, 4);

      // 3) 동일 모달 내부만 업데이트 (cardsHtml 생성 부분도 w-28로 통일)
      const cardsHtml = candidates
        .map(
          (apt, idx) => `
        <div class="apt-card w-28 shadow-lg rounded-lg" data-idx="${idx}"
             style="cursor:pointer; display:inline-block; text-align:center;">
          <img
            src="${
              apt.imgUrl
                ? `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${apt.imgUrl}`
                : errorImage
            }"
            alt="${apt.aptNm}"
            style="
              width:100px;
              height:100px;
              object-fit:cover;
              border-radius:4px;
              margin:0 auto 8px;
            "
          />
          <div
            style="
              font-size:0.9rem;
              width:100px;
              overflow:hidden;
              white-space:nowrap;
              text-overflow:ellipsis;
            "
            title="${apt.aptNm}"
          >
            ${apt.aptNm}
          </div>
        </div>
      `
        )
        .join("");

      Swal.update({
        title: "아파트를 선택하세요",
        html: `<div class="flex flex-wrap justify-center gap-4 px-6 py-4">${cardsHtml}</div>`,
        showCancelButton: true,
        showConfirmButton: false,
        width: '640px',
      });

      // 4) 이벤트 바인딩
      const container = Swal.getHtmlContainer();
      container.querySelectorAll(".apt-card").forEach((card) =>
        card.addEventListener("click", () => {
          const idx = Number(card.dataset.idx);
          const apt = candidates[idx];

          const parts = apt.aptNm.split(" ");
          const umdNm = parts.shift();
          const aptNm = parts.join(" ");
          
          const overlayApt = {
            aptSeq: apt.aptSeq,
            umdNm,
            aptNm,
            imgUrl: apt.imgUrl,
            amountAvg: apt.amountAvg,
            amountMax: apt.amountMax,
            amountMin: apt.amountMin,
            latitude: apt.latitude,
            longitude: apt.longitude,
          };

          // ① 지도 이동
          kakaoMap.setCenter(
            new window.kakao.maps.LatLng(apt.latitude, apt.longitude)
          );
          kakaoMap.setLevel(4);

          // ② 상세 패널 오픈
          loadDetail(overlayApt);

          // ③ 모달 닫기
          Swal.close();
        })
      );
    } catch (e) {
      Swal.close();
      console.warn("❗ 아파트 추천 요청 실패:", e);
      await Swal.fire("아파트 검색에 실패했습니다.");
    }
  }

  return { showSimilarApts };
}