<template>
  <div v-if="selectedApt" class="apt-detail-panel">
    <div class="apt-detail-header">
      <div class="apt-detail-top">
        <h1>[{{ selectedApt.umdNm || "정보 없음" }}]</h1>
        <div class="apt-name-box flex items-center gap-2">
          <h3 class="text-xl font-bold">{{ selectedApt.aptNm || "정보 없음" }}</h3>
          <div
            class="bookmark-box flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md transition hover:bg-yellow-100"
            @click="onBookmarkClick"
          >
            <svg
              v-if="isBookmarked"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-5 h-5 text-yellow-400"
            >
              <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              class="w-5 h-5 text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.517 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.976 2.892a1 1 0 00-.364 1.118l1.517 4.674c.3.921-.755 1.688-1.538 1.118L12 17.77l-3.976 2.892c-.783.57-1.838-.197-1.538-1.118l1.517-4.674a1 1 0 00-.364-1.118L3.663 10.1c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.517-4.674z"
              />
            </svg>
            <span class="text-sm text-gray-700 font-medium">{{ bookmarkCount }}</span>
          </div>
        </div>
        <button class="apt-detail-close" @click="emit('close')">×</button>
      </div>
    </div>

    <div class="apt-detail-body">
      <div class="scroll-body">
        <div class="apt-detail-body-top">
          <table>
            <tbody>
              <tr v-if="selectedApt.roadNm">
                <th>도로명</th>
                <td>{{ selectedApt.roadNm }}</td>
              </tr>
              <tr v-if="selectedApt.buildYear">
                <th>준공년도</th>
                <td>{{ selectedApt.buildYear }}</td>
              </tr>
              <tr v-if="selectedApt.jibun">
                <th>지번</th>
                <td>{{ selectedApt.jibun }}</td>
              </tr>
              <tr>
                <th>평균 매매가</th>
                <td>{{ formattedAvg(selectedApt.amountAvg) }}</td>
              </tr>
              <tr>
                <th>매매가</th>
                <td>{{ formattedMin }}억 ~ {{ formattedMax }}억</td>
              </tr>
              <tr>
                <th colspan="2">
                  <AiSumaryButton :apt-seq="selectedApt.aptSeq" :selected-apt="selectedApt" />
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="relative w-full max-w-[500px] aspect-[4/3] mx-auto mt-2 overflow-hidden"
          :class="selectedApt?.imgUrl ? 'cursor-zoom-in' : 'cursor-default'"
          ref="container"
          @mousemove="handleMouseMove"
          @mouseleave="hideLens"
        >
          <img
            :src="
              selectedApt.imgUrl
                ? `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${selectedApt.imgUrl}`
                : errorImage
            "
            alt="확대 이미지"
            class="w-full h-full object-contain"
            ref="imageRef"
          />
          <div
            v-show="lensVisible"
            class="absolute pointer-events-none border border-gray-300 rounded bg-no-repeat cursor-crosshair"
            :style="lensStyle"
          ></div>
        </div>
        <!-- <div class="relatice">
          <AiSumaryButton
            :apt-seq="selectedApt.aptSeq"
            :selected-apt="selectedApt"
          />
        </div> -->

        <div class="p-1" v-if="selectedApt.imgUrl">
          <div class="flex items-center gap-2 mb-1">
            <Building2Icon class="w-4 h-4 text-[#115C5E]" />
            <h2 class="text-[16px] font-bold">유사 외관의 아파트 추천</h2>
          </div>
          <p class="text-[14px] text-gray-500 mb-1">지금 보시는 아파트와 비슷한 아파트도 둘러보세요</p>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="(item, idx) in similarItems"
              :key="idx"
              class="border rounded overflow-hidden shadow cursor-pointer hover:shadow-lg transition"
              @click="handleSimilarClick(item)"
            >
              <div>
                <img
                  :src="
                    item.imgUrl
                      ? `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${item.imgUrl}`
                      : `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${selectedApt.imgUrl}`
                  "
                  alt="유사 아파트 이미지"
                  class="w-full h-20 object-cover"
                />
              </div>
              <div class="h-12 flex items-center justify-center text-center px-1">
                <p class="truncate text-gray-700 text-[13px] font-semibold text-center w-full" :title="item.aptNm">
                  {{ item.aptNm }}
                </p>
                <p v-if="!item.imgUrl" class="text-[10px] text-red-400 italic">이미지 준비중...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed-tabbar">
        <TabBarView
          :deals-list="dealsList"
          :current-page="currentPage"
          :is-last-page="isLastPage"
          :apt-seq="selectedApt.aptSeq"
          :selected-coords="selectedCoords"
          @go-page="(page) => emit('go-page', page)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRef, computed, ref, watch, onMounted } from "vue";
import TabBarView from "./TabBarView.vue";
import errorImage from "@/assets/img/imgError.jpg";
import "@/assets/css/AptDetailPanel.css";
import useBookmark from "@/composables/useBookmark";
import { getMemberUuid } from "@/util/auth/auth";
import AiSumaryButton from "@/components/summary/AiSumaryButton.vue";
import { loggedIn } from "@/util/auth/auth";
import { loginReq } from "@/util/alert/loginReqAlert";
import { addRecentViewHouse } from "@/api/recentApartApi";
import { Building2Icon } from "lucide-vue-next";

const props = defineProps({
  selectedApt: Object,
  dealsList: { type: Array, default: () => [] },
  currentPage: { type: Number, required: true },
  isLastPage: { type: Boolean, required: true },
  similarItems: { type: Array, default: () => [] },
  aptSeq: String,
  selectedCoords: { type: Object, required: true },
  loadDetail: {
    type: Function,
    required: true,
  },
  kakaoMap: {
    type: Object,
    required: true,
  },
});

const selectedCoords = toRef(props, "selectedCoords");
const selectedApt = toRef(props, "selectedApt");
const dealsList = toRef(props, "dealsList");
const currentPage = toRef(props, "currentPage");
const isLastPage = toRef(props, "isLastPage");
const similarItems = toRef(props, "similarItems");
const emit = defineEmits(["close", "go-page"]);

const kakaoMap = toRef(props, "kakaoMap");
// const loadDetail = inject('loadDetail')
const loadDetail = toRef(props, "loadDetail");

const aptSeq = computed(() => selectedApt.value?.aptSeq);
const memberUuid = ref("");

onMounted(() => {
  memberUuid.value = getMemberUuid();
});

function formattedAvg(v) {
  if (v == null || isNaN(v)) return "";
  const intPart = Math.floor(v);
  const decimalHundreds = Math.round((v - intPart) * 100);
  const manWon = decimalHundreds * 100;
  return `${intPart}억 ${manWon.toLocaleString()}만원`;
}

const formattedMax = computed(() => {
  const v = selectedApt.value.amountMax;
  return v != null ? v.toLocaleString() : "";
});

const formattedMin = computed(() => {
  const v = selectedApt.value.amountMin;
  return v != null ? v.toLocaleString() : "";
});

const {
  isBookmarked,
  bookmarkCount,
  fetchBookmarkStatus,
  fetchBookmarkCount,
  toggle, // ✅ toggle 이름을 명확히 변경
} = useBookmark(memberUuid, aptSeq);

// ✅ 최초 진입 시 북마크 정보 + 최근 본 아파트 등록
watch(() => selectedApt.value?.aptSeq, (newVal) => {
  console.log("selectedCoords : ",selectedCoords)
  console.log(selectedCoords.value.lat,selectedCoords.value.lng);
  if (selectedApt.value && memberUuid.value) {
    const payload = {
      aptSeq: selectedApt.value.aptSeq,
      umdNm: selectedApt.value.umdNm,
      aptNm: selectedApt.value.aptNm,
      latitude: selectedCoords.value.lat,
      longitude: selectedCoords.value.lng,
      jibun: selectedApt.value.jibun,
      imgUrl: selectedApt.value.imgUrl,
      roadNm: selectedApt.value.roadNm,
      buildYear: selectedApt.value.buildYear,
      amountAvg: selectedApt.value.amountAvg,
      amountMax: selectedApt.value.amountMax,
      amountMin: selectedApt.value.amountMin,
    };
      addRecentViewHouse(payload)
        .then(() => console.log("최근 본 아파트 등록 완료"))
        .catch((err) => console.error("최근 본 아파트 등록 실패:", err));
    }

    if (newVal) {
      fetchBookmarkStatus();
      fetchBookmarkCount(); // ✅ 최초 진입 시에만 fetch
    }
  }
);

// 렌즈 확대 관련
const lensVisible = ref(false);
const lensStyle = ref({});
const container = ref(null);
const imageRef = ref(null);

function handleMouseMove(event) {
  if (!selectedApt.value?.imgUrl) return;
  const img = imageRef.value;
  const rect = img.getBoundingClientRect();
  const zoom = 2;
  const lensSize = 100;

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const ratioX = x / rect.width;
  const ratioY = y / rect.height;

  const bgX = -(img.naturalWidth * zoom * ratioX - lensSize / 2);
  const bgY = -(img.naturalHeight * zoom * ratioY - lensSize / 2);

  lensStyle.value = {
    width: `${lensSize}px`,
    height: `${lensSize}px`,
    top: `${y - lensSize / 2}px`,
    left: `${x - lensSize / 2}px`,
    backgroundImage: `url(${img.src})`,
    backgroundSize: `${img.naturalWidth * zoom}px ${img.naturalHeight * zoom}px`,
    backgroundPosition: `${bgX}px ${bgY}px`,
    position: "absolute",
    zIndex: 50,
  };
  lensVisible.value = true;
}

function hideLens() {
  lensVisible.value = false;
}

// ② similar‐item 클릭 핸들러
function handleSimilarClick(item) {
  if (!kakaoMap.value) return;
  // 지도 센터 이동
  kakaoMap.value.setCenter(new window.kakao.maps.LatLng(item.latitude, item.longitude));
  kakaoMap.value.setLevel(4);

  // 패널에 로드할 객체를 showSimilarApts 와 동일한 형태로 생성
  const [umdNm, ...rest] = item.aptNm.split(" ");
  loadDetail.value({
    aptSeq: item.aptSeq,
    umdNm,
    aptNm: rest.join(" "),
    imgUrl: item.imgUrl,
    amountAvg: item.amountAvg,
    amountMax: item.amountMax,
    amountMin: item.amountMin,
    latitude: item.latitude,
    longitude: item.longitude,
  });
}

function onBookmarkClick() {
  if (loggedIn.value) {
    // 로그인 되어 있으면 토글 실행
    toggle();
  } else {
    // 아니면 로그인 요청 얼럿
    loginReq();
  }
}
</script>
