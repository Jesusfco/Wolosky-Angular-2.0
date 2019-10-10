import { ObjectJSONParser } from "../utils/classes/ObjectJSON";

export class Product {

    public id: number;
    public name: string = '';
    public code: string = '';
    public price_public: number;
    public price_intern: number;
    public cost_price: number;
    public reorder: number;
    public stock: number;
    public department: string = '';
    public created_at: string = '';
    public edit: boolean;
    public delete: boolean;
    public add: boolean;


    constructor(){
        this.edit = false;
        this.delete = false;
        this.add = false;
        this.reorder = 0;
        this.stock = 0;        
        this.price_intern = 0;
        this.price_public = 0;
        this.cost_price = 0;
    }

    setData(data) {
        this.id = 0
        ObjectJSONParser.set(data, this)
    }

    afterSale(sale){
        let inventory = JSON.parse(localStorage.getItem('inventory'));

        for(let x = 0; x < Object.keys(sale).length; x++){
            for(let y = 0; y < Object.keys(inventory).length; y++){
                if(sale[x].product_id == inventory[y].id){
                    inventory[y].stock -= sale[x].quantity;
                    
                    break;
                }
            }
        }

        localStorage.setItem('inventory', JSON.stringify(inventory));
        
    }

    deleteProductStorage(id){
        let inventory = JSON.parse(localStorage.getItem('inventory'));

        for(let x = 0; x < Object.keys(inventory).length; x++){
            if(inventory[x].id == id){
                inventory.splice(x, 1);
                break;
            }
        }

        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

    static storageInventory(data){
        if(data.length !== 0){

            if( typeof data[0].id == 'string'){
                for(let x = 0; x < data.length; x++){
                    data[x].price = parseFloat(data[x].price);
                    data[x].id = parseInt(data[x].id);
                    data[x].stock = parseInt(data[x].stock);
                    data[x].reorder = parseInt(data[x].reorder);
                }
            }

        }

        localStorage.setItem('inventory', JSON.stringify(data));
    }

    generateCodeBar() {
        var code = Math.random() * (9999999 - 1000000) + 1000000;
        code = Math.round(code)
        this.code = code.toString();
    }
}
