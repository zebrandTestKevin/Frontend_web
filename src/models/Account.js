export default class Account {
    userId;
    mail;
    password;
    name;
    status;

    constructor(userId, mail, password, name, status) {
        this.userId = userId;
        this.mail = mail;
        this.password = password;
        this.name = name;
        this.status = status;
    }

    toJson() {
        return JSON.stringify(this);
    }

    fromJson(json) {
        this.userId = json.userId;
        this.mail = json.mail;
        this.password = json.password;
        this.name= json.name;
        this.status= json.status;
        return this;
    }


}
