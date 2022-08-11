import Shelter from '../models/Shelter';
import {shelterService} from '../services'
import {citiesService} from '../services'

const state = {
    dialogEditState: false,
    dialogDeleteState: false,
    shelter: new Shelter(),
    title: "",
    totalShelters: 0,
    status: {},
    shelters: [],
    cities: []
};
const mutations = {
    dialogEditOpen(state, data) {
        state.dialogEditState = true;
        state.shelter = data.shelter;
        state.title = data.title;
    },
    dialogEditClose(state) {
        state.dialogEditState = false;
        state.shelter = new Shelter();
        state.title = "";
    },
    dialogDeleteOpen(state, data) {
        state.dialogDeleteState = true;
        state.shelter = data;
    },
    dialogDeleteClose(state) {
        state.dialogDeleteState = false;
        state.shelter = new Shelter();
    },
    getSheltersOk(state, data) {
        state.status = {gotShelters: true}
        state.shelters = data.shelters
        state.totalShelters = data.totalShelters
    },
    getCitiesOk(state, data) {
        state.cities = data
    },
    getFailed(state) {
        state.status = {}

    },
    editShelterOk(state, data) {
        state.shelter.idShelter = data.idShelter;
        state.shelter.name = data.name;
        state.shelter.lon = data.lon;
        state.shelter.lat = data.lat;
        state.shelter.idCity = data.idCity;
        var index = state.shelters.findIndex(v => v.idShelter === data.idShelter);
        state.shelters.splice(index, 1);
        for (let city of state.cities) {
            if (city.idCity == data.idCity) {
                data.nameCity = city.city
            }
        }
        state.shelters.splice(index, 0, data);
    },

    deleteShelterOk(state, data) {
        state.shelters.splice(state.shelters.findIndex(v => v.idShelter === data.idShelter), 1);
        state.totalShelters--;
    },
    addShelterOk(state, data) {
        for (let city of state.cities) {
            if (city.idCity == data.idCity) {
                data.nameCity = city.city
            }
        }
        state.shelters.splice(0, 0, data);
        state.totalShelters++;
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
    getShelters({dispatch, commit}, data) {
        commit("general/changeLoading", {type: true, label: "Obteniendo Albergues"}, {root: true});
        shelterService.getShelters(data.n, data.i, data.search)
            .then(
                data => {

                    commit('getSheltersOk', {shelters: data.shelters, totalShelters: data.total});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    editShelter({dispatch, commit}, shelter) {
        commit("general/changeLoading", {type: true, label: "Modificando Albergue"}, {root: true});
        shelterService.editShelter(shelter)
            .then(
                () => {
                    commit('editShelterOk', shelter);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    addShelter({dispatch, commit}, shelter) {
        commit("general/changeLoading", {type: true, label: "Agregando Albergue"}, {root: true});
        shelterService.addShelter(shelter)
            .then(
                (id) => {
                    shelter.idShelter = id;
                    commit('addShelterOk', shelter);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    deleteShelter({dispatch, commit}, shelter) {
        commit("general/changeLoading", {type: true, label: "Eliminando Albergue"}, {root: true});
        shelterService.deleteShelter(shelter)
            .then(
                () => {
                    commit('deleteShelterOk', shelter);
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


export const viewShelters = {
    namespaced: true,
    state,
    actions,
    mutations
};
