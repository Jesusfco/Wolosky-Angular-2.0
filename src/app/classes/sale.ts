import { SaleDebt } from './sale-debt';
import { SaleDescription } from './sale-description';
import { User } from './user';
import { Receipt } from './receipt';
import { MyCarbon } from '../utils/classes/my-carbon';
import { ObjectJSONParser } from '../utils/classes/ObjectJSON';

export class Sale {
    public id: number;    
    public creator_id: number;
    public creator: User;
    public description: Array<SaleDescription>= [];
    public receipts: Array<Receipt> = []
    public created_at: string;
    public saleDebt: SaleDebt
    public type: number;

    constructor(){        
        this.type = 1;
    }

    setData(data) {
        ObjectJSONParser.set(data, this)
        if(data.description){
            this.description = []
            for(let desc of data.description){
                let d = new SaleDescription();
                d.setData(desc);
                this.description.push(d)
            }
        }

    }

    get total(){
        let n = 0
        for(let desc of this.description) {
            n+= desc.subtotal
        }
        return n
    }

    saveOnLocalStorage() {
        localStorage.setItem('last_sale', JSON.stringify(this));
    }

    static getLastSale() {
        let sale = JSON.parse(localStorage.getItem('last_sale'))
        let object = new Sale();
        if(sale != undefined)
            object.setData(sale)

        return object
    }

    static removeLastSaleStorage() {
        localStorage.removeItem('last_sale')
    }    

    getLocalSale(){
        return JSON.parse(localStorage.getItem('saleDescription'));
    }

    getSaleTypeStorage(){
        return JSON.parse(localStorage.getItem('saleType'));
    }

    pushProduct(description: SaleDescription){
        console.log(description)
        if(this.checkUniqueDescription(description))
            this.description.push(description);
                
    }

    checkUniqueDescription(description: SaleDescription){
        for (let desc of this.description){
            if(desc.product_id ==  description.product_id){
                console.log(desc)
                desc.quantity += description.quantity;                
                return false;                
            }
        }

        return true;
    }        

    deleteProduct(id){
        
        for(let x = 0; x < Object.keys(this.description).length; x++){
            if(id == this.description[x].product_id){
                this.description.splice(x, 1);
            }
        }
        
    }

    storeSaleErrorConnection(sale){
        let sales = this.getSalesErrorConnection();
        sales.unshift(sale);
        localStorage.setItem('sales', JSON.stringify(sales));
    }

    getSalesErrorConnection(){
        if(JSON.parse(localStorage.getItem('sales')) != undefined){
            return JSON.parse(localStorage.getItem('sales'));
        }
        return [];
    }

    setCreatedAt(){
        
        this.created_at = MyCarbon.nowTimeStamp()
        
    }


    getGrossProfit(sales){
        let neto = 0;
        let countUndefined = {
            count: 0,
            products: []
        };
        let total = 0;
        let products = JSON.parse(localStorage.getItem('inventory'));
        
        if(sales == undefined){
            return {
                neto: neto,
                total: total,
                undefined: countUndefined
            };
        }


        //Por cada venta
        for(let sale of sales){

            total += parseInt(sale.total);

            if(sale.description != undefined){
                
                //por cada descripcion de la venta
                for(let desc of sale.description){
                    
                    if(desc.product_id != undefined){
                        //Si tiene id busca la equivalencia en el inventario
                        for( let product of products){
                            if( parseInt(desc.product_id) == product.id){

                                if(product.cost_price <= 0 || product.cost_price == undefined){
                                    
                                } else {
                                    neto += (desc.price - product.cost_price) * parseInt(desc.quantity);
                                }
                                
                                break;
                            }
                        }
                    }
                }
            }
        }

        //Conteo de productos sin costo de compra
        for( let x of products){
            if(x.cost_price == undefined){
                countUndefined.count++;
                countUndefined.products.push({id: x.id, name: x.name});
                console.log(x);
            }
            
        }

        
        return {
                neto: neto,
                total: total,
                undefined: countUndefined
            };

    }
}


