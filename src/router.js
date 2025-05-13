import { createRouter, createWebHistory } from "vue-router";
// import MapView from "./components/MapView.vue";
import MapView from "./components/AddressMap.vue";

const routes = [
  { path: "/", name: "Map", component: MapView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
