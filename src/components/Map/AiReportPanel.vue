<template>
  <div class="ai-report-panel">
    <p class="placeholder">{{ aiReport }}</p>
    <!-- 나중에 LLM 결과 UI 가 들어갈 영역 -->
  </div>
</template>

<script setup>
 import { defineProps, toRef } from 'vue';

 // defineProps로 받아온 props 객체에서 aiReport만 꺼내 쓰도록 합니다.
 const props    = defineProps({
   aiReport: {
     type: String,
     default: '분석 준비중…'
   }
 });
 const aiReport = toRef(props, 'aiReport');
</script>

<style scoped>
.ai-report-panel {
  padding: 0.75rem 1rem;
  color: #444;
  font-size: 0.9rem;
}
.placeholder {
  color: #888;
  font-style: italic;
}
</style>
