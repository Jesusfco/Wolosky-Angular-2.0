import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
  animations: [
    trigger('principal', [
      
      state('initial', style({
        transform: 'translate3d(100%,0,0)',                
      })),

      state('final' ,style({
        transform: 'translate3d(0,0,0) scale(1)',               
      })),      

      transition('initial <=> final' , animate('350ms ease-out')),
    ]),

    trigger('background', [
      
      state('initial', style({        
        opacity: 0
      })),

      state('final' ,style({       
        opacity: .7
      })),      

      transition('initial <=> final' , animate('180ms ease-out')),
    ])

  ]
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
      {day: 1, checkIn: null, checkOut: null, dayView: 'Lunes', active: false, error: 0},
      {day: 2, checkIn: null, checkOut: null, dayView: 'Martes', active: false, error: 0},
      {day: 3, checkIn: null, checkOut: null, dayView: 'Miercoles', active: false, error: 0},
      {day: 4, checkIn: null, checkOut: null, dayView: 'Jueves', active: false, error: 0},
      {day: 5, checkIn: null, checkOut: null, dayView: 'Viernes', active: false, error: 0},
      {day: 6, checkIn: null, checkOut: null, dayView: 'Sabado', active: false, error: 0},
    ]
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

        if(x.checkIn == null || x.checkIn == ''){
          x.error = 1;
          this.validations.checkIn = 1;        
        } 
        if(x.checkOut == null || x.checkOut == ''){
          this.validations.checkOut = 1;
          x.error = 1;
        }  
        if(x.checkIn >= x.checkOut){
          this.validations.format = 1
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