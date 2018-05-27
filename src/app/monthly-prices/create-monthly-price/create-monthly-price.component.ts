import { Component, OnInit } from '@angular/core';
import { MonthlyPrice } from '../../classes/monthly-price';
import { MonthlyPriceService } from '../monthly-price.service';
import { Router } from '@angular/router';
import { BackgroundCard, Card } from '../../animations/card.animation';


@Component({
  selector: 'app-create-monthly-price',
  templateUrl: './create-monthly-price.component.html',
  styleUrls: ['./create-monthly-price.component.css'],
  animations: [ Card, BackgroundCard]
})
export class CreateMonthlyPriceComponent implements OnInit {

  public monthlyPrice: MonthlyPrice = new MonthlyPrice();

  public request: boolean = false;

  public validation: any = {
    form: true,
    cost: null,
    hour: null,
  };

  public state = {
    background: 'initial',
    card: 'initial',
  };

  constructor(
    private _http: MonthlyPriceService,
    private router: Router
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 100);

    setTimeout(() => {
      document.getElementById('inputHourMonthly').focus();
    }, 500);

  }

  send() {
    this.restoreValidation();
    this.validateUniqueHour();
    this.validateCost();
    this.validateHour();

    if(this.validation.form == false) return;

    this.request = true;

    this._http.create(this.monthlyPrice).then(

      data => {
        
        data.edit = false;
        localStorage.setItem('newMonthlyPrice', JSON.stringify(data));
        

        let not = {
          status: 200,
          title: 'Precio Guardado Correctament',
          description: 'El precio ha sido cargado a la base de datos'
        };

        localStorage.setItem('request', JSON.stringify(not));

        this.closePop();

      },

      error => localStorage.setItem('request', JSON.parse(error))

    ).then(
      () => this.request = false
    );

  }

  closePop() {

    setTimeout(() => {
      this.router.navigate(['/monthly-cost']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';

  }

  validateHour(){
    
    if(this.monthlyPrice.hours == null || this.monthlyPrice.hours <= 0){
      this.validation.hour = 1;
      this.validation.form = false;
    }

  }

  validateCost() {

    if(this.monthlyPrice.cost == null || this.monthlyPrice.cost <= 0) {
      this.validation.cost = 1;
      this.validation.form = false;
    }

  }

  validateUniqueHour() {
    let prices = JSON.parse(localStorage.getItem('monthlyPrices'));

    for(let x of prices) {
      if(x.hours == this.monthlyPrice.hours){
        this.validation.hour = 2;
        this.validation.form = false;
        break;
      }
    }

  }

  restoreValidation() {
    let x = {
      form: true,
      cost: null,
      hour: null,
    };

    this.validation = x;
  }

}
