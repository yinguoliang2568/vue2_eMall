import Mock from "mockjs";
import banner from "./data/banner.json";
import floor from "./data/floor.json";

// 设置阻挡的访问链接-banner
Mock.mock("/mock-api/banner", "get", () => {
    return {
        code: 200,
        message: "成功",
        data: banner,
        ok: true,
    };
});

// 设置阻挡的访问链接-floor
Mock.mock("/mock-api/floor", "get", () => {
    return {
        code: 200,
        message: "成功",
        data: floor,
        ok: true,
    };
});