import {apiUrl} from '../config/config';
import axios from 'axios'

//functions of the accountService
export const accountService = {
    addAccount,
    editAccount,
    deleteAccount,
    getAccounts
};

//endpoint to obtain the list of accounts that exist
async function getAccounts() {
    return axios({
        url: `${apiUrl}user`,
        method: "GET",
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                return data.data;
            } else {
                throw "error";
            }
        }).catch(() => {
            throw "error";
        });
}

//endpoint for the edition of an specific account
async function editAccount(account) {
    return axios({
        url: `${apiUrl}user/add`,
        method: "POST",
        data: account.toJson(),
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            console.log(data);
            if (data.status == 200) {
                return true;
            } else {
                throw "error";
            }
        }).catch((e) => {
            console.log(e);
            throw "error";
        });
}

//endpoint for the creation an account
async function addAccount(account) {
    return axios({
        url: `${apiUrl}user/add`,
        method: "POST",
        data: account.toJson(),
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                return data.data.userId;
            } else {
                return null;
            }
        }).catch(() => {
            return null
        });
}

//endpoint to delete an specific account
async function deleteAccount(account) {
    return axios({
        url: `${apiUrl}user/delete/${account.userId}`,
        method: "DELETE"
        , 
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