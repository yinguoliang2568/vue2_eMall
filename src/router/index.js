import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

Vue.use(VueRouter);

import routes from "./routes";

const router = new VueRouter({
    // 解决滚动条跳转到额时候无法到最上面的问题
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    mode: "history",
    routes,
});
// 3，重写push
const oldPush = VueRouter.prototype.push;

VueRouter.prototype.push = function(
    location,
    onComplete = () => {},
    onAbort = () => {}
) {
    oldPush.call(this, location, onComplete, onAbort);
};
/*
1,判断是否存在token
   *存在token
     *判断是否去的是登录页，如果是，则直接跳转到首页
     *判断是否存在用户名
        存在用户名：说明刚刚登录过，已经进行过鉴权，可以直接放行
        不存在用户名：
           - 那token去访问用户名
             - 成功访问用户名，直接放行
             - 访问失败，说明token被篡改或者过期，需要跳转到登录页重新获取tokken（一定要把这个token删除掉，不然会陷入死循环）

   *不存在token
     * 判断是否需要token才能访问，如果不需要，直接放行
     * 如果需要token，那么直接跳转到登录页面去获取token


*/
const whiteArr = ["Home", "Detail", "Login", "Register", "Search"];
// 全局前置守卫beforeEach
router.beforeEach(async(to, from, next) => {
    NProgress.start();
    const token = store.state.User.token;
    // 判断是否存在用户名
    const nickName = !!store.state.User.userMessage.nickName;
    // 判断存在token
    if (token) {
        // 判断是否去的是登录页，如果是，则直接跳转到首页
        if (to.name === "Login") {
            next("/home");
        } else {
            // 判断是否存在用户名
            // 成功访问用户名，直接放行
            if (nickName) {
                next();
            } else {
                // 不存在用户名：
                // 那token去访问用户名
                try {
                    await store.dispatch("User/getMessage");
                    //  成功访问用户名，直接放行
                    next();
                } catch (e) {
                    // 访问失败
                    // 一定要把这个token删除掉，不然会陷入死循环
                    store.commit("User/removeToken");
                    // 跳转到登录页重新获取tokken
                    next("/login");
                }
            }
        }
        console.log(token);
    } else {
        // 判断是否需要token才能访问，如果不需要，直接放行
        if (whiteArr.includes(to.name)) {
            next();
        } else {
            // 如果需要token， 那么直接跳转到登录页面去获取token
            next("/login");
        }
    }
    next();
});

// 全局后置钩子afterEach

router.afterEach(() => {
    NProgress.done();
});
export default router;