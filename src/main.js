import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueZoomOnHover from 'vue-zoom-on-hover'
import "../src/assets/css/index.css";

// ① custom-marker.css 전역 등록
import "@/assets/css/custom-marker.css";
createApp(App).use(router).component('VueZoomOnHover', VueZoomOnHover).mount("#app");
