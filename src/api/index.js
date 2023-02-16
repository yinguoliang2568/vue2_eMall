import request from "../request/request";
import requestMock from "@/request/requestMock";

// 1，一级分类列表请求
export const reqCategory1List = () => {
  return request.get("/admin/product/getCategory1");
};

// 2，二级分类列表请求
export const reqCategory2List = (category1Id) => {
  return request.get(`/admin/product/getCategory2/${category1Id}`);
};

// 3，三级分类列表请求
export const reqCategory3List = (category2Id) => {
  return request.get(`/admin/product/getCategory3/${category2Id}`);
};

// 4，mock中的bannner请求
export const reqMockBannnerList = () => {
  return requestMock.get("/mock-api/banner");
};
// 5，mock中的floor请求
export const reqMockFloorList = () => {
  return requestMock.get("/mock-api/floor");
};

// 6，请求搜索页请求
export const reqSearchList = (searchParams) => {
  return request.post("/api/list", searchParams);
};

// 虎丘详情页数据
export const reqDetailList = (skuId) => {
  return request.get(`/api/item/${skuId}`);
};
// 添加购物车或者更新
export const reqAddOrUpdateCart = (skuId, skuNum) => {
  return request.post(`/api/cart/addToCart/${skuId}/${skuNum}`);
};

// 访问购物车数据
export const reqShopCartList = () => {
  return request.get(`/api/cart/cartList`);
};

// 修改单个购物车状态
export const reqCartChange = (skuID, isChecked) => {
  return request.get(`/api/cart/checkCart/${skuID}/${isChecked}`);
};
// 修改批量购物车状态
export const reqCartAllChange = (isChecked, skuIdList) => {
  return request.post(`/api/cart/batchCheckCart/${isChecked}`, skuIdList);
};

// 删除单个购物车
export const reqCartDelete = (skuId) => {
  return request.delete(`/api/cart/deleteCart/${skuId}`);
};
// 删除批量购物车
export const reqCartAllDelete = (skuIdList) => {
  return request.post(`/api/cart/batchDeleteCart`, skuIdList);
};
// h获取验证码
export const reqCode = (phone) => {
  return request.get(`/api/user/passport/sendCode/${phone}`);
};
// 注册成功
export const reqRegister = (register) => {
  return request.post(`/api/user/passport/register`, register);
};
// 登录
export const reqLogin = (loginInfo) => {
  return request.post(`/api/user/passport/login`, loginInfo);
};
// 利用token获取用户信息
export const reqUserMessage = () => {
  return request.get(`api/user/passport/auth/getUserInfo`);
};

// 退出登录
export const reqLogout = () => {
  return request.get(`/api/user/passport/logout`);
};

// 获取订单页详情页
export const reqReadeList = () => {
  return request.get(`/api/order/auth/trade`);
};

// 获取地址信息
export const reqAddress = () => {
  return requestMock.get(`/mock-api/address`);
};

// 提交订单
export const reqPay = (tradeNo, odrerInfo) => {
  return request.post(
    `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
    odrerInfo
  );
};
// 获取订单页详情页
export const reqOrder = (orderId) => {
  return request.get(`/api/payment/weixin/createNative/${orderId}`);
};
// 获取支付状态
export const reqOrderStatus = (orderId) => {
  return request.get(`/api/payment/weixin/queryPayStatus/${orderId}`);
};

// 获取我的订单
export const reqMyOrder = (page, limit) => {
  return request.get(`/api/order/auth/${page}/${limit}`);
};
