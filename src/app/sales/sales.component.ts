import { Component, OnInit } from '@angular/core';
import { Sale } from '../classes/sale';
import { SaleService } from '../sale-point/sale.service';
import { Url } from '../classes/url';
import { Storage } from '../classes/storage';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-sale-component',
  templateUrl: './sale-component.component.html',
  styleUrls: ['./sale-component.component.css']
})
export class SalesComponent implements OnInit {
  
  public sales: Array<Sale> = [];
  public backSales: Array<Sale> = [];
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

  public sort: any = {
    id: 0,
    total: 0,
    created: 0,
  };

  public lenghtArrayOptions: Array<number> = [ 10, 25, 50, 100, 200 ];

  public pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 25,
    length: 0
  };

  public request: boolean = false;

  public storage: Storage = new Storage();
  public url: Url = new Url();


  constructor(private _http: SaleService) {

    this.request = true;
    this.getDates();

    this._http.getSales().then(
      data => {

        this.request = false;
        this.backSales = data;
        this.refreshTable();
        this.analize = this.sal.getGrossProfit(data);
        localStorage.setItem('salesComponent', JSON.stringify(data));

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

    this.validateFromTo();
    this._http.getSalesParameter(this.date).then(

      data => {

        this.backSales = data;
        this.refreshTable();
        localStorage.setItem('salesComponent', JSON.stringify(data));

      },
      error => {
        localStorage.setItem('request', JSON.stringify(error));

      },
    ).then(
      () => this.request = false
    );

    if (this.date.from !== undefined && this.date.to === undefined){

      

    }
    else if (this.date.from !== undefined && this.date.to !== undefined){

    }

  }

  validateFromTo() {
    let d = new Date(this.date.from);
    let x = new Date(this.date.to);

    if(d > x) {
      let yy = this.date.from;
      this.date.from = this.date.to;
      this.date.to = yy;

    }
  }

  getDates(){
    let d = new Date();

    if(d.getMonth() <= 7){
      this.date.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + d.getDate();
      this.date.to = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + d.getDate();
    } else if (d.getMonth() == 8){
      this.date.from = d.getFullYear() + "-0" + (d.getMonth() + 1 ) + "-" + d.getDate();
      this.date.to = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate();
    } else {
      this.date.from = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate();
      this.date.to = d.getFullYear() + "-" + (d.getMonth() + 1 ) + "-" + d.getDate();
    }
  }

  getToday(){
    this.getDates();
    this.search();
  }

  testPage($event){
    
    this.pageEvent = $event;
    this.refreshTable();

  }

  refreshTable() {

    this.sales = [];

    for(let i = 0; i < this.pageEvent.pageSize; i++){

      if(i + (this.pageEvent.pageIndex * this.pageEvent.pageSize) == this.backSales.length) { break; }

      this.sales.push(this.backSales[i + (this.pageEvent.pageIndex * this.pageEvent.pageSize)]);

    }

  }

  sortById(){

    if(this.sort.id == 0) {
      
      this.backSales.sort((a, b) => {
        if(a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.id = 1;

    } else if ( this.sort.id == 1 ) {

      this.backSales.sort((a, b) => {
        if(a.id > b.id) {
          return -1;
        } else if (a.id < b.id) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.id = 0;

    }
    
    this.refreshTable();

  }

  sortByTotal(){

    if(this.sort.total == 0) {
      
      this.backSales.sort((a, b) => {
        if(a.total < b.total) {
          return -1;
        } else if (a.total > b.total) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.total = 1;

    } else if ( this.sort.total == 1 ) {

      this.backSales.sort((a, b) => {
        if(a.total > b.total) {
          return -1;
        } else if (a.total < b.total) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.total = 0;

    }
    
    this.refreshTable();

  }

  sortByDate(){
    if(this.sort.created == 0) {
      
      this.backSales.sort((a, b) => {
        if(a.created_at < b.created_at) {
          return -1;
        } else if (a.created_at > b.created_at) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.created = 1;

    } else if ( this.sort.created == 1 ) {

      this.backSales.sort((a, b) => {
        if(a.created_at > b.created_at) {
          return -1;
        } else if (a.created_at < b.created_at) {
          return 1;
        } else {
          return 0;
        }
      });

      this.sort.created = 0;

    }
    
    this.refreshTable();
  }

}