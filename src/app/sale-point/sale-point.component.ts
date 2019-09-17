import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import { SaleService } from '../services/sale.service';
import { Product } from '../classes/product';
import { Storage } from '../classes/storage';
import { Sale } from '../classes/sale';
import { SaleDescription } from '../classes/sale-description';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.css']
})
export class SalePointComponent implements OnInit {

  public inventory: Array<Product> = [];
  public sale: Sale = Sale.getLastSale();  
  public search = {
    name: '',
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
  subscriptionService

  sugests: Array<Product> = [];

  constructor(private _http: SaleService,
              private inventoryService: InventoryService,
              private router: Router) {

                this.inventory = this.storage.getInventory();
                this.sendStoreSales();       
                
                this.subscriptionService = _http.getData().subscribe(x => {
      
                  if (x.action === 'finish') {       
                    this.sale = new Sale();
                    this.sale.saveOnLocalStorage()
                  }
            
                });

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

    if(this.search.name.trim() == '' || this.search.name == null) return;

    let term = this.search.name.trim().toLowerCase();

    this.restoreFormValue();

    this.sugests = [];

    for(let x of this.inventory){

      if(x.code == term || x.name.toLowerCase() == term){
        
        let desc = new SaleDescription();        
        desc.product = x
        desc.quantity = this.search.quantity
        desc.product_id = x.id

        if(this.sale.type == 1) {
          desc.price = x.price_public
        } else {
          desc.price = x.price_intern
        }
        
        this.sale.pushProduct(desc);
        this.sale.saveOnLocalStorage()

        this.restoreSearch();

        break;
      }

    }    

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
    
    this.sale.saveOnLocalStorage();

  }//   CHECK PRICES() FUNCTION

  restoreFormValue(){
    this.form = {
      validate: true,
      name: 0,
    };
  }

  restoreSearch(){
    this.search = {
      name: '',
      quantity: 1,
    };
  }

  restoreSale(){
    this.sale = new Sale();
    this.sale.saveOnLocalStorage()
  }

  storageSale(){
    localStorage.setItem('sale', JSON.stringify(this.sale));
  }

  getSale(){
    return JSON.parse(localStorage.getItem('sale'));
  }

  goSaleProcess(){
    this.sendStoreSales();        
    this.router.navigate(['/sale-point/sale-process']);
  }

  sendStoreSales(){

    if(localStorage.getItem('sales') != undefined){
        let x = JSON.parse(localStorage.getItem('sales'));
        this._http.outServiceSales({sales: x}).then(
                data => {
                  
                    localStorage.removeItem('sales');
                    clearInterval(this.observerFailSales);
                }, error => {
                    
                }
            );
    }

  }
  

  setObservableFailSales(){

    if(localStorage.getItem('sales') == undefined){ return;}
    if(this.observerFailSales != undefined){ return; }
    this.observerFailSales = setInterval(() => this.sendStoreSales(), 30000);
    
  }

  changingQuantity(product) {
    
    if(product.quantity <= 0 || product.quantity == null || product.quantity == undefined) {
      return;
    }

    this.sale.saveOnLocalStorage();

  }

  startModify(product){
    product.modify = true;

    setTimeout(() => {
    
      document.getElementById('focusModify').focus();

    }, 50);
  }

  finishModify(product){

    if(product.quantity <= 0 || product == null){
      product.quantity = 1;
    }
    
    this.sale.saveOnLocalStorage();

    product.modify = false;

  }

}
