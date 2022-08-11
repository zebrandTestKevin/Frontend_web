export default class Drugstore {
    idDrugstore;
    idCity;
    nameCity;
    name;
    lon;
    lat;

    constructor(idDrugstore, idCity, name, lon, lat, nameCity) {
        this.idDrugstore = idDrugstore;
        this.idCity = idCity;
        this.name = name;
        this.lon = lon;
        this.lat = lat;
        this.nameCity = nameCity;
    }

    toJson() {
        return JSON.stringify(this);
    }

    fromJson(json) {
        this.idDrugstore = json.idDrugstore;
        this.idCity = json.idCity;
        this.name = json.name;
        this.lon = json.lon;
        this.lat = json.lat;
        return this;
    }
}