import { Component, OnInit, OnDestroy } from '@angular/core';
import { MonthlyPrice } from '../classes/monthly-price';
import { MonthlyPriceService } from './monthly-price.service';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'app-monthly-price',
  templateUrl: './monthly-price.component.html',
  styleUrls: ['./monthly-price.component.css']
})
export class MonthlyPriceComponent implements OnInit {

  public monthlyPrices: Array<MonthlyPrice> = [];

  public intervalNewPrice: any;
  public credential = parseInt(localStorage.getItem('userType'));
  public sort: number = 0;
  public request: boolean = false;

  principal = true
  subscriptionHttp

  constructor(private _http: MonthlyPriceService, private router: Router) {

    this.subscriptionHttp = this._http.getData().subscribe(x => {      
      if (x.action === 'delete') {        
        this.deletePrice(x.data)
      } else if  (x.action === 'update') {        
        this.updatePrice(x.data)
      }
    })
    
    this.router.events.filter((event: any) => event instanceof NavigationEnd)
    .subscribe(event => { 
      if(event.url == "/monthly-cost") this.principal = true
      else this.principal = false            
    });    

    this.request = true;
    _http.getAll().then(
      data => {
        for(let x of data){
          
          x.edit = false;
          x.cost = parseFloat(x.cost);
          x.id = parseInt(x.id);
          x.hours = parseInt(x.hours);
          this.monthlyPrices.push(x);
        }
        
        MonthlyPrice.setPricesLocalStorage(this.monthlyPrices)
        
      },
      error => localStorage.setItem('request', JSON.stringify(error)),
    ).then(
      () => this.request = false
    );

    this.setIntervalNewPrice();

  }

  deletePrice(price){
    
    for(let x = 0; x < this.monthlyPrices.length; x++) {
      if(this.monthlyPrices[x].id == price.id) {
        this.monthlyPrices.splice(x, 1);
        break;
      }
    }

    MonthlyPrice.setPricesLocalStorage(this.monthlyPrices)
  }

  updatePrice(price) {
    for(let x = 0; x < this.monthlyPrices.length; x++) {
      if(this.monthlyPrices[x].id == price.id) {
        Object.assign(this.monthlyPrices[x], price)
        break;
      }
    }

    MonthlyPrice.setPricesLocalStorage(this.monthlyPrices)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    localStorage.removeItem('monthlyPrices');
    this.subscriptionHttp.unsubscribe()
  } 

  startModify(price) {

    price.edit = true;
    
    setTimeout(() => {

      document.getElementById('editPrice').focus();

    }, 20);

  }

  pushEdit(price) {

    price.edit = false;
    this.request = true;
    this._http.update(price).then(

      data => {

        price.updated_at = data.updated_at;

        let not = {
          status: 200,
          title: 'Precio Actualizado',
          description: 'Datos cargados a la base de datos'
        };

        localStorage.setItem('request', JSON.stringify(not));

      },

      error => localStorage.setItem('request', JSON.stringify(error))

    ).then(
      () => this.request = false
    );

  }

  setIntervalNewPrice() {
    this.intervalNewPrice = setInterval(() => this.intervalNewPriceLogic(), 1112);
  }

  intervalNewPriceLogic() {
    
    if(localStorage.getItem('newMonthlyPrice') == undefined) return;

    let newMonthly = new MonthlyPrice();
    newMonthly = JSON.parse(localStorage.getItem('newMonthlyPrice'));

    this.monthlyPrices.push(newMonthly);

    localStorage.removeItem('newMonthlyPrice');

    if(this.sort == 0) {
      this.sortHoursUp();
    } else {
      this.sortHoursDown();
    }

  }


  sortHoursUp(){
    
    this.sort = 1;

    this.monthlyPrices.sort((a, b) => {
      if(a.hours > b.hours){
        return -1;
      } else if (a.hours < b.hours){
        return 1;
      } else {
        return 0;
      }
    });

  }

  sortHoursDown() {

    this.sort = 0;

    this.monthlyPrices.sort((a, b) => {
      if(a.hours < b.hours){
        return -1;
      } else if (a.hours > b.hours){
        return 1;
      } else {
        return 0;
      }
    });

  }

}
