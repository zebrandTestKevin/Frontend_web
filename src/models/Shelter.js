export default class Shelter {
    idShelter;
    idCity;
    nameCity;
    name;
    amount;
    lon;
    lat;

    constructor(idShelter, amount, idCity, name, lon, lat, nameCity) {
        this.idShelter = idShelter;
        this.idCity = idCity;
        this.name = name;
        this.amount = amount;
        this.lon = lon;
        this.lat = lat;
        this.nameCity = nameCity;
    }

    toJson() {
        return JSON.stringify(this);
    }

    fromJson(json) {
        this.idShelter = json.idShelter;
        this.idCity = json.idCity;
        this.nameCity = json.nameCity;
        this.name = json.name;
        this.amount = json.amount;
        this.lon = json.lon;
        this.lat = json.lat;
        return this;
    }

}
