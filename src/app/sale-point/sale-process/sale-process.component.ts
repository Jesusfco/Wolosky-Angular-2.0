import { User } from './../../classes/user';
import { MyCarbon } from './../../utils/classes/my-carbon';
import { NotificationService } from './../../notification/notification.service';
import { Cash } from './../../classes/cash';
import { Focus } from './../../utils/classes/focus';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { cardPop, backgroundOpacity} from '../../animations';
import { Router } from '@angular/router';
import { Sale } from '../../classes/sale';
import { SaleService } from '../sale.service';
import { Product } from '../../classes/product';
import { SaleDebt } from '../../classes/sale-debt';
import { Receipt } from '../../classes/receipt';

@Component({
  selector: 'app-sale-process',
  templateUrl: './sale-process.component.html',
  styleUrls: ['./sale-process.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class SaleProcessComponent implements OnInit {

  public sale: Sale = Sale.getLastSale();
  public inventory: Product =  new Product();
  public saleDebt: SaleDebt = new SaleDebt();
  auth: User = User.authUser()

  state = [{
    background: 'initial',
    card: 'initial',
  },{
    background: 'final',
    card: 'final'
  },{
    background: 'final',
    card: 'final'
  }];

  public sugests = [];
  public timer = 0;
  public request: boolean = false;
  public form: number = 1;

  constructor(private router: Router,
            private _http: SaleService,
            private not: NotificationService) { 
           
    this.sale.creator = this.auth
    if(this.sale.receipts.length  == 0 && this.sale.type != 3) {
      let receipt = new Receipt();
      receipt.amount = this.sale.total
      receipt.payment = this.sale.total
      this.sale.receipts.push(receipt)
      this.sale.saveOnLocalStorage()
    }

    if(this.sale.type == 3) {
      this.sale.receipts = []
      if(this.sale.saleDebt == undefined) {
        this.sale.saleDebt = this.saleDebt
      } else {
        this.saleDebt = this.sale.saleDebt
      }

      this.form = 3;

    }
      

  }

  ngOnInit() {

    setTimeout(() => {
      this.state[0].background = 'final';
      this.state[0].card = 'final';

      if(this.sale.type != 3) {
        document.getElementById('saleClientMoney').focus(); 
      } else {
        document.getElementById('saleSearchUser').focus(); 
      }

    }, 80);

  }

  ngOnDestroy() {        

  }

  checkClientMoney(){
    if(this.sale.receipts[0].payment < this.sale.total) return
    
    this.form = 2;
    Focus.elementById('salesBtnConfirm')

  }

  confirmSale(){
    this.sale.created_at = MyCarbon.nowTimeStamp()
    Sale.removeLastSaleStorage()
    this.request = true;

    this._http.postSale(this.sale).then(
      data => {                
        this.sale.id= data.id
        this._http.sendData('finish', 1)
        this.not.sendNotification('Venta Cargada con exito', 'La venta se ha cargado al servidor', 6000)        
      },
      error => {

        this.not.sendError(error)                        
        this.sale.storeSaleErrorConnection(this.sale);

      }
    ).then(
      () => {
        this.request = false
        this.form = 4
        Focus.elementById('select2')
        Cash.addCash(this.sale.total)
        this.inventory.afterSale(this.sale.description);
      }
    );
    
    

  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/sale-point']);
    }, 450);
    this.state[0].background = 'initial';
    this.state[0].card = 'initial';
    
  }

  debtForm() {
    if(this.validateDebt() == false) return;

    this.request = true;    
    this.sale.created_at = MyCarbon.nowTimeStamp()
    
    this._http.postSale(this.sale).then(
      data => {             
        this.sale.id= data.id   
        this._http.sendData('finish', 1)
        this.not.sendNotification('Venta Cargada con exito', 'La venta se ha cargado al servidor', 6000)        
      },
      error => {

        this.not.sendError(error)                        
        this.sale.storeSaleErrorConnection(this.sale);

      }
    ).then(
      () => {
        this.request = false
        this.form = 4
        Focus.elementById('select2')
        Cash.addCash(this.sale.total)
        this.inventory.afterSale(this.sale.description);
      }
    );
  }

  searchInput(key) {

    if(key.keyCode >=37 && key.keyCode <= 40 || key.keyCode == 13) return;

    this.timer++;    

    setTimeout(() => {
      this.timer--;
    }, 300);

    setTimeout(() => {
      
      if(this.timer == 0){        
        
        this._http.getSugestMaster({keyword: this.saleDebt.user_name}).then(
          data => {
            this.sugests = data;
          }, error => console.log(error)
        );
      } 

    }, 350);
  }

  searchReceiptId(id){
    this.saleDebt.user_id = id;
  }

  validateDebt() {
    let form = false;
    this.saleDebt.user_name = this.saleDebt.user_name.trim();
    for(let x of this.sugests){

      if(this.saleDebt.user_name == x.name) {
        form = true;
        break;
      }

    }

    if(!form)
      alert("El nombre del deudor debe coincidir con alguna sugerencia");

    return form;
    
    
  }

  print(){
    window.print()
  }


}
