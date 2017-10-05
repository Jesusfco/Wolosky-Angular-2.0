import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '../../schedule';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class NewScheduleComponent implements OnInit {
  
  @Input() scheduleView;
  @Input() schedules;
  @Input() validar;





  constructor() { }

  ngOnInit() {
  }

  activeLV(){
    for(let x = 0; x < 5; x++) {
      this.schedules[x].active = true;
    }
  }

  finish() {

    this.validar = 0;

    for(let x = 0; x < 5; x++) {
      
      if(this.schedules[x].active == true) {

        if(this.schedules[x].checkIn > this.schedules[x].checkOut || this.schedules[x].checkIn == null || this.schedules[x].checkOut == null){
          this.validar++;
        }
      }
    }

    if(this.validar == 0) {

      this.scheduleView = false;

    }

    console.log(this.schedules);
  }

}
