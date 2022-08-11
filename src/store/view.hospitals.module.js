import Hospital from '../models/Hospital';
import {hospitalService} from '../services/'
import {citiesService} from '../services/'

const state = {
    dialogEditState: false,
    dialogDeleteState: false,
    hospital: new Hospital(),
    title: "",
    totalHospitals: 0,
    status: {},
    hospitals: [],
    cities: []
};
const mutations = {
    dialogEditOpen(state, data) {
        state.dialogEditState = true;
        state.hospital = data.hospital;
        state.title = data.title;
    },
    dialogEditClose(state) {
        state.dialogEditState = false;
        state.hospital = new Hospital();
        state.title = "";
    },
    dialogDeleteOpen(state, data) {
        state.dialogDeleteState = true;
        state.hospital = data;
    },
    dialogDeleteClose(state) {
        state.dialogDeleteState = false;
        state.hospital = new Hospital();
    },
    getHospitalsOk(state, data) {
        state.status = {gotHospitals: true}
        state.hospitals = data.hospitals
        state.totalHospitals = data.totalHospitals
    },
    getCitiesOk(state, data) {
        state.cities = data
    },
    getFailed(state) {
        state.status = {}

    },
    editHospitalOk(state, data) {
        state.hospital.idHospital = data.idHospital;
        state.hospital.name = data.name;
        state.hospital.lon = data.lon;
        state.hospital.lat = data.lat;
        state.hospital.idCity = data.idCity;
        var index = state.hospitals.findIndex(v => v.idHospital === data.idHospital);
        state.hospitals.splice(index, 1);
        for (let city of state.cities) {
            if (city.idCity == data.idCity) {
                data.nameCity = city.city
            }
        }
        state.hospitals.splice(index, 0, data);
    },

    deleteHospitalOk(state, data) {
        state.hospitals.splice(state.hospitals.findIndex(v => v.idHospital === data.idHospital), 1);
        state.totalHospitals--;
    },
    addHospitalOk(state, data) {
        for (let city of state.cities) {
            if (city.idCity == data.idCity) {
                data.nameCity = city.city
            }
        }
        state.hospitals.splice(0, 0, data);
        state.totalHospitals++;
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
    getHospitals({dispatch, commit}, data) {
        commit("general/changeLoading", {type: true, label: "Obteniendo Hospitales"}, {root: true});
        hospitalService.getHospitals(data.n, data.i, data.search)
            .then(
                data => {

                    commit('getHospitalsOk', {hospitals: data.hospitals, totalHospitals: data.total});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    editHospital({dispatch, commit}, hospital) {
        commit("general/changeLoading", {type: true, label: "Modificando Hospital"}, {root: true});
        hospitalService.editHospital(hospital)
            .then(
                () => {
                    commit('editHospitalOk', hospital);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    addHospital({dispatch, commit}, hospital) {
        commit("general/changeLoading", {type: true, label: "Agregando Hospital"}, {root: true});
        hospitalService.addHospital(hospital)
            .then(
                (id) => {
                    hospital.idHospital = id;
                    commit('addHospitalOk', hospital);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    deleteHospital({dispatch, commit}, hospital) {
        commit("general/changeLoading", {type: true, label: "Eliminando Hospital"}, {root: true});
        hospitalService.deleteHospital(hospital)
            .then(
                () => {
                    commit('deleteHospitalOk', hospital);
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


export const viewHospitals = {
    namespaced: true,
    state,
    actions,
    mutations
};
