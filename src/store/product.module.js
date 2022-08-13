// import router from '../router';
import Product from '../models/Product';
import {productService} from '../services'

//module for the petitions of the products and the dialogs for the edition and the delete of products
const state ={
    status: {},
    products: [],
    dialogEditState: false,
    dialogDeleteState: false,
    title: "",
    totalProducts: 0,
    product: new Product(),
};
const mutations={
    getProductsOk(state, products){
        state.status=true;
        state.products=products.products;
    },
    getFailed(state) {
        state.status = {}
    },
    dialogProductOpen(state, data) {
        state.dialogEditState = true;
        state.product = data.product;
        state.title = data.title;
    },
    dialogProductClose(state) {
        state.dialogEditState = false;
        state.product = new Product();
        state.title = "";
    },
    dialogEditOpen(state, data) {
        state.dialogEditState = true;
        state.product = data.product;
        state.title = data.title;
    },
    dialogEditClose(state) {
        state.dialogEditState = false;
        state.product = new Product();
        state.title = "";
    },
    dialogDeleteOpen(state, data) {
        state.dialogDeleteState = true;
        state.product = data;
    },
    dialogDeleteClose(state) {
        state.dialogDeleteState = false;
        state.product = new Product();
    },
    editProductOk(state, data) {
        state.product.productId = data.productId;
        state.product.name = data.name;
        state.product.price = data.price;
        state.product.amount = data.amount;
        state.product.request = data.request;
        state.product.brand = data.brand;
        state.product.imageUrl = data.imageUrl;
        var index = state.products.findIndex(v => v.productId === data.productId);
        state.products.splice(index, 1);
        state.products.splice(index, 0, data);
    },

    deleteProductOk(state, data) {
        state.products.splice(state.products.findIndex(v => v.productId === data.productId), 1);
        state.totalProducts--;
    },
    addProductOk(state, data) {
        state.products.splice(state.products.length, 0, data);
        state.totalProducts++;
    }
};
const actions ={
    dialogProductOpen({commit}, data) {
        // console.log("deberia abrir");
        productService.addView(data.product).then(
            () =>{
                commit('dialogProductOpen', data);
            },
            error =>{
                console.log(error);
                commit("general/changeLoading", {type: false, label:""},{root: true});
            }
        )
    },
    dialogProductClose({commit}) {
        commit('dialogEditClose')
    },
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
    getProducts({dispatch, commit}){
        commit("general/changeLoading", {type: true, label:"Obtaining Products"},{root: true});
        productService.getProducts().then(
            products =>{
                commit('getProductsOk',{products:products});
                commit("general/changeLoading", {type: false,   label:""}, {root: true});
            },
            error =>{
                dispatch('alert/error',error, {root: true});
                commit("general/changeLoading", {type: false, label:""},{root: true});
            }
        )

    },
    editProduct({dispatch, commit}, product) {
        commit("general/changeLoading", {type: true, label: "Modificando Producto"}, {root: true});
        productService.editProduct(product)
            .then(
                () => {
                    commit('editProductOk', product);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                }
            );
    },
    addProduct({dispatch, commit}, product) {
        commit("general/changeLoading", {type: true, label: "Agregando Cuenta"}, {root: true});
        productService.addProduct(product)
            .then(
                (id) => {
                    product.productId = id;
                    commit('addProductOk', product);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                }
            );
    },
    deleteProduct({dispatch, commit}, product) {
        commit("general/changeLoading", {type: true, label: "Eliminando Cuenta"}, {root: true});
        productService.deleteProduct(product)
            .then(
                () => {
                    commit('deleteProductOk', product);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                }
            );
    },
};

export const product = {
    namespaced: true,
    state,
    actions,
    mutations
};