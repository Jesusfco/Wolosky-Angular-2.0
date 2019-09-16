import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../../classes/user';
import { Schedule } from '../../../classes/schedule';
import { FadeAnimation, SlideAnimation } from '../../../animations/slide-in-out.animation';

import { Url } from '../../../classes/url';
import { Storage } from '../../../classes/storage';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css'],
  animations: [FadeAnimation, SlideAnimation],
  
})
export class EditScheduleComponent implements OnInit {

  cardState: String = 'initial';
  backgroundState: String = 'initial';
  validations = {
    validate: true,
    checkIn: -1,
    checkOut: -1,
    format: 0
  };

  id: number;
  
  sendingData: Boolean = false;
  schedules: Array<Schedule> = [];
  sche: Schedule = new Schedule();
  public user: User = new User();

  public credential = User.authUser().user_type_id;
  public days = [];

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
    private location: Location,
    private actRou: ActivatedRoute) {
      
      this.setDays();

      this.outletOutput = this._http.getData().subscribe(x => {
      
        if (x.action == 'user') 
          this.user.setValues(x.data)
        
        
      });

  }

  ngOnInit() {

  }

  setDays() {
    let sche = new Schedule();
    this.days = [];
    this.days = sche.getWeekDays();
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
    // if(this.validateSchedules()){

      this._http.updateSchedule(this.id, {schedules: this.schedules, amount: this.result.amountForce, user: this.user}).then(

        data => {
          
          if(this.user.user_type_id == 1) {
            this.result.amountActual = this.result.amountForce;

            this._http.sendData('MONTHLY', this.result.amountForce)            

          }
          

          let not = {
            status: 200,
            title: 'Horario Actualizado',
            description: 'Datos cargados en el servidor'
          };
  
          localStorage.setItem('request', JSON.stringify(not));

          this.schedules = [];
          
          for(let d of data) {

            let sh = new Schedule();
            sh.setValues(d);
            sh.setDayView(); 
            this.schedules.push(sh);

          }

          this.sortSchedulesByDay();

          this._http.sendData('SCHEDULES', this.schedules)          

        }, error => {

          localStorage.setItem('request', JSON.stringify(error));
          
        }

      ).then(

        () => this.sendingData = false

      );

    
  }

  setResult() {

    if(this.validateSchedules()) {
      
      if(this.user.user_type_id == 1) {

        const re = this.sche.countHours(this.schedules);

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

    for(let x of this.schedules){

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

          schedule.active = !schedule.active;
          validate = schedule.active;

        } else {

          schedule.active = validate;

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

  chronomize() {

    let che = JSON.parse(JSON.stringify(this.schedules));

    for(let i = 0; i < this.schedules.length; i++) {

        this.schedules[i].check_in = null;
        this.schedules[i].check_out = null;

      setTimeout(() => {

        this.schedules[i].check_in = che[i].check_in;
        this.schedules[i].check_out = che[i].check_out;


      }, 10);
      

    }

  } 

  startEditSche(x){

    x.edit = true;    

    setTimeout(() => {
      document.getElementById('editCheckIn').focus();
    }, 100);

    for(let i of this.schedules){

      if(i.id != x.id){
        i.edit = false;
      }

    }
    
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

  createNewSchedule(sche) {

    let count = 0;

    for(let s of this.schedules) {

      if(s.day_id == sche.day_id) {

        if(s.check_in == null || s.check_out == null) {

          count++;

        }

      }

    }

    if(count > 0) return;

    let schedule: Schedule = new Schedule();
    schedule.user_id = sche.user_id;
    schedule.day_id = sche.day_id;
    schedule.dayView = sche.dayView;
    schedule.active = true;

    this.schedules.push(schedule);

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
