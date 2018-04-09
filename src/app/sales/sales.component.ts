import { Component, OnInit } from '@angular/core';
import { Sale } from '../sale-point/sale';
import { SaleService } from '../sale-point/sale.service';

@Component({
  selector: 'app-sale-component',
  templateUrl: './sale-component.component.html',
  styleUrls: ['./sale-component.component.css']
})
export class SalesComponent implements OnInit {
  public sales: Array<Sale> = [];
  public sal: Sale =  new Sale();

  public date = {
    from: null,
    to: null,
  };
  
  public analize = {
    neto: 0,
    total: 0,
    undefined: {
      count: 0,
      products: [],
    },
  };

  public request: boolean = false;


  constructor(private _http: SaleService) {
    this.request = true;

    this._http.getSales().then(
      data => {

        this.request = false;
        this.sales = data;
        this.analize = this.sal.getGrossProfit(data);

      },
      error => {
          console.log(error);
          this.request = false;
        }
      );

   }

  ngOnInit() {
  }

  search(){
    this.request = true;
    this._http.getSalesParameter(this.date).then(
      data => {

        this.request = false;
        this.sales = data;
        this.analize = this.sal.getGrossProfit(data);

      },
      error => {
        console.log(error);
        this.request = false;
      },
    );

    if (this.date.from !== undefined && this.date.to === undefined){

      

    }
    else if (this.date.from !== undefined && this.date.to !== undefined){

    }

  }
}

