import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../user';
import { UserService } from '../user.service';
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

  constructor(private _http: UserService) { }

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
    this._http.create({user: this.user, references: this.references, schedules: this.schedules})
      .then(
        data => console.log(data),
        error => console.log(error)
      );
    
  }

  assignSchedules(data){
    this.schedules = data;
    this.scheduleView = false;
  }

  closeReferenceView(){
    this.referenceView = false;
  }

  // Funciones para mayusculas en los campos

  nameUppercase(){    
    if(this.user.name != null)
      this.user.name = this.user.name.toUpperCase();                  
  }

  mailUpper(){
    if(this.user.email != null)
      this.user.email =  this.user.email.toUpperCase();
  }

  curpUpper(){
    if(this.user.curp != null)
      this.user.curp = this.user.curp.toUpperCase();    
  }

  placeUpper(){
    if(this.user.placeBirth != null)
      this.user.placeBirth =  this.user.placeBirth.toUpperCase();
  }

  seguroUpper(){
    if(this.user.insurance != null)
      this.user.insurance =  this.user.insurance.toUpperCase();
  }

  streetUpper(){
    if(this.user.street != null)
      this.user.street =  this.user.street.toUpperCase();
  }

  colonyUpper(){
    if(this.user.colony != null)
      this.user.colony = this.user.colony.toUpperCase();
  }

  cityUpper(){
    if(this.user.city != null)
      this.user.city = this.user.city.toUpperCase();
  }

}
