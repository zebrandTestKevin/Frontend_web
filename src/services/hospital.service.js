import {apiUrl} from '../config/config';
import axios from 'axios'
import Hospital from '../models/Hospital'

export const hospitalService = {
    getHospitals,
    editHospital,
    addHospital,
    deleteHospital
};

async function getHospitals(n, i, search) {
    var complement = "";
    if (search == null || search == "" || search == undefined)
        complement = `n=${n}&i=${i}`
    else
        complement = `n=${n}&i=${i}&search=${search}`
    return axios({
        url: `${apiUrl}hospital/allInfo?` + complement,
        method: "GET",
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                var hospitals = [];
                for (var h of data.data.hospitals) {
                    var hospital = new Hospital().fromJson(h);
                    hospitals.push(hospital);
                }

                return {hospitals: hospitals, total: data.data.total};
            } else {
                throw "error";
            }
        }).catch(() => {
            throw "error";
        });
}

async function editHospital(hospital) {
    return axios({
        url: `${apiUrl}hospital`,
        method: "PUT",
        data: hospital.toJson(),
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

async function addHospital(hospital) {
    return axios({
        url: `${apiUrl}hospital`,
        method: "POST",
        data: hospital.toJson(),
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                return data.data.idHospital;
            } else {
                return null;
            }
        }).catch(() => {
            return null
        });
}

async function deleteHospital(hospital) {
    return axios({
        url: `${apiUrl}hospital`,
        method: "DELETE"
        , params: {
            hospitalId: hospital.idHospital
        },
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