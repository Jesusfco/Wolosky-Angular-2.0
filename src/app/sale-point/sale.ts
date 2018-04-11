import { SaleDescription } from './sale-description';

export class Sale {
    public id: number;
    public total: number;
    public creator_id: number;
    public creator_name: string;
    public description: Array<any>= [];
    public clientMoney: number;
    public created_at: string;
    public type: number;

    constructor(){
        this.total = 0;
        this.type = 1;
    }

    storageLocalSale(){
        localStorage.setItem('saleDescription', JSON.stringify(this.description));
    }

    getLocalSale(){
        return JSON.parse(localStorage.getItem('saleDescription'));
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
                this.description[x].subtotal = this.description[x].quantity * this.description[x].price;
                return false;
                // break;
            }
        }
        return true;
    }

    setSubtotal(){
        for (let x = 0; x < Object.keys(this.description).length; x++){
            this.description[x].subtotal = this.description[x].price * this.description[x].quantity;
        }
    }
    getTotal(){
        
        this.total = 0;
        for(let x of this.description){
            this.total += x.subtotal;
        }
        this.storageLocalSale();
    }

    deleteProduct(id){
        console.log(id);
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
        let x = new Date();
        this.created_at = x.getFullYear() + "-";

        if(x.getMonth() < 9){
            this.created_at += "0" + (x.getMonth() + 1) + "-";
        } else {
            this.created_at += (x.getMonth() + 1) + "-";
        }

        if( x.getDate() < 9){
            this.created_at += "0" + (x.getDate() ) + " ";        
        }else {
            this.created_at += (x.getDate() ) + " ";
        }

        if(x.getHours() < 10){
            this.created_at += "0" + x.getHours() + ":";
        }
        else {
            this.created_at += x.getHours() + ":";
        }

        if( x.getMinutes() < 10) {
            this.created_at += "0" + x.getMinutes() + ":";
        } else {
            this.created_at += x.getMinutes() + ":";
        }

        if( x.getSeconds() < 10) {
            this.created_at += "0" + x.getSeconds();
        } else {
            this.created_at += x.getSeconds();
        }
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


