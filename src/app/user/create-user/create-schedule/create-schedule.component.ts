import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../../../animations/slide-in-out.animation';
import { MonthlyPrice } from '../../../classes/monthly-price';
import { Schedule } from '../../../classes/schedule';
import { User } from '../../../classes/user';
import { UserService } from '../../../services/user.service';
import { Location } from '@angular/common';
import { Focus } from '../../../utils/classes/focus';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class CreateScheduleComponent implements OnInit {

  cardState: string = 'initial';
  backgroundState: string = 'initial';
  validations = {
    validate: true,
    checkIn: -1,
    checkOut: -1,
    format: 0
  };

  user: User = new User();
  scheduleCopied: Schedule;
  monthlyPrices: Array<MonthlyPrice> = [];
  days = Schedule.getWeekDays()
  outletOutput

  @HostListener('document:keyup', ['$event']) sss($event) {    
    if($event.keyCode == 27) 
        this.close();    
  }
  constructor(
    private _http: UserService,
    private location: Location,
    private router: Router
    ) {

    this.outletOutput = this._http.getData().subscribe(x => {      
      if (x.action == 'user')   
        this.user.setValues(x.data) 
      if (x.action == 'MONTHLY_PRICES')   
        this.monthlyPrices = x.data
          
      
    })
   }

  ngOnInit() {    
    
    setTimeout(() => {      
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);    
    
  }

  ngOnDestroy(){
    this.outletOutput.unsubscribe()
  }

  close(){
  
    this.user.name = 'hasd'
    this.cardState = 'initial';
    this.backgroundState = 'initial';    

    setTimeout(() => {
      this.router.navigate(['/users/create'])
    }, 800);

  }

  selectLV(){
    // for(let x = 0; x < 5;x++){
    //   this.schedules[x].active = true;
    // }
  }

  form(){    
    // this.countHours();
    if(this.validateSchedules()) {
      this._http.sendData('SCHEDULES', this.user.schedules)
      this.close();    
    }
      
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
    schedule.day_id = day_id;    
    schedule.active = true;

    this.user.schedules.push(schedule);
    this.quitEdit()
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
  

  countHours(){

    let count = 0;

    for(let x of this.user.schedules) {
      
      if(x.active == true) {
        
        let checkIn = new Date("2017-01-01 " + x.check_in);
        let checkOut = new Date("2017-01-01 " + x.check_out);
        count += checkOut.getHours() - checkIn.getHours();
      }
    }

    console.log(count);

  }

  validateSchedules(){    

    this.defaultValidationValue();

    for(let x of this.user.schedules){

      if(x.active == true){

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

    if(this.validations.checkOut == 1 || this.validations.checkOut == 1 || this.validations.format == 1) this.validations.validate = false;


    return this.validations.validate;
  }

  defaultValidationValue(){
    this.validations.validate = true;
    this.validations.checkIn = 0;
    this.validations.checkOut = 0;
    this.validations.format = 0;
    for(let x of this.user.schedules){
      x.error = 0;
    }
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
  }

  editSchedule(schedule){
    this.quitEdit()        
    schedule.edit = true;
    Focus.elementById('editCheckIn')

  }

  deleteSchedule(schedule){
    let i = this.user.schedules.indexOf(schedule);
    this.user.schedules.splice(i, 1);
  }

  quitEdit(){
    for(let i of this.user.schedules)     
      i.edit = false;
  }
}
