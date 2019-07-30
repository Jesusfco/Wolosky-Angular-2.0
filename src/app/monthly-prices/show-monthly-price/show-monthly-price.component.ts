import { Component, OnInit, OnDestroy } from '@angular/core';
import { MonthlyPrice } from '../../classes/monthly-price';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MonthlyPriceService } from '../monthly-price.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-show-monthly-price',
  templateUrl: './show-monthly-price.component.html',
  styleUrls: ['./show-monthly-price.component.css']
})
export class ShowMonthlyPriceComponent implements OnInit {

  price: MonthlyPrice = new MonthlyPrice();
  request = 0

  principal = true

  subscriptionHttp
  constructor(
    private actRou: ActivatedRoute,
    private router: Router,
    private _http: MonthlyPriceService,
    private not: NotificationService    ) { 

      actRou.params.subscribe(params => {
        this.price.id = params['id'];     
        this.getData()   
      });

      router.events.filter((event: any) => event instanceof NavigationEnd)
        .subscribe(event => { 
          if(event.url == ("/monthly-cost/ver/" + this.price.id)) this.principal = true
          else this.principal = false            
      }); 
      
      this.subscriptionHttp = this._http.getData().subscribe(x => {      
        if (x.action === 'update') {        
          Object.assign(this.price, x.data);         
        }
      });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionHttp.unsubscribe()
  }

  getData() {
    this.request++;
    this._http.show(this.price).then(
      data => {
        this.price.setData(data)
        this.sendObject()
      },
      error => this.not.sendError(error) 
    ).then(() => this.request--);

  }

  sendObject() {
    this._http.sendData('show', this.price)
  }

  deletePrice(price) {

    this.request++;
    this._http.delete(price).then(
      data => {

        let array = MonthlyPrice.getPricesLocalStorage()
        for(let x = 0; x < array.length; x++) {
          if(array[x].id == price.id) {
            array.splice(x, 1);
            break;
          }
        }

        MonthlyPrice.setPricesLocalStorage(array)

        let not = {

          status: 200,
          title: 'Precio Eliminado',
          description: 'Datos eliminados de la Base de Datos',
          
        };

        localStorage.setItem('request', JSON.stringify(not));

        // this.localStoragePrices();

      },

      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request--
    );
  }

  localStoragePrices() {
    // localStorage.setItem('monthlyPrices', JSON.stringify(this.monthlyPrices));
  }

  

}
