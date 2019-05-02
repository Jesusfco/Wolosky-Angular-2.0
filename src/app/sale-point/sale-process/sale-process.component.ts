import { Component, OnInit } from '@angular/core';
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
    
    if(this.sale.receipts.length  == 0) {
      let receipt = new Receipt();
      receipt.amount = this.sale.total
      this.sale.receipts.push(receipt)
    }

    if(this.sale.type == 3)
      this.form = 3;

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
    if(localStorage.getItem('saleStatus') == '1')
      localStorage.setItem('saleStatus', '0');

  }

  checkClientMoney(){
    this.form = 2;

    setTimeout(() => {
      
        document.getElementById('salesBtnConfirm').focus();

    }, 10);

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

        let not = {
          status: 200,
          title: 'Venta Cargada con exito',
          description: 'La venta se ha cargado al servidor'
        };

        localStorage.setItem('request', JSON.stringify(not));

      },
      error => {

        localStorage.setItem('request', JSON.stringify(error));

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
        
        localStorage.removeItem('saleDescription');
        localStorage.removeItem('saleType');
        localStorage.removeItem('saleStatus');
        
        this.inventory.afterSale(this.sale.description);

        let not = {
          status: 200,
          title: 'Venta Cargada con exito',
          description: 'La venta se ha cargado al servidor'
        };

        localStorage.setItem('request', JSON.stringify(not));

        this.closePop();

      },

      error => {

        localStorage.setItem('request', JSON.stringify(error));
        this.sale.storeSaleErrorConnection(this.sale);

      }

    ).then(

      () => this.request = true,

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
    this.saleDebt.user_name = this.saleDebt.user_name.replace(/\s+$/, '');
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
