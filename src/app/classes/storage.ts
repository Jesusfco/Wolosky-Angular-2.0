import { Url } from './url';
import { Product } from './product';
export class Storage {
    public token:string;
    public tokenRequest:string;
    public userName: string;
    public userEmail: string;
    public userId: number;
    public userType: number;
    public url: Url = new Url();

    constructor(){
        if(localStorage.getItem('token') !== null){
            
            this.tokenRequest = "?token=" + this.token;

            this.userId = parseInt(localStorage.getItem('userId'));
            this.userType = parseInt(localStorage.getItem('userType'))
        }
    }

    static getTokenUrl () {        
        return '?token=' + localStorage.getItem('token');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    getTokenUrl() {
        return '?token=' + this.getToken();
    }
    getUrl() {
        return this.url.url;
    }
    getUserName(){
        return localStorage.getItem('userName');
    }

    getUserImg() {
        return localStorage.getItem('userImg');
    }

    getUserEmail(){
        return localStorage.getItem('userEmail');
    }

    getUserId(){
        return parseInt(localStorage.getItem('userId'));
    }

    getUserType(){
        return parseInt(localStorage.getItem('userType'));
    }    
    
    storageToken(data){
        localStorage.setItem('token', data.token);
    }

    static storageCash(data){        
        localStorage.setItem('cashbox', data.toString());
    }    

    getInventory(){
        let array = JSON.parse(localStorage.getItem('inventory'));
        let array2: Array<Product> = []

        for(let pro of array) {
            let product = new Product();
            product.setData(pro);
            array2.push(product)
        }

        return array2;
    }

    getCash(){
        return localStorage.getItem('cashbox');
    }

    pushProduct(data){
        let products = this.getInventory();
        products.push(data);
        Product.storageInventory(products);
    }

    updateProduct(product){
        let products = this.getInventory();
        for (let x = 0; x < Object.keys(products).length; x++){

            if (product.id == products[x].id) { 
                products[x] = product;
                console.log(products);
                Product.storageInventory(products);
                break;
            }
        }
    }

    showProductById(id){
        let products = this.getInventory();
        for (let x of products){
            if (id == x.id) { return x; }
        }
    }

    setNamesById(data){

        let products = this.getInventory();

        for(let x = 0; x < Object.keys(data.description).length; x++){
            if(data.description[x].product_name == undefined){
                for (let y of products){
                    if(y.id == data.description[x].product_id){
                        data.description[x].product_name =  y.name;
                        break;
                    }
                }
            }
        }

        return data;
    }

    getSalesErrorConnection(){
        if(localStorage.getItem('sales') == undefined) return "";
        return Object.keys(JSON.parse(localStorage.getItem('sales') ) ).length;
    }

    storeCash(data){
        localStorage.setItem('cashbox', data.cash);
    }

    updateCash(cash){
        let x = parseFloat(localStorage.getItem('cashbox'));
        x += cash;
        localStorage.setItem('cashbox', x.toString());
    }
    
    setCash(cash){
        localStorage.setItem('cashbox', cash.toString());
    }

    storeServiceData(service){
        localStorage.setItem('products_limit', service.products_limit);
        localStorage.setItem('users_limit', service.users_limit);
    }
}
