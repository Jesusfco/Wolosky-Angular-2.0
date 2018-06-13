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

  public credential = parseInt(localStorage.getItem('userType'));

  public result = {
    hours: 0,
    amount: 0,
    amountActual: null,
    amountForce: null
  };

  public userDataObserver: any;
  public schedulesObserverData: any;
  public monthlyPaymentObserver: any;

  public storage: Storage = new Storage();

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    if($event.keyCode == 27) {
        this.close();
    }

  }

  constructor(private _http: UserService,
    private router: Router,
    private location: Location,
    private actRou: ActivatedRoute) {

      this.storage = new Storage();

      this.id = parseInt(localStorage.getItem('userShowId'));

      this.setUserDataObserver();
      this.setSchedulesObserverData();

  }

  ngOnInit() {

  }
  
  setMonthlyPaymentObserver() {
    this.monthlyPaymentObserver = setInterval(() => this.logicMonthlyPaymentObserver(), 1000);
  }

  logicMonthlyPaymentObserver() {

    if(sessionStorage.getItem('monthlyPayment') == undefined) return;

    let monthlyPayment = JSON.parse(sessionStorage.getItem('monthlyPayment'));
    this.result.amountActual = monthlyPayment.amount;
    this.result.amountForce = monthlyPayment.amount;
    clearInterval(this.monthlyPaymentObserver);

  }

  setSchedulesObserverData() {
    this.schedulesObserverData = setInterval(() => this.logicSchedulesObserver(), 500);
  }

  logicSchedulesObserver() {
    if(localStorage.getItem('userSchedules') == undefined) return;

    this.schedules = JSON.parse(localStorage.getItem('userSchedules'));
    this.setResult();
    clearInterval(this.schedulesObserverData);
  }

  

  close(){

    this.cardState = 'initial';
    this.backgroundState = 'initial';    

    setTimeout(() => {
      this.location.back();
    }, 400);
    
  }

  

  setDayView(){
    for(let x = 0; x < Object.keys(this.schedules).length; x++){
      if(this.schedules[x].day_id == 1 ) this.schedules[x].dayView = 'Lunes';
      else if(this.schedules[x].day_id == 2 ) this.schedules[x].dayView = 'Martes';
      else if(this.schedules[x].day_id == 3 ) this.schedules[x].dayView = 'Miercoles';
      else if(this.schedules[x].day_id == 4 ) this.schedules[x].dayView = 'Jueves';
      else if(this.schedules[x].day_id == 5 ) this.schedules[x].dayView = 'Viernes';
      else if(this.schedules[x].day_id == 6 ) this.schedules[x].dayView = 'Sabado';
    }
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
          
          this.result.amountActual = this.result.amountForce;

          let not = {
            status: 200,
            title: 'Horario Actualizado',
            description: 'Datos cargados en el servidor'
          };
  
          localStorage.setItem('request', JSON.stringify(not));

          if(this.user.user_type_id == 1){
            localStorage.setItem('userMonthly', this.result.amountForce.toString());
          }

          localStorage.setItem('userSchedules', JSON.stringify(this.schedules));
          localStorage.setItem('scheduleChange', '1');

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

  defaultValidationValue(){
    this.validations.validate = true;
    this.validations.checkIn = 0;
    this.validations.checkOut = 0;
    this.validations.format = 0;
    for(let x of this.schedules){
      x.error = 0;
    }
  }

  setUserDataObserver() {
    this.userDataObserver = setInterval(() => this.userDataObserverLogic(), 1000);
  }

  userDataObserverLogic() {
    
    if(localStorage.getItem('userData') == undefined) return;

    this.user = JSON.parse(localStorage.getItem('userData'));
    
    if(this.user.user_type_id == 1) {
      this.setMonthlyPaymentObserver();
    }

    clearInterval(this.userDataObserver);

  }

  changeActive(schedule) {

    schedule.active = !schedule.active;

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

  

}
