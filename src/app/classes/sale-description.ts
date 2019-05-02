import { Product } from "./product";

export class SaleDescription {    
    public sale_id: number;
    public product_id: number;
    public name: string;
    public price: number;
    public quantity: number;
    public product: Product    
    constructor(){

    }

    get subtotal() {
        return Math.round((this.quantity * this.price)*100)/100
    }
}
