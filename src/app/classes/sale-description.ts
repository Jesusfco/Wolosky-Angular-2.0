import { Product } from "./product";
import { ObjectJSONParser } from "../utils/classes/ObjectJSON";

export class SaleDescription {    
    public sale_id: number;
    public product_id: number;    
    public price: number;
    public quantity: number;
    public product: Product    
    modify: boolean = false
    constructor(){

    }

    setData(data) {
        this.sale_id = 0
        this.product_id = 0
        this.price = 0
        this.quantity = 0
        ObjectJSONParser.set(data, this)
        if(data.product){
            this.product = new Product()
            this.product.setData(data.product)
        }
    }

    get subtotal() {
        return Math.round((this.quantity * this.price)*100)/100
    }
}
