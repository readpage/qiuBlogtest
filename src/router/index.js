import { createRouter, createWebHashHistory } from "vue-router";
import test from "@/views/Test.vue";
//普通路由 无需验证权限
export const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "主页",
    },
    component: test,
  },
];

const router = createRouter({
  history: createWebHashHistory(""),
  routes,
});

export default router;
