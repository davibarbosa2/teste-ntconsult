import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/pages/HomeView.vue"),
      },

      {
        path: "/search",
        name: "search",
        component: () => import("@/pages/SearchView.vue"),
      },

      {
        path: "/reservation",
        name: "reservation",
        component: () => import("@/pages/ReservationView.vue"),
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
