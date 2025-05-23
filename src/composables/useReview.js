
import { ref, watch } from "vue";
import { getReview } from "@/api/reviewApi"; 

export default function useReview(aptSeq) {

  const comments = ref([]);
const totalCount = ref(0);
const currentPage = ref(1);
const totalPage = ref(1);
const pageList = ref([]);

async function loadReviews(page = 1) {
  try {
    const { data } = await getReview(aptSeq.value, page); // page 파라미터 전달
    if (data.dtoList) {
      comments.value = data.dtoList;
      totalCount.value = data.totalCount;
      totalPage.value = data.totalPage;
      currentPage.value = data.current;
      pageList.value = data.pageNumList;
    }
  } catch (e) {
    console.warn("리뷰 불러오기 실패", e);
  }
}

  watch(aptSeq, () => {
    loadReviews();
  }, { immediate: true });

  return {
    comments,   
    totalCount,currentPage 
    ,totalPage,pageList,
    reload: loadReviews,
  };
}
