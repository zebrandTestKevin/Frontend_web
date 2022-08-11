import {apiUrl} from '../config/config';
import axios from 'axios';
// import Product from '../models/Product'

export const productService={
    addProduct,
    editProduct,
    getProduct,
    deleteProduct
};

async function getProduct(){
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

async function addProduct(product) {
    return axios({
        url: `${apiUrl}product/add`,
        method: "POST",
        data: product.toJson(),
        headers: {"Content-Type": 'application/json'},
    })
    .then((response) => {
        if(response.status == 200){
            return response.data;
        }else{
            return null;
        }
    }).catch(() => {
        return null
    });
}

//revisar endpoint
async function deleteProduct(product){
    return axios({
        url: `${apiUrl}product/delete/${product.id}`,
        method: "DELETE"
        , params: {
            userId: product.productId
        },
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