import {accountService} from '../services';
import router from '../router';
import {tokenLib} from '../lib/token.lib'

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const state = {
    status: token ? {loggedIn: true} : {},
    user: user ? user : {},
};
const mutations = {
    loginSuccess(state, user) {
        state.status = {loggedIn: true};
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
};
const actions = {
    login({dispatch, commit}, loginRequest) {
        commit("general/changeLoading", {type: true, label: "Iniciando Sesión"}, {root: true});
        accountService.login(loginRequest)
            .then(
                user => {
                    commit('loginSuccess', user);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                    router.push('/home');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, {root: true});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                }
            );
    },
    logout() {
        tokenLib.removeTokens();
        location.reload();
    }
};


export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
