import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Calendar from "../views/TimeReports.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/time-reports", name: "Time Reports", component: Calendar },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
