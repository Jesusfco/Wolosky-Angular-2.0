import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../user';
import { UserService } from '../user.service';
import { Schedule } from '../schedule';
import { Reference } from '../reference';
import { Salary } from '../salary';
import { MonthlyPayment } from '../../monthly-payment';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';

// @HostBinding('@principal') principal  = true;
// @HostBinding('@background') background  = true;
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  animations: [FadeAnimation, SlideAnimation],
  // host: {'[@SlideAnimation]': ''}

    
})
export class CreateUserComponent implements OnInit {

  cardState: string = 'initial';
  backgroundState: string = 'initial';
  sendingData:boolean = false;
  
  

  user: User = new User();
  schedules = [];
  sche: Schedule =  new Schedule();
  references: Array<Reference> = [];
  salary: Salary =  new Salary();
  monthlyPayment : MonthlyPayment =  new MonthlyPayment();

  scheduleView: boolean = false;
  referenceView: boolean = false;

  constructor(private _http: UserService, private router: Router) { }

  ngOnInit() {
    this.schedules = this.sche.setArray();
  }

  ngOnDestroy(){
    if(localStorage.getItem('userCreationStatus') == '1')
      +localStorage.setItem('userCreationStatus', '0');
  }

  createUser(){
    this.sendingData = true;
    this.logicValidations();

    setTimeout(() => {
      this.sendNewUser();
    }, 750);

  }

  closeWindow(){
      this.router.navigate(['/users']);    
  }

  sendNewUser(){
    if(this.user.validations.validate == false){
      this.sendingData = false;
      return;
    }
    this._http.create({
                      user: this.user, 
                      references: this.references, 
                      schedules: this.schedules,
                      salary: this.salary,
                      monthlyPayment: this.monthlyPayment})
                .then(
                data => {
                  localStorage.removeItem('userCreationStatus');
                  this.sendingData = false;
                  this.closeWindow();
                },
                error => {
                  console.log(error);
                  this.sendingData = false;
                }
                );
  }

  assignSchedules(data){
    this.schedules = data;
    this.scheduleView = false;
  }

  closeReferenceView(){
    this.referenceView = false;
  }
  //Validaciones
  logicValidations(){

    this.restoreValidations();

    if(this.emailValidation())
      this.uniqueEmail();    

    if(this.user.user_type_id == 1){
      this.monthlyPaymentAmountValidation();
    }

    else if(this.user.user_type_id == 2){
      this.salaryAmountValidation();
    }

    else if( this.user.user_type_id == 3){
      this.salaryAmountValidation();
      this.passwordValidation();
    }
    else {
      this.passwordValidation();
    }

    if(this.nameValidation())
      this.uniqueName();

  }

  nameValidation(){

    if(this.user.name == null || this.user.name == ''){
      this.user.validations.validate = false;
      this.user.validations.name = 1;
      return false;
    }
    else {
      return true;
    }

  }

  emailValidation(){
    if(this.user.email == null || this.user.email == ''){
      if(this.user.user_type_id > 2){
        this.user.validations.validate = false;
        this.user.validations.email = 1;
      }
      return false;
    } else {
      return true;
    }
  }

  uniqueEmailWriting(){
    this.user.timer.email++;

    setTimeout(() => {
      this.user.timer.email--;
    }, 900);

    setTimeout(() => {
      if(this.user.timer.email == 0){
        if(this.user.email.length > 7) this.uniqueEmail();
      }
    }, 950);

  }

  uniqueNameWriting(){
    this.user.timer.name++;

        setTimeout(() => {
          this.user.timer.name--;

        }, 900);

        setTimeout(() => {
          if(this.user.timer.name == 0){
            if(this.user.name.length > 5) {
              this.uniqueName();
            }
          } 
        }, 950);

  }

  uniqueEmail(){
    this._http.checkUniqueEmail(this.user.email).then(
      data => {
        if(data == false){
          this.user.validations.email = 2;
          this.user.validations.validate = false;
        }  
        else { this.user.validations.email = -1; }
      },
      error => console.log(error)
    )
  }

  uniqueName(){
    this._http.checkUniqueName(this.user.name).then(
      data => {
        if(data == false){
          this.user.validations.name = 2;
          this.user.validations.validate = false;
        } 
        else {this.user.validations.name = -1;}
        if(this.sendingData == true)
        this.sendNewUser();
      },
      error => {
        console.log(error);
        if(this.sendingData == true)
        this.sendNewUser();
      }
    );
  }

  passwordValidation(){
    if(this.user.password == null || this.user.password == ''){
      this.user.validations.validate = false;
      this.user.validations.password = 1;
    }
  }

  restoreValidations(){
    this.user.validations = {
      validate: true,
      name: 0,
      email: 0,
      password: 0,
      monthlyPaymentAmount: 0,
      salaryAmount: 0
    };
  }

  monthlyPaymentAmountValidation(){
    if(this.monthlyPayment.amount == null || this.monthlyPayment.amount == 0) {
      this.user.validations.validate = false;
      this.user.validations.monthlyPaymentAmount = 1; 
    }    
  }

  salaryAmountValidation(){
    if (this.salary.amount == null || this.salary.amount == 0){
      this.user.validations.validate = false;
      this.user.validations.salaryAmount = 1;
    }
  }

  mailWriting(){
    this.user.mailUpper();
    this.uniqueEmailWriting();
  }

}
