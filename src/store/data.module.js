import {dataService} from '../services'

const state = {
    status: false
};
const mutations = {
    uploadData(state, data) {
        state.status = data
    },

};
const actions = {
    uploadData({dispatch, commit}, data) {
        commit("general/changeLoading", {type: true, label: "Subiendo archivo"}, {root: true});
        dataService.uploadData(data)
            .then(
                (res) => {
                    commit('uploadData', res);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    dispatch('alert/error', error, {root: true});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                }
            );
    },
};


export const data = {
    namespaced: true,
    state,
    actions,
    mutations
};
