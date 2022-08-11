export default class LoginRequest {
    email;
    password;
    token;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    toJson() {
        const params = new URLSearchParams()
        params.append('password', this.password)
        params.append('username', this.email)
        params.append('grant_type', 'password')
        return params;
    }

    fromJson(json) {
        this.email = json.email;
        this.password = json.password;
        this.token = json.token;
    }


}

