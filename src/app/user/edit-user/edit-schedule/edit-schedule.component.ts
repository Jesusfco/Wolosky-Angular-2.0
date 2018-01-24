import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { Schedule } from '../../schedule';
import { FadeAnimation, SlideAnimation } from '../../../animations/slide-in-out.animation';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css'],
  animations: [FadeAnimation, SlideAnimation],
  
})
export class EditScheduleComponent implements OnInit {

  cardState: string = 'initial';
  backgroundState: string = 'initial';
  validations = {
    validate: true,
    checkIn: -1,
    checkOut: -1,
    format: 0
  };

  id: number;
  observerRef: any;
  sendingData: boolean = false;
  schedules: any;
  sche: Schedule = new Schedule();

  constructor(private _http: UserService,
    private router: Router,
    private location: Location,
    private actRou: ActivatedRoute) {

      this.observerRef = actRou.params.subscribe(params => {
        this.id = params['id'];
        this.getSchedulesData();
      });
  }

  ngOnInit() {
  }

  getSchedulesData(){
    this._http.getSchedules(this.id).then(
      data => {
        this.schedules = data;
        this.setDayView();
      },
      error => console.log(error)
    );
  }

  close(){
    this.cardState = 'initial';
    this.backgroundState = 'initial';
    // this.createView = false;

    setTimeout(() => {
      this.location.back();
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
    // this.sendingData = true;
    // if(this.validateSchedules()){

      this._http.updateSchedule(this.id, {schedules: this.schedules}).then(
        data => {
          console.log(data);
          this.sendingData = false;
        }, error => {
          console.log(error);
          this.sendingData = false;
        }
      );

    // } else {
    //   this.sendingData = false;
    // }
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
