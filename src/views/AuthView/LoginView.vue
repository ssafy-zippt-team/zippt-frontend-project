<script setup>
import { ref, computed } from "vue";
// import { useRouter, useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { login } from "@/util/auth/auth";
import Swal from "sweetalert2";
import { getUsername } from "@/util/auth/auth";
import "@/assets/css/LoginView.css";

const username = ref("");
const password = ref("");
const router = useRouter();
// const route = useRoute();

const handleSubmit = async (event) => {
  event.preventDefault();

  Swal.fire({
    title: "로그인 중…",
    html: "잠시만 기다려주세요.",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    event.preventDefault();

    await login(username.value, password.value);
    const loggedInName = computed(() => getUsername());
    // alert("로그인 성공");
    Swal.close();
    Swal.fire({
      title: "Login Success",
      html: `반갑습니다, ${loggedInName.value}님!`,
      allowOutsideClick: true,
      // showConfirmButton: true,
      confirmButtonText: "확인",
      confirmButtonColor: "#115C5E",
      icon: "success",
    });
    Swal.hideLoading();
    // router.push("/");
    // const redirect = Array.isArray(route.query.redirect)
    //   ? route.query.redirect[0]
    //   : route.query.redirect || "/";
    // router.push(redirect);
    router.back();
  } catch (e) {
    console.error("로그인 에러:", e);
    Swal.update({
      title: "Login Fail",
      html: `Check Email & Password`,
      confirmButtonText: "확인",
      confirmButtonColor: "#115C5E",
      icon: "error",
    });
    Swal.hideLoading();
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <form class="login-form" @submit.prevent="handleSubmit">
          <h1 class="login-title">로그인</h1>
          <p class="login-subtitle">계정 정보를 입력하세요</p>

          <div class="form-group">
            <label class="form-label" for="username">아이디</label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              placeholder="name.@example.com"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="password">비밀번호</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="비밀번호를 입력하세요"
              class="form-input"
            />
          </div>

          <button type="submit" class="login-button">로그인</button>

          <div class="divider"><span>또는</span></div>

          <div class="social-buttons">
            <button type="button" class="social-button">
              <font-awesome-icon :icon="['fab', 'apple']" class="h-5 w-5 mr-2" />
            </button>
            <button type="button" class="social-button">
              <font-awesome-icon :icon="['fab', 'google']" class="h-5 w-5 mr-2" />
            </button>
            <button type="button" class="social-button">
              <font-awesome-icon :icon="['fab', 'github']" class="h-5 w-5 mr-2" />
            </button>
          </div>

          <p class="signup-text">
            아직 회원이 아니신가요?
            <router-link to="/signup" class="signup-link">회원가입</router-link>
          </p>

          <p class="terms-text">
            로그인 시 <a href="#" class="terms-link">이용약관</a> 및
            <a href="#" class="terms-link">개인정보처리방침</a>에 동의하게 됩니다.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
