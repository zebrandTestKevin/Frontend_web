export default class Account {
    idUser;
    userName;
    lastName;
    email;
    password;

    constructor(idUser, userName, lastname, email, password) {
        this.idUser = idUser;
        this.userName = userName;
        this.lastName = lastname;
        this.email = email;
        this.password = password;
    }

    toJson() {
        return JSON.stringify(this);
    }

    fromJson(json) {
        this.idUser = json.idUser;
        this.userName = json.userName;
        this.lastName = json.lastName;
        this.email = json.email;
        this.password = json.password;
        return this;
    }


}
