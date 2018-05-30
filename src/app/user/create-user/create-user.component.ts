import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../../classes/user';
import { UserService } from '../user.service';
import { Schedule } from '../../classes/schedule';
import { Reference } from '../../classes/reference';
import { Salary } from '../../classes/salary';
import { MonthlyPayment } from '../../classes/monthly-payment';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { MonthlyPrice } from '../../classes/monthly-price';

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
  
  public credential = parseInt(localStorage.getItem('userType'));

  user: User = new User();
  schedules = [];
  sche: Schedule =  new Schedule();
  references: Array<Reference> = [];
  monthlyPrices: Array<MonthlyPrice> = [];
  salary: Salary =  new Salary();
  monthlyPayment: MonthlyPayment =  new MonthlyPayment();

  scheduleView: boolean = false;
  referenceView: boolean = false;

  scheduleObservableInterval: any;
  constructor(private _http: UserService, private router: Router) { }

  ngOnInit() {
    this.schedules = this.sche.setArray();
    this._http.getAllMonthlyPrices().then(
      data => {
        localStorage.setItem('monthlyPrices', JSON.stringify(data))
        this.monthlyPrices = data;
      },
      error => localStorage.setItem('request', JSON.parse(error))
    );
  }

  ngOnDestroy(){
    if(localStorage.getItem('userCreationStatus') == '1')
      +localStorage.setItem('userCreationStatus', '0');
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
    this.sendingData = true;
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

                  let not = {
                    status: 200,
                    title: 'Usuario Creado',
                    description: 'Datos cargados a la base de datos correctamente'
                  };

                  localStorage.setItem('request', JSON.stringify(not));

                  this.closeWindow();
                },
                error => {
                  localStorage.setItem('request', JSON.stringify(error));
                  
                }
                ).then(
                  () => this.sendingData = false
                );
  }

  assignSchedules(data){
    this.setScheduleObservableInterval();
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
    if(this.monthlyPayment.amount == null || this.monthlyPayment.amount < 0) {
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

  setScheduleObservableInterval() {
    this.scheduleObservableInterval = setInterval(() => this.intervalScheduleLogic(), 1000);
  }

  intervalScheduleLogic() {

    if(localStorage.getItem('setUserMonthlyPrice') == '1') {

      this.monthlyPayment.amount = 0;
      let count = 0;

      for(let x of this.schedules) {
        
        if(x.active == true) {
          
          let checkIn = new Date("2017-01-01 " + x.check_in);
          let checkOut = new Date("2017-01-01 " + x.check_out);
          count += checkOut.getHours() - checkIn.getHours();
        }
      }

      for(let x of this.monthlyPrices) {
        if(x.hours == count || x.hours > count) {
          this.monthlyPayment.amount = x.cost;
          break;
        }
      }

      if(this.monthlyPayment.amount == 0) {
        let i = this.monthlyPrices.length - 1;

        this.monthlyPayment.amount = this.monthlyPrices[i].cost;

      }

      localStorage.removeItem('setUserMonthlyPrice');
      clearInterval(this.scheduleObservableInterval);

    } else if(localStorage.getItem('setUserMonthlyPrice') == '0') {
      localStorage.removeItem('setUserMonthlyPrice');
      clearInterval(this.scheduleObservableInterval);
    }

  }//FINAL FUNCTION

}
