import { Component, OnInit } from '@angular/core';
import { cardPop, backgroundOpacity} from '../../animations';
import { Router } from '@angular/router';
import { Sale } from '../sale';
import { SaleService } from '../sale.service';
import { Product } from '../../product';
import { SaleDebt } from '../../classes/sale-debt';

@Component({
  selector: 'app-sale-process',
  templateUrl: './sale-process.component.html',
  styleUrls: ['./sale-process.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class SaleProcessComponent implements OnInit {

  public sale: Sale = new Sale();
  public inventory: Product =  new Product();
  public saleDebt: SaleDebt = new SaleDebt();

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
            private _http: SaleService) { 
    
    

    this.sale.description = this.sale.getLocalSale();
    this.sale.type = this.sale.getSaleTypeStorage();
    this.sale.getTotal();
    let money = this.sale.total;
    this.sale.clientMoney = money;

    if(this.sale.type == 3)
      this.form = 3;

  }

  ngOnInit() {
    setTimeout(() => {
      this.state[0].background = 'final';
      this.state[0].card = 'final';
    }, 80);
  }

  ngOnDestroy() {    
    if(localStorage.getItem('saleStatus') == '1')
      localStorage.setItem('saleStatus', '0');

  }

  checkClientMoney(){
    this.form = 2;
  }

  confirmSale(){
    this.sale.setCreatedAt();

    localStorage.removeItem('saleDescription');
    localStorage.removeItem('saleType');
    this.request = true;

    this._http.postSale(this.sale).then(
      data => {
        let x = parseInt(localStorage.getItem('userCash'));
        x += this.sale.total;
        localStorage.setItem('userCash', x.toString());

        this.inventory.afterSale(this.sale.description);
        localStorage.removeItem('saleStatus');
      },
      error => {
        console.log(error);
        let x = parseInt(localStorage.getItem('userCash'));
        x += this.sale.total;
        localStorage.setItem('userCash', x.toString());

        this.inventory.afterSale(this.sale.description);
        this.sale.storeSaleErrorConnection(this.sale);
      }
    ).then(
      () => this.request = false
    );

    localStorage.removeItem('saleStatus');
    this.closePop()
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
    this.saleDebt.total = this.sale.total;
    this.sale.setCreatedAt();
    
    this._http.debtSale({sale: this.sale, saleDebt: this.saleDebt}).then(

      data => {
        alert("VENTA CONCRETADA");
        localStorage.removeItem('saleDescription');
        localStorage.removeItem('saleType');
        localStorage.removeItem('saleStatus');
        this.inventory.afterSale(this.sale.description);
        this.closePop();
      },

      error => console.log(error)

    ).then(

      () => this.request = true,

    );
  }

  searchInput() {
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


}
