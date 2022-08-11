export default class Data {
    type;
    replace;
    file;

    constructor(type, replace, file) {
        this.type = type;
        this.replace = replace;
        this.file = file;
    }

    toJson() {
        var bodyFormData = new FormData();
        bodyFormData.append("replace", this.replace);
        bodyFormData.append("file", this.file);
        return bodyFormData;
    }

}
