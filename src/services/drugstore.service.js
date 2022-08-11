import {apiUrl} from '../config/config';
import axios from 'axios'
import Drugstore from '../models/Drugstore'

export const drugstoreService = {
    getDrugstores,
    editDrugstore,
    addDrugstore,
    deleteDrugstore
};

async function getDrugstores(n, i, search) {
    var complement = "";
    if (search == null || search == "" || search == undefined)
        complement = `n=${n}&i=${i}`
    else
        complement = `n=${n}&i=${i}&search=${search}`
    return axios({
        url: `${apiUrl}drugstore?` + complement,
        method: "GET",
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                var drugstores = [];
                for (var d of data.data.drugstores) {
                    var drugstore = new Drugstore().fromJson(d);
                    drugstores.push(drugstore);
                }

                return {drugstores: drugstores, total: data.data.total};
            } else {
                throw "error";
            }
        }).catch(() => {
            throw "error";
        });
}

async function editDrugstore(drugstore) {
    return axios({
        url: `${apiUrl}drugstore`,
        method: "PUT",
        data: drugstore.toJson(),
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

async function addDrugstore(drugstore) {
    return axios({
        url: `${apiUrl}drugstore`,
        method: "POST",
        data: drugstore.toJson(),
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                return data.data.idDrugstore;
            } else {
                return null;
            }
        }).catch(() => {
            return null
        });
}

async function deleteDrugstore(drugstore) {
    var complement = "";
    complement = `drugstoreId=${drugstore.idDrugstore}`
    return axios({
        url: `${apiUrl}drugstore?` + complement,
        method: "DELETE",
        data: drugstore.toJson(),
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