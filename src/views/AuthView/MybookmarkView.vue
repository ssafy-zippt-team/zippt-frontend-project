<template>
  <div class="max-w-6xl mx-auto my-8 px-4">
    <h2 class="text-2xl font-bold text-[#115C5E] mb-4">즐겨찾기한 아파트</h2>

    <div v-if="bookmarkedList.length" class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="apt in bookmarkedList"
        :key="apt.aptSeq"
        class="flex flex-col items-start border border-gray-200 rounded p-2 
               transition-transform duration-200 ease-in-out 
               hover:shadow-lg hover:scale-[1.02] hover:border-[#115C5E] cursor-pointer"
        @click="handleClick(apt)"
      >
        <img
          :src="apt.imgUrl ? imageUrl(apt.imgUrl) : errorImage"
          alt="아파트 이미지"
          class="w-full h-32 object-cover"
        />
        <div class="p-3 space-y-1">
          <div class="text-sm font-semibold text-[#23272E] truncate">{{ apt.aptNm }}</div>
          <p class="text-xs text-gray-500 truncate">
            {{ apt.roadNm || apt.jibun }} · {{ apt.buildYear }}°연 준공
          </p>
          <p class="text-xs text-gray-400">
            실거리가: {{ formatAmount(apt.amountMin) }} ~ {{ formatAmount(apt.amountMax) }}만원
          </p>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-400 mt-10">
      즐겨찾기한 아파트가 없습니다.
    </div>

    <!-- ✔️ 페이지닉이션 UI -->
    <div class="deal-pagination flex justify-center gap-1 mt-6">
      <button @click="prevBlock" :disabled="blockStart === 1" class="px-3 py-1 border rounded">‹</button>

      <button
        v-for="p in pages"
        :key="p"
        @click="goPage(p)"
        class="px-3 py-1 border rounded"
        :class="[p === currentPage ? 'bg-[#115C5E] text-white' : 'hover:bg-gray-100']"
      >
        {{ p }}
      </button>

      <button @click="nextBlock" :disabled="isLastPage && currentPage <= lastInBlock" class="px-3 py-1 border rounded">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, defineEmits } from 'vue'
import { getBookmarkList } from '@/api/bookmarkApi'
import { getHouseDetail } from '@/api/housesApi'
import { getMemberUuid } from '@/util/auth/auth'
import errorImage from '@/assets/img/imgError.jpg'
import { useRouter } from 'vue-router';
const router = useRouter();

// ✔️ 상태 선언
const bookmarkedList = ref([])
const currentPage = ref(1)
const isLastPage = ref(false)
const pageSize = ref(10) // ✔️ 누락되었던 pageSize 명시
const blockSize = 5
const blockStart = ref(1)
const pageNumList = ref([])

// 이벤트
const emit = defineEmits(["prev-page", "next-page", "go-page"]);

// ✔️ 페이지네이션 계산
const lastInBlock = computed(() => blockStart.value + blockSize - 1)

const pages = 1;

function imageUrl(path) {
  return `https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${path}`
}
function formatAmount(val) {
  return val ? val.toLocaleString() : '-'
}

function handleClick(apt) {
  console.log('아파트 클릭됨:', apt)
    localStorage.setItem('selectedBookmarkApt', JSON.stringify(apt));
    router.push('/map');
}

async function loadBookmarkList(page = 1) {
  try {
    const memberUuid = getMemberUuid();
    if (!memberUuid) return;

    const res = await getBookmarkList(memberUuid, page, pageSize.value);
    const bookmarkList = res.data.dtoList;

    // 💡 getHouseDetail로 상세정보 받아오고, 북마크 정보와 병합
    const promises = bookmarkList.map(async (b) => {
      try {
        const detail = await getHouseDetail(b.aptSeq);
        if (detail.data.isSuccess && detail.data.result) {
          return {
            ...detail.data.result, // 🏡 아파트 상세 정보
            aptSeq: b.aptSeq, // 🔑 명시적으로 포함
            bookmarkId: b.bookmarkId,
            memberUuid: b.memberUuid,
            createdAt: b.createdAt,
            updatedAt: b.updatedAt,
          };
        }
        return null;
      } catch (err) {
        console.warn(`상세정보 실패: aptSeq=${b.aptSeq}`, err);
        return null;
      }
    });

    const results = await Promise.all(promises);
    bookmarkedList.value = results.filter(Boolean); // 최종 병합된 리스트
    console.log("✅ bookmarkedList:", bookmarkedList.value);

    // 페이지네이션 처리
    currentPage.value = res.data.current;
    pageNumList.value = res.data.pageNumList || [];
    isLastPage.value = res.data.current >= res.data.totalPage;

  } catch (e) {
    console.error("❌ 즐겨찾기 목록 실패:", e);
  }
}

// 숫자 클릭
function goPage(page) {
  emit("go-page", page);
}

// 이전 블록: start-5, 바로 그 페이지 로드
function prevBlock() {
  if (blockStart.value > 1) {
    blockStart.value -= blockSize;
    emit("go-page", blockStart.value);
  }
}
// 다음 블록: start+5, 바로 그 페이지 로드
function nextBlock() {
  blockStart.value += blockSize;
  emit("go-page", blockStart.value);
}

watch(currentPage, (cp) => {
  if (cp < blockStart.value) {
    blockStart.value = Math.floor((cp - 1) / blockSize) * blockSize + 1;
  } else if (cp > lastInBlock.value) {
    blockStart.value = Math.floor((cp - 1) / blockSize) * blockSize + 1;
  }
});

onMounted(() => {
  loadBookmarkList(1)
})
</script>

<style scoped>
.deal-pagination button {
  min-width: 32px;
  height: 32px;
  line-height: 1;
  font-size: 14px;
}
</style>