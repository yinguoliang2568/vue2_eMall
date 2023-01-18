import request from "@/request/request";
import requestMock from "@/request/requestMock";

// 获取一级分类数据
export const req_Catagory1List = function() {
    return request.get("/admin/product/getCategory1");
};

// 获取二级数据
export const req_Catagory2List = function(category1Id) {
    return request.get(`/admin/product/getCategory2/${category1Id}`);
};

// 获取三级数据
export const req_Catagory3List = function(category2Id) {
    return request.get(`/admin/product/getCategory3/${category2Id}`);
};

// 获取banner的mock数据
export const req_BannerList = function() {
    return requestMock.get(`/mock-api/banner`);
};

// 获取floor的mock数据
export const req_FloorList = function() {
    return requestMock.get(`/mock-api/floor`);
};