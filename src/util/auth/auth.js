import router from "@/router";
import { api, refreshApi } from "@/api/authApi";

import { ref, computed } from "vue";

// 메모리 변수로만 보관
export const accessToken = ref(null);
export const loggedIn = computed(() => !!accessToken.value);
let refreshFailCount = 0;
const MAX_REFRESH_FAIL = 3;

// 1) 토큰이 있으면 헤더에 설정
export function setAuthHeader(token) {
  accessToken.value = token;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// 2) 로그인 시 호출 (기존)
export async function login(username, password) {
  const params = new URLSearchParams({ username, password });
  const res = await refreshApi.post("/login", params);
  const token = res.headers["authorization"]?.split(" ")[1];
  if (!token) throw new Error("No access token");
  setAuthHeader(token);
}

// 3) 초기화용: 페이지 로드 시 자동으로 호출
export async function refreshAccessToken() {
  try {
    refreshFailCount++;
    console.log("리프레쉬 토큰 함수 실행 : ", refreshFailCount);
    const res = await refreshApi.post('/api/v1/refresh');
    // const res = await refreshToken();

    const token = res.headers["authorization"]?.split(" ")[1];

    if (token) {
      setAuthHeader(token);
      return token;
    } 

    if (refreshFailCount >= MAX_REFRESH_FAIL) {
      // 3회 이상 실패하면 강제 로그아웃 + 로그인 페이지로
      await api.post("/api/v1/logout").catch(() => {});
      accessToken.value = null;
      router.push("/login");
    }
  } catch (e) {
    // Refresh 실패(쿠키 만료 등) 시에는
  }
  setAuthHeader(null);
  return null;
}

export async function signup(nickname, username, userEmail, password, phoneNumber) {
  await api.post("/api/v1/join", { nickname, username, userEmail, password, phoneNumber });
}

export async function logout() {
  try {
    // ① 백엔드 /logout 호출
    await api.post("/api/v1/logout");
  } catch (e) {
    console.error("Logout API error", e);
    // 그래도 다음 로컬 정리는 해 줍니다
  }
  // ② 클라이언트 저장소·헤더 정리
  delete api.defaults.headers.common["Authorization"];
}

// 4) 로그인 상태 확인
export function isLoggedIn() {
  return !!accessToken.value;
}

// 아주 간단한 JWT 페이로드 파서
function parseJwt(token) {
  try {
    // 1) 점(.)으로 자른 뒤 두 번째 부분(페이로드)만 가져와서
    const base64Url = token.split(".")[1];
    // 2) URL-safe Base64 → 일반 Base64로 복원
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // 3) atob로 디코드 → URI 디코딩 → JSON 파싱
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

// 5) Username 추출 (jwt-decode 대신 parseJwt 사용)
export function getUsername() {
  if (!accessToken.value) return null;
  const payload = parseJwt(accessToken.value);
  return payload?.username || null;
}

export function getMemberUuid() {
  if (!accessToken.value) return null;
  console.log("getMemberUuid 호출, accessToken:", accessToken.value);
  const payload = parseJwt(accessToken.value);
  console.log("Parsed payload:", payload.uuid);
  return payload?.uuid || null;
}

// 인터셉터 부분
api.interceptors.request.use(
  (config) => {
    // (1) 요청 전, 메모리상의 토큰이 있으면 헤더에 붙인다
    if (accessToken.value) {
      config.headers["Authorization"] = `Bearer ${accessToken.value}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    // (2) 401 에러, 아직 _retry 플래그가 없으면
    if (status === 401 && !originalRequest._retry && refreshFailCount < MAX_REFRESH_FAIL) {
      originalRequest._retry = true;
      try {
        // (3) 리프레시 시도
        const newToken = await refreshAccessToken();
        // (4) 헤더 갱신 후 원래 요청 재전송
        // originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        setAuthHeader(newToken);
        return api(originalRequest);
      } catch (refreshError) {
        // ─────────────────────────────────────────────────────────────────────
        // (4) 리프레시 실패 → 완전 로그아웃 처리 및 /login으로 이동
        // ─────────────────────────────────────────────────────────────────────
        // ① 서버측 로그아웃 호출 (DB에 남은 리프레시 토큰 삭제)
        //    RefreshController 가 401 직전에 deleteToken(uuid) 을 실행하니
        //    여기선 굳이 다시 호출하지 않아도 됩니다.
        //
        // 클라이언트 저장소·헤더 정리
        await api.post("/api/v1/logout");

        router.push({ path: '/login' })
        //    혹은 full reload: window.location.href = 'http://localhost:3000/login'
        return Promise.reject(refreshError);
      }
    }

      if (status === 401 && refreshFailCount >= MAX_REFRESH_FAIL) {
      await api.post("/api/v1/logout").catch(() => {});
      router.push("/login");
      // 이후엔 더 이상 인터셉터가 이 요청을 만지지 않도록
    }

    return Promise.reject(error);
  }
);

export default api;