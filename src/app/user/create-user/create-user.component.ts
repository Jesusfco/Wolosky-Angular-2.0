import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../user';
import { Schedule } from '../schedule';
import { Reference } from '../reference';
import { Salary } from '../salary';
import { MonthlyPayment } from '../../monthly-payment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
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
export class CreateUserComponent implements OnInit {

  cardState: string = 'initial';
  backgroundState: string = 'initial';

  @Input() createView;
  @Output() closeEventCreateComponent =  new EventEmitter();

  user: User = new User();
  schedules: Array<Schedule> = [];
  references: Array<Reference> = [];
  salary: Salary =  new Salary();
  monthlyPayment : MonthlyPayment =  new MonthlyPayment();

  scheduleView: boolean = false;
  referenceView: boolean = false;

  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);
  }

  close(){
    this.cardState = 'initial';
    this.backgroundState = 'initial';
    // this.createView = false;

    setTimeout(() => {
      this.closeEventCreateComponent.emit();      
    }, 400);
    
  }

  createUser(){
    console.log(this.user);
  }

  assignSchedules(data){
    this.schedules = data;
    this.scheduleView = false;
  }

}
