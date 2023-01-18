import Vue from "vue";
import { req_Catagory1List, req_Catagory2List, req_Catagory3List } from "@/api";
const state = {
    category1List: [],
};
const mutations = {
    // 设置一级分类列表数据
    setCategory1List(state, paylode) {
        state.category1List = paylode.category1List;
        // 给一级分类数据每个添加一个children属性
        state.category1List.forEach((item) => {
            // 普通对象添加属性那个属性不会是响应式属性，我们需要使用Vue.set()方法去添加。
            Vue.set(item, "children", []);
        });
    },

    // 设置二级分类列表数据
    setCategory2List(state, paylode) {
        // 通过index下标进行确定每个result即二级分类列表，把值赋值给一级的children属性。
        state.category1List[paylode.nowCategoryIndex].children = paylode.result;
    },
};
const actions = {
    // 获取一级分类数据
    async getCategory1List({ commit }) {
        const result = await req_Catagory1List();
        //
        commit("setCategory1List", { category1List: result });
    },

    // 获取二级分类数据，后面参数category1Id需要根据点击触发传参的数值来看是普通数据还是对象。
    async getCategory2List({ commit, state }, category1Id) {
        // 找到当前点击的数据，查看当前点击的数据是否已经有了children数据
        const nowCategory = state.category1List.find((item) => {
            return item.id === category1Id;
        });
        // console.log(nowCategory, "nowCategory");
        // 获取当前点击的数据的下标
        const nowCategoryIndex = state.category1List.findIndex((item) => {
            return item.id === category1Id;
        });
        // 判断数据中是否有children属性有数据，不再请求
        if (nowCategory.children.length !== 0) return;

        //获取到的二级分类列表数据

        const result = await req_Catagory2List(category1Id);
        // console.log(result, "result2");
        // 按照二级分类数据获取每个二类数据的三级分类数据，并放在children属性上
        const category3Arr = [];
        result.forEach((item) => {
            const category3Item = req_Catagory3List(item.id);
            category3Arr.push(category3Item);
        });

        // 利用Promise.all进行多并发使用
        const category3List = await Promise.all(category3Arr);

        // 将三级列表的数据赋值给二级分类的children属性上
        // 因为每个三级和二级的都是一一对应的，所以直接index就行
        result.forEach((item, index) => {
            item.children = category3List[index];
        });
        commit("setCategory2List", { result, nowCategoryIndex });
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