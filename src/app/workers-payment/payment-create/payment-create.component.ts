import { DayAnalized } from './../../classes/dayAnalized';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { cardPop, backgroundOpacity} from '../../animations';
import { WorkPaymentService } from '../work-payment.service';
import { Record } from '../../classes/record';
import { User } from '../../classes/user';
import { Payment } from '../../classes/payment';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class PaymentCreateComponent implements OnInit {

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode === 27) {
      this.closePop();
    }
    
    if(this.window == 2) {
    
      if($event.keyCode == 39 ) {
        this.changeWorkToAnalize(1);
      } else if($event.keyCode == 37 ) {
        this.changeWorkToAnalize(-1);
      } 

    }
      

  }

  public sendingData: number = 0;
  public window = 1;
  public userSelect = 0;
  public months = [
    {value: 1, view: 'Enero'},
    {value: 2, view: 'Febrero'},
    {value: 3, view: 'Marzo'},
    {value: 4, view: 'Abril'},
    {value: 5, view: 'Mayo'},
    {value: 6, view: 'Junio'},
    {value: 7, view: 'Julio'},
    {value: 8, view: 'Agosto'},
    {value: 9, view: 'Septiembre'},
    {value: 10, view: 'Octubre'},
    {value: 11, view: 'Noviembre'},
    {value: 12, view: 'Diciembre'},
  ];

  public analizedArray: Array<any> = [];
  public daysAnalized: Array<DayAnalized> = [];

  public periodOptions = [
    {from: null, to: null, value: 0},
    {from: null, to: null, value: 1},
  ];

  public records: Array<Record> = [];
  public users: Array<User> = [];
  public period = {
    month: null,
    option: 0,
    from: null,
    to: null,
  };

  public state = {
    background: 'initial',
    card: 'initial',
  }

  constructor(private _http: WorkPaymentService, private router: Router) { }

  ngOnInit() {    
        
    let d = new Date();    
    this.period.month = d.getMonth() + 1;
    this.setPeriodsOption();

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 10);

  }

  closePop() {

    setTimeout(() => {
      this.router.navigate(['/pago-trabajadores']);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  setPeriodsOption() {
    let d = new Date();
    this.periodOptions[0].from = d.getFullYear() + '-' + this.period.month + '-01';
    this.periodOptions[0].to = d.getFullYear() + '-' + this.period.month + '-15';

    let next = new Date(d.getFullYear(), this.period.month, 0);
    this.periodOptions[1].from = d.getFullYear() + '-' + this.period.month + '-16';
    this.periodOptions[1].to = d.getFullYear() + '-' + this.period.month + '-' + next.getDate();
    
  }

  setDataToProcess() {
    
    if(this.sendingData > 0) return;
    this.period.from = this.periodOptions[this.period.option].from;
    this.period.to = this.periodOptions[this.period.option].to;

    this.sendingData++;

    this._http.getDataToProcess(this.period).then(
      data => {
        this.window = 2;
        this.users = [];
        this.records = [];
        for(let record of data.records) {
          let object = new Record();
          object.setValues(record);
          this.records.push(object);
        }

        for(let user of data.users) {
          let object = new User();
          object.setValues(user);
          this.users.push(object);
        }

        this.userSelect = 0;

        for(let user of this.users){
          
          this.analiceRecords();
          this.userSelect++;

        }

        this.userSelect = 0;
        

      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData--
    );


  }

  changeWorkToAnalize(i) {

    if(this.users[this.userSelect + i] != undefined) {
      this.userSelect += i;      
    }
  }

  analiceRecords() {
    
    let d = new Date();
    let from = new Date();
    let to = new Date();
    if(this.period.option == 0) {
      from = new Date( d.getFullYear(), this.period.month - 1, 1);
      to = new Date( d.getFullYear(), this.period.month - 1, 15);
    } else {
      from = new Date( d.getFullYear(), this.period.month - 1, 16);
      to = new Date( d.getFullYear(), this.period.month, 0);
    }
        
    this.daysAnalized = [];

    for(let i = 0; i < to.getDate(); i++) {

        let dateCheck = new Date(from.getFullYear(), this.period.month - 1, (from.getDate() + i));
        // console.log(dateCheck);

        let dayAnalized = new DayAnalized();
        dayAnalized.day = dateCheck;        

        // RECOLECTAR HORARIOS DEL DIA
          let scheduleCollectionDay = [];
          for(let schedule of this.users[this.userSelect].schedules) {
            if(schedule.active != true) continue;
           if(schedule.day_id == dateCheck.getDay()) {
 
             scheduleCollectionDay.push(schedule);
 
           }
 
         }

        if(scheduleCollectionDay.length == 0) continue;

        //RECOLECTAR ASISTENCIA DE ESE DIA
        let recordCollectionDay = [];
        for(let record of this.records) {

          if(record.user_id == this.users[this.userSelect].id) {

            let dateRecord = new Date(record.date.toString() + ' 00:00:00');
            

            if(dateRecord.getTime() == dateCheck.getTime()) {
                     
              recordCollectionDay.push(record);

            }
            

          }

        }

        dayAnalized.records = recordCollectionDay;
        dayAnalized.schedules = scheduleCollectionDay;

        //Analisis de horas trabajadas y por trabajar
        dayAnalized.getAnalisis();
        dayAnalized.setTimeWorked();        
        this.daysAnalized.push(dayAnalized);

    }//FOR DATES PERIOD    

    this.analizedArray.push({
      daysAnalized: this.daysAnalized,
      payment: new Payment(),
      user: this.users[this.userSelect],      
      daysLate: this.getDaysLate(),
      daysAbsent: this.getDaysAbsent(),
      paymentSugest: 0,
      paymentReal: 0,
    });

    this.setPaymentSugest();

  }

  getHourPayment(analized) {
    let salary = 0;    
    let hours = 0;      
    if(analized.daysLate == 0 && analized.daysAbsent == 0) {
      salary = analized.user.salary.amount + analized.user.salary.bonus;
    } else {
      salary = analized.user.salary.amount;
    }

    for(let day of analized.daysAnalized) {

      hours += day.timeWorked.hours;

      if(day.status == 2 && day.timeNotWorked.minutes <= 15) {

        hours++;

      }

    }
    
    return salary * hours;

  }

  setPaymentSugest() {

    if(this.users[this.userSelect].salary == undefined) return;

    //PAGO TIPO QUINCENAL
    if(this.users[this.userSelect].salary.salary_type_id == 2) {

      if(this.analizedArray[this.userSelect].daysLate == 0 && this.analizedArray[this.userSelect].daysAbsent == 0) {

        this.analizedArray[this.userSelect].paymentSugest = 
                this.users[this.userSelect].salary.amount + 
                this.users[this.userSelect].salary.bonus;

      } else {

        this.analizedArray[this.userSelect].paymentSugest = this.users[this.userSelect].salary.amount;

      }

    } else if(this.users[this.userSelect].salary.salary_type_id == 1) { 

      this.analizedArray[this.userSelect].paymentSugest = this.getHourPayment(this.analizedArray[this.userSelect]);

    }

    this.analizedArray[this.userSelect].paymentReal = this.analizedArray[this.userSelect].paymentSugest;
    
  }

  getDaysLate() {
    
    let i = 0;
    for(let x of this.daysAnalized){
      if(x.status == 2)
        i++;
    }

    return i;

  }

  getDaysAbsent() {

    let i = 0;
    for(let x of this.daysAnalized){
      if(x.status == 0)
        i++;
    }

    return i;

  }

  generateReceipt() {
    if(this.sendingData > 0) return;

    let payment: Payment = new Payment();
    payment.date_from = this.period.from;
    payment.date_to = this.period.to;
    payment.amount = this.analizedArray[this.userSelect].paymentReal;
    payment.user_id = this.users[this.userSelect].id;

    this.sendingData++;
    this._http.storePayment(payment).then(
      data => {
        payment.setValues(data);
        this.analizedArray[this.userSelect].payment = payment;
        this._http.sendData({
          data: payment,
          action: 'new'
        });
      },
      error => localStorage.setItem('request', JSON.stringify(error))
      ).then(
        () => this.sendingData--
      );

  }

}
