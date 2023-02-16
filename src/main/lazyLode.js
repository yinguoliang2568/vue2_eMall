import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";
export default function (Vue) {
  // 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
  Vue.use(VueLazyload, {
    // 内部自定义了一个指令lazy
    loading, // 指定未加载得到图片之前的loading图片
  });
}
