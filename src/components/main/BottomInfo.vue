 <template>
  <div class="flex justify-between gap-8 w-full max-w-[1200px] mx-auto mb-16">
    <!-- 왼쪽: 최근 본 아파트 -->
<div class="w-[48%] min-w-[340px] h-[340px] rounded-[14px] bg-white shadow flex flex-col p-8">
  <div class="border-b border-[#e7e7e7] mb-4">
    <h2 class="text-xl font-bold text-[#115C5E]">최근 본 아파트</h2>
  </div>

  <div class="flex-1 overflow-y-auto pr-2">
    <template v-if="recentAptList.length > 0">
      <div class="grid grid-cols-2 gap-4">
        <!-- 최근 본 아파트 카드 영역 -->
<div
  v-for="apt in recentAptList.slice(0, 6)"
  :key="apt.aptSeq"
  @click="goToMapWithApt(apt)"
  class="flex flex-col border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md hover:border-[#115C5E] cursor-pointer transition"
>
  <!-- 비율 유지 컨테이너 -->
  <div class="w-full aspect-[4/3] rounded mb-2 overflow-hidden bg-gray-100">
    <img
      :src="apt.imgUrl ? `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${apt.imgUrl}` : errorImage"
      alt="아파트 이미지"
      class="w-full h-full object-cover"
    />
  </div>

  <!-- 아파트 정보 -->
  <div class="text-sm font-semibold text-[#23272E] truncate">
    {{ apt.aptNm }}
  </div>
  <p class="text-xs text-gray-500 truncate">
    {{ apt.roadNm || apt.jibun }} · {{ apt.buildYear }}년 준공
  </p>
  <p class="text-xs text-gray-400">
    실거래가: {{ formatAmount(apt.amountMin) }} ~ {{ formatAmount(apt.amountMax) }}만원
  </p>
</div>

      </div>
    </template>

    <div v-else class="flex items-center justify-center h-full text-gray-400">
      최근 본 아파트가 없습니다.
    </div>
  </div>
</div>

    <!-- 오른쪽: 오늘의 NEWS -->
    <div class="w-[48%] min-w-[340px] h-[340px] rounded-[14px] bg-white shadow flex flex-col p-8">
      <div class="border-b border-[#e7e7e7] mb-4">
        <h2 class="text-xl font-bold text-[#115C5E]">오늘의 NEWS</h2>
      </div>
      <div class="flex-1 overflow-y-auto pr-2">
        <ul class="space-y-5">
          <li
            v-for="item in newsItems"
            :key="item.link"
            class="flex flex-col items-start border border-gray-200 rounded p-1 transition hover:shadow-lg hover:scale-[1.02] hover:border-[#115C5E] cursor-pointer"
          >
            <a
              :href="item.link"
              class="block text-base font-semibold text-[#23272E] hover:text-[#115C5E] transition"
              target="_blank"
              rel="noopener noreferrer"
              v-html="item.title"
            />
            <p class="text-gray-500 text-sm mt-1 line-clamp-2" v-html="item.description"></p>
            <span class="block text-xs text-gray-400 mt-1">{{ formatDate(item.pubDate) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

  <script setup>
  import { ref, onMounted } from "vue";

  import axios from "axios";
  import {getRecentViewHouseList} from "@/api/recentApartApi";
  import errorImage from '@/assets/img/imgError.jpg'

  import { useRouter } from 'vue-router';
  const router = useRouter();

  function goToMapWithApt(apt) {
    localStorage.setItem('selectedRecentApt', JSON.stringify(apt));
    router.push('/map');
  }

  // 네이버 뉴스 API에서 받아올 데이터
  const newsItems = ref([]);
  // 최근 본 아파트 리스트
  const recentAptList = ref([]);

  // 실거래가 숫자 포맷 함수
  function formatAmount(amount) {
    return amount ? amount.toLocaleString() : "-";
  }

  // 날짜 포맷 함수
  function formatDate(pubDate) {
    // pubDate: "Fri, 23 May 2025 14:20:00 +0900"
    return new Date(pubDate).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // 최근 본 아파트 API 호출
  async function loadRecentAptList() {
    try {
      const res = await getRecentViewHouseList(); // API 응답
      const data = res.data; // 여기만 추가됨
      console.log(res.data);

      if (data.isSuccess && Array.isArray(data.result)) {
        recentAptList.value = data.result;
        console.log(recentAptList.value);
      } else {
        console.warn("최근 본 아파트 응답 형식이 올바르지 않습니다:", data);
      }
    } catch (error) {
      console.error("최근 본 아파트 불러오기 실패:", error);
    }
  }
  // function handleRecentClick(apt) {
  //   if (!props.kakaoMap || !props.loadDetail) return;

  //   // 1. 지도 위치 이동
  //   props.kakaoMap.setCenter(new window.kakao.maps.LatLng(apt.latitude, apt.longitude));
  //   props.kakaoMap.setLevel(4);

  //   // 2. 패널에 상세 정보 로드
  //   props.loadDetail({
  //     aptSeq: apt.aptSeq,
  //     umdNm: apt.umdNm,
  //     aptNm: apt.aptNm,
  //     imgUrl: apt.imgUrl,
  //     amountAvg: apt.amountAvg,
  //     amountMax: apt.amountMax,
  //     amountMin: apt.amountMin,
  //     latitude: apt.latitude,
  //     longitude: apt.longitude,
  //     buildYear: apt.buildYear,
  //     roadNm: apt.roadNm,
  //     jibun: apt.jibun,
  //   });
  // }

  onMounted(() => {
    loadRecentAptList();
    axios
      .get("/v1/search/news.json", {
        params: {
          query: "부동산 뉴스",
          display: 5,
          sort: "date",
        },
        headers: {
          "X-Naver-Client-Id": process.env.VUE_APP_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.VUE_APP_NAVER_CLIENT_SECRET,
        },
      })
      .then((res) => {
        newsItems.value = res.data.items;
      })
      .catch((err) => {
        newsItems.value = [];
        console.error("네이버 뉴스 API 호출 에러:", err);
      });
  });
  </script>
