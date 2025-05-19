import { createRouter, createWebHistory } from "vue-router";
import MapView from "@/views/MapView/MapView.vue";
import MainView from "@/components/MainView.vue";

const routes = [
  { path: "/", name: "Home", component: MainView },
  { path: "/map", name: "Map", component: MapView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
