import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    //状态集合
    state: {
        cartnum: 0,
    },
    //突变集合
    mutations: {
        CARTMUTA: (state, num) => state.cartnum = num,
    },
    //方法集合
    actions: {
        cartAction: ({ commit }, num) => commit('CARTMUTA', num),
    },
    //显示集合
    getters: {
        getCartnum: state => state.cartnum,
    }
})