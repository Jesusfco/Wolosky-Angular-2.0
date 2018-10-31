import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cardPop, backgroundOpacity} from '../../animations';
import { WorkPaymentService } from '../work-payment.service';
import { Record } from '../../classes/record';
import { User } from '../../classes/user';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css'],
  animations: [cardPop, backgroundOpacity],
})
export class PaymentCreateComponent implements OnInit {

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

  public daysAnalized: Array<any> = [];

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

  closePop(){    
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

        this.analiceRecord();

      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData--
    );


  }

  nextWorkerAnalice() {

    if(this.users[this.userSelect + 1] != undefined) {
      this.userSelect++;
      this.analiceRecord();
    }
  }

  analiceRecord() {

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

        let dayAnalized = {
          day: dateCheck,
          records: [],
          schedules: [],
          timeToWork: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          timeWorked: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          status: 0,
          message: "",
          timeNotWorked: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        };

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

        // if(recordCollectionDay.length == 0) continue;

        //Analisis de horas trabajadas y por trabajar
        for(let sche of dayAnalized.schedules) {
          
          let checkInSchedule = new Date("2017-01-01 " + sche.check_in);
          let checkOutSchedule = new Date("2017-01-01 " + sche.check_out);

          dayAnalized.timeToWork = this.calculateTimeToWork(checkInSchedule, checkOutSchedule, dayAnalized.timeToWork);          

          
          let timeNotWorked1;
          let timeNotWorked2;     

          for(let record of dayAnalized.records) {
            
            let checkInRecord = new Date("2017-01-01 " + record.checkIn);
            let checkOutRecord = new Date("2017-01-01 " + record.checkOut);

            if((checkInRecord <= checkInSchedule && checkOutRecord >= checkOutSchedule) ||
                (checkInRecord > checkInSchedule && checkInRecord < checkOutSchedule) ||
                (checkInRecord <= checkInSchedule && checkOutRecord < checkOutSchedule)
            ) {
         

              //Si llega puntual
              if(checkInRecord <= checkInSchedule && checkOutRecord >= checkOutSchedule) {              
                dayAnalized.status = 1;
              }

              //Si llega tarde
              if(checkInRecord > checkInSchedule) {
                timeNotWorked1 = this.getTimeNotWorked(checkInRecord, checkInSchedule);
                dayAnalized.status = 2;
              }

              //si se va temprano
              if(checkOutRecord < checkOutSchedule) {
                timeNotWorked2 = this.getTimeNotWorked(checkOutSchedule, checkOutRecord);
                dayAnalized.status = 2;
              }

              

              }


            
          }// FOR RECORDS IN DAY ANALIZED
          
          dayAnalized.timeNotWorked = this.calculateTotalTimeNotWorked(timeNotWorked1, timeNotWorked2, dayAnalized.timeNotWorked);

        }

        dayAnalized.timeWorked = this.calculateTimeWorked(dayAnalized);
        if(dayAnalized.records.length == 0) {          
          dayAnalized.timeNotWorked = dayAnalized.timeToWork;    
        }
        this.daysAnalized.push(dayAnalized);


    }//FOR DATES PERIOD

    console.log(this.daysAnalized);

  }

  getTimeNotWorked(x, y) {

    let timeNotWorked = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    timeNotWorked.hours = x.getHours() - y.getHours();
    timeNotWorked.minutes = x.getMinutes() - y.getMinutes();
    timeNotWorked.seconds = x.getSeconds() - y.getSeconds();

    return timeNotWorked;

  }

  calculateTotalTimeNotWorked(x, y, timeNotWorked) {       

    if(x != null) {
      timeNotWorked.hours += x.hours;
      timeNotWorked.minutes += x.minutes;
      timeNotWorked.seconds += x.seconds;  
    }

    if(y != null) {
      timeNotWorked.hours += y.hours;
      timeNotWorked.minutes += y.minutes;
      timeNotWorked.seconds += y.seconds;
    } 

    while(timeNotWorked.seconds >= 60) {
      timeNotWorked.minutes++;
      timeNotWorked.seconds -= 60;
    }

    while(timeNotWorked.minutes >= 60) {
      timeNotWorked.hours++;
      timeNotWorked.minutes -= 60;
    }

    while(timeNotWorked.minutes < 0) {
      timeNotWorked.hours--;
      timeNotWorked.minutes += 60;
    }

    while(timeNotWorked.seconds < 0) {
      timeNotWorked.minutes--;
      timeNotWorked.seconds += 60;
    }

    return timeNotWorked;

  }

  calculateTimeToWork(checkInSchedule, checkOutSchedule, timeToWork) {    

    timeToWork.hours += checkOutSchedule.getHours() - checkInSchedule.getHours();
    timeToWork.minutes += checkOutSchedule.getMinutes() - checkInSchedule.getMinutes();
    timeToWork.seconds += checkOutSchedule.getSeconds() - checkInSchedule.getSeconds();

    while(timeToWork.seconds >= 60) {
      timeToWork.minutes++;
      timeToWork.seconds -= 60;
    }

    while(timeToWork.minutes >= 60) {
      timeToWork.hours++;
      timeToWork.minutes -= 60;
    }

    while(timeToWork.minutes < 0) {
      timeToWork.hours--;
      timeToWork.minutes += 60;
    }

    while(timeToWork.seconds < 0) {
      timeToWork.minutes--;
      timeToWork.seconds += 60;
    }

    return timeToWork;

  }

  calculateTimeWorked(dayAnalized) {

    dayAnalized.timeWorked.hours = dayAnalized.timeToWork.hours - dayAnalized.timeNotWorked.hours;
    dayAnalized.timeWorked.minutes = dayAnalized.timeToWork.minutes - dayAnalized.timeNotWorked.minutes;
    dayAnalized.timeWorked.seconds = dayAnalized.timeToWork.seconds - dayAnalized.timeNotWorked.seconds;

    while(dayAnalized.timeWorked.minutes < 0) {
      dayAnalized.timeWorked.hours--;
      dayAnalized.timeWorked.minutes += 60;
    }

    while(dayAnalized.timeWorked.seconds < 0) {
      dayAnalized.timeWorked.minutes--;
      dayAnalized.timeWorked.seconds += 60;
    }

    return dayAnalized.timeWorked;

  }

}
