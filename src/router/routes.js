export default [
  { path: "/home", component: () => import("@/views/Home") },
  { path: "/Login", component: () => import("@/views/Login") },
  { path: "/Register", component: () => import("@/views/Register") },
  { path: "/Search", component: () => import("@/views/Search") },
  { path: "/*", component: () => import("@/views/404") },
];
