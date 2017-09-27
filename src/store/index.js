import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    //状态集合
    state: {
        cartnum: 0,
        username: '',
        exUser: 0,
    },
    //突变集合
    mutations: {
        CARTMUTA: (state, num) => state.cartnum = num,
        USER: (state, user) => state.username = user,
        EXUSERMUTA: (state, bool) => state.exUser = bool,
    },
    //方法集合
    actions: {
        cartAction: ({ commit }, num) => commit('CARTMUTA', num),
        userAction: ({ commit }, user) => commit('USER', user),
        exAction: ({ commit }, ex) => commit('EXUSERMUTA', ex),
    },
    //显示集合
    getters: {
        getCartnum: state => state.cartnum,
        getUserName: state => state.username,
        getExUser: state => state.exUser,
    },
})