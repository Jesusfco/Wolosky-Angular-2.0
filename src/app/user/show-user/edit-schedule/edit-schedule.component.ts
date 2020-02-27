import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../classes/user';
import { Schedule } from '../../../classes/schedule';
import { FadeAnimation, SlideAnimation } from '../../../animations/slide-in-out.animation';

import { Url } from '../../../classes/url';
import { Storage } from '../../../classes/storage';
import { MonthlyPrice } from '../../../classes/monthly-price';
import { NotificationService } from '../../../notification/notification.service';
import { Focus } from '../../../utils/classes/focus';
import { ScheduleDay } from '../../../utils/classes/schedule-day';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css'],
  animations: [FadeAnimation, SlideAnimation],
  
})
export class EditScheduleComponent implements OnInit {

  principal = true
  
  validations = {
    validate: true,
    checkIn: -1,
    checkOut: -1,
    format: 0
  };  
  
  scheduleCopied: Schedule
  sendingData: Boolean = false  
  sche: Schedule = new Schedule()
  user: User = new User()

  credential = User.authUser().user_type_id
  days = Schedule.getWeekDays()

  result = {
    hours: 0,
    amount: 0,
    amountActual: null,
    amountForce: null
  };  

 storage: Storage = new Storage();

 scheduleDays: Array<ScheduleDay> = ScheduleDay.getScheduleDayArrayLD()

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
    private actRou: ActivatedRoute,
    
    ) {

      actRou.params.subscribe(params => {
        this.user.id = params['id'];                
      });

      this.outletOutput = this._http.getData().subscribe(x => {      
        if (x.action == 'user') 
          this.user.setValues(x.data)  
          this.countHours()
          this.scheduleDays = []
          this.scheduleDays = ScheduleDay.getScheduleDayArrayLD();
          setTimeout(() => {
            
            ScheduleDay.setSchedulesToArray(this.scheduleDays, this.user.schedules)          
          }, 100)
          
      });

      setTimeout(() => {
          
        router.events.filter((event: any) => event instanceof NavigationEnd)
        .subscribe(event => {    
            if(event.url == "/users/show/" + this.user.id + "/schedule" )  
              this.principal = true                                            
            else  
              this.principal = true            
        }); 

      },50)       

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
        this.countHours()        
      },
      error => this.notification.sendError(error)
    );
  }
  
  close(){
    

    setTimeout(() => {
      this.location.back();
    }, 400);
    
  }


  form(){    
    
    if(!this.validateSchedules()) return;

    this.sendingData = true;    
    this._http.updateSchedule(this.user.id, {
            schedules: this.user.schedules, 
            amount: this.result.amountForce, 
            user: this.user
          }).then(

      data => {
        
        this.user.schedules = Schedule.convertToArray(data);  
        this.scheduleDays = []
        setTimeout(() => {
          this.scheduleDays = ScheduleDay.getScheduleDayArrayLD()  
          ScheduleDay.setSchedulesToArray(this.scheduleDays, this.user.schedules) 
        },60)              
        

        this.notification.sendNotification(
          'Horario Actualizado','Datos cargados en el servidor', 4500
        )          

        this._http.sendData('SCHEDULES', data) 

        if(this.user.user_type_id == 1) {
          this.result.amountActual = this.result.amountForce;
          this.user.monthly_payment.amount = this.result.amountForce;
          this._http.sendData('MONTHLY', this.result.amountForce)            
        }                                      

      }, error => this.notification.sendError(error)

    ).then( () => this.sendingData = false )

    
  }

  con(algo){
    console.log(algo)
  }

  countHours() {

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

    for(let x of this.user.schedules)
      x.error = 0;      
          
  }

  startEditSche(schedule){
    this.quitEdit()
    schedule.edit = true;    
    Focus.elementById('editCheckIn')
  }

  deleteSchedule(sche) {

    if(sche.id != null) {

      this._http.deleteSchedule(sche).then(

        data => { 
          
          this.splitSchedule(sche);

          this._http.sendData('SCHEDULES', this.user.schedules)
          this.countHours()

          setTimeout(() => {
            this.scheduleDays = ScheduleDay.getScheduleDayArrayLD()  
            ScheduleDay.setSchedulesToArray(this.scheduleDays, this.user.schedules) 
          },60)       

        } ,
        error => this.notification.sendError(error)
      );

    } else {
      this.splitSchedule(sche);
      setTimeout(() => {
        this.scheduleDays = ScheduleDay.getScheduleDayArrayLD()  
        ScheduleDay.setSchedulesToArray(this.scheduleDays, this.user.schedules) 
      },60)       
    }

  }

  splitSchedule(schedule) {

      let i = this.user.schedules.indexOf(schedule);
      this.user.schedules.splice(i, 1);
      this.scheduleDays = ScheduleDay.getScheduleDayArrayLD()
      ScheduleDay.setSchedulesToArray(this.scheduleDays, this.user.schedules)

  }

  createNewSchedule(day_id) {

    let count = 0;

    this.quitEdit()
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

    this.scheduleDays = ScheduleDay.getScheduleDayArrayLD()
    ScheduleDay.setSchedulesToArray(this.scheduleDays, this.user.schedules)

  }  
  

  copySchedule(schedule){
    this.quitEdit()        
    this.scheduleCopied = new Schedule()
    Object.assign(this.scheduleCopied, schedule)
  }

  pasteSchedule(schedule){
    this.quitEdit()                
    schedule.check_in = this.scheduleCopied.check_in
    schedule.check_out = this.scheduleCopied.check_out
    this.countHours()
  }

  quitEdit(){
    for(let i of this.user.schedules)     
      i.edit = false;
  }
}
