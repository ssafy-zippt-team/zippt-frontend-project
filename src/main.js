import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/assets/css/index.css";

// ① custom-marker.css 전역 등록
import "@/assets/css/custom-marker.css";

createApp(App).use(router).mount("#app");
