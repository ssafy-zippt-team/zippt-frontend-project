<template>
  <div class="apt-list-panel">
    <!-- <h2 class="px-4 py-2 text-lg font-semibold border-b">아파트 리스트</h2> -->
    <ul>
      <li
        v-for="apt in aptList"
        :key="apt.aptSeq"
        @click="$emit('select-apt', apt)"
        class="apt-card"
      >
        <img
          v-if="apt.imgUrl"
          :src="`https://ssafyhomebusan.s3.ap-southeast-2.amazonaws.com${apt.imgUrl}`"
          alt="thumb"
        />
        <div class="flex-1">
          <h3 class="text-sm font-medium">{{ apt.aptNm }}</h3>
          <p class="text-xs text-gray-500">
            {{ apt.area }}㎡ · {{ apt.floor }} · {{ apt.bookMarkCount }}★
          </p>
          <p class="text-sm text-blue-600 font-semibold">
            {{ apt.amountAvg.toLocaleString() }}억 / {{ apt.amountMin.toLocaleString() }}억
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, toRef } from 'vue';
import "@/assets/css/AptListPanel.css"

// defineProps 로 props 객체를 받고
const props = defineProps({
  aptList: {
    type: Array,
    default: () => []
  }
});

// toRef 로 개별 prop 을 반응형 참조로 꺼냅니다.
// (toRefs 를 쓰면 여러 개를 한 번에 꺼낼 수도 있어요)
const aptList = toRef(props, 'aptList');
</script>
