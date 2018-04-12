import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory/inventory.service';
import { SaleService } from './sale.service';
import { Product } from '../product';
import { Storage } from '../storage';
import { Sale } from './sale';
import { SaleDescription } from './sale-description';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.css']
})
export class SalePointComponent implements OnInit {

  public inventory = [];
  public sale: Sale = new Sale();
  public descripton: SaleDescription = new SaleDescription();
  public search = {
    name: undefined,
    quantity: 1,
  };

  public form = {
    validate: true,
    name: 0,
  };

  public sales = [];
  public storage: Storage = new Storage();

  public observerSale: any;
  public observerFailSales: any;

  public interval: any = 0;

  sugests: Array<any> = [];

  constructor(private _http: SaleService,
              private inventoryService: InventoryService,
              private router: Router) {

                this.inventory = this.storage.getInventory();
                this.sendStoreSales();

                if(this.sale.getLocalSale() != undefined){
                  this.sale.description = this.sale.getLocalSale();
                  this.sale.type = this.sale.getSaleTypeStorage();
                  this.sale.getTotal();
                }

  }

  getSugest(event){
    
    if(event == 38 || event == 40 || event == 13) return;
    if(this.search.name == null || this.search.name == '') {
      this.sugests = [];
      return;
    } else {
      let search = this.search.name;

      this.sugests = this.inventory.filter(function(product){

        return (product.name.includes(search.toUpperCase()));
      }) 
    }
    


  }

  ngOnInit(){}

  identifyProduct(){
    this.restoreFormValue();
    this.sugests = [];
    for(let x of this.inventory){

      if(x.code == this.search.name || x.name == this.search.name.toUpperCase()){
        if(this.sale.type == 1)
        this.sale.pushProduct({
            product_id: x.id,
            name: x.name,
            price: x.price_public,            
            quantity: this.search.quantity,
          });

        if(this.sale.type > 1)
        this.sale.pushProduct({
            product_id: x.id,
            name: x.name,            
            price: x.price_intern,
            quantity: this.search.quantity,
          });

        this.restoreSearch();

        break;
      }
    }
    // this.sale.storageLocalSale();

  }

  checkPrices(){

    for(let pro of this.inventory){

      for (let x = 0; x < Object.keys(this.sale.description).length; x++){

        if(this.sale.description[x].product_id == pro.id){          
          if(this.sale.type == 1)
            this.sale.description[x].price = pro.price_public;
          if(this.sale.type > 1)
            this.sale.description[x].price = pro.price_intern;

            break;

        }

      }

    }

    this.sale.setSubtotal();
    this.sale.getTotal();

  }//   CHECK PRICES() FUNCTION

  restoreFormValue(){
    this.form = {
      validate: true,
      name: 0,
    };
  }

  restoreSearch(){
    this.search = {
      name: undefined,
      quantity: 1,
    };
  }

  restoreSale(){
    this.sale = new Sale();
  }

  storageSale(){
    localStorage.setItem('sale', JSON.stringify(this.sale));
  }

  getSale(){
    return JSON.parse(localStorage.getItem('sale'));
  }

  goSaleProcess(){
    this.sendStoreSales();
    localStorage.setItem('saleStatus', '1');
    this.interval = setInterval(() => this.intervalSaleLogic(), 1000);
    this.router.navigate(['/sale-point/sale-process']);
  }

  sendStoreSales(){

    if(localStorage.getItem('sales') != undefined){
        let x = JSON.parse(localStorage.getItem('sales'));
        this._http.outServiceSales({sales: x}).then(
                data => {
                  console.log('intervalos de ventas error terminado');
                    localStorage.removeItem('sales');
                    clearInterval(this.observerFailSales);
                }, error => {
                    console.log(error);
                    console.log('intervalos de ventas error');
                }
            );
    }

  }

  intervalSaleLogic(){

    if(localStorage.getItem('saleStatus') == undefined){
      this.sale = new Sale();
      this.exitInterval();
      this.setObservableFailSales();

    } else if(localStorage.getItem('saleStatus') == '0'){
      this.exitInterval();
    }
  }

  exitInterval(){
    clearInterval(this.interval);
  }

  setObservableFailSales(){

    if(localStorage.getItem('sales') == undefined){ return;}
    if(this.observerFailSales != undefined){ return; }
    this.observerFailSales = setInterval(() => this.sendStoreSales(), 30000);
    
  }

}
