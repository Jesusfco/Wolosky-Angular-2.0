import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../../../animations/slide-in-out.animation';
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

  @Input() schedules;
  @Output() closeEventCreateSchedule = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
    
    setTimeout(() => {      
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);

    if(Object.keys(this.schedules).length == 0) this.assignSchedulesNames();
    
  }

  close(x){
    if(x == false) return;

    this.cardState = 'initial';
    this.backgroundState = 'initial';
    // this.createView = false;

    setTimeout(() => {
      this.closeEventCreateSchedule.emit(this.schedules);      
    }, 400);
    
  }

  assignSchedulesNames(){
    this.schedules = [
      {day_id: 1, check_in: null, check_out: null, dayView: 'Lunes', active: false, error: 0},
      {day_id: 2, check_in: null, check_out: null, dayView: 'Martes', active: false, error: 0},
      {day_id: 3, check_in: null, check_out: null, dayView: 'Miercoles', active: false, error: 0},
      {day_id: 4, check_in: null, check_out: null, dayView: 'Jueves', active: false, error: 0},
      {day_id: 5, check_in: null, check_out: null, dayView: 'Viernes', active: false, error: 0},
      {day_id: 6, check_in: null, check_out: null, dayView: 'Sabado', active: false, error: 0},
    ];
  }

  selectLV(){
    for(let x = 0; x < 5;x++){
      this.schedules[x].active = true;
    }
  }

  form(){    
    this.close(this.validateSchedules());    
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

    if(this.validations.checkOut == 1 || this.validations.checkOut == 1 || this.validations.format == 1) this.validations.validate = false;

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

  
}
