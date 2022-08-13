export default class Product{
    productId;
    name;
    price;
    amount;
    request;
    brand;
    imageUrl;

    constructor(productId, name, price, amount,request, brand, imageUrl){
        this.productId=productId;
        this.name=name;
        this.price=price;
        this.amount=amount;
        this.request=request;
        this.brand=brand;
        this.imageUrl=imageUrl;
    }


    toJson(){
        return JSON.stringify(this);
    }
    

    fromJson(json){
        this.productId=json.productId;
        this.name=json.name;
        this.price=json.price;
        this.amount=json.amount;
        this.request= json.request;
        this.brand= json.brand;
        this.imageUrl=json.imageUrl;
        return this;
    }
}