import { NotificationService } from './../../notification/notification.service';
import { Component, OnInit, Input, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { User } from '../../classes/user';

import { Schedule } from '../../classes/schedule';
import { Reference } from '../../classes/reference';
import { Salary } from '../../classes/salary';
import { MonthlyPayment } from '../../classes/monthly-payment';
import { MonthlyPrice } from '../../classes/monthly-price';
import { FadeAnimation, SlideAnimation } from '../../animations/slide-in-out.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { Url } from '../../classes/url';
import { Storage } from '../../classes/storage';
import { UserService } from '../../services/user.service';
import { ScheduleDay } from '../../utils/classes/schedule-day';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
  animations: [ FadeAnimation, SlideAnimation ]
})
export class ShowUserComponent implements OnInit {

  public user: User = new User();
  public showUser: User = new User();    
  public salary: Salary =  new Salary();
  public formats = ['image/png', 'image/jpeg', 'image/jpg'];

  cardState: String = 'initial';
  backgroundState: String = 'initial';

  public modify: Boolean = false;
  public sendingData = 0

  public observerRef: any;
  public url: Url = new Url();
  public storage: Storage = new Storage();
  public outletOutput: any;
  
  credential = User.authUser().user_type_id

  scheduleDays: Array<ScheduleDay> = ScheduleDay.getScheduleDayArrayLD()
  
  public userImgFile: any;

  constructor(private _http: UserService,
    private router: Router,
    private notification: NotificationService,
    private actRou: ActivatedRoute) {  
      
      this.observerRef = actRou.params.subscribe(params => {
        this.user.id = params['id'];        
        this.getUserData();
      });

      this.outletOutput = this._http.getData().subscribe(x => {
      
        if (x.action == 'SCHEDULES') {
          
          this.user.schedules = []
          this.showUser.schedules = []
          this.user.schedules = Schedule.convertToArray(x.data)
          this.showUser.schedules = Schedule.convertToArray(x.data)
          this.scheduleDays = ScheduleDay.getScheduleDayArrayLD()
          ScheduleDay.setSchedulesToArray(this.scheduleDays, this.user.schedules)

        } else if(x.action ==  'REFERENCES') {

          this.user.references = Reference.convertToArray(x.data)
          this.showUser.references = Reference.convertToArray(x.data)

        } else if(x.action == 'MONTHLY') {
        

          this.updateMonthly(x.data);

        } else if(x.action == 'STATUS') {
            this.user.status = parseInt(x.data)
            this.showUser.status = parseInt(x.data)
        }
        
      });
      
  }

  ngOnInit() {
    setTimeout(() => {
      this.cardState = 'final';
      this.backgroundState = 'final';
    }, 100);

  }

  ngOnDestroy() {    
    this.outletOutput.unsubscribe()
  }

  getUserData(){
    this.sendingData++;
    this._http.getUser(this.user.id).then(
      data => {

        this.user.setValues(data);
        this.showUser.setValues(data);        

        if(this.user.img.length > 0) {
          this.downloadPerfilPhoto()
        }  
        this.scheduleDays = ScheduleDay.getScheduleDayArrayLD()
        ScheduleDay.setSchedulesToArray(this.scheduleDays, this.user.schedules)
        this.sendUser()

      }, error => this.notification.sendError(error)
      
    ).then( () => this.sendingData-- )
  }

  closePop() {

    setTimeout(() => {

      this.router.navigate(['/users']);

    }, 450);

    this.cardState = 'initial';
    this.backgroundState = 'initial';
    
  }

  updateUser() {

    this.logicValidations()

    if(!this.user.validations.validate) return;

    if (this.user.user_type_id > 1  && this.user.user_type_id < 5) {              
        
    }

    this.sendingData++;

    this._http.updateUser(this.user).then(
      data => {

        this.notification.sendNotification(
        'Usuario ' + this.user.name + ' Actualizado',
        'Los datos han sido cargados al servidor', 5000)
        this.showUser.setData(this.user)

      }, error => this.notification.sendError(error)              
    ).then(
      () => this.sendingData--
    );
  }

  updateSalary() {

    this._http.updateSalary(this.salary).then(

      data => this.notification.sendNotification('Salario Actualizado',
      'Los datos han sido cargados al servidor', 5000), 
      error => this.notification.sendError(error)
    );

  }

  logicValidations(){

    this.user.restoreValidations();

    if(this.user.emailValidation())
      this.uniqueEmail();    
    if(this.user.nameValidation())
      this.uniqueName();

    if(this.user.user_type_id == 1){
      this.user.monthlyPaymentAmountValidation();
    }

    else if(this.user.user_type_id >= 2 && this.user.user_type_id <= 4){
      this.user.salaryAmountValidation();
    }
   
    

  }   
  
  setMonthlyPrices() {
    this._http.getAllMonthlyPrices().then(
      data => {
        let array = []
        for(let i of data) {
          let m  = new MonthlyPrice();
          m.setData(i);
          array.push(m);          
        }
        localStorage.setItem('monthlyPrices', JSON.stringify(array));        
      },
      error => this.notification.sendError(error)
    );
  }

  modifyUser() {
    this.modify = !this.modify;
  }

  uniqueNameWriting(x) {

    let  l = x.keyCode;

    if (l >= 37 && l <= 40 || l == 13) { return; }    

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

  uniqueName() {

    let name = this.user.name.replace(/\s+$/, '');
    this._http.checkUniqueName(name).then(
      data => {
        if(data == false && name !== this.showUser.name){
          this.user.validations.name = 2;
          this.user.validations.validate = false;
        } 
        else {this.user.validations.name = -1;}
                
      },
      error => console.log(error)
    );
  }

  uniqueMailWriting(x) {

    let  l = x.keyCode;

    if (l >= 37 && l <= 40 || l == 13) { return; }    

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

  updateMonthly(data) {

    this.user.monthly_payment.amount = parseFloat(data);
    this.showUser.monthly_payment.amount = parseFloat(data);
    
  }

  updateSchedules(schedules){    
    this.user.receiveSchedules(schedules)    
    this.showUser.receiveSchedules(schedules)    
  }

  updateReferences(data) {

    this.user.references = data;
    this.showUser.references = data;

  }

  modifyMonthlyPayment() {

    this.sendingData++;
    this._http.updateMonthlyPayment(this.user.monthly_payment).then(

      data => {

        this.user.monthly_payment.setValues(data);

        this.notification.sendNotification(
          'Mensualidad Actualizada',
          'Datos cargados al servidor correctamente',
          5000
        )
              
      },

      error => this.notification.sendError(error)

    ).then( () => this.sendingData-- );

  }  

  sendUser(){
    this._http.sendData("user", this.showUser)
  }

  //FUNCTIONS FOR PROCESS IMAGE PROFILE 
  getFile(files: FileList) {
    
    for (let i = 0; i < files.length; i++) {

        if (this.validateImageFile(files[i]) ) { continue; }

        this.getElementsFromFile(files[i]);

    }

    // this.input = null;

  }

  validateImageFile(file: File) {
  
    let validation = true;
  
    for (let i of this.formats) {
        if (i == file.type) {
            validation = false;
            break;
        }
    }
    return validation;
  
  }

  getElementsFromFile(file: File) {
    
    this.userImgFile = file;
  
    let reader = new FileReader();
    reader.onload = (e: any) => {

      this.user.img = e.target.result;
        // jso.bits = e.target.result;
        // this.pushFile(jso);
    };
  
    reader.readAsDataURL(file);

    this.updateUserImage();
  
  }

  updateUserImage() {

    this._http.saveUserImg(this.userImgFile, this.user).then(
      data => {

        this.user.img = data;
        this.user.setImg();
        this.notification.sendNotification('Imagen Actualizada', 'La imagen a sido cargada correctamente', 3500);
        this.downloadPerfilPhoto();
        
      }, error => this.notification.sendData(error)
    )
    
  }

  downloadPerfilPhoto() {

    this._http.getUserImg(this.user.img).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });

  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader(); //you need file reader for read blob data to base64 image data.
    reader.addEventListener("load", () => {      
       this.userImgFile = reader.result; // here is the result you got from reader
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
