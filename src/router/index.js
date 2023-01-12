import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes,
});
// 设置全局前置守卫
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

// 设置全局后置钩子
router.afterEach(() => {
    NProgress.done();
});

export default router;