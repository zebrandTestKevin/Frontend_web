import {apiUrl} from '../config/config';
import axios from 'axios';

export const dataService = {
    uploadData
};

async function uploadData(data) {
    var route = ""
    switch (data.type) {
        case "1":
            route = "country/csv"
            break;
        case "2":
            route = "city/csv"
            break;
        case "3":
            route = "municipality/csv"
            break;
    }
    return axios({
        url: `${apiUrl + route}`,
        method: "POST",
        data: data.toJson(),
        headers: {"Content-Type": "multipart/form-data"},

    })
        .then(data => {
            if (data.status == 200) {

                return true;
            } else {
                throw "error";
            }
        }).catch(() => {
            throw "error";
        });
}