<template>
  <button
    @click="handleClick"
    class="relative px-6 py-3 rounded-full bg-[#115C5E] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-[#187879] transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:bg-[#115C5E] before:blur-xl before:opacity-30 before:scale-110 before:z-[-1] mx-auto"
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

const props = defineProps({
  aptSeq: { type: String, required: true },
  selectedApt: { type: Object, required: true },
});
const { aptSeq, selectedApt } = toRefs(props);

async function handleClick() {
  Swal.fire({
    title: "로딩 중... ⏳",
    html: "AI가 아파트를 분석하고 있습니다. 최대 20초 정도 소요될 수 있어요.",
    allowOutsideClick: false,
    background: "#fff",
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const { umdNm, roadNm, aptNm, jibun, buildYear, commercialInfo } = selectedApt.value;
    const params = {
      umdNm,
      roadNm,
      aptNm,
      jibun,
      buildYear,
      commercialInfo: typeof commercialInfo === "string" ? commercialInfo : JSON.stringify(commercialInfo),
    };

    const { data } = await api.get(`/api/v1/ai/summary/${aptSeq.value}`, { params, timeout: 20000 });
    // const { data } = await api.get(
    //   '/api/v1/ai/summary/11110-128?umdNm=%EB%AA%85%EB%A5%9C1%EA%B0%80&roadNm=%EC%84%B1%EA%B7%A0%EA%B4%80%EB%A1%9C14%EA%B8%B8&aptNm=%EB%A6%AC%EC%B9%98%EC%BA%90%EC%8A%AC%EC%95%84%ED%8C%8C%ED%8A%B8&jibun=33-85&buildYear=2003&commercialInfo=%7B%0A%20%20%22%EB%B3%B4%EA%B1%B4%EC%9D%98%EB%A3%8C%22%3A%201%2C%0A%20%20%22%EC%86%8C%EB%A7%A4%22%3A%207%2C%0A%20%20%22%EA%B5%90%EC%9C%A1%22%3A%201%2C%0A%20%20%22%EC%88%99%EB%B0%95%22%3A%202%2C%0A%20%20%22%EC%98%88%EC%88%A0%C2%B7%EC%8A%A4%ED%8F%AC%EC%B8%A0%22%3A%204%2C%0A%20%20%22%EA%B3%BC%ED%95%99%C2%B7%EA%B8%B0%EC%88%A0%22%3A%205%2C%0A%20%20%22%EC%9D%8C%EC%8B%9D%22%3A%2030%2C%0A%20%20%22%EB%B6%80%EB%8F%99%EC%82%B0%22%3A%204%2C%0A%20%20%22%EC%8B%9C%EC%84%A4%EA%B4%80%EB%A6%AC%C2%B7%EC%9E%84%EB%8C%80%22%3A%203%2C%0A%20%20%22%EC%88%98%EB%A6%AC%C2%B7%EA%B0%9C%EC%9D%B8%22%3A%203%0A%7D',
    //   { timeout: 20000 }
    // );

    Swal.fire({
      title:
        '<span style="display:flex;align-items:center;gap:8px;"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h13v6M9 13H4v6h5m0 0v-6m0 6l-2.5 2M14 7H7a2 2 0 00-2 2v0a2 2 0 002 2h7a2 2 0 002-2v0a2 2 0 00-2-2z" /></svg>아파트 요약 리포트</span>',
      html: data.result,
      width: 700,
      background: "#ffffff",
      confirmButtonText: "닫기",
      confirmButtonColor: "#115C5E",
    });
  } catch (err) {
    console.error("AI 요약 요청 실패:", err); // 여기가 콘솔 로그
    Swal.fire({
      icon: "error",
      title: "오류 발생",
      text: "요약 정보를 불러오지 못했습니다.",
      confirmButtonColor: "#115C5E",
    });
  }
}
</script>

<style scoped></style>
