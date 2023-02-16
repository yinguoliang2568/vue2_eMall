// 保存数据
export function setItem(UserTempType, value) {
    localStorage.setItem(UserTempType, value);
}
// 获取数据
export function getItem(UserTempType) {
    return localStorage.getItem(UserTempType);
}
// 删除数据
export function removeItem(UserTempType) {
    localStorage.removeItem(UserTempType);
}