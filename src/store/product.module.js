// import router from '../router';
import {productService} from '../services'

const state ={
    status: {},
    products: [],
};
const mutations={
    getProductsOk(state, products){
        // state.status={gotProducts: true}
        state.status=true;
        state.products=products;
    },
    getFailed(state) {
        state.status = {}

    },
};
const actions ={
    getAccounts({dispatch, commit}){
        commit("general/changeLoading", {type: true, label:"Obtaining Products"},{root: true});
        productService.getProducts().then(
            products =>{
                commit('getProductsOk',{products:products.data});
                commit("general/changeLoading", {type: false,   label:""}, {root: true});
            },
            error =>{
                dispatch('alert/error',error, {root: true});
                commit("general/changeLoading", {type: false, label:""},{root: true});
            }
        )

    }
};

export const products = {
    namespaced: true,
    state,
    actions,
    mutations
};