export default [
  {
    path: "/home",
    component: () => import("@/views/Home"),
    name: "Home",
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
    name: "Login",
    meta: {
      footIsHidden: true,
    },
  },
  {
    path: "/register",
    component: () => import("@/views/Register"),
    name: "Register",
    meta: {
      footIsHidden: true,
    },
  },
  {
    path: "/search/:keyword?",
    name: "Search",
    component: () => import("@/views/Search"),
    // 接受一个参数，就是当前$route信息
    props(route) {
      return {
        ...route.query,
        ...route.params,
      };
    },
  },
  {
    path: "/detail/:skuId",
    name: "Detail",
    component: () => import("@/views/Detail"),
  },
  {
    path: "/addCartSuccess",
    name: "AddCartSuccess",
    component: () => import("@/views/AddCartSuccess"),
  },
  {
    path: "/shopCart",
    name: "ShopCart",
    component: () => import("@/views/ShopCart"),
  },
  {
    path: "/trade",
    name: "Trade",
    component: () => import("@/views/Trade"),
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // ...
      if (from.name === "ShopCart") {
        next();
      } else {
        next("/shopCart");
      }
    },
  },
  {
    path: "/pay",
    name: "Pay",
    component: () => import("@/views/Pay"),
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // ...
      if (from.name === "Trade") {
        next();
      } else {
        next("/shopCart");
      }
    },
  },
  {
    path: "/paySuccess",
    name: "PaySuccess",
    component: () => import("@/views/PaySuccess"),
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // ...
      if (from.name === "Pay") {
        next();
      } else {
        next("/shopCart");
      }
    },
  },
  {
    path: "/center",
    name: "Center",
    component: () => import("@/views/Center"),
    redirect: "/center/myOrder",
    children: [
      // 我的订单
      {
        path: "myOrder",
        name: "MyOrder",
        component: () => import("@/views/Center/components/MyOrder"),
      },
      // 团队订单
      {
        path: "teamOrder",
        name: "TeamOrder",
        component: () => import("@/views/Center/components/TeamOrder"),
      },
    ],
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/*",
    component: () => import("@/views/404"),
    name: "404",
  },
];
