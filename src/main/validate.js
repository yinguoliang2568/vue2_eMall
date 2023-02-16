import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
export default function (Vue) {
  // 使用表单验证包，必须在VeeValidate.Validator.localize之前使用
  Vue.use(VeeValidate);
  // 本地化
  VeeValidate.Validator.localize("zh_CN ", {
    messages: {
      ...zh_CN.messages,
      is: (n) => n + "n的值必须和上面的相等",
    },
    attributes: {
      // 中文，这里配置的是name的属性
      phone: "手机号码",
      code: "验证码",
      password: "密码",
      passwordAgain: "重复密码",
      agree: "规则",
    },
  });

  // 这里配置的是规则的名字
  VeeValidate.Validator.extend("isAgree", {
    validate: (agree) => {
      return agree;
    },
    getMessage: (n) => n + "必须同意",
  });
}
