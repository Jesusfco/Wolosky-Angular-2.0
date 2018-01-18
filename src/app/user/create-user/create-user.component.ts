import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  
  

  user: User = new User();
  schedules = [];
  sche: Schedule =  new Schedule();
  references: Array<Reference> = [];
  salary: Salary =  new Salary();
  monthlyPayment : MonthlyPayment =  new MonthlyPayment();

  scheduleView: boolean = false;
  referenceView: boolean = false;

  validations = {
    validate: true,
    name: 0,
    email: 0,
    password: 0,
    monthlyPaymentAmount: 0,
    salaryAmount: 0

  }

  timer = {
    name: 0,
    email: 0
  }

  

  constructor(private _http: UserService) { }

  ngOnInit() {

    // setTimeout(() => {
      
    //   this.cardState = 'final';
    //   this.backgroundState = 'final';

    // }, 100);

    this.schedules = this.sche.setArray();
  }

  close(){
    this.cardState = 'initial';
    this.backgroundState = 'initial';
    // this.createView = false;

    setTimeout(() => {
      
    }, 400);
    
  }

  createUser(){
    this.logicValidations();

    setTimeout(() => {

      if(this.validations.validate == false) return;
      this.sendNewUser();

    }, 750);   
    
  }

  sendNewUser(){
          this._http.create({
                            user: this.user, 
                            references: this.references, 
                            schedules: this.schedules,
                            salary: this.salary,
                            monthlyPayment: this.monthlyPayment})
                      .then(
                      data => {
                        console.log(data);

                      },
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
  //Validaciones
  logicValidations(){

    this.restoreValidations();
    this.nameValidation();       

    if(this.user.user_type_id == 1){
      
      if(this.user.email != null || this.user.email != '')
        this.uniqueEmail();

      this.monthlyPaymentAmountValidation();

    }
    else if(this.user.user_type_id == 2){
      if(this.user.email != null || this.user.email != '')
        this.uniqueEmail();
      this.salaryAmountValidation();
    }

    else if( this.user.user_type_id == 3){
      this.emailValidation();
      this.salaryAmountValidation();
      this.passwordValidation();
    }
    else {
      this.emailValidation();
      this.passwordValidation();
    }

  }

  nameValidation(){

    if(this.user.name == null || this.user.name == ''){
      this.validations.validate = false;
      this.validations.name = 1;
    }
    else {
      this.uniqueName();
    }

  }

  emailValidation(){
    if(this.user.email == null || this.user.email == ''){
      this.validations.validate = false;
      this.validations.email = 1;
    }
    else {
      this.uniqueEmail();
    }
  }

  uniqueEmailWriting(){
    this.timer.email++;

    setTimeout(() => {      
      this.timer.email--;
    }, 1500);

    setTimeout(() => {
      if(this.timer.email == 0){
        if(this.user.email != null || this.user.email != '') this.uniqueEmail();
      } 
    }, 1550);

  }

  uniqueNameWriting(){
    this.timer.name++;
    
        setTimeout(() => {      
          this.timer.name--;
          
        }, 1500);
    
        setTimeout(() => {
          if(this.timer.name == 0){
            if(this.user.name != null || this.user.name != '') this.uniqueName();
          } 
        }, 1550);

  }
  uniqueEmail(){
    this._http.checkUniqueEmail(this.user.email).then(
      data => {
        if(data == false){
          this.validations.email = 2;
          this.validations.validate = false;
        }  
        else { this.validations.email = -1; }
      },
      error => console.log(error)
    )
  }

  uniqueName(){
    this._http.checkUniqueName(this.user.name).then(
      data => {
        if(data == false){
          this.validations.name = 2;
          this.validations.validate = false;this.validations.name = 2
        } 
        else {this.validations.name = -1;}
      },
      error => console.log(error)
    )
  }

  passwordValidation(){
    if(this.user.password == null || this.user.password == ''){
      this.validations.validate = false;
      this.validations.password = 1;
    }
  }

  restoreValidations(){
    this.validations = {
      validate: true,
      name: 0,
      email: 0,
      password: 0,
      monthlyPaymentAmount: 0,
      salaryAmount: 0
    }
  }

  monthlyPaymentAmountValidation(){
    if(this.monthlyPayment.amount == null || this.monthlyPayment.amount == 0) {
      this.validations.validate = false;
      this.validations.monthlyPaymentAmount = 1; 
    }    
  }

  salaryAmountValidation(){
    if (this.salary.amount == null || this.salary.amount == 0){
      this.validations.validate = false;
      this.validations.salaryAmount = 1;
    }
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
