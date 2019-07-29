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
  constructor(
    private actRou: ActivatedRoute,
    private _http: MonthlyPriceService,
    private not: NotificationService) { 

    actRou.parent.params.subscribe(params => {
      this.price.id = params['id'];     
      this.getData()   
    });

    Focus.elementById("focus1")

  }

  ngOnInit() {
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

        let not = {
          status: 200,
          title: 'Precio Actualizado',
          description: 'Datos cargados a la base de datos'
        };

        localStorage.setItem('request', JSON.stringify(not));

      },

      error => localStorage.setItem('request', JSON.stringify(error))

    ).then(
      () => this.request--
    );

  }



}
