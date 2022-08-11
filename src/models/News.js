export default class News {
    idNews;
    title;
    content;
    dateNews;
    newsImages;
    newsUrl;
    dateNewsView;

    constructor(idNews, title, content, dateNews, newsImages, newsUrl, dateNewsView) {
        this.idNews = idNews;
        this.title = title;
        this.content = content;
        this.dateNews = dateNews;
        this.newsImages = newsImages;
        this.newsUrl = newsUrl;
        this.dateNewsView = dateNewsView;
    }

    toJson() {
        return JSON.stringify(this);
    }

    fromJson(json) {
        this.idNews = json.idNews;
        this.title = json.title;
        this.content = json.content;
        this.dateNews = json.dateNews;
        this.newsImages = json.newsImages;
        this.newsUrl = json.newsUrl;
        return this;
    }


}
