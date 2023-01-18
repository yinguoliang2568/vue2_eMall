import Vue from "vue";
import Vuex from "vuex";
import category from "./modules/Category";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        category,
    },
});