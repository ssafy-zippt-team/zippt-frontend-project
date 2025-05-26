<template>
  <button
    @click="checkLogin"
    class="relative px-6 py-3 rounded-full bg-[#115C5E] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-[#187879] transition-all duration-300 mx-auto"
  >
    <Sparkles class="w-5 h-5 text-white -mt-0.5" />
    <span>AI 요약 보기</span>
  </button>
</template>

<script setup>
import Swal from "sweetalert2";
import { api } from "@/api/authApi";
import { toRefs } from "vue";
import { Sparkles } from "lucide-vue-next";
import { loggedIn } from "@/util/auth/auth";
import { loginReq } from "@/util/alert/loginReqAlert";

const props = defineProps({
  aptSeq: { type: String, required: true },
  selectedApt: { type: Object, required: true },
});
const { aptSeq, selectedApt } = toRefs(props);

function checkLogin() {
  if (loggedIn.value) handleClick();
  else loginReq();
}

async function handleClick() {
  Swal.fire({
    title: "아파트 요약 리포트",
    width: 700,
    background: "#ffffff",
    buttonsStyling: false,
    showConfirmButton: false,
    showCloseButton: false,
    allowOutsideClick: false,
    customClass: {
      popup: "rounded-2xl shadow-lg",
      title: "text-center text-2xl font-semibold text-[#115C5E]",
      htmlContainer: "p-0",       // we'll manage padding 내부에서
    },
    html: `
      <div id="ai-content" class="space-y-4 p-4">
        <!-- 스켈레톤 블록 -->
        <div class="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
        <div class="h-4 bg-gray-200 rounded w-3/6 animate-pulse"></div>
      </div>
    `,
    didOpen: async () => {
      const container = Swal.getHtmlContainer().querySelector("#ai-content");

      // 1) API 호출
      let data;
      try {
        const { umdNm, roadNm, aptNm, jibun, buildYear, commercialInfo } = selectedApt.value;
        const params = {
          umdNm, roadNm, aptNm, jibun, buildYear,
          commercialInfo:
            typeof commercialInfo === "string"
              ? commercialInfo
              : JSON.stringify(commercialInfo),
        };
        ({ data } = await api.get(`/api/v1/ai/summary/${aptSeq.value}`, {
          params,
          timeout: 20000,
        }));
      } catch (err) {
        // 에러 화면
        container.innerHTML = `
          <p class="text-red-500">요약 정보를 불러오지 못했습니다.</p>
        `;
        return Swal.update({
          showConfirmButton: true,
          confirmButtonText: "닫기",
          confirmButtonColor: "#115C5E",
          customClass: {
            confirmButton: "bg-[#115C5E] hover:bg-[#187879] text-white py-2 px-6 rounded-full",
          },
          allowOutsideClick: true,
        });
      }

       // 1) HTML 파싱해서 텍스트만 꺼내기
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.result, "text/html");
      const fullText = doc.body.textContent || "";

      // 2) 공백(스페이스, 개행 등) 기준으로 단어 배열 만들기
      const words = fullText
        .split(/\s+/)    // 연속된 공백 기준 분할
        .filter((w) => w.trim().length > 0);
      

      // 2) 스켈레톤 지우기
      container.innerHTML = "";

      // 3) <p>…</p> 단락 단위로 점진 노출
      // (정규표현식도 이렇게 실제 리터럴로!)
      // const segments = data.result.match(/<p[\s\S]*?<\/p>/g) || [data.result];
      let idx = 0;
      const timer = setInterval(() => {
        if (idx < words.length) {
          // 원하는 태그로 감싸기 (여기선 <span> 사용)
          container.insertAdjacentHTML(
            "beforeend",
            `<span>${words[idx]} </span>`
          );
          idx++;
        } else {
          clearInterval(timer);
          // 4) 버튼 노출
          Swal.update({
            html:  `
              <div style="padding-left: 20px;">
                ${data.result}
              </div>
            `,
            showConfirmButton: true,
            confirmButtonText: "닫기",
            confirmButtonColor: "#115C5E",
            buttonsStyling: false,
            customClass: {
              confirmButton: "bg-[#115C5E] hover:bg-[#187879] text-white py-2 px-6 rounded-full",
            },
            allowOutsideClick: true,
          });
        }
      }, 100);
    },
  });
}

</script>
