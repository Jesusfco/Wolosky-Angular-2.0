import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../../classes/user';

import { Schedule } from '../../classes/schedule';
import { Reference } from '../../classes/reference';
import { Salary } from '../../classes/salary';
import { MonthlyPayment } from '../../classes/monthly-payment';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { MonthlyPrice } from '../../classes/monthly-price';
import { NotificationService } from '../../notification/notification.service';
import { UserService } from '../../services/user.service';

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
  sendingData: boolean = false;
  
  credential = parseInt(localStorage.getItem('userType'));

  user: User = new User();
  monthlyPrices: Array<MonthlyPrice> = [];
  
  referenceView: boolean = false;
  outletOutput
  
  constructor(
          private _http: UserService, 
          private router: Router,
          private notification: NotificationService
  ) {

    this.outletOutput = this._http.getData().subscribe(x => {      
        if (x.action == 'SCHEDULES')    
          this.user.schedules = Schedule.convertToArray(x.data)
        else if(x.action == 'REFERENCES') 
        this.user.references = Reference.convertToArray(x.data)
        else if (x.action == 'MONTHLY_AMOUNT' && this.user.user_type_id == 1)           
          this.user.monthly_payment.amount = x.data
    })  
}
  
  ngOnInit() {    
    this._http.getAllMonthlyPrices().then(
      data => {

        this.monthlyPrices = []
        for(let i of data) {
          let m  = new MonthlyPrice();
          m.setData(i);
          this.monthlyPrices.push(m);          
        }
        
        localStorage.setItem('monthlyPrices', JSON.stringify(this.monthlyPrices));
        
      },
      error => this.notification.sendError(error)
    );
  }

  ngOnDestroy(){
    this.outletOutput.unsubscribe()    
  }

  createUser(){
    
    this.logicValidations();

    setTimeout(() => {
      this.sendNewUser();
    }, 750);

  }

  closeWindow(){
      this.router.navigate(['/users']);    
  }

  sendNewUser(){
    this.user.setUpperCaseProperties()

    this.sendingData = true;
    if(this.user.validations.validate == false){
      this.sendingData = false;
      return;
    }
    this._http.create({
                      user: this.user, 
                      references: this.user.references, 
                      schedules: this.user.schedules,
                      salary: this.user.salary,
                      monthlyPayment: this.user.monthly_payment
            }).then(
                data => {                  

                  this.notification.sendNotification(
                    this.user.getUserTypeView() + " "+ this.user.name + " ha sido dado de alta",
                    'Datos cargados a la base de datos correctamente',
                    5000
                  )                                      

                  this.closeWindow();
                },
                error => this.notification.sendError(error)
                ).then(
                  () => this.sendingData = false
                );
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

    else if( this.user.user_type_id == 3 || this.user.user_type_id == 4){
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
        
      },
      error => {
        console.log(error);
        
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
    if(this.user.monthly_payment.amount == null || this.user.monthly_payment.amount < 0) {
      this.user.validations.validate = false;
      this.user.validations.monthlyPaymentAmount = 1; 
    }    
  }

  salaryAmountValidation(){
    if (this.user.salary.amount == null || this.user.salary.amount == 0){
      this.user.validations.validate = false;
      this.user.validations.salaryAmount = 1;
    }
  }      

  sendUser() {
    this._http.sendData('user', this.user)
    this._http.sendData('MONTHLY_PRICES', this.monthlyPrices)
  }    

  receiveReferences(references) {
    this.user.schedules = references
  }

}
