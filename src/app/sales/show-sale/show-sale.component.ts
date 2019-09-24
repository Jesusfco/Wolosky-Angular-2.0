import { User } from './../../classes/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Sale } from '../../classes/sale';
import { SaleService } from '../../services/sale.service';
import { cardPop, backgroundOpacity } from '../../animations';
import { Storage } from '../../classes/storage';
import { NotificationService } from '../../notification/notification.service';
import { Cash } from '../../classes/cash';

@Component({
  selector: 'app-show-sale',
  templateUrl: './show-sale.component.html',
  styleUrls: ['./show-sale.component.css'],
  animations: [cardPop, backgroundOpacity]
})
export class ShowSaleComponent implements OnInit {

  public sale: Sale = new Sale();
  auth: User = User.authUser()
  public backSales: Array<Sale> = [];
  state = {
    background: 'initial',
    card: 'initial',
  };
  public products = [];
  public observerRef;
  public storage: Storage = new Storage();
  window = 1
  sendData

  constructor(private router: Router, 
    private _http: SaleService, 
    private notification: NotificationService,
    private actRou: ActivatedRoute) {

      console.log(this.auth)

      this.backSales = JSON.parse(localStorage.getItem('salesComponent'));
      this.products = JSON.parse(localStorage.getItem('inventory'));

    this.observerRef = actRou.params.subscribe(params => {
      this.sale.id = params['id'];            

      this._http.showSale(this.sale.id).then(
        data => {
          this.sale.setData(data);
          console.log(this.sale)
        },
        error => console.log(error)
      );
    });
   }

  ngOnInit() {
    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 80);
  }

  ngOnDestroy(){
    this.observerRef.unsubscribe();
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/sales']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  print(){
    window.print()
  }

  delete(n) {

    this.sendData++
    this._http.deleteSale(this.sale.id, n).then(
      data => {
        // if(n == 1) {
        //   if(this.sale.type <= 2) 
        //     Cash.addCash(- this.sale.total)        
        // }
        this._http.sendData('delete', this.sale)
        this.closePop()

      }, error => this.notification.sendError(error)
    ).then(() =>this.sendData--)

  }

}

