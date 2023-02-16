// 引入Mock方法和mock的数据
import Mock from "mockjs";
import banner from "./data/banner.json";
import floor from "./data/floor.json";
import address from "./data/address.json";

// 通过mock老模拟本地数据接口
// 模拟banner接口的数据
// 当系统访问的是这个这个接口的时候，会被mock拦截下来，返回的值就是回调函数的返回值
Mock.mock("/mock-api/banner", "get", () => {
    return {
        code: 200,
        message: "成功",
        data: banner,
        ok: true,
    };
});
// 模拟floor接口数据
Mock.mock("/mock-api/floor", "get", () => {
    return {
        code: 200,
        message: "成功",
        data: floor,
        ok: true,
    };
});

// address
Mock.mock("/mock-api/address", "get", () => {
    return {
        code: 200,
        message: "成功",
        data: address,
        ok: true,
    };
});