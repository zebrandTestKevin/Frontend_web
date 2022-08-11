import {apiUrl} from '../config/config';
import axios from 'axios'
import News from '../models/News'

export const newsService = {
    getNews,
    editNews,
    addNews,
    deleteNews
};

async function getNews(n, i, search) {
    var complement = "";
    if (search == null || search == "" || search == undefined)
        complement = `n=${n}&i=${i}`
    else
        complement = `n=${n}&i=${i}&search=${search}`
    return axios({
        url: `${apiUrl}news?` + complement,
        method: "GET",
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                var newsList = [];
                for (var h of data.data.newsList) {
                    var news = new News().fromJson(h);
                    newsList.push(news);
                }

                return {newsList: newsList, total: data.data.total};
            } else {
                throw "error";
            }
        }).catch(() => {
            throw "error";
        });
}

async function deleteNews(news) {
    var complement = "";
    complement = `newsId=${news.idNews}`
    return axios({
        url: `${apiUrl}news?` + complement,
        method: "DELETE",
        data: news.toJson(),
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

async function editNews(news) {
    return axios({
        url: `${apiUrl}news`,
        method: "PUT",
        data: news.toJson(),
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

async function addNews(news) {
    return axios({
        url: `${apiUrl}news`,
        method: "POST",
        data: news.toJson(),
        headers: {"Content-Type": 'application/json'},

    })
        .then(data => {
            if (data.status == 200) {
                return data.data.idNews;
            } else {
                return null;
            }
        }).catch(() => {
            return null
        });
}
