import { SaleDescription } from './sale-description';
import { User } from './user';
import { Receipt } from './receipt';
import { MyCarbon } from '../utils/classes/my-carbon';

export class Sale {
    public id: number;    
    public creator_id: number;
    public creator: User;
    public description: Array<SaleDescription>= [];
    public receipts: Array<Receipt> = []
    public created_at: string;
    public type: number;

    constructor(){        
        this.type = 1;
    }

    get total(){
        let n = 0
        for(let desc of this.description) {
            n+= desc.subtotal
        }
        return n
    }

    storageLocalSale(){
        localStorage.setItem('saleDescription', JSON.stringify(this.description));
        localStorage.setItem('saleType', JSON.stringify(this.type));
    }

    getLocalSale(){
        return JSON.parse(localStorage.getItem('saleDescription'));
    }

    getSaleTypeStorage(){
        return JSON.parse(localStorage.getItem('saleType'));
    }

    pushProduct(product){
        product.subtotal = product.price * product.quantity;
        if(this.checkUniqueDescription(product))
            this.description.push(product);
        
        this.getTotal();
    }

    checkUniqueDescription(product){
        for (let x = 0; x < Object.keys(this.description).length; x++){
            if(product.product_id ==  this.description[x].product_id){
                this.description[x].quantity += product.quantity;                
                return false;
                // break;
            }
        }
        return true;
    }

    
    getTotal(){               
        this.storageLocalSale();
    }

    deleteProduct(id){
        
        for(let x = 0; x < Object.keys(this.description).length; x++){
            if(id == this.description[x].product_id){
                this.description.splice(x, 1);
            }
        }
        this.getTotal();
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


