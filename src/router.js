import { createRouter, createWebHistory } from "vue-router";
import MapView from "@/views/MapView/MapView.vue";
import MainView from "@/views/MainView/MainView.vue";
import Login from "@/views/AuthView/LoginView.vue";
import Signup from "@/views/AuthView/SignupView.vue";
import { isLoggedIn } from "@/util/auth/auth";

const routes = [
  { path: "/", name: "Home", component: MainView },
  { path: "/map", name: "Map", component: MapView },
  { path: "/login", name: "Login", component: Login, meta: { guestOnly: true } },
  { path: "/signup", name: "Signup", component: Signup, meta: { guestOnly: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 게스트 전용 페이지 접근 방지
router.beforeEach((to, from, next) => {
  if (to.meta.guestOnly && isLoggedIn()) {
    return next("/");
  }
  next();
});

export default router;
