import { MyCarbon } from './../utils/classes/my-carbon';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  
  sales: Array<Sale> = [];    

  search = {
    from: '',
    to: '',
    total: 0,
    page: 1,
    per_page: 25,
  };
      

  public lenghtArrayOptions: Array<number> = [ 10, 25, 50, 100, 200 ];

  // public pageEvent: PageEvent = {
  //   pageIndex: 0,
  //   pageSize: 25,
  //   length: 0
  // };

  public request: boolean = false;

  public storage: Storage = new Storage();
  public url: Url = new Url();
  subscriptionHttp
  subscriptionSearch

  constructor(private _http: SaleService) {

    
    this.getDates();
    this.searchSales();

    this.subscriptionHttp = _http.getData().subscribe(x =>{
      
      if(x.action == 'delete') {        
        
        let i = 0
        for(let s of this.sales) {
          if(s.id == x.data.id) {
            this.sales.splice(i, 1)
            break
          }
          i++
        }

      }

    });
   

   }

  ngOnInit() {
  }

  ngOnDelete() {
    this.subscriptionHttp.unsubscribe()
    if(this.subscriptionSearch)
      this.subscriptionSearch.unsubscribe()
  }

  searchSales(){
    
    if(this.search.from == null || this.search.from == '' || this.search.to == null || this.search.to == '') return
    this.validateFromTo();
    this.request = true;
    
    if(this.subscriptionSearch)
      this.subscriptionSearch.unsubscribe()
    this.subscriptionSearch = this._http.getSalesParameter(this.search).subscribe(
      data => {
        
        this.sales = []
          for(let sale of data.data)   {
            let s = new Sale();
            s.setData(sale)
            this.sales.push(s)
          }

          this.search.total = data.total

      },
      
      null,
      () => {
        this.request = false
      }
      )
    
  }

  validateFromTo() {
    let d = new Date(this.search.from);
    let x = new Date(this.search.to);

    if(d > x) {
      let yy = this.search.from.toString();
      this.search.from = this.search.to.toString();
      this.search.to = yy;

    }
  }

  getDates() {
    this.search.from = MyCarbon.todayDateInput();
    this.search.to = MyCarbon.todayDateInput();
  }

  getToday(){
    this.getDates();
    this.searchSales();
  }

  paginatorEvent($event){
    
    this.search.page = $event.pageIndex + 1
    this.searchSales();

  }

  sendSale(sale) {
    this._http.sendData('show', sale);
  }

 

}