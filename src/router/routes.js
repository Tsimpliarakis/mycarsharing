import { authStore } from "src/stores/auth-store";

// Create a function for the beforeEnter guard
function requireAuth(to, from, next) {
  // Check if the user is logged in
  if (!localStorage.getItem("sb-igohglatbbhgyelsipze-auth-token")) {
    next("/login");
  } else {
    next();
  }
}

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
      if (localStorage.getItem("sb-igohglatbbhgyelsipze-auth-token")) {
        next("/");
      } else {
        next();
      }
    },
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/account",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [{ path: "", component: () => import("pages/AccountPage.vue") }],
  },
  {
    path: "/bookings",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [{ path: "", component: () => import("pages/BookingsPage.vue") }],
  },
  {
    path: "/mycars",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [{ path: "", component: () => import("pages/MyCarsPage.vue") }],
  },
  {
    path: "/mycars/new",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [{ path: "", component: () => import("pages/AddCarPage.vue") }],
  },
  {
    path: "/favorites",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [
      { path: "", component: () => import("pages/FavoritesPage.vue") },
    ],
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
  {
    path: "/car",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/CarPage.vue"),
      },
    ],
  },
  {
    path: "/book",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [
      {
        path: "",
        component: () => import("src/pages/BookPage.vue"),
      },
    ],
  },
  {
    path: "/privacy-policy",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/PrivacyPolicyPage.vue"),
      },
    ],
  },
  {
    path: "/contact-us",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/ContactUsPage.vue"),
      },
    ],
  },
  {
    path: "/profile/:username",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/ProfilePage.vue") },
    ],
  },
  {
    path: "/terms-and-conditions",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/TermsAndConditionsPage.vue"),
      },
    ],
  },
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/AboutPage.vue"),
      },
    ],
  },
  {
    path: "/receipt/:booking_id",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [
      {
        path: "",
        component: () => import("src/pages/ReceiptPage.vue"),
      },
    ],
  },
  {
    path: "/editcar",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [
      {
        path: "",
        component: () => import("src/pages/EditCarPage.vue"),
      },
    ],
  },
  {
    path: "/review/:booking_id",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: requireAuth,
    children: [
      {
        path: "",
        component: () => import("src/pages/ReviewPage.vue"),
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
