//Module for the loading view
const state = {
    loading: false,
    label: ""
};

const mutations = {
    changeLoading(state, data) {
        state.loading = data.type;
        state.label = data.label;
    },
};
const actions = {};

export const general = {
    namespaced: true,
    state,
    actions,
    mutations
};
