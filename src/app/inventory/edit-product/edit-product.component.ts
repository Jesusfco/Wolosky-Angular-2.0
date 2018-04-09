import { Component, OnInit, OnDestroy } from '@angular/core';
import { cardPop, backgroundOpacity } from '../../animations';
import { Product } from '../../product';
import { InventoryService } from '../inventory.service';
import { Storage } from '../../storage';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  animations: [cardPop, backgroundOpacity]
})
export class EditProductComponent implements OnInit {
  
  product: Product = new Product();
  prod: Product = new Product();
  products = [];
  productEditable: Product = new Product();

  observerRef: any;

  store: Storage = new Storage();

  state = {
    background: 'initial',
    card: 'initial',
  }

  
  request: boolean = false;
  
  editProcess: boolean = true;

  form = {validate: true, name: 0, code: 0, price: 0}; 

  constructor(private _http: InventoryService,
              private router: Router,
              private actRou: ActivatedRoute) {

                this.observerRef = actRou.params.subscribe(params => {
                  this.product = this.store.showProductById(params['id']);
                  Object.assign(this.productEditable, this.product);
                });

              }

  ngOnDestroy(){
    this.observerRef.unsubscribe();
    this.state.background = 'initial';
      this.state.card = 'initial';

    if(localStorage.getItem('inventoryUpdateStatus') == '1')
      localStorage.setItem('inventoryUpdateStatus', '0');
  }

  ngOnInit() {
    this.products = this.store.getInventory();
    

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);
  }

  formSubmit(){

    this.request = true;

    this.restoreValidation();
    if(this.validateName())
      this.validateUniqueName();
    if(this.validateCode())
      this.validateUniqueCode();
    this.validatePrice();

    if(this.form.validate == false){
      this.request = false;
      return;
    } 

    this._http.update(this.productEditable).then(
      data => {
        this.request = false;
        this.store.updateProduct(this.productEditable);
        localStorage.setItem('productUpdated', JSON.stringify({original: this.product, edited: this.productEditable}));
        localStorage.removeItem('inventoryUpdateStatus');
        this.closePop();
      },
      error => {
        this.request = false;
        console.log(error);
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
    if(this.productEditable.name == null || this.productEditable.name == ''){
      this.form.name = 1;
      this.form.validate = false;
      return false;
    }
    return true;

  }//Fin de validateName public function()

  validateUniqueName(){    
    this.form.name = -1;

    for(let x of this.products){
      
      if(this.productEditable.name == x.name){
        
        if(this.productEditable.name !== this.product.name){
          
          this.form.name = 2;
          this.form.validate = false;
          break;

        }
      }
    }
    
  }

  validateCode(){
    if(this.productEditable.code == null || this.productEditable.code == '') { return false; }
  }//Function that validate Product => Code unique but enable to works if is it null

  validateUniqueCode(){
    this.form.code = -1;
    for(let x of this.products){
        
      if(this.productEditable.code == x.code){

        if(this.productEditable.code !== this.product.code){
          this.form.code = 2;
          this.form.validate = false;
          break;
        }          

      }      
    }    
  }

  validatePrice(){
    if(this.productEditable.price == null){
      this.form.price = 1;
      this.form.validate = false;
    } 
    else { this.form.price = -1 }
  }//Validacion del Precio requerido

  restoreValidation(){
    this.form = {
      validate: true,
      name: 0,
      code: 0,
      price: 0
    };
  }

  upperCaseName(){
    if(this.productEditable.name != undefined)
    this.productEditable.name = this.productEditable.name.toUpperCase();
  }

  // eliminacion del producto
  deleteProduct(){

    this._http.delete(this.product).then(
      data => {
        localStorage.setItem('inventoryUpdateStatus', '2');
        localStorage.setItem('productUpdated', this.product.id.toString());
        this.prod.deleteProductStorage(this.product.id);
        this.closePop();
      }, error => {
        console.log(error);
      }
    );

  }

}
