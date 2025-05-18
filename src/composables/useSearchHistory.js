import { ref, onMounted } from 'vue'

/**
 * @param {string} key   localStorage에 저장할 키 (기본: 'searchHistory')
 * @param {number} limit 히스토리 최대 개수 (기본: 10)
 */
export default function useSearchHistory(key = 'searchHistory', limit = 10) {
  const history = ref([])

  // 1) 마운트 시에 localStorage에서 불러오기
  onMounted(() => {
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        history.value = JSON.parse(stored)
      } catch (e) {
        console.warn('searchHistory 파싱 실패', e)
      }
    }
  })

  // 2) 저장 helper
  function _save() {
    localStorage.setItem(key, JSON.stringify(history.value))
  }

  // 3) 새로운 검색어 추가
  function add(term) {
    if (!term) return
    // 중복 제거 + 최신순 유지 + limit
    history.value = [
      term,
      ...history.value.filter(h => h !== term)
    ].slice(0, limit)
    _save()
  }

  // 4) 전체 히스토리 클리어
  function clear() {
    history.value = []
    localStorage.removeItem(key)
  }

  return { history, add, clear }
}
