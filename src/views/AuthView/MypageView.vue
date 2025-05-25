<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { update, getMypage } from "@/api/mypageApi";
import { getMemberUuid } from '@/util/auth/auth';
import "@/assets/css/MypageView.css";

export default {
  setup() {
    const nickname = ref("");      // 닉네임
    const username = ref("");      // 이름
    const userEmail = ref("");     // 이메일
    const password = ref("");      // 비밀번호 (빈 값 유지)
    const createdAt = ref("");     // 계정 생성일자
    const phoneNumber = ref("");   // 휴대폰 번호
    const memberUuid = ref("");    // 회원 UUID
    const router = useRouter();

    onMounted(async () => {
      try {
        memberUuid.value = getMemberUuid(); 
        console.log("회원 UUID:", memberUuid.value);
        const res = await getMypage(memberUuid.value);
        const data = res.data.result;

        nickname.value = data.memberName;
        username.value = data.name;
        userEmail.value = data.email;
        password.value = ""; // 비밀번호는 빈 값 유지
        createdAt.value = data.createdAt;
        phoneNumber.value = data.phoneNumber;
      } catch (e) {
        console.error("회원 정보 조회 실패", e);
      }
    });

    const handleSubmit = async () => {
      const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
      if (!phoneRegex.test(phoneNumber.value)) {
        alert("올바른 휴대폰 번호 형식이 아닙니다.");
        return;
      }

      try {
        await update(memberUuid.value, nickname.value, userEmail.value, phoneNumber.value);
        alert("개인정보 수정 완료!");
      } catch (e) {
        alert("개인정보 수정 실패");
        console.error(e);
      }
    };

    return {
      nickname,
      username,
      userEmail,
      password,
      createdAt,
      phoneNumber,
      memberUuid,
      handleSubmit,
      router,
    };
  },
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <form class="login-form" @submit.prevent="handleSubmit">
          <h1 class="login-title">마이 페이지</h1>
          <p class="login-subtitle">회원님의 정보입니다.</p>

          <div class="form-group">
            <label class="form-label" for="nickname">닉네임</label>
            <input id="nickname" v-model="nickname" type="text" class="form-input bg-gray-100" />
          </div>

          <div class="form-group">
            <label class="form-label" for="username">이름</label>
            <input id="username" v-model="username" type="text" readonly class="form-input bg-gray-100" />
          </div>

          <div class="form-group">
            <label class="form-label" for="userEmail">이메일</label>
            <input id="userEmail" v-model="userEmail" type="email" class="form-input bg-gray-100" />
          </div>

          <div class="form-group">
            <label class="form-label" for="password">비밀번호</label>
            <input id="password" v-model="password" type="password" class="form-input bg-gray-100" placeholder="비밀번호는 변경되지 않습니다." readonly />
          </div>

          <!-- <div class="form-group">
            <label class="form-label" for="createdAt">계정생성일자</label>
            <input id="createdAt" v-model="createdAt" type="text" readonly class="form-input bg-gray-100" />
          </div> -->

          <div class="form-group">
            <label class="form-label" for="phoneNumber">휴대폰 번호</label>
            <input id="phoneNumber" v-model="phoneNumber" type="tel" class="form-input bg-gray-100" />
          </div>

          <button type="submit" class="login-button">수정하기</button>
        </form>
      </div>
    </div>
  </div>
</template>
