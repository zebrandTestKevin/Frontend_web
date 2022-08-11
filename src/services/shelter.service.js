import {apiUrl} from '../config/config';
import axios from 'axios'
import Shelter from '../models/Shelter'

export const shelterService = {
    getShelters,
    editShelter,
    addShelter,
    deleteShelter
};

async function getShelters(n, i, search) {

    var complement = "";
    if (search == null || search == "" || search == undefined)
        complement = `n=${n}&i=${i}`
    else
        complement = `n=${n}&i=${i}&search=${search}`
    return axios({
        url: `${apiUrl}shelter/allInfo?` + complement,
        method: "GET",
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            console.log(data);
            if (data.status == 200) {
                var shelters = [];
                for (var s of data.data.shelters) {
                    var shelter = new Shelter().fromJson(s);
                    shelters.push(shelter);
                }

                return {shelters: shelters, total: data.data.total};
            } else {
                return null;
            }
        }).catch(() => {
            return null
        });
}

async function editShelter(shelter) {
    return axios({
        url: `${apiUrl}shelter/updateShelter`,
        method: "PUT",
        data: shelter.toJson(),
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                return true;
            } else {
                return null;
            }
        }).catch(() => {
            return null
        });
}

async function addShelter(shelter) {
    return axios({
        url: `${apiUrl}shelter/addShelter`,
        method: "POST",
        data: shelter.toJson(),
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                return data.data.idShelter;
            } else {
                return null;
            }
        }).catch(() => {
            return null
        });
}

async function deleteShelter(shelter) {
    return axios({
        url: `${apiUrl}shelter/deleteShelter`,
        method: "PUT",
        data: shelter.toJson(),
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                return true;
            } else {
                return null;
            }
        }).catch(() => {
            return null
        });
}