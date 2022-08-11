import Drugstore from '../models/Drugstore';
import {drugstoreService} from '../services'
import {citiesService} from '../services'

const state = {
    dialogEditState: false,
    dialogDeleteState: false,
    drugstore: new Drugstore(),
    title: "",
    totalDrugstores: 0,
    status: {},
    drugstores: [],
    cities: []
};
const mutations = {
    dialogEditOpen(state, data) {
        state.dialogEditState = true;
        state.drugstore = data.drugstore;
        state.title = data.title;
    },
    dialogEditClose(state) {
        state.dialogEditState = false;
        state.drugstore = new Drugstore();
        state.title = "";
    },
    dialogDeleteOpen(state, data) {
        state.dialogDeleteState = true;
        state.drugstore = data;
    },
    dialogDeleteClose(state) {
        state.dialogDeleteState = false;
        state.drugstore = new Drugstore();
    },
    getDrugstoresOk(state, data) {
        state.status = {gotDrugstores: true}
        state.drugstores = data.drugstores
        state.totalDrugstores = data.totalDrugstores
    },
    getCitiesOk(state, data) {
        state.cities = data
    },
    getFailed(state) {
        state.status = {}

    },
    editDrugstoreOk(state, data) {
        state.drugstore.idDrugstore = data.idDrugstore;
        state.drugstore.name = data.name;
        state.drugstore.lon = data.lon;
        state.drugstore.lat = data.lat;
        state.drugstore.idCity = data.idCity;
        var index = state.drugstores.findIndex(v => v.idDrugstore === data.idDrugstore);
        state.drugstores.splice(index, 1);
        for (let city of state.cities) {
            if (city.idCity == data.idCity) {
                data.nameCity = city.city
            }
        }
        state.drugstores.splice(index, 0, data);
    },

    deleteDrugstoreOk(state, data) {
        state.drugstores.splice(state.drugstores.findIndex(v => v.idDrugstore === data.idDrugstore), 1);
        state.totalDrugstores--;
    },
    addDrugstoreOk(state, data) {
        for (let city of state.cities) {
            if (city.idCity == data.idCity) {
                data.nameCity = city.city
            }
        }
        state.drugstores.splice(0, 0, data);
        state.totalDrugstores++;
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
    getDrugstores({dispatch, commit}, data) {
        commit("general/changeLoading", {type: true, label: "Obteniendo Farmacias"}, {root: true});
        drugstoreService.getDrugstores(data.n, data.i, data.search)
            .then(
                data => {

                    commit('getDrugstoresOk', {drugstores: data.drugstores, totalDrugstores: data.total});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    editDrugstore({dispatch, commit}, drugstore) {
        commit("general/changeLoading", {type: true, label: "Modificando Farmacia"}, {root: true});
        drugstoreService.editDrugstore(drugstore)
            .then(
                () => {
                    commit('editDrugstoreOk', drugstore);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    addDrugstore({dispatch, commit}, drugstore) {
        commit("general/changeLoading", {type: true, label: "Agregando Farmacia"}, {root: true});
        drugstoreService.addDrugstore(drugstore)
            .then(
                (id) => {
                    drugstore.idDrugstore = id;
                    commit('addDrugstoreOk', drugstore);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    deleteDrugstore({dispatch, commit}, drugstore) {
        commit("general/changeLoading", {type: true, label: "Eliminando Farmacia"}, {root: true});
        drugstoreService.deleteDrugstore(drugstore)
            .then(
                () => {
                    commit('deleteDrugstoreOk', drugstore);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    getCities({dispatch, commit}) {
        commit("general/changeLoading", {type: true, label: "Obteniendo Ciudades"}, {root: true});

        citiesService.getCities()
            .then(
                data => {

                    commit('getCitiesOk', data);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    }
};


export const viewDrugstores = {
    namespaced: true,
    state,
    actions,
    mutations
};
