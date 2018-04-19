import { Url } from './url';
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

    getToken(){
        return localStorage.getItem('token');
    }

    getTokenUrl(){
        return '?token=' + this.getToken();
    }
    getUrl() {
        return this.url.url;
    }
    getUserName(){
        return localStorage.getItem('userName');
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

    storageUserData(data){
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userType', data.user_type_id);
    }
    
    storageToken(data){
        localStorage.setItem('token', data.token);
    }

    storageCash(data){
        localStorage.setItem('userCash', data);
    }
    // SOBRE EL PUNTO DE VENTA
    storageInventory(data){
        if(data.length !== 0){

            if( typeof data[0].id == 'string'){
                for(let x = 0; x < data.length; x++){
                    data[x].price = parseInt(data[x].price);
                    data[x].id = parseInt(data[x].id);
                    data[x].stock = parseInt(data[x].stock);
                    data[x].reorder = parseInt(data[x].reorder);
                }
            }

        }

        localStorage.setItem('inventory', JSON.stringify(data));
    }

    getInventory(){
        return JSON.parse(localStorage.getItem('inventory'));
    }

    getCash(){
        return localStorage.getItem('userCash');
    }

    pushProduct(data){
        let products = this.getInventory();
        products.push(data);
        this.storageInventory(products);
    }

    updateProduct(product){
        let products = this.getInventory();
        for (let x = 0; x < Object.keys(products).length; x++){

            if (product.id == products[x].id) { 
                products[x] = product;
                console.log(products);
                this.storageInventory(products);
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
        localStorage.setItem('userCash', data.cash);
    }

    updateCash(cash){
        let x = parseInt(localStorage.getItem('userCash'));
        x += cash;
        localStorage.setItem('userCash', x.toString());
    }
    setCash(cash){
        localStorage.setItem('userCash', cash.toString());
    }

    storeServiceData(service){
        localStorage.setItem('products_limit', service.products_limit);
        localStorage.setItem('users_limit', service.users_limit);
    }
}
