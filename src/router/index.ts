import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/Pages/HomeView.vue"),
      },

      {
        path: "/search",
        name: "search",
        component: () => import("@/Pages/SearchView.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
