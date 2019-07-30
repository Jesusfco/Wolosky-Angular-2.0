import { Component, OnInit } from '@angular/core';
import { MonthlyPriceService } from '../monthly-price.service';
import { NotificationService } from '../../notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MonthlyPrice } from '../../classes/monthly-price';
import { Focus } from '../../utils/classes/focus';

@Component({
  selector: 'app-edit-monthly-price',
  templateUrl: './edit-monthly-price.component.html',
  styleUrls: ['./edit-monthly-price.component.css']
})
export class EditMonthlyPriceComponent implements OnInit {

  price: MonthlyPrice = new MonthlyPrice();
  request = 0
  subscriptionHttp
  constructor(
    private actRou: ActivatedRoute,
    private _http: MonthlyPriceService,
    private not: NotificationService) { 

    actRou.parent.params.subscribe(params => {
      this.price.id = params['id'];     
      this.getData()   
    });

    Focus.elementById("focus1")

    this.subscriptionHttp = this._http.getData().subscribe(x => {      
      if (x.action == 'show') {        
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

    this.request++
    this._http.show(this.price).then(

      data => this.price.setData(data),
      error => this.not.sendError(error) 

    ).then(() => this.request--)

  }

  form() {
    
    this.request++;
    this._http.update(this.price).then(

      data => {

        this.price.updated_at = data.updated_at;
        this.not.sendNotification('Precio Actualizado','Datos cargados a la base de datos', 2500)        
        this._http.sendData("update", this.price)

      },

      error => this.not.sendError(error)

    ).then(
      () => this.request--
    );

  }



}
