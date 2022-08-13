import {apiUrl} from '../config/config';
import axios from 'axios';

//functions of the productService
export const productService={
    addProduct,
    editProduct,
    getProducts,
    deleteProduct,
    addView
};

//endpoint to get the list of all the products
async function getProducts(){
    return axios({
        url: `${apiUrl}product`,
        method: 'GET',
        headers: {"Content-Type": 'application/json'},
    })
    .then(response => {
        if(response.status==200){
            console.log(response);
            return response.data;
            // return {products: response.data}
        }
        else {
            throw "Error";
        }
    }).catch(() => {
        throw "error";
    });
}

//endpoint to edit an specific product
async function editProduct(product){
    return axios({
        url: `${apiUrl}product/add`,
        method: "POST",
        data: product.toJson(),
        headers: {"Content-Type": 'application/json'},
    })
    .then(response => {
        console.log(response);
        if(response.status == 200){
            return true;
        }else{
            throw "Error";
        }
    }).catch((e) => {
        console.log(e);
        throw "error";
    });
}

//endpoint to add a new product
async function addProduct(product) {
    return axios({
        url: `${apiUrl}product/add`,
        method: "POST",
        data: product.toJson(),
        headers: {"Content-Type": 'application/json'},
    })
    .then((response) => {
        if(response.status == 200){
            return response.data.productId;
        }else{
            return null;
        }
    }).catch(() => {
        return null
    });
}

//endpoint to notify the backend about a petition of a specific product
async function addView(product) {
    console.log("add view endpoint");
    return axios({
        url: `${apiUrl}product/view`,
        method: "POST",
        data: product.toJson(),
        headers: {"Content-Type": 'application/json'},
    })
    .then((response) => {
        if(response.status == 200){
            return true;
        }else{
            return null;
        }
    }).catch((e) => {
        console.log(e);
        return null
    });
}

//endpoint to delete an specific product
async function deleteProduct(product){
    return axios({
        url: `${apiUrl}product/delete/${product.productId}`,
        method: "DELETE"
        , 
        headers: {"Content-Type": 'application/json'},
    })
    .then(response => {
        if (response.status == 200){
            return true;
        }else{
            return null;
        }
    }).catch(() => {
        return null
    });
}