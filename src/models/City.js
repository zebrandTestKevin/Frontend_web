export default class City {
    idCity;
    city;

    constructor(idCity, city) {
        this.idCity = idCity;
        this.city = city;
    }

    toJson() {
        return JSON.stringify(this);
    }

    fromJson(json) {
        this.idCity = json.idCity;
        this.city = json.city;
        return this;
    }


}
