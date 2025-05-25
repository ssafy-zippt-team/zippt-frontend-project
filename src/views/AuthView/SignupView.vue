<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/util/auth/auth";
import Swal from "sweetalert2";
import "@/assets/css/LoginView.css";

export default {
  setup() {
    const nickname = ref(""); // 닉네임
    const username = ref(""); // 성함
    const userEmail = ref(""); // 이메일
    const password = ref(""); // 비번
    const passwordConfirm = ref(""); // 비번 확인
    const phoneNumber = ref(""); // 폰번호

    const router = useRouter();

    const handleSubmit = async () => {
      // event.preventDefault()
      console.log(
        nickname.value,
        username.value,
        userEmail.value,
        password.value,
        passwordConfirm.value,
        phoneNumber.value
      );

      if (password.value !== passwordConfirm.value) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
      if (!phoneRegex.test(phoneNumber.value)) {
        alert("올바른 휴대폰 번호 형식이 아닙니다. (예: 01012345678 또는 010-1234-5678)");
        return;
      }
      Swal.fire({
          title: "로그인 중…",
          html: "잠시만 기다려주세요.",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
      });

      try {
        await signup(nickname.value, username.value, userEmail.value, password.value, phoneNumber.value);
        // signup이 성공했을 때만 실행
        // alert("회원가입 성공!");
        Swal.update({
          title: "SignUp Success",
          html: "로그인 후 이용해 주세요",
          allowOutsideClick: true,
          showConfirmButton: true,
          icon: "success"
        });
        Swal.hideLoading();
        router.push("/login");
      } catch (e) {
        // alert("회원가입 실패");
        Swal.update({
          title: "SignUp Fail",
          html: "입력 정보를 다시 확인해 주세요",
          allowOutsideClick: true,
          showConfirmButton: true,
          icon: "error"
        });
        Swal.hideLoading();
      }

      console.log(nickname.value, username.value, userEmail.value, password.value, phoneNumber.value);
    };
    return { nickname, username, userEmail, password, passwordConfirm, phoneNumber, handleSubmit };
  },
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <form class="login-form" @submit.prevent="handleSubmit">
          <h1 class="login-title">회원가입</h1>
          <p class="login-subtitle">정보를 입력해주세요</p>

          <div class="form-group">
            <label class="form-label" for="nickname">닉네임</label>
            <input id="nickname" v-model="nickname" type="text" required class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="username">이름</label>
            <input id="username" v-model="username" type="text" required class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="userEmail">이메일</label>
            <input id="userEmail" v-model="userEmail" type="userEmail" required class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="password">비밀번호</label>
            <input id="password" v-model="password" type="password" required class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="passwordConfirm">비밀번호 확인</label>
            <input id="passwordConfirm" v-model="passwordConfirm" type="password" required class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label" for="phoneNumber">휴대폰 번호</label>
            <input id="phoneNumber" v-model="phoneNumber" type="tel" required class="form-input" />
          </div>

          <button type="submit" class="login-button">회원가입</button>

          <p class="signup-text mt-4">
            이미 계정이 있으신가요?
            <router-link to="/login" class="signup-link">로그인</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
