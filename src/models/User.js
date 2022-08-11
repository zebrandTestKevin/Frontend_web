export default class User {
    idUser;
    userName;
    lastName;
    email;

    constructor(idIUser, userName, lastName, email) {
        this.idUser = idIUser;
        this.userName = userName;
        this.lastName = lastName;
        this.email = email;
    }

    toJson() {
        return JSON.stringify(this);
    }

    fromJson(json) {
        this.idUser = json.idUser;
        this.userName = json.userName;
        this.lastName = json.lastName;
        this.email = json.email;
        return this;
    }


}

