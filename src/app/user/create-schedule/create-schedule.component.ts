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

  @Input() schedules;
  @Output() closeEventCreateSchedule = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.schedules);
    
    setTimeout(() => {      
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);

    if(Object.keys(this.schedules).length == 0) this.assignSchedulesNames();
    console.log(this.schedules);
  }

  close(){
    this.cardState = 'initial';
    this.backgroundState = 'initial';
    // this.createView = false;

    setTimeout(() => {
      this.closeEventCreateSchedule.emit();      
    }, 400);
    
  }

  assignSchedulesNames(){
    this.schedules = [
      {day: 1, checkIn: null, checkOut: null, dayView: 'Lunes'},
      {day: 2, checkIn: null, checkOut: null, dayView: 'Martes'},
      {day: 3, checkIn: null, checkOut: null, dayView: 'Miercoles'},
      {day: 4, checkIn: null, checkOut: null, dayView: 'Jueves'},
      {day: 5, checkIn: null, checkOut: null, dayView: 'Viernes'},
      {day: 6, checkIn: null, checkOut: null, dayView: 'Sabado'},
    ]
  }
}
