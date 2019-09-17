import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonthlyPriceService } from '../../services/monthly-price.service';
import { NotificationService } from '../../notification/notification.service';
import { MonthlyPrice } from '../../classes/monthly-price';
import { User } from '../../classes/user';
import { MonthlyPayment } from '../../classes/monthly-payment';

@Component({
  selector: 'app-verify-monthly-price',
  templateUrl: './verify-monthly-price.component.html',
  styleUrls: ['./verify-monthly-price.component.css']
})
export class VerifyMonthlyPriceComponent implements OnInit {

  price: MonthlyPrice = new MonthlyPrice();
  request = 0
  subscriptionHttp

  users: Array<User> = []
  prices: Array<MonthlyPrice> = []
  formValidate = true;
  analisis = [] 
  /*
    ESTRUCTURE ANALISIS ARRAY []
    {user: -, hours: -, minutes: -, monthly: -, validate: true}
  */

  constructor( 
    private actRou: ActivatedRoute,
    private _http: MonthlyPriceService,
    private not: NotificationService) { 

      this.prices = MonthlyPrice.getPricesLocalStorage()

    this.subscriptionHttp = this._http.getData().subscribe(x => {      
      if (x.action == 'show') {        
        Object.assign(this.price, x.data);
        this.getUsers()         
      }
    });

    actRou.parent.params.subscribe(params => {
      this.price.id = params['id'];            
    });

  }

  ngOnDestroy() {
    this.subscriptionHttp.unsubscribe()
  }

  ngOnInit() {
  }

  getUsers() {
    this.request++
    this._http.getStudentsSchedules().then(
      data => {

        this.users = []

        for(let d of data) {
          let object = new User()
          object.setData(d)
          this.users.push(object)
        }

        let before = new MonthlyPrice() //CONSEGUIR PRECIO ANTERIOR
        for(let p of this.prices) {
          if(p.hours < this.price.hours){
            if(before.hours < p.hours) {
              before = p
            }
          }
        }        
        let last = true //EL PRECIO ACTUAL ES EL ULTIMO EN HORAS?
        for(let p of this.prices) {
          if(p.hours > this.price.hours){            
            last = false
            break
          }
        }

        for(let user of this.users) { //ANALISIS DE CANTIDAD DE TIEMPO POR ALUMNO

          let j = {
            user: user,
            hours: 0,
            minutes: 0,
            monthly: new MonthlyPayment(),
            validate: true
          }

          j.monthly.setValues(user.monthly_payment)
          j.monthly.amount = this.price.cost

          for(let che of user.schedules) {

            let checkIn = che.check_in.split(":");
            let checkOut = che.check_out.split(":");
            
            j.hours += parseInt(checkOut[0]) - parseInt(checkIn[0])
            j.minutes += parseInt(checkOut[1]) - parseInt(checkIn[1])            
          }

          if(j.minutes < 0) {
            while(j.minutes < 0) {
              j.hours--
              j.minutes += 60
            }
          } else if(j.minutes >= 60) {
            while(j.minutes >= 60) {
              j.hours++
              j.minutes -= 60
            }
          }
                    
          
          if(last && j.hours >= this.price.hours) { // ULTIMO PRECIO DE HORA            
            this.analisis.push(j)                                          
            continue;              
          }

          if(j.hours >= before.hours && j.hours <= this.price.hours){

            if(j.hours >= before.hours && j.hours != this.price.hours) {

              if(j.minutes > 0) 
                this.analisis.push(j)                
              
              continue;
              
            }

            else if(j.hours == this.price.hours) {
              
              if(j.minutes == 0) {
                this.analisis.push(j)
                continue;
              }
              
            }

          }

        } // FIN DE ANALISIS DE TIEMPO                

      }, error => this.not.sendError(error)

    ).then(() => this.request--)
  }

  updatePrices() {
    if(!this.validateMonthlies()){
      alert("Asegurese de que los valores de las nuevas mensualidades sean validos.")
      return;
    }

    let array = []
    for(let d of this.analisis){
      array.push(d.monthly)
    }

    this.request++
    this._http.updateStudentsMonthly(array).then(
      data=> this.not.sendNotification('Mensualidades actualizadas', 'Los datos han sido guardado correctamente en el servidor', 3000),
      error => this.not.sendError(error)      
    ).then(() => this.request--)
  }

  validateInput(i) {
    let x = this.analisis[i].monthly.amount

    if(x == null || x < 0) this.analisis[i].validate = false

    else this.analisis[i].validate = true

  }

  validateMonthlies() {
    for(let x of this.analisis) {
      if(!x.validate) return false;
    }
    return true
  }

}
