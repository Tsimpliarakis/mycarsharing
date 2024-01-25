import { authStore } from "src/stores/auth-store";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/HomePage.vue") }],
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      // Redirect to home if the user is already logged in
      if (authStore.state.session) {
        next("/");
      } else {
        next();
      }
    },
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      // Redirect to login if the user is not logged in
      if (!authStore.state.session) {
        next("/login");
      } else {
        next();
      }
    },
    children: [{ path: "", component: () => import("pages/AccountPage.vue") }],
  },
  {
    path: "/cars",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      // Redirect to login if the user is not logged in
      if (!authStore.state.session) {
        next("/login");
      } else {
        next();
      }
    },
    children: [{ path: "", component: () => import("pages/CarsPage.vue") }],
  },
  {
    path: "/cars/new",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      // Redirect to login if the user is not logged in
      if (!authStore.state.session) {
        next("/login");
      } else {
        next();
      }
    },
    children: [{ path: "", component: () => import("pages/AddCarPage.vue") }],
  },
  {
    path: "/search",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/SearchPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
