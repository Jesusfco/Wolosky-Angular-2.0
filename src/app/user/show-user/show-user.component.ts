import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../user';
import { UserService } from '../user.service';
import { Schedule } from '../schedule';
import { Reference } from '../reference';
import { Salary } from '../salary';
import { MonthlyPayment } from '../../monthly-payment';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
  animations: [ FadeAnimation, SlideAnimation ]
})
export class ShowUserComponent implements OnInit {

  public user: User = new User();
  public references: Array<Reference> = [];
  public schedules: Array<Schedule> = [];
  public monthlyPayment: MonthlyPayment = new MonthlyPayment();
  public salary: Salary =  new Salary();

  cardState: String = 'initial';
  backgroundState: String = 'initial';

  public modify: Boolean = false;

  public observerRef: any;

  public credential = localStorage.getItem('userType');

  constructor(private _http: UserService,
    private router: Router,
    private actRou: ActivatedRoute) {

      this.observerRef = actRou.params.subscribe(params => {
        this.user.id = params['id'];
        this.getUserData();
      });
     }

  ngOnInit() {
    setTimeout(() => {
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);

  }

  getUserData(){
    this._http.getUser(this.user.id).then(
      data => {
        this.user.setValues(data);

        if(this.user.user_type_id == 1) {

          this.setMonthlyPayment();
          this.setSchedules();
          this.setReferences();

        } else if (this.user.user_type_id <= 3) {

          this.setSalary();
          this.setSchedules();
          this.setReferences();

        }

      },
      error => localStorage.setItem('request', JSON.stringify(error))
    );
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 450);
    this.cardState = 'initial';
    this.backgroundState = 'initial';
    
  }


  setSchedules() {
    this._http.getSchedules(this.user.id).then(

      data => {
        
        // this.schedules = data;
        for(let i = 0; i < data.length; i++) {

          let schel: Schedule = new Schedule();

          schel.setValues(data[i]);
          schel.setDayView();

          this.schedules.push(schel);

        }

      },

      error => localStorage.setItem('request', JSON.stringify(error))
      
    );
  }

  setMonthlyPayment() {
    this._http.getMonthlyPayment(this.user.monthly_payment_id).then(
      data => this.monthlyPayment = data,
      error => localStorage.setItem('request', JSON.stringify(error))
    );
  }

  setSalary() {
    this._http.getSalary(this.user.salary_id).then(
      data => this.salary = data,
      error => localStorage.setItem('request', JSON.stringify(error))
    );
  }

  setReferences() {
    this._http.getReferences(this.user.id).then(
      data => {

        for(let i = 0; i < data.length; i++) {

          let reference: Reference = new Reference();
          reference.setValuesFromData(data[i]);
          this.references.push(reference);

        }
      },

      error => localStorage.setItem('request', JSON.stringify(error))

    );
  }

  modifyUser() {
    this.modify = !this.modify;
  }

}
