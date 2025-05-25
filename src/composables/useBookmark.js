import { ref } from 'vue';
import { toggleBookmark, checkBookmark, getBookmarkCount } from '@/api/bookmarkApi';

export default function useBookmark(memberUuid, aptSeq) {
  const isBookmarked = ref(false);
  const bookmarkCount = ref(0);

  async function fetchBookmarkStatus() {
    try {
      const { data } = await checkBookmark(memberUuid.value, aptSeq.value);
      isBookmarked.value = data.result;
    } catch (err) {
      console.error('북마크 여부 확인 실패', err);
    }
  }

  async function fetchBookmarkCount() {
    try {
      const { data } = await getBookmarkCount(aptSeq.value);
      bookmarkCount.value = data.result;
      console.log('북마크 수:', bookmarkCount.value);
    } catch (err) {
      console.error('북마크 수 조회 실패', err);
    }
  }

  async function toggle() {
    try {
      console.log('북마크 토글 시도', memberUuid.value, aptSeq.value);
      await toggleBookmark(memberUuid.value, aptSeq.value);
    
      isBookmarked.value = !isBookmarked.value;
      bookmarkCount.value += isBookmarked.value ? 1 : -1;
    } catch (err) {
      console.error('북마크 토글 실패', err);
    }
  }

  return {
    isBookmarked,
    bookmarkCount,
    fetchBookmarkStatus,
    fetchBookmarkCount,
    toggle,
  };
}
