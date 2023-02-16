import {
    reqCategory1List,
    reqCategory2List,
    reqCategory3List,
} from "../../api";
import Vue from "vue";

const state = {
    // 定义一个一级分类列表
    cateGory1List: [],
};
const mutations = {
    // 1，修改一级分类列表数据
    set_Category1List(state, paylode) {
        state.cateGory1List = paylode.cateGory1List;
        // 给cateGory1List里面的所有相添加一个具有响应式的children属性。
        state.cateGory1List.forEach((item) => {
            Vue.set(item, "children", []);
        });
    },
    // 修改二级分类列表
    set_Category2List(state, paylode) {
        state.cateGory1List.forEach((item) => {
            // 根据id判断需要给哪个数据添加数据
            if (item.id === paylode.category1Id) {
                item.children = paylode.cateGory2List;
            }
        });
    },
};
const actions = {
    // 1,获取一级分类列表数据
    async getCategory1List(store) {
        const result = await reqCategory1List();
        // console.log(store.reqCategory1List, "action-store");
        // console.log(result, "actions");
        store.commit("set_Category1List", { cateGory1List: result });
    },
    // 判断一级是否有二级分类的一级分类数据
    async getCategory2List({ commit, state }, category1Id) {
        const nowCateGory = state.cateGory1List.find((item) => {
            return item.id === category1Id;
        });
        if (nowCateGory.children.length !== 0) return;
        const result = await reqCategory2List(category1Id);

        // 设置一个数组用来存放三级请求回来的promise实例
        const reqArr = [];

        result.forEach((item) => {
            const categroy3Promis = reqCategory3List(item.id);
            // 将所有的实例放入数组中
            reqArr.push(categroy3Promis);
        });
        // console.log(reqArr, "reqArr");
        // all是如果数组里面返回到promise实例都是成功的，才会返回一个成功的实例，值就是所有成功promise实例组成的数组
        // 使用awiat进行异步管理你，只有所有的promise都成功了，才会执行下面的代码
        const category3Result = await Promise.all(reqArr);
        // console.log(category3Result, "eeeeee");

        // 因为reqArr数组是按照result的顺序进行添加到数组里面，所以三级分类和二级分类的index是对应的
        category3Result.forEach((item, index) => {
            result[index].children = item;
        });

        commit("set_Category2List", { cateGory2List: result, category1Id });
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