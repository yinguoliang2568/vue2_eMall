import Vue from "vue";
import Vuex from "vuex";
import Category from "./modules/Category";
import User from "@/store/modules/User";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Category,
        User,
    },
});