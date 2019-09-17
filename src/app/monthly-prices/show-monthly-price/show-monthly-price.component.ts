import { Component, OnInit, OnDestroy } from '@angular/core';
import { MonthlyPrice } from '../../classes/monthly-price';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MonthlyPriceService } from '../../services/monthly-price.service';
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
  deleteC = false
  deleteMessage = {
    type: 1,
    title: "¿Estas seguro de eliminar el costo de esta hora?",
    message: "Las mensualidades no se veran afectadas despues de la eliminación, de esa hora. Tendran que ser establecidas manualmente."
  }
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

        this._http.sendData('delete', this.price);
        this.not.sendNotification('Precio de Hora Eliminado', 'Los datos han sido actualizado correctamente', 2500);
        this.router.navigate(['/monthly-cost']);        

      },

      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request--
    );
  }

  localStoragePrices() {
    // localStorage.setItem('monthlyPrices', JSON.stringify(this.monthlyPrices));
  }

  deleteObserve(e) {
    this.deleteC = false;
    if(!e) return;

  this.deletePrice(this.price);

  }

}
