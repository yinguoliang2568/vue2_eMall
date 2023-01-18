import request from "@/request/request";

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