import { Component, OnInit, Input, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../../classes/user';
import { UserService } from '../user.service';
import { Schedule } from '../../classes/schedule';
import { Reference } from '../../classes/reference';
import { Salary } from '../../classes/salary';
import { MonthlyPayment } from '../../classes/monthly-payment';
import { MonthlyPrice } from '../../classes/monthly-price';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { Url } from '../../classes/url';
import { Storage } from '../../classes/storage';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
  animations: [ FadeAnimation, SlideAnimation ]
})
export class ShowUserComponent implements OnInit {

  public user: User = new User();
  public showUser: User = new User();
  public references: Array<Reference> = [];
  public schedules: Array<Schedule> = [];
  public monthlyPrices: Array<MonthlyPrice> = [];
  public monthlyPayment: MonthlyPayment = new MonthlyPayment();
  
  public salary: Salary =  new Salary();

  cardState: String = 'initial';
  backgroundState: String = 'initial';

  public modify: Boolean = false;
  public sendingData: Boolean = false;

  public observerRef: any;
  public url: Url = new Url();
  public storage: Storage;

  public credential = parseInt(localStorage.getItem('userType'));

  public userMonthlyObserver: any;
  public userScheduleObserver: any;
  public userReferenceObserver: any;


  constructor(private _http: UserService,
    private router: Router,
    private actRou: ActivatedRoute) {

      this.storage = new Storage();
      
      this.observerRef = actRou.params.subscribe(params => {
        this.user.id = params['id'];
        localStorage.setItem('userShowId', this.user.id.toString());
        this.getUserData();
      });
      
     }

  ngOnInit() {
    setTimeout(() => {
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);

  }

  ngOnDestroy() {

    localStorage.removeItem('userShowId');
    localStorage.removeItem('userData');
    localStorage.removeItem('userSchedules');
    localStorage.removeItem('userReferences');
    localStorage.removeItem('monthlyPrices');

  }

  getUserData(){
    this.sendingData = true;
    this._http.getUser(this.user.id).then(
      data => {
        this.user.setValues(data);
        this.showUser.setValues(data);
        localStorage.setItem('userData', JSON.stringify(this.user));

        if(this.user.user_type_id <= 3) {

          this.setSchedules();
          this.setReferences();
          this.setMonthlyPrices();
          
          this.setScheduleObserver();
          this.setUserReferenceObserver();

        } 
        
        if (this.user.user_type_id == 1) {

          this.setMonthlyPayment();
          this.setUserMonthlyObserver();
          

        } else if(this.user.user_type_id == 2 || this.user.user_type_id == 3) {

          this.setSalary();

        }

      },
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData = false
    );
  }

  closePop(){    
    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 450);
    this.cardState = 'initial';
    this.backgroundState = 'initial';
    
  }

  updateUser() {

    if(this.user.validations.validate == false) return;

    this.sendingData = true;

    this._http.updateUser(this.user).then(

      data => {
        let not = {
          title: 'Datos de Usuario Actualizado',
          description: 'Los datos han sido cargados al servidor',
          status: 200
        };

        localStorage.setItem('request', JSON.stringify(not));

      }
    ).then(
      () => this.sendingData = false
    );
  }

  setSchedules() {
    this.sendingData = true;
    this._http.getSchedules(this.user.id).then(

      data => {
        
        // this.schedules = data;
        for(let i = 0; i < data.length; i++) {

          let schel: Schedule = new Schedule();

          schel.setValues(data[i]);
          schel.setDayView();

          this.schedules.push(schel);

        }        

        localStorage.setItem('userSchedules', JSON.stringify(this.schedules));

      },

      error => localStorage.setItem('request', JSON.stringify(error))
      
    ).then(
      () => this.sendingData = false
    );
  }

  setMonthlyPayment() {
    
    this.sendingData = true;

    this._http.getMonthlyPayment(this.user.monthly_payment_id).then(
      data => this.monthlyPayment = data,
      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData = false
    );
  }

  setSalary() {

    this.sendingData = true;

    this._http.getSalary(this.user.salary_id).then(

      data => this.salary = data,
      error => localStorage.setItem('request', JSON.stringify(error))

    ).then(

      () => this.sendingData = false

    );
  }

  setReferences() {

    this.sendingData = true;

    this._http.getReferences(this.user.id).then(

      data => {

        for(let i = 0; i < data.length; i++) {

          let reference: Reference = new Reference();
          reference.setValuesFromData(data[i]);
          this.references.push(reference);

        }

        localStorage.setItem('userReferences', JSON.stringify(this.references));

      },

      error => localStorage.setItem('request', JSON.stringify(error))

    ).then(

      () => this.sendingData = false
      
    );
  }

  setMonthlyPrices() {
    this._http.getAllMonthlyPrices().then(

      data => {

        for(let i of data) {

          let m  = new MonthlyPrice();
          m.setData(i);
          this.monthlyPrices.push(m);
          
        }

        localStorage.setItem('monthlyPrices', JSON.stringify(this.monthlyPrices));
        
      },
      error => localStorage.setItem('request', JSON.parse(error))
    );
  }

  modifyUser() {
    this.modify = !this.modify;
  }


  uniqueNameWriting(x) {

    let  l = x.keyCode;

    if (l >= 37 && l <= 40 || l == 13) { return; }

    this.user.nameUppercase();

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

  uniqueName(){

    let name = this.user.name.replace(/\s+$/, '');
    this._http.checkUniqueName(name).then(
      data => {
        if(data == false && name !== this.showUser.name){
          this.user.validations.name = 2;
          this.user.validations.validate = false;
        } 
        else {this.user.validations.name = -1;}
        
        // this.sendNewUser();
      },
      error => {
        console.log(error);
        
        // this.sendNewUser();
      }
    );
  }

  uniqueMailWriting(x) {

    let  l = x.keyCode;

    if (l >= 37 && l <= 40 || l == 13) { return; }

    this.user.mailUpper();

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

  uniqueEmail(){

    let mail = this.user.email.replace(/\s+$/, '');
    this._http.checkUniqueEmail(mail).then(
      data => {
        if(data == false && mail !== this.showUser.email){
          this.user.validations.email = 2;
          this.user.validations.validate = false;
        }  
        else { this.user.validations.email = -1; }
      },
      error => console.log(error)
    )
  }

  toModifySchedules() {

  }

  toModifyReferences() {

  }

  setUserMonthlyObserver() {
    this.userMonthlyObserver = setInterval(() => this.userMonthlyObserverLogic(), 1000);
  }

  userMonthlyObserverLogic() {
    
    if(localStorage.getItem('userMonthly') == undefined) return;

    this.monthlyPayment.amount = parseFloat(localStorage.getItem('userMonthly'));
    localStorage.removeItem('userMonthly');

  }

  setScheduleObserver() {
    this.userScheduleObserver = setInterval(() => this.sheduleObserverLogic(), 1000);
  }

  sheduleObserverLogic(){

    if(localStorage.getItem('scheduleChange') == undefined) return;

    this.schedules = JSON.parse(localStorage.getItem('userSchedules'));
    localStorage.removeItem('scheduleChange');

  }

  modifyMonthlyPayment() {

    this.sendingData = true;
    this._http.updateMonthlyPayment(this.monthlyPayment).then(
      data => {

        this.monthlyPayment = data;
        let not = {
          title: 'Mensualidad Actualizada',
          description: 'Datos cargados al servidor correctamente',
          status: 200
        };

        localStorage.setItem('request', JSON.stringify(not));

      },

      error => localStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.sendingData = false
    );
  }

  setUserReferenceObserver() {
    this.userReferenceObserver = setInterval(() => this.userReferenceObserverLogic(), 1000);
  }

  userReferenceObserverLogic() {
    
    if(localStorage.getItem('userReferencesUpdates') == undefined) {
      return;
    }

    this.references = JSON.parse(localStorage.getItem('userReferences'));
    localStorage.removeItem('userReferencesUpdates');

  }

}
