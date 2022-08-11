export default class Hospital {
    idHospital;
    idCity;
    nameCity;
    name;
    lon;
    lat;

    constructor(idHospital, idCity, name, lon, lat, nameCity) {
        this.idHospital = idHospital;
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
        this.idHospital = json.idHospital;
        this.idCity = json.idCity;
        this.name = json.name;
        this.lon = json.lon;
        this.lat = json.lat;
        return this;
    }


}
