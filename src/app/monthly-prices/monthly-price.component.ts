import { Component, OnInit, OnDestroy } from '@angular/core';
import { MonthlyPrice } from '../classes/monthly-price';
import { MonthlyPriceService } from './monthly-price.service';

@Component({
  selector: 'app-monthly-price',
  templateUrl: './monthly-price.component.html',
  styleUrls: ['./monthly-price.component.css']
})
export class MonthlyPriceComponent implements OnInit {

  public monthlyPrices: Array<MonthlyPrice> = [];

  public intervalNewPrice: any;

  public sort: number = 0;

  constructor(private _http: MonthlyPriceService) {

    _http.getAll().then(
      data => {
        for(let x of data){
          
          x.edit = false;
          x.cost = parseFloat(x.cost);
          x.id = parseInt(x.id);
          x.hours = parseInt(x.hours);
          this.monthlyPrices.push(x);
        }
        
        this.localStoragePrices();
      },
      error => localStorage.setItem('request', JSON.stringify(error)),
    );

    this.setIntervalNewPrice();

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    localStorage.removeItem('monthlyPrices');
  }

  deletePrice(price) {

    this._http.delete(price).then(
      data => {

        for(let x = 0; x < this.monthlyPrices.length; x++) {
          if(this.monthlyPrices[x].id == price.id) {
            this.monthlyPrices.splice(x, 1);
            break;
          }
        }

        let not = {

          status: 200,
          title: 'Precio Eliminado',
          description: 'Datos eliminados de la Base de Datos',
          
        };

        localStorage.setItem('request', JSON.stringify(not));

        this.localStoragePrices();

      },

      error => localStorage.setItem('request', JSON.stringify(error))
    );
  }

  startModify(price) {

    price.edit = true;
    
    setTimeout(() => {

      document.getElementById('editPrice').focus();

    }, 20);

  }

  pushEdit(price) {

    price.edit = false;

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

    );

  }

  setIntervalNewPrice() {
    this.intervalNewPrice = setInterval(() => this.intervalNewPriceLogic(), 1000);
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

  localStoragePrices() {
    localStorage.setItem('monthlyPrices', JSON.stringify(this.monthlyPrices));
  }

}
