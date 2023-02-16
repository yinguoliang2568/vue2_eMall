import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
// mock配置好了，需要引入触发
import "@/mock";

// 引入懒加载
import lazyLode from "@/main/lazyLode";
import element from "@/main/element";
import components from "@/main/components";
import validate from "@/main/validate";

Vue.use(lazyLode);
Vue.use(element);
Vue.use(components);
Vue.use(validate);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // header和search组件是兄弟组件，使用事件总线的方式进行通信
  // 需要在mounted之前挂载上$bus，不然无法进行添加$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
  },

  router,
  store,
}).$mount("#app");
