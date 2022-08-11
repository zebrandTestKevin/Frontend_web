import Account from '../models/Account';
import {accountService} from '../services/'

const state = {
    dialogEditState: false,
    dialogDeleteState: false,
    account: new Account(),
    title: "",
    totalAccounts: 0,
    status: {},
    accounts: [],
};
const mutations = {
    dialogEditOpen(state, data) {
        state.dialogEditState = true;
        state.account = data.account;
        state.title = data.title;
    },
    dialogEditClose(state) {
        state.dialogEditState = false;
        state.account = new Account();
        state.title = "";
    },
    dialogDeleteOpen(state, data) {
        state.dialogDeleteState = true;
        state.account = data;
    },
    dialogDeleteClose(state) {
        state.dialogDeleteState = false;
        state.account = new Account();
    },
    getAccountsOk(state, data) {
        state.status = {gotAccounts: true}
        state.accounts = data.accounts
        state.totalAccounts = data.totalAccounts
    },
    getCitiesOk(state, data) {
        state.cities = data
    },
    getFailed(state) {
        state.status = {}

    },
    editAccountOk(state, data) {
        state.account.idUser = data.idUser;
        state.account.userName = data.userName;
        state.account.lastName = data.lastName;
        state.account.email = data.email;
        var index = state.accounts.findIndex(v => v.idUser === data.idUser);
        state.accounts.splice(index, 1);
        state.accounts.splice(index, 0, data);
    },

    deleteAccountOk(state, data) {
        state.accounts.splice(state.accounts.findIndex(v => v.idUser === data.idUser), 1);
        state.totalAccounts--;
    },
    addAccountOk(state, data) {
        state.accounts.splice(0, 0, data);
        state.totalAccounts++;
    }

};
const actions = {
    dialogEditOpen({commit}, data) {
        commit('dialogEditOpen', data)
    },
    dialogEditClose({commit}) {
        commit('dialogEditClose')
    },
    dialogDeleteOpen({commit}, data) {
        commit('dialogDeleteOpen', data)
    },
    dialogDeleteClose({commit}) {
        commit('dialogDeleteClose')
    },
    getAccounts({dispatch, commit}, data) {
        commit("general/changeLoading", {type: true, label: "Obteniendo Cuentas"}, {root: true});
        accountService.getAccounts(data.n, data.i, data.search)
            .then(
                data => {

                    commit('getAccountsOk', {accounts: data.accounts, totalAccounts: data.total});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    editAccount({dispatch, commit}, account) {
        commit("general/changeLoading", {type: true, label: "Modificando Cuenta"}, {root: true});
        accountService.editAccount(account)
            .then(
                () => {
                    commit('editAccountOk', account);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                }
            );
    },
    addAccount({dispatch, commit}, account) {
        commit("general/changeLoading", {type: true, label: "Agregando Cuenta"}, {root: true});
        accountService.addAccount(account)
            .then(
                (id) => {
                    account.idUser = id;
                    commit('addAccountOk', account);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                }
            );
    },
    deleteAccount({dispatch, commit}, account) {
        commit("general/changeLoading", {type: true, label: "Eliminando Cuenta"}, {root: true});
        accountService.deleteAccount(account)
            .then(
                () => {
                    commit('deleteAccountOk', account);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                }
            );
    },
};


export const viewAccounts = {
    namespaced: true,
    state,
    actions,
    mutations
};
