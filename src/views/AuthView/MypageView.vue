<script>
import { ref } from "vue";
// import { useRouter } from "vue-router";
import { update, getMypage } from "@/api/mypageApi";
import { getMemberUuid } from "@/util/auth/auth";
import { checkPassword as apiCheckPassword } from "@/api/checkPasswordApi.js";
import Swal from "sweetalert2";
import "@/assets/css/MypageView.css";

export default {
  setup() {
    const memberUuid = ref(getMemberUuid());
    const password = ref(""); // 확인용 비밀번호
    const nickname = ref(""); // 닉네임
    const username = ref(""); // 이름(읽기 전용)
    const userEmail = ref(""); // 이메일
    const createdAt = ref(""); // 가입일
    const phoneNumber = ref(""); // 휴대폰 번호
    const checkP = ref(false); // 비밀번호 인증 여부

    // const router = useRouter();

    // 인증 후 호출: 실제 마이페이지 데이터 로드
    const loadMypageData = async () => {
      try {
        const res = await getMypage(memberUuid.value);
        const data = res.data.result;
        nickname.value = data.memberName;
        username.value = data.name;
        userEmail.value = data.email;
        createdAt.value = data.createdAt;
        phoneNumber.value = data.phoneNumber;
      } catch (err) {
        console.error("회원 정보 조회 실패:", err);
      }
    };

    // 비밀번호 확인 핸들러
    const startChecking = async (event) => {
      event.preventDefault();
      Swal.fire({
        title: "확인 중…",
        html: "잠시만 기다려주세요.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        // API 스펙에 따라 객체 형태로 넘기세요.
        await apiCheckPassword({ password: password.value });
        Swal.close();
        await Swal.fire({
          title: "비밀번호 확인 완료",
          icon: "success",
          confirmButtonText: "확인",
          confirmButtonColor: "#115C5E",
          allowOutsideClick: true,
        });

        checkP.value = true;
        await loadMypageData();
      } catch (err) {
        Swal.close();
        await Swal.fire({
          title: "비밀번호 확인 실패",
          html: "비밀번호가 일치하지 않습니다.",
          icon: "error",
          confirmButtonText: "다시 시도",
          confirmButtonColor: "#D33",
          allowOutsideClick: true,
        });
        console.error("비밀번호 확인 에러:", err);
      }
    };

    // 정보 수정 핸들러
    const handleSubmit = async (event) => {
      event.preventDefault();
      const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
      if (!phoneRegex.test(phoneNumber.value)) {
        return Swal.fire({ title: "오류", html: "올바른 휴대폰 번호 형식이 아닙니다.", icon: "warning" });
      }

      try {
        await update(memberUuid.value, nickname.value, userEmail.value, phoneNumber.value);
        Swal.fire({ title: "수정 완료", icon: "success" });
      } catch (err) {
        Swal.fire({ title: "수정 실패", icon: "error" });
        console.error("개인정보 수정 에러:", err);
      }
    };

    return {
      password,
      nickname,
      username,
      userEmail,
      createdAt,
      phoneNumber,
      checkP,
      startChecking,
      handleSubmit,
    };
  },
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <!-- 1) 비밀번호 확인 폼 -->
        <form v-if="!checkP" class="login-form" @submit="startChecking">
          <div class="form-group">
            <label class="form-label" for="password">비밀번호 확인</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-input bg-gray-100"
              placeholder="비밀번호를 입력하세요."
              required
            />
          </div>
          <button type="submit" class="login-button">확인</button>
        </form>

        <!-- 2) 인증 후 개인정보 수정 폼 -->
        <form v-else class="login-form" @submit="handleSubmit">
          <h1 class="login-title">마이 페이지</h1>
          <p class="login-subtitle">회원님의 정보입니다.</p>

          <div class="form-group">
            <label class="form-label" for="nickname">닉네임</label>
            <input id="nickname" v-model="nickname" type="text" class="form-input bg-gray-100" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="username">이름</label>
            <input id="username" v-model="username" type="text" readonly class="form-input bg-gray-100" />
          </div>

          <div class="form-group">
            <label class="form-label" for="userEmail">이메일</label>
            <input id="userEmail" v-model="userEmail" type="email" class="form-input bg-gray-100" required />
          </div>

          <div class="form-group">
            <label class="form-label" for="phoneNumber">휴대폰 번호</label>
            <input id="phoneNumber" v-model="phoneNumber" type="tel" class="form-input bg-gray-100" required />
          </div>

          <button type="submit" class="login-button">수정하기</button>
        </form>
      </div>
    </div>
  </div>
</template>
