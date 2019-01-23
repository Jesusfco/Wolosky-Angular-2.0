import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Product } from '../../classes/product';
import { InventoryService } from '../inventory.service';
import { Storage } from '../../classes/storage';
import { Router } from '@angular/router';
import { cardPop, backgroundOpacity} from '../../animations';

// import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class NewProductComponent implements OnInit {

  products = [];

  state = {
    background: 'initial',
    card: 'initial',
  }

  request: boolean = false;

  public product = new Product();

  form = {
    validate: false,
    name: 0,
    code: 0,
    price: 0
  };

  storage: Storage = new Storage();

  constructor(private _http: InventoryService, private router: Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);

    this.products = this.storage.getInventory();

  }

  ngOnDestroy(){
    if(localStorage.getItem('inventoryCreateStatus') == '1')
      localStorage.setItem('inventoryCreateStatus', '0');
  }

  formSubmit(){
    this.request = true;
    this.form.validate = true;
    this.upperCaseName();
    if(this.validateName())
      this.validateUniqueName();
    if(this.product.code !== null || this.product.code !== '')
      this.validateUniqueCode();
    // this.validatePrice();

    if(this.form.validate !== true){
      this.request = false;
      return;
    } 

    this._http.create(this.product).then(
      data => {
        this.request = false;
        this.storage.pushProduct(data);
        localStorage.setItem('productCreated', JSON.stringify(data));
        localStorage.removeItem('inventoryCreateStatus');
        this.closePop();
      },

      error => {
        this.request = false;
      }
    );

  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/inventory']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  validateName(){

    if(this.product.name == null || this.product.name == ''){
      this.form.validate = false;
      this.form.name = 1;
      return false;
    } else {
      return true;
    }

  }//Fin de validateName public function()

  validateUniqueName(){    

    this.form.name = -1;

    this.product.name = this.product.name.replace(/\s+$/, '');
    
    for(let x of this.products){

      if(this.product.name == x.name){

        this.form.name = 2;
        this.form.validate = false;
        break;

      }

    }//Fin del FOR

  }

  validateUniqueCode(){
  
    for(let x of this.products){
      
      if(this.product.code == x.code){

        this.form.code = 2;
        this.form.validate = false;
        break;

      }

      this.form.code = -1;
    }

  }//Function that validate Product => Code unique but enable to works if is it null  

  restoreValidations(){
    this.form = {
      validate: false,
      name: 0,
      code: 0,
      price: 0
    };
  }
  
  upperCaseName(){
    if(this.product.name != undefined)
    this.product.name = this.product.name.toUpperCase();
  }

}
