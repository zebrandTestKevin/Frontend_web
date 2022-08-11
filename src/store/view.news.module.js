import News from '../models/News';
import {newsService} from '../services/'

const state = {
    dialogEditState: false,
    dialogDeleteState: false,
    news: new News(),
    title: "",
    totalNews: 0,
    status: {},
    newsList: []
};
const mutations = {
    dialogEditOpen(state, data) {
        state.dialogEditState = true;
        state.news = data.news;
        state.title = data.title;
    },
    dialogEditClose(state) {
        state.dialogEditState = false;
        state.news = new News();
        state.title = "";
    },
    dialogDeleteOpen(state, data) {
        state.dialogDeleteState = true;
        state.news = data;
    },
    dialogDeleteClose(state) {
        state.dialogDeleteState = false;
        state.news = new News();
    },
    getNewsOk(state, data) {
        state.status = {gotnewsList: true}
        state.newsList = data.newsList
        state.totalNews = data.totalNews
    },

    getFailed(state) {
        state.status = {}

    },
    editnewsOk(state, data) {
        state.news.idnews = data.idnews;
        state.news.title = data.title;
        state.news.content = data.content;
        state.news.dateNews = data.dateNews;
        state.news.newsImages = data.newsImages;
        state.news.newsUrl = data.newsUrl;

        state.newsList.splice(state, 0, data);
    },

    deletenewsOk(state, data) {
        state.newsList.splice(state.newsList.findIndex(v => v.idNews === data.idNews), 1);
        state.totalNews--;
    },


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
    getNews({dispatch, commit}, data) {
        commit("general/changeLoading", {type: true, label: "Obteniendo Noticias"}, {root: true});
        newsService.getNews(data.n, data.i, data.search)
            .then(
                data => {

                    commit('getNewsOk', {newsList: data.newsList, totalNews: data.total});
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    editNews({dispatch, commit}, news) {
        commit("general/changeLoading", {type: true, label: "Modificando Noticia"}, {root: true});
        newsService.editNews(news)
            .then(
                () => {
                    commit('editNewsOk', news);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    addNews({dispatch, commit}, news) {
        commit("general/changeLoading", {type: true, label: "Agregando Noticia"}, {root: true});
        newsService.addNews(news)
            .then(
                (id) => {
                    news.idnews = id;
                    commit('addNewsOk', news);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },

    deleteNews({dispatch, commit}, news) {
        commit("general/changeLoading", {type: true, label: "Eliminando news"}, {root: true});
        newsService.deleteNews(news)
            .then(
                () => {
                    commit('deleteNewsOk', news);
                    commit("general/changeLoading", {type: false, label: ""}, {root: true});
                },
                error => {
                    commit('getFailed');
                    dispatch('alert/error', error, {root: true});
                }
            );
    },


};


export const viewNewsList = {
    namespaced: true,
    state,
    actions,
    mutations
};
