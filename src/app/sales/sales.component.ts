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

  public search = {
    from: "",
    to: "",
    items: 25,
    page: 1,
    total: 0,
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
    this.getDates();
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

  getData(){
    this.request = true;
    this._http.getSalesParameter(this.search).then(
      data => {

        
        this.sales = data.data;
        this.search.total = data.total;
        // this.analize = this.sal.getGrossProfit(data);

      },
      error => {
        console.log(error);

      },
    ).then(
      () => {
        this.request = false;
      }
    );

    if (this.search.from !== undefined && this.search.to === undefined){

      

    }
    else if (this.search.from !== undefined && this.search.to !== undefined){

    }

  }

  getDates(){
    let d = new Date();

    if(d.getMonth() <= 8){
      this.search.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + d.getDate();
      // this.search.to = d.getFullYear() + "-0" + (d.getMonth() + 2 ) + "-" + "01";    
    } else {
      this.search.from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate();
      // this.search.to = d.getFullYear() + "-" + (d.getMonth() + 2 ) + "-" + "01";
    }
  }
}