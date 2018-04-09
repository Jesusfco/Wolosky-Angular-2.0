import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Sale } from '../../sale-point/sale';
import { SaleService } from '../../sale-point/sale.service';
import { cardPop, backgroundOpacity } from '../../animations';
import { Storage } from '../../storage';

@Component({
  selector: 'app-show-sale',
  templateUrl: './show-sale.component.html',
  styleUrls: ['./show-sale.component.css'],
  animations: [cardPop, backgroundOpacity]
})
export class ShowSaleComponent implements OnInit {

  public sale: Sale = new Sale();
  state = {
    background: 'initial',
    card: 'initial',
  };
  public products = [];
  public observerRef;
  public storage: Storage = new Storage();

  constructor(private router: Router, private _http: SaleService, private actRou: ActivatedRoute) {

    this.observerRef = actRou.params.subscribe(params => {
      this.sale.id = params['id'];
      this._http.showSale(this.sale.id).then(
        data => {
          this.sale = this.storage.setNamesById(data);

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

}
