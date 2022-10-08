import index from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "主页",
    },
    component: index,
  },
  {
    path: "/post/:pid",
    name: "post",
    component: () => import("@/views/Post/test2.vue"),
  },
];

export default routes;
