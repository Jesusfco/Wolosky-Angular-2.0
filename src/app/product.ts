export class Product {

    public id: number;
    public name: string;
    public code: string;
    public price: number;
    public cost_price: number;
    public reorder: number;
    public stock: number;
    public department: string;
    public created_at: string;
    public edit:boolean;
    public delete:boolean;
    public add:boolean;


    constructor(){
        this.edit = false;
        this.delete = false;
        this.add = false;
        this.reorder = 0;
        this.stock = 0;
        this.name = '';
        this.code = '';
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
}
