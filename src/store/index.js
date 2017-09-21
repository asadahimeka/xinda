import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    //状态集合
    state: {
        // cartnum: 0,
        phoneNum: '',
        username: ''
    },
    //突变集合
    mutations: {
        // CARTMUTA: (state, num) => state.cartnum = num,
        PHONEMUTA: (state, num) => state.phoneNum = num,
        USER: (state, num) => state.username = num,
    },
    //方法集合
    actions: {
        // cartAction: ({ commit }, num) => commit('CARTMUTA', num),
        phoneAction: ({ commit }, num) => commit('PHONEMUTA', num),
        userAction: ({ commit }, num) => commit('USER', num),
    },
    //显示集合
    getters: {
        // getCartnum: state => state.cartnum,
        getPhoneNum: state => state.phoneNum,
        getUserName: state => state.username,
    },
})