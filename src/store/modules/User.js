import { getItem, setItem, removeItem } from "@/utils/LocalStorage";
import { reqLogin, reqUserMessage } from "@/api";
import userTempId from "@/utils/userTempId";
const state = {
    // userTempId是函数，需要执行
    userTempId: userTempId(),
    // 默认获取本地存储中的token
    token: getItem("token") || "",
    userMessage: {},
};
const mutations = {
    setToken(state, paylode) {
        state.token = paylode.token;
    },
    // 设置用户信息
    set_Message(state, paylode) {
        state.userMessage = paylode.userMessage;
    },

    // 移出token
    removeToken(state) {
        // 删除vuex里面的token数据
        state.token = "";
        // 深处本地存储里面的token数据
        removeItem("token");
        // 删除用户信息
        state.userMessage = {};
    },
};
const actions = {
    // 获取token
    async getTokne({ commit }, loginInfo) {
        const result = await reqLogin(loginInfo);
        // 将请求回来的token修改vuex里面，并保存在本地存储里面
        setItem("token", result.token);
        commit("setToken", { token: result.token });
        alert("登录成功");
    },
    // 获取用户信息
    async getMessage({ commit }) {
        // 发送请求
        const re = await reqUserMessage();
        commit("set_Message", { userMessage: re });
    },
};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};