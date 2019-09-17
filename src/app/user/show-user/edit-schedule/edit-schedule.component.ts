import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../classes/user';
import { Schedule } from '../../../classes/schedule';
import { FadeAnimation, SlideAnimation } from '../../../animations/slide-in-out.animation';

import { Url } from '../../../classes/url';
import { Storage } from '../../../classes/storage';
import { MonthlyPrice } from '../../../classes/monthly-price';
import { NotificationService } from '../../../notification/notification.service';
import { Focus } from '../../../utils/classes/focus';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css'],
  animations: [FadeAnimation, SlideAnimation],
  
})
export class EditScheduleComponent implements OnInit {

  cardState: String = 'initial'
  backgroundState: String = 'initial'
  validations = {
    validate: true,
    checkIn: -1,
    checkOut: -1,
    format: 0
  };

  id: number
  
  sendingData: Boolean = false
  schedules: Array<Schedule> = []
  sche: Schedule = new Schedule()
  public user: User = new User()

  public credential = User.authUser().user_type_id
  public days = Schedule.getWeekDays()

  public result = {
    hours: 0,
    amount: 0,
    amountActual: null,
    amountForce: null
  };  

 storage: Storage = new Storage();

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.close();
    }

  }

  outletOutput

  constructor(private _http: UserService,
    private router: Router,
    private notification: NotificationService,
    private location: Location,
    private actRou: ActivatedRoute) {

      this.outletOutput = this._http.getData().subscribe(x => {      
        if (x.action == 'user') 
          this.user.setValues(x.data)                
      });

      this.getMonthlyPrices()

  }

  ngOnInit() {

  }

  getMonthlyPrices() {
    this._http.getAllMonthlyPrices().then(
      data => {
        let array = []
        for(let i of data) {
          let m  = new MonthlyPrice();
          m.setData(i);
          array.push(m);          
        }
        localStorage.setItem('monthlyPrices', JSON.stringify(array));
        this.setResult()        
      },
      error => this.notification.sendError(error)
    );
  }
  
  close(){

    this.cardState = 'initial';
    this.backgroundState = 'initial';    

    setTimeout(() => {
      this.location.back();
    }, 400);
    
  }

  
  selectLV(){
    for(let x = 0; x < 5;x++){
      this.schedules[x].active = true;
    }
  }

  form(){    
    
    if(!this.validateSchedules()) return;

    this.sendingData = true;    
    this._http.updateSchedule(this.id, {
            schedules: this.user.schedules, 
            amount: this.result.amountForce, 
            user: this.user
          }).then(

      data => {
        
        if(this.user.user_type_id == 1) {
          this.result.amountActual = this.result.amountForce;

          this._http.sendData('MONTHLY', this.result.amountForce)            

        }
        
        this.notification.sendNotification(
          'Horario Actualizado','Datos cargados en el servidor', 4500
        )                

        this.user.schedules = [];
        
        for(let d of data) {

          let sh = new Schedule();
          sh.setValues(d);
          sh.setDayView(); 
          this.user.schedules.push(sh);

        }

        this.sortSchedulesByDay();

        this._http.sendData('SCHEDULES', this.user.schedules)          

      }, error => this.notification.sendError(error)
    ).then( () => this.sendingData = false )

    
  }

  setResult() {

    if(this.validateSchedules()) {
      
      if(this.user.user_type_id == 1) {

        const re = Schedule.countHours(this.user.schedules);

        this.result.hours = re.hours;
        this.result.amount = re.amount;
        this.result.amountForce = re.amount;
        
        if(re.amount == 0) {
          this.result.amountForce = this.result.amountActual;
        }
        

      }

    }

  }

  validateSchedules(){    

    this.defaultValidationValue();

    for(let x of this.user.schedules){

      if(x.active == true){

        x.error = 0

        if(x.check_in == null || x.check_in == ''){
          x.error = 1;
          this.validations.checkIn = 1;        
        } 
        if(x.check_out == null || x.check_out == ''){
          this.validations.checkOut = 1;
          x.error = 1;
        }  
        if(x.check_in >= x.check_out){
          this.validations.format = 1;
          x.error = 1;
        } 

      }  

    }

    if(this.validations.checkOut == 1 || this.validations.checkOut == 1 || this.validations.format == 1) 
      this.validations.validate = false;

    return this.validations.validate;
  }

  defaultValidationValue() {

    this.validations.validate = true;
    this.validations.checkIn = 0;
    this.validations.checkOut = 0;
    this.validations.format = 0;

    for(let x of this.schedules){

      x.error = 0;
      
    }

  }

  changeActive(day) {

    let validate = null;
    let count = 0;

    for(let schedule of this.user.schedules) {

      if(schedule.day_id == day.day_id) {

        count++;

        if(validate == null) {


        }

      }

    }

    if(count == 0) {

      let schedule = new Schedule();

      schedule.user_id = this.user.id;
      schedule.day_id = day.day_id;
      schedule.dayView = day.day;
      schedule.active = true;

      this.user.schedules.push(schedule);

      this.sortSchedulesByDay();

    }

    setTimeout(() => {
      // this.chronomize();
    }, 10);

  }


  startEditSche(schedule){

    for(let i of this.user.schedules)      
        i.edit = false;

    schedule.edit = true;    
    Focus.elementById('editCheckIn')

  }

  deleteSchedule(sche) {

    if(sche.id != null) {

      this._http.deleteSchedule(sche).then(
        data => { 
          
          this.splitSchedule(sche);

          this._http.sendData('SCHEDULES', this.schedules)

        } ,
        error => localStorage.setItem('request', JSON.stringify(error))
      );

    } else {
      this.splitSchedule(sche);
    }

  }

  splitSchedule(schedule) {

      let i = this.user.schedules.indexOf(schedule);
      this.user.schedules.splice(i, 1);

  }

  createNewSchedule(day_id) {

    let count = 0;

    for(let s of this.user.schedules) {

      if(s.day_id == day_id) {

        if(s.check_in == null || s.check_out == null) {

          count++;

        }

      }

    }

    if(count > 0) return;

    let schedule: Schedule = new Schedule();    
    schedule.user_id = this.user.id;
    schedule.day_id = day_id;    
    schedule.active = true;

    this.user.schedules.push(schedule);

    this.sortSchedulesByDay();

  }

  sortSchedulesByDay() {


    this.user.schedules.sort((a, b) => {

      if(a.day_id < b.day_id) {
        return -1;
      } else if (a.day_id > b.day_id) {
        return 1;
      } else if (a.day_id == b.day_id) {

        if(a.check_in < b.check_in) {

          return -1;

        } else if (a.check_in > b.check_in) {

          return 1;

        } else {

          return 0;

        }
        
      } else {

        return 0;

      }
    });

  }
  

}
