import { Button, Dialog, Message } from "element-ui";
export default function (Vue) {
  Vue.use(Dialog);
  Vue.use(Button);
  // 在Vue的原型对象上添加一个$message的实例
  Vue.prototype.$message = Message;
}
