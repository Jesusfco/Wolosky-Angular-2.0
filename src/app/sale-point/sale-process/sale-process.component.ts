import { Component, OnInit } from '@angular/core';
import { cardPop, backgroundOpacity} from '../../animations';
import { Router } from '@angular/router';
import { Sale } from '../sale';
import { SaleService } from '../sale.service';
import { Product } from '../../product';

@Component({
  selector: 'app-sale-process',
  templateUrl: './sale-process.component.html',
  styleUrls: ['./sale-process.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class SaleProcessComponent implements OnInit {

  public sale: Sale = new Sale();
  public inventory: Product =  new Product();

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

  public form: number = 1;

  constructor(private router: Router,
            private _http: SaleService) { 
    
    

    this.sale.description = this.sale.getLocalSale();
    this.sale.type = this.sale.getSaleTypeStorage();
    this.sale.getTotal();
    let money = this.sale.total;
    this.sale.clientMoney = money;

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

}
